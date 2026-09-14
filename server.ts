import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const FALLBACK_MODELS = [
  GEMINI_MODEL,
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
];

function cleanJsonText(rawText: string): string {
  let cleaned = (rawText || "").trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  const firstBracket = cleaned.indexOf("[");
  const lastBracket = cleaned.lastIndexOf("]");
  
  if (firstBrace !== -1 && lastBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    return cleaned.substring(firstBrace, lastBrace + 1);
  } else if (firstBracket !== -1 && lastBracket !== -1) {
    return cleaned.substring(firstBracket, lastBracket + 1);
  }
  
  return cleaned;
}

interface GenerateOptions {
  contents: any;
  config?: any;
  endpointName?: string;
}

async function generateContentWithFallback(
  ai: GoogleGenAI,
  options: GenerateOptions
): Promise<any> {
  const nvidiaApiKey = process.env.NVIDIA_API_KEY || "";
  
  if (nvidiaApiKey.startsWith("nvapi-")) {
    try {
      const openAiMessages = [];
      let sysText = "";
      if (options.config?.systemInstruction) {
         sysText = typeof options.config.systemInstruction === 'string' 
            ? options.config.systemInstruction 
            : (options.config.systemInstruction?.parts?.[0]?.text || "");
         openAiMessages.push({ role: 'system', content: sysText });
      }
      
      let contents = Array.isArray(options.contents) ? options.contents : [options.contents];
      for (const c of contents) {
         let role = 'user';
         if (c.role === 'model') role = 'assistant';
         else if (c.role === 'system') role = 'system';
         
         let text = '';
         if (typeof c === 'string') text = c;
         else if (Array.isArray(c.parts)) text = c.parts.map((p: any) => p.text).join('\n');
         else if (c.parts?.text) text = c.parts.text;
         
         if (text) openAiMessages.push({ role, content: text });
      }

      // We explicitly prompt for JSON in case response_format is partially supported
      const isJson = options.config?.responseMimeType === 'application/json';
      if (isJson) {
         openAiMessages.push({ role: 'system', content: 'You must output strictly valid JSON.' });
      }

      const reqBody: any = {
         model: "nvidia/llama-3.1-nemotron-70b-instruct", // Updated to a valid NVIDIA hosted model
         messages: openAiMessages,
         temperature: options.config?.temperature ?? 0.7,
      };

      const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${nvidiaApiKey}`
        },
        body: JSON.stringify(reqBody)
      });

      if (!res.ok) {
         const errText = await res.text();
         throw new Error(`NVIDIA API Error: ${res.status} - ${errText}`);
      }
      const data = await res.json();
      return { text: data.choices[0].message.content };
    } catch (e) {
      console.warn("NVIDIA generation failed, falling back to Gemini:", (e as any).message);
      // Fall through to use Gemini
    }
  }

  const models = Array.from(new Set(FALLBACK_MODELS));
  let lastError: any = null;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: options.contents,
        config: options.config,
      });
      return response;
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.code;
      const msg = err?.message || String(err);
      const isTemporary =
        status === 503 ||
        status === 429 ||
        status === 500 ||
        msg.includes("503") ||
        msg.includes("429") ||
        msg.includes("high demand") ||
        msg.includes("UNAVAILABLE") ||
        msg.includes("RESOURCE_EXHAUSTED");

      if (isTemporary && i < models.length - 1) {
        console.warn(
          `[AI ${options.endpointName || "Task"}] Model ${model} is temporarily busy (${status || "503"}). Retrying with fallback model ${models[i + 1]}...`
        );
        // Exponential backoff with small jitter (800ms - 1500ms)
        await new Promise((resolve) => setTimeout(resolve, 800 + i * 400 + Math.random() * 300));
        continue;
      }

      if (!isTemporary && i < models.length - 1) {
        continue;
      }
    }
  }

  throw lastError;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Roleplay Simulation endpoint
app.post("/api/ai/roleplay", async (req, res) => {
  try {
    const { scenario, role, grade, history, userMessage } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Offline/Local fallback roleplay response generator
      return res.json({
        reply: getFallbackRoleplayReply(scenario, role, userMessage),
        feedback: "Tip: Great job expressing your idea! Remember to practice full sentences.",
        gradeAppropriate: true,
      });
    }

    const systemPrompt = `You are a supportive, friendly native English speaker roleplaying with a Vietnamese student in Grade ${grade || "6"} (Vietnam GDPT 2018 English curriculum).
Scenario: ${scenario || "Everyday conversation"}
Your role in this scenario: ${role || "Conversation partner"}
Student's input: "${userMessage}"

Guidelines:
1. Stay strictly in character for the scenario.
2. Keep your language level appropriate for Grade ${grade} (Grades 3-5: very simple A1 vocabulary, short 4-8 word sentences; Grades 6-7: A2 vocabulary, clear sentence frames; Grades 8-9: B1, natural transitions).
3. Respond in natural English (1-3 sentences max).
4. Provide a very brief, encouraging learning tip (Grammar/Vocabulary/Pronunciation note) in Vietnamese for the student.

Format your response as strict JSON:
{
  "reply": "Your in-character English response",
  "feedback": "Short encouraging feedback in Vietnamese (e.g., 'Rất tốt! Em có thể nói thêm: ...')",
  "suggestion": "1 sample reply the student could say next"
}`;

    const contents = [
      ...(Array.isArray(history) ? history.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })) : []),
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
    ];

    const response = await generateContentWithFallback(ai, {
      contents,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
      endpointName: "Roleplay",
    });

    const text = cleanJsonText(response.text || "{}");
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.warn("Roleplay API using fallback due to:", error?.message || error);
    // Graceful fallback so user never gets a broken experience
    return res.json({
      reply: "That sounds wonderful! Could you tell me more about that?",
      feedback: "Lời khen: Bạn phát âm và dùng từ rất tự tin! Tiếp tục phát huy nhé.",
      suggestion: "I would like to know more about this.",
    });
  }
});

// AI Writing / Speaking evaluation endpoint
app.post("/api/ai/evaluate-writing", async (req, res) => {
  try {
    const { grade, prompt, studentText } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        score: 8.5,
        strengths: ["Sử dụng cấu trúc câu rõ ràng", "Bám sát yêu cầu đề bài"],
        corrections: ["Chú ý chia động từ ở ngôi thứ 3 số ít nếu có"],
        improvedVersion: studentText,
        encouragement: "Bài viết rất tốt! Hãy tiếp tục duy trì thói quen viết mỗi ngày.",
      });
    }

    const systemPrompt = `You are an expert English teacher evaluating a short writing/speaking response from a Vietnamese student in Grade ${grade || "7"}.
Task prompt: "${prompt}"
Student's work: "${studentText}"

Evaluate constructively based on GDPT 2018 standards for Grade ${grade}.
Respond in strict JSON:
{
  "score": number from 1 to 10 (decimal allowed),
  "strengths": ["string in Vietnamese", "string in Vietnamese"],
  "corrections": ["specific correction with explanation in Vietnamese"],
  "improvedVersion": "A more natural, polished version in English suitable for Grade ${grade}",
  "encouragement": "Warm, inspiring message in Vietnamese"
}`;

    const response = await generateContentWithFallback(ai, {
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5,
      },
      endpointName: "Writing Evaluation",
    });

    const parsed = JSON.parse(cleanJsonText(response.text || "{}"));
    return res.json(parsed);
  } catch (error: any) {
    console.warn("Evaluation API using fallback due to:", error?.message || error);
    return res.json({
      score: 8.0,
      strengths: ["Ý tưởng mạch lạc, đúng chủ đề"],
      corrections: ["Hãy kiểm tra lại mạo từ (a/an/the) và thì của câu"],
      improvedVersion: req.body.studentText || "",
      encouragement: "Em đã hoàn thành rất tốt! Luyện tập thêm để phản xạ tự nhiên hơn.",
    });
  }
});

// AI Tutor - Dynamic lesson generation endpoint
app.post("/api/ai/tutor-generate-lesson", async (req, res) => {
  try {
    const {
      topic,
      grade = 9,
      targetLevel = "B1 (Chuẩn GDPT 2018)",
      studentName = "Học sinh",
      excludeWords = [],
      isB2Requested: explicitB2Requested,
    } = req.body;
    const gradeNum = Number(grade) || 6;
    const isPrimary = gradeNum <= 5;
    const ai = getGenAI();

    // Enforce Pedagogical CEFR Levels:
    // 1. Primary (Cấp 1: Lớp 3, 4, 5): Strictly A1 (Phù hợp) or A2 (Nâng cao).
    // 2. Secondary (Cấp 2: Lớp 6, 7, 8, 9): A2 (Phù hợp Lớp 6-7), B1 (Phù hợp Lớp 8-9), and B2 when requested.
    let effectiveTargetLevel = "";
    const isB2Requested = !isPrimary && (
      explicitB2Requested === true ||
      targetLevel.includes("B2") ||
      targetLevel.includes("Chuyên")
    );

    if (isPrimary) {
      // Primary: Only A1 or A2
      const isAdvancedPrimary = targetLevel.includes("A2") || targetLevel.toLowerCase().includes("nâng cao");
      effectiveTargetLevel = isAdvancedPrimary
        ? "A2 (Tiểu học Nâng cao / Khảo sát vào 6 CLC)"
        : "A1 (Chuẩn GDPT Tiểu học)";
    } else {
      // Secondary: A2, B1, or B2 when requested
      if (isB2Requested) {
        effectiveTargetLevel = "B2 (Chuyên Anh 10 & HSG - Nâng cao theo yêu cầu)";
      } else if (targetLevel.includes("A2") || gradeNum <= 7) {
        effectiveTargetLevel = "A2 (Chuẩn GDPT 2018 Lớp 6–7 - Phù hợp)";
      } else {
        effectiveTargetLevel = "B1 (Chuẩn GDPT 2018 Lớp 8–9 & Thi vào 10 đại trà - Phù hợp)";
      }
    }

    if (!ai) {
      // Offline fallback lesson generator with rigorous content
      return res.json(getFallbackGeneratedLesson(topic, gradeNum, effectiveTargetLevel, excludeWords));
    }

    const wordsToExcludeStr = Array.isArray(excludeWords) && excludeWords.length > 0
      ? `\nCRITICAL VOCABULARY NOVELTY CONSTRAINT (HẠN CHẾ LẶP LẠI TỪ CŨ):
The student has already mastered these words: [${excludeWords.slice(0, 60).join(", ")}].
DO NOT reuse or repeat any of these exact words in the "vocabAndCollocations" or practice exercises. You MUST introduce COMPLETELY FRESH, HIGH-YIELD vocabulary suitable for Grade ${gradeNum} (${effectiveTargetLevel}) to constantly expand their lexicon.`
      : '';

    // Grade-adaptive pedagogical prompts strictly aligned with GDPT 2018
    let gradePedagogicalDirective = "";
    if (gradeNum === 3) {
      gradePedagogicalDirective = `TARGET: Grade 3 Primary (Pre-A1/A1 Cambridge Starters, Age 8-9).
Level: ${effectiveTargetLevel}. Use extremely warm, lively tone with fun emojis. Topics: school items, greetings, colors, family, pets, numbers 1-20. Short 4-7 word sentences. No complex grammar jargon. Focus on simple 'What is this? It is a...', 'How are you?'.`;
    } else if (gradeNum === 4) {
      gradePedagogicalDirective = `TARGET: Grade 4 Primary (A1 Cambridge Movers, Age 9-10).
Level: ${effectiveTargetLevel}. Use encouraging, friendly tone. Topics: daily routines, time (What time is it?), subjects, nationalities, abilities (can/can't), present continuous (What are you doing? I am...). Relatable primary school contexts.`;
    } else if (gradeNum === 5) {
      gradePedagogicalDirective = `TARGET: Grade 5 Primary (A1/A2 Primary Advanced & Transition to Grade 6, Age 10-11).
Level: ${effectiveTargetLevel}. Topics: holidays, past simple (went, visited, saw, ate), directions (How can I get to...), comparative adjectives (taller, bigger), future intentions (will / be going to). Prepare smoothly for Grade 6 entrance exams.`;
    } else if (gradeNum === 6) {
      gradePedagogicalDirective = `TARGET: Grade 6 Lower Secondary (A2 Cambridge KET, Age 11-12, Khởi đầu THCS).
Level: ${effectiveTargetLevel}. Tone: Motivating, clear, supportive for new secondary students. Topics: My New School, neighbourhood, houses, present simple vs. present continuous, comparative adjectives, prepositions of place, modal verbs (must/should). ${isB2Requested ? "Advanced B2 requested: add challenging collocations." : "DO NOT use Grade 9/10 high school entrance exam traps or advanced B2 syntax."}`;
    } else if (gradeNum === 7) {
      gradePedagogicalDirective = `TARGET: Grade 7 Lower Secondary (A2/B1, Age 12-13, THCS).
Level: ${effectiveTargetLevel}. Topics: Community service, health & lifestyle, music & arts, traffic, sources of energy. Grammar: Conjunctions (although, however, because), past habits (used to + V), -ed/-ing adjectives, future continuous. ${isB2Requested ? "Advanced B2 requested: include higher-tier idioms and collocations." : "Focus on standard communication and school exams."}`;
    } else if (gradeNum === 8) {
      gradePedagogicalDirective = `TARGET: Grade 8 Lower Secondary (B1 Cambridge PET, Age 13-14, THCS).
Level: ${effectiveTargetLevel}. Topics: Leisure time & hobbies, life in countryside, environmental protection, disaster prevention. Grammar: Verbs of liking + V-ing/to-V, passive voice, past continuous with when/while, first conditionals with IF/UNLESS, comparative of adverbs. ${isB2Requested ? "Advanced B2 requested: add Chuyên Anh 10 collocations and transformation structures." : "Focus on standard GDPT B1 curriculum."}`;
    } else {
      gradePedagogicalDirective = `TARGET: Grade 9 Lower Secondary (${isB2Requested ? "B2 Chuyên Anh & HSG - Nâng cao theo yêu cầu" : "B1 Chuẩn GDPT 2018 & Ôn thi vào 10 đại trà"}, Age 14-15).
Level: ${effectiveTargetLevel}. Topics: City life, local environment, space, world Englishes, teen stress. ${isB2Requested ? "B2 ACTIVATED: Phrasal verbs, double comparatives, cleft sentences, inversion, idioms, entrance exam traps for Specialized Schools (Chuyên Anh)." : "B1 STANDARD: Phrasal verbs, conditionals, wishes, relative clauses, passive voice suited for standard High School Entrance."}`;
    }

    const primarySystemPrompt = `You are "Cô Mai Anh AI / Thầy Alex AI" - a dedicated Primary English Master Teacher (Chuyên gia Sư phạm Tiếng Anh Tiểu học GDPT 2018 - Lớp 3, 4, 5).
Create an engaging, beautifully chunked, bite-sized English lesson specifically for a Primary student named ${studentName} (Grade ${gradeNum}, Target Level: ${effectiveTargetLevel}).

${gradePedagogicalDirective}

Topic requested: "${topic || "Chủ đề tiếng Anh Tiểu học Lớp " + gradeNum}"
${wordsToExcludeStr}

CRITICAL PEDAGOGICAL CONSTRAINTS (TỐI ƯU BÀI HỌC CẤP 1 - TIỂU HỌC):
1. CEFR LEVEL: Strictly A1 (Chuẩn GDPT Tiểu học) or A2 (Tiểu học nâng cao). NO complex grammar jargon.
2. CÁC BƯỚC HỌC NGẮN GỌN & DỄ TIẾP CẬN: Chia bài học thành 5 bước ngắn gọn, rõ ràng trong mảng "steps" (Bước 1: Mục tiêu, Bước 2: Từ vựng, Bước 3: Mẫu câu cơ bản, Bước 4: Ví dụ thực tế, Bước 5: Luyện tập nhanh).
3. TĂNG LƯỢNG TỪ VỰNG: Cung cấp ĐỦ 8 ĐẾN 10 TỪ VỰNG thiết thực, quen thuộc trong "vocabAndCollocations". Mỗi từ có phiên âm IPA, loại từ, nghĩa tiếng Việt, 2 CÂU VÍ DỤ minh họa rõ ràng (exampleEn/Vi và additionalExampleEn/Vi), kèm mẹo nhớ sinh động.
4. GIẢM NGỮ PHÁP XUỐNG MỨC CƠ BẢN: Trong "grammarStructures", CHỈ ĐƯA RA 1 MẪU CÂU CƠ BẢN NHẤT (hoặc tối đa 2 mẫu câu đơn giản như 'What is this?', 'I like...'). Công thức ngắn gọn, trực quan, dễ nhớ. KHÔNG giải thích ngữ pháp học thuật dài dòng hay bẫy phức tạp.
5. TĂNG NHIỀU VÍ DỤ THỰC TẾ: Cung cấp ít nhất 4-5 ví dụ giao tiếp thực tế hoặc đoạn đối thoại ngắn trong "realLifeExamples" kèm dịch tiếng Việt để bé dễ hình dung.
6. BÀI TẬP TƯƠNG TÁC NHANH: 4 bài tập trắc nghiệm ngắn gọn, đáng yêu, giải thích khích lệ.

Respond in STRICT JSON format:
{
  "id": "lesson-${Date.now()}",
  "topic": "${topic}",
  "grade": ${gradeNum},
  "cefrLevel": "${effectiveTargetLevel}",
  "title": "Short catchy bilingual title with emojis",
  "objectiveVi": "Clear 1-2 sentence learning objective in Vietnamese",
  "conceptExplanation": "Short, friendly 2-3 sentence concept analogy in Vietnamese with cute emojis",
  "steps": [
    { "stepNumber": 1, "title": "Khởi động & Mục tiêu", "description": "Mục tiêu bài học ngắn gọn", "keyTakeaway": "Điểm cần nhớ" },
    { "stepNumber": 2, "title": "Kho từ vựng trọng tâm", "description": "8-10 từ vựng gần gũi", "keyTakeaway": "Phát âm chuẩn và nhớ nghĩa" },
    { "stepNumber": 3, "title": "Mẫu câu cơ bản", "description": "Mẫu câu giao tiếp ngắn gọn, dễ thuộc", "keyTakeaway": "Áp dụng ngay khi nói" },
    { "stepNumber": 4, "title": "Ví dụ thực tế sinh động", "description": "Nhiều ví dụ và hội thoại minh họa", "keyTakeaway": "Học qua ngữ cảnh thực tế" },
    { "stepNumber": 5, "title": "Luyện tập tương tác", "description": "4 câu trắc nghiệm nhanh", "keyTakeaway": "Ôn luyện nhận điểm thưởng" }
  ],
  "vocabAndCollocations": [
    {
      "word": "word",
      "ipa": "/.../",
      "partOfSpeech": "noun / verb / adj",
      "meaningVi": "Nghĩa tiếng Việt",
      "exampleEn": "Ví dụ câu 1",
      "exampleVi": "Dịch câu 1",
      "additionalExampleEn": "Ví dụ câu 2 thêm ngữ cảnh",
      "additionalExampleVi": "Dịch câu 2",
      "examNote": "Mẹo nhớ từ hoặc phát âm cho bé"
    }
  ],
  "grammarStructures": [
    {
      "name": "Mẫu câu quen thuộc",
      "formula": "Công thức ngắn gọn",
      "exampleEn": "Ví dụ mẫu",
      "exampleVi": "Dịch tiếng Việt",
      "examTrapVi": "Mẹo nhớ nhanh",
      "moreExamples": [
        { "en": "Ví dụ bổ sung 1", "vi": "Dịch ví dụ 1" },
        { "en": "Ví dụ bổ sung 2", "vi": "Dịch ví dụ 2" }
      ]
    }
  ],
  "realLifeExamples": [
    {
      "context": "Trong lớp học / Ở nhà / Khi gặp bạn",
      "dialogueOrSentenceEn": "A: Hello, how are you? - B: I am fine, thank you!",
      "translationVi": "A: Xin chào, bạn khỏe không? - B: Mình khỏe, cảm ơn bạn!",
      "explanation": "Tình huống giao tiếp hàng ngày"
    }
  ],
  "interactiveExercises": [
    {
      "id": "ex-1",
      "type": "multiple-choice",
      "question": "Câu hỏi ngắn gọn",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "Exact correct string",
      "explanationVi": "Lời khen ngợi và giải thích dễ hiểu"
    }
  ],
  "tutorTip": "Lời nhắn ấm áp, động viên bé",
  "createdAt": "${new Date().toISOString()}"
}`;

    const secondarySystemPrompt = `You are an expert English Master Teacher specializing in the Vietnamese GDPT 2018 Secondary curriculum (THCS Lớp 6-9).
Create an optimized, bite-sized English lesson specifically for a Secondary student named ${studentName} (Grade ${gradeNum}, Target Level: ${effectiveTargetLevel}).

${gradePedagogicalDirective}

Topic requested: "${topic}"
${wordsToExcludeStr}

CRITICAL PEDAGOGICAL CONSTRAINTS (TỐI ƯU BÀI HỌC CẤP 2 - THCS):
1. CEFR LEVEL: Strictly A2 (Phù hợp Lớp 6-7, giao tiếp nền tảng) or B1 (Phù hợp Lớp 8-9, chuẩn GDPT & thi vào 10). ${isB2Requested ? "B2 requested: enhance vocabulary." : "DO NOT overcomplicate with esoteric grammatical traps."}
2. CÁC BƯỚC HỌC NGẮN GỌN & DỄ TIẾP CẬN: Chia bài học thành 5 bước ngắn gọn trong "steps" (Bước 1: Mục tiêu trọng tâm, Bước 2: 8-10 Từ vựng & Collocations, Bước 3: Mẫu câu cơ bản thực dụng, Bước 4: Nhiều ví dụ giao tiếp thực tế, Bước 5: Luyện tập nhanh).
3. TĂNG LƯỢNG TỪ VỰNG: Cung cấp ĐỦ 8 ĐẾN 10 TỪ VỰNG / cụm từ thiết thực trong "vocabAndCollocations". Mỗi từ có phiên âm IPA, loại từ, nghĩa tiếng Việt, 2 CÂU VÍ DỤ MINH HỌA rõ ràng (exampleEn/Vi và additionalExampleEn/Vi), kèm mẹo làm bài thi/cách dùng.
4. GIẢM NGỮ PHÁP XUỐNG MỨC CƠ BẢN: Trong "grammarStructures", CHỈ TẬP TRUNG 1 ĐẾN 2 MẪU CÂU CƠ BẢN NHẤT. Cấu trúc rõ ràng, tập trung vào cách dùng thực tế, lược bỏ các biến thể phức tạp hiếm gặp để học sinh dễ nắm bắt và ứng dụng ngay.
5. TĂNG NHIỀU VÍ DỤ MINH HỌA: Cung cấp ít nhất 4-6 ví dụ thực tế hoặc mini dialogues trong "realLifeExamples" kèm dịch tiếng Việt để người học thấy rõ cách vận dụng trong đời sống và bài thi.
6. BÀI TẬP TƯƠNG TÁC NHANH: 4 bài tập thực hành trắc nghiệm có đáp án chính xác và lời giải thích súc tích.

Respond in STRICT JSON format:
{
  "id": "lesson-${Date.now()}",
  "topic": "${topic}",
  "grade": ${gradeNum},
  "cefrLevel": "${effectiveTargetLevel}",
  "title": "Short catchy title in Vietnamese and English",
  "objectiveVi": "Clear 1-2 sentence learning objective in Vietnamese",
  "conceptExplanation": "Clear, intuitive 2-3 sentence concept breakdown in Vietnamese",
  "steps": [
    { "stepNumber": 1, "title": "Mục tiêu trọng tâm", "description": "Xác định rõ kết quả cần đạt", "keyTakeaway": "Trọng tâm kiến thức" },
    { "stepNumber": 2, "title": "Từ vựng mở rộng (8-10 từ)", "description": "Nắm vững bộ từ vựng chủ điểm", "keyTakeaway": "Phát âm, nghĩa & collocations" },
    { "stepNumber": 3, "title": "Mẫu câu cơ bản thực dụng", "description": "Tối giản ngữ pháp, dễ thuộc dễ nhớ", "keyTakeaway": "Công thức và ứng dụng nhanh" },
    { "stepNumber": 4, "title": "Ví dụ thực tế sinh động", "description": "Nhiều tình huống và hội thoại mẫu", "keyTakeaway": "Quan sát ngữ cảnh ứng dụng" },
    { "stepNumber": 5, "title": "Luyện tập tương tác", "description": "4 câu trắc nghiệm củng cố", "keyTakeaway": "Đánh giá mức độ hiểu bài" }
  ],
  "vocabAndCollocations": [
    {
      "word": "word or collocation",
      "ipa": "/.../",
      "partOfSpeech": "part of speech",
      "meaningVi": "Nghĩa tiếng Việt",
      "exampleEn": "Ví dụ tiếng Anh 1",
      "exampleVi": "Bản dịch 1",
      "additionalExampleEn": "Ví dụ tiếng Anh 2 thêm ngữ cảnh",
      "additionalExampleVi": "Bản dịch 2",
      "examNote": "Mẹo thi hoặc lưu ý sử dụng"
    }
  ],
  "grammarStructures": [
    {
      "name": "Tên cấu trúc",
      "formula": "Công thức cơ bản",
      "exampleEn": "Ví dụ mẫu",
      "exampleVi": "Dịch tiếng Việt",
      "examTrapVi": "Lưu ý sử dụng",
      "moreExamples": [
        { "en": "Ví dụ bổ sung 1", "vi": "Dịch ví dụ 1" },
        { "en": "Ví dụ bổ sung 2", "vi": "Dịch ví dụ 2" }
      ]
    }
  ],
  "realLifeExamples": [
    {
      "context": "Tình huống đời sống / Đối thoại",
      "dialogueOrSentenceEn": "Hội thoại hoặc câu ví dụ thực tế",
      "translationVi": "Bản dịch tiếng Việt",
      "explanation": "Phân tích ngữ cảnh"
    }
  ],
  "interactiveExercises": [
    {
      "id": "ex-1",
      "type": "multiple-choice",
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "Exact correct string or option",
      "explanationVi": "Detailed explanation in Vietnamese"
    }
  ],
  "tutorTip": "Lời khuyên truyền cảm hứng từ Gia sư AI",
  "createdAt": "${new Date().toISOString()}"
}`;

    const systemPrompt = isPrimary ? primarySystemPrompt : secondarySystemPrompt;

    const response = await generateContentWithFallback(ai, {
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.6,
      },
      endpointName: "Tutor Lesson",
    });

    const parsed = JSON.parse(cleanJsonText(response.text || "{}"));
    if (!parsed.id) {
      parsed.id = `lesson-${Date.now()}`;
    }
    parsed.grade = gradeNum;
    parsed.cefrLevel = effectiveTargetLevel;
    return res.json(parsed);
  } catch (error: any) {
    console.warn("AI Tutor lesson generation using fallback due to:", error?.message || error);
    return res.json(getFallbackGeneratedLesson(req.body.topic, req.body.grade, req.body.targetLevel, req.body.excludeWords));
  }
});

// AI Tutor - Ask tutor questions endpoint
app.post("/api/ai/tutor-ask", async (req, res) => {
  try {
    const { question, lessonContext, studentName = "Học sinh", grade = 6 } = req.body;
    const gradeNum = Number(grade) || 6;
    const isPrimary = gradeNum <= 5;
    const ai = getGenAI();

    if (!ai) {
      if (isPrimary) {
        return res.json({
          answer: `Chào ${studentName}! Thầy/Cô rất vui vì con đã chăm chỉ đặt câu hỏi. Đối với bài học Lớp ${gradeNum}, con hãy nhớ quan sát kỹ mẫu câu và ghi nhớ các từ vựng quen thuộc nhé. Cứ tự tin luyện tập mỗi ngày cùng Thầy/Cô, con sẽ làm bài thật xuất sắc!`,
          mnemonicTip: "Mẹo nhỏ cho bé: Hãy đọc to câu tiếng Anh lên 3 lần để tai mình quen với âm điệu nhé!",
        });
      }
      return res.json({
        answer: `Chào ${studentName}! Đối với câu hỏi này: Em hãy xác định rõ cấu trúc ngữ pháp và dấu hiệu thời gian trong câu. Nếu là dạng bài kiểm tra hoặc thi tuyển sinh, hãy chú ý dạng của động từ và giới từ đi kèm nhé!`,
        mnemonicTip: "Mẹo nhớ: 'Xác định chủ ngữ trước - chia đúng thì sau'!",
      });
    }

    const prompt = `You are a supportive, certified English Tutor for a Vietnamese student named ${studentName} in Grade ${gradeNum} (${isPrimary ? "Cấp 1 Tiểu học (Lớp 3-5, Trình độ A1-A2)" : "Cấp 2 THCS (Lớp 6-9, Trình độ A2-B1, hoặc B2 Chuyên Anh)"}).
Current Lesson Context: "${lessonContext || (isPrimary ? "Tiểu học GDPT 2018" : "THCS GDPT 2018")}"
Student's Question: "${question}"

Guidelines:
${isPrimary
  ? "- Provide a warm, gentle, enthusiastic answer suited for an 8-11 year old child using simple Vietnamese and cheerful examples. Keep explanation simple without intimidating linguistic jargon. Strictly within A1/A2 concepts."
  : "- Provide an articulate, pedagogically sound answer in Vietnamese with illustrative examples. If the question is about B2 / Chuyên Anh, provide advanced exam tips. Otherwise, keep it clear and aligned with secondary curriculum."
}

Format your response in strict JSON:
{
  "answer": "Clear explanation in Vietnamese addressing the student's question directly with 1-2 practical examples",
  "mnemonicTip": "A memorable tip or trick for recall (1 sentence in Vietnamese)"
}`;

    const response = await generateContentWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
      endpointName: "Tutor Ask",
    });

    const parsed = JSON.parse(cleanJsonText(response.text || "{}"));
    return res.json(parsed);
  } catch (error: any) {
    console.warn("AI Tutor ask using fallback due to:", error?.message || error);
    const gradeNum = Number(req.body.grade) || 6;
    const isPrimary = gradeNum <= 5;
    return res.json({
      answer: isPrimary
        ? "Thầy/Cô đã nhận được câu hỏi của con rồi. Hãy chú ý đọc kỹ câu hỏi và làm theo mẫu bài học nhé bé ngoan!"
        : "Thầy/Cô đã nhận được câu hỏi. Khi làm dạng bài này, em hãy luôn xác định trước: Chủ ngữ chính là gì, thì của câu là gì, và có từ khóa quan trọng nào nhé.",
      mnemonicTip: "Hãy luôn gạch chân từ khóa và dấu hiệu nhận biết trước khi chọn đáp án!",
    });
  }
});

// AI Reading Passage generation endpoint (supports both 50-60 words & 120-150 words + audio sample + translation + analysis + quiz)
app.post("/api/ai/generate-reading", async (req, res) => {
  try {
    const {
      topic = "Bảo vệ môi trường",
      grade = 8,
      targetLevel = "B1 (Chuẩn GDPT 2018)",
      studentName = "Học sinh",
      lengthOption = "standard", // 'short' (50-60 words) or 'standard' (120-150 words)
      wordCountTarget = lengthOption === "short" ? "50-60" : "120-150",
      isB2Requested: explicitB2Requested,
    } = req.body;

    const gradeNum = Number(grade) || 6;
    const isPrimary = gradeNum <= 5;
    const isShort = lengthOption === "short" || wordCountTarget === "50-60";

    // Enforce Level Constraints:
    // Primary: Strictly A1 (Phù hợp) or A2 (Nâng cao)
    // Secondary: A2 (Lớp 6-7), B1 (Lớp 8-9), and B2 when requested
    const isB2Requested = !isPrimary && (
      explicitB2Requested === true ||
      targetLevel.includes("B2") ||
      targetLevel.includes("Chuyên")
    );

    let effectiveTargetLevel = "";
    if (isPrimary) {
      const isAdvancedPrimary = targetLevel.includes("A2") || targetLevel.toLowerCase().includes("nâng cao");
      effectiveTargetLevel = isAdvancedPrimary
        ? "A2 (Tiểu học Nâng cao / Khảo sát vào 6)"
        : "A1 (Chuẩn GDPT Tiểu học)";
    } else {
      if (isB2Requested) {
        effectiveTargetLevel = "B2 (Chuyên Anh 10 & HSG - Nâng cao theo yêu cầu)";
      } else if (targetLevel.includes("A2") || gradeNum <= 7) {
        effectiveTargetLevel = "A2 (Chuẩn GDPT 2018 Lớp 6–7 - Phù hợp)";
      } else {
        effectiveTargetLevel = "B1 (Chuẩn GDPT 2018 Lớp 8–9 - Phù hợp)";
      }
    }

    const ai = getGenAI();

    if (!ai) {
      return res.json(getFallbackReadingPassage(topic, gradeNum, effectiveTargetLevel, isShort ? "short" : "standard"));
    }

    // Word counts: For primary, short is 45-60 words, standard is 70-90 words.
    // For secondary, short is 50-60 words, standard is 120-150 words.
    const minWords = isPrimary ? (isShort ? 45 : 70) : (isShort ? 50 : 120);
    const maxWords = isPrimary ? (isShort ? 60 : 90) : (isShort ? 60 : 150);
    const sentenceCount = isPrimary ? (isShort ? "3-4" : "5-7") : (isShort ? "3-5" : "6-9");
    const vocabCount = isPrimary ? (isShort ? "2-3" : "3-4") : (isShort ? "2-3" : "4-6");
    const grammarCount = isPrimary ? "1-2" : (isShort ? "1-2" : "2-3");
    const quizCount = isPrimary ? (isShort ? "3" : "4") : (isShort ? "3" : "4-5");

    const systemPrompt = isPrimary
      ? `You are a certified Primary English Master Teacher (Chuyên gia Sư phạm Tiếng Anh Tiểu học GDPT 2018 - Lớp 3, 4, 5).
Generate an authentic, highly educational reading passage about: "${topic}" for a Primary student in Grade ${gradeNum} (Target Level: ${effectiveTargetLevel}).

CRITICAL PEDAGOGICAL & LEVEL CONSTRAINTS FOR PRIMARY (CẤP 1 - LỚP ${gradeNum}):
1. CEFR LEVEL STRICTLY CONSTRAINED: MUST ONLY BE CEFR A1 (Phù hợp) OR A2 (Nâng cao).
   - ABSOLUTELY FORBIDDEN: B1, B2, C1, inversion, cleft sentences, complex relative clauses, passive modals, abstract academic jargon.
   - Sentences must be short (5-10 words per sentence), simple, and cheerful with high clarity.
2. WORD COUNT: The English passage must be STRICTLY BETWEEN ${minWords} AND ${maxWords} WORDS.
3. SENTENCES: Divide into ${sentenceCount} simple sentences with clear Vietnamese translations.
4. VOCABULARY ANALYSIS: Highlight ${vocabCount} high-yield primary vocabulary items with IPA, part of speech, Vietnamese meaning, and kid-friendly exam tip (examTipVi).
5. GRAMMAR STRUCTURE: Highlight ${grammarCount} simple sentence pattern (e.g. Present simple, Present continuous, Can/Can't, Simple past visited/saw).
6. QUIZ: Create ${quizCount} multiple-choice reading comprehension questions with 4 options, correctIndex, friendly explanationVi, and clueSentenceEn.

Return your response in STRICT JSON matching this schema:
{
  "id": "reading-${Date.now()}",
  "titleEn": "Cheerful English Title",
  "titleVi": "Tiêu đề tiếng Việt gần gũi cho học sinh tiểu học",
  "topic": "${topic}",
  "grade": ${gradeNum},
  "cefrLevel": "${effectiveTargetLevel}",
  "wordCount": ${isShort ? 52 : 80},
  "lengthType": "${isShort ? "short" : "standard"}",
  "contentEn": "Full English passage text of exactly ${minWords}-${maxWords} words...",
  "contentVi": "Bản dịch tiếng Việt hoàn chỉnh toàn bài...",
  "sentences": [
    {
      "id": "s-1",
      "en": "First English sentence.",
      "vi": "Câu tiếng Việt thứ nhất tương ứng."
    }
  ],
  "vocabAnalysis": [
    {
      "word": "targetWord",
      "ipa": "/.../",
      "partOfSpeech": "noun / verb / adjective",
      "meaningVi": "Nghĩa tiếng Việt",
      "contextSentence": "Sentence containing the word from the text",
      "collocationOrFamily": "collocation or word family",
      "examTipVi": "Lưu ý hoặc mẹo nhớ cho bé"
    }
  ],
  "grammarAnalysis": [
    {
      "structureName": "Tên cấu trúc",
      "formula": "Công thức mẫu câu",
      "extractedExample": "Câu trích xuất từ bài đọc",
      "explanationVi": "Giải thích chi tiết cấu trúc",
      "trapOrUsageVi": "Lưu ý làm bài cho bé"
    }
  ],
  "quiz": [
    {
      "id": "q-1",
      "type": "detail",
      "question": "Question in English",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanationVi": "Giải thích chi tiết bằng tiếng Việt",
      "clueSentenceEn": "Clue sentence from passage"
    }
  ],
  "createdAt": "${new Date().toISOString()}"
}`
      : `You are a master English curriculum specialist for Vietnamese secondary students (GDPT 2018 Lower Secondary & Grade 10 Exam preparation).
Generate an authentic, highly educational reading passage about: "${topic}" for Grade ${gradeNum} (Target Level: ${effectiveTargetLevel}).

PEDAGOGICAL & LEVEL DIRECTIVES FOR SECONDARY (CẤP 2 - LỚP ${gradeNum}):
- Target CEFR: ${effectiveTargetLevel}.
${isB2Requested
  ? "- B2 ADVANCED LEVEL ACTIVATED AS REQUESTED: Use high-level academic collocations, idioms, complex sentence structures (cleft sentences, inversion, double comparatives) suitable for Specialized High School Grade 10 Entrance Exams and Gifted Students."
  : "- STANDARD SECONDARY LEVEL (A2/B1): Aligned with standard GDPT 2018 textbook. Do NOT force B2 or over-complicate syntax since B2 was not requested. Keep vocabulary and grammar accessible."
}
1. WORD COUNT: The English passage must be STRICTLY BETWEEN ${minWords} AND ${maxWords} WORDS.
2. SENTENCES: Divide into ${sentenceCount} natural sentences with sentence-by-sentence Vietnamese translation.
3. VIETNAMESE TRANSLATION: Provide a complete, fluent, pedagogical Vietnamese translation of the entire passage.
4. VOCABULARY ANALYSIS: Highlight and analyze ${vocabCount} key vocabulary words/collocations from the passage with word, ipa, partOfSpeech, meaningVi, contextSentence, collocationOrFamily, examTipVi.
5. GRAMMAR STRUCTURE ANALYSIS: Identify and analyze ${grammarCount} prominent grammatical structure(s) from the passage.
6. READING COMPREHENSION QUIZ: Create ${quizCount} multiple-choice questions based strictly on the passage with 4 options, correctIndex, explanationVi, and clueSentenceEn.

Return your response in STRICT JSON matching this schema:
{
  "id": "reading-${Date.now()}",
  "titleEn": "Engaging English Title",
  "titleVi": "Tiêu đề tiếng Việt tự nhiên",
  "topic": "${topic}",
  "grade": ${gradeNum},
  "cefrLevel": "${effectiveTargetLevel}",
  "wordCount": ${isShort ? 55 : 135},
  "lengthType": "${isShort ? "short" : "standard"}",
  "contentEn": "Full English passage text of exactly ${minWords}-${maxWords} words...",
  "contentVi": "Bản dịch tiếng Việt hoàn chỉnh toàn bài...",
  "sentences": [
    {
      "id": "s-1",
      "en": "First English sentence.",
      "vi": "Câu tiếng Việt thứ nhất tương ứng."
    }
  ],
  "vocabAnalysis": [
    {
      "word": "targetWord",
      "ipa": "/.../",
      "partOfSpeech": "noun / verb / adjective",
      "meaningVi": "Nghĩa tiếng Việt",
      "contextSentence": "Sentence containing the word from the text",
      "collocationOrFamily": "collocation or word family",
      "examTipVi": "Lưu ý hoặc bẫy đề thi"
    }
  ],
  "grammarAnalysis": [
    {
      "structureName": "Tên cấu trúc",
      "formula": "Công thức ngữ pháp",
      "extractedExample": "Câu trích xuất từ bài đọc",
      "explanationVi": "Giải thích chi tiết cấu trúc",
      "trapOrUsageVi": "Lưu ý làm bài hoặc bẫy đề thi"
    }
  ],
  "quiz": [
    {
      "id": "q-1",
      "type": "main-idea",
      "question": "Question in English",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanationVi": "Giải thích chi tiết bằng tiếng Việt",
      "clueSentenceEn": "Clue sentence from passage"
    }
  ],
  "createdAt": "${new Date().toISOString()}"
}`;

    const response = await generateContentWithFallback(ai, {
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.6,
      },
      endpointName: "Reading Generation",
    });

    const parsed = JSON.parse(cleanJsonText(response.text || "{}"));
    if (!parsed.id) {
      parsed.id = `reading-${Date.now()}`;
    }
    parsed.grade = gradeNum;
    parsed.cefrLevel = effectiveTargetLevel;
    parsed.lengthType = isShort ? "short" : "standard";
    if (parsed.contentEn) {
      parsed.wordCount = parsed.contentEn.trim().split(/\s+/).length;
    }
    return res.json(parsed);
  } catch (error: any) {
    console.warn("AI Reading generation using curriculum fallback due to:", error?.message || error);
    const isShort = req.body.lengthOption === "short" || req.body.wordCountTarget === "50-60";
    return res.json(getFallbackReadingPassage(req.body.topic, req.body.grade, req.body.targetLevel, isShort ? "short" : "standard"));
  }
});

// AI Daily Learning Mission & 30-Minute AI English Tutor Session
app.post("/api/ai/daily-mission", async (req, res) => {
  try {
    const {
      grade = 6,
      skill = "vocabulary",
      topic,
      targetLevel = "GDPT 2018",
      studentName = "bé",
      date = new Date().toISOString().split("T")[0],
      excludeWords = [],
    } = req.body;

    const ai = getGenAI();
    if (!ai) {
      return res.json(getFallbackDailyMission(Number(grade), skill, topic, date, excludeWords));
    }

    const wordsToExcludeStr = Array.isArray(excludeWords) && excludeWords.length > 0
      ? `\nCRITICAL VOCABULARY NOVELTY CONSTRAINT (HẠN CHẾ LẶP LẠI TỪ CŨ):
The student has already learned and completed missions with these words: [${excludeWords.slice(0, 60).join(", ")}].
DO NOT reuse or repeat any of these exact words in the "warmupVocab", "storyOrDialogue", "exercises", or "miniQuizChallenge" sections.
Instead, select COMPLETELY FRESH, HIGH-FREQUENCY, NOVEL words suited for Grade ${grade} to steadily advance the student's vocabulary.`
      : '';

    const systemPrompt = `You are "Gia sư Tiếng Anh AI Đồng Hành" - a warm, encouraging, pedagogical English Tutor for Vietnamese students (Grade ${grade}, Ages ${Number(grade) + 5}).
Your task is to create an engaging, comprehensive 30-MINUTE DAILY ENGLISH LESSON ("Buổi học 30 phút cùng Gia sư AI") tailored specifically for ${studentName}.
The lesson focuses on the single core skill: "${skill}".
Topic: "${topic || "Curriculum topic suitable for Grade " + grade}".
${wordsToExcludeStr}

CRITICAL PEDAGOGICAL CONSTRAINTS (30-MINUTE SESSION STRUCTURE):
1. TUTOR PERSONA:
   - Name: "Cô Mai Anh AI" (or "Thầy Alex AI")
   - Avatar: "👩‍🏫" or "🦉"
   - Warm greeting addressed to "${studentName}", stating what we will master in 30 minutes.
   - Encouragement quote.

2. STAGE 1: WARM-UP & VOCABULARY (4-5 key words/collocations):
   - word, ipa, partOfSpeech, meaningVi, emoji, exampleEn, exampleVi, audioText.
   - MUST BE FRESH WORDS (not repeating previously learned words).

3. STAGE 2: INTERACTIVE STORY OR DIALOGUE (A lively 4-6 lines conversation or mini-story):
   - title, scenarioVi, lines array with { speaker, avatar, en, vi, audioText }.

4. STAGE 3: THEORY & MEMORY TIPS:
   - keyConcept in Vietnamese, 2-3 clear rules or mnemonic tips ("Mẹo nhớ lâu"), 2-3 bilingual examples.

5. STAGE 4: GUIDED PRACTICE (4 varied exercises):
   - Types: 'multiple-choice', 'fill-blank', 'reorder-sentence', '${skill === "speaking" ? "speaking-pronunciation" : skill === "listening" ? "listening-comprehension" : "multiple-choice"}'
   - Clear prompt, options, correctAnswer, and step-by-step explanationVi.

6. STAGE 5: 30-MINUTE MINI-QUIZ CHALLENGE (4-5 test questions):
   - Comprehensive questions to test if the student achieved >= 70% to unlock the next day's lesson.

7. TUTOR FEEDBACK:
   - passedMessage: enthusiastic praise when student scores >= 70% and unlocks the next lesson.
   - needImprovementMessage: loving, encouraging advice when student scores < 70% to review mistakes and retry to unlock.

Respond in STRICT JSON matching this schema:
{
  "id": "mission-ai-${Date.now()}",
  "date": "${date}",
  "grade": ${Number(grade)},
  "skill": "${skill}",
  "title": "Chủ đề học hấp dẫn cho bé",
  "learningObjective": "Mục tiêu bài học rõ ràng trong 30 phút",
  "estimatedMinutes": 30,
  "tutorPersona": {
    "name": "Cô Mai Anh AI",
    "avatar": "👩‍🏫",
    "greetingMessage": "Lời chào ấm áp gửi bé và giới thiệu bài học 30 phút hôm nay",
    "encouragementNote": "Lời khích lệ học tập vui vẻ, không sợ sai"
  },
  "warmupVocab": [
    {
      "word": "word",
      "ipa": "/.../",
      "partOfSpeech": "noun / verb / adj",
      "meaningVi": "Nghĩa tiếng Việt",
      "emoji": "🌟",
      "exampleEn": "Natural English sentence",
      "exampleVi": "Bản dịch nghĩa tiếng Việt",
      "audioText": "Audio text to speak"
    }
  ],
  "storyOrDialogue": {
    "title": "Tên câu chuyện / hoạt cảnh",
    "scenarioVi": "Bối cảnh tình huống gần gũi với học sinh",
    "lines": [
      {
        "speaker": "Nam / Lan / Teacher",
        "avatar": "👦",
        "en": "English line",
        "vi": "Tiếng Việt tương ứng",
        "audioText": "English line"
      }
    ]
  },
  "theoryContent": {
    "keyConcept": "Tên khái niệm hoặc ngữ pháp trọng tâm",
    "rulesOrTips": [
      "Quy tắc 1 hoặc mẹo nhớ",
      "Quy tắc 2"
    ],
    "examples": [
      { "en": "Example sentence", "vi": "Bản dịch tiếng Việt" }
    ]
  },
  "exercises": [
    {
      "id": "ex-1",
      "type": "multiple-choice",
      "prompt": "Câu hỏi trắc nghiệm",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanationVi": "Giải thích chi tiết",
      "audioText": "Audio text if relevant"
    },
    {
      "id": "ex-2",
      "type": "fill-blank",
      "prompt": "Câu có chỗ trống",
      "options": ["opt1", "opt2", "opt3", "opt4"],
      "correctAnswer": "opt1",
      "explanationVi": "Giải thích ngữ pháp"
    },
    {
      "id": "ex-3",
      "type": "reorder-sentence",
      "prompt": "Sắp xếp các từ sau thành câu đúng:",
      "options": ["word1", "word2", "word3", "word4"],
      "correctAnswer": "word1 word2 word3 word4",
      "explanationVi": "Giải thích trật tự câu"
    },
    {
      "id": "ex-4",
      "type": "${skill === "speaking" ? "speaking-pronunciation" : skill === "listening" ? "listening-comprehension" : "multiple-choice"}",
      "prompt": "Yêu cầu bài tập",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanationVi": "Giải thích",
      "audioText": "Sentence to listen or read aloud"
    }
  ],
  "miniQuizChallenge": [
    {
      "id": "quiz-1",
      "type": "multiple-choice",
      "prompt": "Câu hỏi thử thách 1",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanationVi": "Giải thích chi tiết"
    },
    {
      "id": "quiz-2",
      "type": "fill-blank",
      "prompt": "Câu hỏi thử thách 2",
      "options": ["w1", "w2", "w3", "w4"],
      "correctAnswer": "w1",
      "explanationVi": "Giải thích chi tiết"
    },
    {
      "id": "quiz-3",
      "type": "multiple-choice",
      "prompt": "Câu hỏi thử thách 3",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 1,
      "explanationVi": "Giải thích chi tiết"
    },
    {
      "id": "quiz-4",
      "type": "multiple-choice",
      "prompt": "Câu hỏi thử thách 4",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 2,
      "explanationVi": "Giải thích chi tiết"
    }
  ],
  "tutorFeedback": {
    "passedMessage": "Chúc mừng bé yêu! Con đã hoàn thành xuất sắc bài học trên 70% và mở khóa bài học mới tiếp theo!",
    "needImprovementMessage": "Bé yêu cố lên nhé! Con cần đạt từ 70% trở lên để mở khóa bài học mới. Hãy cùng Gia sư AI ôn lại các câu chưa đúng và thử lại nào!"
  },
  "examNote": "Mẹo làm bài thi quan trọng cho học sinh theo chuẩn GDPT 2018"
}`;

    const response = await generateContentWithFallback(ai, {
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.6,
      },
      endpointName: "Daily Mission",
    });

    const text = cleanJsonText(response.text || "{}");
    const parsed = JSON.parse(text);
    if (!parsed.id) {
      parsed.id = `mission-ai-${Date.now()}`;
    }
    parsed.date = date;
    parsed.grade = Number(grade);
    parsed.skill = skill;
    parsed.estimatedMinutes = 30;
    return res.json(parsed);
  } catch (error: any) {
    console.warn("AI Daily Mission generation using fallback due to:", error?.message || error);
    return res.json(getFallbackDailyMission(Number(req.body.grade || 6), req.body.skill || "vocabulary", req.body.topic, req.body.date, req.body.excludeWords));
  }
});

function getFallbackDailyMission(
  grade: number = 6,
  skill: string = "vocabulary",
  topic?: string,
  date: string = new Date().toISOString().split("T")[0],
  excludeWords: string[] = []
) {
  const isKid = grade <= 5;
  const tutorName = isKid ? "Cô Mai Anh AI" : "Thầy Alex AI";
  const tutorAvatar = isKid ? "👩‍🏫" : "🦉";

  if (skill === "grammar") {
    return {
      id: `mission-fallback-${Date.now()}`,
      date,
      grade,
      skill: "grammar",
      title: grade <= 5 ? "Buổi Học 30 Phút: Mẫu Câu Số Nhiều 'These are / Those are'" : grade <= 7 ? "Buổi Học 30 Phút: Công Thức So Sánh Hơn Của Tính Từ" : "Buổi Học 30 Phút: Mệnh Đề Quan Hệ (Who, Which, That, Whose)",
      learningObjective: grade <= 5 ? "Phân biệt và nói chuẩn câu chỉ nhiều đồ vật ở gần (These) và ở xa (Those)" : grade <= 7 ? "Thành thạo công thức so sánh hơn tính từ ngắn (-er) và tính từ dài (more)" : "Làm chủ 100% dạng bài mệnh đề quan hệ và tránh bẫy đề thi vào 10",
      estimatedMinutes: 30,
      tutorPersona: {
        name: tutorName,
        avatar: tutorAvatar,
        greetingMessage: `Chào bé yêu! Thầy/Cô ${tutorName} rất vui được đồng hành cùng con trong buổi học 30 phút hôm nay. Hãy cùng chinh phục mục tiêu ngữ pháp này thật vui vẻ nhé!`,
        encouragementNote: "Đừng sợ làm sai nhé con, mỗi lỗi sai là một cơ hội để mình nhớ bài lâu hơn!",
      },
      warmupVocab: [
        {
          word: grade <= 5 ? "pencil case" : "comparative",
          ipa: grade <= 5 ? "/ˈpen.səl keɪs/" : "/kəmˈpær.ə.tɪv/",
          partOfSpeech: "noun",
          meaningVi: grade <= 5 ? "hộp bút chì" : "thể so sánh hơn",
          emoji: "✏️",
          exampleEn: grade <= 5 ? "These are my colorful pencil cases." : "Faster is the comparative form of fast.",
          exampleVi: grade <= 5 ? "Đây là những chiếc hộp bút đầy màu sắc của tớ." : "Faster là dạng so sánh hơn của fast.",
          audioText: grade <= 5 ? "pencil case. These are my colorful pencil cases." : "comparative. Faster is the comparative form of fast.",
        },
        {
          word: grade <= 5 ? "school bag" : "convenient",
          ipa: grade <= 5 ? "/ˈskuːl bæɡ/" : "/kənˈviː.ni.ənt/",
          partOfSpeech: grade <= 5 ? "noun" : "adjective",
          meaningVi: grade <= 5 ? "cặp sách đi học" : "tiện lợi, thuận tiện",
          emoji: "🎒",
          exampleEn: grade <= 5 ? "Those are new school bags." : "Online shopping is more convenient than going to the market.",
          exampleVi: grade <= 5 ? "Đó là những chiếc cặp sách mới." : "Mua sắm trực tuyến thuận tiện hơn đi chợ.",
          audioText: grade <= 5 ? "school bag. Those are new school bags." : "convenient. Online shopping is more convenient than going to the market.",
        },
        {
          word: grade <= 5 ? "notebook" : "essential",
          ipa: grade <= 5 ? "/ˈnəʊt.bʊk/" : "/ɪˈsen.ʃəl/",
          partOfSpeech: grade <= 5 ? "noun" : "adjective",
          meaningVi: grade <= 5 ? "quyển vở ghi" : "cần thiết, cốt yếu",
          emoji: "📓",
          exampleEn: grade <= 5 ? "These notebooks are very neat." : "Good health is more essential than wealth.",
          exampleVi: grade <= 5 ? "Những quyển vở này rất gọn gàng." : "Sức khỏe tốt quan trọng hơn tiền tài.",
          audioText: grade <= 5 ? "notebook. These notebooks are very neat." : "essential. Good health is more essential than wealth.",
        },
      ],
      storyOrDialogue: {
        title: grade <= 5 ? "Chuyến tham quan phòng học của Mai và Nam" : "Cuộc tranh luận thú vị giữa hai người bạn",
        scenarioVi: grade <= 5 ? "Mai dẫn Nam đi xem đồ dùng học tập mới trong lớp." : "Huy và Lan đang so sánh giữa cuộc sống thành thị và nông thôn.",
        lines: [
          {
            speaker: grade <= 5 ? "Mai" : "Huy",
            avatar: "👧",
            en: grade <= 5 ? "Look at the desk! These are my new pens, and those are my notebooks over there." : "Do you think living in the city is more exciting than living in the countryside?",
            vi: grade <= 5 ? "Nhìn lên bàn này! Đây là những chiếc bút mới của tớ, còn đằng kia là những quyển vở của tớ." : "Cậu có nghĩ sống ở thành phố hào hứng hơn sống ở nông thôn không?",
            audioText: grade <= 5 ? "Look at the desk! These are my new pens, and those are my notebooks over there." : "Do you think living in the city is more exciting than living in the countryside?",
          },
          {
            speaker: grade <= 5 ? "Nam" : "Lan",
            avatar: "👦",
            en: grade <= 5 ? "Wow! They are so colorful! Are those books on the shelf yours too?" : "Yes, but the countryside is much quieter and cleaner than the big city.",
            vi: grade <= 5 ? "Oa! Chúng sặc sỡ quá! Những quyển sách trên giá đằng kia cũng là của cậu à?" : "Đúng thế, nhưng nông thôn lại yên tĩnh và trong lành hơn nhiều so với thành phố lớn.",
            audioText: grade <= 5 ? "Wow! They are so colorful! Are those books on the shelf yours too?" : "Yes, but the countryside is much quieter and cleaner than the big city.",
          },
        ],
      },
      theoryContent: {
        keyConcept: grade <= 5 ? "These are / Those are + Danh từ số nhiều" : grade <= 7 ? "Công thức so sánh hơn (Comparative Adjectives)" : "Đại từ quan hệ trong mệnh đề xác định",
        rulesOrTips: [
          grade <= 5 ? "THESE: đồ vật ở gần mình (dùng 'These are'). THOSE: đồ vật ở xa mình (dùng 'Those are')." : grade <= 7 ? "Tính từ ngắn (1 âm tiết): adj + -er + than (tall -> taller than). Tính từ dài (2 âm tiết trở lên): more + adj + than (more beautiful than)." : "WHO: thay cho người. WHICH: thay cho vật. THAT: dùng cho cả người và vật nhưng KHÔNG đứng sau dấu phẩy.",
          "Mẹo nhớ nhanh: Đã có 'more' thì không thêm đuôi '-er' (KHÔNG viết 'more faster')!",
        ],
        examples: [
          { en: grade <= 5 ? "These are my pencils." : grade <= 7 ? "This smartphone is more expensive than that one." : "The girl who sits next to me is very helpful.", vi: grade <= 5 ? "Đây là những chiếc bút chì của tôi." : grade <= 7 ? "Chiếc điện thoại này đắt hơn chiếc kia." : "Bạn nữ ngồi cạnh tôi rất hay giúp đỡ mọi người." },
        ],
      },
      exercises: [
        {
          id: "ex-fb-1",
          type: "multiple-choice",
          prompt: grade <= 5 ? "Chọn từ thích hợp: \"_____ are my lovely friends, Nam and Phong.\"" : grade <= 7 ? "A sports car is usually _______ than a normal family car." : "The scientist _______ discovered the vaccine was awarded a prize.",
          options: grade <= 5 ? ["This", "These", "That", "It"] : grade <= 7 ? ["fast", "faster", "more fast", "fastest"] : ["which", "who", "whom", "whose"],
          correctAnswer: grade <= 5 ? 1 : grade <= 7 ? 1 : 1,
          explanationVi: grade <= 5 ? "Với danh từ số nhiều 'friends', ta dùng 'These are' để giới thiệu." : grade <= 7 ? "'fast' là tính từ ngắn 1 âm tiết -> dạng so sánh hơn là 'faster than'." : "'The scientist' là danh từ chỉ người làm chủ ngữ -> dùng 'who'.",
        },
        {
          id: "ex-fb-2",
          type: "fill-blank",
          prompt: grade <= 5 ? "Those (be) _____ our English textbooks." : grade <= 7 ? "Traveling by plane is (comfortable) _______ than by bus." : "The house (stand) _______ on top of the hill has a stunning view.",
          options: grade <= 5 ? ["is", "are", "am", "be"] : grade <= 7 ? ["more comfortable", "comfortabler", "most comfortable", "as comfortable"] : ["which stands", "who stands", "whose stands", "whom stands"],
          correctAnswer: grade <= 5 ? "are" : grade <= 7 ? "more comfortable" : "which stands",
          explanationVi: "Áp dụng chính xác công thức ngữ pháp trọng tâm đã học.",
        },
        {
          id: "ex-fb-3",
          type: "reorder-sentence",
          prompt: grade <= 5 ? "Sắp xếp từ thành câu hoàn chỉnh:" : grade <= 7 ? "Sắp xếp từ thành câu so sánh đúng:" : "Sắp xếp mệnh đề quan hệ đúng:",
          options: grade <= 5 ? ["These", "are", "my", "favorite", "pens."] : grade <= 7 ? ["Tokyo", "is", "larger", "than", "London."] : ["The", "book", "which", "I", "read", "was", "exciting."],
          correctAnswer: grade <= 5 ? "These are my favorite pens." : grade <= 7 ? "Tokyo is larger than London." : "The book which I read was exciting.",
          explanationVi: "Trật tự câu chuẩn theo cấu trúc ngữ pháp.",
        },
      ],
      miniQuizChallenge: [
        {
          id: "quiz-fb-1",
          type: "multiple-choice",
          prompt: grade <= 5 ? "What are those over there? -> _______ are my toy cars." : grade <= 7 ? "Her English is _______ than mine." : "The musician _______ album topped the charts will perform tonight.",
          options: grade <= 5 ? ["They", "It", "This", "That"] : grade <= 7 ? ["better", "gooder", "more good", "best"] : ["whose", "who", "which", "whom"],
          correctAnswer: 0,
          explanationVi: grade <= 5 ? "Trả lời cho câu hỏi 'What are those?' dùng đại từ số nhiều 'They are'." : grade <= 7 ? "'good' có dạng so sánh hơn bất quy tắc là 'better than'." : "Phía sau là danh từ sở hữu 'album' -> dùng 'whose'.",
        },
        {
          id: "quiz-fb-2",
          type: "multiple-choice",
          prompt: grade <= 5 ? "Are these your notebooks? -> Yes, _______." : grade <= 7 ? "Summer in Da Nang is usually _______ than in Da Lat." : "Choose the incorrect sentence (Tìm câu sai):",
          options: grade <= 5 ? ["they are", "it is", "these are", "those are"] : grade <= 7 ? ["hotter", "more hot", "hoter", "hottest"] : ["Ha Long Bay, that is very famous, attracts many tourists.", "The boy who called you is Peter.", "The bag which you bought is pretty.", "The doctor whose clinic is nearby helped us."],
          correctAnswer: 0,
          explanationVi: grade <= 5 ? "Yes, they are là câu trả lời ngắn chuẩn xác." : grade <= 7 ? "'hot' kết thúc bằng phụ âm sau 1 nguyên âm -> gấp đôi phụ âm: hotter." : "Đại từ 'that' TUYỆT ĐỐI KHÔNG được đứng sau dấu phẩy trong mệnh đề không xác định!",
        },
        {
          id: "quiz-fb-3",
          type: "fill-blank",
          prompt: grade <= 5 ? "These _____ (flower) are very sweet." : grade <= 7 ? "This exercise is (difficult) _______ than the last one." : "The girl (win) _______ the first prize is my sister.",
          options: grade <= 5 ? ["flowers", "flower", "floweres", "flowering"] : grade <= 7 ? ["more difficult", "difficulter", "most difficult", "as difficult"] : ["who won", "which won", "whose won", "whom won"],
          correctAnswer: grade <= 5 ? "flowers" : grade <= 7 ? "more difficult" : "who won",
          explanationVi: "Điền đúng dạng ngữ pháp để đạt điểm tối đa.",
        },
      ],
      tutorFeedback: {
        passedMessage: "Thầy/Cô vô cùng tự hào về con! Con đã hoàn thành xuất sắc bài học trên 70% và mở khóa bài học mới!",
        needImprovementMessage: "Bé yêu cố gắng thêm một chút nhé! Con cần đạt từ 70% trở lên để mở khóa bài tiếp theo. Hãy cùng Thầy/Cô xem lại các câu chưa đúng và bấm 'Làm lại' nha!",
      },
      examNote: "Mẹo làm bài thi: Luôn chú ý gạch chân danh từ và kiểm tra xem danh từ là số ít hay số nhiều trước khi chọn đáp án!",
    };
  }

  // Default vocabulary fallback
  return {
    id: `mission-fallback-${Date.now()}`,
    date,
    grade,
    skill: "vocabulary",
    title: grade <= 5 ? "Buổi Học 30 Phút: 5 Từ Vựng Chủ Đề Trường Lớp & Bạn Bè" : grade <= 7 ? "Buổi Học 30 Phút: Từ Vựng Môi Trường & Lối Sống Xanh" : "Buổi Học 30 Phút: Collocations Trọng Điểm Chủ Đề Công Nghệ",
    learningObjective: "Làm chủ 5 từ vựng then chốt, phát âm chuẩn IPA và vận dụng trôi chảy vào câu giao tiếp",
    estimatedMinutes: 30,
    tutorPersona: {
      name: tutorName,
      avatar: tutorAvatar,
      greetingMessage: `Chào bé yêu! Thầy/Cô ${tutorName} đã chuẩn bị một buổi học 30 phút với nhiều hình ảnh và trò chơi từ vựng kỳ thú cho con đây. Bắt đầu ngay nhé!`,
      encouragementNote: "Mỗi từ mới con học hôm nay là một viên gạch xây dựng sự tự tin nói tiếng Anh của con ngày mai!",
    },
    warmupVocab: [
      {
        word: grade <= 5 ? "classroom" : "environment",
        ipa: grade <= 5 ? "/ˈklɑːs.ruːm/" : "/ɪnˈvaɪ.rən.mənt/",
        partOfSpeech: "noun",
        meaningVi: grade <= 5 ? "phòng học, lớp học" : "môi trường tự nhiên",
        emoji: "🏫",
        exampleEn: grade <= 5 ? "Our classroom is bright and friendly." : "We must protect our natural environment.",
        exampleVi: grade <= 5 ? "Lớp học của chúng tớ rất sáng sủa và thân thiện." : "Chúng ta phải bảo vệ môi trường tự nhiên của mình.",
        audioText: grade <= 5 ? "classroom. Our classroom is bright and friendly." : "environment. We must protect our natural environment.",
      },
      {
        word: grade <= 5 ? "classmate" : "recycle",
        ipa: grade <= 5 ? "/ˈklɑːs.meɪt/" : "/ˌriːˈsaɪ.kəl/",
        partOfSpeech: grade <= 5 ? "noun" : "verb",
        meaningVi: grade <= 5 ? "bạn cùng lớp" : "tái chế (rác thải)",
        emoji: "👫",
        exampleEn: grade <= 5 ? "She is my best classmate." : "Remember to recycle plastic bottles and paper.",
        exampleVi: grade <= 5 ? "Bạn ấy là người bạn cùng lớp thân nhất của tớ." : "Hãy nhớ tái chế chai nhựa và giấy nhé.",
        audioText: grade <= 5 ? "classmate. She is my best classmate." : "recycle. Remember to recycle plastic bottles and paper.",
      },
      {
        word: grade <= 5 ? "playground" : "sustainable",
        ipa: grade <= 5 ? "/ˈpleɪ.ɡraʊnd/" : "/səˈsteɪ.nə.bəl/",
        partOfSpeech: grade <= 5 ? "noun" : "adjective",
        meaningVi: grade <= 5 ? "sân chơi trường học" : "bền vững, thân thiện với thiên nhiên",
        emoji: "⚽",
        exampleEn: grade <= 5 ? "We play football on the school playground." : "We should develop sustainable green energy.",
        exampleVi: grade <= 5 ? "Chúng tớ đá bóng trên sân chơi của trường." : "Chúng ta nên phát triển năng lượng xanh bền vững.",
        audioText: grade <= 5 ? "playground. We play football on the school playground." : "sustainable. We should develop sustainable green energy.",
      },
    ],
    storyOrDialogue: {
      title: grade <= 5 ? "Một ngày vui ở trường của An" : "Chiến dịch vì một hành tinh xanh",
      scenarioVi: grade <= 5 ? "An kể cho mẹ nghe về những người bạn và sân trường của mình." : "Nhóm học sinh trao đổi về dự án tái chế rác ở trường.",
      lines: [
        {
          speaker: grade <= 5 ? "An" : "Lan",
          avatar: "👧",
          en: grade <= 5 ? "Mom, my new classroom has big windows and lots of green plants!" : "Look at all the plastic waste! We need to recycle more bottles in our school.",
          vi: grade <= 5 ? "Mẹ ơi, lớp học mới của con có những ô cửa sổ to và rất nhiều cây xanh!" : "Nhìn những rác thải nhựa kìa! Chúng mình cần tái chế nhiều chai lọ hơn trong trường.",
          audioText: grade <= 5 ? "Mom, my new classroom has big windows and lots of green plants!" : "Look at all the plastic waste! We need to recycle more bottles in our school.",
        },
        {
          speaker: grade <= 5 ? "Mẹ" : "Minh",
          avatar: "👩",
          en: grade <= 5 ? "That sounds wonderful, honey! Do you like playing with your classmates?" : "I totally agree! Let's build a sustainable collection corner this Friday.",
          vi: grade <= 5 ? "Nghe tuyệt vời quá con yêu! Con có thích chơi đùa cùng các bạn cùng lớp không?" : "Tớ hoàn toàn đồng ý! Hãy lập một góc thu gom tái chế bền vững vào thứ Sáu này nhé.",
          audioText: grade <= 5 ? "That sounds wonderful, honey! Do you like playing with your classmates?" : "I totally agree! Let's build a sustainable collection corner this Friday.",
        },
      ],
    },
    theoryContent: {
      keyConcept: "Từ vựng trọng tâm & Mẹo ghi nhớ lâu",
      rulesOrTips: [
        "Học từ kèm hình ảnh và phát âm to theo giọng đọc chuẩn bản ngữ.",
        "Đặt câu ngắn với mỗi từ mới để não bộ ghi nhớ sâu hơn.",
      ],
      examples: [
        { en: "We love our green classroom.", vi: "Chúng tớ yêu quý lớp học xanh của mình." },
      ],
    },
    exercises: [
      {
        id: "ex-fb-v1",
        type: "multiple-choice",
        prompt: grade <= 5 ? "Where do students play sports during break time?" : "We must protect our natural _______ from toxic waste.",
        options: grade <= 5 ? ["playground", "bedroom", "kitchen", "hospital"] : ["environment", "pollution", "traffic", "factory"],
        correctAnswer: 0,
        explanationVi: grade <= 5 ? "'playground' là sân chơi của trường." : "'environment' là môi trường tự nhiên, kết hợp tạo thành cụm từ 'natural environment'.",
      },
      {
        id: "ex-fb-v2",
        type: "fill-blank",
        prompt: grade <= 5 ? "Nam is my best friend and my (class) _______." : "It is important to (recycle) _______ paper and cans.",
        options: grade <= 5 ? ["classmate", "class", "classroom", "classes"] : ["recycle", "recycles", "recycling", "recycled"],
        correctAnswer: grade <= 5 ? "classmate" : "recycle",
        explanationVi: "Điền đúng dạng từ vựng phù hợp ngữ nghĩa câu.",
      },
    ],
    miniQuizChallenge: [
      {
        id: "quiz-fb-v1",
        type: "multiple-choice",
        prompt: grade <= 5 ? "Choose the word with the /eɪ/ sound like 'play':" : "Which word is a synonym of 'eco-friendly'?",
        options: grade <= 5 ? ["classmate", "school", "book", "desk"] : ["sustainable", "polluted", "wasteful", "noisy"],
        correctAnswer: 0,
        explanationVi: grade <= 5 ? "'classmate' có chứa âm /eɪ/ ở đuôi -mate." : "'sustainable' mang nghĩa bền vững, thân thiện với môi trường.",
      },
      {
        id: "quiz-fb-v2",
        type: "multiple-choice",
        prompt: grade <= 5 ? "A person who learns in the same class with you is a:" : "The noun form of the verb 'pollute' is:",
        options: grade <= 5 ? ["classmate", "teacher", "doctor", "driver"] : ["pollution", "polluting", "polluted", "pollutes"],
        correctAnswer: 0,
        explanationVi: grade <= 5 ? "Bạn cùng lớp chính là 'classmate'." : "Đuôi '-tion' tạo thành danh từ: pollution (sự ô nhiễm).",
      },
      {
        id: "quiz-fb-v3",
        type: "fill-blank",
        prompt: grade <= 5 ? "We have a big green (play) _______." : "Solar power is a form of (renew) _______ energy.",
        options: grade <= 5 ? ["playground", "playing", "player", "play"] : ["renewable", "renewal", "renewed", "renewing"],
        correctAnswer: grade <= 5 ? "playground" : "renewable",
        explanationVi: "Điền đúng từ loại vào chỗ trống.",
      },
    ],
    tutorFeedback: {
      passedMessage: "Tuyệt vời bé ơi! Con đã hoàn thành xuất sắc bài học trên 70% và mở khóa bài học mới!",
      needImprovementMessage: "Bé yêu cố lên nhé! Con cần đạt từ 70% trở lên để mở khóa bài học mới. Hãy cùng Gia sư AI ôn lại và thử lại nào!",
    },
    examNote: "Mẹo đề thi: Hãy chú ý các tiếp đầu ngữ re- (làm lại) và tiếp vị ngữ -able (có thể) để suy luận nghĩa từ mới!",
  };
}

function getFallbackReadingPassage(
  topic: string = "Môi trường",
  grade: number = 8,
  targetLevel: string = "B1+ / B2",
  lengthOption: "short" | "standard" = "standard"
) {
  const gradeNum = Number(grade) || 6;
  const isPrimary = gradeNum <= 5;
  const isShort = lengthOption === "short";
  const isChuyen = !isPrimary && (targetLevel.includes("B2") || targetLevel.includes("Chuyên"));

  // 1. PRIMARY SCHOOL FALLBACK (CẤP 1 - LỚP 3, 4, 5): Only A1 (Phù hợp) or A2 (Nâng cao)
  if (isPrimary) {
    const isA2Advanced = targetLevel.includes("A2") || targetLevel.toLowerCase().includes("nâng cao");
    const cefr = isA2Advanced ? "A2 (Tiểu học Nâng cao / Khảo sát vào 6)" : "A1 (Chuẩn GDPT Tiểu học)";

    if (isA2Advanced) {
      return {
        id: `reading-${Date.now()}`,
        titleEn: "A Weekend at the Green Farm",
        titleVi: "Một Chuyến Đi Cuối Tuần Về Nông Trại Xanh",
        topic: topic || "Nông trại & Thiên nhiên",
        grade: gradeNum,
        cefrLevel: cefr,
        wordCount: isShort ? 54 : 76,
        lengthType: lengthOption,
        contentEn: isShort
          ? "Last weekend, Tom and his sister visited a lovely green farm in the countryside. They saw many friendly sheep, cows, and chickens. Tom helped feed the animals with fresh grass. His sister picked sweet red apples in the sunny garden. They felt very peaceful and happy after this wonderful trip."
          : "Last weekend, Tom and his sister visited a lovely green farm in the countryside. The air was fresh and the sky was clear blue. They saw many friendly sheep, cows, and fluffy chickens running on the grass. Tom eagerly helped the farmer feed the animals in the morning. Later, his sister picked sweet red apples in the sunny garden. They ate delicious fresh vegetables for lunch. Both children felt very peaceful, healthy, and happy after this memorable trip.",
        contentVi: isShort
          ? "Cuối tuần trước, Tom và em gái đã đến thăm một nông trại xanh đáng yêu ở vùng quê. Các em nhìn thấy rất nhiều chú cừu, bò và gà thân thiện. Tom đã giúp cho các con vật ăn cỏ tươi. Em gái cậu hái những quả táo đỏ ngọt ngào trong khu vườn ngập nắng. Cả hai cảm thấy rất bình yên và hạnh phúc sau chuyến đi tuyệt vời này."
          : "Cuối tuần trước, Tom và em gái đã đến thăm một nông trại xanh đáng yêu ở vùng quê. Không khí trong lành và bầu trời xanh ngắt. Các em nhìn thấy nhiều chú cừu, bò và gà lông xù chạy trên bãi cỏ. Buổi sáng, Tom háo hức giúp bác nông dân cho các con vật ăn. Sau đó, em gái cậu hái những quả táo đỏ ngọt ngào trong khu vườn ngập nắng. Các em đã ăn rau củ tươi ngon vào bữa trưa. Cả hai bạn nhỏ cảm thấy rất bình yên, khỏe khoắn và vui vẻ sau chuyến đi đáng nhớ này.",
        sentences: isShort ? [
          { id: "s-1", en: "Last weekend, Tom and his sister visited a lovely green farm in the countryside.", vi: "Cuối tuần trước, Tom và em gái đã đến thăm một nông trại xanh đáng yêu ở vùng quê." },
          { id: "s-2", en: "They saw many friendly sheep, cows, and chickens.", vi: "Các em nhìn thấy rất nhiều chú cừu, bò và gà thân thiện." },
          { id: "s-3", en: "Tom helped feed the animals with fresh grass.", vi: "Tom đã giúp cho các con vật ăn cỏ tươi." },
          { id: "s-4", en: "His sister picked sweet red apples in the sunny garden.", vi: "Em gái cậu hái những quả táo đỏ ngọt ngào trong khu vườn ngập nắng." },
          { id: "s-5", en: "They felt very peaceful and happy after this wonderful trip.", vi: "Cả hai cảm thấy rất bình yên và hạnh phúc sau chuyến đi tuyệt vời này." }
        ] : [
          { id: "s-1", en: "Last weekend, Tom and his sister visited a lovely green farm in the countryside.", vi: "Cuối tuần trước, Tom và em gái đã đến thăm một nông trại xanh đáng yêu ở vùng quê." },
          { id: "s-2", en: "The air was fresh and the sky was clear blue.", vi: "Không khí trong lành và bầu trời xanh ngắt." },
          { id: "s-3", en: "They saw many friendly sheep, cows, and fluffy chickens running on the grass.", vi: "Các em nhìn thấy nhiều chú cừu, bò và gà lông xù chạy trên bãi cỏ." },
          { id: "s-4", en: "Tom eagerly helped the farmer feed the animals in the morning.", vi: "Buổi sáng, Tom háo hức giúp bác nông dân cho các con vật ăn." },
          { id: "s-5", en: "Later, his sister picked sweet red apples in the sunny garden.", vi: "Sau đó, em gái cậu hái những quả táo đỏ ngọt ngào trong khu vườn ngập nắng." },
          { id: "s-6", en: "They ate delicious fresh vegetables for lunch.", vi: "Các em đã ăn rau củ tươi ngon vào bữa trưa." },
          { id: "s-7", en: "Both children felt very peaceful, healthy, and happy after this memorable trip.", vi: "Cả hai bạn nhỏ cảm thấy rất bình yên, khỏe khoắn và vui vẻ sau chuyến đi đáng nhớ này." }
        ],
        vocabAnalysis: [
          {
            word: "countryside",
            ipa: "/ˈkʌn.tri.saɪd/",
            partOfSpeech: "noun",
            meaningVi: "vùng quê, nông thôn",
            contextSentence: "...visited a lovely green farm in the countryside.",
            collocationOrFamily: "in the countryside",
            examTipVi: "Từ vựng trọng tâm Lớp 4-5 chủ đề Nơi chốn & Quê hương."
          },
          {
            word: "feed",
            ipa: "/fiːd/",
            partOfSpeech: "verb",
            meaningVi: "cho ăn, bón cho ăn",
            contextSentence: "Tom helped feed the animals with fresh grass.",
            collocationOrFamily: "feed the animals (quá khứ là 'fed')",
            examTipVi: "Động từ bất quy tắc: feed -> fed -> fed."
          },
          {
            word: "peaceful",
            ipa: "/ˈpiːs.fəl/",
            partOfSpeech: "adjective",
            meaningVi: "bình yên, thanh bình",
            contextSentence: "They felt very peaceful and happy after this wonderful trip.",
            collocationOrFamily: "peaceful place / feel peaceful",
            examTipVi: "Hậu tố '-ful' tạo tính từ từ danh từ 'peace' (hòa bình)."
          }
        ],
        grammarAnalysis: [
          {
            structureName: "Thì Quá khứ đơn (Past Simple Tense)",
            formula: "S + V2/ed (visited, saw, helped, picked, felt)",
            extractedExample: "Tom and his sister visited a lovely green farm in the countryside.",
            explanationVi: "Dùng để kể lại một chuyến đi hoặc hành động đã kết thúc trong quá khứ.",
            trapOrUsageVi: "Chú ý động từ 'see' đổi thành 'saw', 'feel' đổi thành 'felt' trong câu quá khứ."
          }
        ],
        quiz: [
          {
            id: "q-1",
            type: "detail",
            question: "Where did Tom and his sister go last weekend?",
            options: ["To a green farm in the countryside", "To an amusement park", "To a big supermarket", "To a noisy city street"],
            correctIndex: 0,
            explanationVi: "Câu 1 nói rõ Tom và em gái đến thăm một trang trại xanh ở vùng quê (a green farm in the countryside).",
            clueSentenceEn: "Last weekend, Tom and his sister visited a lovely green farm in the countryside."
          },
          {
            id: "q-2",
            type: "detail",
            question: "What did Tom do to help at the farm?",
            options: ["He fed the animals with fresh grass", "He repaired the tractor", "He bought new clothes", "He watched television all day"],
            correctIndex: 0,
            explanationVi: "Tom đã giúp cho các con vật ăn cỏ tươi.",
            clueSentenceEn: "Tom helped feed the animals with fresh grass."
          },
          {
            id: "q-3",
            type: "vocabulary",
            question: "What did Tom's sister pick in the garden?",
            options: ["Sweet red apples", "Yellow lemons", "Green cucumbers", "Flowers only"],
            correctIndex: 0,
            explanationVi: "Em gái Tom đã hái những quả táo đỏ ngọt ngào trong vườn.",
            clueSentenceEn: "His sister picked sweet red apples in the sunny garden."
          }
        ],
        createdAt: new Date().toISOString()
      };
    }

    // Primary A1 (Phù hợp)
    return {
      id: `reading-${Date.now()}`,
      titleEn: "My Happy School Day",
      titleVi: "Ngày Đi Học Vui Vẻ Của Em",
      topic: topic || "Trường học & Bạn bè",
      grade: gradeNum,
      cefrLevel: cefr,
      wordCount: isShort ? 50 : 70,
      lengthType: lengthOption,
      contentEn: isShort
        ? "My name is Linh and I am eight years old. Every day, I go to a beautiful primary school near my house. My classroom has big windows and colorful pictures on the wall. I have a kind teacher and three close friends. We love reading English books and playing games together in the school playground."
        : "My name is Linh and I am eight years old. Every day, I happily go to a beautiful primary school near my house. My classroom has bright windows, tidy wooden desks, and colorful pictures on the wall. My teacher is very kind and smiling. During recess, my best friends and I love reading fun English storybooks and playing tag in the wide playground. School is my favorite place.",
      contentVi: isShort
        ? "Tớ tên là Linh và năm nay tớ 8 tuổi. Mỗi ngày, tớ đến một ngôi trường tiểu học xinh đẹp gần nhà. Lớp học của tớ có những khung cửa sổ lớn và những bức tranh nhiều màu sắc trên tường. Tớ có một cô giáo tốt bụng và ba người bạn thân. Chúng tớ thích đọc sách tiếng Anh và chơi trò chơi cùng nhau trên sân trường."
        : "Tớ tên là Linh và năm nay tớ 8 tuổi. Mỗi ngày, tớ vui vẻ đến ngôi trường tiểu học xinh đẹp gần nhà. Lớp học của tớ có những khung cửa sổ sáng sủa, bàn gỗ ngăn nắp và nhiều bức tranh sặc sỡ trên tường. Cô giáo của tớ rất hiền và luôn mỉm cười. Trong giờ ra chơi, tớ và các bạn thân nhất thích đọc những cuốn truyện tiếng Anh vui nhộn và chơi đuổi bắt trên sân trường rộng rãi. Trường học là nơi tớ yêu thích nhất.",
      sentences: [
        { id: "s-1", en: "My name is Linh and I am eight years old.", vi: "Tớ tên là Linh và năm nay tớ 8 tuổi." },
        { id: "s-2", en: "Every day, I go to a beautiful primary school near my house.", vi: "Mỗi ngày, tớ đến một ngôi trường tiểu học xinh đẹp gần nhà." },
        { id: "s-3", en: "My classroom has big windows and colorful pictures on the wall.", vi: "Lớp học của tớ có những khung cửa sổ lớn và những bức tranh nhiều màu sắc trên tường." },
        { id: "s-4", en: "I have a kind teacher and three close friends.", vi: "Tớ có một cô giáo tốt bụng và ba người bạn thân." },
        { id: "s-5", en: "We love reading English books and playing games together in the school playground.", vi: "Chúng tớ thích đọc sách tiếng Anh và chơi trò chơi cùng nhau trên sân trường." }
      ],
      vocabAnalysis: [
        {
          word: "primary school",
          ipa: "/ˈpraɪ.mə.ri skuːl/",
          partOfSpeech: "noun",
          meaningVi: "trường tiểu học (cấp 1)",
          contextSentence: "I go to a beautiful primary school near my house.",
          collocationOrFamily: "go to primary school",
          examTipVi: "Từ vựng cốt lõi Lớp 3 Tiểu học."
        },
        {
          word: "playground",
          ipa: "/ˈpleɪ.ɡraʊnd/",
          partOfSpeech: "noun",
          meaningVi: "sân chơi, sân trường",
          contextSentence: "...playing games together in the school playground.",
          collocationOrFamily: "in the playground",
          examTipVi: "Ghép từ: play (chơi) + ground (mặt đất, bãi đất)."
        },
        {
          word: "colorful",
          ipa: "/ˈkʌl.ə.fəl/",
          partOfSpeech: "adjective",
          meaningVi: "nhiều màu sắc, rực rỡ",
          contextSentence: "My classroom has big windows and colorful pictures...",
          collocationOrFamily: "colorful pictures / colorful flowers",
          examTipVi: "Tính từ miêu tả đồ vật rất hay gặp trong bài kiểm tra lớp 3-4."
        }
      ],
      grammarAnalysis: [
        {
          structureName: "Thì Hiện tại đơn với Động từ thường & Like/Love + V-ing",
          formula: "S + love(s) + V-ing / Noun",
          extractedExample: "We love reading English books and playing games together.",
          explanationVi: "Diễn tả sở thích của bản thân và bạn bè.",
          trapOrUsageVi: "Sau động từ chỉ sở thích như like, love thì động từ sau thêm đuôi -ing (reading, playing)."
        }
      ],
      quiz: [
        {
          id: "q-1",
          type: "detail",
          question: "How old is Linh?",
          options: ["Eight years old", "Ten years old", "Six years old", "Twelve years old"],
          correctIndex: 0,
          explanationVi: "Linh giới thiệu rõ: 'I am eight years old' (Tớ 8 tuổi).",
          clueSentenceEn: "My name is Linh and I am eight years old."
        },
        {
          id: "q-2",
          type: "detail",
          question: "Where do Linh and her friends play games together?",
          options: ["In the school playground", "At the cinema", "In the hospital", "At the bus station"],
          correctIndex: 0,
          explanationVi: "Các bạn chơi cùng nhau ở sân trường (school playground).",
          clueSentenceEn: "We love reading English books and playing games together in the school playground."
        },
        {
          id: "q-3",
          type: "detail",
          question: "What does Linh's classroom have on the wall?",
          options: ["Colorful pictures", "Old clocks", "Big maps only", "Black boards only"],
          correctIndex: 0,
          explanationVi: "Lớp học có những bức tranh nhiều màu sắc trên tường (colorful pictures on the wall).",
          clueSentenceEn: "My classroom has big windows and colorful pictures on the wall."
        }
      ],
      createdAt: new Date().toISOString()
    };
  }

  // 2. SECONDARY SCHOOL FALLBACK (CẤP 2 - LỚP 6, 7, 8, 9)
  if (isShort) {
    // 50-60 words short passage
    return {
      id: `reading-${Date.now()}`,
      titleEn: "Green Habits at School",
      titleVi: "Thói Quen Xanh Tại Trường Học",
      topic: topic || "Môi trường & Sinh thái",
      grade: Number(grade) || 6,
      cefrLevel: gradeNum <= 7 ? "A2 (Chuẩn GDPT Lớp 6–7)" : "B1 (Chuẩn GDPT Lớp 8–9)",
      wordCount: 56,
      lengthType: "short",
      contentEn: "Every morning, students at Green Hill School walk or ride bicycles to their classrooms. Inside the building, they place empty plastic bottles and paper into designated recycling bins. The friendly teachers always remind children to turn off ceiling fans before leaving. By practicing these simple green habits, young pupils help keep their school clean and beautiful.",
      contentVi: "Mỗi buổi sáng, các bạn học sinh tại trường Green Hill đi bộ hoặc đạp xe đến lớp học. Bên trong tòa nhà, các em bỏ chai nhựa rỗng và giấy vào các thùng rác tái chế quy định. Các thầy cô thân thiện luôn nhắc nhở học sinh tắt quạt trần trước khi ra về. Bằng việc thực hành những thói quen xanh đơn giản này, các em học sinh nhỏ đã giúp trường học luôn sạch đẹp.",
      sentences: [
        {
          id: "s-1",
          en: "Every morning, students at Green Hill School walk or ride bicycles to their classrooms.",
          vi: "Mỗi buổi sáng, các bạn học sinh tại trường Green Hill đi bộ hoặc đạp xe đến lớp học."
        },
        {
          id: "s-2",
          en: "Inside the building, they place empty plastic bottles and paper into designated recycling bins.",
          vi: "Bên trong tòa nhà, các em bỏ chai nhựa rỗng và giấy vào các thùng rác tái chế quy định."
        },
        {
          id: "s-3",
          en: "The friendly teachers always remind children to turn off ceiling fans before leaving.",
          vi: "Các thầy cô thân thiện luôn nhắc nhở học sinh tắt quạt trần trước khi ra về."
        },
        {
          id: "s-4",
          en: "By practicing these simple green habits, young pupils help keep their school clean and beautiful.",
          vi: "Bằng việc thực hành những thói quen xanh đơn giản này, các em học sinh nhỏ đã giúp trường học luôn sạch đẹp."
        }
      ],
      vocabAnalysis: [
        {
          word: "recycling bin",
          ipa: "/ˌriːˈsaɪklɪŋ bɪn/",
          partOfSpeech: "noun",
          meaningVi: "Thùng rác tái chế",
          contextSentence: "...they place empty plastic bottles and paper into designated recycling bins.",
          collocationOrFamily: "throw into the recycling bin",
          examTipVi: "Từ vựng cốt lõi SGK Lớp 6-7 chủ đề bảo vệ môi trường trường học."
        },
        {
          word: "habit",
          ipa: "/ˈhæbɪt/",
          partOfSpeech: "noun",
          meaningVi: "Thói quen hàng ngày",
          contextSentence: "By practicing these simple green habits, young pupils help...",
          collocationOrFamily: "form a habit / green habits",
          examTipVi: "Đi với giới từ: in the habit of doing sth."
        },
        {
          word: "remind",
          ipa: "/rɪˈmaɪnd/",
          partOfSpeech: "verb",
          meaningVi: "Nhắc nhở ai làm gì",
          contextSentence: "The friendly teachers always remind children to turn off ceiling fans...",
          collocationOrFamily: "remind somebody to do something",
          examTipVi: "Cấu trúc đề thi quan trọng: remind someone to V (nhắc làm gì), phân biệt với remind someone of something (gợi nhớ về)."
        }
      ],
      grammarAnalysis: [
        {
          structureName: "Cấu trúc Remind somebody to do something",
          formula: "S + remind(s) + O + to V-bare",
          extractedExample: "The friendly teachers always remind children to turn off ceiling fans before leaving.",
          explanationVi: "Dùng để diễn tả hành động nhắc nhở ai đó thực hiện một việc gì đó.",
          trapOrUsageVi: "Sau 'remind' đi với tân ngữ rồi đến động từ nguyên mẫu có 'to' (to V)."
        }
      ],
      quiz: [
        {
          id: "q-1",
          type: "main-idea",
          question: "What is the main topic of the short text?",
          options: [
            "Students following simple green habits to keep their school clean.",
            "How to repair broken ceiling fans in the school.",
            "Why riding bicycles in the rain is dangerous.",
            "Buying new paper and notebooks for class."
          ],
          correctIndex: 0,
          explanationVi: "Bài đọc nói về các thói quen xanh đơn giản hàng ngày của học sinh tại trường để giữ trường học luôn sạch đẹp.",
          clueSentenceEn: "By practicing these simple green habits, young pupils help keep their school clean and beautiful."
        },
        {
          id: "q-2",
          type: "detail",
          question: "Where do students put empty plastic bottles?",
          options: [
            "On the playground grass",
            "Into designated recycling bins",
            "Inside the teachers' room",
            "Under the wooden tables"
          ],
          correctIndex: 1,
          explanationVi: "Câu số 2 chỉ rõ học sinh bỏ chai nhựa vào thùng rác tái chế: 'Into designated recycling bins'.",
          clueSentenceEn: "Inside the building, they place empty plastic bottles and paper into designated recycling bins."
        },
        {
          id: "q-3",
          type: "grammar",
          question: "What do teachers remind students to do before leaving?",
          options: [
            "Turn off ceiling fans",
            "Sing a goodbye song",
            "Buy snacks outside",
            "Draw a picture"
          ],
          correctIndex: 0,
          explanationVi: "Thầy cô nhắc nhở học sinh tắt quạt trần trước khi ra về: 'turn off ceiling fans before leaving'.",
          clueSentenceEn: "The friendly teachers always remind children to turn off ceiling fans before leaving."
        }
      ],
      createdAt: new Date().toISOString()
    };
  }

  // Standard 120-150 words passage
  return {
    id: `reading-${Date.now()}`,
    titleEn: isChuyen ? "The Imperative of Sustainable Development" : "Youth Taking Action for Our Planet",
    titleVi: isChuyen ? "Tính Cấp Bách của Phát Triển Bền Vững" : "Tuổi Trẻ Hành Động Vì Hành Tinh Chúng Ta",
    topic: topic || "Môi trường & Sinh thái",
    grade: Number(grade) || 8,
    cefrLevel: targetLevel || "B1+ / B2",
    wordCount: 136,
    lengthType: "standard",
    contentEn: "Across the globe, young people are championing practical initiatives to protect our fragile natural environment. In many secondary schools, students have established vibrant ecological clubs aimed at reducing single-use plastic waste. Instead of discarding containers after lunch, they bring reusable stainless-steel bottles and bamboo utensils. Furthermore, community tree-planting campaigns have revitalized barren suburban parks, which in turn nurtures urban biodiversity. Experts emphasize that environmental degradation can only be reversed when communities adopt sustainable habits collectively. By choosing bicycles over motorbikes and sorting recyclable waste diligently, adolescents demonstrate that meaningful ecological conservation starts with small personal decisions. If such eco-friendly practices are maintained persistently, future generations will inherit a cleaner, healthier planet. Inspiring grassroots actions prove that young voices are truly capable of transforming ecological awareness into tangible everyday solutions.",
    contentVi: "Trên khắp thế giới, giới trẻ đang đi đầu trong các sáng kiến thực tiễn nhằm bảo vệ môi trường tự nhiên mong manh của chúng ta. Tại nhiều trường trung học cơ sở, học sinh đã thành lập các câu lạc bộ sinh thái sôi nổi hướng tới việc giảm thiểu rác thải nhựa dùng một lần. Thay vì vứt bỏ hộp đựng sau bữa trưa, các em mang theo bình inox tái sử dụng và dụng cụ ăn bằng tre. Hơn nữa, các chiến dịch trồng cây cộng đồng đã hồi sinh những công viên ngoại ô cằn cỗi, từ đó nuôi dưỡng sự đa dạng sinh học nơi đô thị. Các chuyên gia nhấn mạnh rằng sự suy thoái môi trường chỉ có thể được đảo ngược khi cộng đồng cùng nhau hình thành các thói quen bền vững. Bằng cách chọn đi xe đạp thay vì xe máy và chăm chỉ phân loại rác tái chế, thanh thiếu niên chứng minh rằng việc bảo tồn sinh thái có ý nghĩa bắt đầu từ những quyết định cá nhân nhỏ bé. Nếu những thói quen thân thiện với môi trường như vậy được duy trì bền bỉ, các thế hệ tương lai sẽ được thừa hưởng một hành tinh trong lành, khỏe mạnh hơn. Những hành động cơ sở đầy cảm hứng chứng minh rằng tiếng nói của người trẻ thực sự có khả năng biến nhận thức sinh thái thành những giải pháp hữu hình hàng ngày.",
    sentences: [
      {
        id: "s-1",
        en: "Across the globe, young people are championing practical initiatives to protect our fragile natural environment.",
        vi: "Trên khắp thế giới, giới trẻ đang đi đầu trong các sáng kiến thực tiễn nhằm bảo vệ môi trường tự nhiên mong manh của chúng ta."
      },
      {
        id: "s-2",
        en: "In many secondary schools, students have established vibrant ecological clubs aimed at reducing single-use plastic waste.",
        vi: "Tại nhiều trường trung học cơ sở, học sinh đã thành lập các câu lạc bộ sinh thái sôi nổi hướng tới việc giảm thiểu rác thải nhựa dùng một lần."
      },
      {
        id: "s-3",
        en: "Instead of discarding containers after lunch, they bring reusable stainless-steel bottles and bamboo utensils.",
        vi: "Thay vì vứt bỏ hộp đựng sau bữa trưa, các em mang theo bình inox tái sử dụng và dụng cụ ăn bằng tre."
      },
      {
        id: "s-4",
        en: "Furthermore, community tree-planting campaigns have revitalized barren suburban parks, which in turn nurtures urban biodiversity.",
        vi: "Hơn nữa, các chiến dịch trồng cây cộng đồng đã hồi sinh những công viên ngoại ô cằn cỗi, từ đó nuôi dưỡng sự đa dạng sinh học nơi đô thị."
      },
      {
        id: "s-5",
        en: "Experts emphasize that environmental degradation can only be reversed when communities adopt sustainable habits collectively.",
        vi: "Các chuyên gia nhấn mạnh rằng sự suy thoái môi trường chỉ có thể được đảo ngược khi cộng đồng cùng nhau hình thành các thói quen bền vững."
      },
      {
        id: "s-6",
        en: "By choosing bicycles over motorbikes and sorting recyclable waste diligently, adolescents demonstrate that meaningful ecological conservation starts with small personal decisions.",
        vi: "Bằng cách chọn đi xe đạp thay vì xe máy và chăm chỉ phân loại rác tái chế, thanh thiếu niên chứng minh rằng việc bảo tồn sinh thái có ý nghĩa bắt đầu từ những quyết định cá nhân nhỏ bé."
      },
      {
        id: "s-7",
        en: "If such eco-friendly practices are maintained persistently, future generations will inherit a cleaner, healthier planet.",
        vi: "Nếu những thói quen thân thiện với môi trường như vậy được duy trì bền bỉ, các thế hệ tương lai sẽ được thừa hưởng một hành tinh trong lành, khỏe mạnh hơn."
      },
      {
        id: "s-8",
        en: "Inspiring grassroots actions prove that young voices are truly capable of transforming ecological awareness into tangible everyday solutions.",
        vi: "Những hành động cơ sở đầy cảm hứng chứng minh rằng tiếng nói của người trẻ thực sự có khả năng biến nhận thức sinh thái thành những giải pháp hữu hình hàng ngày."
      }
    ],
    vocabAnalysis: [
      {
        word: "champion",
        ipa: "/ˈtʃæmpiən/",
        partOfSpeech: "verb",
        meaningVi: "Đi đầu, tích cực ủng hộ cho một mục tiêu cao đẹp",
        contextSentence: "Young people are championing practical initiatives to protect our fragile natural environment.",
        collocationOrFamily: "champion a cause / environmental champion",
        examTipVi: "Từ vựng B2 thường gặp: 'champion' là động từ mang nghĩa tiên phong, bảo vệ."
      },
      {
        word: "biodiversity",
        ipa: "/ˌbaɪəʊdaɪˈvɜːsəti/",
        partOfSpeech: "noun",
        meaningVi: "Đa dạng sinh học",
        contextSentence: "...which in turn nurtures urban biodiversity.",
        collocationOrFamily: "biodiversity loss / rich biodiversity",
        examTipVi: "Cấu tạo từ: Tiền tố Bio (sinh học) + Diversity (sự đa dạng)."
      },
      {
        word: "degradation",
        ipa: "/ˌdeɡrəˈdeɪʃn/",
        partOfSpeech: "noun",
        meaningVi: "Sự suy thoái, xuống cấp",
        contextSentence: "Experts emphasize that environmental degradation can only be reversed...",
        collocationOrFamily: "environmental degradation / soil degradation",
        examTipVi: "Động từ tương ứng: 'degrade' (/dɪˈɡreɪd/)."
      },
      {
        word: "tangible",
        ipa: "/ˈtændʒəbl/",
        partOfSpeech: "adjective",
        meaningVi: "Hữu hình, cụ thể, thấy rõ được kết quả",
        contextSentence: "...transforming ecological awareness into tangible everyday solutions.",
        collocationOrFamily: "tangible results / tangible benefits",
        examTipVi: "Từ đồng nghĩa phổ biến trong đề thi: tangible ≈ concrete / real."
      }
    ],
    grammarAnalysis: [
      {
        structureName: "Mệnh đề quan hệ không xác định bổ nghĩa cả câu (, which)",
        formula: ", which + V...",
        extractedExample: "...barren suburban parks, which in turn nurtures urban biodiversity.",
        explanationVi: "Đại từ quan hệ 'which' đứng sau dấu phẩy để bổ nghĩa cho toàn bộ hành động 'hồi sinh các công viên cằn cỗi' phía trước.",
        trapOrUsageVi: "Trong đề thi Chuyên Anh, không bao giờ được dùng 'that' sau dấu phẩy."
      },
      {
        structureName: "Câu điều kiện loại 1 thể bị động (First Conditional Passive)",
        formula: "If + S + are/is + V3/ed, S + will + V-bare",
        extractedExample: "If such eco-friendly practices are maintained persistently, future generations will inherit a cleaner planet.",
        explanationVi: "Diễn tả kết quả có thể xảy ra trong tương lai nếu duy trì thói quen xanh.",
        trapOrUsageVi: "Trạng từ 'persistently' đứng bổ nghĩa trực tiếp cho động từ bị động 'maintained'."
      }
    ],
    quiz: [
      {
        id: "q-1",
        type: "main-idea",
        question: "What is the primary theme of the passage?",
        options: [
          "Only high-tech robots can save barren parks from pollution.",
          "Youth-driven practical actions and daily habits effectively foster ecological conservation.",
          "Secondary schools should extend the lunch break hours.",
          "Bicycles are excessively expensive in modern cities."
        ],
        correctIndex: 1,
        explanationVi: "Toàn bộ bài đọc tập trung vào việc thanh thiếu niên chủ động thay đổi thói quen hàng ngày để bảo vệ môi trường.",
        clueSentenceEn: "Adolescents demonstrate that meaningful ecological conservation starts with small personal decisions."
      },
      {
        id: "q-2",
        type: "detail",
        question: "What do students bring for lunch instead of discarding containers?",
        options: [
          "Disposable paper napkins and spoons",
          "Reusable stainless-steel bottles and bamboo utensils",
          "Multiple plastic sandwich bags",
          "Pre-cooked canned food"
        ],
        correctIndex: 1,
        explanationVi: "Câu số 3 chỉ rõ: 'Instead of discarding containers after lunch, they bring reusable stainless-steel bottles and bamboo utensils.'",
        clueSentenceEn: "Instead of discarding containers after lunch, they bring reusable stainless-steel bottles and bamboo utensils."
      },
      {
        id: "q-3",
        type: "vocabulary",
        question: "The word 'TANGIBLE' in the final sentence is closest in meaning to:",
        options: ["imaginary", "concrete", "theoretical", "confidential"],
        correctIndex: 1,
        explanationVi: "'Tangible' có nghĩa là hữu hình, cụ thể, thực tế (đồng nghĩa với 'concrete').",
        clueSentenceEn: "...transforming ecological awareness into tangible everyday solutions."
      },
      {
        id: "q-4",
        type: "inference",
        question: "What can be inferred about the community tree-planting campaigns?",
        options: [
          "They were abandoned due to lack of seedlings.",
          "They successfully revived abandoned parks and supported wildlife variety.",
          "They created traffic jams in the city centre.",
          "They were organized only for professional scientists."
        ],
        correctIndex: 1,
        explanationVi: "Đoạn văn khẳng định việc trồng cây đã hồi sinh công viên cằn cỗi và nuôi dưỡng đa dạng sinh học thành thị.",
        clueSentenceEn: "Furthermore, community tree-planting campaigns have revitalized barren suburban parks, which in turn nurtures urban biodiversity."
      }
    ],
    createdAt: new Date().toISOString()
  };
}


function getFallbackGeneratedLesson(
  topic: string,
  grade: number = 9,
  targetLevel: string = "B2 (Chuyên Anh 10)",
  excludeWords: string[] = []
) {
  const gradeNum = Number(grade) || 6;
  const excludedSet = new Set((excludeWords || []).map(w => w.toLowerCase().trim()));

  // 1. Grade 3 Fallback (Pre-A1 Tiểu học)
  if (gradeNum <= 3) {
    return {
      id: `lesson-${Date.now()}`,
      topic: topic || "Màu sắc & Đồ dùng học tập",
      grade: 3,
      cefrLevel: "Pre-A1 (Tiểu học Lớp 3)",
      title: `🎒 Khám Phá: ${topic || "Màu Sắc & Đồ Dùng Học Tập"} (Colors & School Supplies)`,
      objectiveVi: "Nhận biết, đọc chuẩn và tự tin gọi tên các đồ dùng học tập cùng màu sắc yêu thích bằng tiếng Anh.",
      conceptExplanation: "Chào bé yêu! Trong lớp học, chúng ta có rất nhiều người bạn nhỏ như bút chì, thước kẻ, cặp sách. Để hỏi 'Đây là cái gì?', con chỉ cần nói: 'What is this?'. Khi trả lời: 'It is a / an + tên đồ vật' nhé! Ví dụ: It is a pen (Đây là một cái bút).",
      vocabAndCollocations: [
        {
          word: "pencil case",
          ipa: "/ˈpen.səl keɪs/",
          partOfSpeech: "noun",
          meaningVi: "hộp đựng bút",
          exampleEn: "This is my colorful pencil case.",
          exampleVi: "Đây là chiếc hộp bút đầy màu sắc của tớ.",
          examNote: "Mẹo nhớ: 'pencil' là bút chì, 'case' là cái hộp đựng!"
        },
        {
          word: "school bag",
          ipa: "/ˈskuːl bæɡ/",
          partOfSpeech: "noun",
          meaningVi: "cặp sách đi học",
          exampleEn: "My school bag is blue and yellow.",
          exampleVi: "Cặp sách của tớ màu xanh dương và vàng.",
          examNote: "Nhớ phát âm rõ âm đuôi /g/ trong 'bag' con nhé!"
        },
        {
          word: "eraser",
          ipa: "/ɪˈreɪ.sər/",
          partOfSpeech: "noun",
          meaningVi: "cục tẩy, gôm tẩy",
          exampleEn: "I have a pink eraser.",
          exampleVi: "Tớ có một cục tẩy màu hồng.",
          examNote: "Vì bắt đầu bằng nguyên âm 'e' nên ta dùng 'an eraser' nhé!"
        },
        {
          word: "notebook",
          ipa: "/ˈnəʊt.bʊk/",
          partOfSpeech: "noun",
          meaningVi: "quyển vở ghi bài",
          exampleEn: "Open your notebook, please!",
          exampleVi: "Xin mời các em mở vở ghi ra nào!",
          examNote: "Ghép từ note (ghi chép) + book (sách) = quyển vở ghi bài."
        }
      ],
      grammarStructures: [
        {
          name: "Mẫu câu hỏi & trả lời đồ vật ở gần",
          formula: "What is this? -> It is a / an + [Tên đồ vật]",
          exampleEn: "What is this? - It is a ruler.",
          exampleVi: "Đây là cái gì? - Đây là một cây thước kẻ.",
          examTrapVi: "Dùng 'an' trước các từ bắt đầu bằng nguyên âm u, e, o, a, i (như an eraser, an apple)."
        },
        {
          name: "Mẫu câu hỏi màu sắc của đồ vật",
          formula: "What color is it? -> It is + [Màu sắc]",
          exampleEn: "What color is your bag? - It is green.",
          exampleVi: "Cặp của bạn màu gì? - Nó màu xanh lá cây.",
          examTrapVi: "Màu sắc đứng một mình sau 'It is', không thêm mạo từ 'a/an' trước màu sắc nhé."
        }
      ],
      interactiveExercises: [
        {
          id: "ex-1",
          type: "multiple-choice",
          question: "What is this? - It is _______ eraser.",
          options: ["an", "a", "two", "the"],
          correctAnswer: "an",
          explanationVi: "Từ 'eraser' bắt đầu bằng nguyên âm 'e' nên con điền 'an' nhé! Bé làm rất giỏi!"
        },
        {
          id: "ex-2",
          type: "multiple-choice",
          question: "What color is the sun? - It is _______.",
          options: ["yellow", "pen", "bag", "big"],
          correctAnswer: "yellow",
          explanationVi: "Câu hỏi 'What color' hỏi về màu sắc, mặt trời có màu vàng (yellow)."
        },
        {
          id: "ex-3",
          type: "reorder-sentence",
          question: "Sắp xếp các từ thành câu đúng: [is / This / my / pencil case]",
          options: ["This is my pencil case", "My pencil case is This", "Pencil case is my This"],
          correctAnswer: "This is my pencil case",
          explanationVi: "Thứ tự chuẩn: This (đây) + is (là) + my pencil case (hộp bút của tớ)."
        },
        {
          id: "ex-4",
          type: "multiple-choice",
          question: "How many books do you have? - I have _______ books.",
          options: ["three", "one", "a", "an"],
          correctAnswer: "three",
          explanationVi: "Vì từ 'books' có số nhiều '-s' ở đuôi nên ta chọn số lượng 'three' (ba quyển)."
        }
      ],
      tutorTip: "Gia sư AI nhắn bé: Mỗi khi lấy đồ dùng học tập ra, con hãy thử đọc to tên tiếng Anh của nó nhé. Bé sẽ ghi nhớ cực nhanh và nói thật chuẩn!",
      createdAt: new Date().toISOString()
    };
  }

  // 2. Grade 4 Fallback (A1 Tiểu học)
  if (gradeNum === 4) {
    return {
      id: `lesson-${Date.now()}`,
      topic: topic || "Hoạt động hàng ngày & Hiện tại tiếp diễn",
      grade: 4,
      cefrLevel: "A1 (Tiểu học Lớp 4)",
      title: `⏰ Buổi Học: ${topic || "Hoạt Động Hàng Ngày & Thì Hiện Tại Tiếp Diễn"} (Daily Routines & What are you doing?)`,
      objectiveVi: "Thành thạo cách nói về các hành động đang diễn ra ngay lúc này và nói về thời gian biểu hàng ngày.",
      conceptExplanation: "Chào con! Khi muốn nói ai đó đang làm gì ngay lúc này, chúng mình dùng cấu trúc: S + am/is/are + V-ing. Ví dụ: I am reading a book (Tớ đang đọc sách). Còn khi hỏi giờ, mình dùng: What time is it? - It is + [giờ] o'clock!",
      vocabAndCollocations: [
        {
          word: "brush teeth",
          ipa: "/brʌʃ tiːθ/",
          partOfSpeech: "phrase",
          meaningVi: "đánh răng",
          exampleEn: "I brush my teeth every morning and evening.",
          exampleVi: "Tớ đánh răng mỗi sáng và tối.",
          examNote: "Lưu ý: 'teeth' là số nhiều của 'tooth' (chiếc răng) nhé con!"
        },
        {
          word: "breakfast",
          ipa: "/ˈbrek.fəst/",
          partOfSpeech: "noun",
          meaningVi: "bữa ăn sáng",
          exampleEn: "We are having breakfast together.",
          exampleVi: "Chúng mình đang cùng ăn bữa sáng.",
          examNote: "Phát âm là /ˈbrekfəst/, đừng đọc nhầm thành break-fast nhé."
        },
        {
          word: "timetable",
          ipa: "/ˈtaɪmˌteɪ.bl/",
          partOfSpeech: "noun",
          meaningVi: "thời khóa biểu",
          exampleEn: "Look at our new class timetable.",
          exampleVi: "Hãy nhìn vào thời khóa biểu mới của lớp mình này.",
          examNote: "Ghép từ: time (thời gian) + table (bảng)."
        },
        {
          word: "subject",
          ipa: "/ˈsʌb.dʒɪkt/",
          partOfSpeech: "noun",
          meaningVi: "môn học ở trường",
          exampleEn: "English is my favorite subject.",
          exampleVi: "Tiếng Anh là môn học yêu thích nhất của tớ.",
          examNote: "Hỏi môn học yêu thích: 'What subjects do you like?'"
        }
      ],
      grammarStructures: [
        {
          name: "Mẫu câu thì hiện tại tiếp diễn (đang làm gì)",
          formula: "What are you doing? -> I am + V-ing | What is he/she doing? -> He/She is + V-ing",
          exampleEn: "What are you doing? - I am doing my homework.",
          exampleVi: "Bạn đang làm gì đấy? - Tớ đang làm bài tập về nhà.",
          examTrapVi: "Đừng quên thêm đuôi '-ing' vào sau động từ hành động nhé!"
        },
        {
          name: "Mẫu câu hỏi giờ giấc",
          formula: "What time is it? -> It is + [số giờ] o'clock",
          exampleEn: "What time is it? - It is seven o'clock.",
          exampleVi: "Mấy giờ rồi? - Bây giờ là 7 giờ đúng.",
          examTrapVi: "Chỉ dùng 'o'clock' cho giờ chẵn, không dùng kèm số phút lẻ."
        }
      ],
      interactiveExercises: [
        {
          id: "ex-1",
          type: "multiple-choice",
          question: "Look! Nam is _______ football in the school yard.",
          options: ["playing", "plays", "play", "played"],
          correctAnswer: "playing",
          explanationVi: "Có từ 'Look!' và trợ động từ 'is', đây là thì hiện tại tiếp diễn nên động từ phải thêm '-ing': playing."
        },
        {
          id: "ex-2",
          type: "multiple-choice",
          question: "What time do you get up? - I get up _______ 6:00 a.m.",
          options: ["at", "in", "on", "to"],
          correctAnswer: "at",
          explanationVi: "Chỉ mốc thời gian giờ giấc cụ thể luôn đi với giới từ 'at' (at 6:00 a.m)."
        },
        {
          id: "ex-3",
          type: "multiple-choice",
          question: "What is Mai doing? - She is _______ her teeth.",
          options: ["brushing", "brush", "brushes", "brushed"],
          correctAnswer: "brushing",
          explanationVi: "Cấu trúc She is + V-ing: She is brushing her teeth."
        },
        {
          id: "ex-4",
          type: "multiple-choice",
          question: "When is your birthday? - It is _______ May.",
          options: ["in", "on", "at", "by"],
          correctAnswer: "in",
          explanationVi: "Trước tháng (May - tháng 5) hoặc trước năm, ta luôn dùng giới từ 'in'!"
        }
      ],
      tutorTip: "Bí quyết học giỏi Lớp 4: Hãy biến các hoạt động trong ngày thành thói quen tự nói nhẩm tiếng Anh: 'I am eating breakfast', 'I am walking to school'. Phản xạ của con sẽ tiến bộ vượt bậc!",
      createdAt: new Date().toISOString()
    };
  }

  // 3. Grade 5 Fallback (A1+ Tiểu học)
  if (gradeNum === 5) {
    return {
      id: `lesson-${Date.now()}`,
      topic: topic || "Kỳ nghỉ đáng nhớ & Thì quá khứ đơn",
      grade: 5,
      cefrLevel: "A1+ (Tiểu học Lớp 5 - Trọng tâm thi vào Lớp 6 CLC)",
      title: `✈️ Chuyên Đề: ${topic || "Kỳ Nghỉ Đáng Nhớ & Thì Quá Khứ Đơn"} (Where did you go on holiday?)`,
      objectiveVi: "Thành thạo cách dùng thì Quá khứ đơn với động từ bất quy tắc (went, saw, ate) để kể về chuyến đi du lịch và chuẩn bị tốt cho các bài khảo sát vào lớp 6 CLC.",
      conceptExplanation: "Chào con! Để kể lại một sự việc đã diễn ra và kết thúc trong quá khứ (như kỳ nghỉ hè năm ngoái), ta dùng thì Quá khứ đơn: S + V2/ed. Đặc biệt, nhiều động từ thông dụng sẽ đổi dạng (bất quy tắc): go -> went, see -> saw, eat -> ate, have -> had. Cùng ghi nhớ để không bị nhầm lẫn nhé!",
      vocabAndCollocations: [
        {
          word: "holiday",
          ipa: "/ˈhɒl.ə.deɪ/",
          partOfSpeech: "noun",
          meaningVi: "kỳ nghỉ, chuyến đi nghỉ",
          exampleEn: "We had a wonderful summer holiday in Da Nang.",
          exampleVi: "Gia đình tớ đã có một kỳ nghỉ hè tuyệt vời ở Đà Nẵng.",
          examNote: "Cụm từ hay gặp: on holiday (đang đi nghỉ mát)."
        },
        {
          word: "visited",
          ipa: "/ˈvɪz.ɪ.tɪd/",
          partOfSpeech: "verb (past)",
          meaningVi: "đã ghé thăm (dạng quá khứ của visit)",
          exampleEn: "Last month, I visited my grandparents' farm.",
          exampleVi: "Tháng trước, tớ đã về thăm trang trại của ông bà.",
          examNote: "Đuôi '-ed' sau âm /t/ đọc là /ɪd/: vi-zi-tid."
        },
        {
          word: "delicious",
          ipa: "/dɪˈlɪʃ.əs/",
          partOfSpeech: "adjective",
          meaningVi: "thơm ngon, ngon miệng",
          exampleEn: "We ate a lot of delicious seafood.",
          exampleVi: "Chúng tớ đã thưởng thức rất nhiều hải sản thơm ngon.",
          examNote: "Trọng âm rơi vào âm tiết thứ 2: de-LI-cious."
        },
        {
          word: "souvenir",
          ipa: "/ˌsuː.vəˈnɪər/",
          partOfSpeech: "noun",
          meaningVi: "đồ lưu niệm, quà kỷ niệm",
          exampleEn: "Mai bought some cute souvenirs for her friends.",
          exampleVi: "Mai đã mua một vài món đồ lưu niệm xinh xắn cho bạn bè.",
          examNote: "Cụm từ: buy souvenirs (mua quà lưu niệm)."
        }
      ],
      grammarStructures: [
        {
          name: "Mẫu câu hỏi đã đi đâu trong kỳ nghỉ",
          formula: "Where did you go on holiday? -> I went to + [Địa điểm]",
          exampleEn: "Where did you go last summer? - I went to Phu Quoc Island.",
          exampleVi: "Hè năm ngoái bạn đã đi đâu? - Tớ đã đi đảo Phú Quốc.",
          examTrapVi: "Trong câu hỏi có trợ động từ 'did' thì động từ chính 'go' giữ nguyên mẫu, nhưng câu trả lời phải đổi thành 'went'!"
        },
        {
          name: "Mẫu câu so sánh hơn của tính từ ngắn",
          formula: "S1 + be + short-adj + ER + THAN + S2",
          exampleEn: "Da Nang is larger and more modern than my hometown.",
          exampleVi: "Đà Nẵng rộng lớn và hiện đại hơn quê của tớ.",
          examTrapVi: "Tính từ 1 âm tiết gấp đôi phụ âm cuối khi đứng sau 1 nguyên âm duy nhất: big -> bigger."
        }
      ],
      interactiveExercises: [
        {
          id: "ex-1",
          type: "multiple-choice",
          question: "Where _______ you go on holiday last summer?",
          options: ["did", "do", "does", "are"],
          correctAnswer: "did",
          explanationVi: "Có dấu hiệu thời gian quá khứ 'last summer', câu hỏi dùng trợ động từ 'did'."
        },
        {
          id: "ex-2",
          type: "multiple-choice",
          question: "Yesterday, my family _______ to the zoo by bus.",
          options: ["went", "go", "goes", "going"],
          correctAnswer: "went",
          explanationVi: "Dấu hiệu 'Yesterday' (hôm qua), dạng quá khứ của 'go' là 'went'."
        },
        {
          id: "ex-3",
          type: "multiple-choice",
          question: "Ha Long Bay is _______ than my hometown.",
          options: ["more famous", "famouser", "famous", "most famous"],
          correctAnswer: "more famous",
          explanationVi: "'Famous' là tính từ dài 2 âm tiết nên so sánh hơn dùng 'more famous than'."
        },
        {
          id: "ex-4",
          type: "multiple-choice",
          question: "What did you do there? - We _______ delicious seafood.",
          options: ["ate", "eat", "eats", "eating"],
          correctAnswer: "ate",
          explanationVi: "Câu hỏi hỏi ở quá khứ 'did you do', câu trả lời dùng động từ quá khứ 'ate'."
        }
      ],
      tutorTip: "Lời khuyên chuẩn bị vào Lớp 6: Con hãy lập một bảng gồm 20 động từ bất quy tắc quen thuộc nhất (go-went, see-saw, eat-ate, have-had, do-did...). Mỗi ngày học thuộc 3 từ là con sẽ tự tin đạt điểm 10!",
      createdAt: new Date().toISOString()
    };
  }

  // 4. Grade 6 Fallback (A2 THCS Đầu cấp)
  if (gradeNum === 6) {
    return {
      id: `lesson-${Date.now()}`,
      topic: topic || "My New School & Present Tenses",
      grade: 6,
      cefrLevel: "A2 (THCS Lớp 6 - Khởi đầu cấp 2)",
      title: `🎒 Chuyên Đề: ${topic || "Trường Học Mới & Hiện Tại Đơn vs Tiếp Diễn"} (My New School & Present Tenses)`,
      objectiveVi: "Làm quen với môi trường học tập THCS, phân biệt rạch ròi giữa thì Hiện tại đơn (thói quen, lịch trình) và Hiện tại tiếp diễn (đang diễn ra).",
      conceptExplanation: "Chào học sinh Lớp 6! Bước vào cấp 2, ngữ pháp tiếng Anh bắt đầu có hệ thống rõ ràng hơn. Thì Hiện tại đơn (S + V(s/es)) dùng cho thói quen hàng ngày hoặc thời khóa biểu cố định. Thì Hiện tại tiếp diễn (S + am/is/are + V-ing) dùng khi hành động đang xảy ra ngay lúc nói (dấu hiệu: now, at the moment, Look!, Listen!).",
      vocabAndCollocations: [
        {
          word: "uniform",
          ipa: "/ˈjuː.nɪ.fɔːm/",
          partOfSpeech: "noun",
          meaningVi: "đồng phục học sinh",
          exampleEn: "We always wear school uniform on Mondays.",
          exampleVi: "Chúng mình luôn mặc đồng phục trường vào các ngày thứ Hai.",
          examNote: "Cụm từ thông dụng: wear uniform (mặc đồng phục)."
        },
        {
          word: "equipment",
          ipa: "/ɪˈkwɪp.mənt/",
          partOfSpeech: "noun (uncountable)",
          meaningVi: "trang thiết bị, đồ dùng thực hành",
          exampleEn: "Our science lab has modern computer equipment.",
          exampleVi: "Phòng thí nghiệm khoa học của trường có các thiết bị máy tính hiện đại.",
          examNote: "Bẫy đề thi: 'equipment' là danh từ không đếm được, KHÔNG thêm 's' ở đuôi!"
        },
        {
          word: "boarding school",
          ipa: "/ˈbɔː.dɪŋ skuːl/",
          partOfSpeech: "noun",
          meaningVi: "trường nội trú",
          exampleEn: "Students at a boarding school study and live away from home.",
          exampleVi: "Học sinh tại trường nội trú học tập và sinh hoạt xa nhà.",
          examNote: "Phân biệt với 'day school' (trường bán trú / học ban ngày)."
        },
        {
          word: "neighbourhood",
          ipa: "/ˈneɪ.bə.hʊd/",
          partOfSpeech: "noun",
          meaningVi: "khu dân cư, khu phố lân cận",
          exampleEn: "My new neighbourhood is quiet and friendly.",
          exampleVi: "Khu phố mới của tớ rất yên tĩnh và thân thiện.",
          examNote: "Người hàng xóm là 'neighbour', còn khu vực xung quanh là 'neighbourhood'."
        }
      ],
      grammarStructures: [
        {
          name: "Phân biệt Hiện tại đơn & Hiện tại tiếp diễn",
          formula: "HTĐ: S + V(s/es) (thói quen, always, usually) vs. HTTD: S + am/is/are + V-ing (now, Look!)",
          exampleEn: "Nam usually walks to school, but today he is riding a bicycle.",
          exampleVi: "Nam thường đi bộ đến trường, nhưng hôm nay cậu ấy đang đi xe đạp.",
          examTrapVi: "Động từ chỉ trạng thái/cảm xúc (like, love, know, understand, need) KHÔNG chia tiếp diễn!"
        },
        {
          name: "So sánh hơn của tính từ ngắn và tính từ dài",
          formula: "Ngắn: S1 + is/are + adj-er + than + S2 | Dài: S1 + is/are + MORE + adj + than + S2",
          exampleEn: "My new school is larger and more modern than my old one.",
          exampleVi: "Trường mới của tớ rộng hơn và hiện đại hơn trường cũ.",
          examTrapVi: "Nhớ các trường hợp đặc biệt: good -> better, bad -> worse, far -> farther/further."
        }
      ],
      interactiveExercises: [
        {
          id: "ex-1",
          type: "multiple-choice",
          question: "Listen! Someone _______ at the classroom door.",
          options: ["is knocking", "knocks", "knocked", "are knocking"],
          correctAnswer: "is knocking",
          explanationVi: "Có hiệu lệnh gây chú ý 'Listen!' cho thấy hành động đang diễn ra -> thì Hiện tại tiếp diễn với chủ ngữ Someone số ít: is knocking."
        },
        {
          id: "ex-2",
          type: "multiple-choice",
          question: "Lan _______ to English club every Friday afternoon.",
          options: ["goes", "is going", "go", "went"],
          correctAnswer: "goes",
          explanationVi: "Thói quen lặp lại 'every Friday afternoon' với chủ ngữ Lan (ngôi 3 số ít) chia thì Hiện tại đơn: goes."
        },
        {
          id: "ex-3",
          type: "multiple-choice",
          question: "This science museum is _______ than the historical gallery.",
          options: ["more interesting", "interesting", "interestinger", "most interesting"],
          correctAnswer: "more interesting",
          explanationVi: "'Interesting' là tính từ dài có 3 âm tiết nên so sánh hơn dùng 'more interesting than'."
        },
        {
          id: "ex-4",
          type: "multiple-choice",
          question: "The school library has a lot of modern _______.",
          options: ["equipment", "equipments", "an equipment", "equip"],
          correctAnswer: "equipment",
          explanationVi: "'Equipment' là danh từ không đếm được, không thêm đuôi 's' hay mạo từ 'an'."
        }
      ],
      tutorTip: "Gia sư Lớp 6 khuyên bạn: Khi làm bài tập chia thì, hãy luôn tìm 'từ khóa chỉ thời gian' (dấu hiệu nhận biết) trước khi quyết định chọn đáp án nhé!",
      createdAt: new Date().toISOString()
    };
  }

  // 5. Grade 7 Fallback (A2+/B1 THCS Giữa cấp)
  if (gradeNum === 7) {
    return {
      id: `lesson-${Date.now()}`,
      topic: topic || "Community Service & Conjunctions",
      grade: 7,
      cefrLevel: "A2+/B1 (THCS Lớp 7)",
      title: `🌿 Chuyên Đề: ${topic || "Hoạt Động Cộng Đồng & Liên Từ Although / However"} (Community Service & Linking Words)`,
      objectiveVi: "Nắm vững vốn từ vựng về tình nguyện, lối sống lành mạnh và sử dụng chính xác các liên từ chỉ sự tương phản (Although, However, In spite of).",
      conceptExplanation: "Trong chương trình Lớp 7 GDPT 2018, học sinh cần diễn đạt các ý kiến đa chiều bằng cách dùng liên từ tương phản. 'Although + S + V' (mặc dù) đứng trong mệnh đề phụ, trong khi 'However, + S + V' (tuy nhiên) thường đứng sau dấu chấm hoặc dấu chấm phẩy để nối hai câu độc lập.",
      vocabAndCollocations: [
        {
          word: "volunteer",
          ipa: "/ˌvɒl.ənˈtɪər/",
          partOfSpeech: "noun & verb",
          meaningVi: "tình nguyện viên; làm việc tình nguyện",
          exampleEn: "Many students volunteer to clean up local parks on Sundays.",
          exampleVi: "Nhiều học sinh tình nguyện dọn dẹp các công viên địa phương vào Chủ nhật.",
          examNote: "Cụm danh từ: volunteer work (công việc tình nguyện)."
        },
        {
          word: "donate",
          ipa: "/dəʊˈneɪt/",
          partOfSpeech: "verb",
          meaningVi: "quyên góp, ủng hộ (tiền, quần áo, sách vở)",
          exampleEn: "We donated warm clothes and notebooks to rural children.",
          exampleVi: "Chúng mình đã quyên góp quần áo ấm và vở viết cho trẻ em vùng sâu vùng xa.",
          examNote: "Danh từ tương ứng: donation /dəʊˈneɪʃn/."
        },
        {
          word: "benefit",
          ipa: "/ˈben.ɪ.fɪt/",
          partOfSpeech: "noun",
          meaningVi: "lợi ích, điều hữu ích",
          exampleEn: "Community service brings valuable benefits to society.",
          exampleVi: "Hoạt động phục vụ cộng đồng đem lại nhiều lợi ích quý giá cho xã hội.",
          examNote: "Tính từ: beneficial /ˌben.ɪˈfɪʃ.əl/ (có lợi)."
        },
        {
          word: "community",
          ipa: "/kəˈmjuː.nə.ti/",
          partOfSpeech: "noun",
          meaningVi: "cộng đồng dân cư",
          exampleEn: "We should help poor people in our local community.",
          exampleVi: "Chúng ta nên giúp đỡ người nghèo trong cộng đồng địa phương.",
          examNote: "Trọng âm âm tiết 2: com-MU-ni-ty."
        }
      ],
      grammarStructures: [
        {
          name: "Liên từ tương phản Although / However",
          formula: "Although + S1 + V1, S2 + V2 | S1 + V1. However, S2 + V2",
          exampleEn: "Although the weather was stormy, the volunteers kept helping people.",
          exampleVi: "Mặc dù thời tiết mưa bão, các tình nguyện viên vẫn tiếp tục giúp đỡ mọi người.",
          examTrapVi: "KHÔNG dùng 'Although' và 'But' trong cùng một câu!"
        },
        {
          name: "Thói quen trong quá khứ với Used to",
          formula: "Khẳng định: S + used to + V-inf | Phủ định: S + didn't use to + V-inf",
          exampleEn: "My father used to cycle to work when he was young.",
          exampleVi: "Bố tớ từng đạp xe đi làm khi ông còn trẻ.",
          examTrapVi: "Sau 'didn't', động từ 'use to' bỏ chữ 'd' ở đuôi!"
        }
      ],
      interactiveExercises: [
        {
          id: "ex-1",
          type: "multiple-choice",
          question: "_______ it was raining heavily, the students went out to plant trees.",
          options: ["Although", "Because", "However", "Despite of"],
          correctAnswer: "Although",
          explanationVi: "Nối 2 mệnh đề tương phản chỉ sự nhượng bộ với mệnh đề S + V (it was raining) ta dùng 'Although'."
        },
        {
          id: "ex-2",
          type: "multiple-choice",
          question: "My brother didn't _______ like classical music, but now he loves it.",
          options: ["use to", "used to", "uses to", "using to"],
          correctAnswer: "use to",
          explanationVi: "Trong câu phủ định có trợ động từ 'didn't', ta dùng 'use to' (không có đuôi -d)."
        },
        {
          id: "ex-3",
          type: "multiple-choice",
          question: "They have _______ hundreds of warm coats to needy children.",
          options: ["donated", "donate", "donating", "donation"],
          correctAnswer: "donated",
          explanationVi: "Sau thì Hiện tại hoàn thành 'have' cần một quá khứ phân từ V3/ed: donated."
        },
        {
          id: "ex-4",
          type: "multiple-choice",
          question: "Eating plenty of fresh vegetables is _______ for your health.",
          options: ["beneficial", "benefit", "beneficially", "benefits"],
          correctAnswer: "beneficial",
          explanationVi: "Đứng sau động từ to be 'is' cần một tính từ bổ nghĩa: beneficial (có lợi)."
        }
      ],
      tutorTip: "Gia sư Lớp 7 chia sẻ: Khi gặp câu viết lại tương đương giữa 'Although' và 'In spite of', nhớ công thức: In spite of + Noun phrase / V-ing!",
      createdAt: new Date().toISOString()
    };
  }

  // 6. Grade 8 Fallback (B1 THCS)
  if (gradeNum === 8) {
    return {
      id: `lesson-${Date.now()}`,
      topic: topic || "Leisure Activities & Passive Voice",
      grade: 8,
      cefrLevel: "B1 (THCS Lớp 8 - Bứt phá học lực)",
      title: `🎯 Chuyên Đề: ${topic || "Thời Gian Rảnh Rỗi & Câu Bị Động"} (Leisure Time & Passive Voice)`,
      objectiveVi: "Sử dụng thành thạo các động từ chỉ sự ưa thích đi kèm danh động từ (V-ing) và chuyển đổi câu chủ động sang câu bị động chuẩn xác.",
      conceptExplanation: "Trong chương trình Lớp 8, các em được rèn luyện cấu trúc câu phức tạp hơn. Khi nói về sở thích: fancy, adore, enjoy, detest + V-ing. Về câu bị động: Dùng khi muốn nhấn mạnh đối tượng tiếp nhận hành động hơn là người thực hiện. Công thức nền tảng: S + be (chia theo thì) + V3/ed + (by O).",
      vocabAndCollocations: [
        {
          word: "leisure activity",
          ipa: "/ˈleʒ.ər ækˈtɪv.ə.ti/",
          partOfSpeech: "noun phrase",
          meaningVi: "hoạt động giải trí, thư giãn trong thời gian rảnh",
          exampleEn: "Doing DIY crafts is my favorite leisure activity.",
          exampleVi: "Làm đồ thủ công tự chế là hoạt động giải trí yêu thích nhất của tớ.",
          examNote: "Đồng nghĩa với: recreational activity."
        },
        {
          word: "fond of",
          ipa: "/fɒnd əv/",
          partOfSpeech: "adjective + preposition",
          meaningVi: "say mê, rất thích cái gì",
          exampleEn: "She is fond of learning foreign languages and photography.",
          exampleVi: "Cô ấy rất say mê học ngoại ngữ và nhiếp ảnh.",
          examNote: "Tương đương: keen on, interested in + V-ing/Noun."
        },
        {
          word: "preserve",
          ipa: "/prɪˈzɜːv/",
          partOfSpeech: "verb",
          meaningVi: "bảo tồn, gìn giữ (truyền thống, môi trường)",
          exampleEn: "We need effective policies to preserve our cultural heritage.",
          exampleVi: "Chúng ta cần những chính sách hiệu quả để bảo tồn di sản văn hóa.",
          examNote: "Danh từ: preservation /ˌprez.əˈveɪ.ʃən/."
        },
        {
          word: "originate",
          ipa: "/əˈrɪdʒ.ɪ.neɪt/",
          partOfSpeech: "verb",
          meaningVi: "bắt nguồn, có nguồn gốc từ",
          exampleEn: "This folk festival originated hundreds of years ago.",
          exampleVi: "Lễ hội dân gian này bắt nguồn từ hàng trăm năm trước.",
          examNote: "Đi với giới từ: originate in / originate from."
        }
      ],
      grammarStructures: [
        {
          name: "Động từ chỉ sở thích + V-ing / to-V",
          formula: "fancy / adore / enjoy / mind / detest + V-ING | prefer / love / like + V-ING or TO-V",
          exampleEn: "Do you fancy hanging out with us at the weekend?",
          exampleVi: "Cậu có hứng thú đi dạo chơi cùng chúng mình cuối tuần này không?",
          examTrapVi: "Động từ 'fancy' LUÔN đi với V-ing, không đi với to-V!"
        },
        {
          name: "Câu bị động (Passive Voice) cơ bản",
          formula: "Chủ động: S + V + O -> Bị động: O + BE + V3/ed + (by S)",
          exampleEn: "Ancient pagodas are carefully preserved by the local residents.",
          exampleVi: "Các ngôi chùa cổ được người dân địa phương gìn giữ cẩn thận.",
          examTrapVi: "Nếu chủ ngữ là people, someone, they thì có thể bỏ 'by someone/people' ở câu bị động."
        }
      ],
      interactiveExercises: [
        {
          id: "ex-1",
          type: "multiple-choice",
          question: "My grandfather detests _______ in crowded shopping malls.",
          options: ["shopping", "to shop", "shop", "shopped"],
          correctAnswer: "shopping",
          explanationVi: "Sau động từ ghét/không thích 'detest' luôn đi kèm với danh động từ V-ing: shopping."
        },
        {
          id: "ex-2",
          type: "multiple-choice",
          question: "Millions of greeting cards _______ every Christmas.",
          options: ["are sent", "send", "is sent", "were sent"],
          correctAnswer: "are sent",
          explanationVi: "Chủ ngữ 'Millions of greeting cards' là số nhiều tiếp nhận hành động, thì hiện tại đơn: are + V3 (sent)."
        },
        {
          id: "ex-3",
          type: "multiple-choice",
          question: "Unless you practice listening regularly, you _______ pass the test.",
          options: ["won't", "will", "don't", "wouldn't"],
          correctAnswer: "won't",
          explanationVi: "Câu điều kiện loại 1 với 'Unless' (= If not): Mệnh đề chính mang nghĩa phủ định trong tương lai: won't."
        },
        {
          id: "ex-4",
          type: "multiple-choice",
          question: "Mai is very keen _______ joining the school drama club.",
          options: ["on", "in", "at", "with"],
          correctAnswer: "on",
          explanationVi: "Cụm tính từ đi liền giới từ: keen on (say mê, thích thú)."
        }
      ],
      tutorTip: "Gia sư Lớp 8 nhắn nhủ: Hãy luôn học từ vựng theo cụm (Collocations) như 'keen on', 'fond of', 'mind + V-ing'. Đây là các câu hỏi lấy điểm 9-10 trong các bài kiểm tra 1 tiết và học kỳ!",
      createdAt: new Date().toISOString()
    };
  }

  // 7. Grade 9 Fallback (B1+/B2 THCS Cuối cấp & Ôn thi vào Lớp 10 / Chuyên Anh)
  const allVocabSets = [
    {
      word: "metropolitan",
      ipa: "/ˌmet.rəˈpɒl.ɪ.tən/",
      partOfSpeech: "adjective",
      meaningVi: "thuộc về thủ đô, thành phố lớn hiện đại",
      exampleEn: "Tokyo is one of the most populated metropolitan areas in the world.",
      exampleVi: "Tokyo là một trong những khu vực đô thị đông dân nhất thế giới.",
      examNote: "Danh từ gốc: metropolis /məˈtrɒp.əl.ɪs/ (đô thị lớn)."
    },
    {
      word: "carry out",
      ipa: "/ˈkær.i aʊt/",
      partOfSpeech: "phrasal verb",
      meaningVi: "tiến hành, thực hiện (nghiên cứu, khảo sát, nhiệm vụ)",
      exampleEn: "Scientists are carrying out an extensive survey on air quality.",
      exampleVi: "Các nhà khoa học đang tiến hành một cuộc khảo sát quy mô lớn về chất lượng không khí.",
      examNote: "Đồng nghĩa với: conduct, implement."
    },
    {
      word: "confront",
      ipa: "/kənˈfrʌnt/",
      partOfSpeech: "verb",
      meaningVi: "đối mặt, đương đầu với khó khăn",
      exampleEn: "Big cities must confront severe traffic congestion and pollution.",
      exampleVi: "Các thành phố lớn phải đối mặt với tình trạng ùn tắc giao thông và ô nhiễm nghiêm trọng.",
      examNote: "Cụm danh từ: face-to-face confrontation."
    },
    {
      word: "invaluable",
      ipa: "/ɪnˈvæl.ju.ə.bəl/",
      partOfSpeech: "adjective",
      meaningVi: "vô giá, cực kỳ quý báu",
      exampleEn: "Her advice was invaluable for our exam preparation strategy.",
      exampleVi: "Lời khuyên của cô ấy là vô giá đối với chiến lược ôn thi của chúng tôi.",
      examNote: "Bẫy đề thi tuyển sinh: 'Valueless' mới là vô giá trị, còn 'Invaluable' = priceless (vô giá)."
    }
  ];

  const filteredVocab = allVocabSets.filter(item => !excludedSet.has(item.word.toLowerCase().trim()));
  const selectedVocab = filteredVocab.length >= 3 ? filteredVocab.slice(0, 4) : allVocabSets.slice(0, 4);

  return {
    id: `lesson-${Date.now()}`,
    topic: topic || "City Life & Trọng Tâm Ôn Thi Tuyển Sinh Vào 10",
    grade: 9,
    cefrLevel: targetLevel || "B1+/B2 (Lớp 9 & Thi vào 10)",
    title: `🚀 Chuyên Đề: ${topic || "Đời Sống Đô Thị & Cấu Trúc Trọng Điểm Thi Vào 10"} - Lớp 9`,
    objectiveVi: `Thành thạo cấu trúc So sánh kép (Double Comparative), cụm động từ (Phrasal Verbs) và mệnh đề quan hệ để tối đa hóa điểm thi vào lớp 10 THPT công lập & Chuyên Anh.`,
    conceptExplanation: `Trong kỳ thi tuyển sinh vào lớp 10, cấu trúc so sánh kép 'The + comparative..., the + comparative...' (Càng... càng...) và cụm động từ (Phrasal Verbs) là hai nội dung phân loại học sinh quyết định nhất. Cần nắm chắc cách biến đổi tính từ/trạng từ ngắn và dài để không bị mất điểm đáng tiếc.`,
    vocabAndCollocations: selectedVocab,
    grammarStructures: [
      {
        name: "Cấu trúc so sánh kép (The more... the more...)",
        formula: "The + comparative 1 + S1 + V1, the + comparative 2 + S2 + V2",
        exampleEn: "The more modern the city becomes, the more congested the streets are.",
        exampleVi: "Thành phố càng hiện đại thì đường phố càng đông đúc tắc nghẽn.",
        examTrapVi: "Bắt buộc phải có mạo từ 'The' ở cả hai vế! Nếu vế có tính từ ngắn: The + adj-er."
      },
      {
        name: "Mệnh đề quan hệ xác định & không xác định",
        formula: "Who (người, làm S/O) | Which (vật) | Whose (sở hữu) | Where (nơi chốn)",
        exampleEn: "The artisan whose workshop we visited yesterday produces wonderful ceramics.",
        exampleVi: "Nghệ nhân có xưởng gốm mà chúng tôi ghé thăm hôm qua làm ra những tác phẩm gốm tuyệt đẹp.",
        examTrapVi: "Không dùng 'that' trong mệnh đề quan hệ có dấu phẩy (không xác định) hoặc sau giới từ!"
      }
    ],
    interactiveExercises: [
      {
        id: "ex-1",
        type: "multiple-choice",
        question: "The _______ you practice speaking English, the _______ fluent you will become.",
        options: ["more / more", "most / more", "more / much", "much / more"],
        correctAnswer: "more / more",
        explanationVi: "Cấu trúc so sánh kép đối ứng: The more + S + V, the more + adj + S + V."
      },
      {
        id: "ex-2",
        type: "multiple-choice",
        question: "The local government has decided to _______ an investigation into environmental pollution.",
        options: ["carry out", "look after", "give up", "put off"],
        correctAnswer: "carry out",
        explanationVi: "Cụm động từ 'carry out an investigation' mang nghĩa tiến hành một cuộc điều tra."
      },
      {
        id: "ex-3",
        type: "multiple-choice",
        question: "Ha Long Bay, _______ is recognized by UNESCO, attracts millions of travelers every year.",
        options: ["which", "that", "where", "whom"],
        correctAnswer: "which",
        explanationVi: "Mệnh đề quan hệ không xác định có dấu phẩy bổ nghĩa cho danh từ chỉ địa danh 'Ha Long Bay', làm chủ ngữ cho 'is recognized' nên dùng 'which' (không dùng 'that')."
      },
      {
        id: "ex-4",
        type: "multiple-choice",
        question: "Her grandfather's old diary was _______ to the researchers.",
        options: ["invaluable", "valueless", "value", "valuablely"],
        correctAnswer: "invaluable",
        explanationVi: "'Invaluable' nghĩa là vô giá, cực kỳ quý báu (đóng vai trò tính từ sau was)."
      }
    ],
    tutorTip: "Bí kíp thi vào 10: Hãy tích cực luyện đề tổng hợp và ghi chép 'sổ tay lỗi sai' (Error Log) sau mỗi lần làm đề để phát hiện những bẫy ngữ pháp quen thuộc!",
    createdAt: new Date().toISOString()
  };
}


function getFallbackRoleplayReply(scenario: string, role: string, userMessage: string): string {
  const lower = (userMessage || "").toLowerCase();
  if (scenario?.includes("Restaurant") || role?.includes("Waiter")) {
    if (lower.includes("menu") || lower.includes("order")) {
      return "Certainly! Here is our menu. Today we have fresh apple juice and grilled chicken. What would you like to order?";
    }
    return "Welcome to our restaurant! Table for one? What can I get started for you today?";
  }
  if (scenario?.includes("Airport") || role?.includes("Officer")) {
    if (lower.includes("passport") || lower.includes("here")) {
      return "Thank you. Everything is in order. Are you travelling for business or on holiday?";
    }
    return "Good morning! May I see your passport and boarding pass, please?";
  }
  return "Hello there! It is so nice to meet you. Can you tell me what you like to do on the weekends?";
}

// Rich Fallback Quiz Generator capable of providing up to 50 questions
function generateFallbackQuiz(topic: string, grade: number = 6, requestedCount: number = 5) {
  const isPrimary = Number(grade) <= 5;
  const count = Math.max(3, Math.min(50, Number(requestedCount) || 5));

  const primaryQuestions = [
    {
      q: "What color is the sky on a sunny day?",
      opts: ["It is blue", "It is yellow", "It is green", "It is black"],
      ans: 0,
      exp: "Bầu trời vào ngày nắng có màu xanh da trời (blue)."
    },
    {
      q: "There _______ three pencils in my school bag.",
      opts: ["are", "is", "am", "be"],
      ans: 0,
      exp: "Three pencils là danh từ số nhiều nên dùng động từ to be 'are'."
    },
    {
      q: "My sister _______ her teeth every morning.",
      opts: ["brushes", "brush", "brushing", "brushed"],
      ans: 0,
      exp: "Chủ ngữ My sister ngôi thứ 3 số ít ở thì hiện tại đơn, động từ tận cùng là 'sh' nên thêm 'es' thành brushes."
    },
    {
      q: "What time is it? - It is _______ o'clock.",
      opts: ["eight", "morning", "bag", "blue"],
      ans: 0,
      exp: "Hỏi giờ giấc (What time is it) ta trả lời số giờ kèm o'clock: eight o'clock."
    },
    {
      q: "What _______ you doing? - I am reading a comic book.",
      opts: ["are", "is", "am", "do"],
      ans: 0,
      exp: "Chủ ngữ 'you' trong thì hiện tại tiếp diễn đi với trợ động từ 'are'."
    },
    {
      q: "Where did you go yesterday? - We _______ to the zoo.",
      opts: ["went", "go", "goes", "going"],
      ans: 0,
      exp: "Có từ 'yesterday' (hôm qua), dạng quá khứ của go là went."
    },
    {
      q: "An elephant is _______ than a monkey.",
      opts: ["bigger", "biger", "more big", "biggest"],
      ans: 0,
      exp: "So sánh hơn của tính từ ngắn 'big': gấp đôi phụ âm g thành bigger."
    },
    {
      q: "How _______ books are there on the desk? - There are four.",
      opts: ["many", "much", "old", "often"],
      ans: 0,
      exp: "Hỏi số lượng danh từ đếm được số nhiều (books) ta dùng 'How many'."
    },
    {
      q: "She has _______ English class on Mondays and Fridays.",
      opts: ["an", "a", "two", "the"],
      ans: 0,
      exp: "Từ 'English' bắt đầu bằng nguyên âm 'E' nên dùng mạo từ 'an'."
    },
    {
      q: "What would you like to drink? - I'd like some _______, please.",
      opts: ["orange juice", "bread", "noodles", "chicken"],
      ans: 0,
      exp: "Hỏi về đồ uống (drink) nên chọn nước cam (orange juice)."
    },
    {
      q: "My birthday is _______ October 15th.",
      opts: ["on", "in", "at", "to"],
      ans: 0,
      exp: "Trước ngày tháng cụ thể có ngày ta dùng giới từ 'on'."
    },
    {
      q: "Can your brother ride a bicycle? - Yes, he _______.",
      opts: ["can", "does", "is", "can't"],
      ans: 0,
      exp: "Câu hỏi bắt đầu bằng 'Can', câu trả lời Yes đi với 'can'."
    },
    {
      q: "Where is the cat? - It is _______ the table.",
      opts: ["under", "at", "to", "of"],
      ans: 0,
      exp: "Chỉ vị trí dưới cái bàn ta dùng giới từ 'under'."
    },
    {
      q: "What is your favorite subject? - I like _______ because I love numbers.",
      opts: ["Maths", "Music", "Art", "PE"],
      ans: 0,
      exp: "Yêu thích các con số (numbers) là môn Toán (Maths)."
    },
    {
      q: "How _______ are you? - I am nine years old.",
      opts: ["old", "many", "much", "tall"],
      ans: 0,
      exp: "Hỏi tuổi dùng 'How old are you?'."
    },
  ];

  const earlySecondaryQuestions = [
    {
      q: "Listen! Someone _______ the piano in the music room.",
      opts: ["is playing", "plays", "play", "played"],
      ans: 0,
      exp: "Có dấu hiệu nhận biết 'Listen!' biểu thị hành động đang diễn ra -> thì Hiện tại tiếp diễn."
    },
    {
      q: "My school is _______ than my brother's school.",
      opts: ["more modern", "moderner", "modern", "most modern"],
      ans: 0,
      exp: "So sánh hơn của tính từ dài 'modern' là 'more modern than'."
    },
    {
      q: "There _______ a lot of modern equipment in our school library.",
      opts: ["is", "are", "were", "have"],
      ans: 0,
      exp: "'Equipment' là danh từ không đếm được nên dùng động từ số ít 'is'."
    },
    {
      q: "_______ it was raining heavily, the students went out to clean up the school yard.",
      opts: ["Although", "Because", "However", "Despite of"],
      ans: 0,
      exp: "Mệnh đề chỉ sự nhượng bộ tương phản có S + V ta dùng 'Although'."
    },
    {
      q: "My uncle _______ live in the countryside when he was a child.",
      opts: ["used to", "use to", "uses to", "was used to"],
      ans: 0,
      exp: "Thói quen trong quá khứ đã chấm dứt dùng 'used to + V-inf'."
    },
    {
      q: "You _______ be late for school; it is against the school regulations.",
      opts: ["mustn't", "needn't", "should", "can"],
      ans: 0,
      exp: "Quy định cấm đoán nghiêm ngặt ta dùng 'mustn't' (không được phép)."
    },
    {
      q: "She usually _______ up at 6 a.m., but today she is sleeping late.",
      opts: ["wakes", "is waking", "wake", "waked"],
      ans: 0,
      exp: "Thói quen thường nhật với trạng từ tần suất 'usually' chia thì Hiện tại đơn."
    },
    {
      q: "Eating a lot of fast food is not good _______ your health.",
      opts: ["for", "at", "to", "with"],
      ans: 0,
      exp: "Cụm cố định: be good for something (tốt cho cái gì)."
    },
    {
      q: "They have decided to _______ warm clothes to poor children in mountainous areas.",
      opts: ["donate", "donation", "donating", "donates"],
      ans: 0,
      exp: "Cấu trúc: decide to + V-inf (quyết định làm gì)."
    },
    {
      q: "The cinema is located _______ the bookstore and the supermarket.",
      opts: ["between", "among", "in", "next"],
      ans: 0,
      exp: "Ở giữa hai đối tượng A và B dùng 'between A and B'."
    },
  ];

  const lateSecondaryQuestions = [
    {
      q: "Choose the correct word: 'Neither Lan nor her brothers _______ going to the concert.'",
      opts: ["are", "is", "was", "has been"],
      ans: 0,
      exp: "Cấu trúc 'Neither S1 nor S2': động từ hòa hợp theo S2 (her brothers số nhiều -> are)."
    },
    {
      q: "Unless you _______ hard, you will not pass the final exam.",
      opts: ["study", "don't study", "will study", "studied"],
      ans: 0,
      exp: "Unless = If not. Mệnh đề sau unless dùng thì hiện tại đơn khẳng định: study."
    },
    {
      q: "The teacher asked the students _______ noise in the library.",
      opts: ["not to make", "don't make", "not making", "to not make"],
      ans: 0,
      exp: "Cấu trúc câu tường thuật mệnh lệnh: ask someone not to do something."
    },
    {
      q: "By the time we arrived at the cinema, the movie _______.",
      opts: ["had already started", "already started", "has started", "starts"],
      ans: 0,
      exp: "Hành động xảy ra trước một hành động khác trong quá khứ dùng Quá khứ hoàn thành (had + V3/ed)."
    },
    {
      q: "Solar energy is considered an _______ source of power.",
      opts: ["environment-friendly", "environment-friend", "environmental-friendly", "friendly-environment"],
      ans: 0,
      exp: "Tính từ ghép 'environment-friendly' nghĩa là thân thiện với môi trường."
    },
    {
      q: "If I _______ you, I would take that opportunity immediately.",
      opts: ["were", "was", "am", "have been"],
      ans: 0,
      exp: "Câu điều kiện loại 2 giả định điều không có thật ở hiện tại, to be chia 'were' cho mọi ngôi."
    },
    {
      q: "The man _______ car was stolen reported the incident to the police.",
      opts: ["whose", "who", "whom", "which"],
      ans: 0,
      exp: "Đại từ quan hệ sở hữu chỉ người dùng 'whose' (whose car: chiếc xe của người đàn ông đó)."
    },
    {
      q: "She succeeded _______ passing the high school entrance exam with flying colors.",
      opts: ["in", "on", "at", "with"],
      ans: 0,
      exp: "Cụm cố định: succeed in doing something (thành công trong việc gì)."
    },
    {
      q: "Although it rained heavily, they _______ for school on time.",
      opts: ["set off", "put off", "took off", "turned off"],
      ans: 0,
      exp: "Cụm động từ: set off nghĩa là khởi hành, lên đường."
    },
    {
      q: "Hardly _______ into the classroom when the exam started.",
      opts: ["had the students stepped", "the students had stepped", "did the students step", "have the students stepped"],
      ans: 0,
      exp: "Đảo ngữ quá khứ hoàn thành sau 'Hardly': Hardly + had + S + V3/ed + when..."
    },
    {
      q: "I look forward to _______ you at the weekend party.",
      opts: ["seeing", "see", "saw", "be seen"],
      ans: 0,
      exp: "Cấu trúc: look forward to + V-ing (rất mong chờ điều gì)."
    },
    {
      q: "The new bridge _______ in our city next month.",
      opts: ["will be completed", "will complete", "is completed", "completes"],
      ans: 0,
      exp: "Bị động thì tương lai đơn có mốc 'next month': will be + V3/ed."
    },
    {
      q: "He is capable _______ solving complex mathematical problems quickly.",
      opts: ["of", "for", "with", "at"],
      ans: 0,
      exp: "Cụm từ: be capable of + V-ing (có khả năng làm gì)."
    },
    {
      q: "The more you practice listening, _______ you will become at communication.",
      opts: ["the better", "the good", "the best", "better"],
      ans: 0,
      exp: "Cấu trúc so sánh kép càng... càng: The more... the better..."
    },
    {
      q: "Would you mind _______ the window? It is quite hot in here.",
      opts: ["opening", "to open", "open", "opened"],
      ans: 0,
      exp: "Cấu trúc: Would you mind + V-ing?"
    },
  ];

  let baseQuestions = primaryQuestions;
  if (Number(grade) >= 8) {
    baseQuestions = lateSecondaryQuestions;
  } else if (Number(grade) >= 6) {
    baseQuestions = earlySecondaryQuestions;
  }
  const questions: any[] = [];

  for (let i = 0; i < count; i++) {
    const template = baseQuestions[i % baseQuestions.length];
    questions.push({
      id: `q-${i + 1}`,
      question: template.q,
      options: template.opts,
      correctIndex: template.ans,
      explanation: template.exp
    });
  }

  return {
    id: `quiz-${Date.now()}`,
    title: `Bài kiểm tra: ${topic} - Lớp ${grade} (${count} câu)`,
    topic: topic || "English",
    grade: Number(grade),
    questions
  };
}

// AI Tutor - Quiz Generator Endpoint (supports count up to 50 questions)
app.post("/api/ai/tutor-quiz", async (req, res) => {
  try {
    const { topic = "General English", grade = 6, count = 5, level = "standard" } = req.body;
    const gradeNum = Number(grade) || 6;
    const parsedCount = Math.max(3, Math.min(50, Number(count) || 5));
    const isPrimary = gradeNum <= 5;
    const ai = getGenAI();

    if (!ai) {
      return res.json(generateFallbackQuiz(topic, gradeNum, parsedCount));
    }

    const systemPrompt = `You are an expert English test creator for Vietnamese students in Grade ${gradeNum} (${isPrimary ? "Cấp 1 Tiểu học - GDPT 2018 Primary" : "Cấp 2 THCS - GDPT 2018 Lower Secondary"}).
Create an interactive quiz consisting of EXACTLY ${parsedCount} multiple-choice questions on the topic: "${topic}".
Target Grade: ${gradeNum} (${level}).

CRITICAL CONSTRAINTS:
1. QUANTITY: You MUST generate EXACTLY ${parsedCount} questions (numbered from id "q-1" to "q-${parsedCount}"). DO NOT stop before reaching ${parsedCount} questions.
2. GRADE-APPROPRIATE RIGOR:
   ${isPrimary
     ? `- For Primary Grade ${gradeNum} (Ages ${gradeNum + 5}): Simple vocabulary, natural child-friendly situations, colors, animals, toys, school supplies, daily habits, food, short sentences (5-10 words). Avoid complex syntactic terminology.`
     : `- For Secondary Grade ${gradeNum}: Curriculum-aligned grammar (tenses, passive voice, conditionals, relative clauses), collocations, phrasal verbs, context reading snippets, error correction.`}
3. DIVERSITY:
   - 35% Vocabulary in context & collocations
   - 35% Grammar rules & verb conjugations
   - 15% Everyday situational dialogue
   - 15% Sentence meaning, phonics, or error identification
4. STRUCTURE: 4 distinct options per question and exact correctIndex (0, 1, 2, or 3).
5. EXPLANATION: Each question must include an insightful, encouraging explanation in Vietnamese ("explanation") explaining why the correct answer is chosen.

Format your response in STRICT JSON:
{
  "id": "quiz-${Date.now()}",
  "title": "Bài kiểm tra: ${topic} - Lớp ${gradeNum} (${parsedCount} câu)",
  "topic": "${topic}",
  "grade": ${gradeNum},
  "questions": [
    {
      "id": "q-1",
      "question": "Question text in English",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Chi tiết giải thích ngữ pháp hoặc từ vựng bằng tiếng Việt"
    }
  ]
}`;

    const response = await generateContentWithFallback(ai, {
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5,
      },
      endpointName: "Tutor Quiz",
    });

    const parsed = JSON.parse(cleanJsonText(response.text || "{}"));
    if (!parsed.id) parsed.id = `quiz-${Date.now()}`;
    if (!Array.isArray(parsed.questions) || parsed.questions.length < parsedCount) {
      // If AI generated fewer questions than requested, fill with fallback
      const fallback = generateFallbackQuiz(topic, gradeNum, parsedCount);
      if (!Array.isArray(parsed.questions)) {
        parsed.questions = fallback.questions;
      } else {
        const existingCount = parsed.questions.length;
        for (let i = existingCount; i < parsedCount; i++) {
          parsed.questions.push(fallback.questions[i % fallback.questions.length]);
        }
      }
    }
    parsed.grade = gradeNum;
    parsed.topic = topic;
    return res.json(parsed);
  } catch (error: any) {
    console.warn("AI Tutor quiz using fallback due to:", error?.message || error);
    return res.json(generateFallbackQuiz(req.body.topic, Number(req.body.grade) || 6, Number(req.body.count) || 5));
  }
});

// AI Tutor - Grammar Explainer Endpoint
app.post("/api/ai/tutor-grammar", async (req, res) => {
  try {
    const { grammarPoint = "Thì hiện tại đơn", grade = 6, studentName = "bé" } = req.body;
    const gradeNum = Number(grade) || 6;
    const isPrimary = gradeNum <= 5;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        term: grammarPoint,
        cefrLevel: isPrimary ? "A1 (Tiểu học)" : gradeNum <= 7 ? "A2 (THCS)" : "B1/B2",
        formulaOrPattern: isPrimary ? "S + am/is/are + ... | S + V(s/es)" : "S + V(s/es) + O / S + don't/doesn't + V-inf",
        simpleExplanationVi: isPrimary
          ? `Quy tắc ${grammarPoint} giúp con nói về các thói quen hàng ngày hoặc miêu tả sự vật xung quanh. Ví dụ khi nói về He, She, It thì động từ thêm 's' hoặc 'es' nhé bé!`
          : `Quy tắc ${grammarPoint} dùng để diễn tả thói quen lặp đi lặp lại hoặc sự thật hiển nhiên. Khi chủ ngữ là He, She, It, động từ phải thêm 's' hoặc 'es'.`,
        childFriendlyAnalogyVi: isPrimary
          ? "Giống như chiếc ba lô quen thuộc: Mỗi sáng thức dậy con đeo vào rồi đi học, lặp lại đều đặn mỗi ngày!"
          : "Tương tự như chu kỳ của mặt trời mọc hướng đông: Một quy luật bất biến không đổi!",
        examples: [
          { en: "I brush my teeth every morning.", vi: "Tớ đánh răng mỗi buổi sáng.", highlightWord: "brush" },
          { en: "The sun rises in the east.", vi: "Mặt trời mọc ở hướng đông.", highlightWord: "rises" },
        ],
        commonMistakesVi: isPrimary
          ? "Bé hay quên thêm 's' hoặc 'es' khi chủ ngữ là He, She, It."
          : "Quên không thêm s/es khi chủ ngữ là ngôi thứ 3 số ít (He, She, It) trong câu khẳng định.",
        quickCheckQuiz: {
          question: isPrimary ? "Nam _______ (like) playing football." : "She _______ (watch) cartoons on Sunday morning.",
          options: isPrimary ? ["likes", "like", "liking"] : ["watches", "watch", "is watching"],
          correctIndex: 0,
          explanationVi: isPrimary
            ? "Chủ ngữ Nam là một bạn trai (ngôi thứ 3 số ít) nên động từ 'like' thêm 's' thành 'likes'. Bé làm rất tốt!"
            : "Chủ ngữ She ngôi thứ 3 số ít, động từ tận cùng là 'ch' nên thêm 'es' thành 'watches'.",
        },
      });
    }

    const systemPrompt = `You are a beloved, friendly, pedagogy-certified English Grammar Master for Vietnamese students in Grade ${gradeNum} (${isPrimary ? "Cấp 1 Tiểu học" : "Cấp 2 THCS"}).
Explain the grammar topic: "${grammarPoint}" clearly and memorably for ${studentName} (Grade ${gradeNum}).

Guidelines:
1. Explain intuitively in Vietnamese without intimidating jargon.
2. If Grade <= 5, use friendly analogies and cheerful phrasing suited for kids.
3. Provide formula/pattern clearly.
4. Give 2-3 clear bilingual examples with highlight words.
5. Point out the most frequent exam mistakes / pitfalls in Vietnamese.
6. Provide 1 quick check quiz question with 3 options, correctIndex, and explanationVi.

Format in STRICT JSON:
{
  "term": "${grammarPoint}",
  "cefrLevel": "${isPrimary ? "Pre-A1/A1/A1+" : "A2/B1/B2"}",
  "formulaOrPattern": "Formula string",
  "simpleExplanationVi": "Friendly detailed explanation in Vietnamese",
  "childFriendlyAnalogyVi": "Fun memorable comparison or mnemonic trick",
  "examples": [
    { "en": "English sentence", "vi": "Bản dịch tiếng Việt", "highlightWord": "key grammar word" }
  ],
  "commonMistakesVi": "Common errors and how to avoid them",
  "quickCheckQuiz": {
    "question": "Quiz question text",
    "options": ["Option A", "Option B", "Option C"],
    "correctIndex": 0,
    "explanationVi": "Why this answer is correct"
  }
}`;

    const response = await generateContentWithFallback(ai, {
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5,
      },
      endpointName: "Tutor Grammar",
    });

    const parsed = JSON.parse(cleanJsonText(response.text || "{}"));
    return res.json(parsed);
  } catch (error: any) {
    console.warn("AI Tutor grammar using fallback due to:", error?.message || error);
    return res.json({
      term: req.body.grammarPoint || "Ngữ pháp",
      cefrLevel: "A1/A2",
      formulaOrPattern: "S + V + O",
      simpleExplanationVi: "Cấu trúc câu cơ bản gồm Chủ ngữ (Subject) + Động từ (Verb) + Tân ngữ (Object).",
      examples: [{ en: "I love learning English.", vi: "Tớ yêu việc học tiếng Anh.", highlightWord: "love" }],
      commonMistakesVi: "Nhầm lẫn giữa thì quá khứ và hiện tại.",
      quickCheckQuiz: {
        question: "I _______ books every evening.",
        options: ["read", "reads", "reading"],
        correctIndex: 0,
        explanationVi: "Chủ ngữ 'I' đi với động từ nguyên mẫu 'read'.",
      },
    });
  }
});

// AI Tutor - Vocabulary Explainer Endpoint (Grade-aware: Cấp 1 (3,4,5) vs Cấp 2 (6,7,8,9))
app.post("/api/ai/tutor-vocab", async (req, res) => {
  try {
    const { word = "wonderful", grade = 6, studentName = "bé" } = req.body;
    const gradeNum = Number(grade) || 6;
    const isPrimary = gradeNum <= 5;
    const ai = getGenAI();

    if (!ai) {
      if (isPrimary) {
        return res.json({
          word,
          ipa: "/ˈwʌndəfl/",
          partOfSpeech: "adjective",
          meaningVi: "tuyệt vời, kỳ diệu, rất hay",
          level: gradeNum === 3 ? "Pre-A1 (Lớp 3)" : gradeNum === 4 ? "A1 (Lớp 4)" : "A1+ (Lớp 5)",
          synonyms: ["great", "fantastic", "amazing"],
          antonyms: ["bad", "terrible"],
          collocations: ["a wonderful day", "wonderful friends", "have a wonderful time"],
          examples: [
            { en: "We had a wonderful day at the zoo.", vi: "Chúng tớ đã có một ngày thật tuyệt vời ở sở thú." },
            { en: "My teacher is wonderful.", vi: "Cô giáo của tớ thật tuyệt vời." },
          ],
          memoryTipVi: "Mẹo nhớ cho bé: 'Wonder' là điều kỳ diệu + 'ful' là tràn đầy = Tràn đầy điều kỳ diệu tuyệt vời!",
          examNoteVi: "Từ này hay dùng để khen ngợi bạn bè hoặc kể về kỳ nghỉ trong bài tập làm văn!",
        });
      }

      return res.json({
        word,
        ipa: "/ɪnˈvaɪrənmənt/",
        partOfSpeech: "noun",
        meaningVi: "Môi trường sống tự nhiên xung quanh chúng ta",
        level: gradeNum <= 7 ? "A2/B1" : "B1+",
        synonyms: ["surroundings", "ecosystem", "habitat"],
        antonyms: [],
        collocations: ["protect the environment", "environmentally friendly", "pollute the environment"],
        examples: [
          { en: "We must take immediate actions to protect our environment.", vi: "Chúng ta phải hành động ngay lập tức để bảo vệ môi trường." },
          { en: "Deforestation causes severe damage to the natural environment.", vi: "Nạn phá rừng gây ra thiệt hại nghiêm trọng cho môi trường tự nhiên." },
        ],
        memoryTipVi: "Mẹo nhớ: 'En' (bên trong) + 'viron' (vòng tròn bao quanh) -> Môi trường bao quanh ta!",
        examNoteVi: "Thường đi kèm với động từ 'protect', 'conserve' hoặc giới từ 'in the environment' trong đề thi.",
      });
    }

    const primaryPrompt = `You are a loving, certified Primary English Teacher (Cô Mai Anh AI / Thầy Alex AI) for Vietnamese kids in Grade ${gradeNum} (Ages ${gradeNum + 5}).
Explain the word or phrase: "${word}" in a gentle, child-friendly, engaging way for ${studentName}.

Guidelines for Primary (Cấp 1: Lớp ${gradeNum}):
1. Exact IPA and a friendly pronunciation tip in Vietnamese.
2. Natural, simple Vietnamese meaning that an 8-11 year old can understand immediately.
3. CEFR level (Pre-A1 for Grade 3, A1 for Grade 4, A1+ for Grade 5).
4. 2-3 simple synonyms and antonyms.
5. 2-3 fun collocations (cụm từ đi cùng dễ nhớ).
6. 2 cheerful, simple example sentences (5-8 words) with clear Vietnamese translations.
7. A cute, memorable memory tip (mẹo nhớ từ vựng qua hình ảnh hoặc vần điệu).
8. A practical primary exam tip.

Format in STRICT JSON:
{
  "word": "${word}",
  "ipa": "/.../",
  "partOfSpeech": "noun / verb / adjective",
  "meaningVi": "Nghĩa tiếng Việt giản dị, dễ hiểu cho bé",
  "level": "Pre-A1 / A1 / A1+",
  "synonyms": ["synonym1", "synonym2"],
  "antonyms": ["antonym1"],
  "collocations": ["collocation 1", "collocation 2"],
  "examples": [
    { "en": "Simple child-friendly sentence", "vi": "Bản dịch tiếng Việt" }
  ],
  "memoryTipVi": "Mẹo nhớ từ vựng đáng yêu, dễ thuộc cho bé",
  "examNoteVi": "Lưu ý làm bài kiểm tra Tiểu học"
}`;

    const secondaryPrompt = `You are an expert English lexicographer and tutor for Vietnamese secondary students in Grade ${gradeNum} (Cấp 2 THCS - GDPT 2018).
Explain the word or phrase: "${word}" comprehensively for ${studentName}.

Guidelines for Secondary (Cấp 2: Lớp ${gradeNum}):
1. Exact IPA pronunciation.
2. Part of speech and word family.
3. Clear academic Vietnamese definition.
4. CEFR level estimate (A2, B1, B1+, or B2).
5. 2-3 accurate synonyms & antonyms.
6. 3 high-yield collocations, idioms, or phrasal verbs.
7. 2 natural bilingual example sentences.
8. A clever mnemonic memory tip (mẹo nhớ gốc từ / etymology) in Vietnamese.
9. An exam tip / pitfall warning for 9+ and High School Entrance Exams (vào 10).

Format in STRICT JSON:
{
  "word": "${word}",
  "ipa": "/.../",
  "partOfSpeech": "noun / verb / adjective / adverb / phrase",
  "meaningVi": "Nghĩa tiếng Việt chuẩn xác, học thuật",
  "level": "A2/B1/B1+/B2",
  "synonyms": ["synonym1", "synonym2"],
  "antonyms": ["antonym1"],
  "collocations": ["collocation 1", "collocation 2", "collocation 3"],
  "examples": [
    { "en": "Sentence in English", "vi": "Bản dịch tiếng Việt" }
  ],
  "memoryTipVi": "Mẹo nhớ từ vựng sâu sắc, khoa học bằng tiếng Việt",
  "examNoteVi": "Lưu ý bài thi vào 10 hoặc bẫy đề thi"
}`;

    const systemPrompt = isPrimary ? primaryPrompt : secondaryPrompt;

    const response = await generateContentWithFallback(ai, {
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5,
      },
      endpointName: "Tutor Vocab",
    });

    const parsed = JSON.parse(cleanJsonText(response.text || "{}"));
    return res.json(parsed);
  } catch (error: any) {
    console.warn("AI Tutor vocab using fallback due to:", error?.message || error);
    return res.json({
      word: req.body.word || "wonderful",
      ipa: "/ˈwʌndəfl/",
      partOfSpeech: "adjective",
      meaningVi: "Tuyệt vời, kỳ diệu",
      level: Number(req.body.grade) <= 5 ? "A1 (Tiểu học)" : "A2/B1",
      synonyms: ["great", "fantastic", "amazing"],
      antonyms: ["terrible", "awful"],
      collocations: ["have a wonderful time", "a wonderful experience"],
      examples: [{ en: "We had a wonderful holiday.", vi: "Chúng tớ đã có một kỳ nghỉ thật tuyệt vời." }],
      memoryTipVi: "Wonder (kỳ quan) + ful (đầy) = đầy những điều kỳ diệu tuyệt vời!",
      examNoteVi: "Thường dùng để miêu tả cảm xúc tích cực trong bài thi.",
    });
  }
});


// Setup Vite middleware in dev or static files in prod
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

start();

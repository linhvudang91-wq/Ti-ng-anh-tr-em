import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  GeneratedLesson,
  GradeLevel,
  AiTutorTab,
  GrammarExplainResult,
  GeneratedQuizResult,
  VocabExplainResult,
} from '../types';
import {
  saveGeneratedLesson,
  recordCorrectAnswer,
  getLearnedVocabularyPool,
} from '../utils/storageUtils';
import { EndLessonVocabCheck } from './EndLessonVocabCheck';
import { AdaptiveVocabDrillModal } from './AdaptiveVocabDrillModal';
import {
  Sparkles,
  BookOpen,
  Send,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  Volume2,
  RefreshCw,
  Zap,
  Bookmark,
  ChevronRight,
  Lightbulb,
  Lock,
  MessageSquare,
  FileQuestion,
  FileText,
  Search,
  GraduationCap,
  Layers,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface AiTutorViewProps {
  user: UserProfile;
  onAddXp: (amount: number) => void;
  selectedGrade: GradeLevel;
  onOpenSavedLessons?: () => void;
  onRecordCorrectAnswer?: (count?: number) => void;
  initialLessonToLoad?: GeneratedLesson | null;
  initialTab?: AiTutorTab;
}

const PRESET_TOPICS_BY_GRADE: Record<number, { topic: string; level: string; tag: string }[]> = {
  3: [
    { topic: 'Từ vựng Gia đình và Đồ dùng học tập (Family & School Things)', level: 'Pre-A1', tag: 'Từ vựng L3' },
    { topic: 'Mẫu câu hỏi tên, tuổi và sức khỏe: What is your name? How are you?', level: 'Pre-A1', tag: 'Giao tiếp L3' },
    { topic: 'Màu sắc & Đồ chơi quen thuộc: What color is it? It is yellow', level: 'Pre-A1', tag: 'Chủ đề L3' },
    { topic: 'Đại từ nhân xưng I, You, He, She, It, We, They', level: 'Pre-A1', tag: 'Ngữ pháp cơ bản' },
    { topic: 'Động vật quanh em & Số đếm từ 1 đến 20 (Numbers & Animals)', level: 'Pre-A1', tag: 'Khảo sát L3' },
  ],
  4: [
    { topic: 'Thì hiện tại tiếp diễn: What are you doing? - I am reading', level: 'A1', tag: 'Trọng tâm L4' },
    { topic: 'Thời gian và Hoạt động hàng ngày: What time is it? Daily routines', level: 'A1', tag: 'Chủ đề quen thuộc' },
    { topic: 'Hỏi ngày và tháng: When is your birthday? - It is in May', level: 'A1', tag: 'Giao tiếp L4' },
    { topic: 'Quốc tịch và Nơi chốn: Where are you from? I am from Vietnam', level: 'A1', tag: 'Từ vựng L4' },
    { topic: 'Môn học yêu thích & Thời khóa biểu: What subjects do you have today?', level: 'A1', tag: 'Ngữ pháp L4' },
  ],
  5: [
    { topic: 'Thì quá khứ đơn với Động từ bất quy tắc (went, visited, saw, ate)', level: 'A1+', tag: 'Trọng tâm L5' },
    { topic: 'So sánh hơn của tính từ ngắn (taller, bigger, faster, cleaner)', level: 'A1+', tag: 'Ngữ pháp L5' },
    { topic: 'Hỏi địa chỉ & Nơi chốn: Where do you live? What is your address?', level: 'A1+', tag: 'Giao tiếp L5' },
    { topic: 'Chỉ đường và Phương tiện: How can I get to the zoo? Go straight', level: 'A1+', tag: 'Khảo sát CLC' },
    { topic: 'Nghề nghiệp tương lai: What would you like to be in the future?', level: 'A1+', tag: 'Ôn thi vào 6' },
  ],
  6: [
    { topic: 'Thì hiện tại đơn vs Hiện tại tiếp diễn (Dấu hiệu nhận biết)', level: 'A2', tag: 'THCS Lớp 6' },
    { topic: 'Trật tự tính từ trước danh từ (OSASCOMP)', level: 'A2+', tag: 'Bẫy đề thi' },
    { topic: 'Từ vựng trường học thông minh & Hoạt động cộng đồng', level: 'A2', tag: 'Từ vựng L6' },
    { topic: 'So sánh hơn và So sánh nhất tính từ (Comparative & Superlative)', level: 'A2', tag: 'Trọng tâm L6' },
  ],
  7: [
    { topic: 'Câu điều kiện loại 1 & Liên từ (Although, Because, However)', level: 'A2/B1', tag: 'THCS Lớp 7' },
    { topic: 'Tính từ đuôi -ed và -ing (bored vs boring, excited vs exciting)', level: 'A2+', tag: 'Ngữ pháp 8+' },
    { topic: 'Phương tiện giao thông và Năng lượng tái tạo', level: 'B1', tag: 'Chủ đề mở rộng' },
    { topic: 'Cấu trúc Used to + V-inf diễn tả thói quen trong quá khứ', level: 'A2+', tag: 'Điểm 9+' },
  ],
  8: [
    { topic: 'Câu bị động (Passive Voice) các thì cơ bản', level: 'B1', tag: 'Trọng tâm L8' },
    { topic: 'Câu tường thuật gián tiếp (Reported Speech - Statements & Questions)', level: 'B1', tag: 'Điểm 9+' },
    { topic: 'Chuyên đề Công nghệ tương lai và Môi trường sống', level: 'B1+', tag: 'Đọc hiểu' },
    { topic: 'Động từ chỉ sở thích đi kèm V-ing và to-V (Gerunds & Infinitives)', level: 'B1', tag: 'Bẫy trắc nghiệm' },
  ],
  9: [
    { topic: 'Mệnh đề quan hệ (Who, Whom, Which, That, Whose)', level: 'B1+', tag: 'Thi vào 10' },
    { topic: 'Đảo ngữ nâng cao với No sooner & Hardly (B2+)', level: 'B2 (Chuyên Anh)', tag: 'Đặc sản Chuyên' },
    { topic: 'Câu chẻ Cleft Sentences (It is/was... that...) trong Writing', level: 'B2', tag: 'Nâng cao 9+' },
    { topic: 'Collocations & Thành ngữ thường gặp trong đề thi Chuyên Lớp 10', level: 'B2 (Chuyên Anh)', tag: 'Từ vựng B2' },
  ],
};

// Curriculum-aligned vocabulary hubs for Primary (Grades 3, 4, 5) and Secondary (Grades 6, 7, 8)
const GRADE_VOCAB_COLLECTIONS: Record<number, { category: string; words: string[] }[]> = {
  3: [
    { category: 'Trường học & Đồ dùng', words: ['school', 'teacher', 'pencil', 'ruler', 'eraser', 'notebook', 'bookcase'] },
    { category: 'Gia đình & Bạn bè', words: ['family', 'father', 'mother', 'brother', 'sister', 'friend', 'grandma'] },
    { category: 'Màu sắc & Đồ chơi', words: ['yellow', 'purple', 'orange', 'robot', 'puzzle', 'teddy bear', 'kite'] },
    { category: 'Động vật quanh em', words: ['kitten', 'puppy', 'rabbit', 'monkey', 'elephant', 'chicken'] },
  ],
  4: [
    { category: 'Thời gian & Thói quen', words: ['breakfast', 'dinner', 'morning', 'afternoon', 'routine', 'clock'] },
    { category: 'Quốc gia & Quốc tịch', words: ['Vietnam', 'America', 'England', 'Australia', 'Japanese', 'Malaysia'] },
    { category: 'Sinh nhật & Lễ hội', words: ['birthday', 'January', 'calendar', 'present', 'party', 'celebrate'] },
    { category: 'Môn học & Thể thao', words: ['Science', 'English', 'swimming', 'badminton', 'football', 'music'] },
  ],
  5: [
    { category: 'Quê hương & Nơi ở', words: ['hometown', 'address', 'countryside', 'peaceful', 'province', 'island'] },
    { category: 'Kỳ nghỉ & Trải nghiệm', words: ['holiday', 'ancient', 'imperial', 'seaside', 'explore', 'boat trip'] },
    { category: 'Nghề nghiệp tương lai', words: ['architect', 'engineer', 'pilot', 'writer', 'doctor', 'astronaut'] },
    { category: 'Thời tiết & Các mùa', words: ['season', 'forecast', 'autumn', 'spring', 'breeze', 'thunderstorm'] },
  ],
  6: [
    { category: 'Trường học & Phẩm chất', words: ['creative', 'confident', 'curious', 'compass', 'calculator', 'international'] },
    { category: 'Khu dân cư & Tiện ích', words: ['neighborhood', 'convenient', 'suburb', 'historic', 'monument', 'memorial'] },
    { category: 'Kỳ quan & Danh lam', words: ['waterfall', 'desert', 'magnificent', 'landscape', 'attraction', 'cave'] },
    { category: 'Nhà thông minh & Năng lượng', words: ['appliance', 'automatic', 'wireless', 'solar panel', 'recycle'] },
  ],
  7: [
    { category: 'Sức khỏe & Lối sống', words: ['nutrition', 'calories', 'allergy', 'vegetarian', 'immunity', 'fitness'] },
    { category: 'Âm nhạc & Nghệ thuật', words: ['traditional', 'instrument', 'exhibition', 'composer', 'portrait', 'sculpture'] },
    { category: 'Hoạt động vì cộng đồng', words: ['community', 'volunteer', 'donate', 'elderly', 'homeless', 'charity'] },
    { category: 'Giao thông & Năng lượng sạch', words: ['congestion', 'pedestrian', 'renewable', 'carbon footprint', 'hydroelectric'] },
  ],
  8: [
    { category: 'Đời sống thiếu niên', words: ['origami', 'crafts', 'leisure', 'well-being', 'balance', 'peer pressure'] },
    { category: 'Bản sắc & Di sản', words: ['custom', 'heritage', 'ethnic', 'communal house', 'costume', 'diversity'] },
    { category: 'Môi trường & Thiên tai', words: ['disaster', 'pollution', 'tsunami', 'earthquake', 'evacuate', 'biodiversity'] },
    { category: 'Khoa học & Công nghệ', words: ['artificial intelligence', 'breakthrough', 'nanotechnology', 'sustainable', 'genetic'] },
  ],
  9: [
    { category: 'Làng nghề & Văn hóa (Unit 1)', words: ['artisan', 'authenticity', 'handicraft', 'pass down', 'set up', 'preservation'] },
    { category: 'Đô thị & Giao thông (Unit 2)', words: ['metropolitan', 'congestion', 'convenient', 'cosmopolitan', 'skyscraper', 'suburb'] },
    { category: 'Tâm lý & Kỹ năng sống (Unit 3)', words: ['counselor', 'resilience', 'overcome', 'anxiety', 'expectation', 'well-being'] },
    { category: 'Du lịch & Kỳ quan (Unit 5-6)', words: ['destination', 'breathtaking', 'magnificent', 'archaeological', 'biodiversity', 'hospitality'] },
  ],
};

export const AiTutorView: React.FC<AiTutorViewProps> = ({
  user,
  onAddXp,
  selectedGrade,
  onOpenSavedLessons,
  onRecordCorrectAnswer,
  initialLessonToLoad,
  initialTab = 'companion-chat',
}) => {
  const [activeTab, setActiveTab] = useState<AiTutorTab>(initialTab);

  // 1. Companion Chat state
  const [questionInput, setQuestionInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [chatLog, setChatLog] = useState<Array<{ q: string; a: string; tip?: string }>>([
    {
      q: `Xin chào Gia sư AI! Em đang học Lớp ${selectedGrade}, Gia sư có thể giúp em những gì?`,
      a: `Chào ${user.name}! Thầy/Cô AI rất vui được làm người bạn đồng hành cùng em. Em có thể:
1. Hỏi bất cứ câu hỏi ngữ pháp hay từ vựng nào em chưa rõ.
2. Nhờ thầy/cô tạo bài kiểm tra nhanh theo chủ đề để ôn luyện.
3. Yêu cầu giải thích cặn kẽ công thức kèm ví dụ dễ nhớ.
4. Tra cứu từ vựng, cụm từ collocation và mẹo làm bài thi.
5. Tạo các bài học nâng cao để chinh phục điểm 9-10 hoặc thi Chuyên Anh!
Hãy chọn tính năng ở trên hoặc nhập câu hỏi bên dưới nhé!`,
      tip: 'Mỗi ngày hãy học đều đặn 15-30 phút để kích hoạt phản xạ tiếng Anh tự nhiên nhé!',
    },
  ]);

  // 2. Quiz Generator state
  const [quizTopicInput, setQuizTopicInput] = useState('');
  const [quizQuestionCount, setQuizQuestionCount] = useState<number>(5);
  const [isCustomQuizCount, setIsCustomQuizCount] = useState<boolean>(false);
  const [customQuizCountInput, setCustomQuizCountInput] = useState<string>('15');
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<GeneratedQuizResult | null>(null);
  const [quizUserAnswers, setQuizUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // 3. Grammar Explainer state
  const [grammarInput, setGrammarInput] = useState('');
  const [isExplainingGrammar, setIsExplainingGrammar] = useState(false);
  const [grammarResult, setGrammarResult] = useState<GrammarExplainResult | null>(null);
  const [quickQuizSelected, setQuickQuizSelected] = useState<number | null>(null);

  // 4. Vocab Explainer state (Level & Grade Hub)
  const [vocabInput, setVocabInput] = useState('');
  const [vocabLevelGroup, setVocabLevelGroup] = useState<'primary' | 'secondary'>(
    selectedGrade <= 5 ? 'primary' : 'secondary'
  );
  const [vocabSelectedGrade, setVocabSelectedGrade] = useState<number>(
    selectedGrade <= 5 ? Math.max(3, Math.min(5, selectedGrade)) : Math.max(6, Math.min(9, selectedGrade))
  );
  const [isExplainingVocab, setIsExplainingVocab] = useState(false);
  const [vocabResult, setVocabResult] = useState<VocabExplainResult | null>(null);

  // 5. Advanced Lesson Generator state
  const [topicInput, setTopicInput] = useState('');
  const [targetLevel, setTargetLevel] = useState(
    selectedGrade <= 5 ? 'A1+ (Tiểu học nâng cao)' : selectedGrade <= 7 ? 'B1+ (Học sinh Giỏi)' : 'B2 (Chuyên Anh 10)'
  );
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<GeneratedLesson | null>(initialLessonToLoad || null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showDrillModal, setShowDrillModal] = useState(false);

  const isKid = selectedGrade <= 5;
  const isC2 = selectedGrade >= 6;
  const gradePresets = PRESET_TOPICS_BY_GRADE[selectedGrade] || PRESET_TOPICS_BY_GRADE[6];

  // Sync state when selected grade changes
  useEffect(() => {
    if (selectedGrade <= 5) {
      setVocabLevelGroup('primary');
      setVocabSelectedGrade(Math.max(3, Math.min(5, selectedGrade)));
      if (!targetLevel.includes('A1') && !targetLevel.includes('Pre-A1') && !targetLevel.includes('A2-')) {
        setTargetLevel(selectedGrade === 3 ? 'Pre-A1 (Nền tảng Lớp 3)' : 'A1+ (Tiểu học nâng cao)');
      }
    } else {
      setVocabLevelGroup('secondary');
      setVocabSelectedGrade(Math.max(6, Math.min(9, selectedGrade)));
      if (targetLevel.includes('Pre-A1') || (targetLevel.includes('A1') && !targetLevel.includes('B1'))) {
        setTargetLevel(selectedGrade <= 7 ? 'A2+ (Nâng cao Lớp 7-8)' : 'B2 (Chuyên Anh 10)');
      }
    }
  }, [selectedGrade]);

  useEffect(() => {
    if (initialLessonToLoad) {
      setCurrentLesson(initialLessonToLoad);
      setActiveTab('lesson-creator');
      setUserAnswers({});
      setShowExplanations({});
    }
  }, [initialLessonToLoad]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // --- Handlers ---
  const handleAskTutor = async (e?: React.FormEvent, customQ?: string) => {
    if (e) e.preventDefault();
    const q = (customQ || questionInput).trim();
    if (!q) return;

    setQuestionInput('');
    setIsAsking(true);

    try {
      const response = await fetch('/api/ai/tutor-ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          lessonContext: `Grade ${selectedGrade} (${isKid ? 'Primary GDPT 2018' : 'Lower Secondary GDPT 2018 & Specialized 10'})`,
          studentName: user.name,
        }),
      });

      const data = await response.json();
      setChatLog((prev) => [...prev, { q, a: data.answer, tip: data.mnemonicTip }]);
      onAddXp(5);
    } catch (err) {
      console.error('Failed to ask tutor:', err);
      setChatLog((prev) => [
        ...prev,
        {
          q,
          a: `Thầy/Cô AI đã nhận được câu hỏi: "${q}". Trong tiếng Anh, em hãy nhớ luôn xác định chủ ngữ, thì của câu và loại từ trước khi trả lời nhé!`,
          tip: 'Luôn gạch chân từ khóa trong câu để không bị nhầm lẫn.',
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const handleGenerateQuiz = async (customTopic?: string, customCount?: number) => {
    const topicToUse = (customTopic || quizTopicInput || `Tổng hợp kiến thức Tiếng Anh Lớp ${selectedGrade}`).trim();
    
    // Resolve question count based on presets or custom input
    let countToUse = customCount;
    if (!countToUse) {
      if (isCustomQuizCount) {
        const parsed = parseInt(customQuizCountInput, 10);
        countToUse = isNaN(parsed) ? 10 : Math.max(3, Math.min(50, parsed));
      } else {
        countToUse = quizQuestionCount;
      }
    }

    setIsGeneratingQuiz(true);
    setCurrentQuiz(null);
    setQuizUserAnswers({});
    setQuizSubmitted(false);

    try {
      const response = await fetch('/api/ai/tutor-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToUse,
          grade: selectedGrade,
          count: countToUse,
          level: isKid ? 'GDPT 2018 Primary' : 'GDPT 2018 Secondary',
        }),
      });

      const data = await response.json();
      setCurrentQuiz(data);
      onAddXp(10);
    } catch (err) {
      console.error('Failed to generate quiz:', err);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleExplainGrammar = async (customPoint?: string) => {
    const pointToUse = (customPoint || grammarInput).trim();
    if (!pointToUse) return;

    setIsExplainingGrammar(true);
    setGrammarResult(null);
    setQuickQuizSelected(null);

    try {
      const response = await fetch('/api/ai/tutor-grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grammarPoint: pointToUse,
          grade: selectedGrade,
          studentName: user.name,
        }),
      });

      const data = await response.json();
      setGrammarResult(data);
      onAddXp(10);
    } catch (err) {
      console.error('Failed to explain grammar:', err);
    } finally {
      setIsExplainingGrammar(false);
    }
  };

  const handleExplainVocab = async (customWord?: string, customGrade?: number) => {
    const wordToUse = (customWord || vocabInput).trim();
    if (!wordToUse) return;

    const gradeToUse = customGrade || vocabSelectedGrade || selectedGrade;

    setIsExplainingVocab(true);
    setVocabResult(null);

    try {
      const response = await fetch('/api/ai/tutor-vocab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: wordToUse,
          grade: gradeToUse,
          studentName: user.name,
        }),
      });

      const data = await response.json();
      setVocabResult(data);
      onAddXp(10);
    } catch (err) {
      console.error('Failed to explain vocab:', err);
    } finally {
      setIsExplainingVocab(false);
    }
  };

  const handleGenerateLesson = async (customTopic?: string) => {
    const topicToUse = (customTopic || topicInput).trim();
    if (!topicToUse) return;

    setIsLoadingLesson(true);
    setUserAnswers({});
    setShowExplanations({});
    setSavedSuccess(false);

    try {
      const learnedPool = getLearnedVocabularyPool();
      const response = await fetch('/api/ai/tutor-generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToUse,
          grade: selectedGrade,
          targetLevel,
          studentName: user.name,
          excludeWords: learnedPool,
        }),
      });

      const data: GeneratedLesson = await response.json();
      setCurrentLesson(data);
      onAddXp(20);
    } catch (err) {
      console.error('Failed to generate lesson:', err);
    } finally {
      setIsLoadingLesson(false);
    }
  };

  const handleSaveLesson = () => {
    if (!currentLesson) return;
    saveGeneratedLesson(currentLesson);
    setSavedSuccess(true);
    onAddXp(10);
  };

  return (
    <div id="ai-tutor-container" className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* 1. Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Gia sư AI Đồng Hành GDPT 2018 • Cấp {isKid ? '1 (Tiểu học)' : '2 (THCS)'} • Lớp {selectedGrade}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Gia sư Tiếng Anh AI Đồng Hành Cùng Bé
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Chào <strong className="text-amber-300 font-semibold">{user.name}</strong>! Thầy/Cô AI sẽ luôn ở bên hỗ trợ em giải đáp thắc mắc, tạo bài kiểm tra, phân tích ngữ pháp, giải nghĩa từ vựng và tạo bài giảng nâng cao nhé!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <div className="text-3xl">🤖</div>
            <div className="text-left">
              <div className="text-xs text-blue-200 font-medium">Gia sư 24/7</div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Sẵn sàng giải đáp
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Feature Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          id="tab-companion-chat"
          onClick={() => setActiveTab('companion-chat')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'companion-chat'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Gia sư Hỏi đáp</span>
        </button>

        <button
          id="tab-quiz-generator"
          onClick={() => setActiveTab('quiz-generator')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'quiz-generator'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <FileQuestion className="w-4 h-4" />
          <span>Tạo bài kiểm tra</span>
        </button>

        <button
          id="tab-grammar-explainer"
          onClick={() => setActiveTab('grammar-explainer')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'grammar-explainer'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Giải thích Ngữ pháp</span>
        </button>

        <button
          id="tab-vocab-explainer"
          onClick={() => setActiveTab('vocab-explainer')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'vocab-explainer'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Giải nghĩa Từ vựng</span>
        </button>

        <button
          id="tab-lesson-creator"
          onClick={() => setActiveTab('lesson-creator')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'lesson-creator'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Mở rộng bài học AI</span>
        </button>
      </div>

      {/* --- TAB 1: COMPANION CHAT & ASK TUTOR --- */}
      {activeTab === 'companion-chat' && (
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Trò chuyện & Hỏi đáp trực tiếp cùng Gia sư AI
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Bất kỳ câu hỏi nào em còn băn khoăn về bài học, bài tập trên lớp hay mẹo làm bài thi
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
              Phản hồi tức thì
            </span>
          </div>

          {/* Quick Questions Suggestions */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Câu hỏi thường gặp theo Lớp {selectedGrade}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                `Cách phân biệt 'in', 'on', 'at' chỉ thời gian?`,
                `Quy tắc phát âm đuôi '-ed' dễ nhớ nhất?`,
                `Khi nào dùng thì hiện tại đơn, khi nào dùng tiếp diễn?`,
                isKid ? `Cách dùng 'there is' và 'there are'?` : `Phân biệt 'Neither... nor' và 'Either... or'?`,
                isKid ? `Cách hỏi và trả lời về giá tiền 'How much is it'?` : `Bẫy câu điều kiện loại 3 trong đề thi vào 10?`,
              ].map((sampleQ, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskTutor(undefined, sampleQ)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium border border-slate-200 transition-colors text-left"
                >
                  💬 {sampleQ}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
            {chatLog.map((chat, idx) => (
              <div key={idx} className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-start justify-end gap-2">
                  <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-xs max-w-lg font-medium shadow-2xs">
                    {chat.q}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                    {user.avatar || '👦'}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-900 font-bold text-xs flex items-center justify-center shrink-0">
                    🤖
                  </div>
                  <div className="bg-slate-50 text-slate-800 p-4 rounded-2xl rounded-tl-xs max-w-2xl space-y-2.5 border border-slate-200">
                    <p className="leading-relaxed whitespace-pre-line text-xs sm:text-sm font-normal">
                      {chat.a}
                    </p>
                    {chat.tip && (
                      <div className="text-xs font-semibold text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Mẹo nhỏ từ Gia sư: </strong>
                          {chat.tip}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ask Input Form */}
          <form onSubmit={handleAskTutor} className="flex gap-2 pt-2 border-t border-slate-100">
            <input
              id="tutor-chat-input"
              type="text"
              placeholder={`Nhập câu hỏi cho Gia sư AI (Ví dụ: 'Thầy giải thích câu này giúp em...', 'Từ vựng Unit 3 nghĩa là gì?')...`}
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              disabled={isAsking}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <button
              id="send-tutor-question-btn"
              type="submit"
              disabled={isAsking || !questionInput.trim()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
            >
              {isAsking ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang suy nghĩ...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Gửi câu hỏi</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* --- TAB 2: QUIZ GENERATOR --- */}
      {activeTab === 'quiz-generator' && (
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileQuestion className="w-5 h-5 text-indigo-600" />
                Gia sư Tạo Bài Kiểm Tra Nhanh (Quiz Generator)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Tạo đề kiểm tra trắc nghiệm theo chủ đề em yêu cầu, làm bài và nhận giải thích chi tiết
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
              Lớp {selectedGrade}
            </span>
          </div>

          {/* Quiz Creation Form */}
          <div className="space-y-3.5">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="quiz-topic-input"
                type="text"
                placeholder="Nhập chủ đề muốn kiểm tra (VD: 'Thì quá khứ đơn', 'Từ vựng Gia đình', 'Câu so sánh hơn')..."
                value={quizTopicInput}
                onChange={(e) => setQuizTopicInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateQuiz()}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
              <div className="flex items-center gap-2">
                {!isCustomQuizCount ? (
                  <select
                    id="quiz-count-select"
                    value={quizQuestionCount}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setIsCustomQuizCount(true);
                      } else {
                        setQuizQuestionCount(Number(e.target.value));
                      }
                    }}
                    className="px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={3}>3 câu (Khởi động)</option>
                    <option value={5}>5 câu (Ôn tập nhanh)</option>
                    <option value={10}>10 câu (Kiểm tra 15p)</option>
                    <option value={15}>15 câu (Đề 1 tiết)</option>
                    <option value={20}>20 câu (Khảo sát 45p)</option>
                    <option value={25}>25 câu (Đề thi giữa kỳ)</option>
                    <option value={30}>30 câu (Đề thi học kỳ)</option>
                    <option value={40}>40 câu (Đề thi thử mở rộng)</option>
                    <option value={50}>50 câu (Luyện thi chuyên sâu)</option>
                    <option value="custom">✏️ Tự nhập số câu...</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-xl border border-indigo-300">
                    <input
                      type="number"
                      min={3}
                      max={50}
                      value={customQuizCountInput}
                      onChange={(e) => setCustomQuizCountInput(e.target.value)}
                      placeholder="3-50"
                      className="w-14 px-2 py-1 text-xs font-bold text-center rounded border border-slate-300 bg-white text-indigo-900"
                    />
                    <span className="text-[11px] font-bold text-slate-600">câu</span>
                    <button
                      type="button"
                      onClick={() => setIsCustomQuizCount(false)}
                      className="text-[10px] text-slate-400 hover:text-slate-700 ml-1 underline"
                      title="Quay lại danh sách chọn sẵn"
                    >
                      Hủy
                    </button>
                  </div>
                )}

                <button
                  id="generate-quiz-btn"
                  onClick={() => handleGenerateQuiz()}
                  disabled={isGeneratingQuiz}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
                >
                  {isGeneratingQuiz ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Đang tạo đề ({isCustomQuizCount ? customQuizCountInput : quizQuestionCount} câu)...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Tạo bài kiểm tra</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Count Selection Pills */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <span className="text-slate-400 font-bold text-[11px]">Chọn nhanh số câu:</span>
              {[
                { count: 3, label: '3 câu' },
                { count: 5, label: '5 câu' },
                { count: 10, label: '10 câu' },
                { count: 15, label: '15 câu' },
                { count: 20, label: '20 câu' },
                { count: 30, label: '30 câu' },
                { count: 50, label: '50 câu' },
              ].map((item) => {
                const isActive = !isCustomQuizCount && quizQuestionCount === item.count;
                return (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => {
                      setIsCustomQuizCount(false);
                      setQuizQuestionCount(item.count);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors border ${
                      isActive
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setIsCustomQuizCount(true)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors border ${
                  isCustomQuizCount
                    ? 'bg-indigo-100 text-indigo-800 border-indigo-300 font-bold'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                ✏️ Tự nhập
              </button>
            </div>

            {/* Quick Topic Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-xs font-bold text-slate-400">Gợi ý chủ đề Lớp {selectedGrade}:</span>
              {gradePresets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuizTopicInput(p.topic);
                    handleGenerateQuiz(p.topic);
                  }}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-colors"
                >
                  {p.topic}
                </button>
              ))}
            </div>
          </div>

          {/* Active Quiz Taking Box */}
          {currentQuiz && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between flex-wrap gap-3 bg-indigo-50/80 p-4 rounded-2xl border border-indigo-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-indigo-600 text-white uppercase tracking-wider">
                      Đề {currentQuiz.questions.length} câu
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-indigo-950">
                      {currentQuiz.title}
                    </h3>
                  </div>
                  <p className="text-xs text-indigo-700">
                    Tiến độ: {Object.keys(quizUserAnswers).length} / {currentQuiz.questions.length} câu đã trả lời
                  </p>
                </div>

                {quizSubmitted ? (
                  <div className="text-xs font-bold px-4 py-2 bg-white text-indigo-950 rounded-xl border border-indigo-200 shadow-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>
                      Điểm: {
                        Object.entries(quizUserAnswers).filter(
                          ([qId, ans]) => currentQuiz.questions.find((q) => q.id === qId)?.correctIndex === ans
                        ).length
                      } / {currentQuiz.questions.length} câu đúng (
                      {Math.round(
                        (Object.entries(quizUserAnswers).filter(
                          ([qId, ans]) => currentQuiz.questions.find((q) => q.id === qId)?.correctIndex === ans
                        ).length /
                          currentQuiz.questions.length) *
                          100
                      )}%)
                    </span>
                  </div>
                ) : (
                  <div className="w-full sm:w-48 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${(Object.keys(quizUserAnswers).length / currentQuiz.questions.length) * 100}%`,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Question Navigation Palette */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Mục lục câu hỏi (Bấm để nhảy đến câu):</span>
                  <span className="text-[11px] text-slate-500">
                    {quizSubmitted ? 'Xanh = Đúng • Đỏ = Sai' : 'Đậm = Đã làm • Nhạt = Chưa làm'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap max-h-28 overflow-y-auto pr-1">
                  {currentQuiz.questions.map((q, qIdx) => {
                    const hasAnswer = quizUserAnswers[q.id] !== undefined;
                    const isRight = quizUserAnswers[q.id] === q.correctIndex;

                    let badgeClass = 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400';
                    if (quizSubmitted) {
                      if (isRight) {
                        badgeClass = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                      } else {
                        badgeClass = 'bg-rose-500 text-white border-rose-500 font-bold';
                      }
                    } else if (hasAnswer) {
                      badgeClass = 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-2xs';
                    }

                    return (
                      <button
                        key={q.id || qIdx}
                        type="button"
                        onClick={() => {
                          const elem = document.getElementById(`quiz-q-${qIdx}`);
                          elem?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center border transition-all ${badgeClass}`}
                        title={`Câu ${qIdx + 1}`}
                      >
                        {qIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {currentQuiz.questions.map((q, idx) => {
                  const selected = quizUserAnswers[q.id];
                  const isCorrect = selected === q.correctIndex;

                  return (
                    <div
                      key={q.id || idx}
                      id={`quiz-q-${idx}`}
                      className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 scroll-mt-20"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {q.question}
                        </h4>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                        {q.options.map((opt, optIdx) => {
                          const isOptSelected = selected === optIdx;
                          let optStyle = 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800';

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300';
                            } else if (isOptSelected && !isCorrect) {
                              optStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                            }
                          } else if (isOptSelected) {
                            optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-2 ring-indigo-200';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => setQuizUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                              className={`p-2.5 rounded-xl border text-xs text-left transition-all ${optStyle}`}
                            >
                              <span className="font-bold mr-1.5">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation if submitted */}
                      {quizSubmitted && (
                        <div
                          className={`p-3 rounded-xl text-xs space-y-1 ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                              : 'bg-amber-50 text-amber-950 border border-amber-200'
                          }`}
                        >
                          <div className="font-bold flex items-center gap-1.5">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Chính xác! (+15 XP)</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-amber-600" />
                                <span>
                                  Đáp án đúng: {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                                </span>
                              </>
                            )}
                          </div>
                          <p className="leading-relaxed opacity-90">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit Quiz Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Đã trả lời {Object.keys(quizUserAnswers).length}/{currentQuiz.questions.length} câu
                </span>
                {!quizSubmitted ? (
                  <button
                    disabled={Object.keys(quizUserAnswers).length === 0}
                    onClick={() => {
                      setQuizSubmitted(true);
                      const correctCount = Object.entries(quizUserAnswers).filter(
                        ([qId, ans]) => currentQuiz.questions.find((q) => q.id === qId)?.correctIndex === ans
                      ).length;
                      onAddXp(correctCount * 15);
                      if (onRecordCorrectAnswer) {
                        onRecordCorrectAnswer(correctCount);
                      }
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
                  >
                    Nộp bài & Xem giải thích
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setQuizUserAnswers({});
                      setQuizSubmitted(false);
                      handleGenerateQuiz();
                    }}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Làm đề kiểm tra khác</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 3: GRAMMAR EXPLAINER --- */}
      {activeTab === 'grammar-explainer' && (
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                Gia sư Giải Thích Ngữ Pháp (Grammar Explainer)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Nhập bất kỳ điểm ngữ pháp nào để xem công thức, giải thích dễ hiểu, ví dụ và bài test nhỏ
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
              Công thức & Bẫy thi
            </span>
          </div>

          {/* Grammar Input Bar */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                id="grammar-point-input"
                type="text"
                placeholder="Nhập chủ điểm ngữ pháp (VD: 'Thì hiện tại đơn', 'So sánh nhất tính từ dài', 'Mệnh đề quan hệ')..."
                value={grammarInput}
                onChange={(e) => setGrammarInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExplainGrammar()}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              />
              <button
                id="explain-grammar-btn"
                onClick={() => handleExplainGrammar()}
                disabled={isExplainingGrammar || !grammarInput.trim()}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
              >
                {isExplainingGrammar ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Đang phân tích...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Giải thích ngay</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Grammar Suggestions */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-400">Gợi ý ngữ pháp:</span>
              {[
                isKid ? 'Thì hiện tại đơn' : 'Mệnh đề quan hệ (Who/Which/That)',
                isKid ? 'Đại từ chỉ định This/That/These/Those' : 'Câu bị động (Passive Voice)',
                isKid ? 'So sánh hơn tính từ ngắn' : 'Câu điều kiện loại 2 & 3',
                isKid ? 'Giới từ in, on, at' : 'Đảo ngữ với No sooner & Hardly',
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setGrammarInput(item);
                    handleExplainGrammar(item);
                  }}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Grammar Result Card */}
          {grammarResult && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 via-indigo-50/50 to-white border border-purple-200 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 font-bold text-xs">
                      {grammarResult.cefrLevel}
                    </span>
                    <h3 className="text-lg font-black text-purple-950">
                      {grammarResult.term}
                    </h3>
                  </div>
                  <button
                    onClick={() => speakText(grammarResult.term)}
                    className="p-1.5 rounded-lg bg-white border border-purple-200 text-purple-700 hover:bg-purple-100"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Formula Box */}
                <div className="p-3.5 rounded-xl bg-white border border-purple-200 text-purple-950 font-mono text-xs sm:text-sm font-bold shadow-2xs">
                  <span className="text-purple-600 block text-[10px] font-sans uppercase font-extrabold tracking-wider mb-1">
                    Công thức / Cấu trúc ngữ pháp:
                  </span>
                  {grammarResult.formulaOrPattern}
                </div>

                {/* Simple explanation */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-700">Giải thích dễ hiểu:</span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {grammarResult.simpleExplanationVi}
                  </p>
                </div>

                {/* Child-friendly analogy if present */}
                {grammarResult.childFriendlyAnalogyVi && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Hình ảnh ví von dễ nhớ: </strong>
                      {grammarResult.childFriendlyAnalogyVi}
                    </div>
                  </div>
                )}

                {/* Examples */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700">Ví dụ minh họa:</span>
                  <div className="space-y-2">
                    {grammarResult.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{ex.en}</span>
                          <button
                            onClick={() => speakText(ex.en)}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-slate-500">{ex.vi}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common mistakes */}
                {grammarResult.commonMistakesVi && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs">
                    <strong>⚠️ Bẫy đề thi & Lỗi sai thường gặp: </strong>
                    {grammarResult.commonMistakesVi}
                  </div>
                )}

                {/* Quick Check Quiz */}
                {grammarResult.quickCheckQuiz && (
                  <div className="p-4 rounded-xl bg-white border border-purple-200 space-y-2.5">
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Câu hỏi kiểm tra nhanh:
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800">
                      {grammarResult.quickCheckQuiz.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {grammarResult.quickCheckQuiz.options.map((opt, oIdx) => {
                        const isChosen = quickQuizSelected === oIdx;
                        const isCorrect = oIdx === grammarResult.quickCheckQuiz.correctIndex;
                        let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-800';

                        if (quickQuizSelected !== null) {
                          if (isCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                          } else if (isChosen) {
                            btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={quickQuizSelected !== null}
                            onClick={() => {
                              setQuickQuizSelected(oIdx);
                              if (isCorrect) onAddXp(15);
                            }}
                            className={`p-2.5 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                          >
                            <span className="font-bold mr-1">{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {quickQuizSelected !== null && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                        {grammarResult.quickCheckQuiz.explanationVi}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 4: VOCAB EXPLAINER --- */}
      {activeTab === 'vocab-explainer' && (
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-600" />
                Gia sư Giải Nghĩa & Phân Cấp Từ Vựng theo Lớp
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Tra cứu từ vựng chuẩn GDPT 2018 theo cấp học: Cấp 1 (Lớp 3 - 4 - 5) và Cấp 2 (Lớp 6 - 7 - 8)
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              Lớp {vocabSelectedGrade} • {vocabLevelGroup === 'primary' ? 'Cấp 1 Tiểu học' : 'Cấp 2 THCS'}
            </span>
          </div>

          {/* Level Switcher & Grade Selector */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-700">Chọn cấp học & lớp tra cứu:</span>
              <div className="flex rounded-xl bg-slate-200/80 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setVocabLevelGroup('primary');
                    setVocabSelectedGrade(3);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    vocabLevelGroup === 'primary'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🎒 Cấp 1: Tiểu học (Lớp 3-4-5)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVocabLevelGroup('secondary');
                    setVocabSelectedGrade(6);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    vocabLevelGroup === 'secondary'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🏫 Cấp 2: THCS (Lớp 6-7-8-9)
                </button>
              </div>
            </div>

            {/* Grade Sub-Tabs */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              {vocabLevelGroup === 'primary' ? (
                <>
                  {[
                    { g: 3, label: 'Lớp 3 (Pre-A1 Starters)', desc: 'Gia đình, Đồ dùng, Thức ăn' },
                    { g: 4, label: 'Lớp 4 (A1 Movers)', desc: 'Sở thích, Hoạt động, Động vật' },
                    { g: 5, label: 'Lớp 5 (A1+ Flyers)', desc: 'Nghề nghiệp, Mùa & Thời tiết' },
                  ].map((item) => (
                    <button
                      key={item.g}
                      type="button"
                      onClick={() => setVocabSelectedGrade(item.g)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border text-left ${
                        vocabSelectedGrade === item.g
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-400 ring-2 ring-emerald-200'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div>{item.label}</div>
                      <div className="text-[10px] font-normal text-slate-500">{item.desc}</div>
                    </button>
                  ))}
                </>
              ) : (
                <>
                  {[
                    { g: 6, label: 'Lớp 6 (A2 KET)', desc: 'Trường mới, Nhà ở, Bạn bè' },
                    { g: 7, label: 'Lớp 7 (A2+ Thi HSG)', desc: 'Giao thông, Năng lượng, Lễ hội' },
                    { g: 8, label: 'Lớp 8 (B1 PET & Chuyên)', desc: 'Môi trường, Đời sống số, Phong cách' },
                    { g: 9, label: 'Lớp 9 (B1+/B2 Luyện thi 10)', desc: 'Làng nghề, Đô thị hóa, Áp lực thi cử' },
                  ].map((item) => (
                    <button
                      key={item.g}
                      type="button"
                      onClick={() => setVocabSelectedGrade(item.g)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border text-left ${
                        vocabSelectedGrade === item.g
                          ? 'bg-blue-50 text-blue-900 border-blue-400 ring-2 ring-blue-200'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div>{item.label}</div>
                      <div className="text-[10px] font-normal text-slate-500">{item.desc}</div>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Vocab Input Bar */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                id="vocab-word-input"
                type="text"
                placeholder={`Nhập từ vựng cần giải thích cho học sinh Lớp ${vocabSelectedGrade} (VD: '${
                  vocabSelectedGrade <= 5 ? 'pencil case, wonderful, delicious' : 'sustainable, indispensable, accomplish'
                }')...`}
                value={vocabInput}
                onChange={(e) => setVocabInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExplainVocab(undefined, vocabSelectedGrade)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              <button
                id="explain-vocab-btn"
                onClick={() => handleExplainVocab(undefined, vocabSelectedGrade)}
                disabled={isExplainingVocab || !vocabInput.trim()}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
              >
                {isExplainingVocab ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Đang giải nghĩa...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Giải nghĩa từ</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Curriculum Vocab Bank for Selected Grade */}
            {GRADE_VOCAB_COLLECTIONS[vocabSelectedGrade] && (
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    Kho từ vựng trọng tâm Lớp {vocabSelectedGrade} theo chủ đề (Bấm để nghe & nhận giải thích chi tiết):
                  </span>
                  <span className="text-[11px] text-slate-400">Chuẩn GDPT 2018</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {GRADE_VOCAB_COLLECTIONS[vocabSelectedGrade].map((cat, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800">
                          📁 {cat.category}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {cat.words.length} từ
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.words.map((w, wIdx) => (
                          <div
                            key={wIdx}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 hover:border-emerald-400 rounded-lg text-xs transition-colors shadow-2xs group"
                          >
                            <span
                              onClick={() => {
                                setVocabInput(w);
                                handleExplainVocab(w, vocabSelectedGrade);
                              }}
                              className="font-bold text-slate-800 hover:text-emerald-700 cursor-pointer"
                              title="Bấm để AI giải thích từ"
                            >
                              {w}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakText(w);
                              }}
                              className="text-slate-300 hover:text-emerald-600 transition-colors"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Vocab Result Card */}
          {vocabResult && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {vocabResult.word}
                    </h3>
                    <button
                      onClick={() => speakText(vocabResult.word)}
                      className="p-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      {vocabResult.ipa}
                    </span>
                    <span className="text-xs font-bold italic text-slate-600">
                      ({vocabResult.partOfSpeech})
                    </span>
                  </div>

                  <span className="text-xs font-extrabold px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full border border-emerald-300">
                    Level {vocabResult.level}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-slate-900 text-sm font-semibold">
                  <span className="text-emerald-700 block text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Nghĩa tiếng Việt:
                  </span>
                  {vocabResult.meaningVi}
                </div>

                {/* Synonyms & Antonyms */}
                {vocabResult.synonyms && vocabResult.synonyms.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-700">Từ đồng nghĩa (Synonyms):</span>
                    <div className="flex flex-wrap gap-1.5">
                      {vocabResult.synonyms.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collocations */}
                {vocabResult.collocations && vocabResult.collocations.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-700">Cụm từ hay đi kèm (Collocations):</span>
                    <div className="flex flex-wrap gap-1.5">
                      {vocabResult.collocations.map((c, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-100/70 text-teal-900 border border-teal-200"
                        >
                          🔗 {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Examples */}
                {vocabResult.examples && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700">Câu ví dụ trong ngữ cảnh:</span>
                    <div className="space-y-2">
                      {vocabResult.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{ex.en}</span>
                            <button
                              onClick={() => speakText(ex.en)}
                              className="text-emerald-600 hover:text-emerald-800"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-slate-500">{ex.vi}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Memory Tip */}
                {vocabResult.memoryTipVi && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Mẹo nhớ từ vựng sâu: </strong>
                      {vocabResult.memoryTipVi}
                    </div>
                  </div>
                )}

                {/* Exam Note */}
                {vocabResult.examNoteVi && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs">
                    <strong>📌 Lưu ý thi cử & Điểm cộng: </strong>
                    {vocabResult.examNoteVi}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 5: ADVANCED LESSON CREATOR (GEMINI) --- */}
      {activeTab === 'lesson-creator' && (
        <div className="space-y-6">
          {/* Lesson Generator Box */}
          <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Tích hợp AI Mở rộng bài học nâng cao cho bé
              </h2>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Mục tiêu:</span>
                <select
                  id="tutor-target-level-select"
                  value={targetLevel}
                  onChange={(e) => setTargetLevel(e.target.value)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-bold text-slate-800 text-xs focus:ring-1 focus:ring-blue-500"
                >
                  {isKid ? (
                    <>
                      <option value="Pre-A1 (Nền tảng Lớp 3 - Starters)">🌱 Pre-A1 (Nền tảng Lớp 3 - Cambridge Starters)</option>
                      <option value="A1 (Chuẩn GDPT Lớp 4-5 - Movers)">🎒 A1 (Chuẩn GDPT Lớp 4-5 - Cambridge Movers)</option>
                      <option value="A1+ (Tiểu học nâng cao - Flyers)">⭐ A1+ (Khảo sát vào Lớp 6 CLC - Cambridge Flyers)</option>
                      <option value="A2- (Thi IOE & Học sinh giỏi Tiểu học)">🏆 A2- (Bồi dưỡng IOE & Violympic Cấp 1)</option>
                    </>
                  ) : (
                    <>
                      <option value="A2+ (Nâng cao Lớp 6-7)">🌱 A2+ (Chuẩn GDPT 2018 Lớp 6-7 & KET)</option>
                      <option value="B1 (Chuẩn GDPT Lớp 8 - PET)">📘 B1 (Chuẩn GDPT Lớp 8 & Cambridge PET)</option>
                      <option value="B1+ (Học sinh Giỏi Cấp Huyện/Tỉnh)">⭐ B1+ (Bồi dưỡng Học sinh Giỏi Lớp 7-8)</option>
                      <option value="B2 (Chuyên Anh 10)">🏆 B2 (Luyện thi vào Lớp 10 Chuyên Anh)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Input bar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="tutor-custom-topic-input"
                type="text"
                placeholder={
                  isKid
                    ? "Nhập chủ đề mở rộng cho bé Lớp 3-4-5 (VD: 'Thế giới động vật hoang dã', 'Một ngày ở trường', 'Món ăn yêu thích')..."
                    : "Nhập chủ đề mở rộng Lớp 6-7-8 (VD: 'Bảo vệ môi trường', 'Năng lượng tái tạo', 'Collocations thi HSG')..."
                }
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateLesson()}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
              <button
                id="generate-lesson-btn"
                disabled={isLoadingLesson || !topicInput.trim()}
                onClick={() => handleGenerateLesson()}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {isLoadingLesson ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI Đang soạn bài...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Tạo bài học nâng cao</span>
                  </>
                )}
              </button>
            </div>

            {/* Presets */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                Chủ đề gợi ý cho Lớp {selectedGrade}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {gradePresets.map((item, idx) => (
                  <button
                    key={idx}
                    id={`preset-topic-btn-${idx}`}
                    onClick={() => {
                      setTopicInput(item.topic);
                      setTargetLevel(item.level);
                      handleGenerateLesson(item.topic);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                  >
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-bold">
                      {item.tag}
                    </span>
                    {item.topic}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Lesson Section */}
          {currentLesson && (
            <div id="ai-generated-lesson-card" className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200">
                      {currentLesson.cefrLevel}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                      Lớp {currentLesson.grade}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      id="save-lesson-btn"
                      onClick={handleSaveLesson}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
                      {savedSuccess ? 'Đã lưu vào kho bài học ✓' : 'Lưu bài học để ôn tập'}
                    </button>
                    {onOpenSavedLessons && (
                      <button
                        onClick={onOpenSavedLessons}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Kho bài đã lưu</span>
                      </button>
                    )}
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {currentLesson.title}
                </h2>

                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs sm:text-sm text-blue-950 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Mục tiêu bài học: </strong>
                    {currentLesson.objectiveVi}
                  </div>
                </div>
              </div>

              {/* Concept explanation */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Bản chất kiến thức & Phương pháp ghi nhớ
                </h3>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 whitespace-pre-line">
                  {currentLesson.conceptExplanation}
                </div>
              </div>

              {/* Vocab & collocations */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Từ vựng & Cụm từ nâng cao
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentLesson.vocabAndCollocations.map((v, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{v.word}</span>
                          <span className="text-[11px] font-mono text-slate-500">{v.ipa}</span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-semibold">
                            {v.partOfSpeech}
                          </span>
                        </div>
                        <button
                          onClick={() => speakText(v.word)}
                          className="p-1 text-slate-500 hover:text-blue-600 rounded-md transition-colors"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">{v.meaningVi}</p>
                      <div className="text-xs text-slate-600 space-y-0.5 border-t border-slate-200/60 pt-1.5">
                        <p className="italic text-blue-900">{v.exampleEn}</p>
                        <p className="text-slate-500">{v.exampleVi}</p>
                      </div>
                      {v.examNote && (
                        <div className="text-[11px] font-medium text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200/50">
                          📌 {v.examNote}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Grammar structures */}
              {currentLesson.grammarStructures && currentLesson.grammarStructures.length > 0 && (
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    Cấu trúc câu & Bẫy đề thi
                  </h3>
                  <div className="space-y-3">
                    {currentLesson.grammarStructures.map((g, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-purple-100 bg-purple-50/40 space-y-2"
                      >
                        <h4 className="font-bold text-xs sm:text-sm text-purple-950">{g.name}</h4>
                        <div className="p-2 bg-white rounded-lg border border-purple-200 font-mono text-xs text-purple-900 font-bold">
                          {g.formula}
                        </div>
                        <div className="text-xs text-slate-700 space-y-0.5">
                          <p className="font-medium text-slate-900">{g.exampleEn}</p>
                          <p className="text-slate-500">{g.exampleVi}</p>
                        </div>
                        {g.examTrapVi && (
                          <div className="text-xs font-semibold text-rose-800 bg-rose-50 p-2 rounded-lg border border-rose-200">
                            ⚠️ {g.examTrapVi}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice exercises */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Bài tập tương tác vận dụng
                </h3>
                <div className="space-y-4">
                  {currentLesson.interactiveExercises.map((ex, idx) => {
                    const answered = userAnswers[ex.id];
                    const isCorrect = answered && answered.toLowerCase().trim() === ex.correctAnswer.toLowerCase().trim();

                    return (
                      <div
                        key={ex.id || idx}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3"
                      >
                        <div className="flex items-start gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">{ex.question}</h4>
                        </div>

                        {ex.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                            {ex.options.map((opt, oIdx) => {
                              const isChosen = answered === opt;
                              let btnClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                              if (answered) {
                                if (opt.toLowerCase().trim() === ex.correctAnswer.toLowerCase().trim()) {
                                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                                } else if (isChosen) {
                                  btnClass = 'border-rose-400 bg-rose-50 text-rose-900';
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={!!answered}
                                  onClick={() => {
                                    if (userAnswers[ex.id]) return;
                                    setUserAnswers((prev) => ({ ...prev, [ex.id]: opt }));
                                    setShowExplanations((prev) => ({ ...prev, [ex.id]: true }));
                                    if (opt.toLowerCase().trim() === ex.correctAnswer.toLowerCase().trim()) {
                                      onAddXp(15);
                                      if (onRecordCorrectAnswer) onRecordCorrectAnswer(1);
                                    }
                                  }}
                                  className={`p-2.5 rounded-xl border text-xs text-left transition-all ${btnClass}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {showExplanations[ex.id] && (
                          <div
                            className={`p-3 rounded-xl text-xs space-y-1 ${
                              isCorrect
                                ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                                : 'bg-amber-50 text-amber-950 border border-amber-200'
                            }`}
                          >
                            <div className="font-bold flex items-center gap-1.5">
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>Chính xác! (+15 XP)</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-4 h-4 text-amber-600" />
                                  <span>Đáp án đúng: {ex.correctAnswer}</span>
                                </>
                              )}
                            </div>
                            <p className="leading-relaxed opacity-90">{ex.explanationVi}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tutor Tip */}
              {currentLesson.tutorTip && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
                  <span className="text-xl">🦉</span>
                  <div>
                    <strong className="text-amber-900 block font-bold">Lời khuyên của Gia sư AI:</strong>
                    <p className="mt-0.5 leading-relaxed">{currentLesson.tutorTip}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

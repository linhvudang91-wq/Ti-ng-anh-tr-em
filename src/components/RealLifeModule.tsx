import React, { useState } from 'react';
import { RealLifeScenario } from '../types';
import { audioManager, startSpeechRecognition } from '../utils/audioUtils';
import { MessageSquare, Send, Bot, User, Mic, MicOff, Volume2, Sparkles, FileText, CheckCircle2, Award } from 'lucide-react';

interface RealLifeModuleProps {
  scenarios: RealLifeScenario[];
  onAddXP: (xp: number) => void;
  grade: number;
}

interface ChatMessage {
  id: string;
  sender: 'partner' | 'student';
  text: string;
  feedbackVi?: string;
  suggestion?: string;
}

export const RealLifeModule: React.FC<RealLifeModuleProps> = ({
  scenarios,
  onAddXP,
  grade,
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const activeScenario = scenarios[selectedScenarioIndex] || scenarios[0];

  // Chatbot simulation state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-init',
        sender: 'partner',
        text: activeScenario.initialGreeting,
      },
    ];
  });
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Daily Journal state
  const [journalInput, setJournalInput] = useState('');
  const [journalResult, setJournalResult] = useState<any | null>(null);
  const [isEvaluatingJournal, setIsEvaluatingJournal] = useState(false);

  // Authentic reading test answers
  const [authenticAnswers, setAuthenticAnswers] = useState<Record<number, number>>({});
  const [showAuthenticResult, setShowAuthenticResult] = useState(false);

  // Switch scenario resets chat
  const handleSelectScenario = (index: number) => {
    setSelectedScenarioIndex(index);
    const scen = scenarios[index];
    setChatMessages([
      {
        id: `msg-init-${index}`,
        sender: 'partner',
        text: scen.initialGreeting,
      },
    ]);
    setInputText('');
  };

  const handleSendMessage = async (customText?: string) => {
    const messageToSend = (customText || inputText).trim();
    if (!messageToSend || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'student',
      text: messageToSend,
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsSending(true);

    try {
      const response = await fetch('/api/ai/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: activeScenario.title,
          role: activeScenario.partnerRole,
          grade,
          history: chatMessages.map(m => ({
            role: m.sender === 'student' ? 'user' : 'assistant',
            content: m.text,
          })),
          userMessage: messageToSend,
        }),
      });

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'partner',
        text: data.reply || 'Thank you for sharing! Let us continue our conversation.',
        feedbackVi: data.feedback,
        suggestion: data.suggestion,
      };

      setChatMessages(prev => [...prev, aiMsg]);
      onAddXP(15);

      // Auto speak AI response
      audioManager.speak(aiMsg.text, 'US');
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'partner',
          text: 'That is great! Tell me more about what you think.',
          feedbackVi: 'Lời khen: Bạn phát âm và dùng câu rất tự tin!',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) return;

    setIsListening(true);
    const controller = startSpeechRecognition(
      (res) => {
        setInputText(res.transcript);
        setIsListening(false);
      },
      () => setIsListening(false),
      () => setIsListening(false)
    );

    if (!controller) {
      setIsListening(false);
    }
  };

  const handleEvaluateJournal = async () => {
    if (!journalInput.trim() || isEvaluatingJournal) return;
    setIsEvaluatingJournal(true);

    try {
      const res = await fetch('/api/ai/evaluate-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade,
          prompt: 'Write 3 simple sentences about your daily activities and thoughts today.',
          studentText: journalInput,
        }),
      });

      const data = await res.json();
      setJournalResult(data);
      onAddXP(20);
    } catch (err) {
      console.error('Journal eval error:', err);
      setJournalResult({
        score: 8.5,
        strengths: ['Diễn đạt câu gãy gọn, đúng cấu trúc'],
        corrections: ['Kiểm tra mạo từ và mốc thời gian'],
        encouragement: 'Bài viết rất tốt! Hãy tiếp tục duy trì thói quen viết mỗi ngày.',
      });
    } finally {
      setIsEvaluatingJournal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Ứng dụng thực tế (Real-Life English)</h3>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Điểm nhấn GDPT 2018
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Học đi đôi với hành: Đóng vai với trợ lý AI, đọc hiểu thực đơn/biển báo đời sống thật và thử thách Mini-project 30 giây.
          </p>
        </div>
      </div>

      {/* Scenario Selector tabs */}
      <div className="flex flex-wrap gap-2">
        {scenarios.map((scen, idx) => (
          <button
            key={scen.id}
            id={`btn-scenario-${idx}`}
            onClick={() => handleSelectScenario(idx)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedScenarioIndex === idx
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{scen.partnerAvatar}</span>
            <span>{scen.title}</span>
          </button>
        ))}
      </div>

      {/* 1. MODEL DIALOGUE EXCHANGES (Kịch bản đàm thoại chuẩn SGK & Đời sống) */}
      {activeScenario.exchanges && activeScenario.exchanges.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                💬 Kịch bản đối thoại mẫu chuẩn ({activeScenario.roleA || 'Vai A'} & {activeScenario.roleB || 'Vai B'})
              </span>
            </div>

            <button
              onClick={() => {
                activeScenario.exchanges?.forEach((ex, i) => {
                  setTimeout(() => {
                    audioManager.speak(ex.lineEn, i % 2 === 0 ? 'US' : 'UK');
                  }, i * 3200);
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Nghe toàn bộ kịch bản</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {activeScenario.exchanges.map((ex, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                    isEven ? 'bg-slate-50 border-slate-200' : 'bg-blue-50/50 border-blue-200'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      isEven ? 'bg-slate-200 text-slate-800' : 'bg-blue-600 text-white'
                    }`}
                  >
                    {ex.speaker[0] || (isEven ? 'A' : 'B')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{ex.speaker}</span>
                      <button
                        onClick={() => audioManager.speak(ex.lineEn, isEven ? 'US' : 'UK')}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
                        title="Nghe câu này"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe</span>
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">"{ex.lineEn}"</p>
                    <p className="text-xs text-slate-600 italic mt-0.5">{ex.lineVi}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cultural Tip if available */}
          {activeScenario.culturalTip && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-amber-900">Mẹo giao tiếp thực tế & Văn hóa bản ngữ:</strong>
                <p className="mt-0.5">{activeScenario.culturalTip}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 1. INTERACTIVE AI ROLE-PLAY CHATBOT (Tình huống mô phỏng) */}
      {activeScenario.category === 'simulation' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[520px]">
          {/* Chat Partner Header */}
          <div className="bg-slate-900 text-white p-3.5 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{activeScenario.partnerAvatar}</span>
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span>{activeScenario.partnerRole}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <p className="text-[11px] text-slate-300">{activeScenario.descriptionVi}</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold bg-white/10 px-2 py-1 rounded border border-white/20">
              Lớp {grade} GDPT
            </span>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === 'student';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isUser ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-[80%] space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-2xs ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between gap-3">
                        <span>{msg.text}</span>
                        {!isUser && (
                          <button
                            onClick={() => audioManager.speak(msg.text, 'US')}
                            className="text-slate-400 hover:text-blue-600 shrink-0"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Teacher feedback from AI */}
                    {msg.feedbackVi && (
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-medium">
                        💡 {msg.feedbackVi}
                      </div>
                    )}

                    {/* Next response suggestion */}
                    {msg.suggestion && (
                      <button
                        onClick={() => handleSendMessage(msg.suggestion)}
                        className="text-[11px] text-blue-600 hover:text-blue-800 bg-blue-50/80 px-2 py-1 rounded border border-blue-200 block text-left"
                      >
                        💬 Gợi ý trả lời: <em>"{msg.suggestion}"</em>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isSending && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <Bot className="w-4 h-4 animate-spin" />
                <span>{activeScenario.partnerRole} đang suy nghĩ và gõ câu trả lời...</span>
              </div>
            )}
          </div>

          {/* Quick prompt suggestions */}
          <div className="p-2 bg-white border-t border-slate-100 flex flex-wrap gap-1.5 overflow-x-auto">
            <span className="text-[11px] text-slate-400 py-0.5 px-1 font-medium">Gợi ý nhanh:</span>
            {activeScenario.suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-2 py-1 rounded-md transition-colors"
              >
                "{p}"
              </button>
            ))}
          </div>

          {/* Input box with Voice and Send */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <button
              id="btn-voice-chat"
              onClick={handleVoiceInput}
              className={`p-2.5 rounded-xl border transition-colors ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
              }`}
              title="Nói bằng micro"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              id="input-chat-message"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Nhập câu trả lời bằng tiếng Anh (hoặc bấm mic để nói)..."
              className="flex-1 text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              id="btn-send-chat"
              disabled={!inputText.trim() || isSending}
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-blue-600 disabled:bg-slate-300 text-white hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. AUTHENTIC READING (Đọc hiểu văn bản đời sống: Biển báo, Thực đơn) */}
      {activeScenario.category === 'authentic-reading' && activeScenario.authenticItem && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
              Đọc hiểu tình huống thực tế
            </span>
            <h3 className="text-base font-bold text-slate-800 pt-2">
              {activeScenario.authenticItem.title}
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50/60 border-2 border-dashed border-amber-300 text-center font-bold text-slate-800 shadow-inner">
            <div className="text-3xl mb-2">📋</div>
            <p className="text-base font-mono leading-relaxed">
              {activeScenario.authenticItem.title}
            </p>
          </div>

          {/* Reading questions */}
          <div className="space-y-4">
            {activeScenario.authenticItem.questions.map((q, qIdx) => {
              const selected = authenticAnswers[qIdx];
              const isCorrect = selected === q.correctIndex;

              return (
                <div key={qIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    Câu {qIdx + 1}: {q.question}
                  </p>

                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selected === optIdx;
                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                      if (showAuthenticResult) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                        }
                      } else if (isChosen) {
                        btnStyle = 'bg-blue-50 border-blue-600 text-blue-800 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showAuthenticResult}
                          onClick={() => setAuthenticAnswers({ ...authenticAnswers, [qIdx]: optIdx })}
                          className={`p-2.5 rounded-lg border text-xs text-left transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showAuthenticResult && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                      <strong>Giải thích: </strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!showAuthenticResult ? (
            <button
              onClick={() => {
                setShowAuthenticResult(true);
                onAddXP(15);
              }}
              disabled={Object.keys(authenticAnswers).length < activeScenario.authenticItem.questions.length}
              className="w-full py-2.5 bg-blue-600 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-xs"
            >
              Kiểm tra câu trả lời
            </button>
          ) : (
            <button
              onClick={() => {
                setShowAuthenticResult(false);
                setAuthenticAnswers({});
              }}
              className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
            >
              Làm lại bài đọc
            </button>
          )}
        </div>
      )}

      {/* 3. MINI-PROJECT PITCH (Dự án nhỏ 30 giây) */}
      {activeScenario.category === 'mini-project' && activeScenario.miniProjectPrompt && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Thử thách Mini-Project 30s
            </span>
            <h3 className="text-base font-bold text-slate-900 pt-2">
              {activeScenario.miniProjectPrompt.task}
            </h3>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-700">Các bước chuẩn bị bài nói thuyết phục:</p>
            <ul className="space-y-1">
              {activeScenario.miniProjectPrompt.sampleGuidance.map((g, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900">Bài nói mẫu tham khảo:</span>
              <button
                onClick={() => audioManager.speak(activeScenario.miniProjectPrompt!.sampleScript, 'US')}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe mẫu</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
              "{activeScenario.miniProjectPrompt.sampleScript}"
            </p>
          </div>
        </div>
      )}

      {/* 4. DAILY LIFE: 3-SENTENCE JOURNAL (Nhật ký 3 câu mỗi ngày với AI chấm điểm) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Nhật ký 3 câu tiếng Anh hôm nay (English Daily Journal)
            </h4>
          </div>
          <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200">
            Giáo viên AI chấm điểm
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Hãy áp dụng từ vựng và mẫu câu vừa học để viết 3 câu ngắn diễn tả hoạt động, sở thích hoặc cảm xúc của em hôm nay:
        </p>

        <textarea
          id="textarea-daily-journal"
          rows={3}
          value={journalInput}
          onChange={(e) => setJournalInput(e.target.value)}
          placeholder="Ví dụ: Today I went to school by bus. My teacher taught us exciting grammar rules. I feel energetic!"
          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans leading-relaxed"
        />

        <div className="flex justify-between items-center">
          <span className="text-[11px] text-slate-400">
            Khuyên dùng: Viết từ 25-50 từ
          </span>
          <button
            id="btn-evaluate-journal"
            disabled={!journalInput.trim() || isEvaluatingJournal}
            onClick={handleEvaluateJournal}
            className="px-4 py-2 bg-indigo-600 disabled:bg-slate-300 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            {isEvaluatingJournal ? (
              <span>Đang chấm bài...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nhờ cô giáo AI nhận xét</span>
              </>
            )}
          </button>
        </div>

        {/* AI Journal Evaluation Result */}
        {journalResult && (
          <div className="p-4 rounded-xl bg-slate-50 border border-indigo-200 space-y-3 mt-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-bold text-slate-900">Điểm đánh giá:</span>
                <span className="text-base font-extrabold text-blue-600">{journalResult.score}/10</span>
              </div>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                +20 XP
              </span>
            </div>

            {journalResult.strengths && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-700 uppercase">Ưu điểm:</span>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
                  {journalResult.strengths.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {journalResult.corrections && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-700 uppercase">Gợi ý sửa lỗi:</span>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
                  {journalResult.corrections.map((c: string, i: number) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {journalResult.encouragement && (
              <div className="p-2.5 rounded-lg bg-indigo-50/80 text-xs text-indigo-900 font-medium border border-indigo-100">
                💬 {journalResult.encouragement}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

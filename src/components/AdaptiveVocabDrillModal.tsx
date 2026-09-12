import React, { useState, useMemo } from 'react';
import { GradeLevel, WordItem } from '../types';
import { CURRICULUM_UNITS } from '../data/curriculumData';
import { THEMATIC_CLUSTERS } from '../data/thematicVocabulary';
import { GRADE_KNOWLEDGE_BASE_WORDS } from '../data/gradeKnowledgeBase';
import { audioManager } from '../utils/audioUtils';
import {
  X,
  Zap,
  Award,
  CheckCircle2,
  XCircle,
  Volume2,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface AdaptiveVocabDrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  grade: GradeLevel;
  currentCorrectCount: number;
  targetRequired?: number; // 70
  onRecordCorrectAnswer: (amount?: number) => void;
  onUnlockedNewLesson?: () => void;
  extraVocabPool?: Array<{ word: string; meaningVi: string; ipa?: string; partOfSpeech?: string }>;
}

export const AdaptiveVocabDrillModal: React.FC<AdaptiveVocabDrillModalProps> = ({
  isOpen,
  onClose,
  grade,
  currentCorrectCount,
  targetRequired = 70,
  onRecordCorrectAnswer,
  onUnlockedNewLesson,
  extraVocabPool = [],
}) => {
  const [round, setRound] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userSelected, setUserSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [liveCorrectCount, setLiveCorrectCount] = useState(currentCorrectCount);
  const [hasJustUnlocked, setHasJustUnlocked] = useState(false);

  // Synchronize when currentCorrectCount changes initially
  React.useEffect(() => {
    setLiveCorrectCount(currentCorrectCount);
  }, [currentCorrectCount]);

  // Aggregate rich vocabulary pool for this student's grade tier
  const vocabPool = useMemo(() => {
    const pool: Array<{ word: string; meaningVi: string; ipa?: string; partOfSpeech?: string }> = [
      ...extraVocabPool,
    ];

    // From curriculum units
    const gradeUnits = CURRICULUM_UNITS.filter((u) => u.grade === grade);
    gradeUnits.forEach((u) => {
      u.vocabularies.forEach((w) => {
        pool.push({
          word: w.word,
          meaningVi: w.meaningVi,
          ipa: w.ipa,
          partOfSpeech: w.partOfSpeech,
        });
      });
    });

    // From thematic clusters
    THEMATIC_CLUSTERS.forEach((c) => {
      c.words.forEach((w) => {
        pool.push({
          word: w.word,
          meaningVi: w.meaningVi,
          ipa: w.ipa,
          partOfSpeech: w.partOfSpeech,
        });
      });
    });

    // From grade knowledge base
    const kbWords = GRADE_KNOWLEDGE_BASE_WORDS.filter((w) => w.grade === grade);
    kbWords.forEach((w) => {
      pool.push({
        word: w.word,
        meaningVi: w.meaningVi,
        ipa: w.ipa,
        partOfSpeech: w.partOfSpeech,
      });
    });

    // Deduplicate by word
    const map = new Map<string, { word: string; meaningVi: string; ipa?: string; partOfSpeech?: string }>();
    pool.forEach((item) => {
      if (!map.has(item.word.toLowerCase())) {
        map.set(item.word.toLowerCase(), item);
      }
    });

    return Array.from(map.values());
  }, [grade, extraVocabPool]);

  // Generate 5 questions for this round
  const currentRoundQuestions = useMemo(() => {
    if (vocabPool.length < 4) return [];

    const shuffled = [...vocabPool].sort(() => Math.random() - 0.5);
    const questions = [];

    for (let i = 0; i < 5; i++) {
      const target = shuffled[i % shuffled.length];
      const others = vocabPool.filter((v) => v.word.toLowerCase() !== target.word.toLowerCase());
      const distractors = [...others].sort(() => Math.random() - 0.5).slice(0, 3);

      const isEnToVi = (i + round) % 2 === 0;

      if (isEnToVi) {
        const options = [target.meaningVi, ...distractors.map((d) => d.meaningVi)].sort(
          () => Math.random() - 0.5
        );
        questions.push({
          id: `drill-${round}-${i}`,
          type: 'en-to-vi',
          prompt: `Nghĩa tiếng Việt của từ: "${target.word}"?`,
          subPrompt: target.ipa ? `Phát âm: ${target.ipa} ${target.partOfSpeech ? `(${target.partOfSpeech})` : ''}` : undefined,
          targetWord: target.word,
          correctAnswer: target.meaningVi,
          options,
          explanation: `"${target.word}" ${target.ipa || ''} có nghĩa là "${target.meaningVi}".`,
        });
      } else {
        const options = [target.word, ...distractors.map((d) => d.word)].sort(
          () => Math.random() - 0.5
        );
        questions.push({
          id: `drill-${round}-${i}`,
          type: 'vi-to-en',
          prompt: `Từ tiếng Anh nào mang nghĩa: "${target.meaningVi}"?`,
          subPrompt: target.partOfSpeech ? `Từ loại: ${target.partOfSpeech}` : undefined,
          targetWord: target.word,
          correctAnswer: target.word,
          options,
          explanation: `"${target.word}" có nghĩa là: ${target.meaningVi}.`,
        });
      }
    }

    return questions;
  }, [vocabPool, round]);

  if (!isOpen) return null;

  const currentQ = currentRoundQuestions[questionIndex];
  const isUnlocked = liveCorrectCount >= targetRequired;

  const handleSelect = (option: string) => {
    if (userSelected !== null) return;
    setUserSelected(option);
    setShowExplanation(true);

    const isCorrect = option.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim();

    if (isCorrect) {
      const updated = liveCorrectCount + 1;
      setLiveCorrectCount(updated);
      audioManager.playEffect('correct');
      onRecordCorrectAnswer(1);

      if (updated >= targetRequired && liveCorrectCount < targetRequired) {
        setHasJustUnlocked(true);
        audioManager.playEffect('levelup');
      }
    } else {
      audioManager.playEffect('incorrect');
    }
  };

  const handleNextQuestion = () => {
    setUserSelected(null);
    setShowExplanation(false);

    if (questionIndex < currentRoundQuestions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      // Advance to next round automatically for continuous practice!
      setRound((prev) => prev + 1);
      setQuestionIndex(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-indigo-700 to-blue-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
              <Zap className="w-6 h-6 text-slate-950 fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  Luyện Kiểm Tra Từ Vựng Thích Ứng Nhiều Phần
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">
                  Vòng {round}
                </span>
              </div>
              <p className="text-xs text-amber-100">
                Tạo các bộ câu hỏi kiểm tra liên tục giúp em thuộc bài và tích lũy trên 70 câu đúng.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Milestone Tracker (70 Questions Required) */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              Tiến trình mở khóa tạo bài mới:
            </span>
            <span
              className={`text-sm font-black ${
                isUnlocked ? 'text-emerald-600' : 'text-indigo-600'
              }`}
            >
              {liveCorrectCount} / {targetRequired} câu đúng {isUnlocked ? '✓ ĐÃ MỞ KHÓA' : '🔒 ĐANG KHÓA'}
            </span>
          </div>

          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isUnlocked ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-indigo-600'
              }`}
              style={{
                width: `${Math.min(100, (liveCorrectCount / targetRequired) * 100)}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>
              {isUnlocked
                ? 'Em đã vượt mốc 70 câu đúng và hoàn toàn làm chủ kiến thức!'
                : `Còn thiếu ${Math.max(0, targetRequired - liveCorrectCount)} câu trả lời đúng nữa`}
            </span>
            <span className="font-semibold text-indigo-700">
              Câu {questionIndex + 1} / 5 (Vòng {round})
            </span>
          </div>
        </div>

        {/* Just Unlocked Celebration Alert */}
        {hasJustUnlocked && (
          <div className="p-4 bg-emerald-50 border-b border-emerald-200 text-emerald-950 flex items-center justify-between gap-3 animate-bounce">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🎉</div>
              <div className="text-xs">
                <p className="font-bold text-sm text-emerald-800">
                  Chúc mừng em! Đã đạt mốc {liveCorrectCount} câu trả lời đúng!
                </p>
                <p className="text-emerald-700">Quyền tạo bài học mới đã chính thức được mở khóa!</p>
              </div>
            </div>
            {onUnlockedNewLesson && (
              <button
                onClick={() => {
                  onUnlockedNewLesson();
                  onClose();
                }}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-emerald-700 flex items-center gap-1 shrink-0"
              >
                <span>Tạo bài mới</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Question Area */}
        <div className="p-5 sm:p-6 space-y-5 flex-1 overflow-y-auto">
          {currentQ ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                    {currentQ.type === 'en-to-vi' ? 'Tiếng Anh ➔ Tiếng Việt' : 'Tiếng Việt ➔ Tiếng Anh'}
                  </span>
                  {currentQ.targetWord && (
                    <button
                      onClick={() => audioManager.speak(currentQ.targetWord, 'US')}
                      className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Phát âm</span>
                    </button>
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-black text-slate-900">{currentQ.prompt}</h4>
                {currentQ.subPrompt && (
                  <p className="text-xs text-slate-600 italic">{currentQ.subPrompt}</p>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, idx) => {
                  const hasAnswered = userSelected !== null;
                  const isSelected = userSelected === opt;
                  const isRight = opt.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim();

                  let style =
                    'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 text-slate-800';

                  if (hasAnswered) {
                    if (isRight) {
                      style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected && !isRight) {
                      style = 'bg-rose-50 border-rose-400 text-rose-950 line-through';
                    } else {
                      style = 'bg-slate-50 text-slate-400 border-slate-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleSelect(opt)}
                      className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2 cursor-pointer ${style}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isRight && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {hasAnswered && isSelected && !isRight && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 animate-fadeIn ${
                    userSelected?.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim()
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    {userSelected?.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim() ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Chính xác! (+1 câu đúng, +5 XP)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-amber-600" />
                        <span>Em chú ý ghi nhớ đáp án đúng:</span>
                      </>
                    )}
                  </div>
                  <p>{currentQ.explanation}</p>
                </div>
              )}

              {/* Next Question / Next Round Button */}
              {userSelected !== null && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <span>
                      {questionIndex < currentRoundQuestions.length - 1
                        ? 'Câu tiếp theo'
                        : `Hoàn tất vòng ${round} ➔ Sang vòng ${round + 1}`}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-8 text-slate-500">Đang tạo bộ câu hỏi kiểm tra...</div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Hệ thống tạo liên tục nhiều vòng câu hỏi cho đến khi em đạt chuẩn {targetRequired} câu đúng.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

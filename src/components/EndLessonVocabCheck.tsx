import React, { useState, useEffect, useMemo } from 'react';
import { WordItem } from '../types';
import { audioManager } from '../utils/audioUtils';
import {
  CheckCircle2,
  XCircle,
  Volume2,
  RotateCcw,
  Sparkles,
  Zap,
  Award,
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  AlertCircle,
  Layers,
} from 'lucide-react';

export interface VocabCheckItem {
  id: string;
  word: string;
  ipa?: string;
  partOfSpeech?: string;
  meaningVi: string;
  exampleEn?: string;
  exampleVi?: string;
  examNote?: string;
}

interface EndLessonVocabCheckProps {
  lessonTitle: string;
  vocabList: VocabCheckItem[] | WordItem[];
  onRecordCorrectAnswer?: () => void;
  onFinishLesson?: () => void;
  currentCorrectTotal?: number;
  targetRequired?: number; // default 70
}

interface QuizQuestionItem {
  id: string;
  type: 'vi-to-en' | 'en-to-vi' | 'cloze' | 'listen';
  prompt: string;
  audioText?: string;
  subPrompt?: string;
  correctWord: string;
  correctMeaning: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const EndLessonVocabCheck: React.FC<EndLessonVocabCheckProps> = ({
  lessonTitle,
  vocabList,
  onRecordCorrectAnswer,
  onFinishLesson,
  currentCorrectTotal = 0,
  targetRequired = 70,
}) => {
  const [roundNumber, setRoundNumber] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);

  // Normalize vocab list
  const normalizedVocab = useMemo<VocabCheckItem[]>(() => {
    if (!vocabList || vocabList.length === 0) return [];
    return vocabList.map((item, idx) => ({
      id: (item as any).id || `vocab-check-${idx}`,
      word: item.word,
      ipa: item.ipa || '',
      partOfSpeech: item.partOfSpeech || '',
      meaningVi: item.meaningVi,
      exampleEn: (item as any).exampleEn || (item as any).contextSentence || '',
      exampleVi: (item as any).exampleVi || '',
      examNote: (item as any).examNote || '',
    }));
  }, [vocabList]);

  // Generate a round of 5-8 questions based on normalizedVocab
  const questions = useMemo<QuizQuestionItem[]>(() => {
    if (normalizedVocab.length === 0) return [];

    const generated: QuizQuestionItem[] = [];
    const pool = [...normalizedVocab].sort(() => Math.random() - 0.5);
    const countToMake = Math.min(8, Math.max(4, pool.length));

    const backupWords = [
      { en: 'friend', vi: 'bạn bè' },
      { en: 'school', vi: 'trường học' },
      { en: 'teacher', vi: 'thầy cô giáo' },
      { en: 'family', vi: 'gia đình' },
      { en: 'student', vi: 'học sinh' },
      { en: 'book', vi: 'quyển sách' },
      { en: 'happy', vi: 'vui vẻ' },
      { en: 'learn', vi: 'học tập' },
    ];

    for (let i = 0; i < countToMake; i++) {
      const target = pool[i % pool.length];
      const otherWords = normalizedVocab.filter(
        (w) => w.word.toLowerCase().trim() !== target.word.toLowerCase().trim()
      );
      const distractors = [...otherWords].sort(() => Math.random() - 0.5);

      // Distribute question types based on index and round
      const types: Array<'vi-to-en' | 'en-to-vi' | 'cloze' | 'listen'> = [
        'vi-to-en',
        'en-to-vi',
        'cloze',
        'listen',
      ];
      const selectedType = types[(i + roundNumber) % types.length];

      if (selectedType === 'vi-to-en') {
        const wrongSet = new Set<string>([target.word.toLowerCase().trim()]);
        const wrongOpts: string[] = [];
        for (const d of distractors) {
          const key = d.word.toLowerCase().trim();
          if (!wrongSet.has(key)) {
            wrongSet.add(key);
            wrongOpts.push(d.word);
            if (wrongOpts.length >= 3) break;
          }
        }
        for (const b of backupWords) {
          if (wrongOpts.length >= 3) break;
          const key = b.en.toLowerCase().trim();
          if (!wrongSet.has(key)) {
            wrongSet.add(key);
            wrongOpts.push(b.en);
          }
        }
        const options = [target.word, ...wrongOpts.slice(0, 3)].sort(() => Math.random() - 0.5);

        generated.push({
          id: `q-${roundNumber}-${i}`,
          type: 'vi-to-en',
          prompt: `Chọn từ tiếng Anh đúng với nghĩa: "${target.meaningVi}"`,
          subPrompt: target.partOfSpeech ? `(Từ loại: ${target.partOfSpeech})` : undefined,
          correctWord: target.word,
          correctMeaning: target.meaningVi,
          options,
          correctAnswer: target.word,
          explanation: `Từ "${target.word}" ${target.ipa || ''} có nghĩa là: ${target.meaningVi}.`,
        });
      } else if (selectedType === 'en-to-vi') {
        const wrongSet = new Set<string>([target.meaningVi.toLowerCase().trim()]);
        const wrongOpts: string[] = [];
        for (const d of distractors) {
          const key = d.meaningVi.toLowerCase().trim();
          if (!wrongSet.has(key)) {
            wrongSet.add(key);
            wrongOpts.push(d.meaningVi);
            if (wrongOpts.length >= 3) break;
          }
        }
        for (const b of backupWords) {
          if (wrongOpts.length >= 3) break;
          const key = b.vi.toLowerCase().trim();
          if (!wrongSet.has(key)) {
            wrongSet.add(key);
            wrongOpts.push(b.vi);
          }
        }
        const options = [target.meaningVi, ...wrongOpts.slice(0, 3)].sort(() => Math.random() - 0.5);

        generated.push({
          id: `q-${roundNumber}-${i}`,
          type: 'en-to-vi',
          prompt: `Nghĩa tiếng Việt của từ: "${target.word}" là gì?`,
          subPrompt: target.ipa ? `Phát âm: ${target.ipa}` : undefined,
          correctWord: target.word,
          correctMeaning: target.meaningVi,
          options,
          correctAnswer: target.meaningVi,
          explanation: `"${target.word}" có nghĩa là "${target.meaningVi}".`,
        });
      } else if (selectedType === 'cloze' && target.exampleEn && target.exampleEn.toLowerCase().includes(target.word.toLowerCase())) {
        const blanked = target.exampleEn.replace(new RegExp(target.word, 'gi'), '_______');
        const wrongSet = new Set<string>([target.word.toLowerCase().trim()]);
        const wrongOpts: string[] = [];
        for (const d of distractors) {
          const key = d.word.toLowerCase().trim();
          if (!wrongSet.has(key)) {
            wrongSet.add(key);
            wrongOpts.push(d.word);
            if (wrongOpts.length >= 3) break;
          }
        }
        for (const b of backupWords) {
          if (wrongOpts.length >= 3) break;
          const key = b.en.toLowerCase().trim();
          if (!wrongSet.has(key)) {
            wrongSet.add(key);
            wrongOpts.push(b.en);
          }
        }
        const options = [target.word, ...wrongOpts.slice(0, 3)].sort(() => Math.random() - 0.5);

        generated.push({
          id: `q-${roundNumber}-${i}`,
          type: 'cloze',
          prompt: `Điền từ thích hợp vào chỗ trống trong câu:`,
          subPrompt: `"${blanked}"`,
          correctWord: target.word,
          correctMeaning: target.meaningVi,
          options,
          correctAnswer: target.word,
          explanation: `Câu hoàn chỉnh: "${target.exampleEn}" (Nghĩa: ${target.meaningVi}).`,
        });
      } else {
        // Listening type
        const wrongSet = new Set<string>([target.word.toLowerCase().trim()]);
        const wrongOpts: string[] = [];
        for (const d of distractors) {
          const key = d.word.toLowerCase().trim();
          if (!wrongSet.has(key)) {
            wrongSet.add(key);
            wrongOpts.push(d.word);
            if (wrongOpts.length >= 3) break;
          }
        }
        for (const b of backupWords) {
          if (wrongOpts.length >= 3) break;
          const key = b.en.toLowerCase().trim();
          if (!wrongSet.has(key)) {
            wrongSet.add(key);
            wrongOpts.push(b.en);
          }
        }
        const options = [target.word, ...wrongOpts.slice(0, 3)].sort(() => Math.random() - 0.5);

        generated.push({
          id: `q-${roundNumber}-${i}`,
          type: 'listen',
          prompt: `Nghe phát âm chuẩn và chọn từ vựng tương ứng:`,
          audioText: target.word,
          subPrompt: `Bấm loa 🔊 để nghe phát âm`,
          correctWord: target.word,
          correctMeaning: target.meaningVi,
          options,
          correctAnswer: target.word,
          explanation: `Phát âm: "${target.word}" ${target.ipa || ''} nghĩa là: ${target.meaningVi}.`,
        });
      }
    }

    return generated;
  }, [normalizedVocab, roundNumber]);

  // If question type is listen, autoplay audio on question load
  useEffect(() => {
    if (questions[currentIndex]?.type === 'listen' && questions[currentIndex]?.audioText) {
      audioManager.speak(questions[currentIndex].audioText!, 'US');
    }
  }, [currentIndex, questions]);

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (option: string) => {
    if (userAnswers[currentIndex] !== undefined) return;

    setUserAnswers((prev) => ({ ...prev, [currentIndex]: option }));
    setShowExplanation(true);

    const isCorrect = option.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim();

    if (isCorrect) {
      setSessionCorrectCount((prev) => prev + 1);
      audioManager.playEffect('correct');
      if (onRecordCorrectAnswer) {
        onRecordCorrectAnswer();
      }
    } else {
      audioManager.playEffect('incorrect');
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartRound = () => {
    setRoundNumber((prev) => prev + 1);
    setCurrentIndex(0);
    setUserAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
  };

  if (!normalizedVocab || normalizedVocab.length === 0) {
    return (
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
        <p className="text-sm font-semibold text-slate-600">
          Chưa có danh sách từ vựng để kiểm tra cho bài học này.
        </p>
      </div>
    );
  }

  const scorePercentage = Math.round((sessionCorrectCount / questions.length) * 100);
  const isMastered = scorePercentage >= 80;

  return (
    <div
      id="end-lesson-vocab-check"
      className="bg-white rounded-2xl border border-indigo-100 shadow-md overflow-hidden transition-all"
    >
      {/* Header bar */}
      <div className="p-5 bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 font-black flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-6 h-6 text-indigo-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                Kiểm Tra Đánh Giá Từ Vựng Kết Thúc Bài
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Vòng {roundNumber}
              </span>
            </div>
            <p className="text-xs text-blue-200">
              Chủ đề: <strong className="text-white">{lessonTitle}</strong> • {normalizedVocab.length} từ cốt lõi
            </p>
          </div>
        </div>

        {/* 70 Correct answers progress tracker */}
        <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 flex items-center gap-2.5">
          <Zap className="w-4 h-4 text-amber-300" />
          <div className="text-right text-xs">
            <span className="text-slate-300 block text-[10px]">Tiến độ mở khóa bài mới:</span>
            <span className="font-black text-amber-300">
              {currentCorrectTotal} / {targetRequired} câu đúng
            </span>
          </div>
        </div>
      </div>

      {/* Main Quiz Body */}
      {!isCompleted ? (
        <div className="p-6 space-y-6">
          {/* Progress bar within this round */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
              <span>
                Câu hỏi {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-emerald-700 font-bold">
                Đúng {sessionCorrectCount} câu vòng này (+{sessionCorrectCount * 5} XP)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          {currentQ && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-md">
                    {currentQ.type === 'vi-to-en' && 'Dạng 1: Nghĩa tiếng Việt ➔ Tiếng Anh'}
                    {currentQ.type === 'en-to-vi' && 'Dạng 2: Tiếng Anh ➔ Nghĩa tiếng Việt'}
                    {currentQ.type === 'cloze' && 'Dạng 3: Điền từ vào ngữ cảnh câu'}
                    {currentQ.type === 'listen' && 'Dạng 4: Nghe âm thanh ➔ Chọn từ đúng'}
                  </span>
                  {currentQ.audioText && (
                    <button
                      onClick={() => audioManager.speak(currentQ.audioText!, 'US')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-xs font-bold transition-all shadow-2xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe lại</span>
                    </button>
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-black text-slate-900">{currentQ.prompt}</h4>

                {currentQ.subPrompt && (
                  <p className="text-sm font-medium text-slate-700 bg-white/70 p-2.5 rounded-xl border border-indigo-100">
                    {currentQ.subPrompt}
                  </p>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((option, idx) => {
                  const hasAnswered = userAnswers[currentIndex] !== undefined;
                  const isSelected = userAnswers[currentIndex] === option;
                  const isCorrectAnswer =
                    option.toLowerCase().trim() === currentQ.correctAnswer.toLowerCase().trim();

                  let btnStyle =
                    'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 text-slate-800';

                  if (hasAnswered) {
                    if (isCorrectAnswer) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs';
                    } else if (isSelected && !isCorrectAnswer) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold line-through';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectAnswer(option)}
                      className={`p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                    >
                      <span className="flex-1">{option}</span>
                      {hasAnswered && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {hasAnswered && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Audio button */}
              {showExplanation && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm space-y-2 animate-fadeIn ${
                    userAnswers[currentIndex]?.toLowerCase().trim() ===
                    currentQ.correctAnswer.toLowerCase().trim()
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50/80 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold flex items-center gap-1.5">
                      {userAnswers[currentIndex]?.toLowerCase().trim() ===
                      currentQ.correctAnswer.toLowerCase().trim() ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Chính xác! +1 câu đúng vào tiến độ mở khóa.</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          <span>Chưa chính xác, em ghi nhớ nhé:</span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => audioManager.speak(currentQ.correctWord, 'US')}
                      className="text-xs px-2 py-1 bg-white rounded border border-slate-200 hover:bg-slate-100 flex items-center gap-1 text-slate-700"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{currentQ.correctWord}</span>
                    </button>
                  </div>
                  <p className="leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {/* Next Question Button */}
              {userAnswers[currentIndex] !== undefined && (
                <div className="flex justify-end pt-2">
                  <button
                    id="btn-vocab-check-next"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs flex items-center gap-2 transition-all"
                  >
                    <span>
                      {currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả đánh giá'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Round Result & Adaptive Multi-round Drill Screen */
        <div className="p-6 sm:p-8 text-center space-y-6">
          <div
            className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-sm ${
              isMastered ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}
          >
            {isMastered ? '🎉' : '💡'}
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xl sm:text-2xl font-black text-slate-900">
              {isMastered ? 'Thuộc Bài Xuất Sắc!' : 'Em Cần Luyện Thêm Vòng Mới Để Thuộc Bài!'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Em đã trả lời đúng <strong className="text-indigo-600">{sessionCorrectCount}</strong> /{' '}
              {questions.length} câu trong vòng kiểm tra này ({scorePercentage}%).
            </p>
          </div>

          {/* 70 Correct Requirement Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-left max-w-md mx-auto space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Tiến độ mở khóa bài học mới:
              </span>
              <span
                className={
                  currentCorrectTotal >= targetRequired ? 'text-emerald-700' : 'text-indigo-700'
                }
              >
                {currentCorrectTotal} / {targetRequired} câu đúng
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  currentCorrectTotal >= targetRequired ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{
                  width: `${Math.min(100, (currentCorrectTotal / targetRequired) * 100)}%`,
                }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              {currentCorrectTotal >= targetRequired ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đã hoàn thành trên {targetRequired} câu đúng! Quyền tạo bài học mới đã sẵn sàng.
                </span>
              ) : (
                <span>
                  Cần thêm <strong className="text-indigo-700">{targetRequired - currentCorrectTotal}</strong>{' '}
                  câu trả lời chính xác nữa để mở khóa bài học tiếp theo. Hãy bấm luyện thêm vòng kiểm tra bên dưới!
                </span>
              )}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {/* Multi-round question generator button */}
            <button
              id="btn-vocab-check-new-round"
              onClick={handleRestartRound}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm vòng kiểm tra mới (Đổi câu hỏi)</span>
              <span className="text-[10px] bg-indigo-500 px-1.5 py-0.5 rounded text-white font-mono">
                +Vòng {roundNumber + 1}
              </span>
            </button>

            {onFinishLesson && (
              <button
                id="btn-vocab-check-finish"
                onClick={onFinishLesson}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 transition-all"
              >
                Hoàn tất & Tiếp tục
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

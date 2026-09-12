import React, { useState } from 'react';
import { UserProgress, WordItem } from '../types';
import { CURRICULUM_UNITS } from '../data/curriculumData';
import { updateWordRepetition } from '../utils/storageUtils';
import { audioManager } from '../utils/audioUtils';
import { BookOpen, X, Volume2, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

interface NotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
}

export const NotebookModal: React.FC<NotebookModalProps> = ({
  isOpen,
  onClose,
  progress,
  onProgressUpdate,
}) => {
  const [reviewMode, setReviewMode] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  // Flatten all words from all units to lookup metadata
  const allWordsMap = new Map<string, WordItem>();
  CURRICULUM_UNITS.forEach(u => {
    u.vocabularies.forEach(w => allWordsMap.set(w.id, w));
  });

  const savedList = progress.savedNotebookWords
    .map(saved => ({
      ...saved,
      wordData: allWordsMap.get(saved.wordId),
    }))
    .filter(item => item.wordData !== undefined);

  // Filter words due for review today
  const now = new Date();
  const dueWords = savedList.filter(item => new Date(item.nextReviewDate) <= now);

  const handleRateReview = (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    const currentItem = dueWords[currentReviewIndex];
    if (!currentItem) return;

    const updated = updateWordRepetition(currentItem.wordId, quality);
    onProgressUpdate(updated);

    setIsFlipped(false);
    if (currentReviewIndex < dueWords.length - 1) {
      setCurrentReviewIndex(prev => prev + 1);
    } else {
      setReviewMode(false);
      setCurrentReviewIndex(0);
    }
  };

  const currentReviewItem = dueWords[currentReviewIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-emerald-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Sổ Tay Từ Vựng Cá Nhân (Spaced Repetition)
              </h3>
              <p className="text-xs text-slate-600">
                Ôn tập ngắt quãng khoa học: tự động nhắc từ hay quên
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Top summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-medium block">Tổng số từ đã lưu</span>
              <span className="text-xl font-black text-slate-900">{savedList.length}</span>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-center">
              <span className="text-xs text-amber-700 font-medium block">Cần ôn tập hôm nay</span>
              <span className="text-xl font-black text-amber-900">{dueWords.length}</span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center flex flex-col justify-center">
              {dueWords.length > 0 ? (
                <button
                  onClick={() => {
                    setReviewMode(true);
                    setCurrentReviewIndex(0);
                    setIsFlipped(false);
                  }}
                  className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Bắt đầu ôn {dueWords.length} từ
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-700">Đã hoàn thành ôn tập hôm nay! 🎉</span>
              )}
            </div>
          </div>

          {/* REVIEW MODE (Spaced Repetition Flashcard) */}
          {reviewMode && currentReviewItem && currentReviewItem.wordData ? (
            <div className="bg-white rounded-2xl border-2 border-emerald-400 p-6 space-y-5 text-center shadow-md">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Thẻ ôn tập: {currentReviewIndex + 1} / {dueWords.length}</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Lần lặp lại #{currentReviewItem.repetitionCount + 1}
                </span>
              </div>

              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="py-8 px-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none space-y-3"
              >
                {!isFlipped ? (
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900">
                      {currentReviewItem.wordData.word}
                    </h3>
                    <p className="text-sm font-mono text-blue-600">{currentReviewItem.wordData.ipa}</p>
                    <p className="text-xs text-slate-400 italic mt-2">(Nhấp vào để lật xem nghĩa)</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-emerald-700">
                      {currentReviewItem.wordData.meaningVi}
                    </h4>
                    <p className="text-xs text-slate-700 italic">"{currentReviewItem.wordData.exampleEn}"</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => audioManager.speak(currentReviewItem.wordData!.word, 'US')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe phát âm</span>
              </button>

              {/* Quality evaluation buttons (SuperMemo 2 rating) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-600 block">
                  Em nhớ từ này ở mức độ nào?
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleRateReview(1)}
                    className="p-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold"
                  >
                    Quên rồi 😢 (Ôn lại mai)
                  </button>
                  <button
                    onClick={() => handleRateReview(3)}
                    className="p-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold"
                  >
                    Hơi khó nhớ 🤔 (+3 ngày)
                  </button>
                  <button
                    onClick={() => handleRateReview(5)}
                    className="p-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold"
                  >
                    Nhớ rất rõ! 🚀 (+7 ngày)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Vocabulary list view */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Danh sách từ trong sổ tay:
                </h4>
              </div>

              {savedList.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500 text-xs">
                  Chưa có từ nào trong sổ tay. Hãy bấm biểu tượng Bookmark (🔖) ở bất kỳ thẻ từ nào để lưu vào đây nhé!
                </div>
              ) : (
                <div className="space-y-2">
                  {savedList.map((item) => {
                    const w = item.wordData!;
                    const isDue = new Date(item.nextReviewDate) <= now;
                    return (
                      <div
                        key={item.wordId}
                        className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => audioManager.speak(w.word, 'US')}
                            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-blue-600 shrink-0"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{w.word}</span>
                              <span className="text-xs text-blue-600 font-mono">{w.ipa}</span>
                              <span className="text-[10px] text-slate-400">({w.partOfSpeech})</span>
                            </div>
                            <p className="text-xs text-slate-600">{w.meaningVi}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          {isDue ? (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              Cần ôn lại
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-500">
                              Ôn sau: {new Date(item.nextReviewDate).toLocaleDateString('vi-VN')}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

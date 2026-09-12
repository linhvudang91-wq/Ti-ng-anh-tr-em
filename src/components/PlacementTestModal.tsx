import React, { useState } from 'react';
import { PLACEMENT_QUESTIONS, evaluatePlacementTest } from '../data/placementTestData';
import { GradeLevel } from '../types';
import { Brain, X, CheckCircle2, Award, ArrowRight } from 'lucide-react';

interface PlacementTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedGrade: (grade: GradeLevel) => void;
  onAddXP: (xp: number) => void;
}

export const PlacementTestModal: React.FC<PlacementTestModalProps> = ({
  isOpen,
  onClose,
  onSelectRecommendedGrade,
  onAddXP,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = PLACEMENT_QUESTIONS[currentIdx];

  const handleChoose = (optIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optIndex }));
  };

  const handleNext = () => {
    if (currentIdx < PLACEMENT_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Finished
      setIsCompleted(true);
      onAddXP(30);
    }
  };

  const calculateScore = () => {
    let count = 0;
    PLACEMENT_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctIndex) {
        count++;
      }
    });
    return count;
  };

  const score = calculateScore();
  const result = evaluatePlacementTest(score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-blue-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Kiểm Tra Phân Loại Trình Độ (Placement Test)
              </h3>
              <p className="text-xs text-slate-500">
                Xác định lộ trình học cá nhân hóa theo đúng năng lực thực tế
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {!isCompleted ? (
            <div className="space-y-4">
              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Câu hỏi {currentIdx + 1} / {PLACEMENT_QUESTIONS.length}</span>
                  <span>{Math.round(((currentIdx + 1) / PLACEMENT_QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / PLACEMENT_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {currentQ.question}
                </p>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = answers[currentQ.id] === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleChoose(i)}
                        className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition-all font-medium flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next button */}
              <div className="flex justify-end pt-2">
                <button
                  disabled={answers[currentQ.id] === undefined}
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-blue-600 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                >
                  <span>{currentIdx < PLACEMENT_QUESTIONS.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả & Lộ trình'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Kết quả chẩn đoán
                </span>
                <h4 className="text-2xl font-black text-slate-900">
                  {score} / {PLACEMENT_QUESTIONS.length} câu đúng
                </h4>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-900">Lộ trình khuyến nghị:</span>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-blue-600 text-white">
                    Lớp {result.recommendedGrade}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900">{result.tierName}</p>
                <p className="text-xs text-slate-600">{result.description}</p>
                <div className="pt-2 border-t border-blue-100 text-xs text-blue-900 font-medium">
                  💡 <strong>Lời khuyên học tập:</strong> {result.advice}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => {
                    onSelectRecommendedGrade(result.recommendedGrade);
                    onClose();
                  }}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Chuyển sang Lớp {result.recommendedGrade} ngay
                </button>
                <button
                  onClick={onClose}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Giữ lớp hiện tại
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

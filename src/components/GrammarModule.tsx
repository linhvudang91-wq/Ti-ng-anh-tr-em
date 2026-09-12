import React, { useState, useEffect } from 'react';
import { GrammarRule } from '../types';
import { Lightbulb, CheckCircle2, XCircle, BookOpen, Layers, Award, ArrowRight } from 'lucide-react';

interface GrammarModuleProps {
  grammar: GrammarRule;
  onAddXP: (xp: number) => void;
  grade: number;
}

export const GrammarModule: React.FC<GrammarModuleProps> = ({
  grammar,
  onAddXP,
  grade,
}) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  // Reset step & answers when grammar rule or unit changes
  useEffect(() => {
    setActiveStep(1);
    setUserAnswers({});
    setShowResults(false);
  }, [grammar.id]);

  const handleSelectOption = (exerciseId: string, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: optionIndex }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    grammar.step3Exercises.forEach(ex => {
      if (userAnswers[ex.id] === ex.correctIndex) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const handleCompleteExercises = () => {
    setShowResults(true);
    const correct = calculateScore();
    onAddXP(correct * 10);
  };

  const getLevelBadge = (level: 'nhan-biet' | 'thong-hieu' | 'van-dung') => {
    switch (level) {
      case 'nhan-biet':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Mức 1: Nhận biết</span>;
      case 'thong-hieu':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Mức 2: Thông hiểu</span>;
      case 'van-dung':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">Mức 3: Vận dụng</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 3-Step Pedagogy Navigator */}
      <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
        <button
          id="btn-step-1-recognition"
          onClick={() => setActiveStep(1)}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            activeStep === 1
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">1</span>
          <span className="hidden sm:inline">Bước 1:</span> Nhận diện
        </button>

        <button
          id="btn-step-2-diagram"
          onClick={() => setActiveStep(2)}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            activeStep === 2
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">2</span>
          <span className="hidden sm:inline">Bước 2:</span> Sơ đồ & Quy tắc
        </button>

        <button
          id="btn-step-3-exercises"
          onClick={() => setActiveStep(3)}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            activeStep === 3
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">3</span>
          <span className="hidden sm:inline">Bước 3:</span> Luyện tập 3 mức
        </button>
      </div>

      {/* Header of Grammar Rule */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">{grammar.title}</h3>
          <p className="text-xs text-slate-600 mt-1">
            {grade <= 5
              ? 'Tiểu học: Học ngữ pháp qua tình huống tự nhiên, ví dụ sinh động, không đặt nặng thuật ngữ phức tạp.'
              : 'THCS: Học ngữ pháp có hệ thống, so sánh cấu trúc các thì và bài tập chuẩn ma trận đề kiểm tra.'}
          </p>
        </div>
      </div>

      {/* BƯỚC 1: NHẬN DIỆN (Recognition) */}
      {activeStep === 1 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Ngữ cảnh & Đối thoại mẫu</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
              {grammar.step1Recognition.storyOrDialogue}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700">Điểm cốt lõi cần lưu ý:</span>
              <div className="flex flex-wrap gap-2">
                {grammar.step1Recognition.highlights.map((h, i) => (
                  <span key={i} className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 leading-relaxed">
              <strong>Giải thích dễ hiểu: </strong>
              {grammar.step1Recognition.explanationFriendly}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              id="btn-next-to-step-2"
              onClick={() => setActiveStep(2)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-xs"
            >
              <span>Xem sơ đồ & công thức (Bước 2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* BƯỚC 2: SƠ ĐỒ & CÔNG THỨC TRỰC QUAN (Visual Diagram) */}
      {activeStep === 2 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Bảng công thức & Sơ đồ tư duy</span>
            </div>

            {grammar.step2VisualDiagram.formulaItems && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {grammar.step2VisualDiagram.formulaItems.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {item.label}
                    </span>
                    <p className="font-mono text-xs font-bold text-slate-900 bg-white p-2 rounded border border-slate-200">
                      {item.structure}
                    </p>
                    <p className="text-xs text-slate-600 italic">
                      Ví dụ: <strong>{item.example}</strong>
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-800">
              <strong>Ghi chú & Mẹo làm bài: </strong>
              {grammar.step2VisualDiagram.notesVi}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setActiveStep(1)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
            >
              ← Quay lại Bước 1
            </button>
            <button
              id="btn-next-to-step-3"
              onClick={() => setActiveStep(3)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-xs"
            >
              <span>Luyện tập bài tập 3 mức độ (Bước 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* BƯỚC 3: LUYỆN TẬP 3 MỨC ĐỘ (Exercises) */}
      {activeStep === 3 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-800">
                Bài tập phân loại năng lực GDPT (Nhận biết – Thông hiểu – Vận dụng)
              </h4>
              {showResults && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Award className="w-4 h-4" />
                  <span>Đạt {calculateScore()} / {grammar.step3Exercises.length} câu</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {grammar.step3Exercises.map((ex, index) => {
                const selectedOpt = userAnswers[ex.id];
                const isCorrect = selectedOpt === ex.correctIndex;

                return (
                  <div key={ex.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        {getLevelBadge(ex.level)}
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 pt-1">
                      {ex.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ex.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';

                        if (showResults) {
                          if (optIdx === ex.correctIndex) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                          } else if (isChosen && !isCorrect) {
                            btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                          }
                        } else if (isChosen) {
                          btnStyle = 'border-blue-600 bg-blue-50 text-blue-800 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={showResults}
                            onClick={() => handleSelectOption(ex.id, optIdx)}
                            className={`p-2.5 rounded-lg border text-xs text-left transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {showResults && optIdx === ex.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                            )}
                            {showResults && isChosen && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900">
                        <strong>Giải thích chi tiết: </strong> {ex.explanationVi}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!showResults ? (
              <button
                id="btn-submit-grammar-exercises"
                disabled={Object.keys(userAnswers).length < grammar.step3Exercises.length}
                onClick={handleCompleteExercises}
                className="w-full py-2.5 bg-blue-600 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-xs"
              >
                Nộp bài & Xem giải thích chi tiết
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  id="btn-retry-grammar"
                  onClick={() => {
                    setShowResults(false);
                    setUserAnswers({});
                  }}
                  className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
                >
                  Làm lại bài tập
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

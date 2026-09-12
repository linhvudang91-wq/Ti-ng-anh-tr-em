import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { recordCorrectAnswer } from '../utils/storageUtils';
import { CheckCircle2, XCircle, Award, RotateCcw, AlertCircle, FileCheck, Bookmark } from 'lucide-react';

interface QuizReviewModuleProps {
  questions: QuizQuestion[];
  unitId: string;
  grade: number;
  onAddXP: (xp: number) => void;
  onSaveQuizScore: (unitId: string, score: number) => void;
  onRecordCorrectAnswer?: (count: number) => void;
}

export const QuizReviewModule: React.FC<QuizReviewModuleProps> = ({
  questions,
  unitId,
  grade,
  onAddXP,
  onSaveQuizScore,
  onRecordCorrectAnswer,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (questionId: string, optIndex: number) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    const correctCount = questions.filter(q => userAnswers[q.id] === q.correctIndex).length;
    if (correctCount > 0) {
      recordCorrectAnswer(correctCount);
      if (onRecordCorrectAnswer) {
        onRecordCorrectAnswer(correctCount);
      }
    }
    onAddXP(Math.round(score / 2));
    onSaveQuizScore(unitId, score);
  };

  const handleReset = () => {
    setSubmitted(false);
    setUserAnswers({});
  };

  const isExamPrepTier = grade >= 8;

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className={`rounded-xl p-4 border flex items-start justify-between gap-3 ${
        isExamPrepTier
          ? 'bg-amber-50/80 border-amber-200 text-amber-950'
          : 'bg-blue-50/80 border-blue-200 text-blue-950'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg text-white shrink-0 mt-0.5 ${isExamPrepTier ? 'bg-amber-600' : 'bg-blue-600'}`}>
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold">
                {isExamPrepTier ? 'Luyện đề & Ôn thi vào Lớp 10' : 'Kiểm tra & Ôn tập cuối Unit (Quiz)'}
              </h3>
              {isExamPrepTier && (
                <span className="text-[10px] font-bold bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                  Ma trận chuẩn tuyển sinh 10
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              {isExamPrepTier
                ? 'Bộ câu hỏi bám sát cấu trúc đề thi tuyển sinh vào lớp 10 THPT: Ngữ âm, Cụm động từ, Tìm lỗi sai và Viết lại câu.'
                : 'Bài kiểm tra tổng hợp từ vựng và ngữ pháp đã học trong Unit, chấm điểm tự động kèm lời giải chi tiết.'}
            </p>
          </div>
        </div>

        {submitted && (
          <div className="text-right shrink-0">
            <span className="text-xs text-slate-500 font-medium block">Điểm số:</span>
            <span className={`text-2xl font-black ${
              calculateScore() >= 80 ? 'text-emerald-600' : calculateScore() >= 50 ? 'text-amber-600' : 'text-rose-600'
            }`}>
              {calculateScore()}/100
            </span>
          </div>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Câu hỏi {idx + 1} / {questions.length}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  q.competencyLevel === 'van-dung'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : q.competencyLevel === 'thong-hieu'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {q.competencyLevel === 'van-dung' ? 'Vận dụng' : q.competencyLevel === 'thong-hieu' ? 'Thông hiểu' : 'Nhận biết'}
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isChosen = selected === optIdx;
                  let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                  if (submitted) {
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
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                      )}
                      {submitted && isChosen && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 mt-2">
                  <strong>Lời giải & Mẹo làm bài: </strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Submit / Reset */}
      <div className="pt-2">
        {!submitted ? (
          <button
            id="btn-submit-unit-quiz"
            disabled={Object.keys(userAnswers).length < questions.length}
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
          >
            Nộp bài thi & Xem bảng điểm chi tiết
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại đề thi</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

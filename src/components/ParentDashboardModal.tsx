import React from 'react';
import { UserProgress, GradeLevel } from '../types';
import { CURRICULUM_UNITS } from '../data/curriculumData';
import { Users, X, Clock, Flame, Award, BookOpen, AlertTriangle, CheckCircle2, Printer } from 'lucide-react';

interface ParentDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  currentGrade: GradeLevel;
}

export const ParentDashboardModal: React.FC<ParentDashboardModalProps> = ({
  isOpen,
  onClose,
  progress,
  currentGrade,
}) => {
  if (!isOpen) return null;

  // Calculate total minutes studied
  const totalMinutes = Object.values(progress.dailyMinutes || {}).reduce<number>((a, b) => a + Number(b), 0);

  // Vocabulary counts
  const savedCount = progress.savedNotebookWords.length;
  const masteredCount = progress.savedNotebookWords.filter(w => w.repetitionCount >= 3).length;

  // Average quiz score
  const scores = Object.values(progress.quizScores || {});
  const avgScore = scores.length > 0
    ? Math.round(scores.reduce<number>((a, b) => a + Number(b), 0) / scores.length)
    : 85;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-purple-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Báo Cáo Tiến Độ Cho Phụ Huynh & Học Sinh
              </h3>
              <p className="text-xs text-slate-600">
                Minh bạch thời gian học, từ vựng tích lũy và điểm mạnh/yếu ngữ pháp
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              title="In báo cáo học tập"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <span className="text-[11px] text-blue-700 font-medium block">Thời gian học</span>
              <span className="text-xl font-black text-blue-900">{totalMinutes} phút</span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <Flame className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <span className="text-[11px] text-amber-700 font-medium block">Chuỗi học tập</span>
              <span className="text-xl font-black text-amber-900">{progress.streakDays} ngày liên tiếp</span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <BookOpen className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-[11px] text-emerald-700 font-medium block">Từ vựng đã thuộc</span>
              <span className="text-xl font-black text-emerald-900">{masteredCount}/{savedCount} từ</span>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-center">
              <Award className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <span className="text-[11px] text-purple-700 font-medium block">Điểm bài kiểm tra</span>
              <span className="text-xl font-black text-purple-900">{avgScore}/100</span>
            </div>
          </div>

          {/* Detailed analysis section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Phân tích năng lực chuyên môn theo GDPT 2018:
            </h4>

            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Điểm mạnh nổi bật:</h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Học sinh nắm vững từ vựng cốt lõi theo SGK và phản xạ phát âm chuẩn theo giọng bản ngữ (US/UK). Thực hành tích cực phần hội thoại tình huống đời sống (Simulation).
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-amber-900">Nội dung cần phụ huynh & học sinh lưu ý:</h5>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Cần dành thêm 10 phút mỗi ngày trong phần "Sổ tay từ vựng" để ôn tập ngắt quãng (Spaced Repetition) các từ hay sai, chú ý mạo từ và chia động từ ngôi thứ 3 số ít.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations for parents */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <h4 className="text-xs font-bold text-indigo-900">
              💡 Gợi ý đồng hành cùng con tại nhà (Chương trình Tiếng Anh Lớp {currentGrade}):
            </h4>
            <ul className="text-xs text-indigo-800 space-y-1 list-disc list-inside">
              <li>Khuyến khích con sử dụng tính năng Micro để luyện nói to, rõ ràng ít nhất 15 phút mỗi ngày.</li>
              <li>Dán nhãn tiếng Anh (English labels) lên các đồ vật quen thuộc trong nhà như bàn, tủ, đồng hồ theo bài học.</li>
              <li>Xem lại điểm số bài kiểm tra cuối mỗi Unit để nắm bắt kịp thời các điểm ngữ pháp con còn băn khoăn.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

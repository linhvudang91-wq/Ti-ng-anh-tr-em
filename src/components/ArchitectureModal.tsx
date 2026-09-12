import React from 'react';
import { Sparkles, X, Layers, Brain, BookOpen, Database, Code, CheckCircle2, Calendar, Target, Zap, ArrowRight } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDailyMission?: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
  onOpenDailyMission,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-indigo-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Sơ Đồ Kiến Trúc Hệ Thống & Ma Trận GDPT 2018
              </h3>
              <p className="text-xs text-slate-600">
                Hệ sinh thái EdTech thông minh tích hợp AI điều phối bài tập hàng ngày theo lộ trình phát triển hàng năm
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

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-800">
          {/* Section 1: AI Daily Mission Engine & Yearly Progression Roadmap */}
          <div className="space-y-3 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-blue-50/80 border border-indigo-200 shadow-2xs">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                  ★
                </span>
                <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span>Kiến Trúc AI Điều Phối Lộ Trình Hàng Năm & Bài Học Đơn Mục Tiêu</span>
                </h4>
              </div>
              {onOpenDailyMission && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenDailyMission();
                  }}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Mở Lộ Trình & Bài Tập Ngày</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Mô hình học tập thích ứng cá nhân hóa cao: Thay vì dồn ép nhiều kỹ năng cùng lúc, hệ thống sử dụng thuật toán phân rã kiến thức thành <strong>1 Mục Tiêu Duy Nhất Mỗi Ngày (Single-Task Focus)</strong> bám sát khung lộ trình 4 giai đoạn trong năm học (GDPT 2018 & Luyện thi chuyển cấp / Chuyên Anh).
            </p>

            {/* Visual Roadmap Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
                  <Target className="w-3.5 h-3.5" />
                  <span>1. Chẩn đoán & Lộ trình</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Xác định khối lớp (3-9) và giai đoạn học kỳ (HK1, HK2, Ôn thi 10). Chia năm học thành 4 chặng nâng dần CEFR Pre-A1 → A1 → A2 → B1/B2.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2. Điều phối theo tuần</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Phân bổ kỹ năng theo nhịp sinh học: T2 Từ vựng, T3 Ngữ pháp, T4 Nghe hiểu, T5 Nói phát xạ, T6 Đọc hiểu, T7 Viết câu, CN Tổng hợp.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700">
                  <Zap className="w-3.5 h-3.5" />
                  <span>3. AI Sinh bài tập tức thì</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Gemini 2.5 Flash kiến tạo vi bài giảng (micro-lesson) và bài tập trắc nghiệm, điền từ, nghe audio, nói phản xạ đúng 10-15 phút.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>4. SM-2 & Cột mốc năm</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Ghi nhận XP, duy trì Streak hàng ngày và tự động cập nhật tiến độ vào bài thi đánh giá năng lực định kỳ giữa kỳ / cuối kỳ.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: 3 Phân tầng năng lực */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <h4 className="text-sm font-bold text-slate-900">
                Phân tầng 3 giai đoạn năng lực học sinh (GDPT 2018)
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1.5">
                <span className="text-xs font-black text-blue-700 block">
                  Tiểu học (Lớp 3–5)
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  • Học qua hình ảnh, âm thanh, flashcards, trò chơi ghép cặp và phát âm vui nhộn.<br/>
                  • Không đặt nặng ngữ pháp hàn lâm, hướng vào phản xạ nghe - nói tự nhiên (A1).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                <span className="text-xs font-black text-amber-800 block">
                  THCS Đầu cấp (Lớp 6–7)
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  • Hệ thống hóa ngữ pháp qua sơ đồ tư duy 3 bước (Nhận diện → Công thức → Luyện tập 3 mức).<br/>
                  • Tăng cường kỹ năng đọc - viết câu ghép, đoạn văn ngắn (A2).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1.5">
                <span className="text-xs font-black text-purple-800 block">
                  THCS Cuối cấp & Thi 10 (Lớp 8–9)
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  • Ôn luyện chuyên sâu ngữ pháp phức hợp, cấu trúc so sánh kép, mệnh đề quan hệ.<br/>
                  • Bộ câu hỏi ma trận tuyển sinh vào 10 THPT và tranh biện thực tế (A2+/B1).
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: 5 Trụ cột mô-đun học tập song hành */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <h4 className="text-sm font-bold text-slate-900">
                7 Phân hệ học tập tương tác đa chiều
              </h4>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold py-2 bg-white rounded-lg border border-slate-200">
                <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800">1. Từ vựng (Core + Extension)</span>
                <span className="text-slate-400">⇄</span>
                <span className="px-2.5 py-1 rounded bg-indigo-100 text-indigo-800">2. Ngữ pháp (3 Bước GDPT)</span>
                <span className="text-slate-400">⇄</span>
                <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-800">3. Mẫu câu (Slot Frames)</span>
                <span className="text-slate-400">⇄</span>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">4. Ứng dụng thực tế (AI Simulation)</span>
                <span className="text-slate-400">⇄</span>
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800">5. Ôn thi & Đánh giá</span>
                <span className="text-slate-400">⇄</span>
                <span className="px-2.5 py-1 rounded bg-teal-100 text-teal-800">6. Gia sư AI</span>
                <span className="text-slate-400">⇄</span>
                <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-800">7. Luyện đọc AI</span>
              </div>
              <p className="text-xs text-slate-600 text-center italic">
                Các kiến thức liên kết chặt chẽ xoay quanh bối cảnh thực tiễn của từng Unit trong SGK và được củng cố mỗi ngày.
              </p>
            </div>
          </div>

          {/* Section 4: Tech Stack & Architecture */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              <h4 className="text-sm font-bold text-slate-900">
                Kiến trúc công nghệ Full-Stack & Trí tuệ nhân tạo (AI Engine)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Code className="w-4 h-4 text-blue-600" />
                  <span>Frontend Client (React 18 + Tailwind)</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Giao diện tương tác cao, Web Speech API cho Text-to-Speech (TTS US/UK) và Speech Recognition (chấm điểm phát âm).
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span>Backend AI Engine (Express + Gemini 2.5)</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Điều phối bài học ngày đơn mục tiêu (/api/ai/daily-mission), mô phỏng hội thoại roleplay và gia sư tạo bài đọc 50-60 & 120-150 từ.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Spaced Repetition (SuperMemo-2 SM-2)</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Thuật toán ghi nhớ ngắt quãng tối ưu, tính toán khoảng cách ngày lặp lại dựa trên độ khó từ vựng và lịch sử làm bài tập hàng ngày.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Bám sát 3 bộ SGK chuẩn Bộ GD&ĐT</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Global Success (Kết Nối Tri Thức), i-Learn Smart World và Friends Plus (Chân Trời Sáng Tạo).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


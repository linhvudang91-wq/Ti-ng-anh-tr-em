import React from 'react';
import { LessonMode } from '../types';
import { Sparkles, PlayCircle, RotateCcw, Award, CheckCircle2, BookOpen } from 'lucide-react';

interface LessonModeSelectorProps {
  currentMode: LessonMode;
  onModeChange: (mode: LessonMode) => void;
  completedUnitsCount: number;
  totalUnitsCount: number;
}

export const LessonModeSelector: React.FC<LessonModeSelectorProps> = ({
  currentMode,
  onModeChange,
  completedUnitsCount,
  totalUnitsCount,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            🎯
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900">Chế độ học tập bài học</h3>
            <p className="text-xs text-slate-500">
              Lựa chọn chế độ phù hợp với tiến độ và mục tiêu của bạn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tiến độ: {completedUnitsCount}/{totalUnitsCount} bài đã hoàn thành</span>
        </div>
      </div>

      {/* 3 Modes Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Mode 1: Bài học mới */}
        <button
          onClick={() => onModeChange('new-lesson')}
          className={`text-left p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between relative ${
            currentMode === 'new-lesson'
              ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
              : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
          }`}
        >
          {currentMode === 'new-lesson' && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          )}
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`p-1.5 rounded-lg ${currentMode === 'new-lesson' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700">Chế độ 1</span>
              <h4 className="font-bold text-sm text-slate-900 leading-tight">Bài học mới</h4>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nạp 12 từ vựng cốt lõi SGK, học phát âm chuẩn IPA, lý thuyết ngữ pháp cơ bản và mẫu câu trọng tâm.
          </p>
        </button>

        {/* Mode 2: Tiếp tục học */}
        <button
          onClick={() => onModeChange('continue-lesson')}
          className={`text-left p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between relative ${
            currentMode === 'continue-lesson'
              ? 'bg-emerald-50/90 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
              : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
          }`}
        >
          {currentMode === 'continue-lesson' && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          )}
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`p-1.5 rounded-lg ${currentMode === 'continue-lesson' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
              <PlayCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">Chế độ 2</span>
              <h4 className="font-bold text-sm text-slate-900 leading-tight">Tiếp tục học</h4>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tiếp tục bài học đang dở dang, luyện tập phản xạ mẫu câu, bài đọc hiểu ngữ cảnh và đàm thoại AI Tutor.
          </p>
        </button>

        {/* Mode 3: Ôn tập lại bài đã học */}
        <button
          onClick={() => onModeChange('review-lesson')}
          className={`text-left p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between relative ${
            currentMode === 'review-lesson'
              ? 'bg-purple-50/90 border-purple-600 ring-2 ring-purple-500/20 shadow-xs'
              : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
          }`}
        >
          {currentMode === 'review-lesson' && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
          )}
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`p-1.5 rounded-lg ${currentMode === 'review-lesson' ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-purple-700">Chế độ 3</span>
              <h4 className="font-bold text-sm text-slate-900 leading-tight">Ôn tập lại bài đã học</h4>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mở rộng 8-10 từ vựng nâng cao Chuyên B1+/B2, làm lại Quiz 10 câu nâng cao điểm số và ôn thẻ nhớ Flashcards.
          </p>
        </button>
      </div>
    </div>
  );
};

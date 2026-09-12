import React from 'react';
import { GradeLevel, TextbookSeries, Semester, UserProgress, UserProfile } from '../types';
import { TEXTBOOK_NAMES } from '../data/curriculumData';
import { BookOpen, Award, Flame, Brain, Users, Sparkles, Bot, ChevronDown, Bookmark, CheckCircle2, Calendar, Target } from 'lucide-react';

interface NavbarProps {
  currentGrade: GradeLevel;
  onGradeChange: (g: GradeLevel) => void;
  currentTextbook: TextbookSeries;
  onTextbookChange: (t: TextbookSeries) => void;
  currentSemester: Semester;
  onSemesterChange: (s: Semester) => void;
  progress: UserProgress;
  activeUser?: UserProfile;
  onOpenProfileModal: () => void;
  onOpenPlacementTest: () => void;
  onOpenParentDashboard: () => void;
  onOpenNotebook: () => void;
  onOpenArchitectureMap: () => void;
  onOpenAiTutor?: () => void;
  onOpenSavedLessons?: () => void;
  savedLessonsCount?: number;
  onOpenDailyVocab?: () => void;
  onOpenDailyMission?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentGrade,
  onGradeChange,
  currentTextbook,
  onTextbookChange,
  currentSemester,
  onSemesterChange,
  progress,
  activeUser,
  onOpenProfileModal,
  onOpenPlacementTest,
  onOpenParentDashboard,
  onOpenNotebook,
  onOpenArchitectureMap,
  onOpenAiTutor,
  onOpenSavedLessons,
  savedLessonsCount = 0,
  onOpenDailyVocab,
  onOpenDailyMission,
}) => {
  const getGradeTierName = (grade: GradeLevel) => {
    if (grade <= 5) return 'Tiểu học (Lớp 3–5)';
    if (grade <= 7) return 'THCS Đầu cấp (Lớp 6–7)';
    return 'THCS Cuối cấp / Ôn thi vào 10 (Lớp 8–9)';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2.5 gap-2.5">
          {/* Brand & GDPT 2018 Label */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 tracking-tight text-lg">Tiếng Anh 3–9</span>
                  <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                    GDPT 2018
                  </span>
                  {currentGrade >= 6 && (
                    <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                      B2 Chuyên Anh
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {getGradeTierName(currentGrade)}
                </p>
              </div>
            </div>

            {/* Mobile quick actions & Profile */}
            <div className="flex md:hidden items-center gap-2">
              <button
                id="btn-mobile-profile"
                onClick={onOpenProfileModal}
                className="flex items-center gap-1 bg-slate-100 border border-slate-300 px-2 py-1 rounded-lg text-xs font-bold text-slate-800"
              >
                <span>{activeUser?.avatar || '🦁'}</span>
                <span className="max-w-[70px] truncate">{activeUser?.name || 'Học sinh'}</span>
              </button>
              <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-lg text-xs font-semibold">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{progress.streakDays}d</span>
              </div>
              <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-lg text-xs font-semibold">
                <Award className="w-4 h-4 text-blue-600" />
                <span>{progress.xp} XP</span>
              </div>
            </div>
          </div>

          {/* Curriculum Selectors: Grade, Textbook, Semester */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Grade Selector */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200 text-xs font-medium">
              <span className="text-slate-500 px-1.5 hidden sm:inline">Khối:</span>
              {([3, 4, 5, 6, 7, 8, 9] as GradeLevel[]).map((g) => (
                <button
                  key={g}
                  id={`btn-grade-${g}`}
                  onClick={() => onGradeChange(g)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    currentGrade === g
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  L{g}
                </button>
              ))}
            </div>

            {/* Textbook Switcher */}
            <select
              id="select-textbook"
              value={currentTextbook}
              onChange={(e) => onTextbookChange(e.target.value as TextbookSeries)}
              aria-label="Chọn bộ sách giáo khoa"
              className="text-xs font-medium bg-slate-100 border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="global-success">SGK Global Success (Kết Nối Tri Thức)</option>
              <option value="smart-world">SGK i-Learn Smart World</option>
              <option value="friends-plus">SGK Friends Plus (Chân Trời Sáng Tạo)</option>
            </select>

            {/* Semester Switcher */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200 text-xs font-medium">
              <button
                id="btn-semester-1"
                onClick={() => onSemesterChange(1)}
                className={`px-2 py-1 rounded-md transition-all ${
                  currentSemester === 1
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                HK 1
              </button>
              <button
                id="btn-semester-2"
                onClick={() => onSemesterChange(2)}
                className={`px-2 py-1 rounded-md transition-all ${
                  currentSemester === 2
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                HK 2
              </button>
            </div>
          </div>

          {/* Action buttons & User Profile Switcher */}
          <div className="flex items-center gap-2 pt-1 md:pt-0">
            {/* Gia sư AI Gemini Button */}
            {onOpenAiTutor && (
              <button
                id="btn-nav-ai-tutor"
                onClick={onOpenAiTutor}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xs transition-all"
                title="Mở Gia sư AI Gemini tạo bài học & giải đáp 24/7"
              >
                <Bot className="w-3.5 h-3.5 text-amber-300" />
                <span>Gia sư AI</span>
              </button>
            )}

            {/* Sơ đồ kiến trúc */}
            <button
              id="btn-architecture-map"
              onClick={onOpenArchitectureMap}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              title="Xem Kiến trúc hệ thống & Ma trận phân tầng GDPT 2018"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden lg:inline">Sơ đồ</span> Kiến trúc
            </button>

            {/* Placement test button */}
            <button
              id="btn-open-placement-test"
              onClick={onOpenPlacementTest}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
              title="Kiểm tra phân loại trình độ & gợi ý lộ trình học"
            >
              <Brain className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Đo trình độ</span>
            </button>

            {/* Nhiệm vụ học tập hàng ngày tích hợp AI & Lộ trình năm */}
            {onOpenDailyMission && (
              <button
                id="btn-open-daily-mission"
                onClick={onOpenDailyMission}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-indigo-700 shadow-xs transition-all ring-1 ring-purple-300"
                title="Nhiệm vụ học tập hàng ngày đơn mục tiêu (AI Daily Mission) theo lộ trình cả năm"
              >
                <Target className="w-3.5 h-3.5 text-amber-300" />
                <span>Nhiệm vụ Ngày</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-white/20 text-white font-extrabold uppercase">AI</span>
              </button>
            )}

            {/* Kho từ vựng học tập hàng ngày theo khối lớp */}
            {onOpenDailyVocab && (
              <button
                id="btn-open-daily-vocab"
                onClick={onOpenDailyVocab}
                className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-all shadow-2xs"
                title="Kho kiến thức từ vựng & Rèn luyện học tập mỗi ngày theo khối lớp"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">Kho từ vựng</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-amber-200/80 text-amber-950 font-extrabold">Hàng ngày</span>
              </button>
            )}

            {/* Sổ tay từ vựng Spaced Repetition */}
            <button
              id="btn-open-notebook"
              onClick={onOpenNotebook}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors relative"
              title="Sổ tay từ vựng cá nhân & Ôn tập lặp lại ngắt quãng"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sổ từ vựng</span>
              {progress.savedNotebookWords.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {progress.savedNotebookWords.length}
                </span>
              )}
            </button>

            {/* Kho bài học đã lưu & Ôn tập */}
            {onOpenSavedLessons && (
              <button
                id="btn-open-saved-lessons"
                onClick={onOpenSavedLessons}
                className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors relative"
                title="Kho bài học & Bài đọc đã lưu để ôn tập lại"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bài đã lưu</span>
                {savedLessonsCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {savedLessonsCount}
                  </span>
                )}
              </button>
            )}

            {/* Parent & Student Dashboard */}
            <button
              id="btn-open-parent-dashboard"
              onClick={onOpenParentDashboard}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
              title="Báo cáo học tập cho Học sinh & Phụ huynh"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Báo cáo PH</span>
            </button>

            {/* Desktop User Profile Button */}
            {activeUser && (
              <button
                id="btn-desktop-profile-switcher"
                onClick={onOpenProfileModal}
                className="hidden md:flex items-center gap-1.5 text-xs font-bold pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all text-slate-800 shadow-2xs"
                title="Đổi tài khoản người học"
              >
                <span className="text-base">{activeUser.avatar || '🦁'}</span>
                <span className="max-w-[100px] truncate">{activeUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}

            {/* Desktop XP & Streak & Mastery Progress */}
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-200">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  (progress.totalCorrectAnswers || 0) >= 70
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-amber-800 bg-amber-50 border-amber-200'
                }`}
                title="Tổng số câu đúng (Cần đạt trên 70 câu để mở khóa tạo bài mới)"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{progress.totalCorrectAnswers || 0}/70 đúng</span>
              </div>
              <div
                className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-amber-200"
                title="Chuỗi ngày học liên tục (Streak)"
              >
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{progress.streakDays}d</span>
              </div>
              <div
                className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-blue-200"
                title="Điểm tích lũy kinh nghiệm (XP)"
              >
                <Award className="w-4 h-4 text-blue-600" />
                <span>{progress.xp} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

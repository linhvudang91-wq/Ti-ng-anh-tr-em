import React, { useState, useEffect } from 'react';
import {
  GradeLevel,
  TextbookSeries,
  Semester,
  LearningModuleType,
  UserProfile,
  GeneratedLesson,
  EducationLevel,
  AiTutorTab,
  LessonMode,
  AppLayer,
} from './types';
import { CURRICULUM_UNITS, TEXTBOOK_NAMES, getUnitsByGrade } from './data/curriculumData';
import {
  getActiveUser,
  getUserProgress,
  saveWordToNotebook,
  addXP,
  recordQuizScore,
  recordStudyMinutes,
  updateUserProfile,
  recordCorrectAnswer,
} from './utils/storageUtils';

// Components
import { Navbar } from './components/Navbar';
import { VocabularyModule } from './components/VocabularyModule';
import { GrammarModule } from './components/GrammarModule';
import { SentenceModule } from './components/SentenceModule';
import { RealLifeModule } from './components/RealLifeModule';
import { QuizReviewModule } from './components/QuizReviewModule';
import { AiTutorView } from './components/AiTutorView';
import { AiReadingModule } from './components/AiReadingModule';
import { PortalLayer } from './components/PortalLayer';
import { LessonModeSelector } from './components/LessonModeSelector';

// Modals
import { PlacementTestModal } from './components/PlacementTestModal';
import { NotebookModal } from './components/NotebookModal';
import { ParentDashboardModal } from './components/ParentDashboardModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { LoginProfileModal } from './components/LoginProfileModal';
import { SavedLessonsModal } from './components/SavedLessonsModal';
import { DailyVocabKnowledgeModal } from './components/DailyVocabKnowledgeModal';
import { DailyMissionModal } from './components/DailyMissionModal';
import { PersonalizedPathwayModal } from './components/PersonalizedPathwayModal';

import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Flame,
  Award,
  BookCheck,
  Bot,
  Filter,
  User,
  Shield,
  Zap,
  Target,
  Calendar,
} from 'lucide-react';

export default function App() {
  // Multi-user Profile State
  const [activeUser, setActiveUser] = useState<UserProfile>(() => getActiveUser());
  const [showLoginProfileModal, setShowLoginProfileModal] = useState<boolean>(false);
  const [showPersonalizedPathway, setShowPersonalizedPathway] = useState<boolean>(false);

  // Multi-layer Architecture & Lesson Mode State
  const [appLayer, setAppLayer] = useState<AppLayer>('layer-portal');
  const [lessonMode, setLessonMode] = useState<LessonMode>('continue-lesson');

  // Curriculum Navigation State
  const [grade, setGrade] = useState<GradeLevel>(activeUser?.grade || 9);
  const [educationLevel, setEducationLevel] = useState<EducationLevel>(
    (activeUser?.grade || 9) <= 5 ? 'cap-1' : 'cap-2'
  );
  const [textbook, setTextbook] = useState<TextbookSeries>('global-success');
  const [semester, setSemester] = useState<Semester>(1);
  const [activeModule, setActiveModule] = useState<LearningModuleType>('vocabulary');
  const [aiTutorInitialTab, setAiTutorInitialTab] = useState<AiTutorTab>('companion-chat');
  const [readingInitialTopic, setReadingInitialTopic] = useState<string | undefined>(undefined);

  // Filter for B2 Chuyên Anh in secondary grades (6-9)
  const [chuyenOnlyFilter, setChuyenOnlyFilter] = useState<boolean>(false);

  // Helper to calculate progress percentage for each Unit
  const calculateUnitProgress = (unitId: string, u: (typeof CURRICULUM_UNITS)[0]): number => {
    if (progress?.completedUnits?.includes(unitId)) return 100;
    const score = progress?.quizScores?.[unitId];
    if (score !== undefined) {
      return Math.min(100, Math.max(30, Math.round(score)));
    }
    const vocabIds = new Set(u.vocabularies.map((v) => v.id));
    const savedCount = progress?.savedNotebookWords?.filter((w) => vocabIds.has(w.wordId)).length || 0;
    if (savedCount > 0) {
      return Math.min(80, Math.round((savedCount / Math.max(1, u.vocabularies.length)) * 100));
    }
    return 0;
  };

  // Filter units for current grade and semester
  const availableUnits = CURRICULUM_UNITS.filter((u) => {
    if (u.grade !== grade) return false;
    // In Grade 6-9, B2 Chuyen units are also available
    if (chuyenOnlyFilter && !u.isB2Chuyen) return false;
    return u.semester === semester || u.isB2Chuyen;
  });

  const [selectedUnitId, setSelectedUnitId] = useState<string>(
    availableUnits[0]?.id || CURRICULUM_UNITS[0].id
  );

  // When grade or semester changes, select first available unit
  useEffect(() => {
    const units = CURRICULUM_UNITS.filter((u) => {
      if (u.grade !== grade) return false;
      if (chuyenOnlyFilter && !u.isB2Chuyen) return false;
      return u.semester === semester || u.isB2Chuyen;
    });
    if (units.length > 0) {
      setSelectedUnitId(units[0].id);
    }
  }, [grade, semester, chuyenOnlyFilter]);

  const activeUnit =
    CURRICULUM_UNITS.find((u) => u.id === selectedUnitId) ||
    availableUnits[0] ||
    CURRICULUM_UNITS[0];

  // User Progress State
  const [progress, setProgress] = useState(getUserProgress);

  // Modals state
  const [showPlacementTest, setShowPlacementTest] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [showParentDashboard, setShowParentDashboard] = useState(false);
  const [showArchitectureModal, setShowArchitectureModal] = useState(false);
  const [showSavedLessons, setShowSavedLessons] = useState(false);
  const [showDailyVocabModal, setShowDailyVocabModal] = useState(false);
  const [showDailyMissionModal, setShowDailyMissionModal] = useState(false);
  const [initialTutorLesson, setInitialTutorLesson] = useState<GeneratedLesson | null>(null);

  // Sync user profile changes
  const handleUserSelect = (selectedUser: UserProfile) => {
    setActiveUser(selectedUser);
    setProgress(selectedUser.progress);
    setGrade(selectedUser.grade);
    if (selectedUser.target === 'chuyen-b2' && selectedUser.grade >= 6) {
      setChuyenOnlyFilter(true);
    } else {
      setChuyenOnlyFilter(false);
    }
  };

  // Track study time (every 60s record 1 minute)
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = recordStudyMinutes(1);
      setProgress(updated);
      setActiveUser(getActiveUser());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAddXP = (amount: number) => {
    const updated = addXP(amount);
    setProgress(updated);
    setActiveUser(getActiveUser());
  };

  const handleRecordCorrectAnswer = (count: number = 1) => {
    const updated = recordCorrectAnswer(count);
    setProgress(updated);
    setActiveUser(getActiveUser());
  };

  const handleSaveWord = (wordId: string) => {
    const updated = saveWordToNotebook(wordId);
    setProgress(updated);
    setActiveUser(getActiveUser());
  };

  const handleSaveQuiz = (unitId: string, score: number) => {
    const updated = recordQuizScore(unitId, score);
    setProgress(updated);
    setActiveUser(getActiveUser());
  };

  const getTierBadge = (g: GradeLevel) => {
    if (g <= 5) {
      return {
        label: 'Giai đoạn 1: Tiểu học (Lớp 3–5) • Pre-A1 & A1',
        description: 'Học qua hình ảnh, âm thanh sống động, trò chơi tương tác, ngữ pháp tự nhiên.',
        color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        badge: 'Chuẩn GDPT 2018',
      };
    }
    if (g <= 7) {
      return {
        label: 'Giai đoạn 2: THCS Đầu cấp (Lớp 6–7) • Level A2 & Pre-Chuyên B1+/B2',
        description: 'Hệ thống hóa ngữ pháp, mở rộng đọc - viết câu ghép và chuyên đề trật tự tính từ, bị động tường thuật.',
        color: 'bg-blue-50 text-blue-800 border-blue-200',
        badge: 'A2 -> Pre-B2 Chuyên',
      };
    }
    return {
      label: 'Giai đoạn 3: THCS Cuối cấp & Đột phá Thi Chuyên vào 10 (Lớp 8–9) • Level B1/B2+',
      description: 'Chuyên đề Đảo ngữ nâng cao, Thể giả định Subjunctive Mood, Word Formation và Biến đổi câu giữ từ.',
      color: 'bg-purple-50 text-purple-800 border-purple-200',
      badge: 'B2+ Chuyên Anh',
    };
  };

  const getUnitIcon = (unitNumber: number, title: string, isChuyen?: boolean) => {
    if (isChuyen) return '🏆';
    if (title.toLowerCase().includes('hello') || title.toLowerCase().includes('welcome')) return '👋';
    if (title.toLowerCase().includes('time') || title.toLowerCase().includes('routine')) return '⏰';
    if (title.toLowerCase().includes('school')) return '🎒';
    if (title.toLowerCase().includes('city') || title.toLowerCase().includes('town')) return '🏙️';
    if (title.toLowerCase().includes('custom') || title.toLowerCase().includes('tradition')) return '🏮';
    if (unitNumber === 1) return '👋';
    if (unitNumber === 2) return '⏰';
    if (unitNumber === 3) return '🎒';
    return '📘';
  };

  const tierInfo = getTierBadge(grade);

  // Layer 1: Outer classification & Learner Selection Portal
  if (appLayer === 'layer-portal') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
        <PortalLayer
          selectedLevel={educationLevel}
          onSelectLevel={(lvl) => {
            setEducationLevel(lvl);
            if (lvl === 'cap-1' && grade > 5) setGrade(3);
            if (lvl === 'cap-2' && grade < 6) setGrade(6);
          }}
          activeUser={activeUser}
          onSelectUser={handleUserSelect}
          onEnterCurriculum={() => setAppLayer('layer-curriculum')}
          onOpenPersonalizedPathway={(u) => {
            handleUserSelect(u);
            setShowPersonalizedPathway(true);
          }}
        />

        {/* Global Modals accessible from Portal Layer */}
        <LoginProfileModal
          isOpen={showLoginProfileModal}
          onClose={() => setShowLoginProfileModal(false)}
          activeUser={activeUser}
          onSelectUser={handleUserSelect}
          onOpenPersonalizedPathway={(u) => {
            handleUserSelect(u);
            setShowPersonalizedPathway(true);
          }}
        />

        <PersonalizedPathwayModal
          isOpen={showPersonalizedPathway}
          onClose={() => setShowPersonalizedPathway(false)}
          activeUser={activeUser}
          onSwitchUser={handleUserSelect}
          onSelectUnit={(unitId, g, module) => {
            setGrade(g);
            setSelectedUnitId(unitId);
            if (module) {
              setActiveModule(module as any);
            }
            setAppLayer('layer-curriculum');
          }}
          onOpenPlacementTest={() => {
            setShowPersonalizedPathway(false);
            setShowPlacementTest(true);
          }}
        />

        <PlacementTestModal
          isOpen={showPlacementTest}
          onClose={() => setShowPlacementTest(false)}
          onAddXP={handleAddXP}
        />
      </div>
    );
  }

  // Layer 2: Next Layer - Lessons & Curriculum based on Level Choice
  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col font-sans selection:bg-blue-200">
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentGrade={grade}
        onGradeChange={(newGrade) => setGrade(newGrade)}
        currentTextbook={textbook}
        onTextbookChange={(newTb) => setTextbook(newTb)}
        currentSemester={semester}
        onSemesterChange={(newSem) => setSemester(newSem)}
        progress={progress}
        activeUser={activeUser}
        onOpenProfileModal={() => setShowLoginProfileModal(true)}
        onOpenPlacementTest={() => setShowPlacementTest(true)}
        onOpenParentDashboard={() => setShowParentDashboard(true)}
        onOpenNotebook={() => setShowNotebook(true)}
        onOpenArchitectureMap={() => setShowArchitectureModal(true)}
        onOpenAiTutor={() => setActiveModule('ai-tutor')}
        onOpenSavedLessons={() => setShowSavedLessons(true)}
        savedLessonsCount={(progress.savedLessons?.length || 0) + (progress.savedPassages?.length || 0)}
        onOpenDailyVocab={() => setShowDailyVocabModal(true)}
        onOpenDailyMission={() => setShowDailyMissionModal(true)}
        onOpenPersonalizedPathway={() => setShowPersonalizedPathway(true)}
        onSwitchLevelOrUser={() => setAppLayer('layer-portal')}
      />

      {/* 2. Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Layer 2 Breadcrumb & Switch Level/Learner Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Cấu trúc đa lớp:</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 font-bold text-slate-800 border border-slate-200">
              <span>{educationLevel === 'cap-1' ? '🎒 Cấp 1 (Tiểu học: Lớp 3–5)' : '🎓 Cấp 2 (THCS: Lớp 6–9)'}</span>
            </div>
            <span className="text-slate-300">›</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 font-bold text-indigo-900 border border-indigo-200">
              <span>{activeUser.avatar || '🦁'} {activeUser.name}</span>
              <span className="text-[10px] text-indigo-600 font-semibold">(Lớp {grade})</span>
            </div>
            <span className="text-slate-300">›</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 font-bold text-blue-900 border border-blue-200">
              <span>Unit {activeUnit.unitNumber}: {activeUnit.title}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-200 text-blue-950 font-extrabold">
                {activeUnit.vocabularies.length} từ
              </span>
            </div>
          </div>

          <button
            id="btn-switch-level-portal"
            onClick={() => setAppLayer('layer-portal')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all shrink-0"
            title="Quay lại Lớp ngoài cùng để phân loại Cấp 1, Cấp 2 và chọn người học"
          >
            <span>🔄 Đổi Cấp / Chọn người học</span>
          </button>
        </div>
        {/* Tier Overview Banner */}
        <div
          className={`p-4 rounded-2xl border ${tierInfo.color} flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <GraduationCap className="w-5 h-5 shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold tracking-tight uppercase">
                {tierInfo.label}
              </h2>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/90 border border-current shadow-2xs">
                {tierInfo.badge}
              </span>
            </div>
            <p className="text-xs opacity-90">
              {tierInfo.description} (Đang bám sát {TEXTBOOK_NAMES[textbook].name})
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {/* Profile badge quick trigger */}
            <button
              id="user-badge-trigger"
              onClick={() => setShowLoginProfileModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 text-xs font-bold border border-slate-300 shadow-2xs transition-colors"
            >
              <span>{activeUser.avatar || '🦁'}</span>
              <span>{activeUser.name}</span>
              <span className="text-[10px] text-slate-500 font-normal">
                (Đổi người học)
              </span>
            </button>

            {/* Personalized Pathway 10 Lessons Button */}
            <button
              id="personalized-pathway-trigger-btn"
              onClick={() => setShowPersonalizedPathway(true)}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Target className="w-3.5 h-3.5 text-amber-300" />
              <span>Lộ trình 10 bài cá nhân</span>
            </button>

            <button
              id="placement-test-trigger-btn"
              onClick={() => setShowPlacementTest(true)}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white text-slate-800 hover:bg-slate-50 border border-slate-300 shadow-2xs transition-colors"
            >
              Đo trình độ
            </button>
          </div>
        </div>

        {/* AI Daily Single-Objective Mission & Yearly Progression Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-indigo-700/50">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-xs">
                <Target className="w-3 h-3" />
                Nhiệm Vụ Hôm Nay
              </span>
              <span className="text-xs font-semibold text-indigo-200 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Lộ trình 4 giai đoạn Lớp {grade}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-white border border-white/20">
                1 Mục Tiêu Duy Nhất • 10 Phút
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Học tập thích ứng tích hợp AI: Tập trung chuyên sâu 1 kỹ năng mỗi ngày
            </h3>
            <p className="text-xs text-indigo-100/90 leading-relaxed">
              Phân rã lộ trình cả năm thành các vi bài học mỗi ngày (Từ vựng, Ngữ pháp, Nghe, Nói, Đọc, Viết) giúp ghi nhớ sâu, không quá tải và tự tin bứt phá điểm số thi cử.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <button
              id="btn-trigger-daily-mission-banner"
              onClick={() => setShowDailyMissionModal(true)}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <Target className="w-4 h-4 text-slate-950" />
              <span>Làm Bài Tập Ngày</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowArchitectureModal(true)}
              className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
              title="Xem Kiến trúc tổng thể & Lộ trình năm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>

        {/* 3-Section System Master Architecture */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🏛️</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Chương trình Tiếng Anh Chuẩn GDPT 2018 & Trí tuệ Nhân tạo AI
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Bao quát 10 bài học chuẩn theo từng lớp (Cấp 1: Lớp 3-5 • Cấp 2: Lớp 6-9) kết hợp AI Mở rộng & Gia sư AI
              </p>
            </div>

            {/* Level Selector: Cấp 1 vs Cấp 2 */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
              <button
                id="btn-level-cap-1"
                onClick={() => {
                  setEducationLevel('cap-1');
                  if (grade > 5) setGrade(3);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  educationLevel === 'cap-1'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <span>🏫 Cấp 1 (Tiểu học)</span>
                <span className="text-[10px] opacity-80 font-normal">Lớp 3, 4, 5</span>
              </button>

              <button
                id="btn-level-cap-2"
                onClick={() => {
                  setEducationLevel('cap-2');
                  if (grade < 6) setGrade(6);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  educationLevel === 'cap-2'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <span>🎓 Cấp 2 (THCS)</span>
                <span className="text-[10px] opacity-80 font-normal">Lớp 6, 7, 8, 9</span>
              </button>
            </div>
          </div>

          {/* The 3 Core Pillars Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* PART 1 */}
            <button
              id="nav-pillar-part-1"
              onClick={() => {
                if (activeModule === 'ai-tutor') setActiveModule('vocabulary');
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                activeModule !== 'ai-tutor'
                  ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-200'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  activeModule !== 'ai-tutor' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">
                  Phần 1 • Khung chương trình
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  10 Bài học {educationLevel === 'cap-1' ? 'Tiểu học (Lớp 3-5)' : 'THCS (Lớp 6-9)'}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Bao quát kiến thức toàn diện, có thanh tiến độ theo dõi từng Unit
                </p>
              </div>
            </button>

            {/* PART 2 */}
            <button
              id="nav-pillar-part-2"
              onClick={() => {
                setActiveModule('ai-tutor');
                setAiTutorInitialTab('lesson-creator');
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                activeModule === 'ai-tutor' && aiTutorInitialTab === 'lesson-creator'
                  ? 'border-amber-600 bg-amber-50/70 shadow-xs ring-1 ring-amber-200'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  activeModule === 'ai-tutor' && aiTutorInitialTab === 'lesson-creator'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
                  Phần 2 • Tích hợp AI Mở rộng
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Tạo bài học nâng cao cho bé
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Chuyên đề sâu, chuẩn B1+, B2 Chuyên Anh & khảo sát Lớp 6 CLC
                </p>
              </div>
            </button>

            {/* PART 3 */}
            <button
              id="nav-pillar-part-3"
              onClick={() => {
                setActiveModule('ai-tutor');
                setAiTutorInitialTab('companion-chat');
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                activeModule === 'ai-tutor' && aiTutorInitialTab !== 'lesson-creator'
                  ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-1 ring-purple-200'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  activeModule === 'ai-tutor' && aiTutorInitialTab !== 'lesson-creator'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block">
                  Phần 3 • Đồng hành cùng bé
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Gia sư AI Toàn diện 24/7
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Tạo bài kiểm tra, Giải thích ngữ pháp, Từ vựng & Hỏi đáp
                </p>
              </div>
            </button>
          </div>

          {/* Grade & Semester Sub-bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">
                Chọn Lớp ({educationLevel === 'cap-1' ? 'Cấp 1' : 'Cấp 2'}):
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {(educationLevel === 'cap-1' ? [3, 4, 5] : [6, 7, 8, 9]).map((g) => (
                  <button
                    key={g}
                    id={`selector-grade-${g}`}
                    onClick={() => setGrade(g as GradeLevel)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      grade === g
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Học kỳ:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setSemester(1)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    semester === 1
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Học kỳ 1
                </button>
                <button
                  onClick={() => setSemester(2)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    semester === 2
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Học kỳ 2
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Mode Selector: 3 Chế độ học tập */}
        <LessonModeSelector
          currentMode={lessonMode}
          onModeChange={(m) => setLessonMode(m)}
          completedUnitsCount={progress.completedUnits?.length || 0}
          totalUnitsCount={availableUnits.length}
        />

        {/* Units Navigation Row */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                10 Đơn vị bài học (Lớp {grade} - Học kỳ {semester}):
              </span>
            </div>

            {/* B2 Chuyen Filter Toggle for Grade 6-9 */}
            {grade >= 6 && (
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  id="filter-all-units"
                  onClick={() => setChuyenOnlyFilter(false)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    !chuyenOnlyFilter
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả bài học
                </button>
                <button
                  id="filter-chuyen-units"
                  onClick={() => setChuyenOnlyFilter(true)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    chuyenOnlyFilter
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'text-amber-800 hover:text-amber-900 hover:bg-amber-50'
                  }`}
                >
                  <span>🏆 Chuyên Anh B2</span>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
                    Luyện thi 10
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableUnits.map((u) => {
              const isSelected = u.id === activeUnit.id;
              const quizScore = progress.quizScores[u.id];
              const isChuyen = u.isB2Chuyen;
              const unitProgress = calculateUnitProgress(u.id, u);

              return (
                <div
                  key={u.id}
                  id={`unit-card-${u.id}`}
                  onClick={() => {
                    setSelectedUnitId(u.id);
                    if (activeModule === 'ai-tutor') {
                      setActiveModule('vocabulary');
                    }
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isSelected
                      ? isChuyen
                        ? 'bg-amber-50/60 border-amber-500 shadow-md ring-2 ring-amber-200'
                        : 'bg-white border-blue-600 shadow-md ring-2 ring-blue-100'
                      : isChuyen
                      ? 'bg-amber-50/20 border-amber-200 hover:border-amber-400 hover:bg-amber-50/40'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-2xl p-2 rounded-xl shrink-0 ${
                          isChuyen ? 'bg-amber-100 text-amber-800' : 'bg-slate-100'
                        }`}
                      >
                        {getUnitIcon(u.unitNumber, u.title, isChuyen)}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs font-black uppercase ${
                              isChuyen ? 'text-amber-700' : 'text-blue-600'
                            }`}
                          >
                            {isChuyen ? 'Chuyên B2' : `Unit ${u.unitNumber}`}
                          </span>
                          {u.targetTierBadge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200">
                              {u.targetTierBadge}
                            </span>
                          )}
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                            📚 {u.vocabularies.length} từ
                          </span>
                          {quizScore !== undefined && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {quizScore}đ
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1 mt-0.5">
                          {u.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {u.themeVi}
                        </p>
                        {/* Mode Context Badge */}
                        <div className="mt-1.5">
                          {lessonMode === 'new-lesson' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
                              <span>⭐ Bài mới</span>
                              <span className="font-normal opacity-80">• 12 từ SGK</span>
                            </span>
                          )}
                          {lessonMode === 'continue-lesson' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                              <span>{unitProgress === 100 ? '✅ Hoàn thành' : unitProgress > 0 ? '⏳ Tiếp tục học' : '📖 Sẵn sàng'}</span>
                              <span className="font-normal opacity-80">• {unitProgress}%</span>
                            </span>
                          )}
                          {lessonMode === 'review-lesson' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 inline-flex items-center gap-1">
                              <span>🔄 Ôn tập</span>
                              <span className="font-normal opacity-80">• 8-10 từ nâng cao</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 shrink-0 transition-transform ${
                        isSelected
                          ? isChuyen
                            ? 'text-amber-600 translate-x-1'
                            : 'text-blue-600 translate-x-1'
                          : 'text-slate-400'
                      }`}
                    />
                  </div>

                  {/* Visual Progress Bar beneath Unit Title */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100/80 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 font-semibold">
                        {lessonMode === 'review-lesson' ? 'Điểm kiểm tra / Độ vững' : 'Tiến độ hoàn thành'}
                      </span>
                      <span
                        className={`font-black ${
                          unitProgress === 100
                            ? 'text-emerald-600'
                            : unitProgress > 0
                            ? 'text-blue-600'
                            : 'text-slate-400'
                        }`}
                      >
                        {unitProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          unitProgress === 100
                            ? 'bg-emerald-500'
                            : unitProgress >= 60
                            ? 'bg-blue-600'
                            : unitProgress > 0
                            ? 'bg-amber-400'
                            : 'bg-transparent'
                        }`}
                        style={{ width: `${unitProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Unit / AI Tutor Container */}
        {activeModule === 'ai-tutor' ? (
          <div className="space-y-4">
            {/* Tab switch bar back to unit */}
            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Bot className="w-4 h-4 text-blue-600" />
                Đang mở: Gia sư AI Gemini 2.5 Flash
              </span>
              <button
                id="back-to-unit-btn"
                onClick={() => setActiveModule('vocabulary')}
                className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
              >
                ← Quay lại bài học Unit {activeUnit.unitNumber}
              </button>
            </div>
            <AiTutorView
              user={activeUser}
              onAddXp={handleAddXP}
              selectedGrade={grade}
              onOpenSavedLessons={() => setShowSavedLessons(true)}
              onRecordCorrectAnswer={handleRecordCorrectAnswer}
              initialLessonToLoad={initialTutorLesson}
              initialTab={aiTutorInitialTab}
            />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Unit Header Details */}
            <div
              className={`p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                activeUnit.isB2Chuyen ? 'bg-amber-50/30' : 'bg-slate-50/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`text-4xl p-2.5 rounded-2xl border shadow-2xs ${
                    activeUnit.isB2Chuyen
                      ? 'bg-amber-100 border-amber-300'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  {getUnitIcon(activeUnit.unitNumber, activeUnit.title, activeUnit.isB2Chuyen)}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-0.5 rounded-md text-white ${
                        activeUnit.isB2Chuyen ? 'bg-amber-600' : 'bg-blue-600'
                      }`}
                    >
                      Lớp {activeUnit.grade} • {activeUnit.isB2Chuyen ? 'Chuyên B2' : `Unit ${activeUnit.unitNumber}`}
                    </span>
                    {activeUnit.targetTierBadge && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                        🏆 {activeUnit.targetTierBadge}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-500">
                      Chủ đề: {activeUnit.themeVi}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
                    {activeUnit.title}
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong>Mục tiêu bài học: </strong> {activeUnit.summaryVi}
                  </p>
                </div>
              </div>

              {/* Action shortcuts */}
              <div className="flex items-center gap-2 self-start md:self-center shrink-0 flex-wrap">
                <button
                  id="btn-open-reading-from-unit"
                  onClick={() => {
                    setReadingInitialTopic(activeUnit.themeVi);
                    setActiveModule('ai-reading');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Bài đọc AI (50-60 / 120-150 từ)</span>
                </button>
                <button
                  id="btn-open-tutor-from-unit"
                  onClick={() => setActiveModule('ai-tutor')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-xs transition-all"
                >
                  <Bot className="w-4 h-4 text-amber-300" />
                  <span>Hỏi Gia sư AI</span>
                </button>
              </div>
            </div>

            {/* 7 Interconnected Learning Pillars Tab Bar (including AI Tutor & AI Reading) */}
            <div className="border-b border-slate-200 bg-white px-4 sm:px-6">
              <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-2">
                <button
                  id="tab-vocabulary"
                  onClick={() => setActiveModule('vocabulary')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeModule === 'vocabulary'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>🔤 1. Từ vựng</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800">
                    {activeUnit.vocabularies.length}
                  </span>
                </button>

                <button
                  id="tab-grammar"
                  onClick={() => setActiveModule('grammar')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeModule === 'grammar'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>📐 2. Ngữ pháp (3 Bước)</span>
                </button>

                <button
                  id="tab-sentence"
                  onClick={() => setActiveModule('sentence-pattern')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeModule === 'sentence-pattern'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>💬 3. Mẫu câu & Nói</span>
                </button>

                <button
                  id="tab-reallife"
                  onClick={() => setActiveModule('real-life')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeModule === 'real-life'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>🌟 4. Ứng dụng thực tế</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    AI
                  </span>
                </button>

                <button
                  id="tab-quiz"
                  onClick={() => setActiveModule('quiz-exam')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeModule === 'quiz-exam'
                      ? 'bg-purple-50 text-purple-800 border border-purple-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>
                    {grade >= 8 ? '🎯 5. Luyện thi vào 10' : '📝 5. Ôn tập & Quiz'}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800">
                    {activeUnit.quizQuestions.length}
                  </span>
                </button>

                <button
                  id="tab-ai-reading"
                  onClick={() => setActiveModule('ai-reading')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeModule === 'ai-reading'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                      : 'text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>📖 6. Đọc hiểu AI (50-60 & 120-150 từ)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-200 text-emerald-950 font-extrabold">
                    Mới
                  </span>
                </button>

                <button
                  id="tab-ai-tutor"
                  onClick={() => setActiveModule('ai-tutor')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeModule === 'ai-tutor'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                      : 'text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                  <span>🤖 7. Gia sư AI Gemini</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 font-extrabold">
                    AI
                  </span>
                </button>
              </div>
            </div>

            {/* Module Content Body */}
            <div className="p-5 sm:p-6 bg-slate-50/30">
              {activeModule === 'vocabulary' && (
                <VocabularyModule
                  words={activeUnit.vocabularies}
                  progress={progress}
                  onSaveWord={handleSaveWord}
                  onAddXP={handleAddXP}
                  grade={activeUnit.grade}
                  onOpenDailyVocab={() => setShowDailyVocabModal(true)}
                  lessonMode={lessonMode}
                  onSwitchToReading={(topic) => {
                    setReadingInitialTopic(topic);
                    setActiveModule('ai-reading');
                  }}
                />
              )}

              {activeModule === 'grammar' && (
                <GrammarModule
                  grammar={activeUnit.grammar}
                  onAddXP={handleAddXP}
                  grade={activeUnit.grade}
                />
              )}

              {activeModule === 'sentence-pattern' && (
                <SentenceModule
                  sentencePattern={activeUnit.sentencePattern}
                  onAddXP={handleAddXP}
                  grade={activeUnit.grade}
                />
              )}

              {activeModule === 'real-life' && (
                <RealLifeModule
                  scenarios={activeUnit.realLife}
                  onAddXP={handleAddXP}
                  grade={activeUnit.grade}
                />
              )}

              {activeModule === 'quiz-exam' && (
                <QuizReviewModule
                  questions={activeUnit.quizQuestions}
                  unitId={activeUnit.id}
                  grade={activeUnit.grade}
                  onAddXP={handleAddXP}
                  onSaveQuizScore={handleSaveQuiz}
                  onRecordCorrectAnswer={handleRecordCorrectAnswer}
                />
              )}

              {activeModule === 'ai-reading' && (
                <AiReadingModule
                  currentGrade={grade}
                  userProfile={activeUser}
                  initialTopic={readingInitialTopic || activeUnit.themeVi}
                  onAwardXp={handleAddXP}
                  onSaveWord={(word) => {
                    handleSaveWord(word.id);
                  }}
                  isWordSaved={(wordId) => {
                    return progress.savedNotebookWords.some(
                      (w) => w.wordId === wordId || w.wordId === `vocab-${wordId.toLowerCase()}`
                    );
                  }}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <BookCheck className="w-4 h-4 text-blue-600" />
            <span>Hệ thống học Tiếng Anh Lớp 3–9 chuẩn GDPT 2018 & Luyện thi Chuyên B2 vào Lớp 10</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowArchitectureModal(true)}
              className="hover:text-blue-600 font-medium"
            >
              Sơ đồ Kiến trúc & Phân tầng
            </button>
            <span>•</span>
            <button
              onClick={() => setShowPersonalizedPathway(true)}
              className="hover:text-indigo-600 font-bold text-indigo-700"
            >
              Lộ trình 10 bài ({activeUser.name})
            </button>
            <span>•</span>
            <button
              onClick={() => setShowLoginProfileModal(true)}
              className="hover:text-blue-600 font-medium text-blue-700"
            >
              Hồ sơ người học
            </button>
            <span>•</span>
            <button
              onClick={() => setShowPlacementTest(true)}
              className="hover:text-blue-600 font-medium"
            >
              Placement Test
            </button>
            <span>•</span>
            <button
              onClick={() => setShowParentDashboard(true)}
              className="hover:text-blue-600 font-medium"
            >
              Báo cáo Phụ huynh
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginProfileModal
        isOpen={showLoginProfileModal}
        onClose={() => setShowLoginProfileModal(false)}
        activeUser={activeUser}
        onSelectUser={handleUserSelect}
        onOpenPersonalizedPathway={(u) => {
          handleUserSelect(u);
          setShowPersonalizedPathway(true);
        }}
      />

      <PersonalizedPathwayModal
        isOpen={showPersonalizedPathway}
        onClose={() => setShowPersonalizedPathway(false)}
        activeUser={activeUser}
        onSwitchUser={handleUserSelect}
        onSelectUnit={(unitId, g, module) => {
          setGrade(g);
          setSelectedUnitId(unitId);
          if (module) {
            setActiveModule(module as any);
          }
        }}
        onOpenPlacementTest={() => {
          setShowPersonalizedPathway(false);
          setShowPlacementTest(true);
        }}
      />

      <PlacementTestModal
        isOpen={showPlacementTest}
        onClose={() => setShowPlacementTest(false)}
        onSelectRecommendedGrade={(recGrade) => setGrade(recGrade)}
        onAddXP={handleAddXP}
      />

      <NotebookModal
        isOpen={showNotebook}
        onClose={() => setShowNotebook(false)}
        progress={progress}
        onProgressUpdate={(updated) => setProgress(updated)}
      />

      <ParentDashboardModal
        isOpen={showParentDashboard}
        onClose={() => setShowParentDashboard(false)}
        progress={progress}
        currentGrade={grade}
      />

      <ArchitectureModal
        isOpen={showArchitectureModal}
        onClose={() => setShowArchitectureModal(false)}
        onOpenDailyMission={() => setShowDailyMissionModal(true)}
      />

      {/* Saved Lessons & Passages Review Modal */}
      {showSavedLessons && (
        <SavedLessonsModal
          isOpen={showSavedLessons}
          onClose={() => setShowSavedLessons(false)}
          progress={progress}
          onProgressUpdate={(updated) => {
            setProgress(updated);
            setActiveUser(getActiveUser());
          }}
          onSelectLesson={(lesson) => {
            setInitialTutorLesson(lesson);
            setActiveModule('ai-tutor');
            setShowSavedLessons(false);
          }}
          onSelectPassage={() => {
            setActiveModule('ai-reading');
            setShowSavedLessons(false);
          }}
          onRecordCorrectAnswer={handleRecordCorrectAnswer}
        />
      )}

      {/* Kho Kiến Thức Từ Vựng Học Tập Hàng Ngày Theo Khối Lớp */}
      {showDailyVocabModal && (
        <DailyVocabKnowledgeModal
          isOpen={showDailyVocabModal}
          onClose={() => setShowDailyVocabModal(false)}
          initialGrade={grade}
          progress={progress}
          onSaveWord={handleSaveWord}
          onAddXP={handleAddXP}
          onRecordCorrectAnswer={handleRecordCorrectAnswer}
        />
      )}

      {/* Nhiệm vụ học tập hàng ngày đơn mục tiêu (AI Daily Mission) & Lộ trình năm */}
      {showDailyMissionModal && (
        <DailyMissionModal
          isOpen={showDailyMissionModal}
          onClose={() => setShowDailyMissionModal(false)}
          currentGrade={grade}
          onSelectGrade={(g) => setGrade(g)}
          onOpenVocabularyKnowledge={() => {
            setShowDailyMissionModal(false);
            setShowDailyVocabModal(true);
          }}
          onOpenPersonalizedPathway={() => {
            setShowDailyMissionModal(false);
            setShowPersonalizedPathway(true);
          }}
        />
      )}
    </div>
  );
}

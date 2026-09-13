import React, { useState } from 'react';
import { UserProfile, GradeLevel, UnitData } from '../types';
import { getUnitsByGrade, CURRICULUM_UNITS } from '../data/curriculumData';
import { toggleUnitCompletion, getAllUsers, setActiveUserId } from '../utils/storageUtils';
import {
  X,
  Target,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Brain,
  RotateCcw,
  Layers,
  Bot,
  ChevronRight,
  ChevronDown,
  UserCheck
} from 'lucide-react';

interface PersonalizedPathwayModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile;
  onSelectUnit?: (unitId: string, grade: GradeLevel, module?: string) => void;
  onSwitchUser?: (user: UserProfile) => void;
  onOpenPlacementTest?: () => void;
}

export const PersonalizedPathwayModal: React.FC<PersonalizedPathwayModalProps> = ({
  isOpen,
  onClose,
  activeUser,
  onSelectUnit,
  onSwitchUser,
  onOpenPlacementTest,
}) => {
  const allUsers = getAllUsers();
  const [currentUser, setCurrentUser] = useState<UserProfile>(activeUser);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(activeUser?.grade || 6);
  const [activeTab, setActiveTab] = useState<'roadmap10' | 'diagnostic' | 'phases'>('roadmap10');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Sync state if activeUser changes
  React.useEffect(() => {
    setCurrentUser(activeUser);
    setSelectedGrade(activeUser.grade);
  }, [activeUser]);

  if (!isOpen) return null;

  // 10 core units for the selected grade
  const unitsForGrade: UnitData[] = getUnitsByGrade(selectedGrade).slice(0, 10);

  // User progress metrics for this grade
  const completedUnitIds = currentUser.progress?.completedUnits || [];
  const quizScores = currentUser.progress?.quizScores || {};
  const savedWords = currentUser.progress?.savedNotebookWords || [];

  // Completed count among these 10 units
  const completedCount = unitsForGrade.filter((u) => completedUnitIds.includes(u.id)).length;
  const progressPercent = Math.round((completedCount / Math.max(1, unitsForGrade.length)) * 100);

  // Average quiz score among tested units in these 10 units
  const testedScores = unitsForGrade
    .map((u) => quizScores[u.id])
    .filter((s): s is number => s !== undefined);
  const avgScore =
    testedScores.length > 0
      ? Math.round(testedScores.reduce((a, b) => a + b, 0) / testedScores.length)
      : null;

  // Find next recommended unit
  const nextRecommendedUnit =
    unitsForGrade.find((u) => !completedUnitIds.includes(u.id)) || unitsForGrade[0];

  // Strong units (score >= 80)
  const strongUnits = unitsForGrade.filter((u) => (quizScores[u.id] || 0) >= 80);
  // Units needing review (completed but score < 70 or not tested)
  const reviewNeededUnits = unitsForGrade.filter(
    (u) => completedUnitIds.includes(u.id) && (quizScores[u.id] || 0) < 70
  );

  const handleToggleUnit = (unitId: string) => {
    const updated = toggleUnitCompletion(unitId, undefined, currentUser.id);
    setCurrentUser((prev) => ({
      ...prev,
      progress: updated,
    }));
  };

  const handleSwitchLearner = (u: UserProfile) => {
    setActiveUserId(u.id);
    setCurrentUser(u);
    setSelectedGrade(u.grade);
    if (onSwitchUser) {
      onSwitchUser(u);
    }
  };

  const handleAskAiAdvisor = async () => {
    setIsLoadingAi(true);
    setAiAdvice(null);
    try {
      const prompt = `Bạn là Gia sư Tiếng Anh AI giàu kinh nghiệm đồng hành cùng bé ${currentUser.name}, học sinh Lớp ${selectedGrade}.
Mục tiêu học tập của em: ${currentUser.target === 'chuyen-b2' ? 'Thi Chuyên Anh B2 / Học sinh giỏi' : 'Chuẩn GDPT 2018'}.
Dữ liệu 10 bài học đầu tiên của em:
- Đã hoàn thành: ${completedCount}/10 bài học (${progressPercent}%).
- Điểm kiểm tra trung bình: ${avgScore !== null ? avgScore + '/100' : 'Chưa kiểm tra'}.
- Bài học đề xuất tiếp theo: ${nextRecommendedUnit ? nextRecommendedUnit.title + ' (' + nextRecommendedUnit.themeVi + ')' : 'Đã hoàn thành cả 10 bài'}.
- Bài nắm vững (>=80 điểm): ${strongUnits.map(u => u.title).join(', ') || 'Chưa có'}.

Hãy đưa ra lời khuyên lộ trình cá nhân hóa ngắn gọn, truyền cảm hứng (khoảng 3-4 đoạn):
1. Lời chào ấm áp khen ngợi nỗ lực của ${currentUser.name}.
2. Đánh giá chính xác tiến độ 10 bài học hiện tại (điểm mạnh cần phát huy).
3. Bước đi chiến lược tiếp theo trong tuần này (tập trung vào bài nào, từ vựng hay ngữ pháp nào).
4. Lời chúc và mục tiêu cụ thể để bứt phá.`;

      const res = await fetch('/api/tutor-ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: prompt,
          context: `Tư vấn lộ trình cá nhân hóa 10 bài học cho ${currentUser.name} Lớp ${selectedGrade}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiAdvice(data.answer);
      } else {
        throw new Error('API request failed');
      }
    } catch (e) {
      // Fallback personalized advice
      const targetName =
        currentUser.target === 'chuyen-b2'
          ? 'Chuyên Anh B2 & Học sinh giỏi'
          : 'chuẩn đầu ra GDPT 2018 (9-10 điểm)';
      setAiAdvice(
        `Chào ${currentUser.name}! Thầy/Cô rất tự hào về tinh thần học tập của em. Hiện tại em đã hoàn thành ${completedCount}/10 bài học Lớp ${selectedGrade} (${progressPercent}% lộ trình). ${
          avgScore && avgScore >= 85
            ? `Điểm trung bình ${avgScore}/100 là một thành tích rất đáng nể, chứng tỏ em nắm rất chắc từ vựng và ngữ pháp nền tảng!`
            : `Mỗi ngày dành 15-20 phút sẽ giúp em bứt phá điểm số vượt bậc.`
        }\n\n🎯 **Kế hoạch hành động tuần này cho ${currentUser.name}:**\n- Chinh phục ngay **${nextRecommendedUnit?.title} (${nextRecommendedUnit?.themeVi})**: Tập trung vào cấu trúc ngữ pháp "${nextRecommendedUnit?.grammar?.title}" và lưu 5 từ vựng mới vào sổ tay SuperMemo.\n- Hoàn thành bài Quiz kiểm tra 10 câu để kiểm chứng độ hiểu bài đạt trên 85 điểm.\n\nThầy/Cô tin chắc ${currentUser.name} sẽ đạt mục tiêu ${targetName} một cách xuất sắc!`
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  // 4 Progression Phases corresponding to 10 Lessons
  const phases = [
    {
      phase: 1,
      name: 'Giai đoạn 1: Khởi động & Nền tảng',
      units: unitsForGrade.slice(0, 3),
      timeframe: 'Tuần 1 - 6 (Đầu Học kỳ 1)',
      target: 'Phát âm chuẩn IPA, vốn từ nền tảng 30+ từ, các thì cơ bản',
      color: 'blue',
    },
    {
      phase: 2,
      name: 'Giai đoạn 2: Tăng tốc & Trọng điểm Giữa kỳ',
      units: unitsForGrade.slice(3, 5),
      timeframe: 'Tuần 7 - 12 (Ôn thi Giữa kỳ 1)',
      target: 'Mệnh đề quan hệ, so sánh, câu hỏi phụ, đọc hiểu đoạn văn ngắn',
      color: 'indigo',
    },
    {
      phase: 3,
      name: 'Giai đoạn 3: Mở rộng & Nâng cao Học kỳ 2',
      units: unitsForGrade.slice(5, 8),
      timeframe: 'Tuần 13 - 22 (Đầu Học kỳ 2)',
      target: 'Cấu trúc phức tạp, từ vựng học thuật, viết đoạn văn ngắn',
      color: 'purple',
    },
    {
      phase: 4,
      name: 'Giai đoạn 4: Về đích & Bứt phá Chuyên / Cuối năm',
      units: unitsForGrade.slice(8, 10),
      timeframe: 'Tuần 23 - 32 (Ôn thi Cuối năm & Chuyển cấp)',
      target: 'Tổng ôn toàn diện 10 bài, luyện đề thi chuẩn format Sở GD&ĐT',
      color: 'amber',
    },
  ];

  return (
    <div
      id="personalized-pathway-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
    >
      <div
        id="personalized-pathway-modal-card"
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl border border-white/20 shadow-inner">
                {currentUser.avatar || '🌟'}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
                    <Target className="w-3 h-3" />
                    Lộ trình 10 bài học cá nhân hóa
                  </span>
                  <span className="text-xs text-indigo-100 font-medium">
                    Hồ sơ: <strong>{currentUser.name}</strong>
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black tracking-tight mt-0.5">
                  Lộ Trình Học Cá Nhân Căn Cứ 10 Bài Học Đầu Tiên
                </h2>
                <p className="text-xs text-indigo-100/90 mt-0.5">
                  Tối ưu hóa năng lực theo từng người học • Tiếng Anh Chuẩn Lớp {selectedGrade} GDPT 2018
                </p>
              </div>
            </div>

            {/* Learner Switcher dropdown/pills */}
            {allUsers.length > 1 && (
              <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/20 self-start sm:self-auto">
                <span className="text-[11px] font-semibold text-indigo-200 pl-1.5 hidden md:inline">
                  Đổi bé:
                </span>
                {allUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleSwitchLearner(u)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      currentUser.id === u.id
                        ? 'bg-white text-indigo-900 shadow-xs'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    title={`Xem lộ trình của ${u.name}`}
                  >
                    <span>{u.avatar}</span>
                    <span className="max-w-[70px] truncate">{u.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            id="close-personalized-pathway-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 text-xl font-bold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Control Bar: Grade Selector & Navigation Tabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Grade pills */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Khối lớp:</span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              {([3, 4, 5, 6, 7, 8, 9] as GradeLevel[]).map((g) => (
                <button
                  key={g}
                  id={`pathway-grade-${g}`}
                  onClick={() => setSelectedGrade(g)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedGrade === g
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Lớp {g}
                </button>
              ))}
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('roadmap10')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'roadmap10'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>10 Bài học chi tiết</span>
            </button>
            <button
              onClick={() => setActiveTab('phases')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'phases'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>4 Chặng phát triển</span>
            </button>
            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'diagnostic'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Chẩn đoán & Cố vấn AI</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-slate-50/50">
          {/* Diagnostic Snapshot Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{currentUser.avatar || '🌟'}</span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Báo cáo năng lực 10 bài học của {currentUser.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>
                      Mục tiêu:{' '}
                      <strong className="text-slate-700">
                        {currentUser.target === 'chuyen-b2'
                          ? 'Chuyên Anh B2'
                          : 'Chuẩn GDPT 2018'}
                      </strong>
                    </span>
                    <span>•</span>
                    <span>{currentUser.progress?.xp || 0} XP</span>
                    <span>•</span>
                    <span>🔥 {currentUser.progress?.streakDays || 1} ngày streak</span>
                  </div>
                </div>
              </div>

              {onOpenPlacementTest && (
                <button
                  onClick={onOpenPlacementTest}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors self-start sm:self-auto"
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>Đo lại trình độ (Placement Test)</span>
                </button>
              )}
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-[11px] font-semibold text-blue-700 block">
                  Tiến độ 10 bài
                </span>
                <span className="text-lg font-black text-blue-950">
                  {completedCount} / 10 bài ({progressPercent}%)
                </span>
                <div className="w-full h-1.5 bg-blue-200 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                <span className="text-[11px] font-semibold text-purple-700 block">
                  Điểm Quiz trung bình
                </span>
                <span className="text-lg font-black text-purple-950">
                  {avgScore !== null ? `${avgScore} / 100` : 'Chưa thi quiz'}
                </span>
                <span className="text-[10px] text-purple-700 mt-1 block">
                  {testedScores.length} / 10 bài đã làm bài test
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] font-semibold text-emerald-700 block">
                  Từ vựng SuperMemo
                </span>
                <span className="text-lg font-black text-emerald-950">
                  {savedWords.length} từ đã lưu
                </span>
                <span className="text-[10px] text-emerald-700 mt-1 block">
                  Ôn tập lặp lại ngắt quãng
                </span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[11px] font-semibold text-amber-800 block">
                  Bài học kế tiếp
                </span>
                <span className="text-xs font-bold text-amber-950 truncate block mt-0.5">
                  {nextRecommendedUnit ? `Bài ${nextRecommendedUnit.unitNumber}: ${nextRecommendedUnit.title}` : 'Đã xong 10 bài!'}
                </span>
                <span className="text-[10px] text-amber-700 mt-1 block">
                  Mục tiêu ưu tiên hôm nay
                </span>
              </div>
            </div>
          </div>

          {/* TAB 1: 10 LESSONS DETAILED ROADMAP */}
          {activeTab === 'roadmap10' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Danh sách 10 bài học chuẩn theo người học ({currentUser.name})</span>
                </h4>
                <span className="text-xs text-slate-500">
                  Tích chọn để đánh dấu bài học bé đã nắm chắc
                </span>
              </div>

              <div className="space-y-3">
                {unitsForGrade.map((unit, index) => {
                  const isCompleted = completedUnitIds.includes(unit.id);
                  const score = quizScores[unit.id];
                  const isMastered = score !== undefined && score >= 80;
                  const isWeak = score !== undefined && score < 70;
                  const isNext = nextRecommendedUnit?.id === unit.id;

                  return (
                    <div
                      key={unit.id}
                      id={`pathway-unit-card-${unit.id}`}
                      className={`p-4 rounded-xl border-2 transition-all bg-white flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                        isCompleted
                          ? 'border-emerald-200 bg-emerald-50/20 shadow-2xs'
                          : isNext
                          ? 'border-indigo-400 bg-indigo-50/30 shadow-xs ring-1 ring-indigo-200'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 flex-1">
                        {/* Status Checkbox / Completion Toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleUnit(unit.id)}
                          title={isCompleted ? 'Bỏ đánh dấu hoàn thành' : 'Đánh dấu đã học'}
                          className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                              : 'border-slate-300 hover:border-indigo-500 text-transparent hover:text-slate-300 bg-white'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-black px-2 py-0.5 rounded bg-indigo-100 text-indigo-900">
                              Bài {unit.unitNumber}
                            </span>
                            <h5 className="font-bold text-slate-900 text-sm">
                              {unit.title} • <span className="font-semibold text-slate-600">{unit.themeVi}</span>
                            </h5>
                            {isMastered && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                                🌟 Xuất sắc ({score}đ)
                              </span>
                            )}
                            {isWeak && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                                ⚠️ Cần ôn tập ({score}đ)
                              </span>
                            )}
                            {isNext && !isCompleted && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-600 text-white animate-pulse">
                                🚀 Học tiếp bài này
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-1">
                            <strong>Trọng tâm:</strong> {unit.summaryVi}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap pt-0.5">
                            <span className="font-medium text-slate-700">
                              📘 Ngữ pháp: <strong>{unit.grammar?.title}</strong>
                            </span>
                            <span>•</span>
                            <span>📚 {unit.vocabularies.length} từ vựng</span>
                            <span>•</span>
                            <span>
                              {score !== undefined ? (
                                <strong className="text-indigo-600">Quiz: {score}/100</strong>
                              ) : (
                                'Chưa làm quiz'
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Navigation Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          type="button"
                          onClick={() => {
                            if (onSelectUnit) {
                              onSelectUnit(unit.id, unit.grade, 'vocabulary');
                              onClose();
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors flex items-center gap-1"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Học bài</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (onSelectUnit) {
                              onSelectUnit(unit.id, unit.grade, 'quiz');
                              onClose();
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition-colors flex items-center gap-1"
                        >
                          <Award className="w-3 h-3" />
                          <span>Làm Quiz</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: 4 PHASES STRUCTURE */}
          {activeTab === 'phases' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 space-y-1">
                <div className="font-bold text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>Khung 4 Chặng Phân Rã 10 Bài Học Cả Năm Lớp {selectedGrade}</span>
                </div>
                <p className="text-slate-600">
                  Lộ trình chuẩn phân bổ hợp lý giúp {currentUser.name} tiếp thu tự nhiên, ôn luyện đều đặn và tự tin đạt điểm 9-10 hoặc đỗ Chuyên Anh.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phases.map((p) => {
                  const phaseCompleted = p.units.filter((u) => completedUnitIds.includes(u.id)).length;
                  const isPhaseDone = phaseCompleted === p.units.length && p.units.length > 0;

                  return (
                    <div
                      key={p.phase}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 relative hover:border-indigo-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                            {p.phase}
                          </span>
                          <div>
                            <h5 className="font-bold text-slate-900 text-sm">{p.name}</h5>
                            <span className="text-[11px] text-slate-500">{p.timeframe}</span>
                          </div>
                        </div>

                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            isPhaseDone
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {phaseCompleted}/{p.units.length} bài xong
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <div className="font-semibold text-slate-800">Mục tiêu chuẩn đầu ra:</div>
                        <p>{p.target}</p>
                      </div>

                      <div className="space-y-1 pt-1 text-xs">
                        <span className="font-bold text-slate-700 block">Các bài học thuộc chặng này:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {p.units.map((u) => {
                            const isDone = completedUnitIds.includes(u.id);
                            return (
                              <span
                                key={u.id}
                                className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 border ${
                                  isDone
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : 'bg-white text-slate-700 border-slate-200'
                                }`}
                              >
                                {isDone && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />}
                                Bài {u.unitNumber}: {u.title}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: DIAGNOSTIC & AI ADVICE */}
          {activeTab === 'diagnostic' && (
            <div className="space-y-5">
              {/* Pedagogical Strengths & Weaknesses Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Điểm mạnh & Bài học thành thạo</span>
                  </div>
                  {strongUnits.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-emerald-800">
                      {strongUnits.map((u) => (
                        <li key={u.id} className="flex items-center justify-between">
                          <span>
                            • Bài {u.unitNumber}: <strong>{u.title}</strong> ({u.grammar?.title})
                          </span>
                          <span className="font-bold px-1.5 py-0.2 bg-emerald-100 rounded text-emerald-900">
                            {quizScores[u.id]}đ
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-emerald-700/80">
                      Bé chưa có bài đạt trên 80 điểm. Hãy làm Quiz các bài đã học để hệ thống ghi nhận năng lực nhé!
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Bài học cần củng cố & Ôn luyện</span>
                  </div>
                  {reviewNeededUnits.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-amber-900">
                      {reviewNeededUnits.map((u) => (
                        <li key={u.id} className="flex items-center justify-between">
                          <span>
                            • Bài {u.unitNumber}: <strong>{u.title}</strong>
                          </span>
                          <span className="font-bold px-1.5 py-0.2 bg-amber-100 rounded text-amber-900">
                            {quizScores[u.id]}đ (Cần thi lại)
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-amber-800/80">
                      Hiện tại bé không có bài nào bị điểm thấp. Tiếp tục duy trì phong độ nhé!
                    </p>
                  )}
                </div>
              </div>

              {/* AI Tutor Advice Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-indigo-200 shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-xs">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-950 text-sm">
                        Gia Sư AI Cố Vấn Lộ Trình Cho Bé {currentUser.name}
                      </h4>
                      <p className="text-xs text-indigo-700">
                        Phân tích thông minh dựa trên kết quả thực tế của 10 bài học Lớp {selectedGrade}
                      </p>
                    </div>
                  </div>

                  <button
                    id="btn-ask-ai-pathway-advisor"
                    type="button"
                    disabled={isLoadingAi}
                    onClick={handleAskAiAdvisor}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isLoadingAi ? 'Đang phân tích...' : 'Xin lời khuyên AI'}</span>
                  </button>
                </div>

                {aiAdvice ? (
                  <div className="p-4 rounded-xl bg-white/90 border border-indigo-100 text-xs text-slate-700 leading-relaxed space-y-2 whitespace-pre-line animate-fadeIn shadow-2xs">
                    {aiAdvice}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-white/60 border border-dashed border-indigo-200 text-xs text-indigo-800/80 text-center">
                    Bấm <strong>"Xin lời khuyên AI"</strong> để Thầy/Cô AI đồng hành phân tích cụ thể kế hoạch học tập 10 bài cho {currentUser.name} trong tuần này!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium">
            Lộ trình tự động đồng bộ điểm số và tiến trình theo thời gian thực cho từng người học.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Đóng lại
            </button>
            {nextRecommendedUnit && onSelectUnit && (
              <button
                id="btn-go-next-recommended-unit"
                onClick={() => {
                  onSelectUnit(nextRecommendedUnit.id, nextRecommendedUnit.grade, 'vocabulary');
                  onClose();
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Học bài tiếp theo: Bài {nextRecommendedUnit.unitNumber}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

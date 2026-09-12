import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  Target,
  BookOpen,
  Volume2,
  Mic,
  MicOff,
  CheckCircle2,
  AlertCircle,
  Award,
  RotateCcw,
  Layers,
  ChevronRight,
  Flame,
  ArrowRight,
  Lightbulb,
  Check,
  RefreshCw,
  Lock,
  Unlock,
  Star,
  Play,
  Pause,
  HelpCircle,
  Send,
  MessageSquare,
  History,
  PartyPopper,
  GraduationCap,
  Trash2,
} from 'lucide-react';
import { GradeLevel, DailySkillType, DailyLearningMission, DailyExerciseItem, CompletedTutorLessonRecord } from '../types';
import { WEEKLY_SKILL_SCHEDULE, YEARLY_ROADMAP_BY_GRADE, getDailyMissionForDate } from '../data/yearlyRoadmapData';
import {
  getCompletedTutorLessons,
  saveCompletedTutorLesson,
  deleteCompletedTutorLesson,
  clearAllCompletedTutorLessons,
  getLearnedVocabularyPool,
  recordStudyMinutes,
  addXP,
  recordCorrectAnswer,
} from '../utils/storageUtils';

interface DailyMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade: GradeLevel;
  onSelectGrade?: (grade: GradeLevel) => void;
  onOpenVocabularyKnowledge?: () => void;
}

export const DailyMissionModal: React.FC<DailyMissionModalProps> = ({
  isOpen,
  onClose,
  currentGrade,
  onSelectGrade,
  onOpenVocabularyKnowledge,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(currentGrade);
  const [selectedSkill, setSelectedSkill] = useState<DailySkillType>('vocabulary');
  const [activeTab, setActiveTab] = useState<'mission' | 'roadmap' | 'history'>('mission');
  const [mission, setMission] = useState<DailyLearningMission | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [customTopic, setCustomTopic] = useState('');

  // 30-Minute Study Timer State
  const TOTAL_SESSION_SECONDS = 30 * 60; // 30 minutes = 1800s
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Exercise and Challenge interaction state
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [streakCount, setStreakCount] = useState(5);

  // AI Tutor Ask Assistant State
  const [showTutorChat, setShowTutorChat] = useState(false);
  const [tutorQuestion, setTutorQuestion] = useState('');
  const [tutorAnswer, setTutorAnswer] = useState<string | null>(null);
  const [isAskingTutor, setIsAskingTutor] = useState(false);

  // Completed history state
  const [completedHistory, setCompletedHistory] = useState<CompletedTutorLessonRecord[]>([]);
  // History delete confirmation modal state
  const [historyDeleteTarget, setHistoryDeleteTarget] = useState<{ id?: string; title: string; isAll?: boolean } | null>(null);
  // Feedback toast message
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3500);
  };

  // Speech synthesis & recognition
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');

  // Today's date info
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sun, 1 = Mon, ...
  const dateStr = today.toISOString().split('T')[0];

  // Set default grade on mount
  useEffect(() => {
    setSelectedGrade(currentGrade);
  }, [currentGrade]);

  // Set default skill on mount
  useEffect(() => {
    const scheduled = WEEKLY_SKILL_SCHEDULE.find(s => s.dayNumber === dayOfWeek);
    if (scheduled) {
      setSelectedSkill(scheduled.skill);
    }
  }, [dayOfWeek]);

  // Load history when opening
  useEffect(() => {
    if (isOpen) {
      setCompletedHistory(getCompletedTutorLessons());
    }
  }, [isOpen]);

  // Load mission when grade or skill changes
  useEffect(() => {
    if (!isOpen) return;
    const initialMission = getDailyMissionForDate(selectedGrade, dateStr, selectedSkill);
    setMission(initialMission);
    setUserAnswers({});
    setExerciseResults({});
    setIsSubmitted(false);
    setSecondsElapsed(0);
    setIsTimerRunning(true);
  }, [isOpen, selectedGrade, selectedSkill, dateStr]);

  // 30-Minute Timer tick
  useEffect(() => {
    if (!isOpen || !isTimerRunning) return;
    const interval = setInterval(() => {
      setSecondsElapsed(prev => {
        if (prev >= TOTAL_SESSION_SECONDS) {
          return TOTAL_SESSION_SECONDS;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isTimerRunning]);

  if (!isOpen) return null;

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  // Text to speech helper
  const playAudio = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  // Vietnamese TTS for tutor advice
  const playTutorVoice = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Speech recognition helper
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech API.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      setSpokenText('');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  // Handle answering an exercise
  const handleSelectOption = (exerciseId: string, answer: any, correctAnswer: any) => {
    const isCorrect = typeof correctAnswer === 'number'
      ? answer === correctAnswer
      : String(answer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase();

    setUserAnswers(prev => ({ ...prev, [exerciseId]: answer }));
    setExerciseResults(prev => ({ ...prev, [exerciseId]: isCorrect }));

    if (isCorrect) {
      recordCorrectAnswer(1);
    }
  };

  // All exercises + mini quiz challenge
  const exercises = mission?.exercises || [];
  const miniChallenge = mission?.miniQuizChallenge || [];
  const allQuestions: DailyExerciseItem[] = [...exercises, ...miniChallenge];

  const totalQuestions = allQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.values(exerciseResults).filter(Boolean).length;
  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isMastered = scorePercentage >= 70; // 70% Completion Threshold Rule!

  // Star calculation
  const calculateStars = (pct: number) => {
    if (pct >= 90) return 3;
    if (pct >= 80) return 2;
    if (pct >= 70) return 1;
    return 0;
  };
  const starsEarned = calculateStars(scorePercentage);

  // Handle submitting the 30-minute lesson
  const handleSubmitLesson = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);

    if (mission) {
      const learnedWordsList = mission.warmupVocab?.map((v) => v.word).filter(Boolean) || [];
      const record: CompletedTutorLessonRecord = {
        lessonId: mission.id,
        title: mission.title,
        date: dateStr,
        grade: selectedGrade,
        skill: selectedSkill,
        scorePercentage,
        stars: starsEarned,
        timeSpentMinutes: Math.max(15, Math.round(secondsElapsed / 60)),
        isPassed: isMastered,
        learnedWords: learnedWordsList,
        missionData: mission,
      };

      saveCompletedTutorLesson(record);
      setCompletedHistory(getCompletedTutorLessons());

      if (isMastered) {
        setStreakCount((prev) => prev + 1);
        addXP(100);
      }
    }
  };

  // Retry only the incorrect questions to reach >= 70%
  const handleRetryMistakes = () => {
    const newUserAnswers = { ...userAnswers };
    const newExerciseResults = { ...exerciseResults };

    allQuestions.forEach((q) => {
      if (exerciseResults[q.id] === false) {
        delete newUserAnswers[q.id];
        delete newExerciseResults[q.id];
      }
    });

    setUserAnswers(newUserAnswers);
    setExerciseResults(newExerciseResults);
    setIsSubmitted(false);
    setIsTimerRunning(true);
  };

  // Reset entire lesson to retake all
  const handleRetakeAll = () => {
    setUserAnswers({});
    setExerciseResults({});
    setIsSubmitted(false);
    setIsTimerRunning(true);
  };

  // Re-study a mission from history
  const handleReStudyHistoryMission = (item: CompletedTutorLessonRecord) => {
    if (item.missionData) {
      setMission(item.missionData);
      setSelectedGrade(item.grade);
      setSelectedSkill(item.skill);
      setUserAnswers({});
      setExerciseResults({});
      setIsSubmitted(false);
      setSecondsElapsed(0);
      setIsTimerRunning(true);
      setActiveTab('mission');
      showToast(`Đang mở lại bài học "${item.title}" để bé ôn tập!`);
    } else {
      setSelectedGrade(item.grade);
      setSelectedSkill(item.skill);
      setActiveTab('mission');
      showToast(`Đang chuyển sang khối lớp ${item.grade} - ${item.skill} để học lại!`);
    }
  };

  // Confirm and execute delete history
  const handleExecuteDeleteHistory = () => {
    if (!historyDeleteTarget) return;

    if (historyDeleteTarget.isAll) {
      clearAllCompletedTutorLessons();
      setCompletedHistory([]);
      showToast('Đã dọn dẹp sạch toàn bộ nhật ký học tập.');
    } else if (historyDeleteTarget.id) {
      deleteCompletedTutorLesson(historyDeleteTarget.id);
      setCompletedHistory(getCompletedTutorLessons());
      showToast(`Đã xóa bài học "${historyDeleteTarget.title}" khỏi nhật ký.`);
    }

    setHistoryDeleteTarget(null);
  };

  // Request Gemini to generate a fresh dynamic 30-minute mission with anti-repetition
  const handleGenerateAiMission = async (isNewLessonAfterMastery = false) => {
    setIsLoadingAi(true);
    try {
      const excludeWords = getLearnedVocabularyPool();
      const res = await fetch('/api/ai/daily-mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: selectedGrade,
          skill: selectedSkill,
          topic: customTopic.trim() || undefined,
          studentName: 'bé',
          date: dateStr,
          excludeWords,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMission(data);
        setUserAnswers({});
        setExerciseResults({});
        setIsSubmitted(false);
        setSecondsElapsed(0);
        setIsTimerRunning(true);
        setActiveTab('mission');
        if (isNewLessonAfterMastery) {
          showToast(`✨ Đã mở khóa bài mới! Gia sư AI đã lọc bỏ ${excludeWords.length} từ cũ để dạy từ mới cho bé.`);
        }
      }
    } catch (err) {
      console.error('Failed to generate 30-minute tutor mission:', err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Ask Tutor Question
  const handleAskTutor = async () => {
    if (!tutorQuestion.trim()) return;
    setIsAskingTutor(true);
    setTutorAnswer(null);

    try {
      const res = await fetch('/api/ai/tutor-ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: tutorQuestion,
          lessonContext: `Buổi học 30 phút: ${mission?.title}. Kỹ năng: ${mission?.skill}. Lớp: ${selectedGrade}`,
          studentName: "bé yêu",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setTutorAnswer(data.answer);
      } else {
        setTutorAnswer("Cô luôn ở đây lắng nghe bé! Con hãy đọc lại thật kỹ phần quy tắc hoặc mẹo thần chú trong bài nhé!");
      }
    } catch {
      setTutorAnswer("Cô luôn ở đây lắng nghe bé! Con hãy đọc lại thật kỹ phần quy tắc hoặc mẹo thần chú trong bài nhé!");
    } finally {
      setIsAskingTutor(false);
    }
  };

  const currentRoadmap = YEARLY_ROADMAP_BY_GRADE[selectedGrade] || YEARLY_ROADMAP_BY_GRADE[6];
  const tutorInfo = mission?.tutorPersona || {
    name: selectedGrade <= 5 ? "Cô Mai Anh AI" : "Thầy Alex AI",
    avatar: selectedGrade <= 5 ? "👩‍🏫" : "🦉",
    greetingMessage: `Chào bé yêu! Thầy/Cô rất vui được đồng hành cùng con trong buổi học 30 phút hôm nay!`,
    encouragementNote: "Mỗi từ mới con phát âm chuẩn, mỗi câu con làm đúng là một bước tiến lớn!",
  };

  const isAllAnswered = allQuestions.length > 0 && answeredCount >= allQuestions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[94vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative">
        {/* Toast notification */}
        {toastMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900/90 backdrop-blur-md text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-2 border border-slate-700 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
        )}
        
        {/* MODAL TOP HEADER */}
        <div className="p-3 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md text-2xl shrink-0">
              {tutorInfo.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>Gia Sư Tiếng Anh AI — Buổi Học 30 Phút Cho Bé</span>
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                  Streak: {streakCount} ngày
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                  <Clock className="w-3 h-3 text-indigo-600" />
                  Khung giờ: 30 phút chuẩn
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Gia sư: <strong>{tutorInfo.name}</strong> • Lộ trình bám sát GDPT 2018 • Mở bài mới khi đạt từ 70% trở lên
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Grade Selector */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 text-xs font-semibold shadow-2xs">
              <span className="px-2 text-slate-400">Lớp</span>
              {([3, 4, 5, 6, 7, 8, 9] as GradeLevel[]).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setSelectedGrade(g);
                    if (onSelectGrade) onSelectGrade(g);
                  }}
                  className={`w-7 h-7 rounded-md flex items-center justify-center font-bold transition-all ${
                    selectedGrade === g
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white/80 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 30-MINUTE SESSION PROGRESS & TIMER BAR */}
        <div className="px-4 sm:px-6 py-2 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white flex flex-wrap items-center justify-between gap-3 border-b border-indigo-900 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono font-bold text-sm text-amber-300 bg-black/40 px-3 py-1 rounded-lg border border-white/10">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{formatTime(secondsElapsed)} / 30:00</span>
            </div>

            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-1 transition-all"
              title={isTimerRunning ? 'Tạm dừng đồng hồ' : 'Tiếp tục học'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isTimerRunning ? 'Tạm dừng' : 'Tiếp tục'}</span>
            </button>

            <span className="hidden md:inline-block text-slate-300 text-[11px]">
              🎯 5 chặng học tập: Khởi động ➔ Câu chuyện ➔ Quy tắc ➔ Luyện tập ➔ Thử thách 30 phút
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-32 sm:w-44 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${Math.min(100, (secondsElapsed / TOTAL_SESSION_SECONDS) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-emerald-300">
              {Math.min(100, Math.round((secondsElapsed / TOTAL_SESSION_SECONDS) * 100))}% thời gian
            </span>
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="px-4 sm:px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'mission'
                  ? 'bg-white text-indigo-700 shadow-2xs border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Buổi Học 30 Phút Cùng Gia Sư AI</span>
              {isSubmitted && isMastered && (
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'roadmap'
                  ? 'bg-white text-indigo-700 shadow-2xs border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lộ Trình Cả Năm Lớp {selectedGrade}</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-white text-indigo-700 shadow-2xs border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Nhật Ký Đã Học ({completedHistory.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTutorChat(!showTutorChat)}
              className="px-2.5 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold flex items-center gap-1 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Hỏi Gia Sư AI</span>
            </button>

            {onOpenVocabularyKnowledge && (
              <button
                onClick={() => {
                  onClose();
                  onOpenVocabularyKnowledge();
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kho Từ Vựng</span>
              </button>
            )}
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-6">
          
          {/* TAB: HISTORY LOG */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-sm font-bold text-purple-950 flex items-center gap-2">
                    <History className="w-4 h-4 text-purple-600" />
                    <span>Nhật Ký Các Buổi Học 30 Phút Cùng Gia Sư AI</span>
                  </h4>
                  <p className="text-xs text-slate-600">
                    Bé có thể mở ra <strong>học lại bất kỳ bài nào</strong> hoặc xóa bớt bài nếu muốn.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 bg-purple-200 text-purple-900 rounded-full">
                    Tổng: {completedHistory.length} bài
                  </span>
                  {completedHistory.length > 0 && (
                    <button
                      onClick={() =>
                        setHistoryDeleteTarget({
                          isAll: true,
                          title: 'toàn bộ nhật ký các bài học 30 phút',
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="Xóa toàn bộ nhật ký"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Dọn dẹp</span>
                    </button>
                  )}
                </div>
              </div>

              {completedHistory.length === 0 ? (
                <div className="p-8 text-center text-slate-400 space-y-2 border border-dashed border-slate-200 rounded-xl">
                  <p className="text-xs">Bé chưa hoàn thành bài học nào. Hãy bắt đầu buổi học 30 phút hôm nay nhé!</p>
                  <button
                    onClick={() => setActiveTab('mission')}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold text-xs"
                  >
                    Bắt đầu học ngay
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {completedHistory.map((item, idx) => (
                    <div
                      key={item.lessonId || idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 shadow-2xs space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase">
                              Lớp {item.grade} • {item.skill}
                            </span>
                            {item.learnedWords && item.learnedWords.length > 0 && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                                {item.learnedWords.length} từ đã học
                              </span>
                            )}
                          </div>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                            {item.title}
                          </h5>
                          <span className="text-[11px] text-slate-500">{item.date} • {item.timeSpentMinutes} phút</span>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            item.isPassed
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {item.scorePercentage}%
                          </span>
                          <div className="flex justify-end gap-0.5 mt-1 text-amber-500 text-xs">
                            {Array.from({ length: item.stars || 0 }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className={item.isPassed ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                          {item.isPassed ? '✓ Đạt ≥ 70% (Đã mở khóa)' : '⚠️ Cần ôn lại'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleReStudyHistoryMission(item)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold transition-colors flex items-center gap-1"
                            title="Mở lại bài này để làm bài tập và học lại"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Học lại</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setHistoryDeleteTarget({
                                id: item.lessonId,
                                title: item.title,
                              });
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Xóa bài này khỏi nhật ký"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: YEARLY ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>Lộ Trình Nâng Cao Năng Lực Cả Năm — Tiếng Anh Lớp {selectedGrade}</span>
                  </h4>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                    Chuẩn GDPT 2018
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Lộ trình 4 giai đoạn logic xuyên suốt năm học giúp bé từng bước tiến bộ từ cơ bản đến chuẩn đầu ra CEFR.
                </p>
              </div>

              {/* 4 Phases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentRoadmap.map((phase, idx) => (
                  <div
                    key={phase.phaseId}
                    className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 relative hover:border-indigo-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <h5 className="text-sm font-bold text-slate-900">{phase.nameVi}</h5>
                          <span className="text-[11px] text-slate-500">{phase.timeframe}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        {phase.targetCefr}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {phase.descriptionVi}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span><strong>SGK liên quan:</strong> {phase.coreUnits}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span><strong>Cột mốc đánh giá:</strong> {phase.milestoneTest}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: 30-MINUTE AI TUTOR LESSON */}
          {activeTab === 'mission' && (
            <div className="space-y-6">

              {/* TUTOR WELCOME & SPEECH BUBBLE */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-indigo-50 to-purple-50 border border-indigo-200/80 shadow-xs relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-indigo-200 shadow-md flex items-center justify-center text-4xl shrink-0">
                    {tutorInfo.avatar}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-indigo-950">{tutorInfo.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-indigo-200/70 text-indigo-900 font-bold text-[10px]">
                          Gia sư đồng hành
                        </span>
                      </div>

                      <button
                        onClick={() => playTutorVoice(tutorInfo.greetingMessage)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1 border border-indigo-200 transition-all shadow-2xs"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe cô dặn 🔊</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-white/80 p-2.5 rounded-xl border border-indigo-100">
                      "{tutorInfo.greetingMessage}"
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-medium pt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{tutorInfo.encouragementNote}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TUTOR QUICK ASK ACCORDION / DRAWER */}
              {showTutorChat && (
                <div className="p-4 rounded-2xl bg-white border-2 border-purple-300 shadow-lg space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-purple-600" />
                      <span>Bé thắc mắc bài học? Hỏi Thầy/Cô AI giải đáp ngay nhé!</span>
                    </span>
                    <button
                      onClick={() => setShowTutorChat(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tutorQuestion}
                      onChange={(e) => setTutorQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAskTutor()}
                      placeholder="Ví dụ: 'Cô ơi, khi nào dùng These are còn khi nào dùng Those are?'"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                    />
                    <button
                      onClick={handleAskTutor}
                      disabled={isAskingTutor || !tutorQuestion.trim()}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 shrink-0"
                    >
                      {isAskingTutor ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      <span>Hỏi cô</span>
                    </button>
                  </div>

                  {tutorAnswer && (
                    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 space-y-1">
                      <div className="font-bold flex items-center gap-1 text-purple-900">
                        <span>👩‍🏫 Lời giải đáp của Gia sư AI:</span>
                      </div>
                      <p className="whitespace-pre-line leading-relaxed">{tutorAnswer}</p>
                    </div>
                  )}
                </div>
              )}

              {/* WEEKLY CADENCE SELECTOR BAR */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold">Chọn kỹ năng trọng tâm của buổi học hôm nay (1 Kỹ năng chuyên sâu):</span>
                  <span className="text-[11px] text-indigo-600 font-medium">Hôm nay: {WEEKLY_SKILL_SCHEDULE.find(s => s.dayNumber === dayOfWeek)?.dayNameVi}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {WEEKLY_SKILL_SCHEDULE.filter(s => s.dayNumber !== 0).map((s) => {
                    const isSelected = selectedSkill === s.skill;
                    const isToday = s.dayNumber === dayOfWeek;
                    return (
                      <button
                        key={s.skill}
                        onClick={() => setSelectedSkill(s.skill)}
                        className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-400 shadow-xs ring-2 ring-indigo-200'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        {isToday && (
                          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600"></span>
                        )}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <span>{s.icon}</span>
                          <span>{s.skill.toUpperCase()}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                          {s.dayNameVi}: {s.titleVi.split('&')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DYNAMIC AI GENERATOR TOOLBAR */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 rounded-xl bg-indigo-50/70 border border-indigo-200">
                <div className="flex-1 flex items-center gap-2 bg-white rounded-lg border border-indigo-200 px-3 py-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder={`Nhập chủ đề bé yêu thích (ví dụ: Vũ trụ kỳ thú, Chú chó cưng, Đi siêu thị...)`}
                    className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden bg-transparent"
                  />
                  {customTopic && (
                    <button onClick={() => setCustomTopic('')} className="text-slate-400 hover:text-slate-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={handleGenerateAiMission}
                  disabled={isLoadingAi}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all shrink-0"
                >
                  {isLoadingAi ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Gia sư AI đang soạn bài 30 phút...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Soạn bài học mới (Gemini AI)</span>
                    </>
                  )}
                </button>
              </div>

              {mission ? (
                <div className="space-y-6">

                  {/* MISSION BANNER */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wide">
                          {mission.skill}
                        </span>
                        <span className="text-xs text-slate-600 flex items-center gap-1 font-bold">
                          <Clock className="w-3.5 h-3.5 text-indigo-600" /> Buổi học 30 phút
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {mission.date}
                        </span>
                      </div>

                      {isSubmitted ? (
                        <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                          isMastered
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}>
                          {isMastered ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Đạt {scorePercentage}% — ĐÃ MỞ KHÓA BÀI TIẾP THEO!</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4 text-amber-600" />
                              <span>Đạt {scorePercentage}% (Cần ≥ 70% để mở bài mới)</span>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 font-medium">
                          Đã làm: <strong className="text-indigo-600">{answeredCount}/{totalQuestions}</strong> câu hỏi
                        </div>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {mission.title}
                    </h3>

                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-xs text-blue-900">
                      <Target className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Mục tiêu buổi học 30 phút:</strong> {mission.learningObjective}
                      </div>
                    </div>
                  </div>

                  {/* STAGE 1: WARM-UP & VOCABULARY DISCOVERY */}
                  {mission.warmupVocab && mission.warmupVocab.length > 0 && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold flex items-center justify-center">
                            1
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">
                            Chặng 1: Khởi động & Khám phá Từ vựng (~5 phút)
                          </h4>
                        </div>
                        <span className="text-xs text-slate-500">Bé nghe và lặp lại theo cô nhé</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {mission.warmupVocab.map((w, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-gradient-to-br from-amber-50/50 to-orange-50/30 border border-amber-200/80 space-y-2 hover:border-amber-400 transition-all text-xs"
                          >
                            <div className="flex items-start justify-between gap-1">
                              <div>
                                <span className="text-xl block">{w.emoji || '🌟'}</span>
                                <span className="font-extrabold text-sm text-slate-900 block mt-1">{w.word}</span>
                                <span className="text-[11px] text-amber-700 font-mono">{w.ipa}</span>
                              </div>
                              <button
                                onClick={() => playAudio(w.audioText || w.word)}
                                className="p-1.5 rounded-lg bg-white text-amber-700 hover:bg-amber-100 shadow-2xs border border-amber-200 transition-all"
                                title="Nghe phát âm"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>

                            <p className="text-xs text-slate-700 font-medium">
                              <strong>Nghĩa:</strong> {w.meaningVi}
                            </p>

                            <div className="p-2 rounded-lg bg-white/90 border border-amber-100 space-y-0.5 text-[11px]">
                              <p className="text-slate-900 font-semibold">{w.exampleEn}</p>
                              <p className="text-slate-500 italic">{w.exampleVi}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STAGE 2: INTERACTIVE STORY OR DIALOGUE */}
                  {mission.storyOrDialogue && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold flex items-center justify-center">
                            2
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">
                            Chặng 2: Hoạt cảnh & Câu chuyện đàm thoại (~7 phút)
                          </h4>
                        </div>
                        <button
                          onClick={() => {
                            const fullText = mission.storyOrDialogue?.lines.map(l => `${l.speaker} says: ${l.en}`).join('. ');
                            if (fullText) playAudio(fullText);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1 border border-blue-200"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe toàn bộ hội thoại</span>
                        </button>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200 text-xs text-blue-950 space-y-1">
                        <strong className="block text-blue-900">{mission.storyOrDialogue.title}</strong>
                        <p className="text-slate-600">{mission.storyOrDialogue.scenarioVi}</p>
                      </div>

                      <div className="space-y-2 pt-1">
                        {mission.storyOrDialogue.lines.map((line, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex items-start gap-3 text-xs"
                          >
                            <span className="text-2xl shrink-0">{line.avatar || '👧'}</span>
                            <div className="flex-1 space-y-0.5">
                              <div className="flex items-center justify-between">
                                <strong className="text-slate-900 text-xs">{line.speaker}:</strong>
                                <button
                                  onClick={() => playAudio(line.audioText || line.en)}
                                  className="p-1 rounded text-blue-600 hover:bg-blue-100"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="text-sm font-semibold text-slate-900">{line.en}</p>
                              <p className="text-slate-500 italic text-[11px]">{line.vi}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STAGE 3: THEORY & MEMORY TIPS */}
                  {mission.theoryContent && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold flex items-center justify-center">
                          3
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          Chặng 3: Bí kíp ngữ pháp & Mẹo nhớ thần chú (~5 phút)
                        </h4>
                      </div>

                      <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-200 text-xs space-y-2">
                        <div className="font-extrabold text-indigo-950 text-sm">
                          📌 {mission.theoryContent.keyConcept}
                        </div>
                        <ul className="space-y-1 text-slate-700 list-disc list-inside">
                          {mission.theoryContent.rulesOrTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Bilingual Examples */}
                      {mission.theoryContent.examples && mission.theoryContent.examples.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-700 block">Ví dụ chuẩn mẫu:</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {mission.theoryContent.examples.map((ex, i) => (
                              <div
                                key={i}
                                className="p-2.5 rounded-lg bg-indigo-50/30 border border-indigo-100 text-xs space-y-0.5"
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-bold text-slate-900">{ex.en}</span>
                                  <button
                                    onClick={() => playAudio(ex.en)}
                                    className="p-1 rounded text-indigo-600 hover:bg-indigo-100"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <span className="text-slate-500 block italic text-[11px]">{ex.vi}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STAGE 4: GUIDED PRACTICE EXERCISES */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center justify-center">
                          4
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          Chặng 4: Luyện tập kỹ năng đa dạng ({exercises.length} câu • ~8 phút)
                        </h4>
                      </div>
                      <span className="text-xs text-slate-500">
                        Đúng: <strong className="text-emerald-600">{exercises.filter(e => exerciseResults[e.id]).length}</strong> / {exercises.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {exercises.map((ex, idx) => {
                        const isAnswered = userAnswers[ex.id] !== undefined;
                        const isCorrect = exerciseResults[ex.id];

                        return (
                          <div
                            key={ex.id}
                            className={`p-3.5 sm:p-4 rounded-xl border transition-all space-y-3 ${
                              isAnswered
                                ? isCorrect
                                  ? 'bg-emerald-50/40 border-emerald-300'
                                  : 'bg-rose-50/40 border-rose-300'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <span className="text-xs font-bold text-indigo-700 uppercase">
                                  {ex.type.replace('-', ' ')}
                                </span>
                              </div>

                              {ex.audioText && (
                                <button
                                  onClick={() => playAudio(ex.audioText || '')}
                                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>Nghe âm thanh</span>
                                </button>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed">
                              {ex.prompt}
                            </p>

                            {/* Multiple choice or Fill in blank */}
                            {ex.options && ex.options.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {ex.options.map((opt, optIdx) => {
                                  const isSelected = userAnswers[ex.id] === optIdx || userAnswers[ex.id] === opt;
                                  const isCorrectOpt = ex.correctAnswer === optIdx || ex.correctAnswer === opt;

                                  let optClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                                  if (isAnswered) {
                                    if (isCorrectOpt) {
                                      optClass = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                                    } else if (isSelected && !isCorrect) {
                                      optClass = 'bg-rose-100 border-rose-400 text-rose-900';
                                    } else {
                                      optClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                                    }
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      disabled={isAnswered}
                                      onClick={() => handleSelectOption(ex.id, typeof ex.correctAnswer === 'number' ? optIdx : opt, ex.correctAnswer)}
                                      className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${optClass}`}
                                    >
                                      <span>{opt}</span>
                                      {isAnswered && isCorrectOpt && (
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {/* Speaking pronunciation specialized section */}
                            {ex.type === 'speaking-pronunciation' && (
                              <div className="p-3 rounded-lg bg-purple-50/70 border border-purple-200 space-y-2 text-xs">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-purple-900">Thực hành nói & Nhận diện giọng nói:</span>
                                  <button
                                    onClick={toggleSpeechRecognition}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                                      isRecording
                                        ? 'bg-rose-600 text-white animate-pulse'
                                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                                    }`}
                                  >
                                    {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                                    <span>{isRecording ? 'Đang lắng nghe...' : 'Bấm để đọc câu'}</span>
                                  </button>
                                </div>

                                {spokenText && (
                                  <div className="p-2 rounded bg-white border border-purple-200 text-slate-700">
                                    <span>Bé đã đọc: </span>
                                    <strong className="text-purple-800">"{spokenText}"</strong>
                                  </div>
                                )}

                                {!isAnswered && (
                                  <button
                                    onClick={() => handleSelectOption(ex.id, ex.correctAnswer, ex.correctAnswer)}
                                    className="px-3 py-1 rounded bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-[11px]"
                                  >
                                    Xác nhận đã luyện đọc thành công ✓
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Explanation and Exam notes */}
                            {isAnswered && (
                              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                                <div className="flex items-start gap-1.5 text-slate-700">
                                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                  <div>
                                    <strong>Giải thích của Gia sư:</strong> {ex.explanationVi}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* STAGE 5: 30-MINUTE MINI QUIZ CHALLENGE */}
                  {miniChallenge.length > 0 && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border-2 border-indigo-200 shadow-2xs space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center">
                            5
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            <span>Chặng 5: Thử Thách 30 Phút & Đánh Giá Tốt Nghiệp ({miniChallenge.length} câu • ~5 phút)</span>
                          </h4>
                        </div>
                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                          Mục tiêu ≥ 70% mở bài mới
                        </span>
                      </div>

                      <div className="space-y-3">
                        {miniChallenge.map((quiz, qIdx) => {
                          const isAnswered = userAnswers[quiz.id] !== undefined;
                          const isCorrect = exerciseResults[quiz.id];

                          return (
                            <div
                              key={quiz.id}
                              className={`p-3.5 rounded-xl border transition-all space-y-2.5 ${
                                isAnswered
                                  ? isCorrect
                                    ? 'bg-emerald-50/60 border-emerald-300'
                                    : 'bg-rose-50/60 border-rose-300'
                                  : 'bg-white border-indigo-100 hover:border-indigo-300'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center">
                                  {qIdx + 1}
                                </span>
                                <span className="text-xs font-semibold text-slate-900">
                                  {quiz.prompt}
                                </span>
                              </div>

                              {quiz.options && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {quiz.options.map((opt, optIdx) => {
                                    const isSelected = userAnswers[quiz.id] === optIdx || userAnswers[quiz.id] === opt;
                                    const isCorrectOpt = quiz.correctAnswer === optIdx || quiz.correctAnswer === opt;

                                    let optClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                                    if (isAnswered) {
                                      if (isCorrectOpt) {
                                        optClass = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                                      } else if (isSelected && !isCorrect) {
                                        optClass = 'bg-rose-100 border-rose-400 text-rose-900';
                                      } else {
                                        optClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                                      }
                                    }

                                    return (
                                      <button
                                        key={optIdx}
                                        disabled={isAnswered}
                                        onClick={() => handleSelectOption(quiz.id, typeof quiz.correctAnswer === 'number' ? optIdx : opt, quiz.correctAnswer)}
                                        className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${optClass}`}
                                      >
                                        <span>{opt}</span>
                                        {isAnswered && isCorrectOpt && (
                                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}

                              {isAnswered && (
                                <div className="text-[11px] text-slate-600 bg-white/70 p-2 rounded border border-slate-200">
                                  <strong>Gia sư giải thích:</strong> {quiz.explanationVi}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* EXAM NOTES BANNER */}
                  {mission.examNote && (
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Bẫy đề thi & Lưu ý ghi điểm cao:</strong> {mission.examNote}
                      </div>
                    </div>
                  )}

                  {/* MASTERY THRESHOLD EVALUATION (THE 70% COMPLETION GATE) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <Target className="w-4 h-4 text-indigo-600" />
                          <span>Đánh Giá Hoàn Thành Buổi Học 30 Phút (Tiêu Chuẩn ≥ 70%)</span>
                        </h4>
                        <p className="text-xs text-slate-500">
                          Đã trả lời: {answeredCount}/{totalQuestions} câu • Đúng: {correctCount}/{totalQuestions} câu ({scorePercentage}%)
                        </p>
                      </div>

                      {!isSubmitted && (
                        <button
                          onClick={handleSubmitLesson}
                          disabled={!isAllAnswered}
                          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
                        >
                          <Award className="w-4 h-4" />
                          <span>Nộp Bài & Chấm Điểm 30 Phút</span>
                        </button>
                      )}
                    </div>

                    {/* RESULT EVALUATION SCREEN */}
                    {isSubmitted && (
                      <div className="space-y-4 pt-3 border-t border-slate-200 animate-fadeIn">
                        
                        {/* CASE 1: FAILED MASTERY (< 70%) - LOCKED */}
                        {!isMastered ? (
                          <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                                <Lock className="w-5 h-5 text-amber-600" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <h5 className="text-sm font-extrabold text-amber-900">
                                    Cố lên bé yêu! Kết quả hiện tại: {scorePercentage}% điểm
                                  </h5>
                                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                                    Cần ≥ 70% để mở bài mới
                                  </span>
                                </div>
                                <p className="text-xs text-amber-950 leading-relaxed">
                                  {mission.tutorFeedback?.needImprovementMessage ||
                                    `Bé ơi, con đã rất nỗ lực! Để đảm bảo con nắm thật chắc kiến thức và tự tin học tiếp, Gia sư AI quy định cần đạt từ 70% trở lên để mở khóa bài học mới tiếp theo. Hãy cùng Thầy/Cô xem lại các câu chưa đúng và làm lại nhé!`}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-200/80">
                              <button
                                onClick={handleRetryMistakes}
                                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Ôn lại & Làm lại các câu sai</span>
                              </button>

                              <button
                                onClick={handleRetakeAll}
                                className="px-3.5 py-2 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1.5"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>Làm lại toàn bộ bài</span>
                              </button>

                              <div className="ml-auto text-xs text-amber-800 font-semibold flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5 text-amber-600" />
                                <span>Bài mới đang khóa (Đạt thêm {Math.ceil(totalQuestions * 0.7) - correctCount} câu nữa để mở)</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* CASE 2: PASSED MASTERY (>= 70%) - UNLOCKED! */
                          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                                <PartyPopper className="w-6 h-6" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <h5 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
                                    <span>Hoan hô bé yêu! Con đạt {scorePercentage}% điểm!</span>
                                  </h5>
                                  <div className="flex items-center gap-1 text-amber-500">
                                    {Array.from({ length: starsEarned }).map((_, i) => (
                                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 animate-bounce" />
                                    ))}
                                    <span className="text-xs font-bold text-emerald-800 ml-1">
                                      ({starsEarned} Sao Vàng)
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                                  {mission.tutorFeedback?.passedMessage ||
                                    `Tuyệt vời! Bé đã hoàn thành xuất sắc buổi học 30 phút với kết quả ${scorePercentage}% và chính thức MỞ KHÓA BÀI HỌC MỚI TIẾP THEO!`}
                                </p>
                                <p className="text-[11px] text-emerald-700 font-semibold">
                                  🎁 Phần thưởng: +100 XP • +30 phút tích lũy • Tăng chuỗi Streak ngày học
                                </p>
                              </div>
                            </div>

                            {/* ACTION TO GENERATE NEXT LESSON */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-emerald-200">
                              <div className="text-xs text-emerald-800 font-bold flex flex-col gap-0.5">
                                <div className="flex items-center gap-1.5">
                                  <Unlock className="w-4 h-4 text-emerald-600" />
                                  <span>ĐỦ ĐIỀU KIỆN MỞ KHÓA BÀI HỌC MỚI TIẾP THEO</span>
                                </div>
                                <span className="text-[11px] text-emerald-700 font-normal">
                                  ✨ Tự động lọc bỏ các từ bé đã học để ưu tiên từ vựng mới tinh!
                                </span>
                              </div>

                              <button
                                onClick={() => handleGenerateAiMission(true)}
                                disabled={isLoadingAi}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
                              >
                                {isLoadingAi ? (
                                  <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    <span>Gia sư AI đang chuẩn bị bài mới...</span>
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-4 h-4" />
                                    <span>TẠO BÀI HỌC MỚI TIẾP THEO (AI NEXT LESSON)</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* IN-UI CONFIRMATION MODAL FOR DELETING HISTORY */}
        {historyDeleteTarget && (
          <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Xác nhận xóa bài khỏi nhật ký?
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {historyDeleteTarget.isAll
                      ? 'Bạn có chắc chắn muốn xóa toàn bộ lịch sử các bài học đã hoàn thành?'
                      : `Bài: "${historyDeleteTarget.title}"`}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                Hành động này sẽ xóa dữ liệu bài học này khỏi nhật ký lưu trên máy. Bé vẫn có thể tiếp tục học các bài học mới bình thường.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setHistoryDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleExecuteDeleteHistory}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xác nhận xóa</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

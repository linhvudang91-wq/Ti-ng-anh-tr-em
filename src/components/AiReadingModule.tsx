import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookmarkPlus,
  BookmarkCheck,
  Languages,
  Layers,
  ArrowRight,
  Lightbulb,
  FileText,
  Clock,
  Award,
  ChevronRight,
  ListFilter,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { GradeLevel, ReadingPassage, ReadingLengthType, UserProfile, WordItem } from '../types';
import { audioManager, Accent } from '../utils/audioUtils';
import { saveReadingPassage, loadUserProgress, recordCorrectAnswer } from '../utils/storageUtils';
import { THEMATIC_CLUSTERS, getClusterByKey } from '../data/thematicVocabulary';

interface AiReadingModuleProps {
  currentGrade: GradeLevel;
  userProfile?: UserProfile;
  initialTopic?: string;
  onAwardXp: (amount: number) => void;
  onSaveWord?: (word: WordItem) => void;
  isWordSaved?: (wordId: string) => boolean;
}

type ViewMode = 'bilingual' | 'english-only' | 'split-columns';
type ActiveTab = 'reading' | 'vocab' | 'grammar' | 'quiz';

export const AiReadingModule: React.FC<AiReadingModuleProps> = ({
  currentGrade,
  userProfile,
  initialTopic,
  onAwardXp,
  onSaveWord,
  isWordSaved,
}) => {
  // Topic selection & prompt state
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic || 'Môi trường & Sinh thái');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(currentGrade || 8);
  const [targetLevel, setTargetLevel] = useState<string>(
    userProfile?.target === 'chuyen-b2' ? 'B2 (Chuyên Anh 10)' : 'B1 (GDPT 2018)'
  );
  
  // Length selection: 'short' (50-60 words) or 'standard' (120-150 words)
  const [readingLength, setReadingLength] = useState<ReadingLengthType>(() => {
    return (currentGrade && currentGrade <= 6) ? 'short' : 'standard';
  });

  // Current reading passage
  const [passage, setPassage] = useState<ReadingPassage | null>(() => {
    // Check saved passage in progress first, or pick default cluster
    const progress = loadUserProgress();
    if (progress.savedPassages && progress.savedPassages.length > 0) {
      return progress.savedPassages[0];
    }
    const isInitialShort = (currentGrade && currentGrade <= 6);
    return isInitialShort ? THEMATIC_CLUSTERS[0].shortPassage : THEMATIC_CLUSTERS[0].defaultPassage;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // View & UI controls
  const [viewMode, setViewMode] = useState<ViewMode>('bilingual');
  const [activeTab, setActiveTab] = useState<ActiveTab>('reading');
  const [hoveredSentenceId, setHoveredSentenceId] = useState<string | null>(null);

  // Audio Controls
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [accent, setAccent] = useState<Accent>('US');
  const cancelAudioRef = useRef<boolean>(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [revealedClueSentence, setRevealedClueSentence] = useState<string | null>(null);

  // Saved passages list
  const [savedList, setSavedList] = useState<ReadingPassage[]>(() => {
    const p = loadUserProgress();
    return p.savedPassages || [THEMATIC_CLUSTERS[0].defaultPassage];
  });
  const [showSavedDrawer, setShowSavedDrawer] = useState<boolean>(false);

  // Synchronize when initialTopic prop changes
  useEffect(() => {
    if (initialTopic && initialTopic !== selectedTopic) {
      setSelectedTopic(initialTopic);
      // Try to find matching cluster default
      const matched = THEMATIC_CLUSTERS.find(
        c => c.nameVi.toLowerCase().includes(initialTopic.toLowerCase()) ||
             initialTopic.toLowerCase().includes(c.id)
      );
      if (matched) {
        setPassage(readingLength === 'short' && matched.shortPassage ? matched.shortPassage : matched.defaultPassage);
        resetQuiz();
      }
    }
  }, [initialTopic, readingLength]);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      cancelAudioRef.current = true;
      audioManager.stop();
    };
  }, []);

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setRevealedClueSentence(null);
  };

  // Generate passage with AI
  const handleGeneratePassage = async (topicToUse?: string) => {
    const finalTopic = topicToUse || customPrompt.trim() || selectedTopic;
    setIsLoading(true);
    setErrorMsg(null);
    cancelAudioRef.current = true;
    audioManager.stop();
    setIsPlayingAll(false);
    setActiveSentenceIndex(null);

    const isShort = readingLength === 'short';
    const targetWords = isShort ? '50-60' : '120-150';
    setLoadingStep(`Đang chuẩn bị chủ đề và chuẩn hóa độ dài ${targetWords} từ...`);

    let timer1: any = null;
    let timer2: any = null;

    try {
      timer1 = setTimeout(() => {
        setLoadingStep('AI đang biên soạn bài đọc, dịch song ngữ và phân tích cấu trúc...');
      }, 1000);

      timer2 = setTimeout(() => {
        setLoadingStep('Đang tối ưu kết nối và hoàn thiện câu hỏi đọc hiểu...');
      }, 3500);

      const res = await fetch('/api/ai/generate-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: finalTopic,
          grade: selectedGrade,
          targetLevel,
          studentName: userProfile?.name || 'Học sinh',
          lengthOption: readingLength,
          wordCountTarget: targetWords,
        }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      if (!res.ok) {
        throw new Error('Không thể kết nối máy chủ AI');
      }

      const data: ReadingPassage = await res.json();
      setPassage(data);
      saveReadingPassage(data);
      setSavedList(prev => [data, ...prev.filter(p => p.id !== data.id)].slice(0, 20));
      resetQuiz();
      setActiveTab('reading');
      onAwardXp(15); // +15 XP for generating a new reading passage
    } catch (err: any) {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
      console.warn('Reading passage fallback applied:', err?.message || err);
      // Fallback to cluster default smoothly without alarming error toast
      const matchedCluster = THEMATIC_CLUSTERS.find(c => c.nameVi === finalTopic) || THEMATIC_CLUSTERS[0];
      const fallback = isShort && matchedCluster.shortPassage ? matchedCluster.shortPassage : matchedCluster.defaultPassage;
      setPassage(fallback);
      resetQuiz();
    } finally {
      setIsLoading(false);
    }
  };

  // Play a single sentence
  const handlePlaySentence = async (text: string, index: number) => {
    cancelAudioRef.current = false;
    audioManager.stop();
    setActiveSentenceIndex(index);
    await audioManager.speak(text, accent, audioSpeed);
    if (!isPlayingAll) {
      setActiveSentenceIndex(null);
    }
  };

  // Play all sentences sequentially
  const handlePlayAll = async () => {
    if (!passage || !passage.sentences.length) return;

    if (isPlayingAll) {
      cancelAudioRef.current = true;
      audioManager.stop();
      setIsPlayingAll(false);
      setActiveSentenceIndex(null);
      return;
    }

    setIsPlayingAll(true);
    cancelAudioRef.current = false;

    for (let i = 0; i < passage.sentences.length; i++) {
      if (cancelAudioRef.current) break;
      setActiveSentenceIndex(i);
      await audioManager.speak(passage.sentences[i].en, accent, audioSpeed);
      // Brief pause between sentences
      await new Promise(r => setTimeout(r, 450));
    }

    setIsPlayingAll(false);
    setActiveSentenceIndex(null);
  };

  // Stop playback
  const handleStopAudio = () => {
    cancelAudioRef.current = true;
    audioManager.stop();
    setIsPlayingAll(false);
    setActiveSentenceIndex(null);
  };

  // Quiz submission & XP reward
  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    if (!passage || !passage.quiz) return;
    let correctCount = 0;
    passage.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });
    setQuizScore(correctCount);
    setQuizSubmitted(true);

    if (correctCount > 0) {
      recordCorrectAnswer(correctCount);
    }

    const xpEarned = correctCount * 10;
    if (xpEarned > 0) {
      onAwardXp(xpEarned);
    }
  };

  const handleRetakeQuiz = () => {
    resetQuiz();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER & TOPIC GENERATOR BAR */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                📖
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                  Bài Đọc Hiểu AI Song Ngữ
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Tùy chọn 50–60 từ & 120–150 từ
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Linh hoạt chọn bài đọc ngắn (50–60 từ) hoặc tiêu chuẩn (120–150 từ) bám sát SGK GDPT 2018 & B2 Chuyên Anh, kèm giọng đọc mẫu, dịch nghĩa và bài test ôn tập.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Length Selector (50-60 vs 120-150 words) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs">
              <button
                id="btn-reading-len-short"
                onClick={() => {
                  setReadingLength('short');
                  const matched = THEMATIC_CLUSTERS.find(c => c.nameVi === selectedTopic || c.nameVi === passage?.topic);
                  if (matched?.shortPassage) {
                    setPassage(matched.shortPassage);
                    resetQuiz();
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  readingLength === 'short'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Bài đọc ngắn 50-60 từ phù hợp khởi động hoặc học sinh lớp 3-6"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>50–60 từ</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">Ngắn</span>
              </button>
              <button
                id="btn-reading-len-standard"
                onClick={() => {
                  setReadingLength('standard');
                  const matched = THEMATIC_CLUSTERS.find(c => c.nameVi === selectedTopic || c.nameVi === passage?.topic);
                  if (matched?.defaultPassage) {
                    setPassage(matched.defaultPassage);
                    resetQuiz();
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  readingLength === 'standard'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Bài đọc chuẩn 120-150 từ theo đề thi tuyển sinh vào 10"
              >
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>120–150 từ</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-blue-100 text-blue-800 font-bold">Chuẩn</span>
              </button>
            </div>

            {/* Grade selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-600">Khối:</span>
              <select
                value={selectedGrade}
                onChange={(e) => {
                  const g = Number(e.target.value) as GradeLevel;
                  setSelectedGrade(g);
                  if (g <= 5) {
                    setReadingLength('short');
                  }
                }}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                {[3, 4, 5, 6, 7, 8, 9].map(g => (
                  <option key={g} value={g}>Lớp {g}</option>
                ))}
              </select>
            </div>

            {/* Target Tier */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-600">Mục tiêu:</span>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="A2 (GDPT 2018)">A2 (Cơ bản GDPT)</option>
                <option value="B1 (Nâng cao)">B1 (Nâng cao)</option>
                <option value="B2 (Chuyên Anh 10)">B2 (Chuyên Anh vào 10)</option>
              </select>
            </div>

            {/* Saved drawer button */}
            <button
              onClick={() => setShowSavedDrawer(!showSavedDrawer)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Đã lưu ({savedList.length})</span>
            </button>
          </div>
        </div>

        {/* QUICK TOPIC PILLS */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-600 mb-2">Chọn chủ đề từ vựng gợi ý để AI tạo bài đọc:</p>
          <div className="flex flex-wrap gap-2">
            {THEMATIC_CLUSTERS.map(cluster => {
              const isSelected = selectedTopic === cluster.nameVi;
              return (
                <button
                  key={cluster.id}
                  onClick={() => {
                    setSelectedTopic(cluster.nameVi);
                    setCustomPrompt('');
                    handleGeneratePassage(cluster.nameVi);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{cluster.icon}</span>
                  <span>{cluster.nameVi}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CUSTOM PROMPT GENERATOR INPUT */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGeneratePassage()}
            placeholder="Hoặc nhập chủ đề bài đọc tùy ý (VD: Trí tuệ nhân tạo, Thói quen đọc sách, Khám phá Đà Nẵng...)"
            className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleGeneratePassage()}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Đang tạo bài...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Tạo bài đọc AI</span>
              </>
            )}
          </button>
        </div>

        {/* LOADING INDICATOR */}
        {isLoading && (
          <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-blue-900">{loadingStep}</p>
              <p className="text-[11px] text-blue-700 mt-0.5">
                AI đang tính toán từ vựng và cấu trúc ngữ pháp để đảm bảo chính xác 120-150 từ cho khối lớp {selectedGrade}.
              </p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}
      </div>

      {/* SAVED PASSAGES DRAWER */}
      {showSavedDrawer && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4 text-blue-600" />
              Lịch sử bài đọc đã lưu ({savedList.length})
            </h4>
            <button
              onClick={() => setShowSavedDrawer(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Đóng ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {savedList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setPassage(item);
                  resetQuiz();
                  setShowSavedDrawer(false);
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  passage?.id === item.id
                    ? 'bg-blue-50 border-blue-300 shadow-xs'
                    : 'bg-white hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    Lớp {item.grade} • {item.wordCount} từ
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.cefrLevel}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-800 line-clamp-1">{item.titleEn}</h5>
                <p className="text-[11px] text-slate-500 line-clamp-1">{item.titleVi}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      {passage && (
        <div className="space-y-4">
          {/* TAB NAVIGATION: Reading, Vocabulary Analysis, Grammar Breakdown, Quiz */}
          <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('reading')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border-b-2 transition-all ${
                activeTab === 'reading'
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>1. Bài đọc & Đọc mẫu</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800 font-semibold">
                {passage.wordCount} từ
              </span>
            </button>

            <button
              onClick={() => setActiveTab('vocab')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border-b-2 transition-all ${
                activeTab === 'vocab'
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>2. Phân tích Từ vựng</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-semibold">
                {passage.vocabAnalysis?.length || 0} từ
              </span>
            </button>

            <button
              onClick={() => setActiveTab('grammar')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border-b-2 transition-all ${
                activeTab === 'grammar'
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3. Cấu trúc Ngữ pháp</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-800 font-semibold">
                {passage.grammarAnalysis?.length || 0} cấu trúc
              </span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border-b-2 transition-all ${
                activeTab === 'quiz'
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>4. Bài kiểm tra ôn tập</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-semibold">
                {passage.quiz?.length || 0} câu
              </span>
            </button>
          </div>

          {/* TAB 1: READING PASSAGE & AUDIO PLAYER */}
          {activeTab === 'reading' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              {/* TITLE & META BANNER */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-blue-100 text-blue-800">
                      {passage.topic}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-emerald-100 text-emerald-800">
                      {passage.wordCount} từ ({passage.lengthType === 'short' || passage.wordCount <= 75 ? '⚡ Ngắn 50-60 từ' : '📖 Chuẩn 120-150 từ'})
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-700">
                      Cấp độ: {passage.cefrLevel}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">{passage.titleEn}</h3>
                  <p className="text-sm font-medium text-slate-500">{passage.titleVi}</p>
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
                  <button
                    onClick={() => setViewMode('bilingual')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      viewMode === 'bilingual' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Song ngữ
                  </button>
                  <button
                    onClick={() => setViewMode('english-only')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      viewMode === 'english-only' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Chỉ Tiếng Anh
                  </button>
                  <button
                    onClick={() => setViewMode('split-columns')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      viewMode === 'split-columns' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    2 Cột song song
                  </button>
                </div>
              </div>

              {/* AUDIO CONTROLS TOOLBAR (PHẦN ĐỌC MẪU) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayAll}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      isPlayingAll
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isPlayingAll ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Tạm dừng đọc toàn bài</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Nghe đọc mẫu toàn bài</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleStopAudio}
                    className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs font-semibold"
                    title="Dừng âm thanh"
                  >
                    <VolumeX className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Speed control */}
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-500 font-medium">Tốc độ:</span>
                    {[0.75, 1.0, 1.25].map(speed => (
                      <button
                        key={speed}
                        onClick={() => setAudioSpeed(speed)}
                        className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-all ${
                          audioSpeed === speed
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>

                  {/* Accent toggle */}
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-500 font-medium">Giọng:</span>
                    <button
                      onClick={() => setAccent(accent === 'US' ? 'UK' : 'US')}
                      className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-slate-800 border border-slate-200 hover:bg-slate-100 flex items-center gap-1"
                    >
                      <span>{accent === 'US' ? '🇺🇸 Chuẩn Mỹ (US)' : '🇬🇧 Chuẩn Anh (UK)'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* READING PASSAGE RENDERING */}
              {viewMode === 'bilingual' && (
                <div className="space-y-4 text-base leading-relaxed">
                  {passage.sentences.map((sent, idx) => {
                    const isActive = activeSentenceIndex === idx;
                    const isClue = revealedClueSentence && sent.en.includes(revealedClueSentence);
                    return (
                      <div
                        key={sent.id}
                        onMouseEnter={() => setHoveredSentenceId(sent.id)}
                        onMouseLeave={() => setHoveredSentenceId(null)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-300 shadow-xs'
                            : isClue
                            ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                            : 'bg-white hover:bg-slate-50 border-slate-100'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-semibold text-slate-900 text-[15px] leading-relaxed">
                            <span className="text-xs font-mono font-bold text-slate-400 mr-2">
                              {idx + 1}.
                            </span>
                            {sent.en}
                          </p>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlaySentence(sent.en, idx);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex-shrink-0 transition-colors"
                            title="Nghe câu này"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-slate-500 font-medium mt-1.5 pl-5 border-l-2 border-slate-200 leading-normal">
                          {sent.vi}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {viewMode === 'english-only' && (
                <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-200 space-y-4">
                  <p className="text-xs text-slate-500 italic">
                    💡 Mẹo: Nhấp vào từng câu để nghe phát âm mẫu, di chuột để xem nghĩa tiếng Việt.
                  </p>
                  <div className="text-[16px] leading-8 text-slate-800 space-x-1">
                    {passage.sentences.map((sent, idx) => {
                      const isActive = activeSentenceIndex === idx;
                      return (
                        <span
                          key={sent.id}
                          onClick={() => handlePlaySentence(sent.en, idx)}
                          title={sent.vi}
                          className={`cursor-pointer px-1 py-0.5 rounded transition-all ${
                            isActive
                              ? 'bg-blue-200 text-blue-900 font-semibold'
                              : 'hover:bg-amber-100 hover:text-slate-900'
                          }`}
                        >
                          {sent.en}{' '}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {viewMode === 'split-columns' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                      🇬🇧 Văn bản Tiếng Anh ({passage.wordCount} từ)
                    </h4>
                    <div className="space-y-2.5 text-sm text-slate-800 leading-relaxed">
                      {passage.sentences.map((s, idx) => (
                        <p
                          key={s.id}
                          onClick={() => handlePlaySentence(s.en, idx)}
                          className={`cursor-pointer p-1.5 rounded transition-colors ${
                            activeSentenceIndex === idx ? 'bg-blue-100 font-semibold' : 'hover:bg-slate-200/50'
                          }`}
                        >
                          <span className="text-xs text-slate-400 font-mono mr-1.5">[{idx + 1}]</span>
                          {s.en}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                      🇻🇳 Bản dịch Tiếng Việt
                    </h4>
                    <div className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
                      {passage.sentences.map((s, idx) => (
                        <p key={s.id} className="p-1.5">
                          <span className="text-xs text-slate-400 font-mono mr-1.5">[{idx + 1}]</span>
                          {s.vi}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* FOOTER ACTIONS */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Đã đọc xong bài đọc? Hãy chuyển sang mục phân tích hoặc làm bài kiểm tra để tích lũy XP!
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('vocab')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                  >
                    <span>Xem Phân tích Từ vựng</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
                  >
                    <span>Làm bài kiểm tra ôn tập (+50 XP)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VOCABULARY ANALYSIS (PHÂN TÍCH TỪ VỰNG TRỌNG TÂM) */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Phân Tích Từ Vựng Trọng Tâm Trong Bài Đọc
                    </h3>
                    <p className="text-xs text-slate-500">
                      Các từ vựng học thuật then chốt, ngữ cảnh sử dụng, cụm từ cố định (Collocations) và mẹo làm bài thi.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {passage.vocabAnalysis?.length || 0} từ nổi bật
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {passage.vocabAnalysis?.map((item, idx) => {
                    const saved = isWordSaved ? isWordSaved(item.word) : false;
                    return (
                      <div
                        key={idx}
                        className="bg-slate-50/70 rounded-xl p-4 border border-slate-200 space-y-2.5 hover:border-blue-300 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-blue-900">{item.word}</span>
                            <span className="text-xs font-mono text-slate-500">{item.ipa}</span>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                              {item.partOfSpeech}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => audioManager.speak(item.word, accent, 0.9)}
                              className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>

                            {onSaveWord && (
                              <button
                                onClick={() => {
                                  onSaveWord({
                                    id: `vocab-${item.word.toLowerCase()}`,
                                    word: item.word,
                                    ipa: item.ipa,
                                    partOfSpeech: item.partOfSpeech,
                                    meaningVi: item.meaningVi,
                                    exampleEn: item.contextSentence,
                                    exampleVi: item.collocationOrFamily || '',
                                    isCore: true,
                                    unitId: passage.id,
                                    grade: passage.grade,
                                  });
                                  onAwardXp(5);
                                }}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  saved
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'hover:bg-slate-200 text-slate-500'
                                }`}
                                title="Lưu vào sổ tay từ vựng"
                              >
                                {saved ? (
                                  <BookmarkCheck className="w-4 h-4" />
                                ) : (
                                  <BookmarkPlus className="w-4 h-4" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-xs font-semibold text-slate-800">
                          🇻🇳 {item.meaningVi}
                        </p>

                        <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100 space-y-1">
                          <p className="italic text-slate-700">
                            <strong>Ngữ cảnh trong bài:</strong> "{item.contextSentence}"
                          </p>
                          {item.collocationOrFamily && (
                            <p className="text-blue-700 font-medium">
                              <strong>Cụm đi kèm (Collocation):</strong> {item.collocationOrFamily}
                            </p>
                          )}
                        </div>

                        {item.examTipVi && (
                          <div className="flex items-start gap-1.5 text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span><strong>Mẹo thi:</strong> {item.examTipVi}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GRAMMAR STRUCTURE BREAKDOWN (PHÂN TÍCH CẤU TRÚC NGỮ PHÁP) */}
          {activeTab === 'grammar' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-purple-600" />
                      Phân Tích Cấu Trúc Ngữ Pháp Xuất Hiện Trong Bài
                    </h3>
                    <p className="text-xs text-slate-500">
                      Công thức, câu mẫu trích từ bài đọc, phân tích chi tiết và các bẫy thường gặp trong đề thi Chuyên/vào 10.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    {passage.grammarAnalysis?.length || 0} điểm ngữ pháp
                  </span>
                </div>

                <div className="space-y-4">
                  {passage.grammarAnalysis?.map((gram, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50/70 rounded-xl p-5 border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{gram.structureName}</h4>
                      </div>

                      {/* Formula Card */}
                      <div className="bg-purple-950 text-purple-100 p-3 rounded-xl font-mono text-xs font-semibold shadow-xs">
                        <span className="text-purple-400 font-bold mr-2">Công thức:</span>
                        {gram.formula}
                      </div>

                      {/* Extracted Example */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Trích xuất từ bài đọc:
                        </p>
                        <p className="text-xs font-semibold text-slate-900 italic">
                          "{gram.extractedExample}"
                        </p>
                      </div>

                      {/* Explanation */}
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <strong>Giải thích:</strong> {gram.explanationVi}
                      </p>

                      {/* Trap & Usage */}
                      {gram.trapOrUsageVi && (
                        <div className="flex items-start gap-2 bg-rose-50 text-rose-800 p-3 rounded-xl border border-rose-200 text-xs">
                          <span className="font-bold text-rose-700 flex-shrink-0">⚠️ Bẫy đề thi:</span>
                          <p>{gram.trapOrUsageVi}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIVE READING QUIZ (BÀI KIỂM TRA ÔN TẬP) */}
          {activeTab === 'quiz' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    Bài Kiểm Tra Ôn Tập Đọc Hiểu ({passage.quiz?.length || 0} câu)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kiểm tra khả năng nắm bắt ý chính, tìm chi tiết, đoán nghĩa từ trong ngữ cảnh và suy luận.
                  </p>
                </div>

                {quizSubmitted && (
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Kết quả:</p>
                      <p className="text-sm font-bold text-emerald-600">
                        {quizScore} / {passage.quiz.length} đúng (+{quizScore * 10} XP)
                      </p>
                    </div>
                    <button
                      onClick={handleRetakeQuiz}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Làm lại
                    </button>
                  </div>
                )}
              </div>

              {/* QUESTIONS LIST */}
              <div className="space-y-6">
                {passage.quiz?.map((q, qIndex) => {
                  const selectedOpt = quizAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect = isAnswered && selectedOpt === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {qIndex + 1}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-slate-200 text-slate-700 mr-2">
                              {q.type}
                            </span>
                            <p className="text-sm font-bold text-slate-900 inline">
                              {q.question}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* OPTIONS */}
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedOpt === optIdx;
                          let btnClass = 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800';

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnClass = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold ring-2 ring-emerald-300';
                            } else if (isOptionSelected && optIdx !== q.correctIndex) {
                              btnClass = 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                            } else {
                              btnClass = 'bg-white/50 border-slate-200 text-slate-400 opacity-60';
                            }
                          } else if (isOptionSelected) {
                            btnClass = 'bg-blue-100 border-blue-400 text-blue-900 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleSelectQuizOption(q.id, optIdx)}
                              className={`p-3 rounded-xl text-xs text-left border flex items-center justify-between gap-3 transition-all ${btnClass}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>

                              {quizSubmitted && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              )}
                              {quizSubmitted && isOptionSelected && optIdx !== q.correctIndex && (
                                <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* EXPLANATION AFTER SUBMISSION */}
                      {quizSubmitted && (
                        <div className="mt-3 p-3.5 bg-blue-50/80 rounded-xl border border-blue-200 text-xs space-y-1.5">
                          <p className="font-bold text-blue-900 flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            Giải thích chi tiết:
                          </p>
                          <p className="text-slate-700 leading-relaxed">{q.explanationVi}</p>
                          {q.clueSentenceEn && (
                            <p className="text-[11px] text-blue-700 italic border-t border-blue-200 pt-1.5">
                              <strong>Manh mối trong bài:</strong> "{q.clueSentenceEn}"
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* SUBMIT BUTTON */}
              {!quizSubmitted ? (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length === 0}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Nộp bài & Chấm điểm (+10 XP / câu đúng)</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-base">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-900">
                        Hoàn thành bài kiểm tra đọc hiểu! Bạn đạt {quizScore} / {passage.quiz.length} câu đúng.
                      </p>
                      <p className="text-[11px] text-emerald-700">
                        Đã cộng +{quizScore * 10} XP vào hồ sơ học tập của bạn.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleGeneratePassage()}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Tạo bài đọc mới tiếp theo →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

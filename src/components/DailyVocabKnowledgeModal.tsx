import React, { useState, useEffect } from 'react';
import { GradeLevel, WordItem, UserProgress } from '../types';
import {
  GRADE_KNOWLEDGE_BASE_WORDS,
  getWordsByGrade,
  getDailyWords,
  getGradeVocabularyStats,
  searchVocabulary,
} from '../data/gradeKnowledgeBase';
import { audioManager, Accent } from '../utils/audioUtils';
import { recordCorrectAnswer } from '../utils/storageUtils';
import {
  BookOpen,
  Calendar,
  Sparkles,
  Volume2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Filter,
  Search,
  Award,
  Flame,
  GraduationCap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  RotateCcw,
  Check,
  Lightbulb,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface DailyVocabKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGrade: GradeLevel;
  progress: UserProgress;
  onSaveWord: (wordId: string) => void;
  onAddXP: (xp: number) => void;
  onRecordCorrectAnswer?: (count: number) => void;
}

export const DailyVocabKnowledgeModal: React.FC<DailyVocabKnowledgeModalProps> = ({
  isOpen,
  onClose,
  initialGrade,
  progress,
  onSaveWord,
  onAddXP,
  onRecordCorrectAnswer,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const [activeTab, setActiveTab] = useState<'daily' | 'browse'>('daily');
  const [accent, setAccent] = useState<Accent>('US');

  // Daily study states
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [wordsPerDay, setWordsPerDay] = useState<number>(5);
  const [masteredWordIds, setMasteredWordIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`daily_mastered_g${selectedGrade}_d${currentDay}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Daily mini-quiz state
  const [showDailyQuiz, setShowDailyQuiz] = useState<boolean>(false);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Knowledge base browse & search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'core' | 'advanced'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Synchronize grade changes
  useEffect(() => {
    setSelectedGrade(initialGrade);
  }, [initialGrade]);

  // Load mastered state when grade or day changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`daily_mastered_g${selectedGrade}_d${currentDay}`);
      setMasteredWordIds(saved ? JSON.parse(saved) : []);
    } catch {
      setMasteredWordIds([]);
    }
    setShowDailyQuiz(false);
    setQuizQuestionIndex(0);
    setSelectedQuizOption(null);
    setQuizFinished(false);
  }, [selectedGrade, currentDay]);

  if (!isOpen) return null;

  // Grade statistics
  const stats = getGradeVocabularyStats(selectedGrade);
  const allGradeWords = getWordsByGrade(selectedGrade);

  // Daily words
  const dailyWords = getDailyWords(selectedGrade, currentDay, wordsPerDay);

  // Filtered browse words
  const searchResults = searchVocabulary(searchQuery, selectedGrade);
  const browseWords = searchResults.filter((w) => {
    if (filterType === 'core' && !w.isCore) return false;
    if (filterType === 'advanced' && w.isCore) return false;
    if (filterCategory !== 'all' && w.partOfSpeech !== filterCategory) return false;
    return true;
  });

  const handleSpeak = (text: string) => {
    audioManager.speak(text, accent, selectedGrade <= 5 ? 0.8 : 0.95);
  };

  const isWordSaved = (wordId: string) => {
    return progress.savedNotebookWords?.some((w) => w.wordId === wordId);
  };

  const toggleMasteredWord = (wordId: string) => {
    let next: string[];
    if (masteredWordIds.includes(wordId)) {
      next = masteredWordIds.filter((id) => id !== wordId);
    } else {
      next = [...masteredWordIds, wordId];
      onAddXP(5);
      audioManager.playEffect('correct');
    }
    setMasteredWordIds(next);
    try {
      localStorage.setItem(`daily_mastered_g${selectedGrade}_d${currentDay}`, JSON.stringify(next));
    } catch (e) {
      console.warn('Cannot persist daily mastered state:', e);
    }
  };

  // Generate 4-choice options for daily mini-quiz
  const currentQuizWord = dailyWords[quizQuestionIndex];
  const generateQuizOptions = () => {
    if (!currentQuizWord) return [];
    const correctMeaning = currentQuizWord.meaningVi;
    const otherWords = allGradeWords
      .filter((w) => w.id !== currentQuizWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [correctMeaning, ...otherWords.map((w) => w.meaningVi)];
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswerDailyQuiz = (chosenIndex: number, options: string[]) => {
    if (selectedQuizOption !== null) return;
    setSelectedQuizOption(chosenIndex);

    const isCorrect = options[chosenIndex] === currentQuizWord.meaningVi;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      audioManager.playEffect('correct');
      onAddXP(10);
      recordCorrectAnswer(1);
      if (onRecordCorrectAnswer) {
        onRecordCorrectAnswer(1);
      }
    } else {
      audioManager.playEffect('wrong');
    }

    setTimeout(() => {
      if (quizQuestionIndex + 1 < dailyWords.length) {
        setQuizQuestionIndex((prev) => prev + 1);
        setSelectedQuizOption(null);
      } else {
        setQuizFinished(true);
        audioManager.playEffect('complete');
      }
    }, 1200);
  };

  const startDailyQuiz = () => {
    setShowDailyQuiz(true);
    setQuizQuestionIndex(0);
    setSelectedQuizOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const getTierLabel = (g: GradeLevel) => {
    if (g <= 5) return 'Tiểu học (Pre-A1/A1)';
    if (g <= 7) return 'THCS Đầu cấp (A2/B1)';
    return 'THCS Cuối cấp & Thi Chuyên 10 (B1+/B2)';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  Kho Kiến Thức Từ Vựng Học Tập Hàng Ngày
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 border border-white/30 text-white">
                  GDPT 2018
                </span>
              </div>
              <p className="text-xs text-blue-100 opacity-90 mt-0.5">
                Biên soạn chuẩn hóa theo từng khối lớp từ Lớp 3 đến Lớp 9 • Lộ trình rèn luyện mỗi ngày
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Accent US/UK switcher */}
            <div className="flex items-center bg-black/20 backdrop-blur-xs rounded-xl p-0.5 border border-white/20 text-xs font-bold">
              <button
                onClick={() => setAccent('US')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  accent === 'US' ? 'bg-white text-blue-700 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                🇺🇸 US
              </button>
              <button
                onClick={() => setAccent('UK')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  accent === 'UK' ? 'bg-white text-blue-700 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                🇬🇧 UK
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grade Selector & Main Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          {/* Grade Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-500 mr-1 shrink-0 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              Khối lớp:
            </span>
            {([3, 4, 5, 6, 7, 8, 9] as GradeLevel[]).map((g) => (
              <button
                key={g}
                id={`btn-daily-grade-${g}`}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedGrade === g
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
            <button
              id="tab-daily-workout"
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'daily'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Học tập hàng ngày (Daily)</span>
            </button>
            <button
              id="tab-knowledge-browse"
              onClick={() => setActiveTab('browse')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'browse'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tra cứu toàn bộ kho ({allGradeWords.length} từ)</span>
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* TAB 1: DAILY WORKOUT (HỌC TẬP HÀNG NGÀY THEO KHỐI LỚP) */}
          {activeTab === 'daily' && (
            <div className="space-y-5">
              
              {/* Daily Control Bar */}
              <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/80 p-4 rounded-2xl border border-blue-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📅</span>
                    <h3 className="text-sm sm:text-base font-black text-slate-900">
                      Mục tiêu từ vựng Ngày {currentDay} • Lớp {selectedGrade} ({getTierLabel(selectedGrade)})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600">
                    Đã thuộc: <span className="font-bold text-emerald-600">{masteredWordIds.length}</span> / {dailyWords.length} từ hôm nay • Hoàn thành kiểm tra để tích lũy câu trả lời chính xác!
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Day Navigation */}
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
                    <button
                      onClick={() => setCurrentDay((prev) => Math.max(1, prev - 1))}
                      disabled={currentDay <= 1}
                      className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 text-slate-700"
                      title="Ngày trước"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-slate-800">
                      Ngày {currentDay} / 10
                    </span>
                    <button
                      onClick={() => setCurrentDay((prev) => Math.min(10, prev + 1))}
                      disabled={currentDay >= 10}
                      className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 text-slate-700"
                      title="Ngày tiếp theo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Words per day choice */}
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 text-xs">
                    <span className="text-slate-500 px-1 text-[11px] font-medium hidden sm:inline">Mục tiêu:</span>
                    {[3, 5, 8].map((num) => (
                      <button
                        key={num}
                        onClick={() => setWordsPerDay(num)}
                        className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                          wordsPerDay === num
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {num} từ
                      </button>
                    ))}
                  </div>

                  {/* Quiz Trigger */}
                  <button
                    onClick={startDailyQuiz}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Kiểm tra ngày</span>
                  </button>
                </div>
              </div>

              {/* Daily Interactive Quiz Section (when opened) */}
              {showDailyQuiz && (
                <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Kiểm tra nhanh từ vựng Ngày {currentDay} (Lớp {selectedGrade})
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-emerald-400">
                        Điểm: {quizScore} câu đúng
                      </span>
                      <button
                        onClick={() => setShowDailyQuiz(false)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Thoát kiểm tra
                      </button>
                    </div>
                  </div>

                  {!quizFinished && currentQuizWord ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Câu hỏi {quizQuestionIndex + 1} / {dailyWords.length}</span>
                        <span>Chọn nghĩa tiếng Việt chính xác</span>
                      </div>

                      <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between">
                        <div>
                          <div className="text-xl font-black text-white tracking-wide flex items-center gap-2">
                            <span>{currentQuizWord.word}</span>
                            <span className="text-xs font-mono font-normal text-slate-400">
                              {currentQuizWord.ipa}
                            </span>
                          </div>
                          <span className="text-xs text-indigo-400 font-semibold italic">
                            ({currentQuizWord.partOfSpeech})
                          </span>
                        </div>
                        <button
                          onClick={() => handleSpeak(currentQuizWord.word)}
                          className="p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-blue-400 transition-colors"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* 4 Answer Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {generateQuizOptions().map((opt, optIdx) => {
                          const isSelected = selectedQuizOption === optIdx;
                          const isCorrect = opt === currentQuizWord.meaningVi;
                          let btnStyle = 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700';

                          if (selectedQuizOption !== null) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-500';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-600 text-white border-rose-500';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={selectedQuizOption !== null}
                              onClick={() => handleAnswerDailyQuiz(optIdx, generateQuizOptions())}
                              className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {selectedQuizOption !== null && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Quiz Finished Summary */
                    <div className="text-center py-6 space-y-3">
                      <div className="text-4xl">🎉</div>
                      <h4 className="text-lg font-black text-white">
                        Hoàn thành bài kiểm tra Ngày {currentDay}!
                      </h4>
                      <p className="text-xs text-slate-300">
                        Em đã trả lời đúng <strong className="text-emerald-400">{quizScore}</strong> / {dailyWords.length} câu hỏi.
                        {quizScore > 0 && ' Các câu đúng đã được cộng dồn vào điều kiện mở khóa bài mới!'}
                      </p>
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          onClick={startDailyQuiz}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Làm lại
                        </button>
                        <button
                          onClick={() => setShowDailyQuiz(false)}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white"
                        >
                          Đóng kiểm tra
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* List of Daily Words Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dailyWords.map((word) => {
                  const isMastered = masteredWordIds.includes(word.id);
                  const isSaved = isWordSaved(word.id);

                  return (
                    <div
                      key={word.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 shadow-2xs ${
                        isMastered
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                      }`}
                    >
                      <div className="space-y-2">
                        {/* Word Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg sm:text-xl font-black text-slate-900">
                                {word.word}
                              </span>
                              <span className="text-xs text-slate-500 font-mono">
                                {word.ipa}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                                {word.partOfSpeech}
                              </span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                word.isCore
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}>
                                {word.isCore ? 'Cốt lõi SGK' : 'Mở rộng nâng cao'}
                              </span>
                              {word.topic && (
                                <span className="text-[10px] text-slate-500 font-medium">
                                  • {word.topic}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleSpeak(word.word)}
                            className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors border border-blue-200 shrink-0"
                            title={`Nghe phát âm (${accent})`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Meaning */}
                        <p className="text-sm font-bold text-slate-800 leading-snug">
                          {word.meaningVi}
                        </p>

                        {/* Example context */}
                        {word.exampleEn && (
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                            <p className="font-semibold text-slate-800">
                              &ldquo;{word.exampleEn}&rdquo;
                            </p>
                            <p className="text-slate-600 text-[11px]">
                              {word.exampleVi}
                            </p>
                          </div>
                        )}

                        {/* Exam note or Collocation */}
                        {(word.collocation || word.examNote) && (
                          <div className="p-2 rounded-lg bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-950 space-y-0.5">
                            {word.collocation && (
                              <div className="font-semibold flex items-center gap-1 text-amber-900">
                                <span className="text-amber-600">📌 Cụm từ:</span> {word.collocation}
                              </div>
                            )}
                            {word.examNote && (
                              <div className="text-amber-800 flex items-start gap-1">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <span>{word.examNote}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                        <button
                          onClick={() => toggleMasteredWord(word.id)}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                            isMastered
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isMastered ? 'Đã thuộc hôm nay' : 'Đánh dấu đã thuộc'}</span>
                        </button>

                        <button
                          onClick={() => onSaveWord(word.id)}
                          className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-xl border transition-colors ${
                            isSaved
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200 font-bold'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                          title="Lưu vào Sổ tay Spaced Repetition"
                        >
                          {isSaved ? (
                            <>
                              <BookmarkCheck className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Đã lưu sổ</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>Lưu sổ tay</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: BROWSE ALL KNOWLEDGE BASE WORDS (TRA CỨU TOÀN BỘ KHO KIẾN THỨC THEO KHỐI LỚP) */}
          {activeTab === 'browse' && (
            <div className="space-y-4">
              {/* Search & Filter Bar */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Search input */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Tìm từ tiếng Anh, nghĩa tiếng Việt Lớp ${selectedGrade}...`}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
                  <div className="flex items-center bg-slate-100 rounded-xl p-0.5 text-xs font-bold">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`px-2.5 py-1 rounded-lg ${filterType === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
                    >
                      Tất cả ({stats.total})
                    </button>
                    <button
                      onClick={() => setFilterType('core')}
                      className={`px-2.5 py-1 rounded-lg ${filterType === 'core' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}
                    >
                      Cốt lõi SGK ({stats.coreCount})
                    </button>
                    <button
                      onClick={() => setFilterType('advanced')}
                      className={`px-2.5 py-1 rounded-lg ${filterType === 'advanced' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-600'}`}
                    >
                      Mở rộng / B2 ({stats.advancedCount})
                    </button>
                  </div>

                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="text-xs font-medium bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none"
                  >
                    <option value="all">Mọi từ loại</option>
                    <option value="noun">Danh từ (noun)</option>
                    <option value="verb">Động từ (verb)</option>
                    <option value="adjective">Tính từ (adjective)</option>
                    <option value="phrasal verb">Cụm động từ</option>
                  </select>
                </div>
              </div>

              {/* Words Table / Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {browseWords.map((w) => {
                  const isSaved = isWordSaved(w.id);
                  return (
                    <div
                      key={w.id}
                      className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between gap-2.5"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-slate-900 text-base">
                                {w.word}
                              </span>
                              <span className="text-[11px] font-mono text-slate-500">
                                {w.ipa}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                              {w.partOfSpeech}
                            </span>
                          </div>

                          <button
                            onClick={() => handleSpeak(w.word)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs font-bold text-slate-800">
                          {w.meaningVi}
                        </p>

                        {w.exampleEn && (
                          <p className="text-[11px] text-slate-600 italic line-clamp-2">
                            &ldquo;{w.exampleEn}&rdquo;
                          </p>
                        )}

                        {w.examNote && (
                          <p className="text-[10px] text-amber-800 bg-amber-50 p-1 rounded font-medium">
                            💡 {w.examNote}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
                        <span className="text-[10px] text-slate-500">
                          {w.topic || `Lớp ${w.grade}`}
                        </span>
                        <button
                          onClick={() => onSaveWord(w.id)}
                          className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg transition-colors ${
                            isSaved
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <Bookmark className="w-3 h-3" />
                          <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {browseWords.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs space-y-2 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-3xl">🔍</div>
                  <p className="font-bold">Không tìm thấy từ vựng phù hợp với tiêu chí lọc.</p>
                  <p>Hãy thử xóa từ khóa tìm kiếm hoặc đổi sang khối lớp khác nhé!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:px-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>
              Kho từ vựng Lớp {selectedGrade}: <strong>{stats.total} từ</strong> ({stats.coreCount} cốt lõi • {stats.advancedCount} nâng cao)
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition-colors shadow-xs"
          >
            Đóng kho kiến thức
          </button>
        </div>

      </div>
    </div>
  );
};

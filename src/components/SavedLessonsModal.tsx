import React, { useState } from 'react';
import { GeneratedLesson, ReadingPassage, UserProgress } from '../types';
import {
  deleteSavedLesson,
  deleteSavedPassage,
  clearAllSavedLessons,
  clearAllSavedPassages,
} from '../utils/storageUtils';
import { audioManager } from '../utils/audioUtils';
import { EndLessonVocabCheck } from './EndLessonVocabCheck';
import {
  Bookmark,
  X,
  BookOpen,
  Sparkles,
  Trash2,
  Play,
  RotateCcw,
  CheckCircle2,
  Volume2,
  AlertTriangle,
  Search,
  Zap,
  Clock,
  Award,
  ChevronLeft,
  RefreshCw,
  Check,
  HelpCircle,
} from 'lucide-react';

interface SavedLessonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onSelectPassageForReading?: (passage: ReadingPassage) => void;
  onSelectLessonForTutor?: (lesson: GeneratedLesson) => void;
  onRecordCorrectAnswer?: () => void;
}

interface DeleteTarget {
  type: 'lesson' | 'passage' | 'all-lessons' | 'all-passages';
  id?: string;
  title: string;
}

export const SavedLessonsModal: React.FC<SavedLessonsModalProps> = ({
  isOpen,
  onClose,
  progress,
  onProgressUpdate,
  onSelectPassageForReading,
  onSelectLessonForTutor,
  onRecordCorrectAnswer,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'tutor' | 'reading'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number | 'all'>('all');

  // Active review state: currently reviewing a specific saved lesson or passage
  const [reviewingLesson, setReviewingLesson] = useState<GeneratedLesson | null>(null);
  const [reviewingPassage, setReviewingPassage] = useState<ReadingPassage | null>(null);
  const [showVocabCheckOnly, setShowVocabCheckOnly] = useState(false);

  // Lesson exercises state during review
  const [userExerciseAnswers, setUserExerciseAnswers] = useState<Record<string, string>>({});
  // Reading passage quiz state during review
  const [userPassageAnswers, setUserPassageAnswers] = useState<Record<string, number>>({});

  // In-UI Delete Confirmation state (no window.confirm alert for safe iframe execution)
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<DeleteTarget | null>(null);
  // Feedback toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  if (!isOpen) return null;

  const savedLessons = progress.savedLessons || [];
  const savedPassages = progress.savedPassages || [];

  const handleExecuteDelete = () => {
    if (!deleteConfirmTarget) return;

    if (deleteConfirmTarget.type === 'lesson' && deleteConfirmTarget.id) {
      const updated = deleteSavedLesson(deleteConfirmTarget.id);
      onProgressUpdate(updated);
      if (reviewingLesson?.id === deleteConfirmTarget.id) {
        setReviewingLesson(null);
      }
      showToast(`Đã xóa bài học "${deleteConfirmTarget.title}" khỏi kho lưu.`);
      audioManager.playEffect('click');
    } else if (deleteConfirmTarget.type === 'passage' && deleteConfirmTarget.id) {
      const updated = deleteSavedPassage(deleteConfirmTarget.id);
      onProgressUpdate(updated);
      if (reviewingPassage?.id === deleteConfirmTarget.id) {
        setReviewingPassage(null);
      }
      showToast(`Đã xóa bài đọc "${deleteConfirmTarget.title}" khỏi kho lưu.`);
      audioManager.playEffect('click');
    } else if (deleteConfirmTarget.type === 'all-lessons') {
      const updated = clearAllSavedLessons();
      onProgressUpdate(updated);
      setReviewingLesson(null);
      showToast('Đã xóa tất cả các bài học Gia sư AI đã lưu.');
      audioManager.playEffect('click');
    } else if (deleteConfirmTarget.type === 'all-passages') {
      const updated = clearAllSavedPassages();
      onProgressUpdate(updated);
      setReviewingPassage(null);
      showToast('Đã xóa tất cả các bài đọc hiểu đã lưu.');
      audioManager.playEffect('click');
    }

    setDeleteConfirmTarget(null);
  };

  // Filter lessons
  const filteredLessons = savedLessons.filter((l) => {
    const matchSearch =
      !searchQuery.trim() ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGrade = selectedGradeFilter === 'all' || l.grade === selectedGradeFilter;
    return matchSearch && matchGrade;
  });

  // Filter passages
  const filteredPassages = savedPassages.filter((p) => {
    const matchSearch =
      !searchQuery.trim() ||
      p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGrade = selectedGradeFilter === 'all' || p.grade === selectedGradeFilter;
    return matchSearch && matchGrade;
  });

  const totalSavedCount = savedLessons.length + savedPassages.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative">
        {/* Toast notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900/90 backdrop-blur-md text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-2 border border-slate-700 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
              <Bookmark className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  Kho Bài Học Đã Lưu & Học Lại
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 font-bold">
                  {totalSavedCount} bài
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Mở ra học lại bất kỳ lúc nào, luyện tập bài tập tương tác, kiểm tra từ vựng và xóa bài không cần thiết.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(reviewingLesson || reviewingPassage) && (
              <button
                onClick={() => {
                  setReviewingLesson(null);
                  setReviewingPassage(null);
                  setShowVocabCheckOnly(false);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Quay lại kho lưu</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* VIEW: REVIEWING A SPECIFIC SAVED AI LESSON */}
          {reviewingLesson && (
            <div className="space-y-6">
              {/* Review Header Banner */}
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-bold text-xs border border-indigo-300">
                      Gia sư AI • {reviewingLesson.cefrLevel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                      Lớp {reviewingLesson.grade}
                    </span>
                    <span className="text-xs text-slate-500">
                      Đã lưu: {new Date(reviewingLesson.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setShowVocabCheckOnly(!showVocabCheckOnly)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                        showVocabCheckOnly
                          ? 'bg-amber-500 text-white'
                          : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{showVocabCheckOnly ? 'Xem lại toàn bài' : 'Kiểm tra từ vựng ngay'}</span>
                    </button>

                    {onSelectLessonForTutor && (
                      <button
                        onClick={() => {
                          onSelectLessonForTutor(reviewingLesson);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-2xs transition-colors"
                        title="Tải toàn bộ bài giảng này vào màn hình Gia sư AI để học lại"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Học lại trong Gia sư AI</span>
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setDeleteConfirmTarget({
                          type: 'lesson',
                          id: reviewingLesson.id,
                          title: reviewingLesson.title,
                        })
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
                      title="Xóa bài học này khỏi kho lưu"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Xóa bài</span>
                    </button>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {reviewingLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 bg-white/80 p-3 rounded-xl border border-indigo-100">
                  <strong>Mục tiêu:</strong> {reviewingLesson.objectiveVi}
                </p>
              </div>

              {/* VOCAB CHECK MODULE IF TOGGLED */}
              {showVocabCheckOnly ? (
                <EndLessonVocabCheck
                  lessonTitle={reviewingLesson.title}
                  vocabList={reviewingLesson.vocabAndCollocations.map((v, i) => ({
                    id: `lesson-v-${i}`,
                    word: v.word,
                    ipa: v.ipa,
                    meaningVi: v.meaningVi,
                    exampleEn: v.exampleEn,
                    exampleVi: v.exampleVi,
                    partOfSpeech: v.partOfSpeech,
                    examNote: v.examNote,
                  }))}
                  onRecordCorrectAnswer={onRecordCorrectAnswer}
                  currentCorrectTotal={progress.totalCorrectAnswers || 0}
                />
              ) : (
                <>
                  {/* 1. Concept */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      1. Bản chất & Phân tích ngữ pháp
                    </h3>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {reviewingLesson.conceptExplanation}
                    </div>
                  </div>

                  {/* 2. Vocabulary */}
                  {reviewingLesson.vocabAndCollocations?.length > 0 && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-600" />
                          2. Từ vựng & Collocations cốt lõi ({reviewingLesson.vocabAndCollocations.length} từ)
                        </h3>
                        <span className="text-xs text-slate-500">Bấm loa để nghe phát âm</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {reviewingLesson.vocabAndCollocations.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 hover:border-indigo-200 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm">{item.word}</span>
                                <span className="text-xs font-mono text-slate-500">{item.ipa}</span>
                                <span className="text-[11px] text-indigo-600 italic">({item.partOfSpeech})</span>
                              </div>
                              <button
                                onClick={() => audioManager.speak(item.word, 'US')}
                                className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                                title="Nghe phát âm từ"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs font-bold text-emerald-800">{item.meaningVi}</p>
                            <div className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                              <p>"{item.exampleEn}"</p>
                              <p className="text-slate-500 italic text-[11px]">→ {item.exampleVi}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Grammar Structures */}
                  {reviewingLesson.grammarStructures?.length > 0 && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        3. Công thức & Bẫy đề thi Chuyên
                      </h3>
                      <div className="space-y-3">
                        {reviewingLesson.grammarStructures.map((struct, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/30 space-y-2"
                          >
                            <h4 className="font-bold text-indigo-950 text-xs sm:text-sm">{struct.name}</h4>
                            <div className="p-2 bg-white rounded-lg border border-indigo-200 font-mono text-xs font-bold text-indigo-900">
                              {struct.formula}
                            </div>
                            <p className="text-xs text-slate-700">
                              <strong>Ví dụ: </strong>"{struct.exampleEn}" → {struct.exampleVi}
                            </p>
                            {struct.examTrapVi && (
                              <p className="text-xs text-red-800 bg-red-50 p-2 rounded-lg border border-red-200">
                                <strong>Bẫy đề thi: </strong>{struct.examTrapVi}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. Interactive Exercises */}
                  {reviewingLesson.interactiveExercises?.length > 0 && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2 flex-wrap gap-2">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>4. Bài tập thực hành tương tác ({reviewingLesson.interactiveExercises.length} câu)</span>
                        </h3>

                        <button
                          onClick={() => {
                            setUserExerciseAnswers({});
                            audioManager.playEffect('click');
                            showToast('Đã làm mới các câu hỏi. Em có thể làm lại từ đầu!');
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                          title="Xóa kết quả đã chọn để làm lại"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                          <span>Làm lại bài tập</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {reviewingLesson.interactiveExercises.map((ex, idx) => {
                          const selected = userExerciseAnswers[ex.id];
                          const hasAnswered = !!selected;
                          const isCorrect =
                            selected?.toLowerCase().trim() === ex.correctAnswer?.toLowerCase().trim();

                          return (
                            <div
                              key={ex.id || idx}
                              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2.5"
                            >
                              <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <span>{ex.question}</span>
                              </div>

                              {ex.options && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                                  {ex.options.map((opt, oIdx) => {
                                    const isThisChosen = selected === opt;
                                    const isThisRight =
                                      opt.toLowerCase().trim() === ex.correctAnswer?.toLowerCase().trim();

                                    let style = 'bg-white border-slate-200 hover:border-blue-400 text-slate-800';
                                    if (hasAnswered) {
                                      if (isThisRight) {
                                        style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                                      } else if (isThisChosen && !isThisRight) {
                                        style = 'bg-red-50 border-red-400 text-red-950 line-through';
                                      } else {
                                        style = 'bg-slate-50 text-slate-400 border-slate-200';
                                      }
                                    }

                                    return (
                                      <button
                                        key={oIdx}
                                        disabled={hasAnswered}
                                        onClick={() => {
                                          setUserExerciseAnswers((prev) => ({ ...prev, [ex.id]: opt }));
                                          if (
                                            opt.toLowerCase().trim() ===
                                            ex.correctAnswer?.toLowerCase().trim()
                                          ) {
                                            if (onRecordCorrectAnswer) onRecordCorrectAnswer();
                                            audioManager.playEffect('correct');
                                          } else {
                                            audioManager.playEffect('incorrect');
                                          }
                                        }}
                                        className={`p-2.5 rounded-xl border text-xs text-left transition-all ${style}`}
                                      >
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}

                              {hasAnswered && (
                                <div
                                  className={`pl-7 text-xs p-2.5 rounded-xl border ${
                                    isCorrect
                                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                      : 'bg-amber-50 border-amber-200 text-amber-900'
                                  }`}
                                >
                                  <span className="font-bold">
                                    {isCorrect ? '✓ Đúng rồi! ' : '⚠ Lời giải: '}
                                  </span>
                                  <span>{ex.explanationVi}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 5. End of lesson vocab check embedded at the bottom */}
                  <div className="pt-2">
                    <EndLessonVocabCheck
                      lessonTitle={reviewingLesson.title}
                      vocabList={reviewingLesson.vocabAndCollocations.map((v, i) => ({
                        id: `lesson-v-${i}`,
                        word: v.word,
                        ipa: v.ipa,
                        meaningVi: v.meaningVi,
                        exampleEn: v.exampleEn,
                        exampleVi: v.exampleVi,
                        partOfSpeech: v.partOfSpeech,
                        examNote: v.examNote,
                      }))}
                      onRecordCorrectAnswer={onRecordCorrectAnswer}
                      currentCorrectTotal={progress.totalCorrectAnswers || 0}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* VIEW: REVIEWING A SAVED READING PASSAGE */}
          {reviewingPassage && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
                      Bài đọc {reviewingPassage.wordCount} từ ({reviewingPassage.lengthType === 'short' || reviewingPassage.wordCount <= 75 ? '⚡ 50-60 từ' : '📖 120-150 từ'})
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                      Lớp {reviewingPassage.grade} • {reviewingPassage.cefrLevel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => audioManager.speak(reviewingPassage.contentEn, 'US')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe toàn bài đọc</span>
                    </button>

                    {onSelectPassageForReading && (
                      <button
                        onClick={() => {
                          onSelectPassageForReading(reviewingPassage);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-2xs"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Mở trong Đọc hiểu AI</span>
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setDeleteConfirmTarget({
                          type: 'passage',
                          id: reviewingPassage.id,
                          title: reviewingPassage.titleEn,
                        })
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
                      title="Xóa bài đọc này khỏi kho lưu"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Xóa bài đọc</span>
                    </button>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {reviewingPassage.titleEn}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">{reviewingPassage.titleVi}</p>
              </div>

              {/* Bilingual Passage Sentences */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                  <span>Nội dung bài đọc song ngữ từng câu:</span>
                  <span className="text-xs text-slate-500 font-normal">
                    Bấm vào từng câu để nghe phát âm
                  </span>
                </h3>
                <div className="space-y-2.5">
                  {reviewingPassage.sentences.map((sentence, idx) => (
                    <div
                      key={idx}
                      onClick={() => audioManager.speak(sentence.en, 'US')}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer space-y-1"
                    >
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center justify-between">
                        <span>{sentence.en}</span>
                        <Volume2 className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-2 opacity-60" />
                      </p>
                      <p className="text-xs text-slate-500 italic">→ {sentence.vi}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Reading Quiz */}
              {reviewingPassage.quiz && reviewingPassage.quiz.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-600" />
                      <span>Câu hỏi đọc hiểu trắc nghiệm ({reviewingPassage.quiz.length} câu)</span>
                    </h3>
                    <button
                      onClick={() => {
                        setUserPassageAnswers({});
                        audioManager.playEffect('click');
                        showToast('Đã làm mới câu hỏi đọc hiểu!');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                      <span>Làm lại trắc nghiệm</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {reviewingPassage.quiz.map((q, qIdx) => {
                      const selectedIdx = userPassageAnswers[q.id];
                      const hasAnswered = selectedIdx !== undefined;
                      const isCorrect = selectedIdx === q.correctIndex;

                      return (
                        <div
                          key={q.id || qIdx}
                          className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2.5"
                        >
                          <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                              {qIdx + 1}
                            </span>
                            <span>{q.question}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                            {q.options.map((opt, optIdx) => {
                              const isThisChosen = selectedIdx === optIdx;
                              const isThisRight = optIdx === q.correctIndex;

                              let style = 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800';
                              if (hasAnswered) {
                                if (isThisRight) {
                                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                                } else if (isThisChosen && !isThisRight) {
                                  style = 'bg-red-50 border-red-400 text-red-950 line-through';
                                } else {
                                  style = 'bg-slate-50 text-slate-400 border-slate-200';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  disabled={hasAnswered}
                                  onClick={() => {
                                    setUserPassageAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                                    if (optIdx === q.correctIndex) {
                                      if (onRecordCorrectAnswer) onRecordCorrectAnswer();
                                      audioManager.playEffect('correct');
                                    } else {
                                      audioManager.playEffect('incorrect');
                                    }
                                  }}
                                  className={`p-2.5 rounded-xl border text-xs text-left transition-all ${style}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {hasAnswered && (
                            <div
                              className={`pl-7 text-xs p-2.5 rounded-xl border ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                  : 'bg-amber-50 border-amber-200 text-amber-900'
                              }`}
                            >
                              <span className="font-bold">
                                {isCorrect ? '✓ Hoàn toàn chính xác! ' : '⚠ Dẫn chứng & Lời giải: '}
                              </span>
                              <span>{q.explanationVi}</span>
                              {q.clueSentenceEn && (
                                <p className="mt-1 text-[11px] text-slate-600 italic">
                                  Dẫn chứng bài đọc: "{q.clueSentenceEn}"
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* End of Passage Vocabulary Check */}
              {reviewingPassage.vocabAnalysis?.length > 0 && (
                <div className="pt-2">
                  <EndLessonVocabCheck
                    lessonTitle={reviewingPassage.titleEn}
                    vocabList={reviewingPassage.vocabAnalysis.map((v, i) => ({
                      id: `reading-v-${i}`,
                      word: v.word,
                      ipa: v.ipa,
                      meaningVi: v.meaningVi,
                      exampleEn: v.contextSentence,
                      partOfSpeech: v.partOfSpeech,
                      examNote: v.examTipVi,
                    }))}
                    onRecordCorrectAnswer={onRecordCorrectAnswer}
                    currentCorrectTotal={progress.totalCorrectAnswers || 0}
                  />
                </div>
              )}
            </div>
          )}

          {/* VIEW: MAIN LIST OF SAVED LESSONS & PASSAGES */}
          {!reviewingLesson && !reviewingPassage && (
            <div className="space-y-4">
              {/* Filter and search bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs font-bold w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      activeTab === 'all'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tất cả ({totalSavedCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('tutor')}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      activeTab === 'tutor'
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Gia sư AI ({savedLessons.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('reading')}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      activeTab === 'reading'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Đọc hiểu AI ({savedPassages.length})
                  </button>
                </div>

                {/* Search & Grade Filter & Clear all */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-48">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm bài đã lưu..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <select
                    value={selectedGradeFilter}
                    onChange={(e) =>
                      setSelectedGradeFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
                    }
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 font-medium focus:outline-none"
                  >
                    <option value="all">Tất cả khối</option>
                    {[3, 4, 5, 6, 7, 8, 9].map((g) => (
                      <option key={g} value={g}>
                        Khối {g}
                      </option>
                    ))}
                  </select>

                  {totalSavedCount > 0 && (
                    <button
                      onClick={() =>
                        setDeleteConfirmTarget({
                          type: activeTab === 'reading' ? 'all-passages' : 'all-lessons',
                          title:
                            activeTab === 'reading'
                              ? 'tất cả bài đọc hiểu đã lưu'
                              : 'tất cả bài học Gia sư AI đã lưu',
                        })
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                      title="Xóa nhanh danh sách"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Dọn dẹp</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Reminder */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-950 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Tiến độ hoàn thành: <strong>{progress.totalCorrectAnswers || 0} / 70 câu đúng</strong>{' '}
                    để mở khóa các cấp độ tiếp theo. Bấm vào bất kỳ bài nào dưới đây để <strong>học lại</strong> và tích lũy điểm!
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-extrabold text-[11px] ${
                    (progress.totalCorrectAnswers || 0) >= 70
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  {(progress.totalCorrectAnswers || 0) >= 70
                    ? '✓ Đạt chuẩn >70%'
                    : `Cần thêm ${Math.max(0, 70 - (progress.totalCorrectAnswers || 0))} câu`}
                </span>
              </div>

              {/* Empty state */}
              {totalSavedCount === 0 && (
                <div className="p-10 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                  <div className="text-3xl">📚</div>
                  <h4 className="text-sm font-bold text-slate-800">Chưa có bài học nào được lưu</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Trong khi học với Gia sư AI hoặc đọc hiểu AI, em hãy bấm nút "Lưu bài học" để bài được đưa vào đây, giúp em dễ dàng mở ra học lại bất kỳ lúc nào!
                  </p>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                {/* 1. AI Tutor Lessons */}
                {(activeTab === 'all' || activeTab === 'tutor') &&
                  filteredLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => setReviewingLesson(lesson)}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            🤖 Gia sư AI
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-blue-50 text-blue-700">
                            Lớp {lesson.grade}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-700">
                            {lesson.cefrLevel}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(lesson.createdAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {lesson.title}
                        </h4>

                        <p className="text-xs text-slate-500 line-clamp-1">
                          {lesson.objectiveVi}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setReviewingLesson(lesson);
                            setShowVocabCheckOnly(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-colors flex items-center gap-1"
                          title="Làm bài kiểm tra từ vựng của bài này"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-600" />
                          <span>Kiểm tra từ</span>
                        </button>

                        <button
                          onClick={() => setReviewingLesson(lesson)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs transition-colors flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Học lại ngay</span>
                        </button>

                        {onSelectLessonForTutor && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectLessonForTutor(lesson);
                              onClose();
                            }}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 border border-blue-200 transition-colors"
                            title="Mở vào màn hình Gia sư AI"
                          >
                            <Play className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmTarget({
                              type: 'lesson',
                              id: lesson.id,
                              title: lesson.title,
                            });
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Xóa bài lưu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                {/* 2. Reading Passages */}
                {(activeTab === 'all' || activeTab === 'reading') &&
                  filteredPassages.map((passage) => (
                    <div
                      key={passage.id}
                      onClick={() => setReviewingPassage(passage)}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            📖 Bài đọc AI ({passage.wordCount} từ)
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-blue-50 text-blue-700">
                            Lớp {passage.grade}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-700">
                            {passage.cefrLevel}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(passage.createdAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {passage.titleEn}
                        </h4>

                        <p className="text-xs text-slate-500 line-clamp-1">
                          {passage.titleVi} • {passage.topic}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => setReviewingPassage(passage)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-colors flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Học & Đọc lại</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmTarget({
                              type: 'passage',
                              id: passage.id,
                              title: passage.titleEn,
                            });
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Xóa bài đọc lưu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* IN-UI CONFIRMATION MODAL FOR DELETION (NO POPUP / NO BROWSER ALERT) */}
        {deleteConfirmTarget && (
          <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Xác nhận xóa bài khỏi kho lưu?
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {deleteConfirmTarget.type.startsWith('all')
                      ? `Bạn có chắc chắn muốn xóa ${deleteConfirmTarget.title}?`
                      : `Bài: "${deleteConfirmTarget.title}"`}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                Hành động này sẽ xóa bài học khỏi danh sách đã lưu trên thiết bị của bạn. Bạn vẫn có thể yêu cầu Gia sư AI tạo các bài học mới bất kỳ lúc nào.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirmTarget(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleExecuteDelete}
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

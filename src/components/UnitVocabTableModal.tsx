import React, { useState, useMemo } from 'react';
import { WordItem, UnitData, UserProgress } from '../types';
import { audioManager, Accent } from '../utils/audioUtils';
import {
  X,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Search,
  BookOpen,
  Sparkles,
  Layers,
  CheckCircle2,
  Filter,
  ArrowUpDown,
  GraduationCap,
  Award,
  Star,
  Zap,
} from 'lucide-react';

interface UnitVocabTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: UnitData;
  progress: UserProgress;
  onSaveWord: (wordId: string) => void;
  onAddXP?: (xp: number) => void;
  onOpenPracticeMode?: (mode: 'flashcards' | 'listen-choose' | 'fill-blank') => void;
}

export const UnitVocabTableModal: React.FC<UnitVocabTableModalProps> = ({
  isOpen,
  onClose,
  unit,
  progress,
  onSaveWord,
  onAddXP,
  onOpenPracticeMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'core' | 'advanced' | 'saved'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [accent, setAccent] = useState<Accent>('US');
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  if (!isOpen) return null;

  const savedWordIds = useMemo(() => {
    return new Set(progress.savedNotebookWords.map((w) => w.wordId));
  }, [progress.savedNotebookWords]);

  const filteredWords = useMemo(() => {
    return unit.vocabularies.filter((w) => {
      // Search filter
      const matchesSearch =
        searchTerm.trim() === '' ||
        w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.meaningVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.partOfSpeech.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // Category filter
      if (activeFilter === 'core') return w.isCore;
      if (activeFilter === 'advanced') return !w.isCore;
      if (activeFilter === 'saved') {
        return savedWordIds.has(w.id) || savedWordIds.has(`vocab-${w.word.toLowerCase()}`);
      }
      return true;
    });
  }, [unit.vocabularies, searchTerm, activeFilter, savedWordIds]);

  const coreCount = unit.vocabularies.filter((w) => w.isCore).length;
  const advancedCount = unit.vocabularies.filter((w) => !w.isCore).length;
  const savedInUnitCount = unit.vocabularies.filter(
    (w) => savedWordIds.has(w.id) || savedWordIds.has(`vocab-${w.word.toLowerCase()}`)
  ).length;

  const handleSpeak = (word: WordItem) => {
    setPlayingWordId(word.id);
    audioManager.speak(word.word, accent).then(() => {
      setPlayingWordId(null);
    });
  };

  const getPartOfSpeechBadge = (pos: string) => {
    const p = pos.toLowerCase();
    if (p.includes('n') || p.includes('danh')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    if (p.includes('v') || p.includes('động')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
    if (p.includes('adj') || p.includes('tính')) {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    if (p.includes('adv') || p.includes('trạng')) {
      return 'bg-purple-100 text-purple-800 border-purple-200';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div
      id="unit-vocab-table-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
    >
      <div
        id="unit-vocab-table-modal-card"
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl border border-white/20 shadow-inner">
                {unit.isB2Chuyen ? '🏆' : '📚'}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-2xs">
                    <BookOpen className="w-3 h-3" />
                    Bảng Toàn Bộ Từ Vựng
                  </span>
                  <span className="text-xs text-blue-100 font-semibold">
                    Lớp {unit.grade} • {unit.isB2Chuyen ? 'Chuyên B2' : `Unit ${unit.unitNumber}`}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black tracking-tight mt-0.5">
                  {unit.title}
                </h2>
                <p className="text-xs text-blue-100/90 mt-0.5">
                  Chủ đề: <strong>{unit.themeVi}</strong> • Tổng cộng{' '}
                  <strong>{unit.vocabularies.length} từ vựng</strong> chuẩn chương trình GDPT 2018
                </p>
              </div>
            </div>

            {/* Accent selection */}
            <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/20 self-start sm:self-auto">
              <span className="text-[11px] font-semibold text-blue-200 pl-1.5 hidden md:inline">
                Giọng đọc:
              </span>
              <button
                onClick={() => setAccent('US')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  accent === 'US' ? 'bg-white text-blue-900 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                🇺🇸 US (Mỹ)
              </button>
              <button
                onClick={() => setAccent('UK')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  accent === 'UK' ? 'bg-white text-blue-900 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                🇬🇧 UK (Anh)
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng bảng từ vựng"
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Stats Badges, Search & Filters */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          {/* Summary Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center gap-1.5 ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>Tất cả</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
                {unit.vocabularies.length}
              </span>
            </button>

            <button
              onClick={() => setActiveFilter('core')}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center gap-1.5 ${
                activeFilter === 'core'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Cốt lõi SGK</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono">
                {coreCount}
              </span>
            </button>

            {advancedCount > 0 && (
              <button
                onClick={() => setActiveFilter('advanced')}
                className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center gap-1.5 ${
                  activeFilter === 'advanced'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Nâng cao & Mở rộng</span>
                <span className="px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800 text-[10px] font-mono">
                  {advancedCount}
                </span>
              </button>
            )}

            <button
              onClick={() => setActiveFilter('saved')}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center gap-1.5 ${
                activeFilter === 'saved'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Đã lưu vào Sổ tay</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono">
                {savedInUnitCount}
              </span>
            </button>
          </div>

          {/* Search Bar & View Mode Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm từ vựng theo từ tiếng Anh, nghĩa tiếng Việt, hoặc từ loại (n, v, adj)..."
                className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 self-end sm:self-auto shrink-0">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>📋 Chế độ Bảng</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'cards'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>🎴 Thẻ Flashcard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Body: Table or Cards */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {filteredWords.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-2xl">
                🔍
              </div>
              <h4 className="text-sm font-bold text-slate-700">
                Không tìm thấy từ vựng nào phù hợp
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Hãy thử tìm với từ khóa khác hoặc bấm nút "Tất cả" để xem toàn bộ từ vựng của Unit.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-100 transition-colors"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : viewMode === 'table' ? (
            /* Detailed Table View */
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 text-[11px] font-black uppercase tracking-wider text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-3 w-12 text-center">STT</th>
                    <th className="py-3 px-4 min-w-[150px]">Từ vựng</th>
                    <th className="py-3 px-3 min-w-[110px]">Phiên âm IPA</th>
                    <th className="py-3 px-3 w-20 text-center">Từ loại</th>
                    <th className="py-3 px-4 min-w-[170px]">Nghĩa tiếng Việt</th>
                    <th className="py-3 px-4 min-w-[260px]">Câu ví dụ thực tế</th>
                    <th className="py-3 px-3 w-24 text-center">Sổ tay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredWords.map((word, index) => {
                    const isSaved =
                      savedWordIds.has(word.id) ||
                      savedWordIds.has(`vocab-${word.word.toLowerCase()}`);
                    const isSpeaking = playingWordId === word.id;

                    return (
                      <tr
                        key={word.id}
                        className={`hover:bg-blue-50/40 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                        }`}
                      >
                        {/* STT */}
                        <td className="py-3.5 px-3 text-center font-mono text-slate-400 font-medium">
                          {index + 1}
                        </td>

                        {/* Word & Audio */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSpeak(word)}
                              title={`Nghe phát âm "${word.word}" (${accent})`}
                              className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                                isSpeaking
                                  ? 'bg-blue-600 text-white border-blue-600 animate-pulse'
                                  : 'bg-slate-100 hover:bg-blue-100 text-blue-600 border-slate-200'
                              }`}
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-extrabold text-slate-900 text-sm">
                                  {word.word}
                                </span>
                                {word.isCore ? (
                                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                                    SGK
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 border border-purple-200">
                                    Nâng cao
                                  </span>
                                )}
                              </div>
                              {word.collocation && (
                                <span className="text-[10px] text-indigo-600 font-medium block">
                                  + {word.collocation}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* IPA */}
                        <td className="py-3.5 px-3 font-mono text-slate-600 text-xs">
                          {word.ipa || '—'}
                        </td>

                        {/* Part of Speech */}
                        <td className="py-3.5 px-3 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPartOfSpeechBadge(
                              word.partOfSpeech
                            )}`}
                          >
                            {word.partOfSpeech}
                          </span>
                        </td>

                        {/* Vietnamese Meaning */}
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {word.meaningVi}
                        </td>

                        {/* Examples */}
                        <td className="py-3.5 px-4 space-y-0.5">
                          <p className="text-slate-800 font-medium italic leading-snug">
                            "{word.exampleEn}"
                          </p>
                          {word.exampleVi && (
                            <p className="text-slate-500 text-[11px] leading-snug">
                              → {word.exampleVi}
                            </p>
                          )}
                          {word.examNote && (
                            <p className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                              💡 Mẹo thi: {word.examNote}
                            </p>
                          )}
                        </td>

                        {/* Save to Notebook Action */}
                        <td className="py-3.5 px-3 text-center">
                          <button
                            onClick={() => onSaveWord(word.id)}
                            className={`p-2 rounded-xl border transition-all inline-flex items-center justify-center ${
                              isSaved
                                ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-2xs'
                                : 'bg-slate-100 text-slate-500 hover:text-amber-700 hover:bg-amber-50 border-slate-200'
                            }`}
                            title={isSaved ? 'Đã lưu vào sổ tay (Bấm để bỏ)' : 'Lưu vào sổ tay cá nhân'}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-500" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Cards Grid View for visual / kid-friendly learning */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredWords.map((word) => {
                const isSaved =
                  savedWordIds.has(word.id) ||
                  savedWordIds.has(`vocab-${word.word.toLowerCase()}`);
                const isSpeaking = playingWordId === word.id;

                return (
                  <div
                    key={word.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-base font-black text-slate-900">{word.word}</span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPartOfSpeechBadge(
                              word.partOfSpeech
                            )}`}
                          >
                            {word.partOfSpeech}
                          </span>
                          {word.isCore ? (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                              SGK
                            </span>
                          ) : (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">
                              Nâng cao
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => onSaveWord(word.id)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isSaved
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-slate-100 text-slate-400 hover:text-amber-600 border-slate-200'
                          }`}
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                        <span>{word.ipa || '—'}</span>
                        <button
                          onClick={() => handleSpeak(word)}
                          className={`p-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors ${
                            isSpeaking ? 'animate-pulse' : ''
                          }`}
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs font-bold text-blue-950 bg-blue-50/60 p-2 rounded-xl border border-blue-100">
                        {word.meaningVi}
                      </p>

                      <div className="text-[11px] space-y-1 text-slate-600">
                        <p className="italic font-medium">"{word.exampleEn}"</p>
                        {word.exampleVi && <p className="text-slate-500">→ {word.exampleVi}</p>}
                      </div>
                    </div>

                    {word.examNote && (
                      <div className="pt-2 border-t border-slate-100 text-[10px] text-amber-800 font-semibold flex items-center gap-1">
                        <span>💡 {word.examNote}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer: Quick Practice Shortcuts */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-500">
            Hiển thị <strong>{filteredWords.length}</strong> / {unit.vocabularies.length} từ vựng
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onOpenPracticeMode && (
              <>
                <button
                  onClick={() => {
                    onClose();
                    onOpenPracticeMode('flashcards');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold border border-blue-200 transition-all flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Luyện Flashcards</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenPracticeMode('listen-choose');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold border border-purple-200 transition-all flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Luyện Nghe & Chọn</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-all"
            >
              Đóng bảng từ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

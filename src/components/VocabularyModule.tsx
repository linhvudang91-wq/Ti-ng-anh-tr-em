import React, { useState, useMemo, useEffect } from 'react';
import { WordItem, UserProgress, GradeLevel } from '../types';
import { audioManager, Accent } from '../utils/audioUtils';
import {
  Volume2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Layers,
  ArrowRight,
  Calendar,
  Headphones,
  Edit3,
  Flame,
  Check,
  Zap,
  HelpCircle,
} from 'lucide-react';
import { THEMATIC_CLUSTERS } from '../data/thematicVocabulary';
import { getWordsByGrade } from '../data/gradeKnowledgeBase';

interface VocabularyModuleProps {
  words: WordItem[];
  progress: UserProgress;
  onSaveWord: (wordId: string) => void;
  onAddXP: (xp: number) => void;
  grade: number;
  onSwitchToReading?: (topic?: string) => void;
  onOpenDailyVocab?: () => void;
}

type PracticeMode = 'thematic-clusters' | 'flashcards' | 'listen-choose' | 'fill-blank' | 'spelling-bee' | 'memory-match';

export const VocabularyModule: React.FC<VocabularyModuleProps> = ({
  words,
  progress,
  onSaveWord,
  onAddXP,
  grade,
  onSwitchToReading,
  onOpenDailyVocab,
}) => {
  const [activeMode, setActiveMode] = useState<PracticeMode>('thematic-clusters');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [accent, setAccent] = useState<Accent>('US');
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterCoreOnly, setFilterCoreOnly] = useState(false);

  // Grade-appropriate vocabulary configuration & selective advanced expansion
  const [enableAdvancedExpansion, setEnableAdvancedExpansion] = useState(false);
  const [showAllGrades, setShowAllGrades] = useState(false);

  // Listen & Choose enhanced states
  const [listenTargetType, setListenTargetType] = useState<'english' | 'vietnamese'>('english');
  const [listenSpeed, setListenSpeed] = useState<number>(grade <= 5 ? 0.8 : 1.0);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [listenStats, setListenStats] = useState({ correct: 0, total: 0, streak: 0 });

  // Fill in the blank states
  const [fillBlankOptionIndex, setFillBlankOptionIndex] = useState<number | null>(null);

  // Spelling state
  const [spellingInput, setSpellingInput] = useState('');
  const [spellingFeedback, setSpellingFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showSpellingHint, setShowSpellingHint] = useState(false);

  // Memory match state
  const [memoryCards, setMemoryCards] = useState<{ id: string; text: string; matchId: string; type: 'en' | 'vi'; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // Thematic clusters resolution
  const activeCluster = selectedTopicId ? THEMATIC_CLUSTERS.find((c) => c.id === selectedTopicId) : null;
  const clusterWords = activeCluster ? activeCluster.words : [];

  // Enriched vocabulary pool with knowledge base words for the current grade
  const kbGradeWords = useMemo(() => getWordsByGrade(grade as GradeLevel), [grade]);
  const enrichedUnitWords = useMemo(() => {
    return [
      ...words,
      ...kbGradeWords.filter((kw) => !words.some((w) => w.word.toLowerCase() === kw.word.toLowerCase())),
    ];
  }, [words, kbGradeWords]);

  const combinedWords = useMemo(() => {
    if (selectedTopicId) {
      return clusterWords.length > 0
        ? clusterWords
        : enrichedUnitWords.filter((w) => w.topicKey === selectedTopicId || w.topic === activeCluster?.nameVi);
    }
    return enrichedUnitWords;
  }, [selectedTopicId, clusterWords, enrichedUnitWords, activeCluster]);

  // Grade-appropriate filtering: only expand advanced vocabulary if explicitly enabled
  const filteredWords = useMemo(() => {
    const list = combinedWords.filter((w) => {
      if (!enableAdvancedExpansion && !w.isCore) {
        return false;
      }
      if (filterCoreOnly && !w.isCore) {
        return false;
      }
      return true;
    });
    return list.length > 0 ? list : combinedWords;
  }, [combinedWords, enableAdvancedExpansion, filterCoreOnly]);

  const currentWord: WordItem = filteredWords[currentWordIndex] || filteredWords[0] || words[0];

  // Clusters filtered by student grade level
  const availableClusters = showAllGrades
    ? THEMATIC_CLUSTERS
    : THEMATIC_CLUSTERS.filter((c) => grade >= c.gradeRange[0] && grade <= c.gradeRange[1]);
  const displayedClusters = availableClusters.length > 0 ? availableClusters : THEMATIC_CLUSTERS;

  // Speak helper
  const handleSpeak = (text: string, customSpeed?: number) => {
    audioManager.speak(text, accent, customSpeed !== undefined ? customSpeed : grade <= 5 ? 0.8 : 0.95);
  };

  const isSaved = (wordId: string) => {
    return progress.savedNotebookWords.some((w) => w.wordId === wordId);
  };

  // Safe escape string for regex
  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Comprehensive Grade 3-4-5 (Primary) backup curriculum vocabulary
  const primaryBackupWords: WordItem[] = [
    { id: 'pb-1', word: 'friend', meaningVi: 'người bạn', ipa: '/frend/', partOfSpeech: 'n', exampleEn: 'He is my best friend.', exampleVi: 'Cậu ấy là người bạn thân nhất của tôi.', isCore: true, unitId: 'pri-core', grade: 3 },
    { id: 'pb-2', word: 'teacher', meaningVi: 'thầy cô giáo', ipa: '/ˈtiːtʃər/', partOfSpeech: 'n', exampleEn: 'My English teacher is very kind.', exampleVi: 'Cô giáo tiếng Anh của tôi rất tốt bụng.', isCore: true, unitId: 'pri-core', grade: 3 },
    { id: 'pb-3', word: 'school', meaningVi: 'trường học', ipa: '/skuːl/', partOfSpeech: 'n', exampleEn: 'I love going to school.', exampleVi: 'Tôi rất thích đến trường học.', isCore: true, unitId: 'pri-core', grade: 3 },
    { id: 'pb-4', word: 'family', meaningVi: 'gia đình', ipa: '/ˈfæməli/', partOfSpeech: 'n', exampleEn: 'My family has four people.', exampleVi: 'Gia đình tôi có bốn người.', isCore: true, unitId: 'pri-core', grade: 3 },
    { id: 'pb-5', word: 'student', meaningVi: 'học sinh', ipa: '/ˈstjuːdnt/', partOfSpeech: 'n', exampleEn: 'She is a good student.', exampleVi: 'Cô ấy là một học sinh chăm ngoan.', isCore: true, unitId: 'pri-core', grade: 3 },
    { id: 'pb-6', word: 'pencil', meaningVi: 'bút chì', ipa: '/ˈpensl/', partOfSpeech: 'n', exampleEn: 'I have a new pencil.', exampleVi: 'Tớ có một chiếc bút chì mới.', isCore: true, unitId: 'pri-core', grade: 3 },
    { id: 'pb-7', word: 'ruler', meaningVi: 'thước kẻ', ipa: '/ˈruːlər/', partOfSpeech: 'n', exampleEn: 'Can I borrow your ruler?', exampleVi: 'Tớ mượn thước kẻ của bạn được không?', isCore: true, unitId: 'pri-core', grade: 3 },
    { id: 'pb-8', word: 'eraser', meaningVi: 'cục tẩy', ipa: '/ɪˈreɪsər/', partOfSpeech: 'n', exampleEn: 'This eraser is small and white.', exampleVi: 'Cục tẩy này nhỏ và màu trắng.', isCore: true, unitId: 'pri-core', grade: 3 },
    { id: 'pb-9', word: 'breakfast', meaningVi: 'bữa sáng', ipa: '/ˈbrekfəst/', partOfSpeech: 'n', exampleEn: 'I eat breakfast at 6:30.', exampleVi: 'Tôi ăn bữa sáng lúc 6 giờ 30.', isCore: true, unitId: 'pri-core', grade: 4 },
    { id: 'pb-10', word: 'birthday', meaningVi: 'ngày sinh nhật', ipa: '/ˈbɜːrθdeɪ/', partOfSpeech: 'n', exampleEn: 'When is your birthday?', exampleVi: 'Sinh nhật của bạn vào khi nào?', isCore: true, unitId: 'pri-core', grade: 4 },
    { id: 'pb-11', word: 'swimming', meaningVi: 'bơi lội', ipa: '/ˈswɪmɪŋ/', partOfSpeech: 'n', exampleEn: 'I like swimming in summer.', exampleVi: 'Tớ thích đi bơi vào mùa hè.', isCore: true, unitId: 'pri-core', grade: 4 },
    { id: 'pb-12', word: 'doctor', meaningVi: 'bác sĩ', ipa: '/ˈdɑːktər/', partOfSpeech: 'n', exampleEn: 'My father is a doctor.', exampleVi: 'Bố tớ là một bác sĩ.', isCore: true, unitId: 'pri-core', grade: 5 },
    { id: 'pb-13', word: 'hometown', meaningVi: 'quê hương', ipa: '/ˈhoʊmtaʊn/', partOfSpeech: 'n', exampleEn: 'Da Nang is my beautiful hometown.', exampleVi: 'Đà Nẵng là quê hương tươi đẹp của tớ.', isCore: true, unitId: 'pri-core', grade: 5 },
    { id: 'pb-14', word: 'weather', meaningVi: 'thời tiết', ipa: '/ˈweðər/', partOfSpeech: 'n', exampleEn: 'The weather is sunny today.', exampleVi: 'Thời tiết hôm nay thật nắng đẹp.', isCore: true, unitId: 'pri-core', grade: 5 },
    { id: 'pb-15', word: 'holiday', meaningVi: 'kỳ nghỉ', ipa: '/ˈhɑːlədeɪ/', partOfSpeech: 'n', exampleEn: 'Where did you go on holiday?', exampleVi: 'Bạn đã đi đâu vào kỳ nghỉ?', isCore: true, unitId: 'pri-core', grade: 5 },
  ];

  // Comprehensive Grade 6-7-8 (Secondary) backup curriculum vocabulary
  const secondaryBackupWords: WordItem[] = [
    { id: 'sb-1', word: 'neighborhood', meaningVi: 'khu dân cư / vùng lân cận', ipa: '/ˈneɪbərhʊd/', partOfSpeech: 'n', exampleEn: 'I live in a quiet neighborhood.', exampleVi: 'Tôi sống ở một khu dân cư yên tĩnh.', isCore: true, unitId: 'sec-core', grade: 6 },
    { id: 'sb-2', word: 'community', meaningVi: 'cộng đồng', ipa: '/kəˈmjuːnəti/', partOfSpeech: 'n', exampleEn: 'We should help our community.', exampleVi: 'Chúng ta nên giúp đỡ cộng đồng của mình.', isCore: true, unitId: 'sec-core', grade: 6 },
    { id: 'sb-3', word: 'appliance', meaningVi: 'thiết bị gia dụng', ipa: '/əˈplaɪəns/', partOfSpeech: 'n', exampleEn: 'Smart appliances save electricity.', exampleVi: 'Các thiết bị gia dụng thông minh tiết kiệm điện.', isCore: true, unitId: 'sec-core', grade: 6 },
    { id: 'sb-4', word: 'volunteer', meaningVi: 'tình nguyện viên', ipa: '/ˌvɑːlənˈtɪr/', partOfSpeech: 'n', exampleEn: 'She joined the school volunteer club.', exampleVi: 'Cô ấy đã tham gia câu lạc bộ tình nguyện của trường.', isCore: true, unitId: 'sec-core', grade: 7 },
    { id: 'sb-5', word: 'renewable', meaningVi: 'có thể tái tạo (năng lượng)', ipa: '/rɪˈnuːəbl/', partOfSpeech: 'adj', exampleEn: 'Solar power is a renewable energy source.', exampleVi: 'Năng lượng mặt trời là nguồn năng lượng tái tạo.', isCore: true, unitId: 'sec-core', grade: 7 },
    { id: 'sb-6', word: 'traditional', meaningVi: 'truyền thống', ipa: '/trəˈdɪʃənl/', partOfSpeech: 'adj', exampleEn: 'Ao dai is a traditional Vietnamese costume.', exampleVi: 'Áo dài là trang phục truyền thống của Việt Nam.', isCore: true, unitId: 'sec-core', grade: 7 },
    { id: 'sb-7', word: 'environment', meaningVi: 'môi trường', ipa: '/ɪnˈvaɪrənmənt/', partOfSpeech: 'n', exampleEn: 'We must protect our natural environment.', exampleVi: 'Chúng ta phải bảo vệ môi trường tự nhiên.', isCore: true, unitId: 'sec-core', grade: 8 },
    { id: 'sb-8', word: 'pollution', meaningVi: 'sự ô nhiễm', ipa: '/pəˈluːʃn/', partOfSpeech: 'n', exampleEn: 'Air pollution causes respiratory problems.', exampleVi: 'Ô nhiễm không khí gây ra các vấn đề về hô hấp.', isCore: true, unitId: 'sec-core', grade: 8 },
    { id: 'sb-9', word: 'disaster', meaningVi: 'thảm họa thiên tai', ipa: '/dɪˈzæstər/', partOfSpeech: 'n', exampleEn: 'Floods are a common natural disaster.', exampleVi: 'Lũ lụt là một thảm họa thiên tai phổ biến.', isCore: true, unitId: 'sec-core', grade: 8 },
    { id: 'sb-10', word: 'technology', meaningVi: 'công nghệ', ipa: '/tekˈnɑːlədʒi/', partOfSpeech: 'n', exampleEn: 'Modern technology improves our daily life.', exampleVi: 'Công nghệ hiện đại nâng cao cuộc sống hàng ngày.', isCore: true, unitId: 'sec-core', grade: 8 },
  ];

  // GENERATE EXACTLY 4 DISTINCT HIGH-QUALITY OPTIONS FOR A TARGET WORD
  const generateFourOptions = (target: WordItem): WordItem[] => {
    if (!target) return [];

    const targetWordClean = target.word.toLowerCase().trim();
    const targetMeaningClean = target.meaningVi.toLowerCase().trim();

    const seenWords = new Set<string>([targetWordClean]);
    const seenMeanings = new Set<string>([targetMeaningClean]);
    const distractors: WordItem[] = [];

    const tryAddWord = (w: WordItem) => {
      if (!w || !w.word || !w.meaningVi) return false;
      const wClean = w.word.toLowerCase().trim();
      const mClean = w.meaningVi.toLowerCase().trim();
      if (!seenWords.has(wClean) && !seenMeanings.has(mClean)) {
        seenWords.add(wClean);
        seenMeanings.add(mClean);
        distractors.push(w);
        return true;
      }
      return false;
    };

    // 1. Prioritize words from current lesson / filtered cluster
    for (const w of filteredWords) {
      tryAddWord(w);
    }

    // 2. Add from all unit words in the current lesson
    if (distractors.length < 3) {
      for (const w of words) {
        tryAddWord(w);
      }
    }

    // 3. Add from grade knowledge base
    if (distractors.length < 3) {
      for (const w of kbGradeWords) {
        tryAddWord(w);
        if (distractors.length >= 10) break;
      }
    }

    // 4. Add from grade-specific curriculum backup (Primary 3-4-5 vs Secondary 6-7-8)
    if (distractors.length < 3) {
      const backupList = grade <= 5 ? primaryBackupWords : secondaryBackupWords;
      for (const w of backupList) {
        tryAddWord(w);
      }
    }

    // Pick 3 distractors randomly
    const pickedDistractors = [...distractors].sort(() => Math.random() - 0.5).slice(0, 3);

    // Combine target and distractors and shuffle so the correct answer is randomized (A, B, C, or D)
    return [target, ...pickedDistractors].sort(() => Math.random() - 0.5);
  };

  // Memorize generated options for the active question
  const currentOptions = useMemo(() => {
    return generateFourOptions(currentWord);
  }, [currentWord?.id, currentWord?.word, filteredWords, currentWordIndex]);

  // Autoplay audio on question change in listen-choose mode
  useEffect(() => {
    setSelectedOptionIndex(null);
    setFillBlankOptionIndex(null);
    setSpellingFeedback(null);
    setSpellingInput('');
    setShowSpellingHint(false);

    if (activeMode === 'listen-choose' && currentWord && autoPlayAudio) {
      const timer = setTimeout(() => {
        handleSpeak(currentWord.word, listenSpeed);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentWordIndex, activeMode, listenTargetType, currentWord?.id]);

  // Memory Game setup
  const startMemoryGame = () => {
    const subset = filteredWords.slice(0, 4);
    const cards: { id: string; text: string; matchId: string; type: 'en' | 'vi'; isFlipped: boolean; isMatched: boolean }[] = [];
    subset.forEach((w) => {
      cards.push({ id: `en-${w.id}`, text: w.word, matchId: w.id, type: 'en', isFlipped: false, isMatched: false });
      cards.push({ id: `vi-${w.id}`, text: w.meaningVi, matchId: w.id, type: 'vi', isFlipped: false, isMatched: false });
    });
    cards.sort(() => Math.random() - 0.5);
    setMemoryCards(cards);
    setSelectedCards([]);
    setActiveMode('memory-match');
  };

  const handleCardClick = (index: number) => {
    if (selectedCards.length >= 2 || memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    const newCards = [...memoryCards];
    newCards[index].isFlipped = true;
    const newSelected = [...selectedCards, index];
    setMemoryCards(newCards);
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (newCards[first].matchId === newCards[second].matchId && newCards[first].type !== newCards[second].type) {
        setTimeout(() => {
          newCards[first].isMatched = true;
          newCards[second].isMatched = true;
          setMemoryCards([...newCards]);
          setSelectedCards([]);
          onAddXP(10);
        }, 400);
      } else {
        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setMemoryCards([...newCards]);
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  const handleSpellingCheck = () => {
    if (!currentWord) return;
    const cleanInput = spellingInput.trim().toLowerCase();
    const cleanTarget = currentWord.word.trim().toLowerCase();
    if (cleanInput === cleanTarget) {
      setSpellingFeedback('correct');
      onAddXP(15);
      handleSpeak(currentWord.word);
    } else {
      setSpellingFeedback('wrong');
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation bar for Vocabulary modes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            id="btn-vocab-thematic"
            onClick={() => setActiveMode('thematic-clusters')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'thematic-clusters'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>🗂️</span>
            <span>Nhóm chủ đề</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">Mới</span>
          </button>

          <button
            id="btn-vocab-flashcards"
            onClick={() => {
              setActiveMode('flashcards');
              setIsFlipped(false);
            }}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'flashcards'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            📇 Thẻ từ (Flashcards)
          </button>

          {/* PRIMARY REQUESTED FEATURE: NGHE CHỌN TỪ */}
          <button
            id="btn-vocab-listen"
            onClick={() => {
              setActiveMode('listen-choose');
              setSelectedOptionIndex(null);
            }}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'listen-choose'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Nghe chọn từ</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black">4 Lựa chọn</span>
          </button>

          {/* FILL IN THE BLANK */}
          <button
            id="btn-vocab-fill-blank"
            onClick={() => {
              setActiveMode('fill-blank');
              setFillBlankOptionIndex(null);
            }}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'fill-blank'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Điền từ vào câu</span>
          </button>

          <button
            id="btn-vocab-spelling"
            onClick={() => {
              setActiveMode('spelling-bee');
              setSpellingInput('');
              setSpellingFeedback(null);
            }}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'spelling-bee'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🐝 Đánh vần (Spelling)
          </button>

          <button
            id="btn-vocab-memory"
            onClick={startMemoryGame}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'memory-match'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🧩 Ghép cặp thẻ
          </button>

          {onOpenDailyVocab && (
            <button
              id="btn-vocab-open-daily-kb"
              onClick={onOpenDailyVocab}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>Kho từ vựng mỗi ngày</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-950 font-extrabold">Lớp {grade}</span>
            </button>
          )}

          {onSwitchToReading && (
            <button
              onClick={() => onSwitchToReading(activeCluster?.nameVi || 'Môi trường & Đời sống')}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Tạo bài đọc AI</span>
            </button>
          )}
        </div>

        {/* Filter and Accent settings */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={filterCoreOnly}
              onChange={(e) => {
                setFilterCoreOnly(e.target.checked);
                setCurrentWordIndex(0);
              }}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Chỉ từ lõi SGK</span>
          </label>

          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setAccent('US')}
              className={`px-2 py-0.5 rounded ${accent === 'US' ? 'bg-white font-bold text-blue-600 shadow-2xs' : 'text-slate-500'}`}
            >
              🇺🇸 US
            </button>
            <button
              onClick={() => setAccent('UK')}
              className={`px-2 py-0.5 rounded ${accent === 'UK' ? 'bg-white font-bold text-blue-600 shadow-2xs' : 'text-slate-500'}`}
            >
              🇬🇧 UK
            </button>
          </div>
        </div>
      </div>

      {/* Grade Alignment and Selective Advanced Expansion Bar */}
      <div className="bg-gradient-to-r from-blue-50/90 via-slate-50 to-purple-50/90 p-3.5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-800 shadow-2xs">
            🎯 Chuẩn GDPT 2018: Lớp {grade} ({grade <= 5 ? 'Tiểu học • Pre-A1/A1' : grade <= 7 ? 'THCS • A1+/A2' : 'THCS • A2+/B1'})
          </span>
          <span className="text-xs text-slate-600">
            {enableAdvancedExpansion
              ? '⭐ Đang mở rộng thêm từ vựng B1-B2 & Chuyên Anh'
              : '✓ Từ vựng chuẩn bám sát bài học của khối lớp (Mở rộng nâng cao khi có nhu cầu)'}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="btn-toggle-grade-scope"
            onClick={() => setShowAllGrades(!showAllGrades)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all ${
              showAllGrades
                ? 'bg-slate-800 text-white border-slate-800 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {showAllGrades ? '🌐 Xem tất cả khối lớp' : `🎯 Chỉ xem Lớp ${grade}`}
          </button>

          <button
            id="toggle-advanced-expansion"
            onClick={() => {
              setEnableAdvancedExpansion(!enableAdvancedExpansion);
              setCurrentWordIndex(0);
            }}
            className={`text-xs font-bold px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all shadow-2xs ${
              enableAdvancedExpansion
                ? 'bg-purple-600 text-white border-purple-600 ring-2 ring-purple-200'
                : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
            }`}
          >
            <span>{enableAdvancedExpansion ? '✓ Đang bật' : '+ Mở rộng'}</span>
            <span>Nâng cao (B1-B2)</span>
          </button>
        </div>
      </div>

      {/* MODE 0: THEMATIC CLUSTERS */}
      {activeMode === 'thematic-clusters' && (
        <div className="space-y-4">
          {grade <= 5 && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
              <span className="text-2xl shrink-0">🎈</span>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-amber-950">
                  Góc Từ Vựng Trọng Tâm Tiểu Học (Lớp {grade})
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Các từ được gom theo từng nhóm đồ dùng, gia đình, con vật và hoạt động quen thuộc. Bé hãy nghe phát âm chuẩn và luyện tập qua Thẻ từ hoặc trò chơi Nghe chọn từ nhé!
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                Các Nhóm Chủ Đề Từ Vựng Trọng Điểm ({displayedClusters.length} chủ đề)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Được chuẩn hóa theo khung chương trình GDPT 2018 theo từng khối lớp và chuyên đề nâng cao.
              </p>
            </div>
            {selectedTopicId && (
              <button
                onClick={() => setSelectedTopicId(null)}
                className="text-xs text-blue-600 hover:underline font-semibold self-start"
              >
                ← Xem tất cả từ vựng bài học
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedClusters.map((cluster) => {
              const isSelected = selectedTopicId === cluster.id;
              const coreWords = cluster.words.filter((w) => w.isCore);
              const advancedWords = cluster.words.filter((w) => !w.isCore);
              const visibleWords = enableAdvancedExpansion ? cluster.words : coreWords;

              return (
                <div
                  key={cluster.id}
                  className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-200 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{cluster.icon}</span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{cluster.nameVi}</h4>
                          <p className="text-[11px] text-slate-400 font-medium">{cluster.nameEn}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cluster.badgeColor}`}>
                        {cluster.targetTier}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cluster.descriptionVi}
                    </p>

                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        ✓ {coreWords.length} từ SGK cốt lõi
                      </span>
                      {advancedWords.length > 0 && (
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                            enableAdvancedExpansion
                              ? 'text-purple-700 bg-purple-50 border-purple-200'
                              : 'text-slate-500 bg-slate-100 border-slate-200'
                          }`}
                        >
                          ⭐ {advancedWords.length} từ nâng cao
                        </span>
                      )}
                    </div>

                    <div className="pt-1">
                      <div className="flex flex-wrap gap-1">
                        {visibleWords.map((w) => (
                          <span
                            key={w.id}
                            className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                              w.isCore
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-purple-100 text-purple-800 border border-purple-200'
                            }`}
                          >
                            {!w.isCore ? '⭐ ' : ''}{w.word}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setSelectedTopicId(cluster.id);
                        setCurrentWordIndex(0);
                        setActiveMode('listen-choose');
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-blue-200"
                    >
                      <Headphones className="w-3.5 h-3.5 text-blue-600" />
                      <span>Luyện nghe chọn từ ({visibleWords.length} từ)</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedTopicId(cluster.id);
                        setCurrentWordIndex(0);
                        setActiveMode('flashcards');
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                      <span>Học qua Thẻ từ</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 1: FLASHCARDS */}
      {activeMode === 'flashcards' && currentWord && (
        <div className="flex flex-col items-center">
          {/* Active Thematic Cluster Banner */}
          {selectedTopicId && selectedTopicId !== 'all' && (
            <div className="w-full max-w-lg mb-3 flex items-center justify-between px-3.5 py-2 bg-blue-50 border border-blue-200 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">
                  {THEMATIC_CLUSTERS.find(c => c.id === selectedTopicId)?.icon || '🗂️'}
                </span>
                <span className="font-semibold text-blue-900">
                  Nhóm chủ đề: <strong>{THEMATIC_CLUSTERS.find(c => c.id === selectedTopicId)?.nameVi || selectedTopicId}</strong>
                </span>
              </div>
              <button
                onClick={() => setSelectedTopicId('all')}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline ml-2"
              >
                Học tất cả từ
              </button>
            </div>
          )}

          <div
            id="flashcard-container"
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-lg min-h-[320px] bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-300 p-6 shadow-sm flex flex-col justify-between cursor-pointer transition-all relative select-none"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    currentWord.isCore
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}
                >
                  {currentWord.isCore ? 'Từ vựng cốt lõi SGK' : 'Từ mở rộng nâng cao'}
                </span>
                <span className="text-xs text-slate-400 italic">({currentWord.partOfSpeech})</span>
              </div>

              <button
                id={`btn-bookmark-${currentWord.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveWord(currentWord.id);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                title="Lưu vào Sổ tay từ vựng"
              >
                {isSaved(currentWord.id) ? (
                  <BookmarkCheck className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="my-6 text-center">
              {!isFlipped ? (
                <div className="space-y-3">
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {currentWord.word}
                  </h3>
                  <p className="text-base text-blue-600 font-mono font-medium">{currentWord.ipa}</p>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      id="btn-speak-word"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(currentWord.word, 0.95);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Phát âm chuẩn ({accent})</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(currentWord.word, 0.75);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium transition-colors"
                      title="Nghe tốc độ chậm để luyện phát âm từng âm tiết"
                    >
                      <span>🐢 Chậm 0.75x</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 mt-3 italic">(Nhấp vào thẻ để lật xem nghĩa & ví dụ)</p>
                </div>
              ) : (
                <div className="space-y-3 text-center">
                  <h4 className="text-2xl font-black text-emerald-700">{currentWord.meaningVi}</h4>
                  <div className="bg-slate-50 rounded-xl p-3.5 text-left border border-slate-200 mt-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                        Ví dụ ngữ cảnh:
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(currentWord.exampleEn);
                        }}
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe câu</span>
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{currentWord.exampleEn}</p>
                    <p className="text-xs text-slate-600 italic">{currentWord.exampleVi}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
              <span>{currentWordIndex + 1} / {filteredWords.length} từ</span>
              <span className="text-blue-600 font-semibold">Ấn để lật thẻ ↻</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              id="btn-prev-word"
              onClick={() => {
                setIsFlipped(false);
                setCurrentWordIndex((prev) => (prev > 0 ? prev - 1 : filteredWords.length - 1));
              }}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              ← Từ trước
            </button>
            <button
              id="btn-next-word"
              onClick={() => {
                setIsFlipped(false);
                setCurrentWordIndex((prev) => (prev < filteredWords.length - 1 ? prev + 1 : 0));
                onAddXP(5);
              }}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs"
            >
              Từ tiếp theo →
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: LISTEN & CHOOSE (NGHE CHỌN TỪ - HOÀN THIỆN ĐỦ 4 LỰA CHỌN CHUẨN BÀI HỌC) */}
      {activeMode === 'listen-choose' && currentWord && (
        <div className="max-w-xl mx-auto space-y-4">
          {/* Active Thematic Cluster Banner */}
          {selectedTopicId && selectedTopicId !== 'all' && (
            <div className="flex items-center justify-between px-3.5 py-2 bg-blue-50 border border-blue-200 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">
                  {THEMATIC_CLUSTERS.find(c => c.id === selectedTopicId)?.icon || '🗂️'}
                </span>
                <span className="font-semibold text-blue-900">
                  Luyện tập theo nhóm: <strong>{THEMATIC_CLUSTERS.find(c => c.id === selectedTopicId)?.nameVi || selectedTopicId}</strong>
                </span>
              </div>
              <button
                onClick={() => setSelectedTopicId('all')}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline ml-2"
              >
                Luyện tất cả từ
              </button>
            </div>
          )}

          {/* Top Control Bar for Listening Mode */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Target Type Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                id="btn-listen-mode-en"
                onClick={() => {
                  setListenTargetType('english');
                  setSelectedOptionIndex(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  listenTargetType === 'english'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🔤 Chọn Từ Tiếng Anh</span>
              </button>
              <button
                id="btn-listen-mode-vi"
                onClick={() => {
                  setListenTargetType('vietnamese');
                  setSelectedOptionIndex(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  listenTargetType === 'vietnamese'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇻🇳 Chọn Nghĩa Tiếng Việt</span>
              </button>
            </div>

            {/* Speed & Autoplay options */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setListenSpeed(0.8)}
                  className={`px-2 py-1 rounded font-semibold ${
                    listenSpeed === 0.8 ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                  }`}
                  title="Tốc độ chậm rõ âm đuôi"
                >
                  🐢 0.8x
                </button>
                <button
                  onClick={() => setListenSpeed(1.0)}
                  className={`px-2 py-1 rounded font-semibold ${
                    listenSpeed === 1.0 ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                  }`}
                  title="Tốc độ chuẩn bản ngữ"
                >
                  ⚡ 1.0x
                </button>
              </div>

              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoPlayAudio}
                  onChange={(e) => setAutoPlayAudio(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Tự phát âm</span>
              </label>
            </div>
          </div>

          {/* Main Question Card */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm space-y-6 text-center">
            {/* Header: Question Progress & Stats */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Câu hỏi {currentWordIndex + 1} / {filteredWords.length}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {currentWord.isCore ? 'Từ bài học SGK' : 'Từ vựng mở rộng'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {listenStats.streak > 1 && (
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 animate-bounce">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{listenStats.streak} chuỗi</span>
                  </span>
                )}
                <span className="text-xs font-semibold text-slate-500">
                  Đúng: <strong className="text-emerald-600">{listenStats.correct}</strong> / {listenStats.total}
                </span>
              </div>
            </div>

            {/* Prompt */}
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {listenTargetType === 'english'
                  ? 'Lắng nghe phát âm và chọn TỪ TIẾNG ANH chính xác:'
                  : 'Lắng nghe phát âm và chọn NGHĨA TIẾNG VIỆT tương ứng:'}
              </h3>
              <p className="text-xs text-slate-500">
                Bấm vào nút loa bên dưới để nghe phát âm chuẩn bản ngữ
              </p>
            </div>

            {/* Big Listening Speaker Button */}
            <div className="py-2">
              <button
                id="btn-listen-again"
                onClick={() => handleSpeak(currentWord.word, listenSpeed)}
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white mx-auto flex flex-col items-center justify-center shadow-lg shadow-blue-500/25 transition-all transform active:scale-95 group ring-4 ring-blue-100 hover:ring-blue-200"
              >
                <Volume2 className="w-10 h-10 transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-bold mt-1 opacity-90">Nghe lại</span>
              </button>
              <div className="flex items-center justify-center gap-2 mt-2.5">
                <span className="text-xs text-slate-400 font-mono">Giọng: {accent} • Tốc độ: {listenSpeed}x</span>
              </div>
            </div>

            {/* EXACTLY 4 OPTIONS GRID (A, B, C, D) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {currentOptions.map((opt, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrect = opt.word.toLowerCase().trim() === currentWord.word.toLowerCase().trim();
                const hasAnswered = selectedOptionIndex !== null;

                const letter = ['A', 'B', 'C', 'D'][idx] || `${idx + 1}`;

                let cardStyle = 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40 text-slate-800';
                let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-300';

                if (hasAnswered) {
                  if (isCorrect) {
                    cardStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold ring-2 ring-emerald-300';
                    badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-200';
                    badgeStyle = 'bg-rose-500 text-white border-rose-500';
                  } else {
                    cardStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <div
                    key={`${opt.id}-${idx}`}
                    id={`btn-listen-opt-${idx}`}
                    onClick={() => {
                      if (hasAnswered) return;
                      setSelectedOptionIndex(idx);
                      const isRight = opt.word.toLowerCase().trim() === currentWord.word.toLowerCase().trim();
                      setListenStats((prev) => ({
                        correct: prev.correct + (isRight ? 1 : 0),
                        total: prev.total + 1,
                        streak: isRight ? prev.streak + 1 : 0,
                      }));
                      if (isRight) {
                        onAddXP(10);
                        handleSpeak(opt.word, 0.95);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between select-none ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 border ${badgeStyle}`}
                      >
                        {letter}
                      </span>
                      <div>
                        {listenTargetType === 'english' ? (
                          <>
                            <h4 className="text-base font-bold text-slate-900 leading-snug">
                              {opt.word}
                            </h4>
                            {hasAnswered && (
                              <p className="text-[11px] text-slate-600 mt-0.5">
                                {opt.ipa} • {opt.meaningVi}
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <h4 className="text-sm font-bold text-slate-900 leading-snug">
                              {opt.meaningVi}
                            </h4>
                            {hasAnswered && (
                              <p className="text-[11px] text-blue-700 font-medium mt-0.5">
                                {opt.word} ({opt.ipa})
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {hasAnswered && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeak(opt.word, 0.9);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-100 transition-colors"
                          title="Nghe phát âm từ này"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}

                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500 fill-rose-100" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* In-depth Pedagogical Feedback & Explanation */}
            {selectedOptionIndex !== null && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/50 border border-blue-200 text-left space-y-3 transition-all animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentOptions[selectedOptionIndex]?.word.toLowerCase().trim() === currentWord.word.toLowerCase().trim() ? (
                      <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Chính xác! (+10 XP)
                      </span>
                    ) : (
                      <span className="text-xs font-black text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full border border-rose-300 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Chưa đúng rồi bé ơi!
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-700">
                      Đáp án: <strong className="text-blue-700 font-mono text-sm">{currentWord.word}</strong>
                    </span>
                  </div>

                  <button
                    onClick={() => onSaveWord(currentWord.id)}
                    className="text-xs text-slate-600 hover:text-emerald-700 flex items-center gap-1 font-semibold"
                  >
                    {isSaved(currentWord.id) ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                        <span>Đã lưu sổ tay</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4 text-slate-500" />
                        <span>Lưu vào sổ tay</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-medium block">Nghĩa tiếng Việt:</span>
                    <span className="font-bold text-slate-900 text-sm">{currentWord.meaningVi}</span>
                    <span className="text-slate-400 ml-2">({currentWord.partOfSpeech})</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 font-medium block">Phiên âm IPA chuẩn:</span>
                      <span className="font-mono text-blue-700 font-bold">{currentWord.ipa}</span>
                    </div>
                    <button
                      onClick={() => handleSpeak(currentWord.word, 0.8)}
                      className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                      title="Nghe lại chậm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {currentWord.exampleEn && (
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Câu ví dụ trong bài học:
                      </span>
                      <button
                        onClick={() => handleSpeak(currentWord.exampleEn)}
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe câu ví dụ</span>
                      </button>
                    </div>
                    <p className="text-xs font-semibold text-slate-900">"{currentWord.exampleEn}"</p>
                    <p className="text-[11px] text-slate-600 italic">{currentWord.exampleVi}</p>
                  </div>
                )}

                {/* Next button */}
                <div className="pt-2">
                  <button
                    id="btn-listen-next"
                    onClick={() => {
                      setSelectedOptionIndex(null);
                      setCurrentWordIndex((prev) => (prev < filteredWords.length - 1 ? prev + 1 : 0));
                    }}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>
                      {currentWordIndex < filteredWords.length - 1 ? 'Câu tiếp theo →' : 'Làm lại từ đầu ↻'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 3: FILL IN THE BLANK (ĐIỀN TỪ VÀO CÂU NGỮ CẢNH) */}
      {activeMode === 'fill-blank' && currentWord && (
        <div className="max-w-xl mx-auto bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm space-y-6 text-center">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              Điền từ vào câu • {currentWordIndex + 1} / {filteredWords.length}
            </span>
            <span className="text-xs text-slate-500">
              Loại từ: <strong>{currentWord.partOfSpeech}</strong>
            </span>
          </div>

          <div className="space-y-3 text-left">
            <h3 className="text-base font-bold text-slate-900 text-center">
              Đọc ngữ cảnh và chọn từ thích hợp điền vào chỗ trống:
            </h3>

            {/* Sentence with blank */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white font-medium text-base sm:text-lg leading-relaxed shadow-inner text-center">
              {currentWord.exampleEn
                ? currentWord.exampleEn.replace(new RegExp(escapeRegExp(currentWord.word), 'gi'), '_______')
                : '_______'}
            </div>

            <p className="text-xs text-slate-600 text-center italic">
              Nghĩa tiếng Việt: "{currentWord.exampleVi}"
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {currentOptions.map((opt, idx) => {
              const isSelected = fillBlankOptionIndex === idx;
              const isCorrect = opt.word.toLowerCase().trim() === currentWord.word.toLowerCase().trim();
              const hasAnswered = fillBlankOptionIndex !== null;
              const letter = ['A', 'B', 'C', 'D'][idx];

              let cardStyle = 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/40 text-slate-800';
              if (hasAnswered) {
                if (isCorrect) cardStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                else if (isSelected && !isCorrect) cardStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                else cardStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
              }

              return (
                <button
                  key={`${opt.id}-${idx}`}
                  disabled={hasAnswered}
                  onClick={() => {
                    setFillBlankOptionIndex(idx);
                    if (isCorrect) {
                      onAddXP(15);
                      handleSpeak(currentWord.exampleEn);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${cardStyle}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">
                      {letter}
                    </span>
                    <span className="text-sm font-bold text-slate-900">{opt.word}</span>
                  </div>
                  {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          {fillBlankOptionIndex !== null && (
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-left space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-900">
                  Câu hoàn chỉnh:
                </span>
                <button
                  onClick={() => handleSpeak(currentWord.exampleEn)}
                  className="text-xs text-purple-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-900">"{currentWord.exampleEn}"</p>
              <p className="text-xs text-slate-600 italic">{currentWord.exampleVi}</p>

              <button
                onClick={() => {
                  setFillBlankOptionIndex(null);
                  setCurrentWordIndex((prev) => (prev < filteredWords.length - 1 ? prev + 1 : 0));
                }}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors mt-2"
              >
                Câu tiếp theo →
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 4: SPELLING BEE */}
      {activeMode === 'spelling-bee' && currentWord && (
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Spelling Bee • Đánh vần chuẩn xác ({currentWordIndex + 1}/{filteredWords.length})
            </span>
            <h3 className="text-base font-semibold text-slate-800 pt-2">
              Nghĩa tiếng Việt: <span className="font-bold text-emerald-700">{currentWord.meaningVi}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Gợi ý IPA: <span className="font-mono text-blue-600 font-bold">{currentWord.ipa}</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handleSpeak(currentWord.word)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>Nghe phát âm gợi ý</span>
            </button>
            <button
              onClick={() => setShowSpellingHint(!showSpellingHint)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showSpellingHint ? 'Ẩn gợi ý' : 'Xem chữ cái đầu'}</span>
            </button>
          </div>

          {showSpellingHint && (
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-mono">
              Từ gồm {currentWord.word.length} chữ cái, bắt đầu bằng: <strong>"{currentWord.word[0].toUpperCase()}"</strong>
            </div>
          )}

          <div className="space-y-3">
            <input
              id="input-spelling-bee"
              type="text"
              value={spellingInput}
              onChange={(e) => setSpellingInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSpellingCheck()}
              placeholder="Gõ từ tiếng Anh vào đây..."
              className="w-full text-center text-xl font-bold py-2.5 px-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono tracking-wider"
            />

            {spellingFeedback === 'correct' && (
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-sm bg-emerald-50 py-2 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                <span>Chính xác tuyệt vời! (+15 XP)</span>
              </div>
            )}

            {spellingFeedback === 'wrong' && (
              <div className="flex items-center justify-center gap-1.5 text-rose-600 font-medium text-xs bg-rose-50 py-2 rounded-xl border border-rose-200">
                <XCircle className="w-4 h-4" />
                <span>Chưa đúng rồi! Đáp án là: <strong>{currentWord.word}</strong></span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              id="btn-check-spelling"
              onClick={handleSpellingCheck}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              Kiểm tra
            </button>
            <button
              id="btn-next-spelling"
              onClick={() => {
                setSpellingInput('');
                setSpellingFeedback(null);
                setShowSpellingHint(false);
                setCurrentWordIndex((prev) => (prev < filteredWords.length - 1 ? prev + 1 : 0));
              }}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              Từ khác →
            </button>
          </div>
        </div>
      )}

      {/* MODE 5: MEMORY MATCH */}
      {activeMode === 'memory-match' && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-600 font-medium">
              Lật các thẻ từ tiếng Anh và nghĩa tiếng Việt tương ứng trong bài học để ghép đôi:
            </p>
            <button
              onClick={startMemoryGame}
              className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Chơi lại
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {memoryCards.map((card, idx) => {
              const isRevealed = card.isFlipped || card.isMatched;
              return (
                <div
                  key={card.id}
                  id={`memory-card-${idx}`}
                  onClick={() => handleCardClick(idx)}
                  className={`h-28 rounded-2xl p-3 flex items-center justify-center text-center cursor-pointer transition-all font-bold select-none border-2 shadow-2xs ${
                    card.isMatched
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-60'
                      : isRevealed
                      ? 'bg-white border-blue-500 text-slate-900 shadow-md scale-102'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-transparent'
                  }`}
                >
                  {isRevealed ? (
                    <span className="text-sm leading-snug">{card.text}</span>
                  ) : (
                    <Sparkles className="w-6 h-6 text-slate-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

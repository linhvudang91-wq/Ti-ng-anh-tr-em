export type GradeLevel = 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type EducationLevel = 'cap-1' | 'cap-2';

export type LessonMode = 'new-lesson' | 'continue-lesson' | 'review-lesson';

export type AppLayer = 'layer-portal' | 'layer-curriculum';

export type TextbookSeries = 'global-success' | 'smart-world' | 'friends-plus';

export type Semester = 1 | 2;

export interface WordItem {
  id: string;
  word: string;
  ipa: string;
  partOfSpeech: string;
  meaningVi: string;
  exampleEn: string;
  exampleVi: string;
  isCore: boolean; // true = core SGK, false = extension nâng cao
  imageUrl?: string;
  audioText?: string;
  unitId: string;
  grade: GradeLevel;
  topic?: string; // Tên chủ đề tiếng Việt (e.g. "Môi trường", "Trường học", "Công nghệ")
  topicKey?: string; // Mã khóa chủ đề (e.g. "environment", "school-life", "science-tech")
  examNote?: string; // Mẹo thi cử hoặc ghi chú cách dùng
  collocation?: string; // Cụm từ hay đi kèm
  dayBucket?: number; // Nhóm ngày học hàng ngày (1-30)
}

export interface GrammarRule {
  id: string;
  title: string;
  gradeTier: 'primary' | 'lower-secondary-early' | 'lower-secondary-late' | 'secondary';
  step1Recognition: {
    storyOrDialogue: string;
    highlights: string[];
    explanationFriendly: string;
  };
  step2VisualDiagram: {
    formula?: string;
    diagramType: 'table' | 'mindmap' | 'cards';
    formulaItems?: { label: string; structure: string; example: string }[];
    notesVi: string;
  };
  step3Exercises: {
    id: string;
    level: 'nhan-biet' | 'thong-hieu' | 'van-dung';
    question: string;
    options: string[];
    correctIndex: number;
    explanationVi: string;
  }[];
}

export interface SentencePattern {
  id: string;
  frame: string; // e.g., "I like [activity] because it is [adjective]."
  slots: { slotName: string; options: string[] }[];
  contextVi: string;
  sampleDialogue: {
    speakerA: string;
    lineA: string;
    speakerB: string;
    lineB: string;
  };
  substitutionDrills: {
    prompt: string;
    expectedPattern: string;
    cueWords: string[];
  }[];
  academicNotes?: string; // For grades 7-9
}

export interface RealLifeScenario {
  id: string;
  title: string;
  category?: 'simulation' | 'mini-project' | 'daily-life' | 'authentic-reading';
  descriptionVi?: string;
  partnerRole?: string;
  partnerAvatar?: string;
  initialGreeting?: string;
  suggestedPrompts?: string[];
  roleA?: string;
  roleB?: string;
  culturalTip?: string;
  exchanges?: { speaker: string; lineEn: string; lineVi: string }[];
  authenticItem?: {
    type: 'sign' | 'menu' | 'notice' | 'ticket';
    title: string;
    imageUrl?: string;
    contentHtml?: string;
    questions: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }[];
  };
  miniProjectPrompt?: {
    task: string;
    sampleGuidance: string[];
    sampleScript: string;
  };
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'error-identification' | 'sentence-rewrite' | 'cloze-test';
  question: string;
  context?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  competencyLevel: 'nhan-biet' | 'thong-hieu' | 'van-dung';
}

export type LearningModuleType = 'vocabulary' | 'grammar' | 'sentence-pattern' | 'real-life' | 'quiz-exam' | 'ai-reading' | 'ai-tutor';

export interface PassageSentence {
  id: string;
  en: string;
  vi: string;
}

export interface VocabularyAnalysisItem {
  word: string;
  ipa: string;
  partOfSpeech: string;
  meaningVi: string;
  contextSentence: string;
  collocationOrFamily?: string;
  examTipVi?: string;
}

export interface GrammarAnalysisItem {
  structureName: string;
  formula: string;
  extractedExample: string;
  explanationVi: string;
  trapOrUsageVi?: string;
}

export interface ReadingQuizQuestion {
  id: string;
  type: 'main-idea' | 'detail' | 'vocabulary' | 'inference' | 'grammar';
  question: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
  clueSentenceEn?: string;
}

export type ReadingLengthType = 'short' | 'standard'; // 'short' = 50-60 words, 'standard' = 120-150 words

export interface ReadingPassage {
  id: string;
  titleEn: string;
  titleVi: string;
  topic: string;
  topicKey?: string;
  grade: GradeLevel;
  cefrLevel: string; // e.g. Pre-A1, A1, A2, B1, B2 Chuyên Anh
  wordCount: number; // 50-60 words or 120-150 words
  lengthType?: ReadingLengthType;
  contentEn: string;
  contentVi: string;
  sentences: PassageSentence[];
  vocabAnalysis: VocabularyAnalysisItem[];
  grammarAnalysis: GrammarAnalysisItem[];
  quiz: ReadingQuizQuestion[];
  createdAt: string;
}

export type UnitDifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';

export interface LessonStep {
  stepNumber: number;
  title: string;
  description: string;
  keyTakeaway?: string;
}

export interface RealLifeExample {
  context: string;
  dialogueOrSentenceEn: string;
  translationVi: string;
  explanation?: string;
}

export interface GeneratedLesson {
  id: string;
  topic: string;
  grade: GradeLevel;
  cefrLevel: string; // e.g. 'A1', 'A2', 'B1', 'B2'
  title: string;
  objectiveVi: string;
  conceptExplanation: string;
  steps?: LessonStep[];
  realLifeExamples?: RealLifeExample[];
  vocabAndCollocations: {
    word: string;
    ipa: string;
    partOfSpeech: string;
    meaningVi: string;
    exampleEn: string;
    exampleVi: string;
    additionalExampleEn?: string;
    additionalExampleVi?: string;
    examNote?: string;
  }[];
  grammarStructures: {
    name: string;
    formula: string;
    exampleEn: string;
    exampleVi: string;
    examTrapVi?: string;
    moreExamples?: { en: string; vi: string }[];
  }[];
  interactiveExercises: {
    id: string;
    type: 'multiple-choice' | 'word-formation' | 'sentence-transformation';
    question: string;
    options?: string[];
    correctAnswer: string;
    explanationVi: string;
  }[];
  tutorTip: string;
  createdAt: string;
}

export interface UnitData {
  id: string;
  unitNumber: number;
  title: string;
  themeVi: string;
  themeIcon?: string;
  grade: GradeLevel;
  semester: Semester;
  textbook: TextbookSeries;
  summaryVi: string;
  isB2Chuyen?: boolean; // True for specialized Grade 6-9 B2 entrance exam prep
  targetTierBadge?: string; // e.g. 'Chuyên Anh B2', 'Nâng cao B1+', etc.
  vocabularies: WordItem[];
  grammar: GrammarRule;
  sentencePattern: SentencePattern;
  realLife: RealLifeScenario[];
  quizQuestions: QuizQuestion[];
}

export type GiftRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type GiftCategory = 'milestone' | 'session-end' | 'streak' | 'mastery' | 'ai-tutor';

export interface GiftStickerItem {
  id: string;
  name: string;
  category: GiftCategory;
  emoji: string;
  badgeColor: string; // Tailwind gradient/bg class
  rarity: GiftRarity;
  description: string;
  praiseMessage: string;
  requirement: string;
  xpBonus: number;
}

export interface UnlockedGiftRecord {
  giftId: string;
  unlockedAt: string;
  reason: string;
  customPraise?: string;
}

export interface UserProgress {
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  completedUnits: string[];
  totalCorrectAnswers?: number; // Số câu trả lời đúng tích lũy (Cần > 70 câu để mở khóa tạo bài học mới)
  savedNotebookWords: {
    wordId: string;
    addedDate: string;
    nextReviewDate: string;
    repetitionCount: number;
    easeFactor: number;
  }[];
  quizScores: Record<string, number>; // unitId -> score out of 100
  dailyMinutes: Record<string, number>; // date YYYY-MM-DD -> minutes
  placementTestResult?: {
    recommendedGrade: GradeLevel;
    score: number;
    date: string;
  };
  savedLessons?: GeneratedLesson[];
  savedPassages?: ReadingPassage[];
  dailyMissionsCompleted?: Record<string, boolean>; // missionId / date -> completed
  unlockedGifts?: UnlockedGiftRecord[]; // Danh sách quà tặng và sticker bé đã nhận được
}

export type DailySkillType = 'vocabulary' | 'grammar' | 'listening' | 'speaking' | 'reading' | 'writing';

export type DailyExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'reorder-sentence'
  | 'listening-comprehension'
  | 'speaking-pronunciation'
  | 'short-writing';

export interface DailyExerciseItem {
  id: string;
  type: DailyExerciseType;
  prompt: string;
  options?: string[];
  correctAnswer: string | number; // Index or string
  explanationVi: string;
  audioText?: string;
  hintVi?: string;
  sampleAnswer?: string;
}

export interface WarmupVocabItem {
  word: string;
  ipa: string;
  partOfSpeech: string;
  meaningVi: string;
  emoji?: string;
  exampleEn: string;
  exampleVi: string;
  audioText?: string;
}

export interface TutorDialogueLine {
  speaker: string;
  avatar?: string;
  en: string;
  vi: string;
  audioText?: string;
}

export interface CompletedTutorLessonRecord {
  lessonId: string;
  title: string;
  date: string;
  grade: GradeLevel;
  skill: DailySkillType;
  scorePercentage: number;
  stars: number;
  timeSpentMinutes: number;
  isPassed: boolean;
  learnedWords?: string[];
  missionData?: DailyLearningMission;
}

export interface DailyLearningMission {
  id: string;
  date: string;
  dayOfYear: number;
  grade: GradeLevel;
  skill: DailySkillType;
  title: string;
  learningObjective: string; // Mục tiêu đơn nhất
  estimatedMinutes: number; // Mặc định 30 phút cho buổi học hoàn chỉnh
  tutorPersona?: {
    name: string;
    avatar: string;
    greetingMessage: string;
    encouragementNote: string;
  };
  warmupVocab?: WarmupVocabItem[];
  storyOrDialogue?: {
    title: string;
    scenarioVi: string;
    lines: TutorDialogueLine[];
  };
  theoryContent: {
    keyConcept: string;
    rulesOrTips: string[];
    examples: { en: string; vi: string }[];
  };
  exercises: DailyExerciseItem[];
  miniQuizChallenge?: DailyExerciseItem[];
  examNote: string;
  isCompleted?: boolean;
  earnedXp?: number;
  lastScorePercentage?: number;
  isUnlockedNext?: boolean;
  tutorFeedback?: {
    passedMessage: string;
    needImprovementMessage: string;
  };
}

export interface YearlyRoadmapPhase {
  phaseId: string;
  nameVi: string;
  timeframe: string;
  targetCefr: string;
  skillsFocus: string[];
  coreUnits: string;
  descriptionVi: string;
  milestoneTest: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string; // emoji e.g. '🦁', '🦉', '🚀', '🌟', '🐰'
  grade: GradeLevel;
  educationLevel?: EducationLevel; // 'cap-1' (Tiểu học: 3, 4, 5) or 'cap-2' (THCS: 6, 7, 8, 9)
  target: 'standard' | 'nang-cao-lop6' | 'chuyen-b2'; // standard GDPT 2018 or Khảo sát vào Lớp 6 CLC or Chuyên vào 10
  createdAt: string;
  progress: UserProgress;
}

export type AiTutorTab = 'companion-chat' | 'lesson-creator' | 'quiz-generator' | 'grammar-explainer' | 'vocab-explainer';

export interface GrammarExplainResult {
  term: string;
  cefrLevel: string;
  formulaOrPattern: string;
  simpleExplanationVi: string;
  childFriendlyAnalogyVi?: string;
  examples: {
    en: string;
    vi: string;
    highlightWord: string;
  }[];
  commonMistakesVi: string;
  quickCheckQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanationVi: string;
  };
}

export interface VocabExplainResult {
  word: string;
  ipa: string;
  partOfSpeech: string;
  meaningVi: string;
  level: string;
  synonyms: string[];
  antonyms?: string[];
  collocations: string[];
  examples: {
    en: string;
    vi: string;
  }[];
  memoryTipVi: string;
  examNoteVi?: string;
}

export interface GeneratedQuizResult {
  id: string;
  title: string;
  topic: string;
  grade: GradeLevel;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

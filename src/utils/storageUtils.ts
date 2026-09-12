import { UserProgress, UserProfile, GradeLevel, GeneratedLesson, ReadingPassage } from '../types';

const USERS_STORAGE_KEY = 'edu_english_users_v2';
const ACTIVE_USER_ID_KEY = 'edu_english_active_user_id_v2';
const LEGACY_STORAGE_KEY = 'edu_english_gdpt_user_progress_v1';

const defaultProgressTemplate: UserProgress = {
  xp: 120,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedUnits: ['unit-g3-u1', 'unit-g4-u1'],
  totalCorrectAnswers: 46, // Cần > 70 câu để mở khóa tạo bài học mới
  savedNotebookWords: [
    {
      wordId: 'g3-w1',
      addedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
      nextReviewDate: new Date().toISOString(),
      repetitionCount: 1,
      easeFactor: 2.5,
    },
    {
      wordId: 'g4-w1',
      addedDate: new Date(Date.now() - 86400000).toISOString(),
      nextReviewDate: new Date().toISOString(),
      repetitionCount: 2,
      easeFactor: 2.5,
    }
  ],
  quizScores: {
    'unit-g3-u1': 90,
    'unit-g4-u1': 85,
  },
  dailyMinutes: {
    [new Date().toISOString().split('T')[0]]: 25,
  },
  savedLessons: [],
};

const initialUsers: UserProfile[] = [
  {
    id: 'user-mai-chi',
    name: 'Mai Chi',
    avatar: '🐰',
    grade: 3,
    educationLevel: 'cap-1',
    target: 'standard',
    createdAt: new Date().toISOString(),
    progress: {
      ...defaultProgressTemplate,
      xp: 220,
      streakDays: 5,
      totalCorrectAnswers: 52,
      completedUnits: ['unit-g3-u1', 'unit-g3-u2'],
      quizScores: {
        'unit-g3-u1': 95,
        'unit-g3-u2': 90,
      },
    },
  },
  {
    id: 'user-minh-khang',
    name: 'Minh Khang',
    avatar: '🚀',
    grade: 5,
    educationLevel: 'cap-1',
    target: 'nang-cao-lop6',
    createdAt: new Date().toISOString(),
    progress: {
      ...defaultProgressTemplate,
      xp: 480,
      streakDays: 8,
      totalCorrectAnswers: 86,
      completedUnits: ['unit-g5-u1', 'unit-g5-u2', 'unit-g5-u7'],
      quizScores: {
        'unit-g5-u1': 96,
        'unit-g5-u7': 94,
      },
    },
  },
  {
    id: 'user-tuan-minh',
    name: 'Tuấn Minh',
    avatar: '🦁',
    grade: 6,
    educationLevel: 'cap-2',
    target: 'standard',
    createdAt: new Date().toISOString(),
    progress: {
      ...defaultProgressTemplate,
      xp: 350,
      streakDays: 6,
      totalCorrectAnswers: 72,
      completedUnits: ['unit-g6-u1', 'unit-g6-u2'],
      quizScores: {
        'unit-g6-u1': 92,
        'unit-g6-u2': 88,
      },
    },
  },
  {
    id: 'user-tue-anh',
    name: 'Tuệ Anh',
    avatar: '🦉',
    grade: 9,
    educationLevel: 'cap-2',
    target: 'chuyen-b2',
    createdAt: new Date().toISOString(),
    progress: {
      ...defaultProgressTemplate,
      xp: 620,
      streakDays: 14,
      totalCorrectAnswers: 98,
      completedUnits: ['unit-g9-u1', 'unit-g9-u2', 'unit-g9-chuyen-1'],
      quizScores: {
        'unit-g9-u1': 98,
        'unit-g9-chuyen-1': 95,
      },
    },
  },
];

// Helper: load all users from localStorage with grade sanitization (3 - 9)
export function getAllUsers(): UserProfile[] {
  if (typeof window === 'undefined') return initialUsers;
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
      localStorage.setItem(ACTIVE_USER_ID_KEY, initialUsers[0].id);
      return initialUsers;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return initialUsers;
    }
    const validGrades: GradeLevel[] = [3, 4, 5, 6, 7, 8, 9];
    const sanitized = parsed.map((u: UserProfile) => {
      let g: GradeLevel = 3;
      if (validGrades.includes(u.grade)) {
        g = u.grade;
      }
      return {
        ...u,
        grade: g,
        educationLevel: u.educationLevel || (g <= 5 ? 'cap-1' : 'cap-2'),
      };
    });
    return sanitized;
  } catch (e) {
    console.error('Error loading users:', e);
    return initialUsers;
  }
}

export function saveAllUsers(users: UserProfile[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users list:', e);
  }
}

export function getActiveUser(): UserProfile {
  const users = getAllUsers();
  if (typeof window === 'undefined') return users[0] || initialUsers[0];
  try {
    const activeId = localStorage.getItem(ACTIVE_USER_ID_KEY);
    if (activeId) {
      const found = users.find(u => u.id === activeId);
      if (found) return found;
    }
    const first = users[0] || initialUsers[0];
    localStorage.setItem(ACTIVE_USER_ID_KEY, first.id);
    return first;
  } catch {
    return users[0] || initialUsers[0];
  }
}

export function setActiveUserId(userId: string): UserProfile {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACTIVE_USER_ID_KEY, userId);
  }
  return getActiveUser();
}

export function createUserProfile(
  name: string,
  grade: GradeLevel,
  target: 'standard' | 'nang-cao-lop6' | 'chuyen-b2' = 'standard',
  avatar: string = '🌟'
): UserProfile {
  const users = getAllUsers();
  const id = `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const newUser: UserProfile = {
    id,
    name: name.trim() || 'Học sinh mới',
    avatar,
    grade,
    educationLevel: grade <= 5 ? 'cap-1' : 'cap-2',
    target,
    createdAt: new Date().toISOString(),
    progress: {
      ...defaultProgressTemplate,
      xp: 50,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedUnits: [],
      savedNotebookWords: [],
      quizScores: {},
      dailyMinutes: {
        [new Date().toISOString().split('T')[0]]: 5,
      },
      savedLessons: [],
    },
  };

  const updated = [newUser, ...users];
  saveAllUsers(updated);
  setActiveUserId(id);
  return newUser;
}

export function updateUserProfile(id: string, updates: Partial<UserProfile>): UserProfile {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return getActiveUser();

  const current = users[index];
  const updatedUser: UserProfile = {
    ...current,
    ...updates,
    progress: updates.progress ? { ...current.progress, ...updates.progress } : current.progress,
  };
  users[index] = updatedUser;
  saveAllUsers(users);
  return updatedUser;
}

export function deleteUserProfile(id: string): UserProfile[] {
  const users = getAllUsers().filter(u => u.id !== id);
  const remaining = users.length > 0 ? users : initialUsers;
  saveAllUsers(remaining);
  const activeUser = getActiveUser();
  if (activeUser.id === id) {
    setActiveUserId(remaining[0].id);
  }
  return remaining;
}

// Existing API compatibility: operates directly on the active user profile!
export function loadUserProgress(): UserProgress {
  const active = getActiveUser();
  const prog = active.progress || defaultProgressTemplate;
  if (prog.totalCorrectAnswers === undefined) {
    prog.totalCorrectAnswers = 46;
  }
  return prog;
}

export const getUserProgress = loadUserProgress;

export function saveUserProgress(progress: UserProgress): void {
  const active = getActiveUser();
  updateUserProfile(active.id, { progress });
}

export function saveGeneratedLessonToUser(lesson: GeneratedLesson): UserProgress {
  const current = loadUserProgress();
  const existingLessons = current.savedLessons || [];
  const exists = existingLessons.some(l => l.id === lesson.id);
  const updatedLessons = exists
    ? existingLessons.map(l => (l.id === lesson.id ? lesson : l))
    : [lesson, ...existingLessons];

  const updated = {
    ...current,
    savedLessons: updatedLessons,
  };
  saveUserProgress(updated);
  return updated;
}

export function saveWordToNotebook(wordId: string): UserProgress {
  const current = loadUserProgress();
  const exists = current.savedNotebookWords.some(w => w.wordId === wordId);
  let newWords = [...current.savedNotebookWords];
  if (exists) {
    newWords = newWords.filter(w => w.wordId !== wordId);
  } else {
    newWords.push({
      wordId,
      addedDate: new Date().toISOString(),
      nextReviewDate: new Date().toISOString(),
      repetitionCount: 0,
      easeFactor: 2.5,
    });
  }
  const updated = { ...current, savedNotebookWords: newWords };
  saveUserProgress(updated);
  return updated;
}

export function recordQuizScore(unitId: string, score: number): UserProgress {
  const current = loadUserProgress();
  const completed = current.completedUnits.includes(unitId)
    ? current.completedUnits
    : [...current.completedUnits, unitId];

  const updated: UserProgress = {
    ...current,
    completedUnits: completed,
    quizScores: {
      ...current.quizScores,
      [unitId]: Math.max(score, current.quizScores[unitId] || 0),
    },
  };
  saveUserProgress(updated);
  return updated;
}

export function recordStudyMinutes(minutes: number): UserProgress {
  const current = loadUserProgress();
  const today = new Date().toISOString().split('T')[0];
  const updated: UserProgress = {
    ...current,
    dailyMinutes: {
      ...current.dailyMinutes,
      [today]: (current.dailyMinutes[today] || 0) + minutes,
    },
  };
  saveUserProgress(updated);
  return updated;
}

export function addXP(amount: number): UserProgress {
  const current = loadUserProgress();
  const today = new Date().toISOString().split('T')[0];

  let streak = current.streakDays;
  if (current.lastActiveDate !== today) {
    const lastDate = new Date(current.lastActiveDate);
    const diffDays = Math.floor((new Date(today).getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1;
    }
  }

  const updatedMinutes = {
    ...current.dailyMinutes,
    [today]: (current.dailyMinutes[today] || 0) + Math.max(1, Math.round(amount / 10)),
  };

  const updated: UserProgress = {
    ...current,
    xp: current.xp + amount,
    streakDays: streak,
    lastActiveDate: today,
    dailyMinutes: updatedMinutes,
  };

  saveUserProgress(updated);
  return updated;
}

// Spaced Repetition (SuperMemo-2 algorithm adaptation)
export function updateWordRepetition(wordId: string, quality: 0 | 1 | 2 | 3 | 4 | 5): UserProgress {
  const progress = loadUserProgress();
  const existingIndex = progress.savedNotebookWords.findIndex(w => w.wordId === wordId);

  let item = existingIndex >= 0 ? progress.savedNotebookWords[existingIndex] : {
    wordId,
    addedDate: new Date().toISOString(),
    nextReviewDate: new Date().toISOString(),
    repetitionCount: 0,
    easeFactor: 2.5,
  };

  let { repetitionCount, easeFactor } = item;

  if (quality >= 3) {
    if (repetitionCount === 0) {
      item.nextReviewDate = new Date(Date.now() + 1 * 86400000).toISOString();
    } else if (repetitionCount === 1) {
      item.nextReviewDate = new Date(Date.now() + 3 * 86400000).toISOString();
    } else {
      const interval = Math.round(repetitionCount * easeFactor);
      item.nextReviewDate = new Date(Date.now() + interval * 86400000).toISOString();
    }
    repetitionCount += 1;
  } else {
    repetitionCount = 0;
    item.nextReviewDate = new Date(Date.now() + 86400000).toISOString(); // Review tomorrow
  }

  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  item.repetitionCount = repetitionCount;
  item.easeFactor = easeFactor;

  let newWords = [...progress.savedNotebookWords];
  if (existingIndex >= 0) {
    newWords[existingIndex] = item;
  } else {
    newWords.push(item);
  }

  const updated = { ...progress, savedNotebookWords: newWords };
  saveUserProgress(updated);
  return updated;
}

export function saveGeneratedLesson(lesson: GeneratedLesson): UserProgress {
  const current = loadUserProgress();
  const existing = current.savedLessons || [];
  const filtered = existing.filter(l => l.id !== lesson.id);
  const updated: UserProgress = {
    ...current,
    savedLessons: [lesson, ...filtered].slice(0, 20),
  };
  saveUserProgress(updated);
  return updated;
}

export function deleteSavedLesson(lessonId: string): UserProgress {
  const current = loadUserProgress();
  const existing = current.savedLessons || [];
  const updated: UserProgress = {
    ...current,
    savedLessons: existing.filter(l => l.id !== lessonId),
  };
  saveUserProgress(updated);
  return updated;
}

export function clearAllSavedLessons(): UserProgress {
  const current = loadUserProgress();
  const updated: UserProgress = {
    ...current,
    savedLessons: [],
  };
  saveUserProgress(updated);
  return updated;
}

export function saveReadingPassage(passage: ReadingPassage): UserProgress {
  const current = loadUserProgress();
  const existing = current.savedPassages || [];
  const filtered = existing.filter(p => p.id !== passage.id);
  const updated: UserProgress = {
    ...current,
    savedPassages: [passage, ...filtered].slice(0, 30),
  };
  saveUserProgress(updated);
  return updated;
}

export function deleteSavedPassage(passageId: string): UserProgress {
  const current = loadUserProgress();
  const existing = current.savedPassages || [];
  const updated: UserProgress = {
    ...current,
    savedPassages: existing.filter(p => p.id !== passageId),
  };
  saveUserProgress(updated);
  return updated;
}

export function clearAllSavedPassages(): UserProgress {
  const current = loadUserProgress();
  const updated: UserProgress = {
    ...current,
    savedPassages: [],
  };
  saveUserProgress(updated);
  return updated;
}

export function recordCorrectAnswer(amount: number = 1): UserProgress {
  const current = loadUserProgress();
  const currentCount = current.totalCorrectAnswers || 0;
  const newCount = currentCount + amount;
  const updated = addXP(amount * 5); // +5 XP per correct answer
  const withCorrect: UserProgress = {
    ...updated,
    totalCorrectAnswers: newCount,
  };
  saveUserProgress(withCorrect);
  return withCorrect;
}

const TUTOR_LESSONS_HISTORY_KEY = 'edu_english_tutor_lessons_history_v1';

export function getCompletedTutorLessons(): import('../types').CompletedTutorLessonRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(TUTOR_LESSONS_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading tutor lessons history:', e);
    return [];
  }
}

export function saveCompletedTutorLesson(record: import('../types').CompletedTutorLessonRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getCompletedTutorLessons();
    // Prepend new record, avoid duplicates
    const updated = [record, ...list.filter(item => item.lessonId !== record.lessonId)].slice(0, 50);
    localStorage.setItem(TUTOR_LESSONS_HISTORY_KEY, JSON.stringify(updated));

    // Also record minutes to daily stats if passed or completed
    recordStudyMinutes(record.timeSpentMinutes || 30);
    if (record.isPassed) {
      addXP(100); // 100 XP for mastering with >= 70%
    }
  } catch (e) {
    console.error('Error saving tutor lesson record:', e);
  }
}

export function deleteCompletedTutorLesson(lessonId: string): import('../types').CompletedTutorLessonRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const list = getCompletedTutorLessons();
    const updated = list.filter(item => item.lessonId !== lessonId);
    localStorage.setItem(TUTOR_LESSONS_HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting tutor lesson record:', e);
    return [];
  }
}

export function clearAllCompletedTutorLessons(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(TUTOR_LESSONS_HISTORY_KEY);
  } catch (e) {
    console.error('Error clearing tutor lessons history:', e);
  }
}

/**
 * Aggregates all words learned across saved lessons, completed tutor lessons,
 * and notebook so new lessons can exclude them and focus on fresh vocabulary.
 */
export function getLearnedVocabularyPool(): string[] {
  const wordsSet = new Set<string>();
  const progress = loadUserProgress();

  // 1. From savedLessons
  if (progress.savedLessons) {
    progress.savedLessons.forEach(lesson => {
      if (lesson.vocabAndCollocations) {
        lesson.vocabAndCollocations.forEach(v => {
          if (v.word) wordsSet.add(v.word.trim().toLowerCase());
        });
      }
    });
  }

  // 2. From completed tutor lessons history
  const completed = getCompletedTutorLessons();
  completed.forEach(record => {
    if (record.learnedWords) {
      record.learnedWords.forEach(w => {
        if (w) wordsSet.add(w.trim().toLowerCase());
      });
    }
    if (record.missionData?.warmupVocab) {
      record.missionData.warmupVocab.forEach(v => {
        if (v.word) wordsSet.add(v.word.trim().toLowerCase());
      });
    }
  });

  return Array.from(wordsSet);
}




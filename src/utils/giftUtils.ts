import { GiftStickerItem, UnlockedGiftRecord, UserProgress, UserProfile } from '../types';
import { STICKER_GIFTS } from '../data/stickersData';
import { loadUserProgress, saveUserProgress, getActiveUser, updateUserProfile, addXP } from './storageUtils';

export interface GiftWithStatus extends GiftStickerItem {
  isUnlocked: boolean;
  unlockedAt?: string;
  reason?: string;
  customPraise?: string;
}

/**
 * Returns all available gifts merged with the user's unlocked status
 */
export function getAllGiftsWithStatus(progress?: UserProgress): GiftWithStatus[] {
  const currentProg = progress || loadUserProgress();
  const unlockedMap = new Map<string, UnlockedGiftRecord>();

  (currentProg.unlockedGifts || []).forEach((u) => {
    unlockedMap.set(u.giftId, u);
  });

  return STICKER_GIFTS.map((gift) => {
    const record = unlockedMap.get(gift.id);
    return {
      ...gift,
      isUnlocked: !!record,
      unlockedAt: record?.unlockedAt,
      reason: record?.reason,
      customPraise: record?.customPraise,
    };
  });
}

/**
 * Checks all milestone conditions and awards any newly earned gifts.
 * Returns array of newly unlocked gifts (if any).
 */
export function checkAndAwardMilestones(
  userProfile?: UserProfile,
  onAwardXP?: (amount: number) => void
): GiftStickerItem[] {
  const user = userProfile || getActiveUser();
  const prog = user.progress || loadUserProgress();
  const currentUnlockedIds = new Set((prog.unlockedGifts || []).map((g) => g.giftId));

  const newlyUnlocked: GiftStickerItem[] = [];
  const newRecords: UnlockedGiftRecord[] = [...(prog.unlockedGifts || [])];
  let totalBonusXP = 0;
  const now = new Date().toISOString();

  // Milestone checks
  const checks: { id: string; condition: boolean; reason: string }[] = [
    {
      id: 'gift-lion-start',
      condition: (prog.completedUnits?.length || 0) >= 1 || Object.keys(prog.quizScores || {}).length >= 1,
      reason: 'Hoàn thành bài học / kiểm tra đầu tiên',
    },
    {
      id: 'gift-bee-streak3',
      condition: (prog.streakDays || 0) >= 3,
      reason: 'Đạt chuỗi 3 ngày học liên tiếp',
    },
    {
      id: 'gift-fire-streak7',
      condition: (prog.streakDays || 0) >= 7,
      reason: 'Đạt chuỗi 7 ngày học liên tục',
    },
    {
      id: 'gift-owl-vocab',
      condition: (prog.savedNotebookWords?.length || 0) >= 10,
      reason: 'Đã lưu từ 10 từ vựng vào sổ tay',
    },
    {
      id: 'gift-rocket-speed',
      condition: (prog.completedUnits?.length || 0) >= 3,
      reason: 'Hoàn thành xuất sắc 3 bài học Unit',
    },
    {
      id: 'gift-diamond-xp500',
      condition: (prog.xp || 0) >= 500,
      reason: 'Đạt mốc 500 điểm kinh nghiệm (XP)',
    },
    {
      id: 'gift-medal-70correct',
      condition: (prog.totalCorrectAnswers || 0) >= 70,
      reason: 'Đạt 70 câu trả lời đúng toàn hệ thống',
    },
    {
      id: 'gift-globe-explorer',
      condition: (prog.completedUnits?.length || 0) >= 5,
      reason: 'Chinh phục 5 bài học Unit',
    },
    {
      id: 'gift-crown-perfect',
      condition: Object.values(prog.quizScores || {}).some((s) => s === 100),
      reason: 'Đạt điểm 100 tuyệt đối trong bài kiểm tra',
    },
  ];

  checks.forEach(({ id, condition, reason }) => {
    if (condition && !currentUnlockedIds.has(id)) {
      const gift = STICKER_GIFTS.find((g) => g.id === id);
      if (gift) {
        newlyUnlocked.push(gift);
        newRecords.push({
          giftId: id,
          unlockedAt: now,
          reason,
          customPraise: gift.praiseMessage,
        });
        totalBonusXP += gift.xpBonus;
        currentUnlockedIds.add(id);
      }
    }
  });

  if (newlyUnlocked.length > 0) {
    const updatedProgress: UserProgress = {
      ...prog,
      xp: prog.xp + totalBonusXP,
      unlockedGifts: newRecords,
    };
    saveUserProgress(updatedProgress);
    updateUserProfile(user.id, { progress: updatedProgress });
    if (onAwardXP) {
      onAwardXP(totalBonusXP);
    }
  }

  return newlyUnlocked;
}

/**
 * Specifically awards an End-of-Session gift to the student
 */
export function awardSessionEndGift(
  studentName: string,
  sessionInfo: { minutes?: number; correctCount?: number; lessonTitle?: string },
  onAwardXP?: (amount: number) => void
): { gift: GiftStickerItem; isNew: boolean } {
  const user = getActiveUser();
  const prog = user.progress || loadUserProgress();
  const unlocked = [...(prog.unlockedGifts || [])];
  const now = new Date().toISOString();

  // Pick suitable session end gifts
  const candidates = ['gift-rainbow-session', 'gift-cupcake-sweet', 'gift-clover-luck', 'gift-magic-wand'];
  const chosenId = candidates[Math.floor(Math.random() * candidates.length)];
  const gift = STICKER_GIFTS.find((g) => g.id === chosenId) || STICKER_GIFTS[0];

  const alreadyHas = unlocked.some((u) => u.giftId === gift.id);

  const customPraise = `Thầy cô và Gia sư AI khen ngợi bé ${studentName}! Hôm nay bé đã rất chăm chỉ và tập trung học ${
    sessionInfo.lessonTitle ? `bài "${sessionInfo.lessonTitle}"` : 'Tiếng Anh'
  }${sessionInfo.correctCount ? ` và trả lời đúng ${sessionInfo.correctCount} câu` : ''}. Món quà ${gift.name} ${gift.emoji} này là phần thưởng xứng đáng cho nỗ lực của bé!`;

  if (!alreadyHas) {
    unlocked.push({
      giftId: gift.id,
      unlockedAt: now,
      reason: 'Phần thưởng cuối buổi học tập chăm chỉ',
      customPraise,
    });
  } else {
    // Update record date and praise
    const idx = unlocked.findIndex((u) => u.giftId === gift.id);
    if (idx >= 0) {
      unlocked[idx] = {
        ...unlocked[idx],
        unlockedAt: now,
        customPraise,
      };
    }
  }

  const updatedProgress: UserProgress = {
    ...prog,
    xp: prog.xp + gift.xpBonus,
    unlockedGifts: unlocked,
  };

  saveUserProgress(updatedProgress);
  updateUserProfile(user.id, { progress: updatedProgress });

  if (onAwardXP) {
    onAwardXP(gift.xpBonus);
  }

  return { gift, isNew: !alreadyHas };
}

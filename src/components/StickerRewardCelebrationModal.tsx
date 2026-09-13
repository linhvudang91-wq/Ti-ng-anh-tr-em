import React, { useEffect } from 'react';
import { GiftStickerItem } from '../types';
import { audioManager } from '../utils/audioUtils';
import {
  Sparkles,
  Award,
  Zap,
  Gift,
  Heart,
  Volume2,
  CheckCircle2,
  X,
  Star,
  ChevronRight,
} from 'lucide-react';

interface StickerRewardCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  gift: GiftStickerItem | null;
  studentName?: string;
  customPraise?: string;
  onOpenGiftVault?: () => void;
  isSessionEnd?: boolean;
}

export const StickerRewardCelebrationModal: React.FC<StickerRewardCelebrationModalProps> = ({
  isOpen,
  onClose,
  gift,
  studentName = 'bé',
  customPraise,
  onOpenGiftVault,
  isSessionEnd = false,
}) => {
  useEffect(() => {
    if (isOpen && gift) {
      audioManager.playEffect('complete');
    }
  }, [isOpen, gift]);

  if (!isOpen || !gift) return null;

  const displayPraise =
    customPraise ||
    gift.praiseMessage ||
    `Thầy cô và Gia sư AI vô cùng tự hào về ${studentName}! Sự cố gắng và kiên trì mỗi ngày đã giúp bé đạt được thành tích tuyệt vời này!`;

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return {
          label: '👑 Huyền Thoại',
          bg: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-amber-950 border-amber-300',
        };
      case 'epic':
        return {
          label: '💎 Cực Phẩm',
          bg: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-400',
        };
      case 'rare':
        return {
          label: '🌟 Hiếm Có',
          bg: 'bg-gradient-to-r from-blue-500 to-teal-500 text-white border-blue-400',
        };
      default:
        return {
          label: '⭐ Đặc Biệt',
          bg: 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-emerald-400',
        };
    }
  };

  const rarityInfo = getRarityBadge(gift.rarity);

  return (
    <div
      id="sticker-reward-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
    >
      <div
        id="sticker-reward-modal-card"
        className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl border-4 border-amber-300 p-6 sm:p-7 text-center overflow-hidden animate-scaleUp"
      >
        {/* Decorative Top Sparkles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng quà tặng"
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Title */}
        <div className="space-y-1.5 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span>{isSessionEnd ? 'Quà Tặng Cuối Buổi Học' : 'Mốc Thành Tích Mới!'}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Khen Ngợi Bé <span className="text-blue-600">{studentName}</span>! 🎉
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Bé vừa nhận được một sticker quà tặng rực rỡ vào Kho Lưu Trữ
          </p>
        </div>

        {/* The Big Glowing Sticker Display */}
        <div className="my-6 relative flex flex-col items-center justify-center">
          {/* Glowing Aura */}
          <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-amber-300 via-pink-300 to-indigo-300 blur-xl opacity-70 animate-pulse pointer-events-none" />

          {/* Sticker Card */}
          <div
            className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br ${gift.badgeColor} flex items-center justify-center shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300`}
          >
            <span className="text-6xl sm:text-7xl filter drop-shadow-md select-none">
              {gift.emoji}
            </span>
          </div>

          {/* Rarity & Name */}
          <div className="mt-3 space-y-1">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black border shadow-2xs ${rarityInfo.bg}`}
            >
              {rarityInfo.label}
            </span>
            <h4 className="text-lg font-black text-slate-900 tracking-tight">{gift.name}</h4>
            <p className="text-xs text-slate-600 font-medium">{gift.description}</p>
          </div>
        </div>

        {/* Encouraging Praise Message Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 via-blue-50/60 to-purple-50/60 border border-amber-200/80 text-left space-y-2 relative shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Lời khen ngợi từ Thầy cô & Gia sư AI:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium italic">
            "{displayPraise}"
          </p>
        </div>

        {/* Bonus XP Award Banner */}
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            Phần thưởng kinh nghiệm:
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-extrabold shadow-2xs">
            +{gift.xpBonus} XP
          </span>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            id="btn-save-to-vault-and-close"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Cất vào Kho Quà Tặng 🎁</span>
          </button>

          {onOpenGiftVault && (
            <button
              id="btn-open-vault-from-celebration"
              onClick={() => {
                onClose();
                onOpenGiftVault();
              }}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs sm:text-sm border border-amber-300 transition-all flex items-center justify-center gap-1 shrink-0"
            >
              <span>Xem Kho Quà</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

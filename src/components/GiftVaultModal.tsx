import React, { useState, useMemo } from 'react';
import { UserProgress, UserProfile } from '../types';
import { getAllGiftsWithStatus, GiftWithStatus } from '../utils/giftUtils';
import { audioManager } from '../utils/audioUtils';
import {
  Gift,
  X,
  Sparkles,
  Lock,
  Unlock,
  Award,
  Zap,
  Calendar,
  Heart,
  Volume2,
  CheckCircle2,
  Star,
  Flame,
  Shield,
  Search,
} from 'lucide-react';

interface GiftVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  activeUser?: UserProfile;
  onClaimGift?: (giftId: string) => void;
}

export const GiftVaultModal: React.FC<GiftVaultModalProps> = ({
  isOpen,
  onClose,
  progress,
  activeUser,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unlocked' | 'locked' | 'session-end' | 'milestone'>('all');
  const [inspectingGift, setInspectingGift] = useState<GiftWithStatus | null>(null);

  const giftsWithStatus = useMemo(() => {
    return getAllGiftsWithStatus(progress);
  }, [progress]);

  const unlockedCount = giftsWithStatus.filter((g) => g.isUnlocked).length;
  const totalCount = giftsWithStatus.length;
  const totalBonusXp = giftsWithStatus
    .filter((g) => g.isUnlocked)
    .reduce((acc, g) => acc + g.xpBonus, 0);

  const filteredGifts = useMemo(() => {
    return giftsWithStatus.filter((g) => {
      if (selectedFilter === 'unlocked') return g.isUnlocked;
      if (selectedFilter === 'locked') return !g.isUnlocked;
      if (selectedFilter === 'session-end') return g.category === 'session-end';
      if (selectedFilter === 'milestone') return g.category === 'milestone' || g.category === 'mastery' || g.category === 'streak';
      return true;
    });
  }, [giftsWithStatus, selectedFilter]);

  if (!isOpen) return null;

  const handleInspect = (gift: GiftWithStatus) => {
    setInspectingGift(gift);
    audioManager.playEffect('click');
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return {
          label: '👑 Huyền Thoại',
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
        };
      case 'epic':
        return {
          label: '💎 Cực Phẩm',
          bg: 'bg-purple-100 text-purple-900 border-purple-300',
        };
      case 'rare':
        return {
          label: '🌟 Hiếm Có',
          bg: 'bg-blue-100 text-blue-900 border-blue-300',
        };
      default:
        return {
          label: '⭐ Đặc Biệt',
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        };
    }
  };

  return (
    <div
      id="gift-vault-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
    >
      <div
        id="gift-vault-modal-card"
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-10">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl border border-white/30 shadow-inner">
                🎁
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[10px] uppercase tracking-wider">
                    Kho Lưu Trữ Quà Tặng
                  </span>
                  <span className="text-xs text-amber-100 font-semibold">
                    Dành cho {activeUser?.name || 'Học sinh'} {activeUser?.avatar || '🦁'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                  Bộ Sưu Tập Sticker & Quà Thưởng
                </h2>
                <p className="text-xs text-amber-100/90 mt-0.5">
                  Lưu giữ toàn bộ huy hiệu thành tích, lời khen ngợi và quà tặng cuối buổi học của bé
                </p>
              </div>
            </div>

            {/* Collection Progress */}
            <div className="bg-black/15 p-3 rounded-2xl border border-white/20 flex items-center gap-4 text-xs font-bold self-start sm:self-auto">
              <div>
                <span className="text-amber-200 text-[10px] block uppercase">Đã thu thập</span>
                <span className="text-lg font-black text-white">
                  {unlockedCount} / {totalCount}
                </span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <span className="text-amber-200 text-[10px] block uppercase">XP từ quà</span>
                <span className="text-lg font-black text-amber-300">+{totalBonusXp} XP</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng kho quà tặng"
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Navigation Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                selectedFilter === 'all'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Tất cả ({totalCount})
            </button>
            <button
              onClick={() => setSelectedFilter('unlocked')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                selectedFilter === 'unlocked'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Đã mở ({unlockedCount})</span>
            </button>
            <button
              onClick={() => setSelectedFilter('locked')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                selectedFilter === 'locked'
                  ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Chưa mở ({totalCount - unlockedCount})</span>
            </button>
            <button
              onClick={() => setSelectedFilter('session-end')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                selectedFilter === 'session-end'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                  : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Cuối buổi học</span>
            </button>
            <button
              onClick={() => setSelectedFilter('milestone')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                selectedFilter === 'milestone'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Mốc kỳ tích</span>
            </button>
          </div>

          <div className="text-[11px] font-bold text-slate-500 hidden md:block">
            Bấm vào từng quà tặng để xem lời khen & điều kiện
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredGifts.map((gift) => {
              const rarityInfo = getRarityBadge(gift.rarity);

              return (
                <div
                  key={gift.id}
                  onClick={() => handleInspect(gift)}
                  className={`group relative p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center justify-between ${
                    gift.isUnlocked
                      ? 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-slate-50/80 border-slate-200 opacity-60 hover:opacity-80'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="w-full flex items-center justify-between mb-2">
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${rarityInfo.bg}`}
                    >
                      {gift.rarity === 'legendary' ? '👑 Cực phẩm' : gift.rarity === 'epic' ? '💎 Hiếm' : '⭐ Quà'}
                    </span>

                    {gift.isUnlocked ? (
                      <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        Đã nhận
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px] font-medium flex items-center gap-0.5">
                        <Lock className="w-3 h-3" />
                        Khóa
                      </span>
                    )}
                  </div>

                  {/* Sticker Visual */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center my-1.5 shadow-xs border-2 transition-transform group-hover:scale-105 ${
                      gift.isUnlocked
                        ? `bg-gradient-to-br ${gift.badgeColor} border-white shadow-md`
                        : 'bg-slate-200 border-slate-300 grayscale'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl select-none">{gift.emoji}</span>
                  </div>

                  {/* Info */}
                  <div className="space-y-0.5 mt-1 w-full">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                      {gift.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight">
                      {gift.isUnlocked ? gift.description : gift.requirement}
                    </p>
                  </div>

                  {/* XP / Unlocked date Footer */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 w-full flex items-center justify-between text-[10px] font-bold">
                    <span className="text-blue-600 flex items-center gap-0.5">
                      <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                      +{gift.xpBonus} XP
                    </span>
                    <span className="text-amber-600 text-[10px] group-hover:underline">
                      Xem chi tiết →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <p className="text-slate-600 font-medium">
            💡 <em>Gợi ý: Hoàn thành bài học mỗi ngày và làm bài kiểm tra để mở khóa toàn bộ quà tặng!</em>
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow-xs"
          >
            Đóng Kho Quà
          </button>
        </div>
      </div>

      {/* Individual Sticker Inspector Sub-Modal */}
      {inspectingGift && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center border-4 border-amber-300 shadow-2xl relative space-y-4 animate-scaleUp">
            <button
              onClick={() => setInspectingGift(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Sticker Icon */}
            <div className="flex flex-col items-center justify-center pt-2">
              <div
                className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-lg border-4 border-white ${
                  inspectingGift.isUnlocked
                    ? `bg-gradient-to-br ${inspectingGift.badgeColor}`
                    : 'bg-slate-200 grayscale'
                }`}
              >
                {inspectingGift.emoji}
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-2">
                {inspectingGift.name}
              </h3>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black border mt-1 ${
                  getRarityBadge(inspectingGift.rarity).bg
                }`}
              >
                {getRarityBadge(inspectingGift.rarity).label}
              </span>
            </div>

            {/* Requirement / Status */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Điều kiện nhận:</span>
                <span className="font-extrabold text-blue-600">+{inspectingGift.xpBonus} XP</span>
              </div>
              <p className="text-slate-600">{inspectingGift.requirement}</p>
              {inspectingGift.isUnlocked && inspectingGift.unlockedAt && (
                <p className="text-[11px] text-emerald-700 font-semibold pt-1 border-t border-slate-200">
                  ✓ Đã mở khóa vào:{' '}
                  {new Date(inspectingGift.unlockedAt).toLocaleDateString('vi-VN')}
                </p>
              )}
            </div>

            {/* Praise message if unlocked */}
            {inspectingGift.isUnlocked && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Lời khen ngợi dành cho bé:</span>
                </div>
                <p className="text-xs text-slate-700 italic font-medium">
                  "{inspectingGift.customPraise || inspectingGift.praiseMessage}"
                </p>
              </div>
            )}

            <button
              onClick={() => setInspectingGift(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

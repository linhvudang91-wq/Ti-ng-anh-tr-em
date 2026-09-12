import React, { useState } from 'react';
import { UserProfile, GradeLevel } from '../types';
import { getAllUsers, createUserProfile, setActiveUserId, deleteUserProfile } from '../utils/storageUtils';
import { User, Plus, Check, Shield, Award, Sparkles, Trash2, ArrowRight } from 'lucide-react';

interface LoginProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  isGate?: boolean; // If true, cannot close without selecting or creating a user
}

const AVATAR_OPTIONS = ['🦁', '🚀', '🦉', '🌟', '👑', '⚡', '🎯', '🦄', '🐬', '🦊', '🌸', '🏆'];

export const LoginProfileModal: React.FC<LoginProfileModalProps> = ({
  isOpen,
  onClose,
  activeUser,
  onSelectUser,
  isGate = false,
}) => {
  const [users, setUsers] = useState<UserProfile[]>(() => getAllUsers());
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState<GradeLevel>(activeUser?.grade || 9);
  const [newTarget, setNewTarget] = useState<'standard' | 'chuyen-b2'>('chuyen-b2');
  const [selectedAvatar, setSelectedAvatar] = useState('🦁');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSelect = (user: UserProfile) => {
    setActiveUserId(user.id);
    onSelectUser(user);
    onClose();
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setErrorMsg('Vui lòng nhập tên người học');
      return;
    }
    setErrorMsg('');
    const created = createUserProfile(newName.trim(), newGrade, newTarget, selectedAvatar);
    setUsers(getAllUsers());
    setIsCreating(false);
    setNewName('');
    onSelectUser(created);
    onClose();
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (users.length <= 1) {
      alert('Hệ thống cần ít nhất 1 tài khoản người học.');
      return;
    }
    if (confirm('Bạn có chắc muốn xóa hồ sơ người học này?')) {
      const remaining = deleteUserProfile(id);
      setUsers(remaining);
      if (activeUser.id === id) {
        onSelectUser(remaining[0]);
      }
    }
  };

  return (
    <div
      id="login-profile-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
    >
      <div
        id="login-profile-modal-card"
        className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-800 text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl border border-white/20">
              🎓
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/30 text-[11px] font-semibold border border-blue-300/30">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Cá nhân hóa hồ sơ người học
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                {isGate ? 'Chào bạn! Bạn là ai hôm nay?' : 'Chuyển đổi hồ sơ người học'}
              </h2>
              <p className="text-xs text-blue-100/90 mt-0.5">
                Mỗi người học có tiến trình, từ vựng và bài thi Chuyên B2 riêng biệt.
              </p>
            </div>
          </div>

          {!isGate && (
            <button
              id="close-profile-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 text-xl font-bold transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {!isCreating ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Danh sách người học ({users.length})
                </span>
                <button
                  id="open-create-user-form-btn"
                  onClick={() => setIsCreating(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Thêm người học mới
                </button>
              </div>

              {/* Profiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {users.map((u) => {
                  const isActive = activeUser?.id === u.id;
                  const completedCount = u.progress?.completedUnits?.length || 0;
                  const isChuyen = u.target === 'chuyen-b2';

                  return (
                    <div
                      key={u.id}
                      id={`profile-card-${u.id}`}
                      onClick={() => handleSelect(u)}
                      className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                        isActive
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl p-2 rounded-xl bg-white shadow-2xs border border-slate-100 group-hover:scale-105 transition-transform">
                            {u.avatar || '🌟'}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-slate-900 text-sm">{u.name}</h3>
                              {isActive && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded-md font-semibold">
                                  <Check className="w-2.5 h-2.5" /> Đang học
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                                Lớp {u.grade}
                              </span>
                              <span
                                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                  isChuyen
                                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                    : 'bg-emerald-50 text-emerald-700'
                                }`}
                              >
                                {isChuyen ? '🎯 Chuyên Anh B2' : '📘 Chuẩn GDPT'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {users.length > 1 && (
                          <button
                            id={`delete-user-${u.id}`}
                            title="Xóa hồ sơ"
                            onClick={(e) => handleDelete(e, u.id)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-500" />
                          {u.progress?.xp || 0} XP
                        </span>
                        <span>🔥 {u.progress?.streakDays || 1} ngày streak</span>
                        <span>{completedCount} bài xong</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Info Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  Dữ liệu bài làm, sổ tay từ vựng ngắt quãng SuperMemo-2 và điểm thi thử Chuyên vào 10 được lưu riêng biệt cho từng người học trên trình duyệt này.
                </p>
              </div>
            </>
          ) : (
            /* Create New Learner Form */
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-slate-800 text-sm">Tạo hồ sơ người học mới</h3>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  ← Quay lại danh sách
                </button>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Name input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ tên hoặc Biệt danh của bạn:
                </label>
                <input
                  id="new-user-name-input"
                  type="text"
                  required
                  placeholder="Ví dụ: Minh Anh, Đức Huy, Bảo Trâm..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  autoFocus
                />
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Chọn biểu tượng đại diện:
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all ${
                        selectedAvatar === av
                          ? 'border-blue-600 bg-blue-50 scale-110 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grade Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Chọn khối lớp đang học:
                </label>
                <div className="grid grid-cols-7 gap-1.5">
                  {([3, 4, 5, 6, 7, 8, 9] as GradeLevel[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setNewGrade(g)}
                      className={`py-2 text-xs font-bold rounded-lg border text-center transition-colors ${
                        newGrade === g
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Lớp {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target / Goal Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mục tiêu học tập:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    onClick={() => setNewTarget('standard')}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      newTarget === 'standard'
                        ? 'border-blue-600 bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      📘 Chuẩn GDPT 2018
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Nắm chắc kiến thức sách giáo khoa, đạt 9-10 điểm bài kiểm tra trên lớp.
                    </p>
                  </div>

                  <div
                    onClick={() => setNewTarget('chuyen-b2')}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      newTarget === 'chuyen-b2'
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                      🏆 Chuyên Anh B2 (Vào 10)
                    </div>
                    <p className="text-[11px] text-amber-800/80 mt-1">
                      Chinh phục đề thi Chuyên Sư Phạm, CNN, Ams, LHP với Word Formation & Inversion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  id="submit-create-user-btn"
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
                >
                  Bắt đầu học ngay <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { UserProfile, GradeLevel } from '../types';
import { getAllUsers, createUserProfile, setActiveUserId, deleteUserProfile } from '../utils/storageUtils';
import { Plus, Check, Shield, Award, Sparkles, Trash2, ArrowRight, AlertTriangle, Target, Compass } from 'lucide-react';

interface LoginProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  onOpenPersonalizedPathway?: (user: UserProfile) => void;
  isGate?: boolean; // If true, cannot close without selecting or creating a user
}

const AVATAR_OPTIONS = ['🦁', '🚀', '🦉', '🌟', '👑', '⚡', '🎯', '🦄', '🐬', '🦊', '🌸', '🏆'];

export const LoginProfileModal: React.FC<LoginProfileModalProps> = ({
  isOpen,
  onClose,
  activeUser,
  onSelectUser,
  onOpenPersonalizedPathway,
  isGate = false,
}) => {
  const [users, setUsers] = useState<UserProfile[]>(() => getAllUsers());
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState<GradeLevel>(activeUser?.grade || 9);
  const [newTarget, setNewTarget] = useState<'standard' | 'chuyen-b2'>('chuyen-b2');
  const [selectedAvatar, setSelectedAvatar] = useState('🦁');
  const [errorMsg, setErrorMsg] = useState('');
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [deletePin, setDeletePin] = useState<string>('');
  const [deletePinError, setDeletePinError] = useState<string>('');

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

  const requestDelete = (e: React.MouseEvent, user: UserProfile) => {
    e.stopPropagation();
    setUserToDelete(user);
    setDeletePin('');
    setDeletePinError('');
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    if (deletePin.trim() !== '1111') {
      setDeletePinError('Mã xóa không đúng. Vui lòng nhập đúng mã xác nhận là 1111.');
      return;
    }
    const deletedId = userToDelete.id;
    const remaining = deleteUserProfile(deletedId);
    setUsers(remaining);
    setUserToDelete(null);
    setDeletePin('');
    setDeletePinError('');

    // If active user was deleted, switch to the remaining active user
    if (activeUser.id === deletedId) {
      if (remaining.length > 0) {
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
                {isGate ? 'Chào bạn! Bạn là ai hôm nay?' : 'Quản lý & Chuyển đổi hồ sơ người học'}
              </h2>
              <p className="text-xs text-blue-100/90 mt-0.5">
                Mỗi người học có lộ trình 10 bài học, điểm kiểm tra và sổ từ vựng độc lập.
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
          {/* Delete Confirmation Box */}
          {userToDelete && (
            <div
              id="delete-user-confirmation-box"
              className="p-4 rounded-xl bg-red-50/90 border-2 border-red-200 text-red-900 space-y-3 animate-fadeIn"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-red-950">
                    Xác nhận xóa người học: {userToDelete.avatar} {userToDelete.name}?
                  </h4>
                  <p className="text-xs text-red-700 mt-1 leading-relaxed">
                    Hồ sơ này đang có <strong>{userToDelete.progress?.xp || 0} XP</strong>, đã hoàn thành{' '}
                    <strong>{userToDelete.progress?.completedUnits?.length || 0} bài học</strong> và{' '}
                    <strong>{userToDelete.progress?.savedNotebookWords?.length || 0} từ vựng</strong>.
                    Toàn bộ dữ liệu của người học này sẽ được xóa vĩnh viễn.
                  </p>

                  <div className="mt-3 p-3 bg-white rounded-xl border border-red-200 shadow-2xs space-y-2">
                    <label className="block text-xs font-bold text-slate-800">
                      🔒 Nhập mã xác nhận để xóa (Mã xóa: <span className="font-mono text-red-600 font-extrabold text-sm">1111</span>):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="input-delete-user-pin-modal"
                        type="text"
                        maxLength={10}
                        value={deletePin}
                        onChange={(e) => {
                          setDeletePin(e.target.value);
                          if (deletePinError) setDeletePinError('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') confirmDelete();
                        }}
                        placeholder="Nhập 1111"
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-mono tracking-widest text-slate-900 focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500 w-36 bg-slate-50"
                        autoFocus
                      />
                      <span className="text-[11px] text-slate-500 font-medium">Mã bảo vệ: <strong>1111</strong></span>
                    </div>
                    {deletePinError && (
                      <p className="text-xs font-bold text-red-600 flex items-center gap-1 mt-1">
                        ⚠️ {deletePinError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-red-200/60">
                <button
                  type="button"
                  onClick={() => {
                    setUserToDelete(null);
                    setDeletePin('');
                    setDeletePinError('');
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Giữ lại
                </button>
                <button
                  id="btn-confirm-delete-user"
                  type="button"
                  onClick={confirmDelete}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa hồ sơ này</span>
                </button>
              </div>
            </div>
          )}

          {!isCreating ? (
            <>
              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Danh sách người học ({users.length})
                  </span>
                  <button
                    id="btn-toggle-delete-mode"
                    type="button"
                    onClick={() => setDeleteMode(!deleteMode)}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border transition-all ${
                      deleteMode
                        ? 'bg-red-100 text-red-800 border-red-300 font-bold'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200'
                    }`}
                  >
                    {deleteMode ? 'Đang bật chế độ xóa' : '🗑️ Quản lý xóa bớt'}
                  </button>
                </div>

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
                      className={`group relative p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                        isActive
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl p-2 rounded-xl bg-white shadow-2xs border border-slate-100 group-hover:scale-105 transition-transform">
                              {u.avatar || '🌟'}
                            </span>
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h3 className="font-bold text-slate-900 text-sm">{u.name}</h3>
                                {isActive && (
                                  <span className="inline-flex items-center gap-0.5 text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded-md font-semibold">
                                    <Check className="w-2.5 h-2.5" /> Đang học
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
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

                          {/* Delete Button: clearly accessible & highlighted in deleteMode */}
                          <button
                            id={`delete-user-${u.id}`}
                            title={`Xóa hồ sơ ${u.name}`}
                            type="button"
                            onClick={(e) => requestDelete(e, u)}
                            className={`p-1.5 rounded-lg border transition-all ${
                              deleteMode
                                ? 'bg-red-50 text-red-600 border-red-300 shadow-2xs scale-105'
                                : 'text-slate-400 hover:text-red-600 border-transparent hover:border-red-200 hover:bg-red-50'
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Stats & Pathway Shortcut */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-500" />
                            {u.progress?.xp || 0} XP
                          </span>
                          <span>🔥 {u.progress?.streakDays || 1} ngày streak</span>
                          <span className="text-slate-700 font-bold">{completedCount}/10 bài xong</span>
                        </div>

                        {onOpenPersonalizedPathway && (
                          <button
                            id={`view-pathway-user-${u.id}`}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveUserId(u.id);
                              onSelectUser(u);
                              onOpenPersonalizedPathway(u);
                            }}
                            className="w-full py-1 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold flex items-center justify-center gap-1.5 border border-indigo-200 transition-colors"
                          >
                            <Target className="w-3 h-3 text-indigo-600" />
                            <span>Xem Lộ trình 10 bài học</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Info Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  Bạn có thể tạo thêm nhiều hồ sơ cho các bé hoặc xóa bớt người học bất kỳ lúc nào. Dữ liệu tiến trình 10 bài học, điểm số và sổ từ vựng của mỗi người học được lưu trữ độc lập.
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
                      🏆 Chuyên Anh B2 (Vào 10 / CLC)
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

import React, { useState } from 'react';
import { UserProfile, GradeLevel, EducationLevel } from '../types';
import {
  getAllUsers,
  createUserProfile,
  setActiveUserId,
  deleteUserProfile,
} from '../utils/storageUtils';
import {
  GraduationCap,
  Sparkles,
  Users,
  UserPlus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Flame,
  Award,
  BookOpen,
  Target,
  Layers,
  AlertTriangle,
  X,
  Compass,
  Check,
} from 'lucide-react';

interface PortalLayerProps {
  selectedLevel: EducationLevel;
  onSelectLevel: (level: EducationLevel) => void;
  activeUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  onEnterCurriculum: () => void;
  onOpenPersonalizedPathway: (user: UserProfile) => void;
}

const AVATAR_LIST = ['🦁', '🚀', '🦉', '🌟', '👑', '⚡', '🎯', '🦄', '🐬', '🦊', '🌸', '🏆'];

export const PortalLayer: React.FC<PortalLayerProps> = ({
  selectedLevel,
  onSelectLevel,
  activeUser,
  onSelectUser,
  onEnterCurriculum,
  onOpenPersonalizedPathway,
}) => {
  const [users, setUsers] = useState<UserProfile[]>(() => getAllUsers());
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);
  const [deletePin, setDeletePin] = useState<string>('');
  const [deletePinError, setDeletePinError] = useState<string>('');

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserGrade, setNewUserGrade] = useState<GradeLevel>(selectedLevel === 'cap-1' ? 3 : 6);
  const [newUserTarget, setNewUserTarget] = useState<'standard' | 'nang-cao-lop6' | 'chuyen-b2'>('standard');
  const [newUserAvatar, setNewUserAvatar] = useState('🌟');
  const [formError, setFormError] = useState('');

  // Refresh users list
  const refreshUsers = () => {
    const list = getAllUsers();
    setUsers(list);
  };

  const handleLevelChange = (level: EducationLevel) => {
    onSelectLevel(level);
    // If current activeUser is not in this level, find first user in this level
    const userInLevel = users.find((u) => u.educationLevel === level || (level === 'cap-1' ? u.grade <= 5 : u.grade >= 6));
    if (userInLevel && userInLevel.id !== activeUser.id) {
      setActiveUserId(userInLevel.id);
      onSelectUser(userInLevel);
    }
  };

  const handleSelectUser = (user: UserProfile) => {
    setActiveUserId(user.id);
    onSelectUser(user);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) {
      setFormError('Vui lòng nhập tên người học');
      return;
    }
    setFormError('');
    const created = createUserProfile(newUserName.trim(), newUserGrade, newUserTarget, newUserAvatar);
    refreshUsers();
    onSelectUser(created);
    setShowAddUserModal(false);
    setNewUserName('');
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    if (deletePin.trim() !== '1111') {
      setDeletePinError('Mã xác nhận không đúng. Vui lòng nhập mã 1111 để xóa.');
      return;
    }
    const deletedId = userToDelete.id;
    const remaining = deleteUserProfile(deletedId);
    setUsers(remaining);
    setUserToDelete(null);
    setDeletePin('');
    setDeletePinError('');

    // If active user was deleted, switch to the remaining active user
    if (activeUser.id === deletedId && remaining.length > 0) {
      onSelectUser(remaining[0]);
    }
  };

  // Filter users corresponding to the selected level, but also allow seeing others
  const currentLevelUsers = users.filter((u) =>
    selectedLevel === 'cap-1' ? u.grade <= 5 : u.grade >= 6
  );
  const displayUsers = currentLevelUsers.length > 0 ? currentLevelUsers : users;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col justify-between p-4 sm:p-6 lg:p-10 font-sans selection:bg-blue-500 selection:text-white">
      {/* Container */}
      <div className="max-w-6xl w-full mx-auto space-y-8 my-auto">
        {/* Top Branding & Multi-layer Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
            <Layers className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Lớp Ngoài Cùng • Cổng Phân Loại & Cá Nhân Hóa Học Tập</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200">
            Học Tiếng Anh Chuẩn GDPT 2018 (Lớp 3 - 9)
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Hệ thống 70 Units toàn diện, mỗi bài học 20-30 từ vựng cốt lõi & mở rộng, cá nhân hóa lộ trình 10 bài đầu và hỗ trợ nhiều chế độ học tập.
          </p>
        </div>

        {/* STEP 1: CHỌN CẤP HỌC (LỚP NGOÀI CÙNG PHÂN LOẠI) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">1</span>
              <h2 className="text-lg sm:text-xl font-bold text-white">Bước 1: Chọn Cấp học mục tiêu</h2>
            </div>
            <span className="text-xs text-slate-400">Tối ưu nội dung theo lứa tuổi</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card Cấp 1 */}
            <div
              onClick={() => handleLevelChange('cap-1')}
              className={`cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 relative border-2 flex flex-col justify-between ${
                selectedLevel === 'cap-1'
                  ? 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-emerald-900/40 border-emerald-400 shadow-xl shadow-emerald-950/50 ring-2 ring-emerald-400/30'
                  : 'bg-slate-900/60 border-slate-700/70 hover:border-slate-500 hover:bg-slate-800/50'
              }`}
            >
              {selectedLevel === 'cap-1' && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đang chọn
                </div>
              )}

              <div className="space-y-3">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-3xl">
                  🎒
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-1">
                    Lớp 3 • Lớp 4 • Lớp 5
                  </div>
                  <h3 className="text-2xl font-black text-white">Cấp 1: Tiểu học</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Trực quan sinh động, phát triển phản xạ tự nhiên qua tranh ảnh, âm thanh chuẩn bản ngữ, đàm thoại mẫu câu và học từ vựng nền tảng (Pre-A1 & A1).
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-300 font-medium">
                <span>30 Units • 600+ Từ vựng cơ bản & nâng cao</span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  Khám phá Cấp 1 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Card Cấp 2 */}
            <div
              onClick={() => handleLevelChange('cap-2')}
              className={`cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 relative border-2 flex flex-col justify-between ${
                selectedLevel === 'cap-2'
                  ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900 to-blue-900/40 border-blue-400 shadow-xl shadow-blue-950/50 ring-2 ring-blue-400/30'
                  : 'bg-slate-900/60 border-slate-700/70 hover:border-slate-500 hover:bg-slate-800/50'
              }`}
            >
              {selectedLevel === 'cap-2' && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đang chọn
                </div>
              )}

              <div className="space-y-3">
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-3xl">
                  🏛️
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-semibold mb-1">
                    Lớp 6 • Lớp 7 • Lớp 8 • Lớp 9
                  </div>
                  <h3 className="text-2xl font-black text-white">Cấp 2: Trung học cơ sở</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Ngữ pháp chuyên sâu, tư duy ngôn ngữ học thuật, đọc hiểu thực tế, chuẩn bị thi vào lớp 10 và bồi dưỡng Chuyên Anh (A2 - B1/B2).
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-300 font-medium">
                <span>40 Units • 800+ Từ vựng học thuật & B1+/B2 Chuyên</span>
                <span className="flex items-center gap-1 text-blue-400 font-bold">
                  Khám phá Cấp 2 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: CHỌN NGƯỜI HỌC & QUẢN LÝ (THÊM / XÓA BỚT NGƯỜI HỌC) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">2</span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Bước 2: Chọn người học ({selectedLevel === 'cap-1' ? 'Tiểu học' : 'THCS'})
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setNewUserGrade(selectedLevel === 'cap-1' ? 3 : 6);
                  setShowAddUserModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Thêm người học mới</span>
              </button>
            </div>
          </div>

          {/* Learner Profile Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayUsers.map((u) => {
              const isSelected = u.id === activeUser.id;
              const completedCount = u.progress?.completedUnits?.length || 0;
              const streak = u.progress?.streakDays || 1;
              const xp = u.progress?.xp || 0;

              return (
                <div
                  key={u.id}
                  onClick={() => handleSelectUser(u)}
                  className={`rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-200 border-2 relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-400/90 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/30'
                      : 'bg-slate-900/50 border-slate-700/60 hover:border-slate-500 hover:bg-slate-800/40'
                  }`}
                >
                  {/* Top Bar inside Card */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-700/60 border border-slate-600 flex items-center justify-center text-2xl shadow-inner">
                        {u.avatar || '🌟'}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-base text-white">{u.name}</h4>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30 animate-pulse" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-300">
                          <span className="font-semibold text-blue-300">Lớp {u.grade}</span>
                          <span>•</span>
                          <span className="text-slate-400">
                            {u.target === 'chuyen-b2' ? 'Bồi dưỡng Chuyên' : u.target === 'nang-cao-lop6' ? 'Nâng cao' : 'Chuẩn SGK'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      title="Xóa bớt người học này"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserToDelete(u);
                        setDeletePin('');
                        setDeletePinError('');
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress Stats */}
                  <div className="grid grid-cols-3 gap-2 my-4 py-2.5 px-3 rounded-xl bg-slate-950/40 border border-slate-800 text-center text-xs">
                    <div>
                      <div className="text-slate-400 text-[11px]">Kinh nghiệm</div>
                      <div className="font-bold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                        <Award className="w-3 h-3" />
                        {xp} XP
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Chuỗi ngày</div>
                      <div className="font-bold text-orange-400 flex items-center justify-center gap-1 mt-0.5">
                        <Flame className="w-3 h-3" />
                        {streak} ngày
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Đã học</div>
                      <div className="font-bold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        {completedCount} bài
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action inside card */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectUser(u);
                        onOpenPersonalizedPathway(u);
                      }}
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <Compass className="w-3.5 h-3.5 text-blue-400" />
                      <span>Lộ trình 10 bài</span>
                    </button>

                    <button
                      onClick={() => handleSelectUser(u)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
                          : 'bg-blue-600 hover:bg-blue-500 text-white'
                      }`}
                    >
                      {isSelected ? 'Đang chọn ✓' : 'Chọn'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 3: VÀO KHÔNG GIAN BÀI HỌC */}
        <div className="pt-2">
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 border border-blue-400/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                Sẵn sàng học tập cùng {activeUser.name} ({activeUser.avatar})
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Không gian bài học: {selectedLevel === 'cap-1' ? 'Cấp 1 Tiểu học' : 'Cấp 2 THCS'} (Lớp {activeUser.grade})
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm">
                Đầy đủ 20-30 từ vựng/unit, 3 chế độ (Bài học mới, Tiếp tục, Ôn tập) và trợ giảng AI đồng hành.
              </p>
            </div>

            <button
              onClick={onEnterCurriculum}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base shadow-xl hover:shadow-amber-400/20 transition-all flex items-center justify-center gap-2 shrink-0 transform active:scale-95"
            >
              <span>Vào Bài Học Ngay</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <footer className="mt-8 text-center text-xs text-slate-500">
        Hệ thống học tiếng Anh đa lớp chuẩn Chương trình GDPT 2018 Bộ GD&ĐT • Dành cho học sinh từ Lớp 3 đến Lớp 9
      </footer>

      {/* MODAL: THÊM NGƯỜI HỌC MỚI */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Thêm người học mới</h3>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              {formError && (
                <div className="p-2.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs">
                  {formError}
                </div>
              )}

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Tên người học</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Ví dụ: Minh Khang, Bảo Ngọc..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-blue-400"
                />
              </div>

              {/* Grade */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Khối lớp (3 - 9)</label>
                <select
                  value={newUserGrade}
                  onChange={(e) => setNewUserGrade(Number(e.target.value) as GradeLevel)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-blue-400"
                >
                  <optgroup label="Cấp 1 (Tiểu học)">
                    <option value={3}>Lớp 3 (Pre-A1)</option>
                    <option value={4}>Lớp 4 (Pre-A1+)</option>
                    <option value={5}>Lớp 5 (A1)</option>
                  </optgroup>
                  <optgroup label="Cấp 2 (THCS)">
                    <option value={6}>Lớp 6 (A1+)</option>
                    <option value={7}>Lớp 7 (A2)</option>
                    <option value={8}>Lớp 8 (A2+ / B1)</option>
                    <option value={9}>Lớp 9 (B1 / B2 Chuyên)</option>
                  </optgroup>
                </select>
              </div>

              {/* Target */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Mục tiêu học tập</label>
                <select
                  value={newUserTarget}
                  onChange={(e) => setNewUserTarget(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-blue-400"
                >
                  <option value="standard">Chuẩn SGK GDPT 2018 (Chắc kiến thức)</option>
                  <option value="nang-cao-lop6">Nâng cao & Ôn luyện học sinh giỏi</option>
                  <option value="chuyen-b2">Chuyên Anh & Khảo thí B1+/B2</option>
                </select>
              </div>

              {/* Avatar Selection */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Chọn ảnh đại diện</label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_LIST.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewUserAvatar(emoji)}
                      className={`h-10 rounded-lg text-xl flex items-center justify-center border transition-all ${
                        newUserAvatar === emoji
                          ? 'bg-blue-600 border-blue-400 shadow-md ring-2 ring-blue-400/40'
                          : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
                >
                  Tạo hồ sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: XÁC NHẬN XÓA BỚT NGƯỜI HỌC */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto text-2xl">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Xác nhận xóa người học?</h3>
              <p className="text-slate-300 text-xs">
                Bạn có chắc chắn muốn xóa hồ sơ học tập của <strong>"{userToDelete.name}"</strong> (Lớp {userToDelete.grade}) không? Thao tác này sẽ dọn bớt người học không còn sử dụng.
              </p>
            </div>

            {/* PIN Code 1111 Security Box */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-red-500/30 text-left space-y-2">
              <label className="block text-xs font-bold text-slate-200">
                🔒 Nhập mã bảo mật để xóa (Mã xóa: <span className="text-red-400 font-mono font-extrabold text-sm">1111</span>):
              </label>
              <input
                id="input-delete-user-pin-portal"
                type="text"
                maxLength={10}
                value={deletePin}
                onChange={(e) => {
                  setDeletePin(e.target.value);
                  if (deletePinError) setDeletePinError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleDeleteUser();
                }}
                placeholder="Nhập 1111"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono tracking-widest text-sm focus:outline-hidden focus:border-red-400 focus:ring-1 focus:ring-red-400"
                autoFocus
              />
              {deletePinError && (
                <p className="text-xs font-bold text-red-400 flex items-center gap-1">
                  ⚠️ {deletePinError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setUserToDelete(null);
                  setDeletePin('');
                  setDeletePinError('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa người học</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

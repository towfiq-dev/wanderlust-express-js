'use client';

import { useState } from 'react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import {
  User, Mail, Camera, Shield, Calendar,
  Edit2, Check, X, Key, Eye, EyeOff
} from 'lucide-react';

export default function AdminProfileClient({ user }) {
  const [editing, setEditing] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    image: user?.image || '',
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await authClient.updateUser({
        name: formData.name,
        image: formData.image,
      });
      if (res?.data) {
        toast.success('Profile updated successfully!');
        setEditing(false);
      } else {
        toast.error('Update failed. Please try again.');
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const currentPassword = fd.get('currentPassword');
    const newPassword = fd.get('newPassword');
    const confirm = fd.get('confirmPassword');

    if (newPassword !== confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setSaving(true);
    try {
      const res = await authClient.changePassword({ currentPassword, newPassword });
      if (res?.data) {
        toast.success('Password changed successfully!');
        setChangingPw(false);
        e.target.reset();
      } else {
        toast.error(res?.error?.message || 'Password change failed');
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <p className="text-gray-400">Please sign in to view your profile.</p>
      </div>
    );
  }

  const joinDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left: Avatar Card */}
      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          {/* Avatar */}
          <div className="relative w-24 h-24 mx-auto mb-5">
            {user.image ? (
              <Image
                src={formData.image || user.image}
                alt={user.name || 'Profile'}
                fill
                className="rounded-2xl object-cover border-4 border-white shadow-xl"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-3xl shadow-xl">
                {user.name?.[0]?.toUpperCase() || 'A'}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:bg-cyan-600 transition-colors">
              <Camera size={14} className="text-white" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-400 text-sm mt-1">{user.email}</p>

          {/* Role Badge */}
          <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 text-xs font-bold px-4 py-2 rounded-full mt-4">
            <Shield size={12} />
            Admin
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Account Info</h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                <User size={14} className="text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Full Name</p>
                <p className="font-medium text-gray-800">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                <Mail size={14} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400">Email</p>
                <p className="font-medium text-gray-800 truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                <Calendar size={14} className="text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Member Since</p>
                <p className="font-medium text-gray-800">{joinDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Edit Forms */}
      <div className="lg:col-span-2 space-y-5">

        {/* Profile Edit */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
            <div>
              <h3 className="font-bold text-gray-900">Profile Information</h3>
              <p className="text-xs text-gray-400 mt-0.5">Update your name and profile photo</p>
            </div>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:bg-cyan-50 px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                <Edit2 size={15} /> Edit
              </button>
            ) : (
              <button
                onClick={() => { setEditing(false); setFormData({ name: user.name, image: user.image }); }}
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                <X size={15} /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  disabled={!editing}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none
                    focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all
                    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Email cannot be changed from this panel.</p>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Photo URL</label>
              <div className="relative">
                <Camera size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={formData.image}
                  onChange={e => setFormData(p => ({ ...p, image: e.target.value }))}
                  disabled={!editing}
                  placeholder="https://..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none
                    focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all
                    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {editing && (
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-xl transition-all cursor-pointer disabled:opacity-70 shadow-lg shadow-cyan-200/40 text-sm"
              >
                <Check size={16} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </form>
        </div>

        {/* Password Change */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
            <div>
              <h3 className="font-bold text-gray-900">Password & Security</h3>
              <p className="text-xs text-gray-400 mt-0.5">Keep your account secure with a strong password</p>
            </div>
            <button
              onClick={() => setChangingPw(!changingPw)}
              className="flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:bg-cyan-50 px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              <Key size={15} />
              {changingPw ? 'Cancel' : 'Change'}
            </button>
          </div>

          {changingPw ? (
            <form onSubmit={handleChangePassword} className="p-6 space-y-5">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="currentPassword"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Your current password"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-500 cursor-pointer">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="newPassword"
                    type={showNewPw ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all"
                  />
                  <button type="button" onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-500 cursor-pointer">
                    {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Repeat new password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-xl transition-all cursor-pointer disabled:opacity-70 text-sm"
              >
                <Check size={16} />
                {saving ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          ) : (
            <div className="p-6">
              <div className="flex items-center gap-3 text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
                <Shield size={18} className="text-emerald-500 shrink-0" />
                <span>Your password is secure. We recommend changing it every 90 days.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

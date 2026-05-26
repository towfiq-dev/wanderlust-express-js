'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Bell, Mail, Globe, Shield, Moon, Monitor,
  Save, ToggleLeft, ToggleRight, Palette, Lock
} from 'lucide-react';

const Toggle = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative w-11 h-6 rounded-full transition-all duration-250 cursor-pointer shrink-0
      ${enabled ? 'bg-cyan-500' : 'bg-gray-200'}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-250
      ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const Section = ({ icon: Icon, title, description, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3">
      <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center">
        <Icon size={18} className="text-gray-500" />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </div>
);

const SettingRow = ({ label, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between gap-4 py-1">
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
    </div>
    <Toggle enabled={enabled} onToggle={onToggle} />
  </div>
);

export default function AdminSettingsClient() {
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    bookingAlerts: true,
    newUserAlerts: false,
    weeklyReport: true,
    // Platform
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: false,
    // Display
    darkMode: false,
    compactView: false,
  });

  const [siteName, setSiteName] = useState('Wanderlust');
  const [supportEmail, setSupportEmail] = useState('hello@wanderlust.com');
  const [saving, setSaving] = useState(false);

  const toggle = (key) => setSettings(p => ({ ...p, [key]: !p[key] }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800)); // simulate save
    toast.success('Settings saved successfully!');
    setSaving(false);
  };

  return (
    <div className="space-y-5 max-w-3xl">

      {/* General */}
      <Section icon={Globe} title="General Settings" description="Basic platform configuration">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Site Name</label>
            <input
              type="text"
              value={siteName}
              onChange={e => setSiteName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Support Email</label>
            <input
              type="email"
              value={supportEmail}
              onChange={e => setSupportEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all bg-gray-50"
            />
          </div>
        </div>
      </Section>

      {/* Notifications */}
      <Section icon={Bell} title="Notifications" description="Control which alerts you receive">
        <SettingRow
          label="Email Notifications"
          description="Receive important alerts via email"
          enabled={settings.emailNotifications}
          onToggle={() => toggle('emailNotifications')}
        />
        <SettingRow
          label="New Booking Alerts"
          description="Get notified when a new booking is made"
          enabled={settings.bookingAlerts}
          onToggle={() => toggle('bookingAlerts')}
        />
        <SettingRow
          label="New User Registration"
          description="Alert when a new user registers"
          enabled={settings.newUserAlerts}
          onToggle={() => toggle('newUserAlerts')}
        />
        <SettingRow
          label="Weekly Summary Report"
          description="Receive a weekly digest of platform activity"
          enabled={settings.weeklyReport}
          onToggle={() => toggle('weeklyReport')}
        />
      </Section>

      {/* Platform */}
      <Section icon={Shield} title="Platform Control" description="Manage platform-level settings">
        <SettingRow
          label="Allow New Registrations"
          description="Let new users create accounts on the platform"
          enabled={settings.allowRegistrations}
          onToggle={() => toggle('allowRegistrations')}
        />
        <SettingRow
          label="Require Email Verification"
          description="New users must verify email before accessing the platform"
          enabled={settings.requireEmailVerification}
          onToggle={() => toggle('requireEmailVerification')}
        />
        <div className="pt-2 border-t border-gray-50">
          <SettingRow
            label="Maintenance Mode"
            description="Temporarily disable the platform for visitors"
            enabled={settings.maintenanceMode}
            onToggle={() => toggle('maintenanceMode')}
          />
          {settings.maintenanceMode && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 flex items-start gap-2">
              <span className="shrink-0 mt-0.5">⚠️</span>
              <span>Maintenance mode is <strong>ON</strong>. Visitors will see a maintenance page. Admin access is still available.</span>
            </div>
          )}
        </div>
      </Section>

      {/* Display */}
      <Section icon={Monitor} title="Display Preferences" description="Customize your admin panel experience">
        <SettingRow
          label="Compact View"
          description="Show more items with reduced spacing in tables"
          enabled={settings.compactView}
          onToggle={() => toggle('compactView')}
        />
      </Section>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-red-50 flex items-center gap-3">
          <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
            <Lock size={18} className="text-red-400" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Danger Zone</h3>
            <p className="text-xs text-gray-400 mt-0.5">Irreversible actions — proceed with caution</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-4 p-4 bg-red-50/50 rounded-xl border border-red-100">
            <div>
              <p className="text-sm font-semibold text-gray-800">Clear All Bookings</p>
              <p className="text-xs text-gray-400 mt-0.5">Permanently delete all booking records</p>
            </div>
            <button className="px-4 py-2 border border-red-300 text-red-500 hover:bg-red-50 rounded-xl text-xs font-semibold transition-all cursor-pointer">
              Clear Data
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 p-4 bg-red-50/50 rounded-xl border border-red-100">
            <div>
              <p className="text-sm font-semibold text-gray-800">Reset Platform Settings</p>
              <p className="text-xs text-gray-400 mt-0.5">Restore all settings to their default values</p>
            </div>
            <button
              onClick={() => { setSettings({ emailNotifications: true, bookingAlerts: true, newUserAlerts: false, weeklyReport: true, maintenanceMode: false, allowRegistrations: true, requireEmailVerification: false, darkMode: false, compactView: false }); toast.info('Settings reset to defaults'); }}
              className="px-4 py-2 border border-red-300 text-red-500 hover:bg-red-50 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-xl transition-all cursor-pointer disabled:opacity-70 shadow-lg shadow-cyan-200/40 text-sm"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>
    </div>
  );
}

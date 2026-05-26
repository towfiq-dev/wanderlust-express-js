import AdminSettingsClient from '@/components/admin/AdminSettingsClient';

export const metadata = { title: 'Settings' };

export default function AdminSettings() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <p className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-1">Admin</p>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure platform preferences and notifications</p>
      </div>
      <AdminSettingsClient />
    </div>
  );
}

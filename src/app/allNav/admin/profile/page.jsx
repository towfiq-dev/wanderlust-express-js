import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import AdminProfileClient from '@/components/admin/AdminProfileClient';

export const metadata = { title: 'My Profile' };

export default async function AdminProfile() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <p className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-1">Admin</p>
        <h1 className="text-2xl font-serif font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">View and update your account information</p>
      </div>

      <AdminProfileClient user={user} />
    </div>
  );
}

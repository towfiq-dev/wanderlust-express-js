import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import AdminBookingsClient from '@/components/admin/AdminBookingsClient';

export const metadata = { title: 'All Bookings' };

export default async function AdminBookings() {
  const { token } = await auth.api.getToken({ headers: await headers() });

  // Try to get all bookings — requires backend /admin/bookings endpoint
  // Falls back gracefully if not implemented yet
  let bookings = [];
  let note = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/bookings`, {
      headers: { authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (res.ok) {
      bookings = await res.json();
    } else {
      note = 'backend-missing';
    }
  } catch {
    note = 'backend-missing';
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <p className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-1">Admin</p>
        <h1 className="text-2xl font-serif font-bold text-gray-900">All Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">View and manage all platform bookings</p>
      </div>

      <AdminBookingsClient bookings={bookings} backendNote={note} token={token} />
    </div>
  );
}

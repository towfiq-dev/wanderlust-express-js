import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import AdminDestinationsTable from '@/components/admin/AdminDestinationsTable';

export const metadata = { title: 'Manage Destinations' };

export default async function AdminDestinations() {
  const { token } = await auth.api.getToken({ headers: await headers() });

  let destinations = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`, { cache: 'no-store' });
    destinations = await res.json();
  } catch { /* empty */ }

  return (
    <div className="p-6 md:p-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Destinations</h1>
          <p className="text-gray-500 text-sm mt-1">
            {destinations.length} total destinations · manage, edit or remove
          </p>
        </div>
        <Link href="/allNav/allDestinations">
          <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-200/40 text-sm cursor-pointer">
            <Plus size={16} />
            Add New
          </button>
        </Link>
      </div>

      {/* Table component (client) */}
      <AdminDestinationsTable destinations={destinations} token={token} />
    </div>
  );
}

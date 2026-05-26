'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import {
  Search, MapPin, Calendar, Trash2, AlertCircle,
  CalendarCheck, Info
} from 'lucide-react';

const FILTERS = ['All', 'Upcoming', 'Completed'];

export default function AdminBookingsClient({ bookings: initial, backendNote }) {
  const [bookings, setBookings] = useState(initial || []);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = bookings.filter(b => {
    const matchSearch =
      b.destinationName?.toLowerCase().includes(search.toLowerCase()) ||
      b.userName?.toLowerCase().includes(search.toLowerCase()) ||
      b.country?.toLowerCase().includes(search.toLowerCase());

    const isUpcoming = new Date(b.date) >= new Date();
    const matchFilter =
      filter === 'All' ||
      (filter === 'Upcoming' && isUpcoming) ||
      (filter === 'Completed' && !isUpcoming);

    return matchSearch && matchFilter;
  });

  const totalRevenue = filtered.reduce((s, b) => s + Number(b.price || 0), 0);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${deleteId}`, {
        method: 'DELETE',
        headers: { authorization: `Bearer ${tokenData?.token}` }
      });
      const data = await res.json();
      if (data) {
        setBookings(prev => prev.filter(b => b._id !== deleteId));
        toast.success('Booking cancelled');
        setDeleteId(null);
      } else { toast.error('Cancel failed'); }
    } catch { toast.error('Something went wrong'); }
    finally { setDeleting(false); }
  };

  if (backendNote === 'backend-missing') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 flex items-start gap-4">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
          <Info size={20} className="text-amber-600" />
        </div>
        <div>
          <h3 className="font-bold text-amber-900 mb-2">Backend Endpoint Required</h3>
          <p className="text-amber-700 text-sm leading-relaxed mb-3">
            To show all bookings in the admin panel, add this route to your Express backend:
          </p>
          <pre className="bg-amber-900/10 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 overflow-x-auto">
{`app.get('/admin/bookings', verifyToken, async (req, res) => {
  const result = await bookingCollection.find().toArray();
  res.send(result);
})`}
          </pre>
          <p className="text-amber-600 text-xs mt-3">
            After adding this, restart your backend server and all bookings will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: bookings.length, color: 'text-gray-900' },
          { label: 'Upcoming', value: bookings.filter(b => new Date(b.date) >= new Date()).length, color: 'text-emerald-600' },
          { label: 'Completed', value: bookings.filter(b => new Date(b.date) < new Date()).length, color: 'text-gray-500' },
          { label: 'Total Revenue', value: `$${bookings.reduce((s, b) => s + Number(b.price || 0), 0).toLocaleString()}`, color: 'text-cyan-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <div className={`text-2xl font-black mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by traveler, destination, country..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 bg-gray-50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            {FILTERS.map(f => (
              <button key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer
                  ${filter === f ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          {filtered.length} booking{filtered.length !== 1 ? 's' : ''} · Revenue: ${totalRevenue.toLocaleString()}
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[750px]">
            <thead>
              <tr className="text-left text-xs text-gray-400 font-bold uppercase tracking-wider bg-gray-50/80 border-b border-gray-100">
                <th className="px-5 py-3.5">Traveler</th>
                <th className="px-5 py-3.5">Destination</th>
                <th className="px-5 py-3.5">Travel Date</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <CalendarCheck size={32} className="text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No bookings found</p>
                  </td>
                </tr>
              ) : filtered.map((b, i) => {
                const isUpcoming = new Date(b.date) >= new Date();
                return (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        {b.userImage ? (
                          <Image src={b.userImage} alt={b.userName || ''} width={34} height={34}
                            className="rounded-lg object-cover border border-gray-100 shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                            {b.userName?.[0]?.toUpperCase() || 'U'}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{b.userName || 'User'}</p>
                          <p className="text-xs text-gray-400 font-mono">{b._id?.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800 text-sm">{b.destinationName}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <MapPin size={10} />{b.country}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                        <Calendar size={13} className="text-gray-400" />
                        {new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-bold text-gray-900">${b.price}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full
                        ${isUpcoming ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isUpcoming ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                        {isUpcoming ? 'Upcoming' : 'Completed'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setDeleteId(b._id)}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <AlertCircle size={28} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Cancel Booking?</h3>
            <p className="text-gray-500 text-sm text-center mb-8">
              This will permanently cancel this booking. The traveler will need to rebook if needed.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
                Keep
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer disabled:opacity-70">
                {deleting ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

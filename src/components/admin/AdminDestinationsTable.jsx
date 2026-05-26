'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import {
  Search, MapPin, Calendar, Edit2, Trash2,
  Eye, Filter, ChevronDown, AlertCircle, X
} from 'lucide-react';

const CATEGORIES = ['All', 'Beach', 'Mountain', 'Adventure', 'Cultural', 'City'];

export default function AdminDestinationsTable({ destinations: initial }) {
  const router = useRouter();
  const [destinations, setDestinations] = useState(initial || []);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [saving, setSaving] = useState(false);

  // Filtered list
  const filtered = destinations.filter(d => {
    const matchSearch = d.destinationName?.toLowerCase().includes(search.toLowerCase()) ||
      d.country?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || d.category === category;
    return matchSearch && matchCat;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${deleteId}`, {
        method: 'DELETE',
        headers: { authorization: `Bearer ${tokenData?.token}` }
      });
      const data = await res.json();
      if (data) {
        setDestinations(prev => prev.filter(d => d._id !== deleteId));
        toast.success('Destination deleted successfully');
        setDeleteId(null);
      } else {
        toast.error('Delete failed');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const newData = Object.fromEntries(formData.entries());
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${editItem._id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(newData)
      });
      const data = await res.json();
      if (data) {
        setDestinations(prev => prev.map(d => d._id === editItem._id ? { ...d, ...newData } : d));
        toast.success('Destination updated!');
        setEditItem(null);
      } else {
        toast.error('Update failed');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const catColors = {
    Beach: 'bg-cyan-100 text-cyan-700',
    Mountain: 'bg-emerald-100 text-emerald-700',
    Adventure: 'bg-orange-100 text-orange-700',
    Cultural: 'bg-violet-100 text-violet-700',
    City: 'bg-amber-100 text-amber-700',
  };

  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or country..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all bg-gray-50"
            />
          </div>
          {/* Category */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer
                  ${category === cat
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="text-left text-xs text-gray-400 font-bold uppercase tracking-wider bg-gray-50/80 border-b border-gray-100">
                <th className="px-5 py-3.5">Destination</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Duration</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-gray-400">
                    No destinations found
                  </td>
                </tr>
              ) : filtered.map((d) => (
                <tr key={d._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                        <Image src={d.imageUrl} alt={d.destinationName} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{d.destinationName}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                          <MapPin size={10} />
                          <span>{d.country}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold
                      ${catColors[d.category] || 'bg-gray-100 text-gray-600'}`}>
                      {d.category || 'N/A'}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-gray-900">${d.price}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Calendar size={12} />
                      <span>{d.duration}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/allNav/destinations/${d._id}`}>
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-all cursor-pointer" title="View">
                          <Eye size={15} />
                        </button>
                      </Link>
                      <button
                        onClick={() => setEditItem(d)}
                        className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-all cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(d._id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <AlertCircle size={28} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Destination?</h3>
            <p className="text-gray-500 text-sm text-center mb-8">
              This will permanently remove this destination and all related data. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer disabled:opacity-70"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Edit Destination</h3>
                <p className="text-sm text-gray-400 mt-0.5">{editItem.destinationName}</p>
              </div>
              <button
                onClick={() => setEditItem(null)}
                className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-700 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEdit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: 'Destination Name', name: 'destinationName', defaultValue: editItem.destinationName, type: 'text', colSpan: true },
                  { label: 'Country', name: 'country', defaultValue: editItem.country, type: 'text' },
                  { label: 'Price (USD)', name: 'price', defaultValue: editItem.price, type: 'number' },
                  { label: 'Duration', name: 'duration', defaultValue: editItem.duration, type: 'text' },
                  { label: 'Departure Date', name: 'departureDate', defaultValue: editItem.departureDate, type: 'date' },
                  { label: 'Image URL', name: 'imageUrl', defaultValue: editItem.imageUrl, type: 'url', colSpan: true },
                ].map((field) => (
                  <div key={field.name} className={field.colSpan ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                    <input
                      name={field.name}
                      type={field.type}
                      defaultValue={field.defaultValue}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all bg-gray-50"
                      required
                    />
                  </div>
                ))}

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    defaultValue={editItem.category}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all bg-gray-50"
                  >
                    {['Beach', 'Mountain', 'Adventure', 'Cultural', 'City'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editItem.description}
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all bg-gray-50 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="flex-1 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer disabled:opacity-70 shadow-lg shadow-cyan-200/40"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

'use client'
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { toast } from 'react-toastify';
import { PlusCircle, X, Palmtree } from 'lucide-react';
import Link from 'next/link';

const AddTravelPackage = () => {
  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newData = Object.fromEntries(formData.entries())

    const { data: tokenData } = await authClient.token()
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(newData)
    })
    const data = await res.json()
    if (data) {
      toast.success('Destination added successfully!')
      e.target.reset()
    } else {
      toast.error('Something went wrong. Please try again.')
    }
  }

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all bg-gray-50/50 text-gray-800 placeholder:text-gray-400 text-sm";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-28 pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="section-label mb-3 block">Admin Panel</span>
          <h1 className="text-4xl font-serif font-bold text-gray-900">Add New Destination</h1>
          <p className="mt-2 text-gray-500">Fill in the details to add a new travel package to the platform.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Form Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <PlusCircle size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Travel Package Details</h2>
              <p className="text-cyan-100 text-sm">All fields are required</p>
            </div>
          </div>

          <form className="p-8 space-y-6" onSubmit={onSubmit}>
            {/* Destination Name */}
            <div>
              <label className={labelClass}>Destination Name</label>
              <input
                name="destinationName"
                type="text"
                placeholder="e.g. Bali Paradise"
                className={inputClass}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country */}
              <div>
                <label className={labelClass}>Country</label>
                <input
                  name="country"
                  type="text"
                  placeholder="e.g. Indonesia"
                  className={inputClass}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className={labelClass}>Category</label>
                <select name="category" className={inputClass} required>
                  <option value="">Select category</option>
                  <option value="Beach">Beach</option>
                  <option value="Mountain">Mountain</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                  <option value="City">City</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className={labelClass}>Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                  <input
                    name="price"
                    type="number"
                    placeholder="e.g. 1299"
                    className={`${inputClass} pl-8`}
                    required
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className={labelClass}>Duration</label>
                <input
                  name="duration"
                  type="text"
                  placeholder="e.g. 7 Days / 6 Nights"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Departure Date */}
            <div>
              <label className={labelClass}>Departure Date</label>
              <input
                name="departureDate"
                type="date"
                className={inputClass}
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className={labelClass}>Image URL</label>
              <input
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                className={inputClass}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Describe this amazing travel experience..."
                className={inputClass}
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Link href="/allNav/destinations">
                <button
                  type="button"
                  className="px-6 py-3 flex items-center gap-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all text-sm font-semibold cursor-pointer"
                >
                  <X size={16} /> Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all flex items-center gap-2 text-sm font-semibold shadow-lg shadow-cyan-200/50 hover:scale-[1.02] cursor-pointer"
              >
                <PlusCircle size={16} />
                Add Destination
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTravelPackage;
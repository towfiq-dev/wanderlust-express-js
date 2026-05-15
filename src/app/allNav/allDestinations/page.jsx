'use client'
import React from 'react';
import { CgAdd } from 'react-icons/cg';
import { FcCancel } from 'react-icons/fc';
import { toast } from 'react-toastify';

const AddTravelPackage = () => {
  const onSubmit = async(e)=>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newData = Object.fromEntries(formData.entries())
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`,{
      method: 'POST',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(newData)
    })
    const data = await res.json()
    if (data) {
      toast.success('Data is added successfully')
    }else{
      toast.error('Something went wrong')
    }
  }
  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4 mt-25">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Travel Package</h2>
        </div>

        <form className="p-8 space-y-5" onSubmit={onSubmit}>
          {/* Destination Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Destination Name</label>
            <input 
              name="destinationName"
              type="text"
              placeholder="Bali Paradise"
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-cyan-500 transition-colors bg-gray-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Country</label>
              <input 
                name="country"
                type="text"
                placeholder="Indonesia"
                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-cyan-500 transition-colors bg-gray-50"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Category</label>
              <select 
                name="category"
                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-cyan-500 transition-colors bg-gray-50 text-gray-500"
              >
                <option value="">Beach</option>
                <option value="mountain">Mountain</option>
                <option value="adventure">Adventure</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Price (USD)</label>
              <input 
                name="price"
                type="number"
                placeholder="e.g., 1299"
                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-cyan-500 transition-colors bg-gray-50"
              />
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Duration</label>
              <input 
                name="duration"
                type="text"
                placeholder="e.g., 7 Days/6 Nights"
                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-cyan-500 transition-colors bg-gray-50"
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Departure Date</label>
            <input 
              name="departureDate"
              type="date"
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-cyan-500 transition-colors bg-gray-50 text-gray-500"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Image URL</label>
            <input 
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-cyan-500 transition-colors bg-gray-50"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Description</label>
            <textarea 
              name="description"
              rows="4"
              placeholder="Describe the travel experience..."
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-cyan-500 transition-colors bg-gray-50"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              className="px-6 py-2 flex items-center cursor-pointer border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <FcCancel/> Cancel
            </button>
            <button 
              type="submit"
              className="cursor-pointer flex items-center gap-3 px-6 py-2 bg-[#17a2b8] text-white rounded hover:bg-[#138496] transition-colors"
            >
              <CgAdd/> Add Travel Package
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTravelPackage;
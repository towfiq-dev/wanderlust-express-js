'use client'
import { authClient } from '@/lib/auth-client';
import { DateField, Label } from '@heroui/react';
import { ArrowRight, Check, Shield, Clock } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BookingCard = ({ detailsData }) => {
  const {
    destinationName, _id, country, price, imageUrl
  } = detailsData;

  const [date, setDate] = useState(null);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBooking = async () => {
    if (!user) { toast.error('Please login first'); return; }
    if (!date) { toast.error('Please select a travel date'); return; }

    const bookingData = {
      userId: user.id,
      userImage: user.image,
      userName: user.name,
      destinationId: _id,
      destinationName,
      price,
      imageUrl,
      country,
      date: new Date(date)
    };

    const { data: tokenData } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(bookingData)
    });

    const data = await res.json();
    if (data.insertedId) {
      toast.success('🎉 Booking successful! Check My Bookings.');
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-xl shadow-gray-100/50 sticky top-24">

        {/* Price */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <p className="text-gray-400 text-sm font-medium mb-1">Starting from</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-gray-900">${price}</span>
            <span className="text-gray-400 text-sm font-medium">/ per person</span>
          </div>
        </div>

        {/* Date picker */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Travel Date</label>
          <div className="border border-gray-200 rounded-xl p-3 focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-50 transition-all bg-gray-50">
            <DateField onChange={setDate} className="w-full" name="date">
              <Label className="text-xs text-gray-400 font-medium block mb-1">Date</Label>
              <DateField.Group>
                <DateField.Input>
                  {(segment) => <DateField.Segment segment={segment} />}
                </DateField.Input>
              </DateField.Group>
            </DateField>
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBooking}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-cyan-200/50 cursor-pointer mb-5"
        >
          Book Now
          <ArrowRight size={20} />
        </button>

        {/* Trust badges */}
        <div className="space-y-3">
          {[
            { icon: Check, text: 'Free cancellation up to 7 days before', color: 'text-green-500' },
            { icon: Shield, text: 'Travel insurance included', color: 'text-blue-500' },
            { icon: Clock, text: 'Instant confirmation via email', color: 'text-cyan-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
              <item.icon size={16} className={item.color} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-5 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">No payment required now. Confirm your trip first.</p>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

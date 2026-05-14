'use client'
import { authClient } from '@/lib/auth-client';
import { DateField, Label } from '@heroui/react';
import { ArrowRight, Check } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BookingCard = ({detailsData}) => {
    const {
    destinationName,
    _id,
    country,
    category,
    price,
    duration,
    departureDate,
    imageUrl,
    description
  } = detailsData;

  const [date, setDate] = useState(null)
  const {data: session} = authClient.useSession()
  const user = session?.user
  
  const handleBooking = async()=>{

    if(!user){
    toast.error('Please login first')
    return
  }

  if(!date){
    toast.error('Please select a date')
    return
  }

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
    }
    
    const res = await fetch('http://localhost:5000/bookings',{
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(bookingData)
    })

    const data = await res.json()
    if (data.insertedId) {
    toast.success('Booking successful')
  }else{
    toast.error('Something went wrong')
  }
  }

  return (
        <div className="lg:col-span-1">
          <div className="border border-gray-100 rounded-3xl p-8 shadow-xl sticky top-10 bg-white">
            <div className="mb-8">
              <p className="text-gray-500 font-medium mb-1">Starting from</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-cyan-600">${price}</span>
                <span className="text-gray-400 font-medium text-sm">/ per person</span>
              </div>
            </div>
            <DateField onChange={setDate} className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>

            <button 
            onClick={handleBooking}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-200 mb-8">
              Book Now <ArrowRight size={22} />
            </button>

            <div className="space-y-4 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Check size={18} className="text-green-500" />
                <span>Free cancellation up to 7 days</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Check size={18} className="text-green-500" />
                <span>Travel insurance included</span>
              </div>
            </div>
          </div>
        </div>
  );
};

export default BookingCard;
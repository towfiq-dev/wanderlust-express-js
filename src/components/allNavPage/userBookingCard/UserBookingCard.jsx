import { BadgeCheck, CalendarDays, Eye, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import UserBookingDelete from '../delete/UserBookingDelete';
const UserBookingCard = ({booking}) => {
  return (
     <div className="flex flex-col gap-6 p-5 md:flex-row md:items-center">
              {/* Image */}
              <div className="relative h-[220px] w-full overflow-hidden rounded-2xl md:w-[340px]">
                <Image
                  src={booking.imageUrl}
                  alt={booking.destinationName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  {/* Status */}
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                    <BadgeCheck size={16} />
                    Confirmed
                  </div>

                  {/* Destination Name */}
                  <h2 className="text-3xl font-bold text-gray-900">
                    {booking.destinationName}
                  </h2>

                  {/* Info */}
                  <div className="mt-5 space-y-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={18} />
                      <span>
                        Departure:{" "}
                        {new Date(
                          booking.date
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <span>{booking.country}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        Booking ID:
                      </span>
                      <span>{booking._id}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <h3 className="mt-6 text-4xl font-bold text-cyan-500">
                    ${booking.price}
                  </h3>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {/* <button className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-400 px-6 py-3 font-medium text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white">
                    <Trash2 size={18} />
                    Cancel
                  </button> */}
                  <UserBookingDelete booking={booking}/>

                  <Link href={`/allNav/destinations`}>
                  <button className="flex cursor-pointer items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-cyan-600">
                    <Eye size={18} />
                    View
                  </button>
                  </Link>
                </div>
              </div>
            </div>
  );
};

export default UserBookingCard;
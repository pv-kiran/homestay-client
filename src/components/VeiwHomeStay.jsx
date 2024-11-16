import React from 'react';
import { X, MapPin, Users, Bed, Bath, Clock, ShieldX } from 'lucide-react';
import { ImageSlider } from './ImageSlider';

export function ViewHomeStay({ data, onClose }) {
    console.log(data)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{data[0].title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <ImageSlider images={data[0].images} />

          <div className="mt-6">
            <div className="flex items-start gap-4 mb-6">
              <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-700">Location</h3>
                <p className="text-gray-600">
                  {data[0].address.street}, {data[0].address.district}
                  <br />
                  {data[0].address.city}, {data[0].address.state} {data[0].address.zip}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Max Guests</p>
                  <p className="font-semibold">{data[0].maxGuests}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <Bed className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Rooms</p>
                  <p className="font-semibold">{data[0].noOfRooms}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <Bath className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-semibold">{data[0].noOfBathRooms}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{data[0].description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {data[0].amenities.map((amenity) => (
                  <div key={amenity._id} className="flex items-center gap-2">
                    <img
                      src={amenity.iconUrl}
                      alt={amenity.amenityName}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="text-gray-600">{amenity.amenityName}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Check-in/Check-out</p>
                    <p className="font-semibold">
                      {data[0].hotelPolicies.checkInTime} / {data[0].hotelPolicies.checkOutTime}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Price per night</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{data[0].pricePerNight.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldX className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Guest Policies</p>
                    <p className="font-semibold">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {data[0].hotelPolicies.guestPolicies.map((policy) => (
                        <div key={policy._id} className="flex items-center gap-2">
                          <span className="text-gray-600">{policy}</span>
                        </div>
                      ))}
                    </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
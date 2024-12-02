import { Edit2, Upload, MapPin, Calendar, Phone, Mail, User2, Home, Globe } from 'lucide-react';
import { useRef, useState } from 'react';

function ProfileCard({ onEdit, onUpdatePicture }) {

    const initialUserData = {
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: 'sarah.wilson@example.com',
        phone: '+1 (555) 123-4567',
        dob: '1992-06-15',
        gender: 'Female',
        street: '789 Pine Avenue',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        zip: '94105',
        maritalStatus: 'Single',
        memberSince: '2022',
        bookings: 8,
        verifiedStays: 6,
        profilePicture: "https://content.api.news/v3/images/bin/2025fc8831028dc2daf64d4a69bfdc17" // Will be handled by file upload
      };

      const [userData, setUserData] = useState(initialUserData);

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpdatePicture(file);
    }
  };

  const InfoRow = ({ label, value, icon: Icon }) => {
    if (!value) return null;
    return (
      <div className="py-2 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-[#14B8A6]" />}
        <div>
          <div className="text-sm font-medium text-gray-500">{label}</div>
          <div className="text-sm text-gray-900">{value}</div>
        </div>
      </div>
    );
  };

  const Stat = ({ label, value }) => {
    if (!value) return null;
    return (
      <div className="px-4 py-2 text-center border-b border-gray-100 last:border-0">
        <div className="text-2xl font-bold text-[#14B8A6]">{value}</div>
        <div className="text-xs text-gray-500 mt-1">{label}</div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-[#14B8A6] to-[#2BC0B4]"></div>
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row gap-8 -mt-16">
          {/* Left Section - Profile Picture & Stats */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                {userData.profilePicture ? (
                  <img
                    src={userData.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <User2 className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-[#14B8A6] p-2 rounded-full text-white hover:bg-[#2BC0B4] transition-colors shadow-lg"
                title="Upload photo"
              >
                <Upload className="w-4 h-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Stats Section */}
            <div className="mt-6 w-full bg-gray-50 rounded-lg overflow-hidden">
              <Stat label="Bookings" value={userData.bookings} />
              <Stat label="Member Since" value={userData.memberSince} />
              <Stat label="Verified Stays" value={userData.verifiedStays} />
            </div>
          </div>

          {/* Right Section - User Information */}
          <div className="md:w-2/3">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData.firstName} {userData.lastName}
                </h2>
                {userData.city && userData.country && (
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {userData.city}, {userData.country}
                  </p>
                )}
              </div>
              <button
                onClick={onEdit}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#24988F] hover:bg-[#1c9e94] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#24988F] transition-colors"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow icon={Mail} label="Email" value={userData.email} />
              <InfoRow icon={Phone} label="Phone" value={userData.phone} />
              <InfoRow icon={Calendar} label="Date of Birth" value={userData.dob} />
              <InfoRow icon={User2} label="Gender" value={userData.gender} />
              <InfoRow 
                icon={Home} 
                label="Address" 
                value={userData.street && `${userData.street}${userData.city ? `, ${userData.city}` : ''}${userData.state ? `, ${userData.state}` : ''} ${userData.zip || ''}`} 
              />
              <InfoRow icon={Globe} label="Country" value={userData.country} />
              <InfoRow icon={User2} label="Marital Status" value={userData.maritalStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
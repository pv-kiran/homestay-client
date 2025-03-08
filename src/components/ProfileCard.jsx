import { Edit2, Upload, MapPin, Calendar, Phone, Mail, User2, Home, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useApi from "../hooks/useApi";
import userService from "../services/userServices";
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from "../app/features/users/authSlice";
import { Button } from './common/Button';
import { Modal } from './common/Modal';
import { FormField } from '../components/common/FormField';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import { formatDate } from '../utils/dateDifference';


const schema = yup.object({
  street: yup
    .string()
    .required("Please enter street"),
  city: yup
    .string()
    .required("Please enter city"),
  district: yup
    .string()
    .required("Please enter district"),
  state: yup
    .string()
    .required("Please enter state"),
  zip: yup
    .string()
    .required("Please enter zip"),
  country: yup
    .string()
    .required("Please enter country"),
  gender: yup
    .string()
    .required("Please select gender"),
  phone: yup
    .string()
    .required("Please enter phone number")
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
})

function ProfileCard() {

  const { authState } = useSelector((state) => state?.userAuth);
  // const [userData, setUserData] = useState(initialUserData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  const dispatch = useDispatch();

  const {
    // error: userError,
    loading: userUpdateLoading,
    execute: userDataSubmit,
    // reset: userDataReset,
  } = useApi(userService.userProfileUpdate);

  const {
    data: userProfile,
    error: userError,
    loading: userProfileLoading,
    execute: getUserProfile,
    // reset: userDataReset,
  } = useApi(userService.getUserById);

  const {
    register,
    control,
    handleSubmit,
    reset, setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fileInputRef = useRef(null);

  const populateFields = () => {
    if (userProfile) {
      setValue('fullName', userProfile?.user?.fullName || '');
      setValue('dob', userProfile?.user?.dob || '');
      setValue('email', userProfile?.user?.email || '');
      setValue('street', userProfile?.user?.address?.street || '');
      setValue('city', userProfile?.user?.address?.city || '');
      setValue('district', userProfile?.user?.address?.district || '');
      setValue('state', userProfile?.user?.address?.state || '');
      setValue('zip', userProfile?.user?.address?.zip || '');
      setValue('country', userProfile?.user?.address?.country || '');
      setValue('phone', userProfile?.user?.phone || '');
      setValue('gender', userProfile?.user?.gender || '');
    }
  }

  useEffect(() => {
    populateFields();
  }, [userProfile])

  useEffect(() => {
    dispatch(setAuth())
  }, [])

  const handleClose = () => {
    setIsModalOpen(false);
  }

  const triggerFileInput = () => {
    // Programmatically click the hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    // Validate file
    if (!file) {
      toast.error("No file selected");
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image (JPEG, PNG, or GIF)");
      return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Please upload a file less than 5MB size");
      return;
    }

    // Immediately start upload process
    setIsUploading(true);

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Prepare form data
      const formData = new FormData();
      formData.append('profilePic', file);

      // Upload to server
      const response = await axiosInstance.put('/user/auth/update-propic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success("Profile picture uploaded successfully");
      } else {
        toast.error(response.data.message || "Failed to upload profile picture");
        // Revert preview if upload fails
        setPreview(null);
      }
    } catch (error) {
      toast.error("Failed to upload profile picture. Please try again.");
      // Revert preview if upload fails
      setPreview(null);
    } finally {
      setIsUploading(false);
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

  const onSubmit = async (data) => {
    try {
      const response = await userDataSubmit(data, authState?.userId);
      if (response.success === true) {
        setIsModalOpen(false)
        getUserProfile()
      }
    } catch (error) {
      toast.error('Please try again later');
    }
  }

  useState(() => {
    if (authState) {
      getUserProfile(authState?.userId)
    }
  }, [authState])

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-[#14B8A6] to-[#2BC0B4]"></div>
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row gap-8 -mt-16">
          {/* Left Section - Profile Picture & Stats */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                {preview || userProfile?.user?.profilePic ? (
                  <img
                    src={preview || userProfile?.user?.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <User2 className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#14B8A6]"></div>
                  </div>
                )}
              </div>
              <button
                onClick={triggerFileInput}
                disabled={isUploading}
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
              <Stat label="Bookings" value={userProfile?.user?.bookings} />
              <Stat label="Member Since" value={new Date(userProfile?.user?.createdAt).getFullYear()} />
              <Stat label="Verified Stays" value={userProfile?.user?.verifiedStays} />
            </div>
          </div>

          {/* Right Section - User Information */}
          <div className="md:w-2/3">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {userProfile?.user?.fullName}
                </h2>
                {userProfile?.user?.address?.city && userProfile?.user?.address?.country && (
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {userProfile?.user?.address?.city}, {userProfile?.user?.address?.country}
                  </p>
                )}
              </div>
              {/* <button
                onClick={onEdit}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#24988F] hover:bg-[#1c9e94] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#24988F] transition-colors"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </button> */}
              <Button
                variant='transparent'
                onClick={() => setIsModalOpen(true)} size="sm">
                <Edit2 className='pr-1 pb-1' color="#FFFFFF" />
                <span color='#FFFFFF'>Edit Profile</span>
              </Button>
              <Modal
                isOpen={isModalOpen}
                onClose={handleClose}
                title={"Edit Profile"}
                description={
                  "Add more details about you"
                }
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
                  <FormField
                    type="text"
                    name="fullName"
                    label="Fullname"
                    placeholder="Enter fullname"
                    register={register}
                    error={errors.fullName}
                    disabled={true}
                  />
                  <FormField
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="Enter email"
                    register={register}
                    error={errors.email}
                    disabled={true}
                  />
                  <FormField
                    type="text"
                    name="dob"
                    label="Date of birth"
                    placeholder="Enter date of birth"
                    register={register}
                    error={errors.dob}
                    disabled={true}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      type="text"
                      name="street"
                      label="Street"
                      placeholder="Enter street"
                      register={register}
                      error={errors.street}
                    />
                    <FormField
                      type="text"
                      name="city"
                      label="City"
                      placeholder="Enter city"
                      register={register}
                      error={errors.city}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      type="text"
                      name="district"
                      label="District"
                      placeholder="Enter district"
                      register={register}
                      error={errors.district}
                    />
                    <FormField
                      type="text"
                      name="state"
                      label="State"
                      placeholder="Enter state"
                      register={register}
                      error={errors.state}
                    />
                  </div>
                  <FormField
                    type="text"
                    name="zip"
                    label="Zip"
                    placeholder="Enter zip code"
                    register={register}
                    error={errors.zip}
                  />
                  <FormField
                    type="text"
                    name="country"
                    label="Country"
                    placeholder="Enter country"
                    register={register}
                    error={errors.country}
                  />
                  <FormField
                    type="text"
                    name="phone"
                    label="Phone number"
                    placeholder="Enter phone number"
                    register={register}
                    error={errors.phone}
                  />
                  <FormField
                    type="radio"
                    name="gender"
                    label="Gender"
                    register={register}
                    error={errors.gender}
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                      { label: "Other", value: "Other" },
                    ]}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    isLoading={userUpdateLoading}
                  >
                    Submit
                  </Button>
                </form>
              </Modal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow icon={Mail} label="Email" value={userProfile?.user?.email} />
              <InfoRow icon={Phone} label="Phone" value={userProfile?.user?.phone} />
              <InfoRow icon={Calendar} label="Year of Birth" value={formatDate(userProfile?.user?.dob)} />
              <InfoRow icon={User2} label="Gender" value={userProfile?.user?.gender} />
              <InfoRow
                icon={Home}
                label="Address"
                value={userProfile?.user?.address?.street && `${userProfile?.user?.address?.street}${userProfile?.user?.address?.city ? `, 
                      ${userProfile?.user?.address?.city}` : ''}${userProfile?.user?.address?.state ? `, ${userProfile?.user?.address?.state}` : ''} ${userProfile?.user?.address?.zip || ''}`}
              />
              <InfoRow icon={Globe} label="Country" value={userProfile?.user?.address?.country} />
              {/* <InfoRow icon={User2} label="Marital Status" value={userProfile?.user?.maritalStatus} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
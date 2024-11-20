import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import adminService from './../services/adminServices';
import useApi from '../hooks/useApi';
import { FormField } from '../components/common/FormField';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { MultipleFileUpload } from '../components/MultipleFileUpload';
import InputList from '../components/InputList';
import { homeStayFormData } from '../utils/formData';
import { Table } from '../components/common/table/Table';
import { ViewHomeStay } from '../components/VeiwHomeStay';
import ImageList from '../components/common/ImageList';
import { toast } from 'react-toastify';


const schema = yup.object({
  title: yup
    .string()
    .required("Please add a title"),
  description: yup
    .string()
    .required("Please add a title"),
  category: yup
    .object()
    .required("Please select a Category"),
  amenities: yup
    .array()
    .required()
    .min(1, "Please select at least one interest"),
  numberOfRooms: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .nullable()
    .required("Please add number of rooms"),
  numberOfBathRooms: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .nullable()
    .required("Please add number of bath rooms"),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .nullable()
    .required("Please add the price"),
  maxGuests: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .nullable()
    .required("Please add number of guests"),
  street: yup
    .string()
    .required("Please add a street"),
  city: yup
    .string()
    .required("Please add a city"),
  district: yup
    .string()
    .required("Please add a district"),
  state: yup
    .string()
    .required("Please add a state"),
  zip: yup
    .string()
    .required("Please add a zip"),
  latitude: yup
    .string()
    .required("Please add a latitude"),
  longitude: yup
    .string()
    .required("Please add a longitude"),
});


const RoomsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewDetail, setIsViewDetail] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [files, setFiles] = useState([]);
  const [guestPolicyList, setGuestPolicyList] = useState([]);
  const [chosenHomestay, setChosenHomeStay] = useState([]);
  const [homeStayId, setHomeStayId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [homeStayImages, setHomeStayImages] = useState([]);
  const [fileError, setFileError] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const timer = useRef(null);

  const {
    register,
    control,
    handleSubmit,
    reset, setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    execute: getAllCategories,
    error: getCategoriesError,
  } = useApi(adminService.adminGetAllCategory);


  const {
    execute: getAllAmenities,
    error: getAmenitiesError,
  } = useApi(adminService.adminGetAllAmenities);

  const {
    loading: addHomeStayLoading,
    execute: addHomeStay,
    reset: addHomeStayReset,
    error: addHomeStayError,
  } = useApi(adminService.adminHomeStayAdd);

  const {
    data: allHomeStays,
    execute: getAllHomeStays,
    error: allHomeStaysError,
  } = useApi(adminService.adminGetAllHomestays);

  const {
    execute: toggleHomeStay,
    error: toggleHomeStayError,
  } = useApi(adminService.adminToggleHomestay);

  const {
    execute: editHomeStay,
    error: editHomeStayError,
    loading: editHomeStayLoading,
    reset: editHomeStayReset,
  } = useApi(adminService.adminHomestayEdit);

  const fetchAmentitiesandCategories = async () => {
    const categories = await getAllCategories();
    const amenities = await getAllAmenities();
    if (categories) {
      const lsitCategory = categories?.data.map((category) => {
        return {
          label: category?.categoryName,
          value: category?._id
        }
      })
      setCategoryList(lsitCategory);
    }
    if (amenities) {
      const lsitAmenity = amenities?.data.map((category) => {
        return {
          label: category?.amenityName,
          value: category?._id
        }
      })
      setAmenitiesList(lsitAmenity);
    }

  }

  const handleClose = () => {
    setIsModalOpen(false);
    setIsViewDetail(false);
    if (isEditing) {
      setHomeStayImages([]);
    }
    setIsEditing(false);
    setFiles([]);
    setFileError('');
    setGuestPolicyList([])
    reset();
  };

  const handleFileUpload = (newFiles) => {
    setFileError('');
    setFiles(newFiles);
  };

  useEffect(() => {
    if (getAmenitiesError) {
      toast.error(getAmenitiesError?.message);
    }
    if (getCategoriesError) {
      toast.error(getCategoriesError?.message);
    }
    if (addHomeStayError) {
      toast.error(addHomeStayError?.message);
    }
    if (allHomeStaysError) {
      toast.error(allHomeStaysError?.message);
    }
    if (toggleHomeStayError) {
      toast.error(toggleHomeStayError?.message);
    }
    if (editHomeStayError) {
      toast.error(editHomeStayError?.message);
    }
  }, [
    getAmenitiesError,
    getCategoriesError,
    addHomeStayError,
    allHomeStaysError,
    toggleHomeStayError,
    editHomeStayError
  ]);

  const onSubmit = async (data) => {
    const roomData = {
      title: data?.title,
      description: data?.description,
      address: {
        street: data?.street,
        city: data?.city,
        district: data?.district,
        state: data?.state,
        zip: data?.zip,
        coordinates: {
          latitude: data?.latitude,
          longitude: data?.longitude
        }
      },
      amenityIds: data?.amenities?.map((item) => item?.value),
      noOfRooms: data?.numberOfRooms,
      noOfBathRooms: data?.numberOfBathRooms,
      pricePerNight: data?.price,
      maxGuests: data?.maxGuests,
      categoryId: data?.category?.value,
      hotelPolicies: {
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        guestPolicies: guestPolicyList
      }
    }

    const formData = new FormData();
    homeStayFormData(formData, roomData);
    if (!isEditing) {
      if (files.length === 0) {
        setFileError("Please select a file");
        return;
      }
    }
    files.forEach(file => {
      formData.append("images", file)
    });
    if (!isEditing) {
      const result = await addHomeStay(formData);
      if (result) {
        toast.success(result?.message);
        addHomeStayReset();
      }
    } else {
      if (homeStayImages.length === 1) {
        formData.append("homestayImages[0]", homeStayImages[0])
      } else {
        homeStayImages.forEach(image => {
          formData.append("homestayImages", image)
        });
      }
      const result = await editHomeStay({ formData, homeStayId });
      if (result) {
        toast.success(result?.message);
        editHomeStayReset();
      }
    }
    getAllHomeStays({
      pagePerData: pageSize,
      pageNumber: currentPage,
      searchParams: ""
    })
    handleClose();
  }

  useEffect(() => {
    fetchAmentitiesandCategories()
    getAllHomeStays({
      pagePerData: pageSize,
      pageNumber: currentPage,
      searchParams: searchKey
    });
  }, [pageSize, currentPage])

  const handlePageNumber = (page) => {
    setCurrentPage(page);
  }

  const handlePageSize = (size) => {
    setPageSize(size);
  }


  const homestayColumn = [
    {
      header: "Title",
      accessor: "title",
      sortable: true,
    },
    {
      header: "Rooms",
      accessor: "noOfRooms",
      sortable: true,
    },
    {
      header: "Bath Rooms",
      accessor: "noOfBathRooms",
      sortable: true,
    },
    {
      header: "Price",
      accessor: "pricePerNight",
      sortable: true,
    },
    {
      header: "Images",
      accessor: (homestay) => (
        <img
          src={homestay.images[0]}
          alt={homestay.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
      ),
      sortable: false,
    },
    {
      header: "Status",
      accessor: (homeStay) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${!homeStay?.isDisabled
            ? "bg-turquoise-200 text-turquoise-500"
            : "bg-gray-100 text-gray-800"
            }`}>
          {!homeStay?.isDisabled ? "Active" : "Disabled"}
        </span>
      ),
      sortable: true,
    },
  ];

  const handleToggle = async (id) => {
    const result = await toggleHomeStay(id);
    if (result) {
      await getAllHomeStays({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: ""
      });
      if(result?.success) {
        toast.success(result?.message);
      }
      else {
        toast.error("Please try again later");
      }
    }
  };

  const handleView = (id) => {
    setIsModalOpen(true);
    setIsViewDetail(true)
    const chosenHomeStay = allHomeStays?.data.filter((homeStay) => homeStay._id === id);
    setChosenHomeStay(chosenHomeStay)
  };
  const handleEdit = (id) => {
    const chosenHomeStay = allHomeStays?.data.filter((homeStay) => homeStay._id === id);
    setIsModalOpen(true);
    setIsViewDetail(false);
    setIsEditing(true);
    setHomeStayId(id);
    setValue('title', chosenHomeStay[0].title)
    setValue('description', chosenHomeStay[0].description)
    const categoryChosen = chosenHomeStay[0].category
    const amenityChosen = chosenHomeStay[0].amenities
    setValue('category', { label: categoryChosen?.categoryName, value: categoryChosen?._id })
    const amenityData = amenityChosen?.map((amenityChosen) => {
      return {
        label: amenityChosen?.amenityName, value: amenityChosen?._id
      }
    })
    setValue('amenities', amenityData)
    setValue('numberOfRooms', chosenHomeStay[0].noOfRooms)
    setValue('numberOfBathRooms', chosenHomeStay[0].noOfBathRooms)
    setValue('price', chosenHomeStay[0].pricePerNight)
    setValue('maxGuests', chosenHomeStay[0].maxGuests)
    const { street, city, state, district, zip,
      coordinates: { latitude, longitude }
    } = chosenHomeStay[0].address
    setValue('street', street)
    setValue('city', city)
    setValue('state', state)
    setValue('district', district)
    setValue('zip', zip)
    setValue('latitude', latitude)
    setValue('longitude', longitude)
    const { checkInTime, checkOutTime, guestPolicies } = chosenHomeStay[0]?.hotelPolicies
    setValue('checkInTime', checkInTime)
    setValue('checkOutTime', checkOutTime)
    setGuestPolicyList(guestPolicies);
    setHomeStayImages(chosenHomeStay[0]?.images);
  };

  const getActions = (item) => [
    {
      icon: "view",
      onClick: () => handleView(item._id),
      title: "View",
    },
    {
      icon: "edit",
      onClick: () => handleEdit(item._id),
      title: "Edit",
    },
    {
      icon: "toggle",
      isActive: item.isDisabled,
      onClick: () => handleToggle(item._id),
      title: "Toggle status",
    }
  ];

  const handleSearch = (query) => {
    setSearchKey(query);
  };

  const removeImages = (images) => {
    setHomeStayImages([...images])
  }

  useEffect(() => {
    if (!timer.current) {
      getAllHomeStays({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: searchKey
      });
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      getAllHomeStays({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: searchKey
      });
    }, 500);
  }, [searchKey]);

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-semibold text-gray-800">
          Amenities Management
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Homestays</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          title={"Create Your Perfect Escape"}
          description={
            "Share your unique homestay with the world – where comfort meets unforgettable experiences"
          }
          maxWidth={!isViewDetail ? "600px" : "700px"}
        >
          {
            !isViewDetail ?
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
                <FormField
                  type="text"
                  name="title"
                  label="Homestay title"
                  placeholder="Enter homestay title"
                  register={register}
                  error={errors.title}
                />
                <FormField
                  type="textarea"
                  name="description"
                  label="Description"
                  placeholder="Enter home stay description"
                  register={register}
                  error={errors.description}
                />
                <FormField
                  type="select"
                  name="category"
                  label="Category"
                  control={control}
                  register={register}
                  error={errors.category}
                  options={categoryList}
                />
                <FormField
                  type="select"
                  name="amenities"
                  label="Amenities"
                  control={control}
                  register={register}
                  error={errors.amenities}
                  isMulti={true}
                  options={amenitiesList}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    type="number"
                    name="numberOfRooms"
                    label="Number of room"
                    placeholder="Number of room"
                    register={register}
                    error={errors.numberOfRooms}
                  />
                  <FormField
                    type="number"
                    name="numberOfBathRooms"
                    label="Number Of BathRooms"
                    placeholder="Number Of BathRooms"
                    register={register}
                    error={errors.numberOfBathRooms}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    type="number"
                    name="price"
                    label="Price details"
                    placeholder="Enter Price details"
                    register={register}
                    error={errors.price}
                  />
                  <FormField
                    type="number"
                    name="maxGuests"
                    label="Number Of Guests"
                    placeholder="Number Of Guest"
                    register={register}
                    error={errors.maxGuests}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    type="text"
                    name="street"
                    label="Street"
                    placeholder="Enter street details"
                    register={register}
                    error={errors.street}
                  />
                  <FormField
                    type="text"
                    name="city"
                    label="City"
                    placeholder="Enter city details"
                    register={register}
                    error={errors.city}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    type="text"
                    name="district"
                    label="District"
                    placeholder="Enter district details"
                    register={register}
                    error={errors.district}
                  />
                  <FormField
                    type="text"
                    name="state"
                    label="State"
                    placeholder="Enter State details"
                    register={register}
                    error={errors.state}
                  />
                </div>
                <FormField
                  type="text"
                  name="zip"
                  label="Zip"
                  placeholder="Enter Zip details"
                  register={register}
                  error={errors.zip}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    type="text"
                    name="latitude"
                    label="Latitude"
                    placeholder="Enter latitude details"
                    register={register}
                    error={errors.latitude}
                  />
                  <FormField
                    type="text"
                    name="longitude"
                    label="Longitude"
                    placeholder="Enter longitude details"
                    register={register}
                    error={errors.latitude}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    type="text"
                    name="checkInTime"
                    label="Checkout Time"
                    placeholder="Enter latitude details"
                    register={register}
                    error={errors.latitude}
                  />
                  <FormField
                    type="text"
                    name="checkOutTime"
                    label="Checkout Time"
                    placeholder="Enter longitude details"
                    register={register}
                    error={errors.latitude}
                  />
                </div>
                <InputList
                  lists={guestPolicyList}
                  setLists={setGuestPolicyList}
                />
                {
                  isEditing ? <ImageList
                    images={homeStayImages}
                    setImages={removeImages}
                  /> : null
                }
                <MultipleFileUpload
                  onChange={handleFileUpload}
                  value={files}
                  multiple={true}
                  maxFiles={!isEditing ? 5 : 5 - homeStayImages.length}
                />
                {fileError ?
                  <p className="text-xs text-red-500">{fileError}</p>
                  :
                  null
                }
                <Button
                  type="submit"
                  fullWidth
                  isLoading={
                    !isEditing ?
                      addHomeStayLoading
                      :
                      editHomeStayLoading
                  }
                >
                  Submit
                </Button>
              </form> : <ViewHomeStay
                data={chosenHomestay}
                onClose={handleClose}
              />
          }
        </Modal>
      </div>
      <div className="min-h-screen my-4">
        {allHomeStays?.data ? (
          <Table
            title="Homestay Management"
            subtitle="Manage your Homestay"
            columns={homestayColumn}
            data={allHomeStays?.data}
            actions={getActions}
            onSearch={handleSearch}
            initialSort={{ field: "title", direction: "asc" }}
            currentPage={currentPage}
            onPageChange={handlePageNumber}
            onPageSizeChange={handlePageSize}
            pageSize={pageSize}
            totalItems={allHomeStays?.totalPages}
          />
        ) : null}
      </div>
    </>
  );
}

export default RoomsPage;

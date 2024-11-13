import { useEffect, useRef, useState } from "react";
import { Button } from "./../components/common/Button";
import { Modal } from "../components/common/Modal";
import { FileUpload } from "./../components/common/FileUpload";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormField } from "../components/common/FormField";
import adminService from "../services/adminServices";
import useApi from "../hooks/useApi";
import { Table } from "../components/common/table/Table";
import { toast } from "react-toastify";


const amenitySchema = yup.object({
  amenity: yup.string().required("Amenity title is required"),
});

export default function AmenitiesPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [amenityId, setamenityId] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [pageSize, setPageSize] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const timer = useRef(null);

  const {
    loading: addAmenityLoading,
    execute: addAmenity,
    reset: addAmenityReset,
    error: addAmenityError,
  } = useApi(adminService.adminAmenitiesAdd);

  const {
    data: allAmenities,
    execute: getAllAmenities,
    error: getAmenitiesError,
  } = useApi(adminService.adminGetAllAmenities);

  const {
    execute: toggleAmenity,
    error: toggledamenityError,
  } = useApi(adminService.adminToggleAmenity);

  const {
    loading: amenityEditLoading,
    execute: amenityEdit,
    reset: aditAmenityReset,
    error: amenityEditError,
  } = useApi(adminService.adminAmenityEdit);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(amenitySchema),
  });

  const handleFileUpload = (file) => {
    setFile(file);
    if (fileError) {
      setFileError(null);
    }
  };

  const handleamenitySubmit = async (data) => {
    const formData = new FormData();
    console.log(data);
    formData.append("amenityName", data.amenity);
    if (file) {
      formData.append("iconUrl", file);
    }
    if (!isEditing) {
      if (!file) {
        setFileError("Please select a file");
        return;
      } else {
        const result = await addAmenity(formData);
        if (result) {
          toast.success(result?.message);
          addAmenityReset();
        }
      }
    } else {
      const result = await amenityEdit({ formData, amenityId });
      if (result) {
        toast.success(result?.message);
        aditAmenityReset();
      }
    }
    getAllAmenities({
      pagePerData: pageSize,
      pageNumber: currentPage,
      searchParams: ""
    })
    handleClose();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setFile(null);
    setIsEditing(false);
    setamenityId(null);
    setFileError(null);
  };




  const handleEdit = (id) => {
    const chosenamenity = allAmenities?.data.filter((amenity) => amenity._id === id);
    setIsModalOpen(true);
    setValue('amenity', chosenamenity[0].amenityName)
    setIsEditing(true)
    setamenityId(id);
  };

  const handleToggle = async (id) => {
    console.log("Toggle clicked for id:", id);
    const result = await toggleAmenity(id);
    if (result) {
      await getAllAmenities({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: ""
      });
    }
  };

  const handlePageNumber = (page) => {
    setCurrentPage(page);
  }

  const handlePageSize = (size) => {
    setPageSize(size);
  }

  const amenityColumns = [
    {
      header: "Title",
      accessor: "amenityName",
      sortable: true,
    },
    {
      header: "Icon",
      accessor: (amenity) => (
        <img
          src={amenity.iconUrl}
          alt={amenity.amenityName}
          className="w-16 h-16 rounded-lg object-cover"
        />
      ),
      sortable: false,
    },
    {
      header: "Status",
      accessor: (amenity) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${!amenity?.isDisabled
            ? "bg-turquoise-200 text-turquoise-500"
            : "bg-gray-100 text-gray-800"
            }`}>
          {!amenity?.isDisabled ? "Active" : "Disabled"}
        </span>
      ),
      sortable: true,
    },
  ];


  const getActions = (item) => [
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
    },
  ];

  const handleSearch = (query) => {
    setSearchKey(query)
  };

  const getTitle = () => {
    if (!isEditing) {
      return "Add a Amenity";
    } else {
      return "Edit a Amenity";
    }
  };

  const getDescription = () => {
    if (!isEditing) {
      return "Add a new image with title. Click submit when you're done";
    } else {
      return "Edit the title and upload the image if u need. Click submit when you're done";
    }
  };


  useEffect(() => {
    getAllAmenities({
      pagePerData: pageSize,
      pageNumber: currentPage,
      searchParams: ""
    });
  }, [pageSize, currentPage]);

  useEffect(() => {
    if (addAmenityError) {
      toast.error(addAmenityError?.message);
    }
    if (getAmenitiesError) {
      toast.error(getAmenitiesError?.message);
    }
    if (toggledamenityError) {
      toast.error(toggledamenityError?.message);
    }
    if (amenityEditError) {
      toast.error(amenityEditError?.message);
    }
  }, [
    addAmenityError,
    getAmenitiesError,
    toggledamenityError,
    amenityEditError
  ]);

  useEffect(() => {
    if (!timer.current) {
      getAllAmenities({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: searchKey
      });
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      getAllAmenities({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: searchKey
      });
    }, 500);
  }, [searchKey]);


  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Amenities Management
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>Add amenity</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          title={getTitle()}
          description={
            getDescription()
          }>
          <form
            onSubmit={handleSubmit(handleamenitySubmit)}
            className=" space-y-4">
            <FormField
              type="text"
              name="amenity"
              label="Amenity Title"
              placeholder="Enter amenity title"
              register={register}
              error={errors.amenity}
            />
            <FileUpload onChange={handleFileUpload} value={file} />
            {fileError ?
              <p className="text-xs text-red-500">{fileError}</p>
              :
              null
            }
            <Button
              type="submit"
              fullWidth
              isLoading={isEditing ? amenityEditLoading : addAmenityLoading}>
              Submit
            </Button>
          </form>
        </Modal>
      </div>
      <div className="min-h-screen my-4">
        {allAmenities?.data ? (
          <Table
            title="Amenity Management"
            subtitle="Manage your product Amenities"
            columns={amenityColumns}
            data={allAmenities?.data}
            actions={getActions}
            onSearch={handleSearch}
            initialSort={{ field: "title", direction: "asc" }}
            currentPage={currentPage}
            onPageChange={handlePageNumber}
            onPageSizeChange={handlePageSize}
            pageSize={pageSize}
            totalItems={allAmenities?.totalPages}
          />
        ) : null}
      </div>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { Button } from "./../components/common/Button";
import { Modal } from "../components/common/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormField } from "../components/common/FormField";
import adminService from "../services/adminServices";
import useApi from "../hooks/useApi";
import { Table } from "../components/common/table/Table";
import { toast } from "react-toastify";
import { CirclePlus, Component } from "lucide-react";
import { Loader } from './../components/common/Loader';
import { EmptyState } from "../components/common/EmptyState";


const amenitySchema = yup.object({
    serviceName: yup.string().required("Service title is required"),
    description: yup.string().required("Service description is required"),
    amount: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        )
        .nullable()
        .required("Please add the price"),
});

export default function OtherServices() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [amenityId, setamenityId] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const timer = useRef(null);

    const [isShowLoading, setIsShowLoading] = useState(true)

    const {
        loading: addAmenityLoading,
        execute: addAmenity,
        reset: addAmenityReset,
        error: addAmenityError,
    } = useApi(adminService.adminOtherServiceAdd);

    const {
        loading: fetchAmenityLoading,
        data: allAmenities,
        execute: getAllAmenities,
        error: getAmenitiesError,
    } = useApi(adminService.adminGetAllOtherService);


    const {
        loading: amenityEditLoading,
        execute: amenityEdit,
        reset: aditAmenityReset,
        error: amenityEditError,
    } = useApi(adminService.adminEditOtherService);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(amenitySchema),
    });


    const handleamenitySubmit = async (data) => {
        const formData = new FormData();
        formData.append("serviceName", data.serviceName);
        formData.append("description", data.description);
        formData.append("amount", data.amount);

        if (!isEditing) {
            const result = await addAmenity(formData);
            if (result) {
                toast.success(result?.message);
                addAmenityReset();
            }
        } else {
            const result = await amenityEdit({ formData, serviceId: amenityId });
            if (result) {
                toast.success(result?.message);
                aditAmenityReset();
            }
        }
        setIsShowLoading(false);
        getAllAmenities({
            pagePerData: pageSize,
            pageNumber: currentPage,
            searchParams: ""
        })
        handleClose();
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setamenityId(null);
        setValue("serviceName", ""),
            setValue("description", "")
        setValue("amount", "")

    };




    const handleEdit = (id) => {
        const chosenamenity = allAmenities?.data.filter((amenity) => amenity._id === id);
        setIsModalOpen(true);
        setValue('serviceName', chosenamenity[0].serviceTitle),
            setValue('description', chosenamenity[0]?.description),
            setValue('amount', chosenamenity[0]?.amount),
            setIsEditing(true)
        setamenityId(id);
        setIsShowLoading(false);
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
            accessor: "serviceTitle",
            sortable: true,
        },
        {
            header: "Description",
            accessor: "description",
            sortable: true,
        },
    ];


    const getActions = (item) => [
        {
            icon: "edit",
            onClick: () => handleEdit(item._id),
            title: "Edit",
        },
    ];

    const handleSearch = (query) => {
        setIsShowLoading(false);
        setSearchKey(query)
    };

    const getTitle = () => {
        if (!isEditing) {
            return "Add a Roomservice";
        } else {
            return "Edit a Roomservice";
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
        if (amenityEditError) {
            toast.error(amenityEditError?.message);
        }
    }, [
        addAmenityError,
        getAmenitiesError,
        amenityEditError
    ]);

    useEffect(() => {
        if (searchKey) {
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
        }
    }, [searchKey]);


    return (
        <>
            <div className="flex justify-end">
                {/* <h1 className="text-2xl font-semibold text-gray-800">
          Amenities Management
        </h1> */}
                <Button onClick={() => setIsModalOpen(true)} size="sm"><CirclePlus className='pr-1 pb-1' color="#ffffff" />Add Service</Button>
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
                            name="serviceName"
                            label="Service Title"
                            placeholder="Enter service title"
                            register={register}
                            error={errors.amenity}
                        />
                        <FormField
                            type="textarea"
                            name="description"
                            label="Description"
                            placeholder="Enter service description"
                            register={register}
                            error={errors.description}
                        />
                        <FormField
                            type="number"
                            name="amount"
                            label="Price details"
                            placeholder="Enter price details"
                            register={register}
                            error={errors.amount}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            isLoading={isEditing ? amenityEditLoading : addAmenityLoading}>
                            Submit
                        </Button>
                    </form>
                </Modal>
            </div>
            {
                (fetchAmenityLoading && isShowLoading) && <div className='mt-2 h-[70vh] flex items-center justify-center'>
                    <Loader />
                </div>
            }
            <div className="min-h-screen my-4">
                {
                    allAmenities?.data.length > 0 ? (
                        <Table
                            title="Misc. services Management"
                            subtitle="Manage your misc. services"
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
                    ) : <div>
                        {
                            !fetchAmenityLoading && <EmptyState
                                title="Empty Homestays"
                                message="Your homestay amenity list is currently empty."
                                icon={<Component className="w-12 h-12 text-gray-400" />}
                            />
                        }
                    </div>}
            </div>
        </>
    );
}

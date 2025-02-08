import React, { useState, useRef, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BedDouble, CirclePlus, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import { FormField } from '../components/common/FormField';
import adminService from '../services/adminServices';
import { toast } from 'react-toastify';
import { Loader } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import { Table } from '../components/common/table/Table';



const schema = yup.object().shape({
    restaurantName: yup.string().required('Restaurant name is required'),
    menuItems: yup.array().of(
        yup.object().shape({
            type: yup.string().oneOf(['breakfast', 'lunch', 'dinner']).required('Type is required'),
            name: yup.string().required('Item name is required'),
            price: yup.string()
                .required('Price is required')
                .matches(/^\d+(\.\d{1,2})?$/, 'Invalid price format')
        })
    ).min(1, 'At least one menu item is required'),
    city: yup.object()
        .required("Please select a Category"),
});



export default function Restaurents() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [restaurantId, setRestaurantId] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const timer = useRef(null);
    const [isShowLoading, setIsShowLoading] = useState(true);

    const {
        data,
        execute: getAllHomeStayLocations,
    } = useApi(userService.userGetHomeStayByLocations);

    const {
        loading: addRestaurentLoading,
        execute: addRestaurent,
        reset: addRestaurentReset,
        error: addRestaurentError,
    } = useApi(adminService.adminRestaurentAdd);

    const {
        loading: restaurentsLoading,
        data: allRestaurents,
        execute: getAllRestaurentss,
        error: allRestaurentssError,
    } = useApi(adminService.adminGetAllRestaurents);

    const {
        execute: editRestaurant,
        error: editRestaurantError,
        loading: editRestaurantLoading,
        reset: editRestaurantReset,
    } = useApi(adminService.adminRestaurantEdit);


    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            restaurantName: '',
            menuItems: [{ type: 'breakfast', name: '', price: '' }],
            city: ''
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'menuItems'
    });

    const onSubmit = async (data) => {
        if (!isEditing) {
            const result = await addRestaurent({ ...data, city: data?.city?.value });
            if (result) {
                toast.success(result?.message);
                addRestaurentReset();
                handleClose();
                setIsShowLoading(false)
                getAllRestaurentss({
                    pagePerData: pageSize,
                    pageNumber: currentPage,
                    searchParams: ""
                })
            };
            return;
        }
        const { city, menuItems, restaurantName } = data;
        const filteredData = { city, menuItems, restaurantName };
        const result = await editRestaurant({ data: filteredData, restaurentId: restaurantId });
        if (result) {
            toast.success(result?.message);
            editRestaurantReset();
        }
        setIsShowLoading(false)
        getAllRestaurentss({
            pagePerData: pageSize,
            pageNumber: currentPage,
            searchParams: ""
        })
        handleClose()
    };


    const handleEdit = (id) => {
        const chosenRestaurant = allRestaurents?.data.filter((restaurant) => restaurant._id === id);
        setIsModalOpen(true);
        setIsEditing(true);
        setRestaurantId(id);
        reset({
            ...chosenRestaurant[0],
            city: { label: chosenRestaurant[0]?.city, value: chosenRestaurant[0]?.city }
        });
    };


    const handleClose = () => {
        reset({
            restaurantName: '',
            menuItems: [{ type: 'breakfast', name: '', price: '' }],
            city: ''
        })
        setIsModalOpen(false);
        setIsEditing(false)
        setRestaurantId(null)

    };

    const restaurentsColumn = [
        {
            header: "Restaurant",
            accessor: "restaurantName",
            sortable: true,
        },
        {
            header: "City",
            accessor: "city",
            sortable: true,
        },
    ];

    const getActions = (item) => [
        {
            icon: "edit",
            onClick: () => handleEdit(item._id),
            title: "Edit",
        }
    ];

    const handleSearch = (query) => {
        setIsShowLoading(false)
        setSearchKey(query);
    };

    const handlePageNumber = (page) => {
        setCurrentPage(page);
    }

    const handlePageSize = (size) => {
        setPageSize(size);
    }

    useEffect(() => {
        getAllHomeStayLocations();
    }, [])

    useEffect(() => {
        if (addRestaurentError) {
            toast.error(addRestaurentError?.error);
        }
        if (editRestaurantError) {
            toast.error(editRestaurantError?.error);
        }
    }, [
        addRestaurentError,
        editRestaurantError
    ]);

    useEffect(() => {
        getAllRestaurentss({
            pagePerData: pageSize,
            pageNumber: currentPage,
            searchParams: ""
        })
    }, [pageSize, currentPage])

    useEffect(() => {
        if (!timer.current) {
            getAllRestaurentss({
                pagePerData: pageSize,
                pageNumber: currentPage,
                searchParams: searchKey
            });
        }
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            getAllRestaurentss({
                pagePerData: pageSize,
                pageNumber: currentPage,
                searchParams: searchKey
            });
        }, 500);
    }, [searchKey]);



    return (
        <>
            <div className="flex justify-end">
                <Button onClick={() => setIsModalOpen(true)} size="sm"><CirclePlus className='pr-1 pb-1' color="#ffffff" />Add Restaurant</Button>
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleClose}
                    title={"Add Restaurant"}
                    description={"Signature restaurants details"}
                    maxWidth="600px"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-6 space-y-6">
                        {/* Restaurant Name */}
                        <div>
                            <label
                                htmlFor="restaurantName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Restaurant Name
                            </label>
                            <input
                                {...register('restaurantName')}
                                type="text"
                                id="restaurantName"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-turquoise-500 focus:ring-turquoise-500 sm:text-sm p-2 border"
                                placeholder="Enter restaurant name"
                            />
                            {errors.restaurantName && (
                                <p className="mt-1 text-sm text-red-600">{errors.restaurantName.message}</p>
                            )}
                        </div>

                        {/* Menu Items */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">Menu Items</h3>
                                <button
                                    type="button"
                                    onClick={() => append({ type: 'breakfast', name: '', price: '' })}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-turquoise-500 hover:bg-turquoise-600 focus:outline-none 
                                    focus:ring-2 
                                    focus:ring-offset-2 focus:ring-turquoise-500"
                                >
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    Add Item
                                </button>
                            </div>

                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-start bg-gray-50 p-4 rounded-md relative"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Type
                                        </label>
                                        <select
                                            {...register(`menuItems.${index}.type`)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-turquoise-500 focus:ring-turquoise-500 sm:text-sm p-2 border"
                                        >
                                            <option value="breakfast">Breakfast</option>
                                            <option value="lunch">Lunch</option>
                                            <option value="dinner">Dinner</option>
                                        </select>
                                        {errors.menuItems?.[index]?.type && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.menuItems[index]?.type?.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Item Name
                                        </label>
                                        <input
                                            {...register(`menuItems.${index}.name`)}
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-turquoise-500 focus:ring-turquoise-500 sm:text-sm p-2 border"
                                            placeholder="Enter item name"
                                        />
                                        {errors.menuItems?.[index]?.name && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.menuItems[index]?.name?.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Price
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input
                                                {...register(`menuItems.${index}.price`)}
                                                type="text"
                                                className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-turquoise-500 focus:ring-turquoise-500 sm:text-sm p-2 border"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        {errors.menuItems?.[index]?.price && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.menuItems[index]?.price?.message}
                                            </p>
                                        )}
                                    </div>

                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="absolute -right-2 -top-2 text-red-600 hover:text-red-800 bg-white rounded-full p-1 shadow-sm"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {errors.menuItems && (
                                <p className="mt-1 text-sm text-red-600">{errors.menuItems.message}</p>
                            )}
                        </div>

                        {/* City Selection */}
                        <div>
                            <FormField
                                type="select"
                                name="city"
                                label="City"
                                control={control}
                                register={register}
                                error={errors.city}
                                options={
                                    data?.data?.map((item) => ({
                                        label: item?.city,
                                        value: item?.city
                                    }))}
                            />

                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                isLoading={
                                    !isEditing ?
                                        addRestaurentLoading
                                        :
                                        editRestaurantLoading
                                }
                                fullWidth
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
            {
                (restaurentsLoading && isShowLoading) && <div className='mt-2 h-[70vh] flex items-center justify-center'>
                    <Loader />
                </div>
            }
            <div className="min-h-[70vh] my-4">
                {
                    allRestaurents?.data.length > 0 ? (
                        <Table
                            title="Restaurant Management"
                            subtitle="Manage your restaurants"
                            columns={restaurentsColumn}
                            data={allRestaurents?.data}
                            actions={getActions}
                            onSearch={handleSearch}
                            initialSort={{ field: "title", direction: "asc" }}
                            currentPage={currentPage}
                            onPageChange={handlePageNumber}
                            onPageSizeChange={handlePageSize}
                            pageSize={pageSize}
                            totalItems={allRestaurents?.totalPages}
                        />
                    ) :
                        <div>
                            {
                                !restaurentsLoading && <EmptyState
                                    title="Empty Restaurants"
                                    message="Your Restaurent list is currently empty."
                                    icon={<BedDouble className="w-12 h-12 text-gray-400" />}
                                />
                            }
                        </div>
                }
            </div>
        </>
    );
}



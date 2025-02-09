import React, { useEffect, useState } from 'react';
import { CheckSquare2, Square } from 'lucide-react';
import useApi from '../../hooks/useApi';
import adminService from '../../services/adminServices';
import { toast } from 'react-toastify';
import { Button } from '../common/Button';

const AddonsForm = ({ addOndata, homeStayId, handleClose, selectedHomestay, getHomeStayAddons }) => {

    const {
        loading: addHomeStayAddonsLoading,
        execute: addHomeStayAddons,
        reset: addHomeStayAddonsReset,
        error: addHomeStayAddonsError,
    } = useApi(adminService.adminEditHomeStayAddons);

    const [selected, setSelected] = useState({
        restaurants: [],
        homelyFood: [],
        rides: [],
        otherService: [],
        entertainment: [],
        roomService: [],
    });
    const handleToggle = (section, id) => {
        setSelected(prev => {
            const ids = prev[section];
            return {
                ...prev,
                [section]: ids.includes(id)
                    ? ids.filter(existingId => existingId !== id)
                    : [...ids, id],
            };
        });
    };
    const renderServiceItem = (
        item,
        section
    ) => (
        <div
            key={item._id}
            className="flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => handleToggle(section, item._id)}
        >
            {selected[section].includes(item._id) ? (
                <CheckSquare2 className="h-5 w-5 text-green-400" />
            ) : (
                <Square className="h-5 w-5 text-gray-400" />
            )}
            <div>
                <h3 className="font-medium text-gray-900">{item.serviceTitle}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-sm font-medium text-gray-900">₹{item.amount}</p>
            </div>
        </div>
    );

    const renderFoodItem = (
        item,
        section
    ) => (
        <div
            key={item._id}
            className="flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => handleToggle(section, item._id)}
        >
            {selected[section].includes(item._id) ? (
                <CheckSquare2 className="h-5 w-5 text-green-400" />
            ) : (
                <Square className="h-5 w-5 text-gray-400" />
            )}
            <div>
                <h3 className="font-medium text-gray-900">
                    {section === 'restaurants'
                        ? (item).restaurantName
                        : (item).homelyFoodCenterName}
                </h3>
                <p className="text-sm text-gray-500">{item.city}</p>
                <p className="text-sm text-gray-500">
                    {item.menuItems.length} menu items available
                </p>
            </div>
        </div>
    );

    const handleSubmit = async () => {
        const result = await addHomeStayAddons({
            addOns: selected,
            homeStayId: homeStayId
        });
        if (result) {
            toast.success(result?.message);
        }
        handleClose();
        getHomeStayAddons()
    }

    useEffect(() => {
        if (addHomeStayAddonsError) {
            toast.error(addHomeStayAddonsError?.message);
        }
    }, [addHomeStayAddonsError])


    useEffect(() => {
        if (selectedHomestay?.length > 0) {
            const { restaurants, rides, roomservice, otherservice, entertainments, homelyfoods } = selectedHomestay[0]
            setSelected({
                restaurants: restaurants ?? [],
                homelyFood: homelyfoods ?? [],
                rides: rides ?? [],
                otherService: otherservice ?? [],
                entertainment: entertainments ?? [],
                roomService: roomservice ?? [],
            })
        }
    }, [selectedHomestay]);
    return (
        <div className="min-h-screen bg-gray-100 p-2">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-8 px-2">
                    Select Services
                </h1>

                <div className="space-y-8">
                    {/* Restaurants Section */}
                    <div className="bg-white rounded-lg ">
                        <div className="px-4 py-5 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Restaurants</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {addOndata?.restaurants?.map(restaurant =>
                                renderFoodItem(restaurant, 'restaurants')
                            )}
                        </div>
                    </div>

                    {/* Homely Food Section */}
                    <div className="bg-white rounded-lg ">
                        <div className="px-4 py-5 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Homely Food</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {addOndata?.homelyFood?.map(food =>
                                renderFoodItem(food, 'homelyFood')
                            )}
                        </div>
                    </div>

                    {/* Rides Section */}
                    <div className="bg-white rounded-lg ">
                        <div className="px-4 py-5 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Rides</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {addOndata?.rides?.map(ride =>
                                renderServiceItem(ride, 'rides')
                            )}
                        </div>
                    </div>

                    {/* Other Services Section */}
                    <div className="bg-white rounded-lg ">
                        <div className="px-4 py-5 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Other Services</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {addOndata?.otherService?.map(service =>
                                renderServiceItem(service, 'otherService')
                            )}
                        </div>
                    </div>

                    {/* Entertainment Section */}
                    <div className="bg-white rounded-lg ">
                        <div className="px-4 py-5 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Entertainment</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {addOndata?.entertainment?.map(item =>
                                renderServiceItem(item, 'entertainment')
                            )}
                        </div>
                    </div>

                    {/* Room Service Section */}
                    <div className="bg-white rounded-lg ">
                        <div className="px-4 py-5 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Room Service</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {addOndata?.roomService?.map(service =>
                                renderServiceItem(service, 'roomService')
                            )}
                        </div>
                    </div>
                </div>

                {/* Selected Services Summary */}
                {/* <div className="mt-8 bg-white rounded-lg  p-4">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Selected Services</h2>
                    <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
                        {JSON.stringify(selected, null, 2)}
                    </pre>
                </div> */}
                <div className='my-2'>
                    <Button
                        fullWidth
                        type="button"
                        isLoading={addHomeStayAddonsLoading}
                        onClick={() => handleSubmit()} >
                        Submit
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default AddonsForm;

import React, { useEffect } from 'react';
import { Utensils, Home } from 'lucide-react';
import { MenuItem } from './MenuItem';
import { ServiceSection } from './ServiceSection';
import { ServiceItem } from './ServiceItem';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenuItem, updateQuantity } from '../../app/features/admin/addonSlice';

function AddonsSection() {

    const { addOns } = useSelector((store) => store?.addOns);
    const { selectedItems } = useSelector((store) => store?.addOns);
    // const { currency } = useSelector((store) => store?.currency);
    const dispatch = useDispatch();


    const handleMenuItemToggle = (section, id, item) => {
        dispatch(toggleMenuItem({ section, id, item }));
    };

    const handleQuantityChange = (section, id, quantity) => {
        dispatch(updateQuantity({ section, id, quantity }));
    };




    useEffect(() => {
        const updatedItems = JSON.parse(JSON.stringify(selectedItems));
        // Iterate through each service category
        Object.keys(updatedItems)?.forEach(category => {
            if (addOns && addOns[category]) {
                // Get the items in this category from addOns
                const categoryAddOns = addOns[category];

                // Update each item in selectedItems if it exists in addOns
                Object.keys(updatedItems[category]).forEach(itemId => {
                    const selectedItem = updatedItems[category][itemId];
                    const addOnItem = categoryAddOns.find(item => item._id === itemId);

                    if (addOnItem) {
                        // Update price based on addOn
                        const newPrice = category === 'restaurants' || category === 'homelyFoods'
                            ? addOnItem.price
                            : addOnItem.amount;

                        selectedItem.price = newPrice;

                        // Update total amount if quantity exists
                        if (selectedItem.quantity) {
                            selectedItem.totalAmount = Number((newPrice * selectedItem.quantity).toFixed(2));
                        }
                    }
                });
            }
        });

    }, [addOns])

    const getAddons = () => {
        return addOns?.restaurants?.length > 0 || addOns?.homelyfoods?.length > 0 || addOns?.otherservice?.length > 0 || addOns?.roomservice?.length > 0 || addOns?.rides?.length > 0 || addOns?.entertainments?.length > 0
    }

    return (
        <>
            {
                getAddons() ? <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 ">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-8 sm:mb-12">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Add-on Services</h1>
                            <p className="mt-2 text-sm sm:text-base text-gray-600">Enhance your stay with our curated services</p>
                        </div>

                        {/* Restaurants */}
                        {
                            addOns?.restaurants?.length > 0 && <ServiceSection
                                title="Signature Restaurants"
                                subtitle="Discover local and international cuisines"
                            >
                                <div className="grid gap-6 sm:gap-8">
                                    {addOns?.restaurants?.map((restaurant) => (
                                        <div key={restaurant?._id}>
                                            <div className="flex items-center space-x-2 mb-4">
                                                <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-turquoise-500" />
                                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                                                    {restaurant.restaurantName}
                                                </h3>
                                                <span className="text-xs sm:text-sm text-gray-500">({restaurant.city})</span>
                                            </div>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {restaurant?.menuItems.map((item) => (
                                                    <MenuItem
                                                        key={item._id}
                                                        item={item}
                                                        isSelected={!!selectedItems.restaurants[item._id]}
                                                        quantity={selectedItems.restaurants[item._id]?.quantity || 1}
                                                        onToggle={() => handleMenuItemToggle('restaurants', item._id, {
                                                            id: item._id,
                                                            name: item.name,
                                                            price: item.price,
                                                            type: item.type,
                                                            parentName: restaurant.restaurantName
                                                        })}
                                                        onQuantityChange={(quantity) =>
                                                            handleQuantityChange('restaurants', item._id, quantity)
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ServiceSection>
                        }
                        {/* Homely Foods */}
                        {
                            addOns?.homelyfoods?.length > 0 && <ServiceSection
                                title="Home-Style Dining"
                                subtitle="Authentic local flavors prepared with care"
                            >
                                <div className="grid gap-6 sm:gap-8">
                                    {addOns?.homelyfoods?.map((food) => (
                                        <div key={food._id}>
                                            <div className="flex items-center space-x-2 mb-4">
                                                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-turquoise-500" />
                                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                                                    {food.homelyFoodCenterName}
                                                </h3>
                                                <span className="text-xs sm:text-sm text-gray-500">({food.city})</span>
                                            </div>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {food.menuItems.map((item) => (
                                                    <MenuItem
                                                        key={item._id}
                                                        item={item}
                                                        isSelected={!!selectedItems.homelyFoods[item._id]}
                                                        quantity={selectedItems.homelyFoods[item._id]?.quantity || 1}
                                                        onToggle={() => handleMenuItemToggle('homelyFoods', item._id, {
                                                            id: item._id,
                                                            name: item.name,
                                                            price: item.price,
                                                            type: item.type,
                                                            parentName: food.homelyFoodCenterName
                                                        })}
                                                        onQuantityChange={(quantity) =>
                                                            handleQuantityChange('homelyFoods', item._id, quantity)
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ServiceSection>
                        }



                        {/* Other Services */}
                        {
                            addOns?.otherservice?.length > 0 && <ServiceSection
                                title="Additional Services"
                                subtitle="Extra comforts for your stay"
                            >
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {addOns?.otherservice?.map((service) => (
                                        <ServiceItem
                                            key={service._id}
                                            service={service}
                                            isSelected={!!selectedItems.otherServices[service._id]}
                                            quantity={selectedItems.otherServices[service._id]?.quantity || 1}
                                            onToggle={() => handleMenuItemToggle('otherServices', service._id, {
                                                id: service._id,
                                                name: service.serviceTitle,
                                                price: service.amount,
                                                description: service.description
                                            })}
                                            onQuantityChange={(quantity) =>
                                                handleQuantityChange('otherServices', service._id, quantity)
                                            }
                                        />
                                    ))}
                                </div>
                            </ServiceSection>
                        }
                        {/* Room Services */}
                        {
                            addOns?.roomservice?.length > 0 && <ServiceSection
                                title="In-Room Services"
                                subtitle="Comfort at your doorstep"
                            >
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {addOns?.roomservice?.map((service) => (
                                        <ServiceItem
                                            key={service._id}
                                            service={service}
                                            isSelected={!!selectedItems.roomServices[service._id]}
                                            quantity={selectedItems.roomServices[service._id]?.quantity || 1}
                                            onToggle={() => handleMenuItemToggle('roomServices', service._id, {
                                                id: service._id,
                                                name: service.serviceTitle,
                                                price: service.amount,
                                                description: service.description
                                            })}
                                            onQuantityChange={(quantity) =>
                                                handleQuantityChange('roomServices', service._id, quantity)
                                            }
                                        />
                                    ))}
                                </div>
                            </ServiceSection>
                        }

                        {/* Rides */}
                        {
                            addOns?.rides?.length > 0 && <ServiceSection
                                title="Transportation"
                                subtitle="Explore the city with ease"
                            >
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {addOns?.rides?.map((service) => (
                                        <ServiceItem
                                            key={service._id}
                                            service={service}
                                            isSelected={!!selectedItems.rides[service._id]}
                                            quantity={selectedItems.rides[service._id]?.quantity || 1}
                                            onToggle={() => handleMenuItemToggle('rides', service._id, {
                                                id: service._id,
                                                name: service.serviceTitle,
                                                price: service.amount,
                                                description: service.description
                                            })}
                                            onQuantityChange={(quantity) =>
                                                handleQuantityChange('rides', service._id, quantity)
                                            }
                                        />
                                    ))}
                                </div>
                            </ServiceSection>
                        }
                        {/* Entertainment */}
                        {
                            addOns?.entertainments?.length > 0 && <ServiceSection
                                title="Entertainment"
                                subtitle="Add fun to your stay"
                            >
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {addOns?.entertainments?.map((service) => (
                                        <ServiceItem
                                            key={service._id}
                                            service={service}
                                            isSelected={!!selectedItems.entertainments[service._id]}
                                            quantity={selectedItems.entertainments[service._id]?.quantity || 1}
                                            onToggle={() => handleMenuItemToggle('entertainments', service._id, {
                                                id: service._id,
                                                name: service.serviceTitle,
                                                price: service.amount,
                                                description: service.description
                                            })}
                                            onQuantityChange={(quantity) =>
                                                handleQuantityChange('entertainments', service._id, quantity)
                                            }
                                        />
                                    ))}
                                </div>
                            </ServiceSection>
                        }
                    </div>
                </div> : null
            }
        </>

    );
}

export default AddonsSection;
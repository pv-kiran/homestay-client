import React, { useState } from 'react';
import { Utensils, Home, Coffee, Bed, Car, Music } from 'lucide-react';
import { MenuItem } from './MenuItem';
import { ServiceSection } from './ServiceSection';
import { ServiceItem } from './ServiceItem';

const homestayData = {
    "success": true,
    "data": {
        "restaurants": [
            {
                "_id": "67a0f9a44d8556a8b58badc9",
                "restaurantName": "Testing",
                "menuItems": [
                    {
                        "type": "breakfast",
                        "name": "ssdsnd",
                        "price": 5.99,
                        "_id": "67a0f9a44d8556a8b58badca"
                    }
                ],
                "city": "Jaipur"
            },
            {
                "_id": "67a0f9d84d8556a8b58badf4",
                "restaurantName": "Malabar Bites",
                "menuItems": [
                    {
                        "type": "breakfast",
                        "name": "Pancakes",
                        "price": 12,
                        "_id": "67a0f9d84d8556a8b58badf5"
                    },
                    {
                        "type": "lunch",
                        "name": "Sadya",
                        "price": 120,
                        "_id": "67a6f59b9df647435e02cc77"
                    },
                    {
                        "type": "dinner",
                        "name": "Chapati",
                        "price": 10,
                        "_id": "67a6f5cd9df647435e02cc87"
                    },
                    {
                        "type": "breakfast",
                        "name": "Sandwich",
                        "price": 10,
                        "_id": "67a6f5df9df647435e02cc9a"
                    }
                ],
                "city": "Jaipur"
            }
        ],
        "homelyfoods": [
            {
                "_id": "67a10993611a3848e4cc03cc",
                "homelyFoodCenterName": "Helloooo",
                "menuItems": [
                    {
                        "type": "lunch",
                        "name": "testing",
                        "price": 12,
                        "_id": "67a10993611a3848e4cc03cd"
                    },
                    {
                        "type": "breakfast",
                        "name": "kdskjdskj",
                        "price": 20,
                        "_id": "67a10d611e301d34f1abe98f"
                    }
                ],
                "city": "demo"
            },
            {
                "_id": "67a10f68e925bb1476e94f76",
                "homelyFoodCenterName": "Helloooon",
                "menuItems": [
                    {
                        "type": "breakfast",
                        "name": "ssdsnd",
                        "price": 12,
                        "_id": "67a10f68e925bb1476e94f77"
                    }
                ],
                "city": "Goa"
            }
        ],
        "otherservice": [
            {
                "_id": "67a6e89a393ff8ed8a79b27e",
                "serviceTitle": "Servicesss",
                "description": "sdsddss",
                "amount": 12
            }
        ],
        "roomservice": [
            {
                "_id": "67a245927967aa348b1221dc",
                "serviceTitle": "Servicew",
                "description": "njjhj",
                "amount": 122
            },
            {
                "_id": "67a24c460b2b6a4864efb146",
                "serviceTitle": "Helloii",
                "description": "dsmdnsmdn",
                "amount": 12
            }
        ],
        "rides": [
            {
                "_id": "67a2dacbbc9dcf5618afdfe2",
                "serviceTitle": "fdfds",
                "description": "dfdf",
                "amount": 34
            }
        ],
        "entertainments": [
            {
                "_id": "67a6497b03999c9bf7a45c9c",
                "serviceTitle": "Servicess",
                "description": "Service",
                "amount": 120
            }
        ]
    }
};

function AddonsSection() {
    const [selectedItems, setSelectedItems] = useState({
        restaurants: {},
        homelyFoods: {},
        otherServices: {},
        roomServices: {},
        rides: {},
        entertainments: {},
    });

    const handleMenuItemToggle = (
        section,
        id,
        item
    ) => {
        setSelectedItems((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [id]: prev[section][id] ? undefined : item,
            },
        }));
    };

    const getTotalAmount = () => {
        return Object.values(selectedItems).reduce((total, section) => {
            return total + Object.values(section).reduce((sectionTotal, item) => {
                return sectionTotal + (item?.price || 0);
            }, 0);
        }, 0);
    };

    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">Additional Services</h1>
                    <p className="mt-2 text-gray-600">Enhance your stay with our curated services</p>
                </div>

                {/* Restaurants */}
                <ServiceSection
                    title="Signature Restaurants"
                    subtitle="Discover local and international cuisines"
                >
                    <div className="grid gap-8">
                        {homestayData.data.restaurants.map((restaurant) => (
                            <div key={restaurant._id}>
                                <div className="flex items-center space-x-2 mb-4">
                                    <Utensils className="w-5 h-5 text-turquoise-500" />
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {restaurant.restaurantName}
                                    </h3>
                                    <span className="text-sm text-gray-500">({restaurant.city})</span>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {restaurant.menuItems.map((item) => (
                                        <MenuItem
                                            key={item._id}
                                            item={item}
                                            isSelected={!!selectedItems.restaurants[item._id]}
                                            onToggle={() => handleMenuItemToggle('restaurants', item._id, {
                                                id: item._id,
                                                name: item.name,
                                                price: item.price,
                                                type: item.type,
                                                parentName: restaurant.restaurantName
                                            })}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ServiceSection>

                {/* Homely Foods */}
                <ServiceSection
                    title="Home-Style Dining"
                    subtitle="Authentic local flavors prepared with care"
                >
                    <div className="grid gap-8">
                        {homestayData.data.homelyfoods.map((food) => (
                            <div key={food._id}>
                                <div className="flex items-center space-x-2 mb-4">
                                    <Home className="w-5 h-5 text-turquoise-500" />
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {food.homelyFoodCenterName}
                                    </h3>
                                    <span className="text-sm text-gray-500">({food.city})</span>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {food.menuItems.map((item) => (
                                        <MenuItem
                                            key={item._id}
                                            item={item}
                                            isSelected={!!selectedItems.homelyFoods[item._id]}
                                            onToggle={() => handleMenuItemToggle('homelyFoods', item._id, {
                                                id: item._id,
                                                name: item.name,
                                                price: item.price,
                                                type: item.type,
                                                parentName: food.homelyFoodCenterName
                                            })}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ServiceSection>

                {/* Other Services */}
                <ServiceSection
                    title="Additional Services"
                    subtitle="Extra comforts for your stay"
                >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {homestayData.data.otherservice.map((service) => (
                            <ServiceItem
                                key={service._id}
                                service={service}
                                isSelected={!!selectedItems.otherServices[service._id]}
                                onToggle={() => handleMenuItemToggle('otherServices', service._id, {
                                    id: service._id,
                                    name: service.serviceTitle,
                                    price: service.amount,
                                    description: service.description
                                })}
                            />
                        ))}
                    </div>
                </ServiceSection>

                {/* Room Services */}
                <ServiceSection
                    title="In-Room Services"
                    subtitle="Comfort at your doorstep"
                >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {homestayData.data.roomservice.map((service) => (
                            <ServiceItem
                                key={service._id}
                                service={service}
                                isSelected={!!selectedItems.roomServices[service._id]}
                                onToggle={() => handleMenuItemToggle('roomServices', service._id, {
                                    id: service._id,
                                    name: service.serviceTitle,
                                    price: service.amount,
                                    description: service.description
                                })}
                            />
                        ))}
                    </div>
                </ServiceSection>

                {/* Rides */}
                <ServiceSection
                    title="Transportation"
                    subtitle="Explore the city with ease"
                >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {homestayData.data.rides.map((service) => (
                            <ServiceItem
                                key={service._id}
                                service={service}
                                isSelected={!!selectedItems.rides[service._id]}
                                onToggle={() => handleMenuItemToggle('rides', service._id, {
                                    id: service._id,
                                    name: service.serviceTitle,
                                    price: service.amount,
                                    description: service.description
                                })}
                            />
                        ))}
                    </div>
                </ServiceSection>

                {/* Entertainment */}
                <ServiceSection
                    title="Entertainment"
                    subtitle="Add fun to your stay"
                >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {homestayData.data.entertainments.map((service) => (
                            <ServiceItem
                                key={service._id}
                                service={service}
                                isSelected={!!selectedItems.entertainments[service._id]}
                                onToggle={() => handleMenuItemToggle('entertainments', service._id, {
                                    id: service._id,
                                    name: service.serviceTitle,
                                    price: service.amount,
                                    description: service.description
                                })}
                            />
                        ))}
                    </div>
                </ServiceSection>
            </div>
        </div>
    );
}

export default AddonsSection;
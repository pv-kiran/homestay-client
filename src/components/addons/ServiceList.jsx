import React from 'react';
import ServiceCard from './ServiceCard';


const formatTitle = (key) => {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
};

const ServiceList = ({ data }) => {
    // Filter out the _id field if it exists at the top level
    const serviceCategories = Object.entries(data).filter(([key]) => key !== '_id');

    const totalServices = serviceCategories.reduce(
        (sum, [_, category]) => sum + Object.keys(category).length,
        0
    );

    const grandTotal = serviceCategories.reduce((sum, [_, category]) => {
        return sum + Object.values(category).reduce(
            (categorySum, item) => categorySum + (item.price * item.quantity),
            0
        );
    }, 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Services Summary</h1>
                        <p className="text-gray-600">{totalServices} services selected</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Grand Total</p>
                        <p className="text-2xl font-bold text-gray-800">
                            ${grandTotal?.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            {serviceCategories.map(([category, items]) => (
                Object.keys(items).length > 0 && (
                    <ServiceCard
                        key={category}
                        title={formatTitle(category)}
                        items={items}
                    />
                )
            ))}
        </div>
    );
};

export default ServiceList;
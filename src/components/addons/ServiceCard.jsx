import React from 'react';
import { ShoppingCart } from 'lucide-react';



const ServiceCard = ({ title, items }) => {
    const totalAmount = Object.values(items).reduce((sum, item) =>
        sum + (item.price * item.quantity), 0
    );

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <div className="text-sm font-medium text-gray-600">
                    Total: ${totalAmount?.toFixed(2)}
                </div>
            </div>

            <div className="space-y-4">
                {Object.values(items).map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-medium text-gray-800">{item.name}</h3>
                                {item.parentName && (
                                    <span className="text-sm text-gray-500">from {item.parentName}</span>
                                )}
                            </div>

                            {item.type && (
                                <span className="inline-block px-2 py-1 mt-1 text-xs font-medium text-gray-600 bg-gray-200 rounded-full">
                                    {item.type}
                                </span>
                            )}

                            {item.description && (
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="font-medium text-gray-800">
                                    ${(item.price * item.quantity)?.toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-500">
                                    ${item.price?.toFixed(2)} × {item.quantity}
                                </div>
                            </div>

                            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full">
                                <ShoppingCart size={16} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceCard;
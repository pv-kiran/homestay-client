import React, { useState, useMemo } from 'react';
import { Modal } from './common/Modal';
import { Building2, Search } from 'lucide-react';
const LocationModal = ({ isModalOpen, handleClose, data, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const filteredLocations = useMemo(() => {
        return data.data.filter(location =>
            location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.state.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data.data, searchQuery]);
    return (
        <Modal
            isOpen={isModalOpen}
            onClose={handleClose}
        >
            <div className="relative mb-1 -mt-4 w-11/12">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none  focus:ring-turquoise-400 focus:border-transparent"
                />
            </div>
            <div className='h-[350px] overflow-y-auto'>

                <div className="grid grid-cols-1">
                    {filteredLocations.map((location, index) => (
                        <button
                            key={index}
                            onClick={() => onSelect(location)}
                            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        >
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <Building2 className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium text-gray-900">{location?.city}</span>
                                <span className="text-xs text-gray-500">{location?.district},{location?.state} </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </Modal>
    );
}

export default LocationModal;

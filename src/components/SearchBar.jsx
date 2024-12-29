import React, { useRef, useState } from 'react';
import { Search, MapPin, Users } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocationBox } from './LocationBox';
import { usePopoverPosition } from '../hooks/usePopOver';
import userService from './../services/userServices';
import useApi from './../hooks/useApi';
import { useEffect } from 'react';
import { theme } from './../utils/theme';
import LocationModal from './LocationModal';


export default function SearchBar({ handleSearch }) {
    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [guests, setGuests] = useState(1);
    const [activeInput, setActiveInput] = useState(null);
    const [showLocations, setShowLocations] = useState(false);
    const inputWrapperRef = useRef(null);
    const locationBoxRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const position = usePopoverPosition(inputWrapperRef, locationBoxRef);

    const {
        data,
        execute: getAllHomeStayLocations,
    } = useApi(userService.userGetHomeStayByLocations);



    const searchHomeStays = (e) => {
        e.preventDefault();
        handleSearch({
            location,
            checkIn: checkIn?.$d,
            checkOut: checkOut?.$d,
            guests
        })
    };

    const handleLocationSelect = (location) => {
        setLocation(location)
        setShowLocations(false);
    };

    useEffect(() => {
        getAllHomeStayLocations();
    }, [])


    const handleClose = () => {
        setIsModalOpen(false)
    }

    const onSelect = (location) => {
        setLocation(location)
        setIsModalOpen(false)
    }



    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <div className="w-full max-w-5xl mx-auto px-4 md:px-6 mt-4 ">
                    <form onSubmit={searchHomeStays}>
                        {/* Desktop and Tablet View */}
                        <div className="hidden md:block" ref={inputWrapperRef}>
                            <div className="bg-white rounded-full shadow-lg divide-x divide-gray-200 flex items-center transition-all duration-300 px-1 relative">
                                {/* Location */}
                                <div className={`group flex-1 p-3 rounded-full hover:bg-gray-200  transition-colors duration-200 cursor-pointer  ${activeInput === 'location' ? 'bg-gray-200 rounded-full' : ''}`}>
                                    <div className="px-2">
                                        <div className="text-xs font-semibold text-gray-800">Location</div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Where to?"
                                                className="w-full bg-transparent border-none outline-none text-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-0 focus:border-none"
                                                value={location?.city}
                                                onChange={(e) => { setLocation(e.target.value) }}
                                                onFocus={() => {
                                                    setActiveInput('location')
                                                    setShowLocations(true)
                                                }
                                                }
                                                onBlur={() => {
                                                    setActiveInput(null)
                                                    setTimeout(() => {
                                                        setShowLocations(false)
                                                    }, 500)
                                                }}
                                            />
                                        </div>
                                        {
                                            showLocations && <LocationBox
                                                ref={locationBoxRef}
                                                locations={data?.data?.filter((_location) =>
                                                    _location.city.includes(location)
                                                )}
                                                onSelect={handleLocationSelect}
                                                position={position}
                                            />
                                        }
                                    </div>
                                </div>

                                {/* Check-in */}
                                <div className={`group flex-1 p-3 hover:bg-gray-200 rounded-full  transition-colors duration-200 cursor-pointer ${activeInput === 'checkIn' ? 'bg-gray-200 rounded-full' : ''}`}>
                                    <div className="px-2">
                                        <div className="text-xs font-semibold text-gray-800">Check in</div>
                                        <div className="flex items-center gap-2">
                                            <DatePicker
                                                value={checkIn}
                                                onChange={(newValue) => setCheckIn(newValue)}
                                                minDate={dayjs()}
                                                format="MMM D, YYYY"
                                                slotProps={{
                                                    textField: {
                                                        placeholder: "Add date",
                                                        onFocus: () => setActiveInput('checkIn'),
                                                        onBlur: () => setActiveInput(null)
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Check-out */}
                                <div className={`group flex-1 p-3 hover:bg-gray-200 rounded-full transition-colors duration-200 cursor-pointer ${activeInput === 'checkOut' ? 'bg-gray-200 rounded-full' : ''}`}>
                                    <div className="px-2">
                                        <div className="text-xs font-semibold text-gray-800">Check out</div>
                                        <div className="flex items-center gap-2">
                                            <DatePicker
                                                value={checkOut}
                                                onChange={(newValue) => setCheckOut(newValue)}
                                                minDate={checkIn ? dayjs(checkIn).add(1, 'day') : dayjs()}
                                                format="MMM D, YYYY"
                                                slotProps={{
                                                    textField: {
                                                        placeholder: "Add date",
                                                        onFocus: () => setActiveInput('checkOut'),
                                                        onBlur: () => setActiveInput(null)
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Guests */}
                                <div className={`group flex-1 p-3 hover:bg-gray-200 rounded-full transition-colors duration-200 cursor-pointer ${activeInput === 'guests' ? 'bg-gray-200 rounded-full' : ''}`}>
                                    <div className="px-2">
                                        <div className="text-xs font-semibold text-gray-800">Guests</div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-gray-400" />
                                            <input
                                                type="number"
                                                min="1"
                                                max="16"
                                                className="w-20 bg-transparent border-none outline-none text-gray-600 text-sm
                                        focus:outline-none focus:ring-0 focus:border-none"
                                                value={guests}
                                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                                onFocus={() => setActiveInput('guests')}
                                                onBlur={() => setActiveInput(null)}
                                            />
                                            <span className="text-sm text-gray-500">guests</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <div className="p-3">
                                    <button
                                        type="submit"
                                        className=" bg-turquoise-500 hover:bg-turquoise-700 w-16 h-16 text-white px-6 py-3 rounded-[1000px] flex items-center gap-2 transition-colors duration-200 "
                                    >
                                        <Search className="h-4 w-4" />
                                        {/* <span className="font-medium">Search</span> */}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden space-y-4">
                            <div className="bg-black/10 rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm">

                                <div className={`p-4 border-b border-white/20 ${activeInput === 'location' ? 'bg-black/30 rounded-full' : ''}`}>
                                    <div className="text-xs font-semibold text-white mb-1">Location</div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-white" />
                                        <input
                                            type="text"
                                            placeholder="Where to?"
                                            className="w-full bg-transparent border-none outline-none text-white placeholder-white/70
                focus:outline-none focus:ring-0 focus:border-none"
                                            value={location?.city}
                                            onChange={(e) => setLocation(e.target.value)}
                                            onFocus={() => {
                                                setActiveInput('location');
                                                setIsModalOpen(true)
                                            }}
                                            onBlur={() => {
                                                setActiveInput(null)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={`p-4 border-b border-white/20 ${activeInput === 'checkIn' ? 'bg-black/30 rounded-full' : ''}`}>
                                    <div className="text-xs font-semibold text-white mb-1">Check in</div>
                                    <div className="flex items-center gap-3">
                                        <DatePicker
                                            value={checkIn}
                                            onChange={(newValue) => setCheckIn(newValue)}
                                            minDate={checkIn || dayjs()}
                                            format="MMM D, YYYY"
                                            slotProps={{
                                                textField: {
                                                    sx: {
                                                        '& .MuiInputBase-input': {
                                                            color: 'white',
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: 'white',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            border: 'none',
                                                        },
                                                        '& .MuiSvgIcon-root': {
                                                            color: 'white',
                                                        },
                                                    },
                                                    style: { color: 'white' },
                                                    placeholder: "Add date",
                                                    className: "w-full bg-transparent border-none outline-none !text-white placeholder-white/70",
                                                    onFocus: () => setActiveInput('checkIn'),
                                                    onBlur: () => setActiveInput(null),
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className={`p-4 border-b border-white/20 ${activeInput === 'checkOut' ? 'bg-black/30 rounded-full' : ''}`}>
                                    <div className="text-xs font-semibold text-white mb-1">Check out</div>
                                    <div className="flex items-center gap-3">
                                        <DatePicker
                                            value={checkOut}
                                            onChange={(newValue) => setCheckOut(newValue)}
                                            minDate={checkIn || dayjs()}
                                            format="MMM D, YYYY"
                                            slotProps={{
                                                textField: {
                                                    sx: {
                                                        '& .MuiInputBase-input': {
                                                            color: 'white',
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: 'white',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            border: 'none',
                                                        },
                                                        '& .MuiSvgIcon-root': {
                                                            color: 'white',
                                                        },
                                                    },
                                                    placeholder: "Add date",
                                                    className: "w-full bg-transparent border-none outline-none text-white placeholder-white/70",
                                                    onFocus: () => setActiveInput('checkOut'),
                                                    onBlur: () => setActiveInput(null),
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className={`p-4 ${activeInput === 'guests' ? 'bg-black/30 rounded-full' : ''}`}>
                                    <div className="text-xs font-semibold text-white mb-1">Guests</div>
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-white" />
                                        <input
                                            type="number"
                                            min="1"
                                            max="16"
                                            className="w-20 bg-transparent border-none outline-none text-white focus:outline-none focus:ring-0 focus:border-none"
                                            value={guests}
                                            onChange={(e) => setGuests(parseInt(e.target.value))}
                                            onFocus={() => setActiveInput('guests')}
                                            onBlur={() => setActiveInput(null)}
                                        />
                                        <span className="text-sm text-white">guests</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Search Button */}
                            <button
                                type="submit"
                                className="w-full bg-turquoise-500 hover:bg-turquoise-700 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
                            >
                                <Search className="h-5 w-5" />
                                <span className="font-medium">Search Homestays</span>
                            </button>
                        </div>
                    </form>
                </div>
                {
                    isModalOpen ?
                        <div className='md:hidden'>
                            <LocationModal
                                isModalOpen={isModalOpen}
                                handleClose={handleClose}
                                data={data}
                                onSelect={onSelect}
                            />
                        </div>

                        : null
                }

            </ThemeProvider>
        </LocalizationProvider>
    );
}
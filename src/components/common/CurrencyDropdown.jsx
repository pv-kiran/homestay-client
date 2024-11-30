import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrency } from '../../app/features/users/currencySlice';

export function CurrencyDropdown({ currencies, onSelect, isHomepage }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef(null);
    const { currency } = useSelector((state) => state?.currency);
    const dispatch = useDispatch();

    const filteredCurrencies = currencies.filter(
        currency =>
            currency.name.toLowerCase().includes(search.toLowerCase()) ||
            currency.code.toLowerCase().includes(search.toLowerCase())
    );

    const handleCurrencySelect = (currency) => {
        onSelect(currency);
        localStorage.setItem("currency", JSON.stringify(currency));
        dispatch(setCurrency());
        setSearch("");
        setIsOpen(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    useEffect(() => {
        if (!currency) {
            localStorage.setItem("currency", JSON.stringify({ code: 'INR', name: 'Indian rupee', symbol: '₹' }))
            dispatch(setCurrency());
        }
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center space-x-2 rounded-full p-2 hover:shadow-sm transition-all border border-gray-500 ${isHomepage ? "text-white" : "text-gray-700"
                    } ${isHomepage ? "" : "border border-gray-300"}`}
                style={{
                    background: "transparent",
                }}
            >
                <Globe className="h-5 w-5" />
                <span className="text-sm">
                    {currency ? `${currency?.code} ${currency?.symbol}` : 'Currency'}
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50">
                    <div className="p-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search currencies..."
                                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-turquoise-300"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto p-2">
                        {filteredCurrencies.map((currency) => (
                            <button
                                key={currency.code}
                                onClick={() => {
                                    handleCurrencySelect(currency)
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between rounded-md"
                            >
                                <span>{currency.name}</span>
                                <span className="text-gray-500">
                                    {currency.symbol} ({currency.code})
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
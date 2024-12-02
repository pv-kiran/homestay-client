import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomeStayCard = ({ homestay }) => {
    const { currency } = useSelector((state) => state?.currency);
    const navigate = useNavigate();
    return (
        <div
            className="group"
            role='button'
            onClick={() => navigate(`/homestay/view/${homestay?._id}`)}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                    src={homestay?.images[0]}
                    alt={homestay?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
            </div>
            <div className="mt-3">
                <div className="flex justify-between items-start gap-3">
                    <h3 className="font-semibold text-lg">{homestay?.title}</h3>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className='text-gray-800 text-lg'>{currency?.symbol}</span>
                        <span className="font-semibold text-xl">
                            {homestay?.pricePerNight?.toLocaleString('en-IN')}</span>
                        <span className="text-gray-500 text-sm"> night</span>
                    </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{homestay?.address?.city}, {homestay?.address?.state}</p>
            </div>
        </div>
    );
}

export default HomeStayCard;

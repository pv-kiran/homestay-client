import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const HomeStayCard = ({ homestay }) => {
    const navigate = useNavigate();

    return (
        <div
            className="group"
            role='button'
            onClick={() => navigate('/homestay/view/33')}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                    src={homestay.image}
                    alt={homestay.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
            </div>
            <div className="mt-3">
                <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{homestay.title}</h3>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                        <span className="text-sm">{homestay.rating}</span>
                    </div>
                </div>
                <p className="text-gray-600">{homestay.location}</p>
                <p className="mt-1">
                    <span className="font-medium">${homestay.price}</span>
                    <span className="text-gray-600"> / night</span>
                </p>
            </div>
        </div>
    );
}

export default HomeStayCard;

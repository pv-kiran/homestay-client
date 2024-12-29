import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "../common/FormField";
import { Button } from "../common/Button";
import StarRating from './StarRating';
import { Building2 } from 'lucide-react';
import userService from '../../services/userServices';
import useApi from '../../hooks/useApi';
import { toast } from 'react-toastify';


const schema = yup.object({
    reviewText: yup.string().required("Review is required").min(10, "Feedback is too short"),
})

function ReviewForm({stayName, homestayId, onClose}) {

    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [ratingError, setRatingError] = useState(null);

    const {
        // error: bookingError,
        // loading: bookingLoading,
        execute: submitReview,
        // success: bookHomestaySuccess,
    } = useApi(userService.userSubmitReview);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    
    const handleRating = (newRating) => {
        setRating(newRating);
        if (newRating > 0) {
          setRatingError(null); 
        }
    };

    const onSubmit = async (data) => {
        if (rating === 0) {
            setRatingError("Rating is required");
            return;
        }

        const response = await submitReview({
            homestayId: homestayId,
            reviewText: data?.reviewText,
            rating: rating
        })
        if(response.success) {
            toast.success(response?.message);
            onClose();
        }        
    };

  return (
    <div>
        <div className='flex justify-center items-center'>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 mb-4">
                <Building2 className="text-[#2DD4BF]" size={20} />
                <span className="font-medium text-gray-800">{stayName}</span>
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
                <StarRating
                    rating={rating}
                    hoveredRating={hoveredRating}
                    onRate={handleRating}
                    onHover={setHoveredRating}
                />
                {ratingError && (
                    <p className="text-red-500 text-xs mt-1">{ratingError}</p>
                )}
            </div>
            <FormField
            type="textarea"
            name="reviewText"
            label="Share your experience"
            placeholder="Tell us what you loved (or didn't love) about your stay..."
            register={register}
            error={errors.reviewText}
            />
            <Button type="submit" fullWidth isLoading={isSubmitting}>
                Submit
            </Button>
        </form>
    </div>
  )
}

export default ReviewForm
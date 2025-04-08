import React, { useEffect } from 'react'
import useApi from '../../hooks/useApi';
import adminService from '../../services/adminServices';
import { FormField } from '../common/FormField';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from '../common/Button';
import { toast } from 'react-toastify';
import { PlusCircle, Trash2 } from 'lucide-react';


const schema = yup.object({
    cancellationPolicy: yup.array().of(
        yup.object({
            policyName: yup.string()
                .required("Policy type is required")
                .min(3, "Policy name must be at least 3 characters")
                .max(20, "Policy name must not exceed 20 characters"),

            hoursBeforeCheckIn: yup.number()
                .typeError("Hours must be a number")
                .required("Cutoff time is required")
                .positive("Hours must be a positive number")
                .integer("Hours must be a whole number"),

            refundPercentage: yup.number()
                .typeError("Refund percentage must be a number")
                .required("Refund percentage is required")
                .min(0, "Refund percentage cannot be negative")
                .max(100, "Refund percentage cannot exceed 100%"),
        })
    ).required("At least one policy is required")
});

function CancPolForm({ homeStayId, handleClose, selectedHomeStay, getHomestays }) {

    const {
        loading: addCancPolLoading,
        execute: addCancPol,
        reset: addCancPolReset,
        error: addCancPolError,
    } = useApi(adminService.adminEditCancellationPolicy);

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            cancellationPolicy: [{ policyName: "", hoursBeforeCheckIn: "", refundPercentage: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'cancellationPolicy'
    });

    const onSubmit = async (data) => {
        const result = await addCancPol({
            data: data?.cancellationPolicy.map(({ _id, ...rest }) => rest),
            homeStayId
        });
        if (result) {
            toast.success(result?.message);
            getHomestays();
        }
        handleClose();
    }

    useEffect(() => {
        if (addCancPolError) {
            toast.error(addCancPolError?.message);
        }
    }, [addCancPolError]);

    useEffect(() => {
        if (selectedHomeStay) {
            reset({
                cancellationPolicy: selectedHomeStay?.cancellationPolicy
            });
        }
    }, [selectedHomeStay])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Cancellation Policies</h3>
                        <button
                            type="button"
                            onClick={() => append({ policyName: '', hoursBeforeCheckIn: '', refundPercentage: '' })}
                            className="inline-flex items-center px-1 py-1 text-xs border border-turquoise-500 rounded-md text-turquoise-500 bg-white hover:bg-turquoise-50 focus:outline-none focus:ring-1 focus:ring-turquoise-500"
                        >
                            <PlusCircle className="h-4 w-4 mr-1" />
                            Add policy
                        </button>
                    </div>

                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-start bg-gray-50 p-4 rounded-md relative"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Cutoff hour
                                </label>
                                <input
                                    {...register(`cancellationPolicy.${index}.hoursBeforeCheckIn`)}
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-turquoise-500 focus:ring-turquoise-500 sm:text-sm p-2 border"
                                    placeholder="Cutoff time"
                                />
                                {errors.cancellationPolicy?.[index]?.hoursBeforeCheckIn && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.cancellationPolicy[index]?.hoursBeforeCheckIn?.message}
                                    </p>
                                )}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <input
                                    {...register(`cancellationPolicy.${index}.policyName`)}
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-turquoise-500 focus:ring-turquoise-500 sm:text-sm p-2 border"
                                    placeholder="Eg:- Full refund"
                                />
                                {errors.cancellationPolicy?.[index]?.policyName && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.cancellationPolicy[index]?.policyName?.message}
                                    </p>
                                )}
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">
                                    Refund
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">%</span>
                                    </div>
                                    <input
                                        {...register(`cancellationPolicy.${index}.refundPercentage`)}
                                        type="text"
                                        className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-turquoise-500 focus:ring-turquoise-500 sm:text-sm p-2 border"
                                        placeholder="0"
                                    />
                                </div>
                                {errors.cancellationPolicy?.[index]?.refundPercentage && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.cancellationPolicy[index]?.refundPercentage?.message}
                                    </p>
                                )}
                            </div>

                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute -right-2 -top-2 text-red-600 hover:text-red-800 bg-white rounded-full p-1 shadow-sm"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    ))}
                    {errors.cancellationPolicy && (
                        <p className="mt-1 text-sm text-red-600">{errors.cancellationPolicy.message}</p>
                    )}
                </div>
                <div className="pt-4">
                    <Button
                        type="submit"
                        // isLoading={addCancPolLoading}
                        fullWidth
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CancPolForm
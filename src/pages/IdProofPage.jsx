import React, { useEffect, useState } from 'react';
import { Shield, FileCheck, AlertCircle, Save, Loader2 } from 'lucide-react';
import useApi from '../hooks/useApi';
import { toast } from 'react-toastify';
import adminService from '../services/adminServices';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormField } from "../components/common/FormField";

const idProofSchema = yup.object({
    disclaimerNote: yup.string().required('Disclaimer note is required')
        .min(10, "Disclaimer note must be at least 10 characters")
        .max(500, "Disclaimer note must be at most 500 characters"),
    isIdProofMandatory: yup.boolean().required()
  });

function IdProofPage() {
    const [isSaving, setIsSaving] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { isDirty: isEditing, errors }
      } = useForm({
        resolver: yupResolver(idProofSchema),
        defaultValues: {
          isIdProofMandatory: false,
          disclaimerNote: ''
        }
      });

    const isIdProofMandatory = watch('isIdProofMandatory');

    const {
        data: idProofData,
        loading: idProofLoading,
        execute: idProofExecute,
        error: idProofError,
      } = useApi(adminService.adminUpdateIdProof);
    
      const {
        data: idProofFetchData,
        loading: idProofFetchLoading,
        execute: idProofFetchExecute,
        error: idProofFetchError,
      } = useApi(adminService.adminGetIdProofStatus);

    useEffect(() => {
        fetchIdStatus();
    },[]);

    useEffect(() => {
        if(idProofError) {
            toast.error(idProofError.message);
        }
    },[idProofError])

    const fetchIdStatus = async () => {
        try {
            const response = await idProofFetchExecute();
            if (response.success && response.data) {
                reset(response.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    }

    const onSubmit = async (data) => {
        const response = await idProofExecute({
            data: {
                disclaimerNote: data.disclaimerNote,
                isIdProofMandatory: data.isIdProofMandatory
            }
        });
        
        if (response.success) {
            toast.success(response.message);
            reset(response.data);
            fetchIdStatus();
        }
    }

    const handleToggle = () => {
        setValue('isIdProofMandatory', !isIdProofMandatory, { 
          shouldDirty: true,
          shouldValidate: true 
        });
    };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-turquoise-500 px-6 py-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-white" />
              <h1 className="text-xl font-semibold text-white">Verification Settings</h1>
            </div>
          </div>

          {/* Main Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* ID Proof Toggle Section */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileCheck className="h-5 w-5 text-turquoise-600" />
                <div>
                  <h2 className="font-medium text-gray-900">ID Proof Verification</h2>
                  <p className="text-sm text-gray-500">Require guests to upload ID proof during booking</p>
                </div>
              </div>
                <button
                    type="button"
                    onClick={handleToggle}
                    title="Toggle ID Proof requirement"
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none">
                    <div
                        className={`
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                        ${isIdProofMandatory ? "bg-turquoise-300" : "bg-gray-300"}
                        `}>
                        <span
                        className={`
                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm
                            ${isIdProofMandatory ? "translate-x-6" : "translate-x-1"}
                        `}
                        />
                    </div>
                </button>
            </div>

            {/* Disclaimer Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-turquoise-600" />
                <h2 className="font-medium text-gray-900">Disclaimer Note</h2>
              </div>
              <FormField
                type="textarea"
                name="disclaimerNote"
                placeholder="Enter disclaimer text here..."
                register={register}
                error={errors.disclaimerNote}
                control={control}
              />
              {isEditing && (
                <div className="text-right">
                  <span className="text-xs text-gray-500">Unsaved changes</span>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isEditing || isSaving}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isEditing && !isSaving
                    ? 'bg-turquoise-500 hover:bg-turquoise-600 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Preview Card */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Settings Preview</h2>
          <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className={`h-2 w-2 rounded-full ${idProofFetchData?.data?.isIdProofMandatory ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-700">
                    ID Proof Verification is {idProofFetchData?.data?.isIdProofMandatory ? 'required' : 'not required'}
                </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Disclaimer:</h3>
                <p className="text-sm text-gray-600">
                    {idProofFetchData?.data?.disclaimerNote || 'No disclaimer set'}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdProofPage
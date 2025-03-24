import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { FormField } from '../components/common/FormField';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from '../components/common/Button';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import { toast } from 'react-toastify';

const schema = yup.object({
    name: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    subject: yup.string().required("Subject is required"),
    message: yup.string().required("Message is required"),
});

export const ContactUs = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    error: contactUsError,
    execute: UserContactForm,
  } = useApi(userService.UserContactUs);

  const onSubmit = async (data) => {
    const result = await UserContactForm(data);
    if(result?.success) {
        toast.success(result?.message);
    }
  };

  useEffect(() => {
      if (contactUsError) {
          toast.error("Failed to send message");
      }
  }, [contactUsError]);

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#30D5C8] to-[#20B2AA] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-center text-lg max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help! Reach out to us using any of the methods below.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Information Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#30D5C8]/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#30D5C8]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Location</h3>
              <p className="text-gray-600">
                123 Homestay Street<br />
                San Francisco, CA 94105<br />
                United States
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#30D5C8]/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#30D5C8]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">
                Main: +1 (555) 123-4567<br />
                Toll Free: 1-800-HOMESTAY<br />
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#30D5C8]/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#30D5C8]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">
                General: info@homestay.com<br />
                Support: support@homestay.com<br />
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <FormField
                    type="text"
                    name="name"
                    register={register}
                    error={errors.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#30D5C8] focus:border-[#30D5C8] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <FormField
                    type="email"
                    name="email"
                    register={register}
                    error={errors.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#30D5C8] focus:border-[#30D5C8] outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <FormField
                  type="text"
                  name="subject"
                  register={register}
                  error={errors.subject}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#30D5C8] focus:border-[#30D5C8] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <FormField
                    name="message"
                    type="textarea"
                    register={register}
                    error={errors.message}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#30D5C8] focus:border-[#30D5C8] outline-none transition-colors resize-none"
                ></FormField>
              </div>
              <div>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#30D5C8] hover:bg-[#20B2AA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#30D5C8] transition-colors"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

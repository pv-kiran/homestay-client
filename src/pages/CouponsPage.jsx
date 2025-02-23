import { useEffect, useRef, useState } from "react";
import { Button } from "./../components/common/Button";
import { Modal } from "../components/common/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormField } from "../components/common/FormField";
import adminService from "../services/adminServices";
import useApi from "../hooks/useApi";
import { Table } from "../components/common/table/Table";
import { toast } from "react-toastify";
import { CirclePlus, TicketPercent } from "lucide-react";
import { Loader } from './../components/common/Loader';
import { EmptyState } from "../components/common/EmptyState";


const couponSchema = yup.object({
  code: yup.string()
    .required("Coupon code is required")
    .matches(/^[a-zA-Z0-9]+$/, "Coupon code must be alphanumeric")
    .min(3, "Coupon code must be at least 3 characters long")
    .max(20, "Coupon code must not exceed 20 characters"),
  description: yup.string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters long"),
  discountType: yup.string()
    .required("Discount type is required"),
  discountValue: yup.number()
    .typeError("Discount value must be a number")
    .required("Discount value is required")
    .positive("Discount value must be a positive number"),
  maxDiscount: yup.number()
    .typeError("Maximum discount must be a number")
    .required("Maximum discount is required")
    .positive("Maximum discount must be a positive number"),
  expiryDate: yup.date()
    .typeError("Expiry date must be a valid date")
    .required("Expiry date is required")
    .min(new Date(), "Expiry date cannot be in the past"),
  usageLimit: yup.number()
    .typeError("Usage limit must be a number")
    .required("Usage limit is required")
    .positive("Usage limit must be a positive number")
    .integer("Usage limit must be an integer"),
});

export default function CouponsPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [couponId, setCouponId] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const timer = useRef(null);

  const [isShowLoading, setIsShowLoading] = useState(true);


  const {
    loading: addCouponLoading,
    execute: addCoupon,
    reset: addCouponReset,
    error: addCouponError,
  } = useApi(adminService.adminCouponAdd);

  const {
    loading: getCouponLoading,
    data: allCoupons,
    execute: getAllCoupons,
    error: getCouponsError,
  } = useApi(adminService.adminGetAllCoupons);

  const {
    execute: toggleCoupon,
    error: toggledcouponError,
  } = useApi(adminService.adminToggleCoupon);

  const {
    loading: couponEditLoading,
    execute: couponEdit,
    reset: aditCouponReset,
    error: couponEditError,
  } = useApi(adminService.adminCouponEdit);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(couponSchema),
  });

  const handleCouponSubmit = async (data) => {
    if (!isEditing) {
      const result = await addCoupon(data);
      if (result) {
        toast.success(result?.message);
        addCouponReset();
      }
    } else {
      const result = await couponEdit({ data, couponId });
      if (result) {
        toast.success(result?.message);
        aditCouponReset();
      }
    }
    setIsShowLoading(false);
    getAllCoupons({
      pagePerData: pageSize,
      pageNumber: currentPage,
      searchParams: ""
    })
    handleClose();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCouponId(null);
    setValue("code", "")
    setValue("description", "")
    setValue("discountType", "")
    setValue("discountValue", "")
    setValue("maxDiscount", "")
    setValue("expiryDate", "")
    setValue("usageLimit", "")
    clearErrors();
  };

  const handleEdit = (id) => {
    const chosencoupon = allCoupons?.data.filter((coupon) => coupon._id === id);
    setIsModalOpen(true);
    setValue('code', chosencoupon[0].code)
    setValue('description', chosencoupon[0].description)
    setValue('discountType', chosencoupon[0].discountType)
    setValue('discountValue', chosencoupon[0].discountValue)
    setValue('maxDiscount', chosencoupon[0].maxDiscount)
    setValue('expiryDate', chosencoupon[0].expiryDate)
    setValue('usageLimit', chosencoupon[0].usageLimit)
    setIsEditing(true)
    setCouponId(id);
    setIsShowLoading(false);
  };

  const handleToggle = async (id) => {
    setIsShowLoading(false);
    const result = await toggleCoupon(id);
    if (result) {
      await getAllCoupons({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: ""
      });
      if (result.success) {
        toast.success(result.message);
      }
      else {
        toast.error('Please try again later');
      }
    }
  };

  const handlePageNumber = (page) => {
    setCurrentPage(page);
  }

  const handlePageSize = (size) => {
    setPageSize(size);
  }

  const couponColumns = [
    {
      header: "Coupon code",
      accessor: "code",
      sortable: true,
    },
    {
      header: "Discount type",
      accessor: "discountType",
      sortable: true,
    },
    {
      header: "Expiry date",
      accessor: "expiryDate",
      sortable: true,
    },
    {
      header: "Discount",
      accessor: "discountValue",
      sortable: true,
    },
    {
      header: "Status",
      accessor: (coupon) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${coupon?.isActive
            ? "bg-turquoise-200 text-turquoise-500"
            : "bg-gray-100 text-gray-800"
            }`}>
          {coupon?.isActive ? "Active" : "Disabled"}
        </span>
      ),
      sortable: true,
    },
  ];


  const getActions = (item) => [
    {
      icon: "edit",
      onClick: () => handleEdit(item._id),
      title: "Edit",
    },
    {
      icon: "toggle",
      isActive: !item.isActive,
      onClick: () => handleToggle(item._id),
      title: "Toggle status",
    },
  ];

  const handleSearch = (query) => {
    setIsShowLoading(false);
    setSearchKey(query)
  };

  const getTitle = () => {
    if (!isEditing) {
      return "Add a coupon";
    } else {
      return "Edit a coupon";
    }
  };

  const getDescription = () => {
    if (!isEditing) {
      return "Add a new coupon with details. Click submit when you're done";
    } else {
      return "Edit the coupon if you need. Click submit when you're done";
    }
  };


  useEffect(() => {
    getAllCoupons({
      pagePerData: pageSize,
      pageNumber: currentPage,
      searchParams: ""
    });
  }, [pageSize, currentPage]);

  useEffect(() => {
    if (addCouponError) {
      toast.error(addCouponError?.message);
    }
    if (getCouponsError) {
      toast.error(getCouponsError?.message);
    }
    if (toggledcouponError) {
      toast.error(toggledcouponError?.message);
    }
    if (couponEditError) {
      toast.error(couponEditError?.message);
    }
  }, [
    addCouponError,
    getCouponsError,
    toggledcouponError,
    couponEditError
  ]);

  useEffect(() => {
    if (!timer.current) {
      getAllCoupons({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: searchKey
      });
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      getAllCoupons({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: searchKey
      });
    }, 500);
  }, [searchKey]);


  return (
    <>
      <div className="flex justify-end">
        {/* <h1 className="text-2xl font-semibold text-gray-800">
          Amenities Management
        </h1> */}
        <Button onClick={() => setIsModalOpen(true)} size="sm"><CirclePlus className='pr-1 pb-1' color="#ffffff" />Add coupon</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          title={getTitle()}
          description={
            getDescription()
          }>
          <form
            onSubmit={handleSubmit(handleCouponSubmit)}
            className=" space-y-4">
            <FormField
              type="text"
              name="code"
              label="Coupon code"
              placeholder="Enter coupon code"
              register={register}
              error={errors.code}
            />
            <FormField
              type="textarea"
              name="description"
              label="Coupon description"
              placeholder="Enter coupon description"
              register={register}
              error={errors.description}
            />
            <FormField
              type="radio"
              name="discountType"
              label="Discount type"
              register={register}
              error={errors.discountType}
              options={[
                { label: "Percentage", value: "percentage" },
                { label: "Flat", value: "fixed" },
              ]}
            />
            <FormField
              type="text"
              name="discountValue"
              label="Discount value"
              placeholder="Enter discount value"
              register={register}
              error={errors.discountValue}
            />
            <FormField
              type="text"
              name="maxDiscount"
              label="Maximum discount"
              placeholder="Enter max discount"
              register={register}
              error={errors.maxDiscount}
            />
            <FormField
              type="text"
              name="expiryDate"
              label="Expiry date"
              placeholder="Enter expiry date"
              register={register}
              error={errors.expiryDate}
            />
            <FormField
              type="text"
              name="usageLimit"
              label="Usage limit"
              placeholder="Enter usage limit"
              register={register}
              error={errors.usageLimit}
            />
            <Button
              type="submit"
              fullWidth
              isLoading={isEditing ? couponEditLoading : addCouponLoading}>
              Submit
            </Button>
          </form>
        </Modal>
      </div>
      {
        (getCouponLoading && isShowLoading) && <div className='mt-2 h-[70vh] flex items-center justify-center'>
          <Loader />
        </div>
      }

      <div className="min-h-screen my-4">
        {
          allCoupons?.data?.length > 0 ? (
            <Table
              title="Coupon Management"
              subtitle="Manage your coupons"
              columns={couponColumns}
              data={allCoupons?.data}
              actions={getActions}
              onSearch={handleSearch}
              initialSort={{ field: "title", direction: "asc" }}
              currentPage={currentPage}
              onPageChange={handlePageNumber}
              onPageSizeChange={handlePageSize}
              pageSize={pageSize}
              totalItems={allCoupons?.totalPages}
            />
          ) :
            <div>
              {
                !getCouponLoading && <EmptyState
                  title="Empty Homestays"
                  message="Your coupon list is currently empty."
                  icon={<TicketPercent className="w-12 h-12 text-gray-400" />}
                />
              }
            </div>
        }
      </div>
    </>
  );
}




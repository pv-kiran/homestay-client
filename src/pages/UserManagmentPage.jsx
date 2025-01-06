import React, { useState, useEffect, useRef } from "react";
import adminService from "../services/adminServices";
import useApi from "../hooks/useApi";
import { Table } from "../components/common/table/Table";
import { toast } from "react-toastify";
import { Loader } from "../components/common/Loader";
import { UserCircle } from "lucide-react";
import { EmptyState } from "../components/common/EmptyState";



export default function UserManagementPage() {

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const timer = useRef(null);

  const [isShowLoading, setIsShowLoading] = useState(true);

  const {
    loading,
    data: allUsers,
    execute: getAllUsers,
    error: getUserError,
  } = useApi(adminService.adminGetAllUsers);

  const {
    execute: toggleUser,
    error: toggleUserError,
  } = useApi(adminService.adminToggleUser);


  const handleToggle = async (id) => {
    setIsShowLoading(false)
    const result = await toggleUser(id);
    if (result) {
      await getAllUsers({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: searchKey
      });

      if (result?.success) {
        toast.success(result?.message);
      }
      else {
        toast.error("Please try again later");
      }
    }
  };

  const userColumns = [
    {
      header: "Name",
      accessor: "fullName",
      sortable: true,
    },
    {
      header: "Status",
      accessor: (user) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${!user?.isDisabled
            ? "bg-turquoise-200 text-turquoise-500"
            : "bg-gray-100 text-gray-800"
            }`}>
          {!user?.isDisabled ? "Active" : "Disabled"}
        </span>
      ),
      sortable: true,
    },
  ];


  const getActions = (item) => [
    {
      icon: "toggle",
      isActive: item.isDisabled,
      onClick: () => handleToggle(item._id),
      title: "Toggle status",
    },
  ];

  const handleSearch = (query) => {
    setIsShowLoading(false)
    setSearchKey(query);
  };

  const handlePageNumber = (page) => {
    setCurrentPage(page);
  }

  const handlePageSize = (size) => {
    setPageSize(size);
  }


  useEffect(() => {
    getAllUsers({
      pagePerData: pageSize,
      pageNumber: currentPage,
      searchParams: searchKey
    });
  }, [pageSize, currentPage]);

  useEffect(() => {
    if (getUserError) {
      toast.error(getUserError?.message);
    }
    if (toggleUserError) {
      toast.error(toggleUserError?.message);
    }
  }, [
    getUserError,
    toggleUserError
  ]);

  useEffect(() => {
    if (!timer.current) {
      getAllUsers({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: searchKey
      });
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      getAllUsers({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: searchKey
      });
    }, 500);
  }, [searchKey]);

  return (
    <div>
      {
        (loading && isShowLoading) && <div className='mt-2 h-[70vh] flex items-center justify-center'>
          <Loader />
        </div>
      }
      <div className="min-h-screen my-4">
        {allUsers?.data?.length > 0 ? (
          <Table
            title="User Management"
            subtitle="Manage your users"
            columns={userColumns}
            data={allUsers?.data}
            actions={getActions}
            onSearch={handleSearch}
            initialSort={{ field: "title", direction: "asc" }}
            currentPage={currentPage}
            onPageChange={handlePageNumber}
            onPageSizeChange={handlePageSize}
            pageSize={pageSize}
            totalItems={allUsers?.totalPages}
          />
        ) :
          <div>
            {
              !loading && <EmptyState
                title="Empty Homestays"
                message="Your user list is currently empty."
                icon={<UserCircle className="w-12 h-12 text-gray-400" />}
              />
            }
          </div>
        }
      </div>
    </div>
  );
}



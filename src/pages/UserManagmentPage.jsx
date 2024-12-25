import React, { useState, useEffect, useRef } from "react";
import adminService from "../services/adminServices";
import useApi from "../hooks/useApi";
import { Table } from "../components/common/table/Table";
import { toast } from "react-toastify";



export default function UserManagementPage() {

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const timer = useRef(null);

  const {
    data: allUsers,
    execute: getAllUsers,
    error: getUserError,
  } = useApi(adminService.adminGetAllUsers);

  const {
    execute: toggleUser,
    error: toggleUserError,
  } = useApi(adminService.adminToggleUser);


  const handleToggle = async (id) => {
    console.log("Toggle clicked for id:", id);
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
    <>
      <div className="min-h-screen my-4">
        {allUsers?.data ? (
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
        ) : null}
      </div>
    </>
  );
}

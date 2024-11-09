import { useEffect } from "react";
import adminService from "../services/adminServices";
import useApi from "../hooks/useApi";
import { Table } from "../components/common/table/Table";
import { toast } from "react-toastify";



export default function UserManagementPage() {

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
      await getAllUsers();
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
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            !user?.isDisabled
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
    console.log("Search query:", query);
  };
    


  useEffect(() => {
    getAllUsers();
  }, []);

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


  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          User Management
        </h1>
      </div>
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
          />
        ) : null}
      </div>
    </>
  );
}

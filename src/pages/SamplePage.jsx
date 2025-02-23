import React, { useState } from "react";
import { FormExample } from "../components/FormExample";
import { SignupModal } from "../components/SignupModal";
import { Table } from "../components/common/table/Table";

const SamplePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryColumns = [
    {
      header: "Title",
      accessor: "title",
      sortable: true,
    },
    {
      header: "Image",
      accessor: (category) => (
        <img
          src={category.image}
          alt={category.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
      ),
      sortable: false,
    },
    {
      header: "Status",
      accessor: (category) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${category.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
            }`}>
          {category.status}
        </span>
      ),
      sortable: true,
    },
  ];

  const categoryData = [
    {
      id: 1,
      title: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=500&fit=crop",
      status: "Active",
    },
    {
      id: 2,
      title: "Clothing",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=500&fit=crop",
      status: "Active",
    },
    {
      id: 3,
      title: "Books",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&h=500&fit=crop",
      status: "Inactive",
    },
  ];

  // Users Data
  const userColumns = [
    {
      header: "Name",
      accessor: "name",
      sortable: true,
    },
    {
      header: "Email",
      accessor: "email",
      sortable: true,
    },
    {
      header: "Role",
      accessor: "role",
      sortable: true,
    },
    {
      header: "Status",
      accessor: (user) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
            }`}>
          {user.status}
        </span>
      ),
      sortable: true,
    },
  ];

  const userData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Editor",
      status: "Active",
    },
  ];

  const handleEdit = (id) => {
    // console.log("Edit clicked for id:", id);
  };

  const handleToggle = (id) => {
    // console.log("Toggle clicked for id:", id);
  };

  const handleDelete = (id) => {
    // console.log("Delete clicked for id:", id);
  };

  const getActions = (item) => [
    {
      icon: "edit",
      onClick: () => handleEdit(item.id),
      title: "Edit",
    },
    {
      icon: "toggle",
      onClick: () => handleToggle(item.id),
      title: "Toggle status",
    },
    {
      icon: "delete",
      onClick: () => handleDelete(item.id),
      title: "Delete",
    },
  ];

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };
  return (
    <div>
      <FormExample />
      <div
        className="flex min-h-screen 
              items-center justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-turquoise-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-turquoise-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:ring-offset-2">
          Sign Up
        </button>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 space-y-8">
        {/* Categories Table */}
        <Table
          title="Category Management"
          subtitle="Manage your product categories"
          columns={categoryColumns}
          data={categoryData}
          actions={getActions}
          onSearch={handleSearch}
          initialSort={{ field: "title", direction: "asc" }}
        />

        {/* Users Table */}
        <Table
          title="User Management"
          subtitle="Manage your system users"
          columns={userColumns}
          data={userData}
          actions={getActions}
          onSearch={handleSearch}
          initialSort={{ field: "name", direction: "asc" }}
        />
      </div>
    </div>
  );
};

export default SamplePage;

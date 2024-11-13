import { useEffect, useRef, useState } from "react";
import { Button } from "./../components/common/Button";
import { Modal } from "../components/common/Modal";
import { FileUpload } from "./../components/common/FileUpload";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormField } from "../components/common/FormField";
import adminService from "../services/adminServices";
import useApi from "../hooks/useApi";
import { Table } from "../components/common/table/Table";

const categorySchema = yup.object({
  category: yup.string().required("Category title is required"),
});


export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [pageSize, setPageSize] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const timer = useRef(null);

  const {
    loading: addCategoryLoading,
    execute: addCategory,
    reset: addCategoryReset,
    error: addCategoryError,
  } = useApi(adminService.adminCategoryAdd);

  const {
    data: allCategories,
    execute: getAllCategories,
    error: getCategoriesError,
  } = useApi(adminService.adminGetAllCategory);

  const {
    execute: toggleCategory,
    error: toggledCategoryError,
  } = useApi(adminService.adminToggleCategory);

  const {
    loading: categoryEditLoading,
    execute: categoryEdit,
    reset: editCategoryReset,
    error: categoryEditError,
  } = useApi(adminService.adminCategoryEdit);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const handleFileUpload = (file) => {
    setFile(file);
    if (fileError) {
      setFileError(null);
    }
  };

  const handleCategorySubmit = async (data) => {
    const formData = new FormData();
    formData.append("categoryName", data.category);
    if (file) {
      formData.append("iconUrl", file);
    }
    if (!isEditing) {
      if (!file) {
        setFileError("Please select a file");
        return;
      } else {
        const result = await addCategory(formData);
        if (result) {
          alert(result?.message);
          addCategoryReset();
        }
      }
    } else {
      const result = await categoryEdit({ formData, categoryId });
      if (result) {
        alert(result?.message);
        editCategoryReset();
      }
    }
    getAllCategories({
      pagePerData: pageSize,
      pageNumber: currentPage,
      searchParams: ""
    })
    handleClose();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setFile(null);
    setIsEditing(false);
    setCategoryId(null);
    setFileError(null);
  };


  const handleEdit = (id) => {
    const chosenCategory = allCategories?.data.filter((category) => category._id === id);
    setIsModalOpen(true);
    setValue('category', chosenCategory[0].categoryName)
    setIsEditing(true)
    setCategoryId(id);
  };

  const handleToggle = async (id) => {
    console.log("Toggle clicked for id:", id);
    const result = await toggleCategory(id);
    if (result) {
      await getAllCategories({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: ""
      });
    }
  };

  const handlePageNumber = (page) => {
    setCurrentPage(page);
  }

  const handlePageSize = (size) => {
    setPageSize(size);
  }

  const categoryColumns = [
    {
      header: "Title",
      accessor: "categoryName",
      sortable: true,
    },
    {
      header: "Icon",
      accessor: (category) => (
        <img
          src={category.iconUrl}
          alt={category.categoryName}
          className="w-16 h-16 rounded-lg object-cover"
        />
      ),
      sortable: false,
    },
    {
      header: "Status",
      accessor: (category) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${!category?.isDisabled
            ? "bg-turquoise-200 text-turquoise-500"
            : "bg-gray-100 text-gray-800"
            }`}>
          {!category?.isDisabled ? "Active" : "Disabled"}
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
      isActive: item.isDisabled,
      onClick: () => handleToggle(item._id),
      title: "Toggle status",
    },
  ];

  const handleSearch = (query) => {
    setSearchKey(query)
  };

  const getTitle = () => {
    if (!isEditing) {
      return "Add a category";
    } else {
      return "Edit a category";
    }
  };

  const getDescription = () => {
    if (!isEditing) {
      return "Add a new image with title. Click submit when you're done";
    } else {
      return "Edit the title and upload the image if u need. Click submit when you're done";
    }
  };


  useEffect(() => {
    getAllCategories({
      pagePerData: pageSize,
      pageNumber: currentPage,
      searchParams: ""
    });
  }, [pageSize, currentPage]);

  useEffect(() => {
    if (addCategoryError) {
      alert(addCategoryError?.message);
    }
    if (getCategoriesError) {
      alert(getCategoriesError?.message);
    }
    if (toggledCategoryError) {
      alert(toggledCategoryError?.message);
    }
    if (categoryEditError) {
      alert(categoryEditError?.message);
    }
  }, [
    addCategoryError,
    getCategoriesError,
    toggledCategoryError,
    categoryEditError
  ]);

  useEffect(() => {
    if (!timer.current) {
      getAllCategories({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: searchKey
      });
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      getAllCategories({
        pagePerData: pageSize,
        pageNumber: currentPage,
        searchParams: searchKey
      });
    }, 500);
  }, [searchKey]);


  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Categories Management
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Category</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          title={getTitle()}
          description={getDescription()}>
          <form
            onSubmit={handleSubmit(handleCategorySubmit)}
            className=" space-y-4">
            <FormField
              type="text"
              name="category"
              label="Category Title"
              placeholder="Enter category title"
              register={register}
              error={errors.category}
            />
            <FileUpload onChange={handleFileUpload} value={file} />
            {fileError ?
              <p className="text-xs text-red-500">{fileError}</p>
              :
              null
            }
            <Button
              type="submit"
              fullWidth
              isLoading={isEditing ? categoryEditLoading : addCategoryLoading}>
              Submit
            </Button>
          </form>
        </Modal>
      </div>
      <div className="min-h-screen my-4">
        {allCategories?.data ? (
          <Table
            title="Category Management"
            subtitle="Manage your product categories"
            columns={categoryColumns}
            data={allCategories?.data}
            actions={getActions}
            onSearch={handleSearch}
            initialSort={{ field: "title", direction: "asc" }}
            currentPage={currentPage}
            onPageChange={handlePageNumber}
            onPageSizeChange={handlePageSize}
            pageSize={pageSize}
            totalItems={allCategories?.totalPages}
          />
        ) : null}
      </div>
    </>
  );
}

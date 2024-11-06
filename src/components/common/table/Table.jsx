import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { TableHeader } from "./TableHeader";
import { TablePagination } from "./TablePagination";
import { TableActions } from "./TableActions";

export function Table({
  title,
  subtitle,
  columns,
  data,
  actions,
  onSearch,
  sortable = true,
  initialSort,
}) {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(initialSort);

  const handleSort = (field) => {
    if (!sortable) return;

    setSortConfig((current) => ({
      field,
      direction:
        current?.field === field && current.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const renderCell = (item, column) => {
    const value =
      typeof column.accessor === "function"
        ? column.accessor(item)
        : item[column.accessor];

    if (React.isValidElement(value)) {
      return value;
    }

    return <div className={column.className}>{String(value)}</div>;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-8">
      <TableHeader title={title} subtitle={subtitle} onSearch={onSearch} />

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => column.sortable && handleSort(column.accessor)}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-2 group">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <ArrowUpDown className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    )}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, rowIndex) => (
              <tr
                key={item.id || rowIndex}
                className="hover:bg-gray-50 transition-colors duration-150">
                {columns.map((column, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                    {renderCell(item, column)}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <TableActions actions={actions(item)} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalItems={data.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}

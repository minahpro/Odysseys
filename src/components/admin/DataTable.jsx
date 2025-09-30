"use client";

import { useState } from "react";
import { Search, Plus, Download, Edit, Trash2, Eye } from "lucide-react";

const DataTable = ({
  title,
  data = [],
  columns = [],
  actions,
  onAdd,
  onEdit,
  onDelete,
  onView,
  onExport,
  searchable = true,
  exportable = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Generate default actions if not provided
  const defaultActions =
    !actions && (onEdit || onDelete || onView)
      ? [
          ...(onView
            ? [
                {
                  icon: Eye,
                  label: "View",
                  onClick: onView,
                  className:
                    "text-blue-600 hover:text-blue-800 hover:bg-blue-50",
                },
              ]
            : []),
          ...(onEdit
            ? [
                {
                  icon: Edit,
                  label: "Edit",
                  onClick: onEdit,
                  className:
                    "text-amber-600 hover:text-amber-800 hover:bg-amber-50",
                },
              ]
            : []),
          ...(onDelete
            ? [
                {
                  icon: Trash2,
                  label: "Delete",
                  onClick: onDelete,
                  className: "text-red-600 hover:text-red-800 hover:bg-red-50",
                },
              ]
            : []),
        ]
      : actions;

  const filteredData = data.filter((item) =>
    item && Object.values(item).some(
      (value) =>
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      {title && (
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="font-jua text-xl md:text-2xl text-primary">{title}</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              {exportable && onExport && (
                <button
                  onClick={onExport}
                  className="flex items-center justify-center px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="font-quicksand">Export</span>
                </button>
              )}
              {onAdd && (
                <button
                  onClick={onAdd}
                  className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="font-quicksand">Add New</span>
                </button>
              )}
            </div>
          </div>

          {/* Search */}
          {searchable && (
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
              />
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-3 md:px-6 py-3 text-left text-xs font-quicksand font-semibold text-gray-500 uppercase tracking-wider ${column.responsive || ''}`}
                >
                  {column.label}
                </th>
              ))}
              {defaultActions && defaultActions.length > 0 && (
                <th className="px-3 md:px-6 py-3 text-right text-xs font-quicksand font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-3 md:px-6 py-4 whitespace-nowrap ${column.responsive || ''}`}
                    >
                      {column.render ? (
                        column.render(item)
                      ) : (
                        <span className="font-quicksand text-gray-900">
                          {item[column.key]}
                        </span>
                      )}
                    </td>
                  ))}
                  {defaultActions && defaultActions.length > 0 && (
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-1 md:space-x-2">
                        {defaultActions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => action.onClick(item)}
                            className={`p-1.5 md:p-2 rounded-xl transition-colors ${action.className || "text-gray-600 hover:text-primary hover:bg-gray-100"}`}
                            title={action.label}
                          >
                            <action.icon className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (defaultActions && defaultActions.length > 0 ? 1 : 0)
                  }
                  className="px-3 md:px-6 py-8 text-center text-gray-500 font-quicksand"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 md:px-6 py-3 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-quicksand text-sm text-gray-700 text-center md:text-left">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} results
          </div>
          <div className="flex items-center justify-center space-x-1 md:space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 md:px-3 py-1 border border-gray-300 rounded-xl font-quicksand text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>
            {/* Show fewer page numbers on mobile */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 5) return true;
                if (page === 1 || page === totalPages) return true;
                if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                return false;
              })
              .map((page, index, array) => {
                const showEllipsis = index > 0 && page - array[index - 1] > 1;
                return (
                  <div key={page} className="flex items-center">
                    {showEllipsis && (
                      <span className="px-1 text-gray-400 text-sm">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-2 md:px-3 py-1 border rounded-xl font-quicksand text-sm ${
                        currentPage === page
                          ? "bg-primary text-white border-primary"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-2 md:px-3 py-1 border border-gray-300 rounded-xl font-quicksand text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

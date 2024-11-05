import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { ProfileFormData } from '../../schemas/profile.schema';
import { PencilIcon, TrashIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../../utils/date';
import { useState, useEffect } from 'react';
import { downloadProfilePDF } from '../../utils/pdf';
import { toast } from 'react-hot-toast';

interface ProfileTableProps {
  data: ProfileFormData[];
  onEdit: (profile: ProfileFormData) => void;
  onDelete: (profile: ProfileFormData) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const columnHelper = createColumnHelper<ProfileFormData>();

export const ProfileTable = ({ 
  data, 
  onEdit, 
  onDelete, 
  searchQuery,
  onSearchChange 
}: ProfileTableProps) => {
  const [globalFilter, setGlobalFilter] = useState(searchQuery);

  useEffect(() => {
    onSearchChange(globalFilter);
  }, [globalFilter, onSearchChange]);

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => (
        <span className="font-medium text-gray-900">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.accessor('contact', {
      header: 'Contact',
    }),
    columnHelper.accessor('education.degree', {
      header: 'Degree',
    }),
    columnHelper.accessor('expiryDate', {
      header: 'Expiry Date',
      cell: info => formatDate(info.getValue()),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(row.original)}
            className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
            title="Edit Profile"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={async () => {
              try {
                await downloadProfilePDF(row.original);
                toast.success('Profile downloaded successfully');
              } catch (error) {
                console.error('Download error:', error);
                toast.error('Failed to download profile');
              }
            }}
            className="text-green-600 hover:text-green-900 transition-colors duration-150"
            title="Download PDF"
          >
            <DocumentArrowDownIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(row.original)}
            className="text-red-600 hover:text-red-900 transition-colors duration-150"
            title="Delete Profile"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <input
          type="text"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search profiles..."
          className="px-4 py-2 border rounded-lg w-64"
        />
      </div>
      <div className="bg-background-secondary rounded-xl shadow-sm border border-foreground/10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-gray-50">
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-white border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-white border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <span className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
        </div>
      </div>
    </div>
  );
}; 
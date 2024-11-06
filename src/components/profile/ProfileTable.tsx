import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useState, useMemo, useEffect } from 'react';
import { ProfileFormData } from '../../schemas/profile.schema';
import { PencilIcon, TrashIcon, DocumentArrowDownIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../../utils/date';
import { toast } from 'react-hot-toast';
import { downloadProfilePDF } from '../../utils/pdf';
import { useAuth } from '../../context/AuthContext';

type SearchField = 'name' | 'email' | 'education.degree' | 'all';

interface ProfileTableProps {
  data: ProfileFormData[];
  onEdit: (profile: ProfileFormData) => void;
  onDelete: (profile: ProfileFormData) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const columnHelper = createColumnHelper<ProfileFormData>();

export const ProfileTable = ({ 
  data, 
  onEdit, 
  onDelete,
  searchQuery = '',
  onSearchChange = () => {}
}: ProfileTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchField, setSearchField] = useState<SearchField>('all');
  const [searchValue, setSearchValue] = useState(searchQuery);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    onSearchChange(searchValue);
  }, [searchValue, onSearchChange]);

  const filteredData = useMemo(() => {
    if (!searchValue) return data;
    
    const searchLower = searchValue.toLowerCase();
    return data.filter(profile => {
      switch (searchField) {
        case 'name':
          return profile.name.toLowerCase().includes(searchLower);
        case 'email':
          return profile.email.toLowerCase().includes(searchLower);
        case 'education.degree':
          return profile.education.degree.toLowerCase().includes(searchLower);
        case 'all':
          return (
            profile.name.toLowerCase().includes(searchLower) ||
            profile.email.toLowerCase().includes(searchLower) ||
            profile.education.degree.toLowerCase().includes(searchLower)
          );
        default:
          return true;
      }
    });
  }, [data, searchValue, searchField]);

  const columns = [
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <button
          className="flex items-center space-x-2 group"
          onClick={() => column.toggleSorting()}
        >
          <span>Name</span>
          <span className="flex flex-col">
            <ChevronUpIcon className={`h-3 w-3 ${column.getIsSorted() === 'asc' ? 'text-indigo-600' : 'text-gray-400'}`} />
            <ChevronDownIcon className={`h-3 w-3 -mt-1 ${column.getIsSorted() === 'desc' ? 'text-indigo-600' : 'text-gray-400'}`} />
          </span>
        </button>
      ),
    }),
    columnHelper.accessor('email', {
      header: ({ column }) => (
        <button
          className="flex items-center space-x-2 group"
          onClick={() => column.toggleSorting()}
        >
          <span>Email</span>
          <span className="flex flex-col">
            <ChevronUpIcon className={`h-3 w-3 ${column.getIsSorted() === 'asc' ? 'text-indigo-600' : 'text-gray-400'}`} />
            <ChevronDownIcon className={`h-3 w-3 -mt-1 ${column.getIsSorted() === 'desc' ? 'text-indigo-600' : 'text-gray-400'}`} />
          </span>
        </button>
      ),
    }),
    columnHelper.accessor('education.degree', {
      header: ({ column }) => (
        <button
          className="flex items-center space-x-2 group"
          onClick={() => column.toggleSorting()}
        >
          <span>Degree</span>
          <span className="flex flex-col">
            <ChevronUpIcon className={`h-3 w-3 ${column.getIsSorted() === 'asc' ? 'text-indigo-600' : 'text-gray-400'}`} />
            <ChevronDownIcon className={`h-3 w-3 -mt-1 ${column.getIsSorted() === 'desc' ? 'text-indigo-600' : 'text-gray-400'}`} />
          </span>
        </button>
      ),
    }),
    columnHelper.accessor('education.completionYear', {
      header: ({ column }) => (
        <button
          className="flex items-center space-x-2 group"
          onClick={() => column.toggleSorting()}
        >
          <span>Completion Year</span>
          <span className="flex flex-col">
            <ChevronUpIcon className={`h-3 w-3 ${column.getIsSorted() === 'asc' ? 'text-indigo-600' : 'text-gray-400'}`} />
            <ChevronDownIcon className={`h-3 w-3 -mt-1 ${column.getIsSorted() === 'desc' ? 'text-indigo-600' : 'text-gray-400'}`} />
          </span>
        </button>
      ),
    }),
    columnHelper.accessor('expiryDate', {
      header: ({ column }) => (
        <button
          className="flex items-center space-x-2 group"
          onClick={() => column.toggleSorting()}
        >
          <span>Expiry Date</span>
          <span className="flex flex-col">
            <ChevronUpIcon className={`h-3 w-3 ${column.getIsSorted() === 'asc' ? 'text-indigo-600' : 'text-gray-400'}`} />
            <ChevronDownIcon className={`h-3 w-3 -mt-1 ${column.getIsSorted() === 'desc' ? 'text-indigo-600' : 'text-gray-400'}`} />
          </span>
        </button>
      ),
      cell: info => formatDate(info.getValue()),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-3">
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(row.original)}
                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                title="Edit Profile"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(row.original)}
                className="text-red-600 hover:text-red-900 transition-colors duration-150"
                title="Delete Profile"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </>
          )}
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
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {filteredData.length} profiles
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative inline-block">
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value as SearchField)}
              className="appearance-none bg-white border border-gray-300 rounded-l-lg py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="all">All Fields</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="education.degree">Degree</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ChevronDownIcon className="h-4 w-4" />
            </div>
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Search ${searchField === 'all' ? 'profiles' : searchField}...`}
            className="px-4 py-2 border border-gray-300 rounded-r-lg w-64 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
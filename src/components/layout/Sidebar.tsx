import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`fixed left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className={`flex items-center ${isOpen ? 'justify-between p-6' : 'justify-center p-4'}`}>
          {isOpen && <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle Sidebar"
          >
            {isOpen ? (
              <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRightIcon className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        <nav className={`flex-1 ${isOpen ? 'px-4' : 'px-2'} space-y-2`}>
          {ROUTES.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`flex items-center ${
                isOpen ? 'px-4' : 'justify-center px-2'
              } py-3 rounded-lg transition-colors ${
                isActive(route.path)
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={!isOpen ? route.label : undefined}
            >
              <div className="w-5 h-5">{route.icon}</div>
              {isOpen && <span className="ml-3">{route.label}</span>}
            </Link>
          ))}
        </nav>

        <div className={`p-4 border-t border-gray-200 ${!isOpen && 'flex justify-center'}`}>
          <button
            onClick={logout}
            className={`flex items-center ${
              isOpen ? 'w-full px-4' : 'justify-center px-2'
            } py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors`}
            title={!isOpen ? 'Logout' : undefined}
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}; 
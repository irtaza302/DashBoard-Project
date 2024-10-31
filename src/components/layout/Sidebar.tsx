import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {ROUTES.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive(route.path)
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {route.icon}
              <span className="ml-3">{route.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 
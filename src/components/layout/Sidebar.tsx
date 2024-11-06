import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { LAYOUT_CONSTANTS } from '../../constants/layout.constants';
import { UI_CONSTANTS } from '../../constants/ui.constants';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  // Filter routes based on user role
  const filteredRoutes = ROUTES.filter(route => 
    !route.adminOnly || (route.adminOnly && user?.role === 'admin')
  );

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? LAYOUT_CONSTANTS.SIDEBAR.EXPANDED_WIDTH : LAYOUT_CONSTANTS.SIDEBAR.COLLAPSED_WIDTH }}
      className={`fixed left-0 h-screen bg-background-secondary border-r border-foreground/10 shadow-lg z-50 ${UI_CONSTANTS.TRANSITIONS.DEFAULT}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-foreground/10">
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: LAYOUT_CONSTANTS.SIDEBAR.ANIMATION.INITIAL_X }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: LAYOUT_CONSTANTS.SIDEBAR.ANIMATION.INITIAL_X }}
                className="text-xl font-bold text-foreground"
              >
                Gas App
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={onToggle}
            className={`p-2 rounded-lg hover:bg-background/80 text-foreground-secondary ${UI_CONSTANTS.TRANSITIONS.DEFAULT}`}
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {filteredRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              onMouseEnter={() => setIsHovered(route.path)}
              onMouseLeave={() => setIsHovered(null)}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 relative group ${
                !isOpen ? 'justify-center' : ''
              } ${
                isActive(route.path)
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-foreground-secondary hover:bg-background/80'
              }`}
            >
              <div className={`w-5 h-5 transition-transform duration-200 ${
                isHovered === route.path ? 'scale-110' : ''
              }`}>
                {route.icon}
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3 font-medium"
                  >
                    {route.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-foreground/10 p-4">
          <div className={`flex items-center ${!isOpen ? 'justify-center' : 'space-x-3'}`}>
            <UserCircleIcon className="w-8 h-8 text-foreground-secondary" />
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.email}
                  </p>
                  {user?.role && (
                    <p className="text-xs text-foreground-secondary capitalize">
                      {user.role}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={logout}
            className={`mt-4 w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ${
              !isOpen ? 'justify-center' : ''
            }`}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
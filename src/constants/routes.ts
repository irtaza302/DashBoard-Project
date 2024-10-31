import { HomeIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export const ROUTES = [
  {
    path: '/',
    label: 'Dashboard',
    icon: <HomeIcon className="w-5 h-5" />
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: <UserCircleIcon className="w-5 h-5" />
  }
]; 
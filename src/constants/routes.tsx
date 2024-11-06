import React from 'react';
import { HomeIcon, UserCircleIcon, InformationCircleIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { Route } from '../types/routes.types';

const createIcon = (Icon: React.ElementType) => (
  <Icon className="w-5 h-5" />
);

export const ROUTES: Route[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: createIcon(HomeIcon),
    adminOnly: false
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: createIcon(UserCircleIcon),
    adminOnly: false
  },
  {
    path: '/about',
    label: 'About',
    icon: createIcon(InformationCircleIcon),
    adminOnly: false
  },
  {
    path: '/account',
    label: 'User Management',
    icon: createIcon(UserPlusIcon),
    adminOnly: true
  }
]; 
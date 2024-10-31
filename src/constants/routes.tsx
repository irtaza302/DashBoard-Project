import React from 'react';
import { HomeIcon, UserCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Route } from '../types/routes.types';

const createIcon = (Icon: React.ElementType) => (
  <Icon className="w-5 h-5" />
);

export const ROUTES: Route[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: createIcon(HomeIcon)
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: createIcon(UserCircleIcon)
  },
  {
    path: '/about',
    label: 'About',
    icon: createIcon(InformationCircleIcon)
  }
]; 
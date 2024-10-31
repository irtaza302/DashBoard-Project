import { HomeIcon, UserCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export const ICONS = {
  Dashboard: () => <HomeIcon className="w-5 h-5" />,
  Profile: () => <UserCircleIcon className="w-5 h-5" />,
  About: () => <InformationCircleIcon className="w-5 h-5" />
} as const; 
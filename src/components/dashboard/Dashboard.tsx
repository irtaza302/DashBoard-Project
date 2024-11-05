import { useMemo } from 'react';
import { useGetProfilesQuery } from '../../store/api/profileApi';
import { StatCard } from './StatCard';
import { StatCardSkeleton } from './StatCardSkeleton';
import { ChartSkeleton } from './ChartSkeleton';
import { EducationTrends } from './EducationTrends';
import { ProfileTimeline } from './ProfileTimeline';
import { EducationMatrix } from './EducationMatrix';
import { ProfileStatistics } from './ProfileStatistics';
import { DegreeDistribution } from './DegreeDistribution';
import { UsersIcon, AcademicCapIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { ErrorBoundary } from '../common/ErrorBoundary';

const Dashboard = () => {
  const { data: profiles = [], isLoading, error } = useGetProfilesQuery();

  if (error) {
    return <div>Error loading profiles: {error.toString()}</div>;
  }

  const stats = useMemo(() => [
    {
      title: 'Total Profiles',
      value: profiles.length,
      icon: <UsersIcon className="w-6 h-6 text-indigo-600" />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Active Students',
      value: profiles.filter(p => new Date(p.expiryDate) > new Date()).length,
      icon: <AcademicCapIcon className="w-6 h-6 text-indigo-600" />,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Average Completion Year',
      value: Math.round(profiles.reduce((acc, p) => acc + p.education.completionYear, 0) / profiles.length) || 0,
      icon: <ClockIcon className="w-6 h-6 text-indigo-600" />
    },
    {
      title: 'Degree Types',
      value: new Set(profiles.map(p => p.education.degree)).size,
      icon: <ChartBarIcon className="w-6 h-6 text-indigo-600" />,
      trend: { value: 5, isPositive: true }
    }
  ], [profiles]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Profile Statistics</h2>
            <ProfileStatistics profiles={profiles} loading={isLoading} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Degree Distribution</h2>
            <DegreeDistribution profiles={profiles} loading={isLoading} />
          </div>
        </div>

        <EducationTrends profiles={profiles} loading={isLoading} />
        <EducationMatrix profiles={profiles} loading={isLoading} />
        <ProfileTimeline profiles={profiles} loading={isLoading} />
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
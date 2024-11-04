import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProfiles } from '../../store/slices/profileSlice';
import { StatCard } from './StatCard';
import { StatCardSkeleton } from './StatCardSkeleton';
import { ChartSkeleton } from './ChartSkeleton';
import { EducationTrends } from './EducationTrends';
import { ProfileTimeline } from './ProfileTimeline';
import { EducationMatrix } from './EducationMatrix';
import { ProfileStatistics } from './ProfileStatistics';
import { DegreeDistribution } from './DegreeDistribution';
import { UsersIcon, AcademicCapIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { profiles, loading } = useAppSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

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
      value: Math.round(profiles.reduce((acc, p) => acc + p.education.completionYear, 0) / profiles.length),
      icon: <ClockIcon className="w-6 h-6 text-indigo-600" />
    },
    {
      title: 'Degree Types',
      value: new Set(profiles.map(p => p.education.degree)).size,
      icon: <ChartBarIcon className="w-6 h-6 text-indigo-600" />,
      trend: { value: 5, isPositive: true }
    }
  ], [profiles]);

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>

        {/* Full Width Charts Skeleton */}
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Profile Statistics</h2>
          <ProfileStatistics profiles={profiles} loading={loading} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Degree Distribution</h2>
          <DegreeDistribution profiles={profiles} loading={loading} />
        </div>
      </div>

      {/* Full Width Charts */}
      <EducationTrends profiles={profiles} loading={loading} />
      <EducationMatrix profiles={profiles} loading={loading} />
      <ProfileTimeline profiles={profiles} loading={loading} />
    </div>
  );
};

export default Dashboard;
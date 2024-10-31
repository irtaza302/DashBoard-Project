import { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { format } from 'date-fns';
import { profileApi } from '../../services/api';
import { ProfileFormData } from '../../schemas/profile.schema';
import { COLORS } from '../../constants/colors';
import { UsersIcon, AcademicCapIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { StatCard } from './StatCard';
import { EducationTrends } from './EducationTrends';
import { ProfileTimeline } from './ProfileTimeline';

export const Dashboard = () => {
  const [profiles, setProfiles] = useState<ProfileFormData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await profileApi.getAll();
        setProfiles(data);
      } catch (error) {
        console.error('Failed to fetch profiles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const degreeDistribution = profiles.reduce((acc, profile) => {
    const degree = profile.education.degree;
    acc[degree] = (acc[degree] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(degreeDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const timelineData = profiles.map(profile => ({
    date: format(new Date(profile.expiryDate), 'MMM yyyy'),
    count: 1,
  }));

  const stats = [
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
  ];
  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
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
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profiles}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  domain={[
                    (dataMin: number) => Math.floor(dataMin - 1),
                    (dataMax: number) => Math.ceil(dataMax + 1)
                  ]}
                  ticks={Array.from(
                    { length: 10 },
                    (_, i) => {
                      const min = Math.min(...profiles.map(p => p.education.completionYear));
                      const max = Math.max(...profiles.map(p => p.education.completionYear));
                      const step = Math.ceil((max - min) / 8);
                      return min + (i * step);
                    }
                  )}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="education.completionYear" fill="#8884d8" name="Completion Year" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Degree Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Full Width Charts */}
      <EducationTrends profiles={profiles} />
      <ProfileTimeline profiles={profiles} />
    </div>
  );
}
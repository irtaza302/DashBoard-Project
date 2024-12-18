import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProfileFormData } from '../../schemas/profile.schema';
import { ChartSkeleton } from './ChartSkeleton';

interface Props {
  profiles: ProfileFormData[];
  loading?: boolean;
}

export const EducationTrends = ({ profiles, loading }: Props) => {
  if (loading) {
    return <ChartSkeleton />;
  }

  // Group profiles by completion year
  const yearlyData = profiles.reduce((acc, profile) => {
    const year = profile.education.completionYear;
    if (!acc[year]) {
      acc[year] = { year, count: 0 };
    }
    acc[year].count++;
    return acc;
  }, {} as Record<number, { year: number; count: number }>);

  // Convert to array and sort by year
  const chartData = Object.values(yearlyData).sort((a, b) => a.year - b.year);

  return (
    <div className="bg-background-secondary p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Graduation Trends</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
            <XAxis 
              dataKey="year" 
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => value.toString()}
              stroke="currentColor"
            />
            <YAxis stroke="currentColor" />
            <Tooltip 
              formatter={(value) => [value, 'Graduates']}
              labelFormatter={(label) => `Year: ${label}`}
              contentStyle={{ 
                backgroundColor: 'var(--background)',
                border: '1px solid var(--foreground-secondary)',
                color: 'var(--foreground)'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              name="Graduates"
              stroke="var(--primary-600)"
              strokeWidth={2}
              dot={{ r: 4, fill: 'var(--primary-600)' }}
              activeDot={{ r: 6, fill: 'var(--primary-700)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 
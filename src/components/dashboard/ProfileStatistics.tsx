import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ProfileFormData } from '../../schemas/profile.schema';
import { ChartSkeleton } from './ChartSkeleton';

interface Props {
  profiles: ProfileFormData[];
  loading?: boolean;
}

export const ProfileStatistics = ({ profiles, loading }: Props) => {
  if (loading) {
    return <ChartSkeleton />;
  }

  const yearlyStats = profiles.reduce((acc, profile) => {
    const year = profile.education.completionYear;
    if (!acc[year]) {
      acc[year] = { year, count: 0 };
    }
    acc[year].count++;
    return acc;
  }, {} as Record<number, { year: number; count: number }>);

  const data = Object.values(yearlyStats).sort((a, b) => a.year - b.year);

  const maxValue = Math.max(...data.map(item => item.count));
  const tickCount = 5; // Number of ticks we want to show
  const yAxisMax = Math.ceil(maxValue * 1.2); // Add 20% padding to the max value

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#E5E7EB"
          />
          <XAxis 
            dataKey="year"
            tickFormatter={(value) => value.toString()}
            fontSize={12}
            tickMargin={10}
            stroke="#6B7280"
          />
          <YAxis 
            tickCount={tickCount}
            domain={[0, yAxisMax]}
            fontSize={12}
            tickMargin={10}
            stroke="#6B7280"
            tickFormatter={(value) => value.toFixed(0)} // Remove decimal places
          />
          <Tooltip
            formatter={(value: number) => [`${value} Profiles`, 'Count']}
            labelFormatter={(label) => `Year: ${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              padding: '8px 12px',
            }}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          />
          <Bar 
            dataKey="count" 
            fill="#6366F1" // Indigo color
            radius={[4, 4, 0, 0]} // Rounded top corners
            maxBarSize={50} // Limit maximum bar width
          >
            {/* Add hover effect */}
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fillOpacity={0.9}
                className="hover:fill-opacity-100 transition-all duration-200"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}; 
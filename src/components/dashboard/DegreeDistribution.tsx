import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ProfileFormData } from '../../schemas/profile.schema';
import { COLORS } from '../../constants/colors';
import { ChartSkeleton } from './ChartSkeleton';

interface Props {
  profiles: ProfileFormData[];
  loading?: boolean;
}

export const DegreeDistribution = ({ profiles, loading }: Props) => {
  if (loading) {
    return <ChartSkeleton />;
  }
  // Count profiles by degree
  const degreeStats = profiles.reduce((acc, profile) => {
    const degree = profile.education.degree;
    if (!acc[degree]) {
      acc[degree] = { name: degree, value: 0 };
    }
    acc[degree].value++;
    return acc;
  }, {} as Record<string, { name: string; value: number }>);

  const data = Object.values(degreeStats);

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={(entry) => entry.name}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} Profiles`, 'Count']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}; 
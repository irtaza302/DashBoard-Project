import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProfileFormData } from '../../schemas/profile.schema';

export const EducationTrends = ({ profiles }: { profiles: ProfileFormData[] }) => {
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
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Graduation Trends</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => value.toString()}
            />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [value, 'Graduates']}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              name="Graduates"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 
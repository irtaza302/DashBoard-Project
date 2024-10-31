import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProfileFormData } from '../../schemas/profile.schema';
import { format, parseISO } from 'date-fns';

export const ProfileTimeline = ({ profiles }: { profiles: ProfileFormData[] }) => {
  // Sort profiles by expiry date and create cumulative data
  const timelineData = profiles
    .map(profile => ({
      date: new Date(profile.expiryDate),
      value: 1
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .reduce((acc, curr, index) => {
      acc.push({
        date: curr.date,
        active: index + 1 // Cumulative count
      });
      return acc;
    }, [] as { date: Date; active: number }[]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Active Profiles Timeline</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              tickFormatter={(date) => format(date, 'MMM yyyy')}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
              formatter={(value) => [`${value} Active Profiles`, 'Active']}
            />
            <Area
              type="monotone"
              dataKey="active"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 
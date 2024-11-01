import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';
import { ProfileFormData } from '../../schemas/profile.schema';
import { COLORS } from '../../constants/colors';

interface EducationMatrixProps {
  profiles: ProfileFormData[];
}

export const EducationMatrix = ({ profiles }: EducationMatrixProps) => {
  // Transform data for visualization
  const matrixData = profiles.map(profile => ({
    completionYear: profile.education.completionYear,
    degree: profile.education.degree,
    count: 1,
  }));

  // Get unique degrees for color mapping
  const uniqueDegrees = [...new Set(profiles.map(p => p.education.degree))];
  const degreeColorMap = Object.fromEntries(
    uniqueDegrees.map((degree, index) => [degree, COLORS[index % COLORS.length]])
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Education Distribution Matrix</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 70, left: 20 }}>
            <XAxis 
              dataKey="completionYear" 
              type="number"
              name="Completion Year"
              domain={['dataMin', 'dataMax']}
              label={{ 
                value: 'Completion Year', 
                position: 'bottom',
                offset: 40
              }}
            />
            <YAxis 
              dataKey="degree" 
              type="category"
              name="Degree"
              width={150}
              tick={(props) => (
                <text
                  {...props}
                  textAnchor="end"
                  transform={`rotate(-45 ${props.x} ${props.y})`}
                  dy={-2}
                  dx={-10}
                >
                  {props.payload.value}
                </text>
              )}
            />
            <ZAxis 
              dataKey="count" 
              range={[100, 500]} 
              name="Count"
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ payload }) => {
                if (!payload?.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 border border-gray-200 rounded-lg shadow">
                    <p className="font-medium">{data.degree}</p>
                    <p className="text-sm text-gray-600">Year: {data.completionYear}</p>
                  </div>
                );
              }}
            />
            <Scatter data={matrixData} shape="circle">
              {matrixData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={degreeColorMap[matrixData[index].degree]}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 
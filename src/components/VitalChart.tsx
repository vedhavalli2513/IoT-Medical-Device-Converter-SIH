import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface VitalData {
  time: string;
  value: number;
}

interface VitalChartProps {
  title: string;
  data: VitalData[];
  color: string;
  unit: string;
  currentValue?: number;
}

export function VitalChart({ title, data, color, unit, currentValue }: VitalChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {currentValue && (
            <div className="text-right">
              <div className="text-2xl" style={{ color }}>
                {currentValue}
              </div>
              <div className="text-sm text-muted-foreground">{unit}</div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                className="stroke-muted-foreground"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                className="stroke-muted-foreground"
              />
              <Tooltip 
                labelFormatter={(value) => `Time: ${value}`}
                formatter={(value) => [`${value} ${unit}`, title]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--card-foreground))'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: color, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
'use client';

import { GrowthData } from '@/services/kids.service';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

interface GrowthChartProps {
  growthData: GrowthData[];
}

export function GrowthChart({ growthData }: GrowthChartProps) {
  const [metric, setMetric] = useState<'height' | 'weight' | 'both'>('both');

  // Sort growth data by date
  const sortedData = [...growthData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Format data for chart
  const chartData = sortedData.map((data) => ({
    date: dayjs(data.date).format('DD/MM/YY'),
    height: data.height,
    weight: data.weight,
    fullDate: dayjs(data.date).format('DD/MM/YYYY'),
  }));

  const handleMetricChange = (_: React.MouseEvent<HTMLElement>, newMetric: 'height' | 'weight' | 'both' | null) => {
    if (newMetric !== null) {
      setMetric(newMetric);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup
          value={metric}
          exclusive
          onChange={handleMetricChange}
          aria-label="metric selection"
        >
          <ToggleButton value="height" aria-label="height">
            Chiều cao
          </ToggleButton>
          <ToggleButton value="weight" aria-label="weight">
            Cân nặng
          </ToggleButton>
          <ToggleButton value="both" aria-label="both">
            Cả hai
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          {(metric === 'height' || metric === 'both') && (
            <YAxis
              yAxisId="height"
              orientation="left"
              label={{ value: 'Chiều cao (cm)', angle: -90, position: 'insideLeft' }}
            />
          )}
          {(metric === 'weight' || metric === 'both') && (
            <YAxis
              yAxisId="weight"
              orientation="right"
              label={{ value: 'Cân nặng (kg)', angle: 90, position: 'insideRight' }}
            />
          )}
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      {payload[0].payload.fullDate}
                    </Typography>
                    {payload.map((entry: any, index: number) => (
                      <Typography key={index} variant="body2" sx={{ color: entry.color }}>
                        {entry.name === 'height' ? 'Chiều cao' : 'Cân nặng'}: {entry.value}{' '}
                        {entry.name === 'height' ? 'cm' : 'kg'}
                      </Typography>
                    ))}
                  </Box>
                );
              }
              return null;
            }}
          />
          <Legend
            formatter={(value) => (value === 'height' ? 'Chiều cao (cm)' : 'Cân nặng (kg)')}
          />
          {(metric === 'height' || metric === 'both') && (
            <Line
              yAxisId="height"
              type="monotone"
              dataKey="height"
              stroke="#2196f3"
              strokeWidth={2}
              dot={{ fill: '#2196f3', r: 4 }}
              activeDot={{ r: 6 }}
            />
          )}
          {(metric === 'weight' || metric === 'both') && (
            <Line
              yAxisId="weight"
              type="monotone"
              dataKey="weight"
              stroke="#4caf50"
              strokeWidth={2}
              dot={{ fill: '#4caf50', r: 4 }}
              activeDot={{ r: 6 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

import {
    Area,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { StatsPoint } from '~/utils/group-stats-by-week.ts';

type StatsChartProps = {
    statsData: StatsPoint[];
    chartType?: 'bookmarks' | 'likes';
};

export const StatsChart = ({ statsData, chartType = 'bookmarks' }: StatsChartProps) => {
    const lineColor = chartType === 'likes' ? '#8C54FF' : '#2DB100';
    const showGradient = chartType === 'likes';
    const gradientId = `gradient-${lineColor.replace('#', '')}`;

    return (
        <ResponsiveContainer height={300}>
            <ComposedChart data={statsData}>
                <defs>
                    {showGradient && (
                        <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='0%' stopColor='#8C54FF' stopOpacity={0.3} />
                            <stop offset='100%' stopColor='#8C54FF' stopOpacity={0} />
                        </linearGradient>
                    )}
                </defs>

                <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
                <XAxis
                    dataKey='date'
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fontSize: 14,
                        fill: '#000000',
                        dx: 15,
                        dy: 7,
                    }}
                />
                <YAxis
                    ticks={[0, 20, 40, 60, 80, 100, 120]}
                    domain={[0, 'auto']}
                    interval={0}
                    tick={{
                        fontSize: 14,
                        fill: '#000000',
                        dy: 10,
                    }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip />

                {showGradient && (
                    <Area
                        type='monotone'
                        dataKey='count'
                        fill={`url(#${gradientId})`}
                        stroke='none'
                        activeDot={false}
                        isAnimationActive={false}
                    />
                )}

                <Line
                    type='monotone'
                    dataKey='count'
                    stroke={lineColor}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

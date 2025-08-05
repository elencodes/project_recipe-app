import 'dayjs/locale/ru';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(localeData);

export type StatsPoint = {
    date: string;
    count: number;
};

export function groupStatsByWeek(stats: StatsPoint[]): StatsPoint[] {
    if (!stats.length) return [];

    const sortedStats = [...stats].sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());

    const grouped = new Map<string, number>();

    for (const { date, count } of sortedStats) {
        const weekStart = dayjs(date).startOf('isoWeek');
        const label = weekStart.format('MMM D');
        grouped.set(label, (grouped.get(label) ?? 0) + count);
    }

    const firstDate = dayjs(sortedStats[0].date).startOf('isoWeek');
    const lastDate = dayjs(sortedStats[sortedStats.length - 1].date).startOf('isoWeek');

    const result: StatsPoint[] = [];
    let cursor = firstDate;

    while (cursor.isBefore(lastDate.add(1, 'week'))) {
        const label = cursor.format('MMM D');
        result.push({
            date: label,
            count: grouped.get(label) ?? 0,
        });
        cursor = cursor.add(1, 'week');
    }

    return result;
}

export const weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
function minute(value: string): number {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value.trim()))
    throw new Error('Usá horarios con formato HH:MM, por ejemplo 09:00-18:00.');
  const [h, m] = value.trim().split(':').map(Number);
  return h * 60 + m;
}
export function parseSchedules(days: string[]) {
  return days.flatMap((text, day) =>
    text.trim()
      ? text.split(',').map((interval) => {
          const parts = interval.trim().split('-');
          if (parts.length !== 2)
            throw new Error(`Revisá los horarios del ${weekdays[day].toLowerCase()}.`);
          const opensMinute = minute(parts[0]);
          let closesMinute = minute(parts[1]);
          if (closesMinute <= opensMinute) closesMinute += 1440;
          return { weekday: day + 1, opensMinute, closesMinute };
        })
      : []
  );
}
export function scheduleText(
  schedules: { weekday: number; opensMinute: number; closesMinute: number }[]
) {
  const time = (m: number) =>
    `${Math.floor((m % 1440) / 60)
      .toString()
      .padStart(2, '0')}:${(m % 60).toString().padStart(2, '0')}`;
  return weekdays.map((_, i) =>
    schedules
      .filter((s) => s.weekday === i + 1)
      .sort((a, b) => a.opensMinute - b.opensMinute)
      .map((s) => `${time(s.opensMinute)}-${time(s.closesMinute)}`)
      .join(', ')
  );
}
export const scheduleGroups = [
  { label: 'Lunes a viernes', days: [0, 1, 2, 3, 4] },
  { label: 'Sábado', days: [5] },
  { label: 'Domingo', days: [6] },
];
export type ScheduleRange = { opens: string; closes: string };
// Returns null when the days cannot be shown as one range per group (split shifts or weekdays that differ).
export function groupScheduleText(days: string[]): ScheduleRange[] | null {
  const ranges = scheduleGroups.map(({ days: group }) => {
    const text = days[group[0]] ?? '';
    if (text.includes(',') || group.some((day) => (days[day] ?? '') !== text)) return null;
    const [opens = '', closes = ''] = text ? text.split('-').map((part) => part.trim()) : [];
    return { opens, closes };
  });
  return ranges.every((range) => range !== null) ? ranges : null;
}
function rangeText({ opens, closes }: ScheduleRange) {
  return opens.trim() || closes.trim() ? `${opens.trim()}-${closes.trim()}` : '';
}
export function groupedDays(ranges: ScheduleRange[], strict = true): string[] {
  if (strict)
    scheduleGroups.forEach(({ label }, i) => {
      if (!ranges[i].opens.trim() !== !ranges[i].closes.trim())
        throw new Error(`Completá la apertura y el cierre de ${label.toLowerCase()}.`);
    });
  return weekdays.map((_, day) =>
    rangeText(ranges[scheduleGroups.findIndex(({ days }) => days.includes(day))])
  );
}
export function formatTimeInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}:${digits.slice(2)}` : digits;
}

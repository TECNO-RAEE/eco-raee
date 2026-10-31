import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  formatTimeInput,
  groupScheduleText,
  groupedDays,
  parseSchedules,
  scheduleText,
} from '../src/models/PointSchedule.ts';

test('horario cortado, día cerrado y cierre al día siguiente', () => {
  const parsed = parseSchedules(['09:00-13:00, 15:00-19:00', '', '22:00-02:00']);
  assert.deepEqual(parsed, [
    { weekday: 1, opensMinute: 540, closesMinute: 780 },
    { weekday: 1, opensMinute: 900, closesMinute: 1140 },
    { weekday: 3, opensMinute: 1320, closesMinute: 1560 },
  ]);
  assert.equal(scheduleText(parsed)[2], '22:00-02:00');
});
test('rechaza horas y separadores inválidos', () => {
  for (const value of ['24:00-25:00', '09:60-10:00', '9:00-18:00', '09:00', '09:00-12:00-13:00'])
    assert.throws(() => parseSchedules([value]));
});
test('agrupa lunes a viernes, sábado y domingo cuando los horarios coinciden', () => {
  const days = [
    '09:00-18:00',
    '09:00-18:00',
    '09:00-18:00',
    '09:00-18:00',
    '09:00-18:00',
    '10:00-13:00',
    '',
  ];
  const ranges = groupScheduleText(days);
  assert.deepEqual(ranges, [
    { opens: '09:00', closes: '18:00' },
    { opens: '10:00', closes: '13:00' },
    { opens: '', closes: '' },
  ]);
  assert.deepEqual(groupedDays(ranges), days);
});
test('no agrupa horarios cortados ni días hábiles distintos', () => {
  assert.equal(groupScheduleText(['09:00-13:00, 15:00-19:00', '', '', '', '', '', '']), null);
  assert.equal(groupScheduleText(['09:00-18:00', '', '', '', '', '', '']), null);
});
test('exige apertura y cierre en cada grupo', () => {
  const ranges = [
    { opens: '09:00', closes: '' },
    { opens: '', closes: '' },
    { opens: '', closes: '' },
  ];
  assert.throws(() => groupedDays(ranges), /lunes a viernes/);
  assert.equal(groupedDays(ranges, false)[0], '09:00-');
});
test('formatea la hora mientras se escribe', () => {
  assert.equal(formatTimeInput('0'), '0');
  assert.equal(formatTimeInput('09'), '09');
  assert.equal(formatTimeInput('093'), '09:3');
  assert.equal(formatTimeInput('09:30x5'), '09:30');
});

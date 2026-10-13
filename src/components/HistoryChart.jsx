import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { getPastDays, formatDateLabel } from '../utils/dateHelper';

export default function HistoryChart({ dailyCompletions = {}, allHabits = [], language = 'fi', t }) {
  const [viewMode, setViewMode] = useState('chart'); // 'chart' | 'table'

  const habitsMap = useMemo(() => {
    const map = new Map();
    allHabits.forEach(h => map.set(h.id, h));
    return map;
  }, [allHabits]);

  const chartData = useMemo(() => {
    const past7Days = getPastDays(7);
    return past7Days.map(dateStr => {
      const completedIds = Array.isArray(dailyCompletions[dateStr]) ? dailyCompletions[dateStr] : [];
      const totalCo2 = completedIds.reduce((sum, id) => {
        const habit = habitsMap.get(id);
        return sum + (habit ? Number(habit.co2Saved || 0) : 0);
      }, 0);

      return {
        dateStr,
        name: formatDateLabel(dateStr, language),
        count: completedIds.length,
        co2: Math.round(totalCo2 * 10) / 10
      };
    });
  }, [dailyCompletions, habitsMap, language]);

  const totalCompletionsInPeriod = useMemo(() => {
    return chartData.reduce((acc, d) => acc + d.count, 0);
  }, [chartData]);

  return (
    <section className="chart-section card-box" aria-labelledby="chart-heading">
      <div className="section-header-row">
        <div>
          <h2 id="chart-heading" className="section-title">
            📊 {t.chartSectionTitle}
          </h2>
          <p className="section-subtitle">{t.chartSectionSubtitle}</p>
        </div>

        <div className="chart-view-toggle-wrap">
          <button
            type="button"
            className={`action-btn ${viewMode === 'chart' ? 'secondary-btn' : 'text-btn'}`}
            onClick={() => setViewMode('chart')}
            aria-pressed={viewMode === 'chart'}
          >
            📈 {t.chartViewToggleVisual}
          </button>
          <button
            type="button"
            className={`action-btn ${viewMode === 'table' ? 'secondary-btn' : 'text-btn'}`}
            onClick={() => setViewMode('table')}
            aria-pressed={viewMode === 'table'}
          >
            📋 {t.chartViewToggleTable}
          </button>
        </div>
      </div>

      {viewMode === 'chart' ? (
        <div className="chart-container" style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: -10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 13, fill: 'var(--text-secondary)' }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 13, fill: 'var(--text-secondary)' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--card-shadow)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar
                dataKey="count"
                name={t.chartLegendCount}
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="co2"
                name={t.chartLegendCo2}
                fill="#0284c7"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="accessible-table-wrapper">
          <table className="accessible-data-table" aria-label={t.chartAccessibleSummary}>
            <caption className="sr-only">{t.chartAccessibleSummary}</caption>
            <thead>
              <tr>
                <th scope="col">{t.tableColDate}</th>
                <th scope="col">{t.tableColCompleted}</th>
                <th scope="col">{t.tableColCo2}</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map(row => (
                <tr key={row.dateStr}>
                  <td>{row.name} ({row.dateStr})</td>
                  <td><strong>{row.count}</strong> {t.daysUnit}</td>
                  <td>{row.co2.toFixed(1)} {t.kgUnit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalCompletionsInPeriod === 0 && (
        <p className="chart-empty-notice">ℹ️ {t.chartNoDataNotice}</p>
      )}
    </section>
  );
}

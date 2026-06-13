import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getMetrics } from '../services/metricsService';


const STYLES = `
  :root {
    --bg-page:      #f5f7fa;
    --bg-card:      #ffffff;
    --bg-error:     #fed7d7;
    --text-main:    #1a202c;
    --text-muted:   #6b7280;
    --text-error:   #c53030;
    --border:       #e2e8f0;
    --chart-grid:   #e2e8f0;
    --chart-tick:   #6b7280;
    --chart-bar:    #4299e1;
    --shadow:       0 4px 12px rgba(0,0,0,0.08);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg-page:    #0f172a;
      --bg-card:    #1e293b;
      --bg-error:   #451a1a;
      --text-main:  #f1f5f9;
      --text-muted: #94a3b8;
      --text-error: #fc8181;
      --border:     #334155;
      --chart-grid: #334155;
      --chart-tick: #94a3b8;
      --chart-bar:  #60a5fa;
      --shadow:     0 4px 12px rgba(0,0,0,0.4);
    }
  }

  body {
    background: var(--bg-page);
    color: var(--text-main);
  }
`;

function injectStyles() {
  if (!document.getElementById('dashboard-theme')) {
    const tag = document.createElement('style');
    tag.id = 'dashboard-theme';
    tag.textContent = STYLES;
    document.head.appendChild(tag);
  }
}

const METRIC_LABELS = {
  commits:     'Commits',
  bugs:        'Bugs Resueltos',
  tasks:       'Tareas',
  storyPoints: 'Story Points',
};
const formatMetricLabel = (metric) => METRIC_LABELS[metric] || metric;

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:   'var(--bg-card)',
      border:       '1px solid var(--border)',
      borderRadius: '8px',
      padding:      '10px 14px',
      color:        'var(--text-main)',
      boxShadow:    'var(--shadow)',
    }}>
      <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
      <p style={{ margin: '4px 0 0', color: 'var(--chart-bar)' }}>
        {payload[0].name}: <strong>{payload[0].value}</strong>
      </p>
    </div>
  );
}

function Dashboard({ selectedMetric = 'commits' }) {
  injectStyles();

  const [metricsData, setMetricsData] = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMetrics(selectedMetric);
        setMetricsData(data);
      } catch (err) {
        setError('No se pudieron cargar las métricas. Verifica que el backend esté corriendo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedMetric]);

  const total    = metricsData.reduce((sum, item) => sum + item.value, 0);
  const promedio = metricsData.length > 0
    ? parseFloat((total / metricsData.length).toFixed(1)) : 0;
  const maximo   = metricsData.length > 0
    ? Math.max(...metricsData.map(x => x.value)) : 0;

  const chartData = metricsData.map(item => ({
    name:  item.label,
    value: item.value,
  }));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', padding: '30px' }}>

      {error && (
        <div style={{
          background:   'var(--bg-error)',
          color:        'var(--text-error)',
          padding:      '12px 16px',
          borderRadius: '6px',
          marginBottom: '16px',
          fontWeight:   500,
          border:       '1px solid var(--text-error)',
        }}>
          {error}
        </div>
      )}

      <h1 style={{ color: 'var(--text-main)', marginBottom: '24px' }}>
        Dashboard de Métricas
      </h1>

      {/* Tarjetas de resumen */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap:                 '20px',
        marginBottom:        '25px',
      }}>
        <MetricCard
          title={`Total de ${formatMetricLabel(selectedMetric)} en el período`}
          value={loading ? '…' : total}
        />
        <MetricCard
          title={`Promedio diario de ${formatMetricLabel(selectedMetric)}`}
          value={loading ? '…' : promedio}
        />
        <MetricCard
          title={`Máximo de ${formatMetricLabel(selectedMetric)}`}
          value={loading ? '…' : maximo}
        />
      </div>

      {/* Gráfica */}
      <div style={{
        background:   'var(--bg-card)',
        padding:      '25px',
        borderRadius: '16px',
        boxShadow:    'var(--shadow)',
        border:       '1px solid var(--border)',
      }}>
        <h2 style={{ color: 'var(--text-main)', marginTop: 0 }}>
          {formatMetricLabel(selectedMetric)} — Mayo 2026
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            Cargando datos…
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--chart-grid)"
              />
              <XAxis
                dataKey="name"
                tick={{ fill: 'var(--chart-tick)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={{ stroke: 'var(--border)' }}
              />
              <YAxis
                tick={{ fill: 'var(--chart-tick)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={{ stroke: 'var(--border)' }}
                label={{
                  value:    'Cantidad',
                  angle:    -90,
                  position: 'insideLeft',
                  fill:     'var(--text-muted)',
                  fontSize: 12,
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ color: 'var(--text-muted)', fontSize: 13 }}
              />
              <Bar
                dataKey="value"
                name={formatMetricLabel(selectedMetric)}
                fill="var(--chart-bar)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div style={{
      background:   'var(--bg-card)',
      padding:      '20px',
      borderRadius: '16px',
      boxShadow:    'var(--shadow)',
      border:       '1px solid var(--border)',
    }}>
      <h4 style={{ color: 'var(--text-muted)', marginBottom: '10px', marginTop: 0 }}>
        {title}
      </h4>
      <h2 style={{ color: 'var(--text-main)', margin: 0 }}>{value}</h2>
    </div>
  );
}

export default Dashboard;
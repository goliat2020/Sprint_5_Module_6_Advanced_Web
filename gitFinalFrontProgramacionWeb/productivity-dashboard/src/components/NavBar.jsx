import React from 'react';

const METRICS = [
  { key: 'commits',     label: 'Commits' },
  { key: 'bugs',        label: 'Bugs Resueltos' },
  { key: 'tasks',       label: 'Tareas' },
  { key: 'storyPoints', label: 'Story Points' },
];

const NavBar = ({ selected, onSelect }) => {
  return (
    <nav style={{
      display: 'flex',
      gap: '8px',
      padding: '12px 24px',
      background: '#2d3748',
      flexWrap: 'wrap'
    }}>
      <span style={{ color: '#a0aec0', fontWeight: 600, marginRight: '8px', alignSelf: 'center' }}>
        Dev Metrics
      </span>
      {METRICS.map(m => (
        <button
          key={m.key}
          onClick={() => onSelect(m.key)}
          style={{
            padding: '6px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: selected === m.key ? 700 : 400,
            background: selected === m.key ? '#4299e1' : '#4a5568',
            color: '#fff',
            transition: 'background 0.2s'
          }}
        >
          {m.label}
        </button>
      ))}
    </nav>
  );
};

export default NavBar;
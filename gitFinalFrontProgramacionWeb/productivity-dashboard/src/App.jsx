import { useState } from 'react';

import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';


function App() {
  const [selectedMetric, setSelectedMetric] = useState('commits');

  return (
    <>
      <NavBar selected={selectedMetric} onSelect={setSelectedMetric} />
      <Dashboard selectedMetric={selectedMetric} onMetricChange={setSelectedMetric} />
    </>
  );
}

export default App;
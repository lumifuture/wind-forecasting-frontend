// src/pages/system/SystemMonitoringPage.tsx

import { useState, useEffect } from 'react';

const SystemMonitoringPage = () => {
  const [data, setData] = useState({
    cpu: 0,
    memory: 0,
    gpu: 0,
    responseTime: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        cpu: Math.floor(Math.random() * 10) + 70, // Simulating high load
        memory: Math.floor(Math.random() * 10) + 80, // Simulating high load
        gpu: Math.floor(Math.random() * 20) + 60, // Simulating high load
        responseTime: Math.floor(Math.random() * 50) + 100, // Simulating response time in ms
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, unit, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex-1 min-w-[200px]">
      <h3 className="text-md font-semibold text-gray-500 mb-4">{title}</h3>
      <div className="text-4xl font-bold text-gray-900 mb-2">
        {value}
        <span className="text-lg text-gray-500 ml-1">{unit}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${value}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">System Load Monitoring</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="CPU Utilization" value={data.cpu} unit="%" color="#4f46e5" />
        <StatCard title="Memory Utilization" value={data.memory} unit="%" color="#10b981" />
        <StatCard title="GPU Utilization" value={data.gpu} unit="%" color="#f59e0b" />
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center">
          <h3 className="text-md font-semibold text-gray-500 mb-4">Service Response Time</h3>
          <p className="text-4xl font-bold text-gray-900">
            {data.responseTime}
            <span className="text-lg text-gray-500 ml-1">ms</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoringPage;
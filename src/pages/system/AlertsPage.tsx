// src/pages/system/AlertsPage.tsx

import { AlertCircle } from 'lucide-react';

const AlertsPage = () => {
  const alerts = [
    { timestamp: '2023-10-27 10:15:20', type: 'Prediction Anomaly', message: 'Prediction error threshold exceeded on "Sales_Forecast_Model".' },
    { timestamp: '2023-10-27 09:45:00', type: 'Model Failure', message: 'Model training failed for "Customer_Segmentation_Model".' },
    { timestamp: '2023-10-27 08:00:00', type: 'System', message: 'Disk space on server-prod-01 is below 10%.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-red-200 flex items-start space-x-4">
            <div className="flex-shrink-0">
              <AlertCircle size={24} className="text-red-500 mt-1" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{alert.type}</p>
              <p className="text-sm text-gray-600">{alert.message}</p>
              <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default AlertsPage;

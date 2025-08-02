// src/pages/system/AuditLogsPage.tsx


const AuditLogsPage = () => {
  const auditLogs = [
    { timestamp: '2023-10-27 09:35:10', user: 'alice@example.com', operation: 'Model Deletion', details: 'Deleted "Churn_Prediction_Model_v2.0"' },
    { timestamp: '2023-10-27 09:32:45', user: 'bob@example.com', operation: 'Data Export', details: 'Exported "Customer_Data_Q3.csv"' },
    { timestamp: '2023-10-27 09:31:00', user: 'alice@example.com', operation: 'Permission Change', details: 'Updated permissions for user "charlie@example.com"' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Audit Logs</h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Operation</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {auditLogs.map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.operation}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogsPage;
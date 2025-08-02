// src/pages/system/ReportsPage.tsx

import { Download, RefreshCcw } from 'lucide-react';

const ReportsPage = () => {
  const reports = [
    { name: 'Weekly Health Report - Oct 20', date: '2023-10-20', status: 'Completed' },
    { name: 'Daily Health Report - Oct 27', date: '2023-10-27', status: 'Completed' },
    { name: 'Weekly Health Report - Oct 27', date: '2023-10-27', status: 'Pending' },
  ];

  const handleGenerateReport = () => {
    // This is a placeholder for generating a report
    console.log("Generating new report...");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">Health Reports</h2>
        <button
          onClick={handleGenerateReport}
          className="bg-indigo-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <RefreshCcw size={18} />
          Generate Report
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Report Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400" disabled={report.status !== 'Completed'}>
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
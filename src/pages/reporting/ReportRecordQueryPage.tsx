import React, { useState } from 'react';
import {
  FileText,
  Filter,
  Search,
  Download,
  Repeat,
  Upload,
} from 'lucide-react';
import useReportingStore from "../../store/reportingStore";
import ReportRecord from "../../store/reportingStore";
import { cn } from '@/lib/utils';
import Modal from '../../components/Modal'


const ReportRecordQueryPage = () => {
  const { records, reuploadReport } = useReportingStore();
  const [filters, setFilters] = useState({
    type: 'All',
    status: 'All',
    method: 'All',
    startDate: '',
    endDate: '',
  });

  const [isReuploadModalOpen, setIsReuploadModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<typeof ReportRecord | null>(null);
  const [manualReuploadData, setManualReuploadData] = useState({
    comment: '',
    newFilename: '',
  });

  const reportTypes = ['All', 'Short-term Power Forecast', 'Ultra-short-term Power Forecast', 'Meteorological Data', 'Standalone File', 'Numerical Weather Forecast'];
  const reportStatuses = ['All', 'Success', 'Failed'];
  const reportMethods = ['All', 'Automatic', 'Manual'];

  const filteredRecords = records.filter((record: typeof ReportRecord) => {
    const matchesType = filters.type === 'All' || record.type === filters.type;
    const matchesStatus = filters.status === 'All' || record.status === filters.status;
    const matchesMethod = filters.method === 'All' || record.method === filters.method;
    const matchesDate = (!filters.startDate || record.timestamp >= filters.startDate) &&
                        (!filters.endDate || record.timestamp <= filters.endDate);
    return matchesType && matchesStatus && matchesMethod && matchesDate;
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleQuery = () => {
    // In a real app, this would trigger an API call to fetch data based on the filters.
    // Here, we just re-render the filtered list.
    console.log('Applying filters:', filters);
  };

  const handleExport = () => {
    console.log('Exporting filtered data:', filteredRecords);
    alert('Exporting filtered data (simulated). Check console for details.');
  };

  const openReuploadModal = (record: typeof ReportRecord) => {
    setSelectedRecord(record);
    setIsReuploadModalOpen(true);
  };

  const closeReuploadModal = () => {
    setIsReuploadModalOpen(false);
    setSelectedRecord(null);
    setManualReuploadData({ comment: '', newFilename: '' });
  };

  const handleManualReuploadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setManualReuploadData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmReupload = () => {
    if (selectedRecord) {
      reuploadReport(selectedRecord.id, manualReuploadData);
      closeReuploadModal();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4 flex items-center space-x-2">
        <FileText className="w-8 h-8" />
        <span>Report Record Query</span>
      </h1>
      <p className="text-gray-700 mb-6">
        Query, download, and manage historical report records. Re-upload failed reports to ensure data delivery.
      </p>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span>Filter Records</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div>
            <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">Message Type</label>
            <select
              id="report-type"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="report-result" className="block text-sm font-medium text-gray-700">Report Result</label>
            <select
              id="report-result"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {reportStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="report-method" className="block text-sm font-medium text-gray-700">Report Method</label>
            <select
              id="report-method"
              name="method"
              value={filters.method}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {reportMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2 flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input type="date" id="start-date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
            <div className="w-1/2">
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
              <input type="date" id="end-date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleQuery}
              className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Query</span>
            </button>
            <button
              onClick={handleExport}
              className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Records Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Query Results</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record: typeof ReportRecord) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.filename}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={cn("px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      record.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    )}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => console.log(`Downloading ${record.filename}`)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {record.status === 'Failed' && (
                        <button
                          onClick={() => openReuploadModal(record)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Re-upload"
                        >
                          <Repeat className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Re-upload Modal */}
      <Modal
        title="Manual Report Re-upload"
        isOpen={isReuploadModalOpen}
        onClose={closeReuploadModal}
      >
        <p className="mb-4 text-gray-700">
          Re-uploading report: <span className="font-semibold text-blue-600">{selectedRecord?.filename}</span>
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="new-filename" className="block text-sm font-medium text-gray-700">
              New Filename (Optional)
            </label>
            <input
              type="text"
              id="new-filename"
              name="newFilename"
              value={manualReuploadData.newFilename}
              onChange={handleManualReuploadChange}
              placeholder={selectedRecord?.filename}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
              Comments (Optional)
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={3}
              value={manualReuploadData.comment}
              onChange={handleManualReuploadChange}
              placeholder="e.g., 'Re-uploaded after fixing data integrity error.'"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={closeReuploadModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmReupload}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Confirm Upload</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReportRecordQueryPage;
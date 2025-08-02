import React, { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Sliders
} from 'lucide-react';
import useReportingStore from "../../store/reportingStore";

const ReportingSettingsPage = () => {
  const { settings, updateSettings } = useReportingStore();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalSettings((prev: any) => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    // In a real app, you would send this to a backend API
    console.log('Reporting settings saved:', localSettings);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4 flex items-center space-x-2">
        <Sliders className="w-8 h-8" />
        <span>Reporting Settings</span>
      </h1>
      <p className="text-gray-700 mb-6">
        Configure connection parameters to ensure stable and reliable data reporting to the power grid.
      </p>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-md max-w-xl">
        <div className="space-y-6">
          <div>
            <label htmlFor="retries" className="block text-sm font-medium text-gray-700">
              Number of reporting server connection retries
            </label>
            <input
              type="number"
              id="retries"
              name="retries"
              value={localSettings.retries}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">Default is 3 retries.</p>
          </div>
          <div>
            <label htmlFor="timeout" className="block text-sm font-medium text-gray-700">
              Timeout for a single reporting server connection (seconds)
            </label>
            <input
              type="number"
              id="timeout"
              name="timeout"
              value={localSettings.timeout}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">Default is 5 seconds. Total transmission time should not exceed 1 minute.</p>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Save Settings
          </button>
        </div>
      </form>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Reporting Rate Monitoring (Mock Data)
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span>Ultra-short-term reporting rate</span>
            <span className="font-bold text-green-600">99.8%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Short-term reporting rate</span>
            <span className="font-bold text-green-600">99.5%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Meteorological data reporting rate</span>
            <span className="font-bold text-green-600">99.9%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Theoretical power reporting rate</span>
            <span className="font-bold text-green-600">99.6%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Standalone file reporting rate</span>
            <span className="font-bold text-green-600">99.0%</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          *Reporting rates can be queried within a selectable time range (feature not implemented in this mock).
        </p>
      </div>
    </div>
  );
};

export default ReportingSettingsPage;
import {
  Zap,
  ListChecks,
} from 'lucide-react';


const DataReportingPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-blue-800 mb-4">Data Reporting to Power Grid Agency (WPFS)</h1>
    <p className="text-gray-700 mb-6">
      This page outlines the data reporting requirements and standards (GB/T 406) for communicating with the power grid management agency. The system automatically generates and uploads these files to ensure compliance and timely delivery.
    </p>

    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
        <Zap className="w-6 h-6 text-yellow-500" />
        <span>Forecast Data Reporting</span>
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Long-Term Energy Forecast</h3>
          <p className="text-sm text-gray-600">
            **Details:** Next 1 to 12 months, with a monthly resolution.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">Medium-Term Power Forecast</h3>
          <p className="text-sm text-gray-600">
            **Details:** Next 240 hours, starting from 00:00 the next day, with a 15-minute resolution.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">Short-Term Power Forecast</h3>
          <p className="text-sm text-gray-600">
            **Details:** Next 72 hours, starting from 00:00 the next day, with a 15-minute resolution.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">Ultra-Short-Term Power Forecast</h3>
          <p className="text-sm text-gray-600">
            **Details:** Next 15 minutes to 4 hours, with a 15-minute resolution.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">Probabilistic Forecast</h3>
          <p className="text-sm text-gray-600">
            **Details:** Consistent duration and resolution with medium-term, short-term, and ultra-short-term forecasts.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
        <ListChecks className="w-6 h-6 text-green-500" />
        <span>Real-time Data & Status Reporting</span>
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Wind Farm Operating Capacity</h3>
          <p className="text-sm text-gray-600">
            **Details:** Estimated operating capacity reported for the same periods and resolutions as forecast data.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">Wind Turbine Operating Status</h3>
          <p className="text-sm text-gray-600">
            **Details:** Uploaded in real-time with a time resolution of no less than 15 minutes.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">Wind Tower Data</h3>
          <p className="text-sm text-gray-600">
            **Details:** Uploaded in real-time with a time resolution of no less than 5 minutes.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default DataReportingPage;
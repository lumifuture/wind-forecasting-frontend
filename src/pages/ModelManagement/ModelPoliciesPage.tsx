import { useState } from 'react';
import { Calendar, Target, Database } from 'lucide-react';

const ModelPoliciesPage = () => {
  // State variables for policy settings
  const [trainingCycle, setTrainingCycle] = useState('Weekly');
  const [accuracyTarget, setAccuracyTarget] = useState('90%');
  const [trainingDataWindow, setTrainingDataWindow] = useState('Last 3 Months');

  // Function to simulate saving the policy settings
  const saveSettings = () => {
    console.log('Saving Tenant Policies:', {
      trainingCycle,
      accuracyTarget,
      trainingDataWindow,
    });
    // In a real app, this would send data to a backend API
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Tenant Policies</h2>
      <p className="text-gray-600 mb-8">
        Configure unique model training strategies for your tenant, such as customizing the training cycle, setting a prediction accuracy target, and selecting a training data time window.
      </p>

      <div className="space-y-6">
        {/* Training Cycle Setting */}
        <div>
          <label htmlFor="trainingCycle" className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
            <Calendar className="mr-2" size={20} /> Training Cycle
          </label>
          <select
            id="trainingCycle"
            value={trainingCycle}
            onChange={(e) => setTrainingCycle(e.target.value)}
            className="mt-1 block w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Bi-Weekly</option>
            <option>Monthly</option>
          </select>
          <p className="text-sm text-gray-500 mt-2">
            Define how frequently models are automatically retrained.
          </p>
        </div>

        {/* Accuracy Target Setting */}
        <div>
          <label htmlFor="accuracyTarget" className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
            <Target className="mr-2" size={20} /> Accuracy Target
          </label>
          <input
            type="text"
            id="accuracyTarget"
            value={accuracyTarget}
            onChange={(e) => setAccuracyTarget(e.target.value)}
            className="mt-1 block w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
            placeholder="e.g., 90% MAPE or 0.1 RMSE"
          />
          <p className="text-sm text-gray-500 mt-2">
            Set the desired prediction accuracy models should strive to achieve.
          </p>
        </div>

        {/* Training Data Window Setting */}
        <div>
          <label htmlFor="trainingDataWindow" className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
            <Database className="mr-2" size={20} /> Training Data Window
          </label>
          <select
            id="trainingDataWindow"
            value={trainingDataWindow}
            onChange={(e) => setTrainingDataWindow(e.target.value)}
            className="mt-1 block w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          >
            <option>Last 1 Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>All Available Data</option>
          </select>
          <p className="text-sm text-gray-500 mt-2">
            Specify the time frame of historical data used for model training.
          </p>
        </div>

        {/* Save Settings Button */}
        <button
          onClick={saveSettings}
          className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-200 text-lg font-semibold shadow-md"
        >
          Save Policy Settings
        </button>
      </div>
    </div>
  );
};

export default ModelPoliciesPage;
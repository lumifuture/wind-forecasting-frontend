import { CheckCircle, Clock, BarChart, Layers } from 'lucide-react';


const ModelLifecyclePage = () => {
  // Function to simulate an action and log it to the console
  const simulateAction = (action) => {
    console.log(`Action: ${action}`);
    // In a real application, this would trigger an API call or state update
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Model Lifecycle</h2>
      <p className="text-gray-600 mb-8">
        This page outlines the key stages of a model's lifecycle, from creation to deployment.
      </p>

      {/* Grid layout for lifecycle stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Model Creation Stage */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
            <Layers className="mr-2" size={22} /> Model Creation
          </h3>
          <p className="text-gray-700 mb-4">
            Describes the initial setup and definition of a new forecasting model.
          </p>
          <button
            onClick={() => simulateAction('Model Created')}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Create Model
          </button>
        </div>

        {/* Training Task Submission Stage */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
            <BarChart className="mr-2" size={22} /> Training Task Submission
          </h3>
          <p className="text-gray-700 mb-4">
            Explains how training jobs are initiated by submitting data for model training.
          </p>
          <button
            onClick={() => simulateAction('Training Task Submitted')}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Submit Training
          </button>
        </div>

        {/* Performance Verification Stage */}
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="text-xl font-semibold text-yellow-800 mb-3 flex items-center">
            <CheckCircle className="mr-2" size={22} /> Performance Verification
          </h3>
          <p className="text-gray-700 mb-4">
            Details the validation process and how to view comprehensive performance reports.
          </p>
          <button
            onClick={() => simulateAction('Performance Verified')}
            className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors duration-200"
          >
            View Report
          </button>
        </div>

        {/* Model Deployment Stage */}
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-xl font-semibold text-purple-800 mb-3 flex items-center">
            <Clock className="mr-2" size={22} /> Model Deployment
          </h3>
          <p className="text-gray-700 mb-4">
            Covers the final step of making a validated model active in production.
          </p>
          <button
            onClick={() => simulateAction('Model Deployed')}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200"
          >
            Deploy Model
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelLifecyclePage;
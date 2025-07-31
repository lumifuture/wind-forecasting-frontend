import { Settings, RefreshCcw } from 'lucide-react';


const RollbackMechanismPage = () => {
  // Function to simulate initiating a manual rollback
  const initiateRollback = () => {
    console.log('Initiating manual rollback...');
    // In a real app, this would trigger an API call for rollback
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Model Rollback Mechanism</h2>
      <p className="text-gray-600 mb-8">
        The platform provides a robust mechanism to quickly roll back to a previously stable version, either based on pre-set policies or manually, to minimize business impact.
      </p>

      <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-6">
        <h3 className="text-xl font-semibold text-red-800 mb-3 flex items-center">
          <RefreshCcw className="mr-2" size={22} /> Manual Rollback
        </h3>
        <p className="text-gray-700 mb-4">
          In case of unexpected issues with a newly deployed model, you can manually restore to a specified historical stable version.
        </p>
        <button
          onClick={initiateRollback}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          Initiate Manual Rollback
        </button>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
          <Settings className="mr-2" size={22} /> Policy-Based Rollback
        </h3>
        <p className="text-gray-700">
          Configure automated rollback policies based on predefined criteria (e.g., performance degradation, error rates) to ensure business continuity.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          (Configuration for policy-based rollback would typically be found in "Tenant Policies" or a dedicated "Policies" section.)
        </p>
      </div>
    </div>
  );
};

export default RollbackMechanismPage;
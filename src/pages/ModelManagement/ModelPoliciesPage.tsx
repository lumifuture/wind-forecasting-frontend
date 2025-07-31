// src/pages/ModelManagement/ModelPoliciesPage.tsx

import { useState } from 'react';

const ModelPoliciesPage = () => {
  const [selectedTenantId, setSelectedTenantId] = useState('tenant-alpha');
  const [tenantPolicy, setTenantPolicy] = useState({
    trainingCycle: 'Daily',
    accuracyTarget: '90%',
    trainingWindow: 'Last 7 Days',
  });
  const [messageBox, setMessageBox] = useState<{ title: string; message: string } | null>(null);

  const tenants = [
    { id: 'tenant-alpha', name: 'Tenant Alpha' },
    { id: 'tenant-beta', name: 'Tenant Beta' },
  ];

  const showMessage = (title: string, message: string) => {
    setMessageBox({ title, message });
  };

  const closeMessageBox = () => {
    setMessageBox(null);
  };

  const handleSaveTenantPolicy = () => {
    console.log(`Saving policy for tenant ${selectedTenantId}:`, tenantPolicy);
    showMessage('Success', `Tenant policy for ${tenants.find(t => t.id === selectedTenantId)?.name} saved successfully!`);
  };

  return (
    <div className="p-8 flex flex-col bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Model Policies</h1>
      <p className="text-gray-700 mb-6">Configure unique model training strategies for each tenant.</p>

      {messageBox && (
        <MessageBox
          title={messageBox.title}
          message={messageBox.message}
          onClose={closeMessageBox}
        />
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tenant Model Policy Definition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="tenant-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Tenant:
            </label>
            <select
              id="tenant-select"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedTenantId}
              onChange={(e) => setSelectedTenantId(e.target.value)}
            >
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="training-cycle" className="block text-sm font-medium text-gray-700 mb-2">
              Training Cycle:
            </label>
            <input
              type="text"
              id="training-cycle"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={tenantPolicy.trainingCycle}
              onChange={(e) => setTenantPolicy({ ...tenantPolicy, trainingCycle: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="accuracy-target" className="block text-sm font-medium text-gray-700 mb-2">
              Accuracy Target:
            </label>
            <input
              type="text"
              id="accuracy-target"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={tenantPolicy.accuracyTarget}
              onChange={(e) => setTenantPolicy({ ...tenantPolicy, accuracyTarget: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="training-window" className="block text-sm font-medium text-gray-700 mb-2">
              Training Data Window:
            </label>
            <input
              type="text"
              id="training-window"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={tenantPolicy.trainingWindow}
              onChange={(e) => setTenantPolicy({ ...tenantPolicy, trainingWindow: e.target.value })}
            />
          </div>
        </div>
        <button
          onClick={handleSaveTenantPolicy}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          Save Tenant Policy
        </button>
      </div>
    </div>
  );
};

export default ModelPoliciesPage;
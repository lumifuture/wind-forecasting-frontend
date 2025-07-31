// src/pages/ModelManagement/ModelOverviewPage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModelStore } from '../../store/modelStore';


const ModelOverviewPage = () => {
  const models = useModelStore((state) => state.models);
  const addModel = useModelStore((state) => state.addModel);
  const deployModelVersion = useModelStore((state) => state.deployModelVersion);
  const navigate = useNavigate();

  const [newModelName, setNewModelName] = useState('');
  const [messageBox, setMessageBox] = useState<{ title: string; message: string } | null>(null);

  const showMessage = (title: string, message: string) => {
    setMessageBox({ title, message });
  };

  const closeMessageBox = () => {
    setMessageBox(null);
  };

  const handleCreateModel = () => {
    if (newModelName.trim() === '') {
      showMessage('Error', 'Model name cannot be empty.');
      return;
    }
    addModel(newModelName);
    setNewModelName('');
    showMessage('Success', `Model "${newModelName}" created successfully!`);
  };

  const handleDeployActive = (modelId: string, activeVersionId: string) => {
    deployModelVersion(modelId, activeVersionId);
    showMessage('Success', `Model deployed successfully! Version ${activeVersionId} is now active.`);
  };

  return (
    <div className="p-8 flex flex-col bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Model Overview</h1>
      <p className="text-gray-700 mb-6">
        Manage the complete lifecycle of your wind power forecasting models, from creation and training to deployment and rollback.
      </p>

      {messageBox && (
        <MessageBox
          title={messageBox.title}
          message={messageBox.message}
          onClose={closeMessageBox}
        />
      )}

      {/* Model Creation */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Model</h2>
        <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="New Model Name"
            className="flex-1 w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={newModelName}
            onChange={(e) => setNewModelName(e.target.value)}
          />
          <button
            onClick={handleCreateModel}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors"
          >
            Create Model
          </button>
        </div>
      </div>

      {/* Existing Models List */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Models</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Version</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{model.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      model.status === 'Deployed' ? 'bg-green-100 text-green-800' :
                      model.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    )}>
                      {model.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{model.activeVersionId}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeployActive(model.id, model.activeVersionId)}
                      className="text-blue-600 hover:text-blue-900 mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={model.status === 'Deployed'}
                    >
                      Deploy Active
                    </button>
                    <button
                      onClick={() => navigate(`/models/${model.id}`)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModelOverviewPage;
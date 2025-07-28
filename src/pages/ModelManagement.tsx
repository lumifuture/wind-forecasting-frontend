// src/pages/ModelManagement.tsx
import { useEffect, useState } from 'react';
import { useModelStore } from '../store/modelStore';
import { getAvailableModels } from '../services/modelService';

export default function ModelManagement() {
  const { models, activeModelId, setModels, setActiveModel } = useModelStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch models only if they haven't been loaded yet
    if (models.length === 0) {
      setLoading(true);
      getAvailableModels()
        .then((data) => {
          setModels(data);
          // If no active model is set, default to the first one
          if (!activeModelId && data.length > 0) {
            setActiveModel(data[0].id);
          }
        })
        .catch((err) => setError('Failed to load models: ' + (err as Error).message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // Models already present
    }
  }, [models, activeModelId, setModels, setActiveModel]);

  if (loading) return <div className="p-6">Loading models...</div>;
  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Model Management</h2>
      <div className="space-y-4">
        {models.length === 0 ? (
          <p className="text-gray-600">No models available. Please check the service.</p>
        ) : (
          models.map((model) => (
            <div
              key={model.id}
              className={`p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all duration-200 ease-in-out ${
                activeModelId === model.id ? 'bg-blue-50 border-blue-400 shadow-md' : 'bg-white border-gray-200'
              }`}
            >
              <div>
                <div className="font-bold text-lg text-gray-800">{model.name}</div>
                <div className="text-sm text-gray-600">Accuracy: {(model.accuracy * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-500">Model ID: {model.id}</div>
              </div>
              <button
                className={`mt-3 sm:mt-0 px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-200
                  ${activeModelId === model.id ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                  disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => setActiveModel(model.id)}
                disabled={activeModelId === model.id}
              >
                {activeModelId === model.id ? 'Active Model' : 'Activate'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
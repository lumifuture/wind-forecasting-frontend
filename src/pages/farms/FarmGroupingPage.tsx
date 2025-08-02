import { useState } from 'react';
import { Plus } from 'lucide-react'; 
import Modal from '../../components/Modal'


const FarmGroupingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    groupName: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New group submitted:', formData);
    resetFormAndCloseModal();
  };

  const resetFormAndCloseModal = () => {
    setFormData({
      groupName: '',
      description: '',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-800 flex items-center justify-between">
        Farm Grouping and Regional Management
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Group</span>
        </button>
      </h1>
      <p className="text-gray-700 mt-4">
        This page allows you to create custom groups and regions for your wind farms, facilitating batch operations and regional data analysis.
      </p>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Existing Groups</h2>
        <p className="text-gray-600">No groups have been created yet. Click "Create New Group" to get started.</p>
      </div>

      <Modal
        title="Create New Group"
        isOpen={isModalOpen}
        onClose={resetFormAndCloseModal}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">
              Group Name
            </label>
            <input
              type="text"
              name="groupName"
              id="groupName"
              value={formData.groupName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="e.g., All wind farms in the Midwest region."
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={resetFormAndCloseModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Group
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


export default FarmGroupingPage;
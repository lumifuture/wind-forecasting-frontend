import { useState } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react'; 
import useFarmStore from '../../store/farmStore'
import Farm from '../../store/farmStore'
import Modal from '../../components/Modal'


const FarmManagementPage = () => {
  const { farms, addFarm, updateFarm, deleteFarm } = useFarmStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    lat: '',
    lng: '',
    capacity: '',
    commissioningDate: '',
    region: '',
    dataSource: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (farm: any) => {
    setFormData({
      id: farm.id,
      name: farm.name,
      lat: farm.location.lat.toString(),
      lng: farm.location.lng.toString(),
      capacity: farm.capacity.toString(),
      commissioningDate: farm.commissioningDate,
      region: farm.region,
      dataSource: farm.dataSource,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFarm = {
      name: formData.name,
      location: {
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
      },
      capacity: parseFloat(formData.capacity),
      commissioningDate: formData.commissioningDate,
      region: formData.region,
      dataSource: formData.dataSource,
    };

    if (formData.id) {
      updateFarm({ ...newFarm, id: formData.id });
    } else {
      addFarm(newFarm);
    }
    resetFormAndCloseModal();
  };

  const resetFormAndCloseModal = () => {
    setFormData({
      id: '',
      name: '',
      lat: '',
      lng: '',
      capacity: '',
      commissioningDate: '',
      region: '',
      dataSource: '',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-blue-800 flex items-center justify-between">
        Wind Farm Information Management
        <button
          onClick={() => {
            setFormData({ id: '', name: '', lat: '', lng: '', capacity: '', commissioningDate: '', region: '', dataSource: '' });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Farm</span>
        </button>
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Wind Farms</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity (MW)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {farms.map((farm) => (
              <tr key={farm.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farm.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farm.location.lat}, {farm.location.lng}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farm.capacity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farm.region}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(farm)} className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteFarm(farm.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title={formData.id ? 'Edit Wind Farm' : 'Add New Wind Farm'}
        isOpen={isModalOpen}
        onClose={resetFormAndCloseModal}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Wind Farm Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                Region
              </label>
              <input
                type="text"
                name="region"
                id="region"
                value={formData.region}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="lat" className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type="number"
                name="lat"
                id="lat"
                step="0.0001"
                value={formData.lat}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="lng" className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type="number"
                name="lng"
                id="lng"
                step="0.0001"
                value={formData.lng}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                Total Installed Capacity (MW)
              </label>
              <input
                type="number"
                name="capacity"
                id="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="commissioningDate" className="block text-sm font-medium text-gray-700">
                Commissioning Date
              </label>
              <input
                type="date"
                name="commissioningDate"
                id="commissioningDate"
                value={formData.commissioningDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="dataSource" className="block text-sm font-medium text-gray-700">
                Data Source (SCADA/IoT)
              </label>
              <input
                type="text"
                name="dataSource"
                id="dataSource"
                value={formData.dataSource}
                onChange={handleChange}
                required
                placeholder="e.g., SCADA-1234 or IoT-9876"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
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
              {formData.id ? 'Update Farm' : 'Add Farm'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FarmManagementPage;
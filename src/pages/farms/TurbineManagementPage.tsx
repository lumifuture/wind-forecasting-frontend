import { useState } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react'; 
import useFarmStore from '../../store/farmStore'
import Modal from '../../components/Modal'
import Turbine from '../../store/farmStore'


const TurbineManagementPage = () => {
  const { farms, turbines, addTurbine, updateTurbine, deleteTurbine } = useFarmStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    farmId: '',
    model: '',
    serialNumber: '',
    ratedPower: '',
    rotorDiameter: '',
    hubHeight: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (turbine: any) => {
    setFormData({
      id: turbine.id,
      farmId: turbine.farmId,
      model: turbine.model,
      serialNumber: turbine.serialNumber,
      ratedPower: turbine.ratedPower.toString(),
      rotorDiameter: turbine.rotorDiameter.toString(),
      hubHeight: turbine.hubHeight.toString(),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTurbine = {
      farmId: formData.farmId,
      model: formData.model,
      serialNumber: formData.serialNumber,
      ratedPower: parseFloat(formData.ratedPower),
      rotorDiameter: parseFloat(formData.rotorDiameter),
      hubHeight: parseFloat(formData.hubHeight),
    };

    if (formData.id) {
      updateTurbine({ ...newTurbine, id: formData.id });
    } else {
      addTurbine(newTurbine);
    }
    resetFormAndCloseModal();
  };

  const resetFormAndCloseModal = () => {
    setFormData({
      id: '',
      farmId: '',
      model: '',
      serialNumber: '',
      ratedPower: '',
      rotorDiameter: '',
      hubHeight: '',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-blue-800 flex items-center justify-between">
        Wind Turbine Equipment Management
        <button
          onClick={() => {
            setFormData({ id: '', farmId: '', model: '', serialNumber: '', ratedPower: '', rotorDiameter: '', hubHeight: '' });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Turbine</span>
        </button>
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Wind Turbines</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rated Power (kW)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {turbines.map((turbine) => {
              const farm = farms.find(f => f.id === turbine.farmId);
              return (
                <tr key={turbine.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{turbine.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{turbine.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farm?.name || 'Unassigned'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{turbine.ratedPower}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(turbine)} className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteTurbine(turbine.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        title={formData.id ? 'Edit Wind Turbine' : 'Add New Wind Turbine'}
        isOpen={isModalOpen}
        onClose={resetFormAndCloseModal}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="farmId" className="block text-sm font-medium text-gray-700">
                Associated Wind Farm
              </label>
              <select
                name="farmId"
                id="farmId"
                value={formData.farmId}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">-- Select a Farm --</option>
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.id}>
                    {farm.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <input
                type="text"
                name="model"
                id="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
                Serial Number
              </label>
              <input
                type="text"
                name="serialNumber"
                id="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="ratedPower" className="block text-sm font-medium text-gray-700">
                Rated Power (kW)
              </label>
              <input
                type="number"
                name="ratedPower"
                id="ratedPower"
                value={formData.ratedPower}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="rotorDiameter" className="block text-sm font-medium text-gray-700">
                Rotor Diameter (m)
              </label>
              <input
                type="number"
                name="rotorDiameter"
                id="rotorDiameter"
                value={formData.rotorDiameter}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="hubHeight" className="block text-sm font-medium text-gray-700">
                Hub Height (m)
              </label>
              <input
                type="number"
                name="hubHeight"
                id="hubHeight"
                value={formData.hubHeight}
                onChange={handleChange}
                required
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
              {formData.id ? 'Update Turbine' : 'Add Turbine'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


export default TurbineManagementPage;
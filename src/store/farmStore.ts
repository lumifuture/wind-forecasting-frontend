// src/store/farmStore.ts (Updated Mock Implementation)

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';


interface Farm {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  capacity: number;
  commissioningDate: string;
  region: string;
  dataSource: string;
}

interface Turbine {
  id: string;
  farmId: string;
  model: string;
  serialNumber: string;
  ratedPower: number;
  rotorDiameter: number;
  hubHeight: number;
}

interface FarmState {
  farms: Farm[];
  turbines: Turbine[];
  addFarm: (farm: Omit<Farm, 'id'>) => void;
  updateFarm: (farm: Farm) => void;
  deleteFarm: (id: string) => void;
  addTurbine: (turbine: Omit<Turbine, 'id'>) => void;
  updateTurbine: (turbine: Turbine) => void;
  deleteTurbine: (id: string) => void;
}

const useFarmStore = create<FarmState>((set) => ({
  farms: [
    {
      id: 'farm-alpha-1',
      name: 'Wind Farm Alpha',
      location: { lat: 51.5074, lng: -0.1278 },
      capacity: 100,
      commissioningDate: '2020-01-15',
      region: 'North',
      dataSource: 'SCADA-1234',
    },
    {
      id: 'farm-beta-2',
      name: 'Coastal Turbine Group',
      location: { lat: 50.8225, lng: -0.1372 },
      capacity: 50,
      commissioningDate: '2018-05-20',
      region: 'South',
      dataSource: 'IoT-9876',
    },
  ],
  turbines: [
    {
      id: uuidv4(),
      farmId: 'farm-alpha-1',
      model: 'GE 1.5-77',
      serialNumber: 'SN-001',
      ratedPower: 1500,
      rotorDiameter: 77,
      hubHeight: 80,
    },
    {
      id: uuidv4(),
      farmId: 'farm-alpha-1',
      model: 'Vestas V80-2.0 MW',
      serialNumber: 'SN-002',
      ratedPower: 2000,
      rotorDiameter: 80,
      hubHeight: 80,
    },
  ],
  addFarm: (farm) =>
    set((state) => ({ farms: [...state.farms, { ...farm, id: uuidv4() }] })),
  updateFarm: (updatedFarm) =>
    set((state) => ({
      farms: state.farms.map((farm) =>
        farm.id === updatedFarm.id ? updatedFarm : farm
      ),
    })),
  deleteFarm: (id) =>
    set((state) => ({ farms: state.farms.filter((farm) => farm.id !== id) })),
  addTurbine: (turbine) =>
    set((state) => ({ turbines: [...state.turbines, { ...turbine, id: uuidv4() }] })),
  updateTurbine: (updatedTurbine) =>
    set((state) => ({
      turbines: state.turbines.map((turbine) =>
        turbine.id === updatedTurbine.id ? updatedTurbine : turbine
      ),
    })),
  deleteTurbine: (id) =>
    set((state) => ({
      turbines: state.turbines.filter((turbine) => turbine.id !== id),
    })),
}));

export default useFarmStore;
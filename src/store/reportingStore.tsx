import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

interface ReportRecord {
  id: string;
  type: string;
  timestamp: string;
  status: 'Success' | 'Failed';
  filename: string;
  method: 'Automatic' | 'Manual';
}

interface ReportingSettings {
  retries: number;
  timeout: number;
}

interface ReportingState {
  settings: ReportingSettings;
  records: ReportRecord[];
  updateSettings: (newSettings: ReportingSettings) => void;
  reuploadReport: (id: string, manualInfo?: any) => void;
  addRecord: (record: Omit<ReportRecord, 'id'>) => void;
}

const useReportingStore = create<ReportingState>((set) => ({
  settings: {
    retries: 3,
    timeout: 5, // seconds
  },
  records: [
    { id: 'rec-001', type: 'Short-term Power Forecast', timestamp: '2025-08-01 10:00', status: 'Success', filename: 'ST_Forecast_20250801.xml', method: 'Automatic' },
    { id: 'rec-002', type: 'Ultra-short-term Power Forecast', timestamp: '2025-08-01 10:15', status: 'Failed', filename: 'UST_Forecast_20250801.xml', method: 'Automatic' },
    { id: 'rec-003', type: 'Meteorological Data', timestamp: '2025-08-01 10:30', status: 'Success', filename: 'MetData_20250801.xml', method: 'Automatic' },
    { id: 'rec-004', type: 'Standalone File', timestamp: '2025-08-01 10:45', status: 'Success', filename: 'TurbineStatus_20250801.xml', method: 'Automatic' },
    { id: 'rec-005', type: 'Short-term Power Forecast', timestamp: '2025-08-01 11:00', status: 'Failed', filename: 'ST_Forecast_20250801-v2.xml', method: 'Automatic' },
    { id: 'rec-006', type: 'Short-term Power Forecast', timestamp: '2025-08-01 11:30', status: 'Success', filename: 'ST_Forecast_20250801-v3.xml', method: 'Manual' },
  ],
  updateSettings: (newSettings) => set({ settings: newSettings }),
  reuploadReport: (id, manualInfo) => set((state) => {
    console.log('Re-uploading report with ID:', id, 'Manual Info:', manualInfo);
    return {
      records: state.records.map(record =>
        record.id === id ? { ...record, status: 'Success', method: manualInfo ? 'Manual' : record.method } : record
      ),
    };
  }),
  addRecord: (record) => set((state) => ({
    records: [...state.records, { ...record, id: uuidv4() }]
  })),
}));

export default useReportingStore;
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Record } from '../types/record';
import { v4 as uuidv4 } from 'uuid';

// Define the shape of our context
interface RecordContextType {
  records: Record[];
  addRecord: (record: Omit<Record, 'id'>) => Promise<void>;
  updateRecord: (id: string, record: Omit<Record, 'id'>) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
}

// Create the context with a default value
const RecordContext = createContext<RecordContextType | undefined>(undefined);

// Sample initial data
const initialRecords: Record[] = [
  {
    id: '1',
    title: 'Patient Check-up',
    body: 'Regular check-up for diabetes management, blood pressure within normal range.'
  },
  {
    id: '2',
    title: 'Vaccination Appointment',
    body: 'Scheduled vaccination for influenza, patient has no allergies to vaccine components.'
  },
  {
    id: '3',
    title: 'Prescription Renewal',
    body: 'Renewed prescription for hypertension medication, 30-day supply.'
  }
];

interface RecordProviderProps {
  children: React.ReactNode;
}

export const RecordProvider: React.FC<RecordProviderProps> = ({ children }) => {
  const [records, setRecords] = useState<Record[]>([]);

  // Load records from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('zezoclinic_records');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    } else {
      // Use initial data if no saved records
      setRecords(initialRecords);
    }
  }, []);

  // Save records to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('zezoclinic_records', JSON.stringify(records));
  }, [records]);

  // Add a new record
  const addRecord = async (record: Omit<Record, 'id'>): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const newRecord: Record = {
          ...record,
          id: uuidv4()
        };
        setRecords(prevRecords => [...prevRecords, newRecord]);
        resolve();
      }, 500);
    });
  };

  // Update an existing record
  const updateRecord = async (id: string, record: Omit<Record, 'id'>): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        setRecords(prevRecords =>
          prevRecords.map(r => (r.id === id ? { ...record, id } : r))
        );
        resolve();
      }, 500);
    });
  };

  // Delete a record
  const deleteRecord = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        setRecords(prevRecords => prevRecords.filter(r => r.id !== id));
        resolve();
      }, 500);
    });
  };

  return (
    <RecordContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </RecordContext.Provider>
  );
};

// Custom hook to use the RecordContext
export const useRecordContext = (): RecordContextType => {
  const context = useContext(RecordContext);
  if (context === undefined) {
    throw new Error('useRecordContext must be used within a RecordProvider');
  }
  return context;
};
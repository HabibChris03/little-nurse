import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'admin';
  avatar?: string;
  isOnline: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'critical' | 'stable' | 'recovering';
  queuePosition?: number;
}

export interface Report {
  id: string;
  patientId: string;
  date: string;
  summary: string;
  type: string;
}

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isApproved: boolean;
  setIsApproved: React.Dispatch<React.SetStateAction<boolean>>;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: AppContextType = {
  user: null,
  setUser: () => {},
  isApproved: false,
  setIsApproved: () => {},
  patients: [],
  setPatients: () => {},
  reports: [],
  setReports: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : {
        id: 'user_001',
        name: 'Dr. Sarah Smith',
        email: 'dr.smith@littlenursedoc.com',
        role: 'doctor',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        isOnline: true,
      }; // Pre-filling mock user for quick review
    } catch {
      return null;
    }
  });

  const [isApproved, setIsApproved] = useState<boolean>(true); // Mocking approval
  const [patients, setPatients] = useState<Patient[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isApproved,
        setIsApproved,
        patients,
        setPatients,
        reports,
        setReports,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

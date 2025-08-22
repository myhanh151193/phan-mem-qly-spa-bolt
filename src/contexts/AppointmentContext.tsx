import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Appointment {
  id: number;
  treatmentId?: number;
  date: string;
  time: string;
  duration: number;
  staff?: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show' | 'confirmed' | 'in-progress' | 'pending';
  services: string[];
  customer: string;
  customerId?: number;
  customerPhone?: string;
  service?: string; // For backward compatibility
  price?: string;
  totalPrice?: string;
  branch?: string; // Branch where the appointment takes place
}

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: number, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: number) => void;
  addTreatmentAppointments: (appointments: Appointment[]) => void;
  getAppointmentsForTreatment: (treatmentId: number) => Appointment[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      time: '09:00',
      duration: 90,
      customer: 'Nguyễn Thu Hà',
      customerId: 1,
      customerPhone: '0901234567',
      service: 'Chăm sóc da mặt Premium',
      services: ['Chăm sóc da mặt Premium'],
      staff: 'Nguyễn Mai',
      status: 'confirmed',
      price: '800K',
      totalPrice: '800K',
      date: new Date().toISOString().split('T')[0],
      branch: 'branch-1',
      notes: 'Khách hàng VIP, cần chú ý đặc biệt'
    },
    {
      id: 2,
      time: '10:30',
      duration: 120,
      customer: 'Trần Mai Linh',
      customerId: 2,
      customerPhone: '0912345678',
      service: 'Massage toàn thân + Tắm trắng',
      services: ['Massage toàn thân', 'Tắm trắng'],
      staff: 'Lê Hoa',
      status: 'in-progress',
      price: '1.1M',
      totalPrice: '1100K',
      date: new Date().toISOString().split('T')[0],
      branch: 'branch-2',
      notes: 'Đang thực hiện 2 dịch vụ'
    },
    {
      id: 3,
      time: '14:00',
      duration: 60,
      customer: 'Lê Minh Châu',
      customerId: 3,
      customerPhone: '0923456789',
      service: 'Điều trị mụn',
      services: ['Điều trị mụn'],
      staff: 'Trần An',
      status: 'pending',
      price: '400K',
      totalPrice: '400K',
      date: new Date().toISOString().split('T')[0],
      branch: 'branch-3'
    },
    {
      id: 4,
      time: '15:30',
      duration: 180,
      customer: 'Phạm Thị Lan',
      customerPhone: '0934567890',
      service: 'Gói chăm sóc VIP',
      services: ['Chăm sóc da mặt Premium', 'Massage toàn thân', 'Tắm trắng'],
      staff: 'Nguyễn Mai',
      status: 'confirmed',
      price: '1900K',
      totalPrice: '1900K',
      date: new Date().toISOString().split('T')[0],
      branch: 'branch-1',
      notes: 'Gói combo 3 dịch vụ'
    },
  ]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const updateAppointment = (id: number, updates: Partial<Appointment>) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, ...updates } : apt)
    );
  };

  const deleteAppointment = (id: number) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const addTreatmentAppointments = (newAppointments: Appointment[]) => {
    setAppointments(prev => {
      // Remove any existing appointments for the same treatment
      const treatmentId = newAppointments[0]?.treatmentId;
      const filtered = treatmentId 
        ? prev.filter(apt => apt.treatmentId !== treatmentId)
        : prev;
      
      return [...filtered, ...newAppointments];
    });
  };

  const getAppointmentsForTreatment = (treatmentId: number) => {
    return appointments.filter(apt => apt.treatmentId === treatmentId);
  };

  return (
    <AppointmentContext.Provider value={{
      appointments,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      addTreatmentAppointments,
      getAppointmentsForTreatment
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

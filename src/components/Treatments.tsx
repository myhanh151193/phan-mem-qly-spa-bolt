import React, { useState, useEffect } from 'react';
import { Search, Plus, Calendar, User, ClipboardCheck, Edit2, Trash2, X, Save, ChevronDown, Clock, CalendarDays, UserCheck, FileText, CreditCard, DollarSign } from 'lucide-react';
import { useAppointments, Appointment as ContextAppointment } from '../contexts/AppointmentContext';
import { useTreatmentPayment } from '../contexts/TreatmentPaymentContext';

// Using Appointment from context
type Appointment = ContextAppointment;

interface Treatment {
  id: number;
  name: string;
  customer: string;
  startDate: string;
  endDate: string;
  totalSessions: number;
  completedSessions: number;
  nextSession: string | null;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  progress: number;
  services: string[];
  totalValue: string;
  totalAmount: number; // Total package amount in VND
  appointments: Appointment[];
  branch: string; // Branch where the treatment is managed
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  membershipLevel: 'Member' | 'VIP' | 'VVIP';
  avatar: string;
  branch: string;
}

interface TreatmentFormData {
  name: string;
  customerId: number | null;
  customer: string;
  startDate: string;
  endDate: string;
  totalSessions: number;
  services: string[];
  totalValue: string;
  scheduleType: 'manual' | 'weekly' | 'monthly';
  recurringTime: string;
  weekDay?: number; // 0 = Sunday, 1 = Monday, etc.
  monthDay?: number; // 1-31
  sessionDuration: number;
  preferredStaff: string;
}

interface TreatmentsProps {
  selectedBranch: string;
}

const Treatments: React.FC<TreatmentsProps> = ({ selectedBranch }) => {
  const { addTreatmentAppointments, getAppointmentsForTreatment, updateAppointment, deleteAppointment: deleteAppointmentFromContext } = useAppointments();
  const { getTreatmentPayment, updateTreatmentPayment, initializeTreatmentPayment, getPaymentStatusColor, getPaymentStatusText, formatCurrency } = useTreatmentPayment();

  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: 1,
      name: 'Liệu trình trị mụn 3 tháng',
      customer: 'Nguyễn Thu Hà',
      startDate: '2025-01-01',
      endDate: '2025-04-01',
      totalSessions: 12,
      completedSessions: 8,
      nextSession: '2025-01-15',
      status: 'active',
      progress: 67,
      services: ['Điều trị mụn', 'Tái tạo da', 'Chăm sóc da'],
      totalValue: '15,600,000',
      totalAmount: 15600000,
      branch: 'branch-1',
      appointments: [
        { id: 1, treatmentId: 1, date: '2025-01-15', time: '09:00', duration: 90, staff: 'Nguyễn Mai', status: 'scheduled', services: ['Điều trị mụn'], notes: 'Buổi 9' },
        { id: 2, treatmentId: 1, date: '2025-01-22', time: '09:00', duration: 90, staff: 'Nguyễn Mai', status: 'scheduled', services: ['Tái tạo da'], notes: 'Buổi 10' },
        { id: 3, treatmentId: 1, date: '2025-01-08', time: '09:00', duration: 90, staff: 'Nguyễn Mai', status: 'completed', services: ['Điều trị mụn'], notes: 'Buổi 8 - hoàn thành tốt' }
      ]
    },
    {
      id: 2,
      name: 'Gói chăm sóc da toàn diện',
      customer: 'Trần Mai Linh',
      startDate: '2024-12-01',
      endDate: '2025-03-01',
      totalSessions: 8,
      completedSessions: 6,
      nextSession: '2025-01-20',
      status: 'active',
      progress: 75,
      services: ['Chăm sóc da mặt', 'Massage', 'Tắm trắng'],
      totalValue: '12,800,000',
      totalAmount: 12800000,
      branch: 'branch-2',
      appointments: [
        { id: 4, treatmentId: 2, date: '2025-01-20', time: '14:00', duration: 120, staff: 'Lê Hoa', status: 'scheduled', services: ['Chăm sóc da mặt', 'Massage'], notes: 'Buổi 7' },
        { id: 5, treatmentId: 2, date: '2025-02-03', time: '14:00', duration: 120, staff: 'Lê Hoa', status: 'scheduled', services: ['T���m trắng'], notes: 'Buổi cuối' }
      ]
    },
    {
      id: 3,
      name: 'Liệu trình giảm béo 6 tháng',
      customer: 'Lê Minh Châu',
      startDate: '2024-10-01',
      endDate: '2025-04-01',
      totalSessions: 24,
      completedSessions: 24,
      nextSession: null,
      status: 'completed',
      progress: 100,
      services: ['Giảm béo RF', 'Massage giảm béo', 'Tư vấn dinh dưỡng'],
      totalValue: '28,800,000',
      totalAmount: 28800000,
      branch: 'branch-3',
      appointments: []
    },
  ]);

  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Nguyễn Thu Hà',
      phone: '0901234567',
      email: 'thuha@email.com',
      membershipLevel: 'VVIP',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=150',
      branch: 'branch-1'
    },
    {
      id: 2,
      name: 'Trần Mai Linh',
      phone: '0907654321',
      email: 'mailinh@email.com',
      membershipLevel: 'VIP',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=150',
      branch: 'branch-2'
    },
    {
      id: 3,
      name: 'Lê Minh Châu',
      phone: '0912345678',
      email: 'minhchau@email.com',
      membershipLevel: 'Member',
      avatar: 'https://images.pexels.com/photos/1037915/pexels-photo-1037915.jpeg?w=150',
      branch: 'branch-3'
    },
    {
      id: 4,
      name: 'Phạm Thị Lan',
      phone: '0938567890',
      email: 'thilan@email.com',
      membershipLevel: 'VIP',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
      branch: 'branch-1'
    },
    {
      id: 5,
      name: 'Hoàng Văn Nam',
      phone: '0976543210',
      email: 'vannam@email.com',
      membershipLevel: 'Member',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150',
      branch: 'branch-2'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [formData, setFormData] = useState<TreatmentFormData>({
    name: '',
    customerId: null,
    customer: '',
    startDate: '',
    endDate: '',
    totalSessions: 1,
    services: [],
    totalValue: '',
    scheduleType: 'manual',
    recurringTime: '09:00',
    weekDay: 1, // Monday
    monthDay: 1,
    sessionDuration: 90,
    preferredStaff: ''
  });
  const [serviceInput, setServiceInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [appointmentForm, setAppointmentForm] = useState({
    date: '',
    time: '',
    duration: 90,
    staff: '',
    notes: '',
    services: [] as string[]
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTreatmentForPayment, setSelectedTreatmentForPayment] = useState<Treatment | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    method: 'cash' as 'cash' | 'transfer' | 'card',
    note: ''
  });

  const availableServices = [
    'Điều trị mụn', 'Tái tạo da', 'Chăm sóc da', 'Chăm sóc da mặt', 
    'Massage', 'Tắm trắng', 'Giảm béo RF', 'Massage giảm béo', 
    'Tư vấn dinh dưỡng', 'Triệt lông', 'Trị thâm', 'Căng da mặt'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang thực hiện';
      case 'paused': return 'Tạm dừng';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  // Branch mapping for display
  const branchMap: { [key: string]: string } = {
    'branch-1': 'Chi nhánh Quận 1',
    'branch-2': 'Chi nhánh Quận 3',
    'branch-3': 'Chi nhánh Thủ Đức',
    'branch-4': 'Chi nhánh Gò Vấp'
  };

  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.customer.toLowerCase().includes(searchTerm.toLowerCase());

    // Branch filtering
    const matchesBranch = selectedBranch === 'all-branches' || treatment.branch === selectedBranch;

    return matchesSearch && matchesBranch;
  });

  const openCreateModal = () => {
    setEditingTreatment(null);
    setFormData({
      name: '',
      customerId: null,
      customer: '',
      startDate: '',
      endDate: '',
      totalSessions: 1,
      services: [],
      totalValue: '',
      scheduleType: 'manual',
      recurringTime: '09:00',
      weekDay: 1,
      monthDay: 1,
      sessionDuration: 90,
      preferredStaff: ''
    });
    setShowModal(true);
  };

  const openEditModal = (treatment: Treatment) => {
    setEditingTreatment(treatment);
    const selectedCustomer = customers.find(c => c.name === treatment.customer);
    setFormData({
      name: treatment.name,
      customerId: selectedCustomer?.id || null,
      customer: treatment.customer,
      startDate: treatment.startDate,
      endDate: treatment.endDate,
      totalSessions: treatment.totalSessions,
      services: [...treatment.services],
      totalValue: treatment.totalValue,
      scheduleType: 'manual', // Default for existing treatments
      recurringTime: '09:00',
      weekDay: 1,
      monthDay: 1,
      sessionDuration: 90,
      preferredStaff: ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTreatment(null);
    setServiceInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.customerId || !formData.startDate || !formData.endDate) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const selectedCustomer = customers.find(c => c.id === formData.customerId);
    if (!selectedCustomer) {
      alert('Vui lòng chọn khách hàng');
      return;
    }

    const treatmentId = editingTreatment ? editingTreatment.id : Date.now();
    const generatedAppointments = editingTreatment
      ? editingTreatment.appointments
      : generateRecurringAppointments(treatmentId);

    const nextScheduled = generatedAppointments
      .filter(a => a.status === 'scheduled' && new Date(a.date) > new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    const treatmentData: Treatment = {
      id: treatmentId,
      name: formData.name,
      customer: selectedCustomer.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalSessions: formData.totalSessions,
      services: formData.services,
      totalValue: formData.totalValue,
      completedSessions: editingTreatment ? editingTreatment.completedSessions : 0,
      nextSession: editingTreatment
        ? editingTreatment.nextSession
        : (nextScheduled ? nextScheduled.date : null),
      status: editingTreatment ? editingTreatment.status : 'active',
      progress: editingTreatment
        ? Math.round((editingTreatment.completedSessions / formData.totalSessions) * 100)
        : 0,
      appointments: generatedAppointments
    };

    if (editingTreatment) {
      setTreatments(prev => prev.map(t => t.id === editingTreatment.id ? treatmentData : t));
    } else {
      setTreatments(prev => [...prev, treatmentData]);

      // Add generated appointments to context for new treatments
      if (generatedAppointments.length > 0) {
        const contextAppointments: ContextAppointment[] = generatedAppointments.map(apt => ({
          ...apt,
          customer: selectedCustomer.name,
          customerId: selectedCustomer.id,
          service: apt.services.join(', '),
          totalPrice: formData.totalValue,
          price: formData.totalValue
        }));
        addTreatmentAppointments(contextAppointments);
      }
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    setTreatments(prev => prev.filter(t => t.id !== id));
    setDeleteConfirm(null);
  };

  const addService = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()]
      }));
      setServiceInput('');
    }
  };

  const removeService = (serviceToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== serviceToRemove)
    }));
  };

  const addPredefinedService = (service: string) => {
    if (!formData.services.includes(service)) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, service]
      }));
    }
  };

  const handleCustomerSelect = (customerId: number) => {
    const selectedCustomer = customers.find(c => c.id === customerId);
    if (selectedCustomer) {
      setFormData(prev => ({
        ...prev,
        customerId,
        customer: selectedCustomer.name
      }));
    }
  };

  const generateRecurringAppointments = (treatmentId: number): Appointment[] => {
    if (formData.scheduleType === 'manual') return [];

    const appointments: Appointment[] = [];
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    let currentDate = new Date(startDate);
    let appointmentCount = 0;

    // Adjust start date to match the chosen day
    if (formData.scheduleType === 'weekly' && formData.weekDay !== undefined) {
      const dayDiff = formData.weekDay - currentDate.getDay();
      if (dayDiff < 0) {
        currentDate.setDate(currentDate.getDate() + 7 + dayDiff);
      } else if (dayDiff > 0) {
        currentDate.setDate(currentDate.getDate() + dayDiff);
      }
    } else if (formData.scheduleType === 'monthly' && formData.monthDay !== undefined) {
      currentDate.setDate(formData.monthDay);
      if (currentDate < startDate) {
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }

    while (currentDate <= endDate && appointmentCount < formData.totalSessions) {
      appointments.push({
        id: Date.now() + appointmentCount,
        treatmentId,
        date: currentDate.toISOString().split('T')[0],
        time: formData.recurringTime,
        duration: formData.sessionDuration,
        staff: formData.preferredStaff,
        status: 'scheduled',
        services: [...formData.services],
        notes: `Buổi ${appointmentCount + 1}/${formData.totalSessions}`
      });

      appointmentCount++;

      // Move to next occurrence
      if (formData.scheduleType === 'weekly') {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (formData.scheduleType === 'monthly') {
        currentDate.setMonth(currentDate.getMonth() + 1);
        // Handle month-end edge cases
        if (formData.monthDay && formData.monthDay > 28) {
          const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
          currentDate.setDate(Math.min(formData.monthDay, daysInMonth));
        }
      }
    }

    return appointments;
  };

  const getMembershipColor = (level: string) => {
    switch (level) {
      case 'VVIP': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'VIP': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'Member': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openPaymentModal = (treatment: Treatment) => {
    const paymentData = getTreatmentPayment(treatment.id);
    setSelectedTreatmentForPayment(treatment);
    setPaymentForm({
      amount: paymentData && paymentData.remainingAmount > 0 ? paymentData.remainingAmount.toString() : '',
      method: 'cash',
      note: ''
    });
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedTreatmentForPayment(null);
    setPaymentForm({
      amount: '',
      method: 'cash',
      note: ''
    });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTreatmentForPayment || !paymentForm.amount) {
      alert('Vui lòng nhập số tiền thanh toán');
      return;
    }

    const paymentData = getTreatmentPayment(selectedTreatmentForPayment.id);
    if (!paymentData) {
      alert('Không tìm thấy thông tin thanh toán');
      return;
    }

    const paymentAmount = parseInt(paymentForm.amount);
    if (paymentAmount <= 0 || paymentAmount > paymentData.remainingAmount) {
      alert('Số tiền thanh toán không hợp lệ');
      return;
    }

    // Update payment through context
    updateTreatmentPayment(selectedTreatmentForPayment.id, {
      date: new Date().toISOString().split('T')[0],
      amount: paymentAmount,
      method: paymentForm.method,
      note: paymentForm.note
    });

    closePaymentModal();
    alert('Thanh toán đã được ghi nhận thành công!');
  };

  const openAppointmentModal = (treatment: Treatment) => {
    // Sync appointments from context
    const contextAppointments = getAppointmentsForTreatment(treatment.id);
    const updatedTreatment = {
      ...treatment,
      appointments: contextAppointments.map(apt => ({
        id: apt.id,
        treatmentId: apt.treatmentId || treatment.id,
        date: apt.date,
        time: apt.time,
        duration: apt.duration,
        staff: apt.staff,
        notes: apt.notes,
        status: apt.status as 'scheduled' | 'completed' | 'cancelled' | 'no-show',
        services: apt.services
      }))
    };

    setSelectedTreatment(updatedTreatment);
    setShowAppointmentModal(true);
  };

  const openAppointmentForm = (appointment?: Appointment) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setAppointmentForm({
        date: appointment.date,
        time: appointment.time,
        duration: appointment.duration,
        staff: appointment.staff || '',
        notes: appointment.notes || '',
        services: [...appointment.services]
      });
    } else {
      setEditingAppointment(null);
      setAppointmentForm({
        date: '',
        time: '',
        duration: 90,
        staff: '',
        notes: '',
        services: selectedTreatment ? [...selectedTreatment.services] : []
      });
    }
    setShowAppointmentForm(true);
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTreatment || !appointmentForm.date || !appointmentForm.time) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const contextAppointmentData: ContextAppointment = {
      id: editingAppointment ? editingAppointment.id : Date.now(),
      treatmentId: selectedTreatment.id,
      date: appointmentForm.date,
      time: appointmentForm.time,
      duration: appointmentForm.duration,
      staff: appointmentForm.staff,
      notes: appointmentForm.notes,
      services: appointmentForm.services,
      status: editingAppointment ? editingAppointment.status : 'scheduled',
      customer: selectedTreatment.customer,
      service: appointmentForm.services.join(', '),
      totalPrice: selectedTreatment.totalValue,
      price: selectedTreatment.totalValue
    };

    if (editingAppointment) {
      updateAppointment(editingAppointment.id, contextAppointmentData);
    } else {
      addTreatmentAppointments([contextAppointmentData]);
    }

    // Update local treatment state
    setTreatments(prev => prev.map(t => {
      if (t.id === selectedTreatment.id) {
        const updatedAppointments = getAppointmentsForTreatment(selectedTreatment.id);
        const nextScheduled = updatedAppointments
          .filter(a => a.status === 'scheduled' && new Date(a.date) > new Date())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

        const completedCount = updatedAppointments.filter(a => a.status === 'completed').length;

        return {
          ...t,
          nextSession: nextScheduled ? nextScheduled.date : null,
          completedSessions: completedCount,
          progress: Math.round((completedCount / t.totalSessions) * 100)
        };
      }
      return t;
    }));

    setShowAppointmentForm(false);
    setEditingAppointment(null);
  };

  const updateAppointmentStatus = (appointmentId: number, newStatus: Appointment['status']) => {
    if (!selectedTreatment) return;

    updateAppointment(appointmentId, { status: newStatus });

    // Update local treatment state
    setTreatments(prev => prev.map(t => {
      if (t.id === selectedTreatment.id) {
        const updatedAppointments = getAppointmentsForTreatment(selectedTreatment.id);
        const completedCount = updatedAppointments.filter(a => a.status === 'completed').length;
        const nextScheduled = updatedAppointments
          .filter(a => a.status === 'scheduled' && new Date(a.date) > new Date())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

        return {
          ...t,
          completedSessions: completedCount,
          progress: Math.round((completedCount / t.totalSessions) * 100),
          nextSession: nextScheduled ? nextScheduled.date : null
        };
      }
      return t;
    }));

    // Update selectedTreatment for real-time UI update
    const updatedAppointments = getAppointmentsForTreatment(selectedTreatment.id);
    setSelectedTreatment(prev => prev ? {
      ...prev,
      appointments: updatedAppointments.map(apt => ({
        id: apt.id,
        treatmentId: apt.treatmentId || selectedTreatment.id,
        date: apt.date,
        time: apt.time,
        duration: apt.duration,
        staff: apt.staff,
        notes: apt.notes,
        status: apt.status as 'scheduled' | 'completed' | 'cancelled' | 'no-show',
        services: apt.services
      }))
    } : null);
  };

  const deleteAppointment = (appointmentId: number) => {
    if (!selectedTreatment) return;

    deleteAppointmentFromContext(appointmentId);

    // Update local treatment state
    setTreatments(prev => prev.map(t => {
      if (t.id === selectedTreatment.id) {
        const updatedAppointments = getAppointmentsForTreatment(selectedTreatment.id);
        const completedCount = updatedAppointments.filter(a => a.status === 'completed').length;
        const nextScheduled = updatedAppointments
          .filter(a => a.status === 'scheduled' && new Date(a.date) > new Date())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

        return {
          ...t,
          completedSessions: completedCount,
          progress: Math.round((completedCount / t.totalSessions) * 100),
          nextSession: nextScheduled ? nextScheduled.date : null
        };
      }
      return t;
    }));
  };

  const getAppointmentStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAppointmentStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'Đã lên lịch';
      case 'completed': return 'Đã hoàn thành';
      case 'cancelled': return 'Đã hủy';
      case 'no-show': return 'Không đến';
      default: return 'Không xác định';
    }
  };

  const stats = {
    active: treatments.filter(t => t.status === 'active').length,
    completed: treatments.filter(t => t.status === 'completed').length,
    totalValue: treatments.reduce((sum, t) => sum + parseFloat(t.totalValue.replace(/,/g, '')), 0) / 1000000,
    completionRate: Math.round(
      (treatments.reduce((sum, t) => sum + t.progress, 0) / treatments.length) || 0
    )
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm liệu trình..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo liệu trình</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang thực hiện</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hoàn thành</p>
              <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng giá trị</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalValue.toFixed(1)}M</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
              <p className="text-2xl font-bold text-orange-600">{stats.completionRate}%</p>
            </div>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatments List */}
      <div className="space-y-4">
        {filteredTreatments.map((treatment) => (
          <div key={treatment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Treatment Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{treatment.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{treatment.customer}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{treatment.startDate} - {treatment.endDate}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(treatment.status)}`}>
                    {getStatusText(treatment.status)}
                  </span>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {treatment.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Tiến độ</span>
                    <span className="text-sm font-medium text-gray-900">
                      {treatment.completedSessions}/{treatment.totalSessions} buổi
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${treatment.progress}%` }}
                    ></div>
                  </div>
                </div>

                {(() => {
                  const paymentData = getTreatmentPayment(treatment.id);
                  if (!paymentData) return null;

                  return (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Tình trạng thanh toán</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(paymentData.paymentStatus)}`}>
                          {getPaymentStatusText(paymentData.paymentStatus)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Đã thanh toán:</span>
                          <p className="font-semibold text-green-600">{formatCurrency(paymentData.paidAmount)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Còn lại:</span>
                          <p className={`font-semibold ${paymentData.remainingAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {formatCurrency(paymentData.remainingAmount)}
                          </p>
                        </div>
                      </div>

                      {paymentData.remainingAmount > 0 && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(paymentData.paidAmount / paymentData.totalAmount) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                            <span>{Math.round((paymentData.paidAmount / paymentData.totalAmount) * 100)}% đã thanh toán</span>
                            <span>Tổng: {formatCurrency(paymentData.totalAmount)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Next Session & Value */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                  <div className="text-gray-600">
                    {treatment.nextSession ? (
                      <>Buổi tiếp theo: <span className="font-medium text-gray-900">{treatment.nextSession}</span></>
                    ) : (
                      <span className="text-green-600 font-medium">Đã hoàn thành</span>
                    )}
                  </div>
                  <div className="text-gray-900 font-semibold">
                    Giá trị: {treatment.totalValue}đ
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2 min-w-[120px]">
                <button
                  onClick={() => openAppointmentModal(treatment)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Lịch hẹn</span>
                </button>
                <button
                  onClick={() => openPaymentModal(treatment)}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Thanh toán</span>
                </button>
                <button
                  onClick={() => window.location.href = `#invoices?treatmentId=${treatment.id}&customerId=${customers.find(c => c.name === treatment.customer)?.id}`}
                  className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <FileText className="w-4 h-4" />
                  <span>Tạo hóa đơn</span>
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(treatment)}
                    className="flex-1 px-3 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(treatment.id)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {treatment.status === 'active' && (
                  <button
                    onClick={() => {
                      setSelectedTreatment(treatment);
                      openAppointmentForm();
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Đặt lịch</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingTreatment ? 'Sửa liệu trình' : 'Tạo liệu trình mới'}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên liệu trình *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: Liệu trình trị mụn 3 tháng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khách hàng *
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.customerId || ''}
                      onChange={(e) => handleCustomerSelect(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Chọn khách hàng</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} - {customer.phone} ({customer.membershipLevel})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>

                  {/* Selected customer preview */}
                  {formData.customerId && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      {(() => {
                        const selectedCustomer = customers.find(c => c.id === formData.customerId);
                        return selectedCustomer ? (
                          <div className="flex items-center space-x-3">
                            <img
                              src={selectedCustomer.avatar}
                              alt={selectedCustomer.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{selectedCustomer.name}</p>
                              <div className="flex items-center space-x-2">
                                <p className="text-sm text-gray-600">{selectedCustomer.phone}</p>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMembershipColor(selectedCustomer.membershipLevel)}`}>
                                  {selectedCustomer.membershipLevel}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày bắt đầu *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày kết thúc *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tổng số buổi
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalSessions}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalSessions: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá trị (VNĐ)
                </label>
                <input
                  type="text"
                  value={formData.totalValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalValue: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="VD: 15,600,000"
                />
              </div>
            </div>

            {/* Scheduling Options */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lịch hẹn ��ịnh kỳ</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kiểu lịch hẹn
                  </label>
                  <select
                    value={formData.scheduleType}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduleType: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="manual">Thủ công</option>
                    <option value="weekly">Hàng tu���n</option>
                    <option value="monthly">Hàng tháng</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giờ hẹn
                  </label>
                  <input
                    type="time"
                    value={formData.recurringTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, recurringTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời gian buổi (phút)
                  </label>
                  <select
                    value={formData.sessionDuration}
                    onChange={(e) => setFormData(prev => ({ ...prev, sessionDuration: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="30">30 phút</option>
                    <option value="45">45 phút</option>
                    <option value="60">60 phút</option>
                    <option value="90">90 phút</option>
                    <option value="120">120 ph��t</option>
                    <option value="180">180 phút</option>
                  </select>
                </div>
              </div>

              {formData.scheduleType === 'weekly' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày trong tuần
                    </label>
                    <select
                      value={formData.weekDay}
                      onChange={(e) => setFormData(prev => ({ ...prev, weekDay: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="1">Thứ Hai</option>
                      <option value="2">Thứ Ba</option>
                      <option value="3">Thứ Tư</option>
                      <option value="4">Thứ Năm</option>
                      <option value="5">Thứ Sáu</option>
                      <option value="6">Thứ Bảy</option>
                      <option value="0">Chủ Nhật</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nhân viên ưu tiên
                    </label>
                    <input
                      type="text"
                      value={formData.preferredStaff}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredStaff: e.target.value }))}
                      placeholder="VD: Nguyễn Mai"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {formData.scheduleType === 'monthly' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày trong tháng
                    </label>
                    <select
                      value={formData.monthDay}
                      onChange={(e) => setFormData(prev => ({ ...prev, monthDay: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>Ngày {day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nhân viên ưu tiên
                    </label>
                    <input
                      type="text"
                      value={formData.preferredStaff}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredStaff: e.target.value }))}
                      placeholder="VD: Nguyễn Mai"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {formData.scheduleType !== 'manual' && formData.startDate && formData.endDate && formData.totalSessions > 0 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Tự động tạo lịch hẹn</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          {formData.scheduleType === 'weekly' && formData.weekDay !== undefined && (
                            <>Hệ thống sẽ tự động tạo {formData.totalSessions} lịch hẹn vào {
                              ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][formData.weekDay]
                            } hàng tuần l��c {formData.recurringTime}</>
                          )}
                          {formData.scheduleType === 'monthly' && formData.monthDay !== undefined && (
                            <>Hệ thống sẽ tự động tạo {formData.totalSessions} lịch hẹn vào ngày {formData.monthDay} hàng tháng lúc {formData.recurringTime}</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Preview generated appointments */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center space-x-2">
                      <ClipboardCheck className="w-4 h-4" />
                      <span>Xem trước lịch hẹn sẽ được tạo ({(() => {
                        const previewAppointments = generateRecurringAppointments(0);
                        return previewAppointments.length;
                      })()}/{formData.totalSessions} buổi)</span>
                    </h4>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {(() => {
                        const previewAppointments = generateRecurringAppointments(0);
                        return previewAppointments.slice(0, 10).map((apt, index) => (
                          <div key={index} className="flex items-center justify-between bg-white rounded p-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </span>
                              <span className="font-medium">{apt.date}</span>
                              <span className="text-gray-600">{apt.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500">{apt.duration}p</span>
                              {apt.staff && (
                                <span className="text-blue-600 text-xs">{apt.staff}</span>
                              )}
                            </div>
                          </div>
                        ));
                      })()}
                      {(() => {
                        const previewAppointments = generateRecurringAppointments(0);
                        return previewAppointments.length > 10 && (
                          <div className="text-center text-sm text-gray-500 py-2">
                            ... và {previewAppointments.length - 10} buổi nữa
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dịch vụ
                </label>
                
                {/* Service Selection */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {availableServices.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => addPredefinedService(service)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          formData.services.includes(service)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Service Input */}
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={serviceInput}
                    onChange={(e) => setServiceInput(e.target.value)}
                    placeholder="Thêm dịch vụ khác..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                  />
                  <button
                    type="button"
                    onClick={addService}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Selected Services */}
                {formData.services.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {service}
                        <button
                          type="button"
                          onClick={() => removeService(service)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingTreatment ? 'Cập nhật' : 'Tạo mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Xác nhận xóa liệu trình
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có ch��c chắn muốn x��a liệu trình này? Hành động này không thể hoàn tác.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Management Modal */}
      {showAppointmentModal && selectedTreatment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Quản lý lịch hẹn</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedTreatment.name} - {selectedTreatment.customer}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => openAppointmentForm()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm lịch hẹn</span>
                </button>
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[75vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Appointments */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Lịch hẹn sắp tới</span>
                  </h3>
                  <div className="space-y-3">
                    {selectedTreatment.appointments
                      .filter(apt => apt.status === 'scheduled' && new Date(apt.date) >= new Date())
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((appointment) => (
                      <div key={appointment.id} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-medium text-gray-900">{appointment.date}</p>
                            <p className="text-sm text-gray-600">{appointment.time} - {appointment.duration} phút</p>
                            {appointment.staff && (
                              <p className="text-sm text-gray-600">NV: {appointment.staff}</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openAppointmentForm(appointment)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteAppointment(appointment.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {appointment.services.map((service, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                              {service}
                            </span>
                          ))}
                        </div>

                        {appointment.notes && (
                          <p className="text-sm text-gray-600 mb-3">{appointment.notes}</p>
                        )}

                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Hoàn thành
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'no-show')}
                            className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-lg hover:bg-yellow-700 transition-colors"
                          >
                            Không đến
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completed Appointments */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <UserCheck className="w-5 h-5 text-green-600" />
                    <span>Lịch sử thực hiện</span>
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {selectedTreatment.appointments
                      .filter(apt => apt.status !== 'scheduled' || new Date(apt.date) < new Date())
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((appointment) => (
                      <div key={appointment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{appointment.date}</p>
                            <p className="text-sm text-gray-600">{appointment.time} - {appointment.duration} phút</p>
                            {appointment.staff && (
                              <p className="text-sm text-gray-600">NV: {appointment.staff}</p>
                            )}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAppointmentStatusColor(appointment.status)}`}>
                            {getAppointmentStatusText(appointment.status)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-2">
                          {appointment.services.map((service, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-md">
                              {service}
                            </span>
                          ))}
                        </div>

                        {appointment.notes && (
                          <p className="text-sm text-gray-600">{appointment.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Appointment Modal */}
      {showAppointmentForm && selectedTreatment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingAppointment ? 'Sửa lịch hẹn' : 'Thêm lịch hẹn mới'}
              </h2>
              <button
                onClick={() => setShowAppointmentForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAppointmentSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày hẹn *
                  </label>
                  <input
                    type="date"
                    required
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giờ hẹn *
                  </label>
                  <input
                    type="time"
                    required
                    value={appointmentForm.time}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời gian (phút)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="240"
                    step="15"
                    value={appointmentForm.duration}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, duration: parseInt(e.target.value) || 90 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhân viên thực hiện
                  </label>
                  <input
                    type="text"
                    value={appointmentForm.staff}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, staff: e.target.value }))}
                    placeholder="VD: Nguyễn Mai"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dịch vụ thực hiện
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedTreatment.services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => {
                        const isSelected = appointmentForm.services.includes(service);
                        setAppointmentForm(prev => ({
                          ...prev,
                          services: isSelected
                            ? prev.services.filter(s => s !== service)
                            : [...prev.services, service]
                        }));
                      }}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        appointmentForm.services.includes(service)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={appointmentForm.notes}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Ghi chú về buổi hẹn..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAppointmentForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingAppointment ? 'Cập nhật' : 'Thêm lịch hẹn'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedTreatmentForPayment && (() => {
        const paymentData = getTreatmentPayment(selectedTreatmentForPayment.id);
        if (!paymentData) return null;

        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <span>Thanh toán liệu trình</span>
                </h2>
                <button
                  onClick={closePaymentModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {/* Treatment Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedTreatmentForPayment.name}</h3>
                  <p className="text-gray-600 mb-3">Khách hàng: {selectedTreatmentForPayment.customer}</p>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Tổng giá trị:</span>
                      <p className="font-semibold text-gray-900">{formatCurrency(paymentData.totalAmount)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Đã thanh toán:</span>
                      <p className="font-semibold text-green-600">{formatCurrency(paymentData.paidAmount)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Còn lại:</span>
                      <p className="font-semibold text-red-600">{formatCurrency(paymentData.remainingAmount)}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(paymentData.paidAmount / paymentData.totalAmount) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((paymentData.paidAmount / paymentData.totalAmount) * 100)}% đã thanh toán
                    </p>
                  </div>
                </div>

                {/* Payment History */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Lịch sử thanh toán</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {paymentData.paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                          <p className="text-xs text-gray-500">{payment.date} - {payment.method}</p>
                          {payment.note && <p className="text-xs text-gray-400">{payment.note}</p>}
                          {payment.invoiceId && (
                            <p className="text-xs text-blue-600">Từ hóa đơn: {payment.invoiceId}</p>
                          )}
                        </div>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          {payment.method === 'cash' ? 'Tiền mặt' : payment.method === 'transfer' ? 'Chuyển khoản' : 'Thẻ'}
                        </span>
                      </div>
                    ))}
                    {paymentData.paymentHistory.length === 0 && (
                      <p className="text-gray-500 text-sm text-center py-4">Chưa có giao dịch nào</p>
                    )}
                  </div>
                </div>

                {/* Payment Form */}
                {paymentData.remainingAmount > 0 && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <h4 className="font-medium text-gray-900">Thêm thanh toán mới</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số tiền thanh toán *
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          max={paymentData.remainingAmount}
                          value={paymentForm.amount}
                          onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="VD: 1000000"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Tối đa: {formatCurrency(paymentData.remainingAmount)}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phương thức *
                        </label>
                        <select
                          value={paymentForm.method}
                          onChange={(e) => setPaymentForm(prev => ({ ...prev, method: e.target.value as 'cash' | 'transfer' | 'card' }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="cash">Tiền mặt</option>
                          <option value="transfer">Chuyển khoản</option>
                          <option value="card">Thẻ</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ghi chú
                      </label>
                      <input
                        type="text"
                        value={paymentForm.note}
                        onChange={(e) => setPaymentForm(prev => ({ ...prev, note: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="VD: Thanh toán buổi 10-12"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={closePaymentModal}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>Xác nhận thanh toán</span>
                      </button>
                    </div>
                  </form>
                )}

                {paymentData.remainingAmount === 0 && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-600 mb-2">Đã thanh toán đầy đủ</h3>
                    <p className="text-gray-600">Liệu trình này đã được thanh toán hoàn tất.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Treatments;

import React, { useState } from 'react';
import { Calendar, Clock, Plus, Filter, ChevronLeft, ChevronRight, X, Edit, Trash2, Eye, User, Phone } from 'lucide-react';
import AppointmentForm from './AppointmentForm';

interface Appointment {
  id: number;
  time: string;
  duration: number;
  customer: string;
  customerPhone?: string;
  service: string;
  staff: string;
  status: 'confirmed' | 'in-progress' | 'pending' | 'cancelled' | 'completed';
  price: string;
  notes?: string;
  date: string;
}

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      time: '09:00',
      duration: 90,
      customer: 'Nguyễn Thu Hà',
      customerPhone: '0901234567',
      service: 'Chăm sóc da mặt Premium',
      staff: 'Nguyễn Mai',
      status: 'confirmed',
      price: '800K',
      date: new Date().toISOString().split('T')[0],
      notes: 'Khách hàng VIP, cần chú ý đặc biệt'
    },
    {
      id: 2,
      time: '10:30',
      duration: 120,
      customer: 'Trần Mai Linh',
      customerPhone: '0912345678',
      service: 'Massage toàn thân + Tắm trắng',
      staff: 'Lê Hoa',
      status: 'in-progress',
      price: '1.2M',
      date: new Date().toISOString().split('T')[0],
      notes: 'Đang thực hiện'
    },
    {
      id: 3,
      time: '14:00',
      duration: 60,
      customer: 'Lê Minh Châu',
      customerPhone: '0923456789',
      service: 'Điều trị mụn',
      staff: 'Trần An',
      status: 'pending',
      price: '500K',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 4,
      time: '15:30',
      duration: 180,
      customer: 'Phạm Thị Lan',
      customerPhone: '0934567890',
      service: 'Gói chăm sóc VIP',
      staff: 'Nguyễn Mai',
      status: 'confirmed',
      price: '2.5M',
      date: new Date().toISOString().split('T')[0],
      notes: 'Gói combo 3 dịch vụ'
    },
  ]);

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'border-l-green-500 bg-green-50';
      case 'in-progress': return 'border-l-blue-500 bg-blue-50';
      case 'pending': return 'border-l-yellow-500 bg-yellow-50';
      case 'cancelled': return 'border-l-red-500 bg-red-50';
      case 'completed': return 'border-l-gray-500 bg-gray-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận';
      case 'in-progress': return 'Đang thực hiện';
      case 'pending': return 'Chờ xác nhận';
      case 'cancelled': return 'Đã hủy';
      case 'completed': return 'Hoàn thành';
      default: return status;
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const isToday = appointmentDate.toDateString() === currentDate.toDateString();
    const statusMatch = filterStatus === 'all' || appointment.status === filterStatus;
    return isToday && statusMatch;
  });

  const openAppointmentModal = (appointment?: Appointment) => {
    setSelectedAppointment(appointment || null);
    setIsEditing(!!appointment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setIsEditing(false);
  };

  const handleSaveAppointment = (appointmentData: Partial<Appointment>) => {
    if (isEditing && selectedAppointment) {
      setAppointments(prev => prev.map(apt =>
        apt.id === selectedAppointment.id
          ? { ...apt, ...appointmentData }
          : apt
      ));
    } else {
      const newAppointment: Appointment = {
        id: Date.now(),
        date: currentDate.toISOString().split('T')[0],
        status: 'pending',
        ...appointmentData
      } as Appointment;
      setAppointments(prev => [...prev, newAppointment]);
    }
    closeModal();
  };

  const deleteAppointment = (id: number) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const updateAppointmentStatus = (id: number, status: Appointment['status']) => {
    setAppointments(prev => prev.map(apt =>
      apt.id === id ? { ...apt, status } : apt
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateDate('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 min-w-[300px] text-center">
              {currentDate.toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            <button
              onClick={() => navigateDate('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Hôm nay
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['day', 'week', 'month'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  viewMode === mode
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode === 'day' ? 'Ngày' : mode === 'week' ? 'Tuần' : 'Tháng'}
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="w-4 h-4" />
              <span>Lọc</span>
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  {['all', 'confirmed', 'in-progress', 'pending', 'cancelled', 'completed'].map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilterStatus(status);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors ${
                        filterStatus === status ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {status === 'all' ? 'Tất cả' : getStatusText(status)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => openAppointmentModal()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Đặt lịch</span>
          </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-12 gap-0">
          {/* Time Column */}
          <div className="col-span-2 border-r border-gray-200">
            <div className="h-16 border-b border-gray-200 flex items-center justify-center bg-gray-50">
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            {timeSlots.map((time) => (
              <div key={time} className="h-20 border-b border-gray-200 flex items-start justify-center pt-2">
                <span className="text-sm text-gray-600 font-medium">{time}</span>
              </div>
            ))}
          </div>

          {/* Appointments Column */}
          <div className="col-span-10">
            <div className="h-16 border-b border-gray-200 flex items-center px-4 bg-gray-50">
              <h3 className="font-medium text-gray-900">Lịch hẹn hôm nay</h3>
            </div>
            <div className="relative">
              {timeSlots.map((time, index) => (
                <div key={time} className="h-20 border-b border-gray-200 relative">
                  {filteredAppointments
                    .filter(apt => apt.time === time)
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`absolute left-2 right-2 top-1 border-l-4 rounded-lg p-3 ${getStatusColor(appointment.status)} hover:shadow-md transition-shadow duration-200 cursor-pointer group`}
                        style={{
                          height: `${(appointment.duration / 60) * 80 - 8}px`,
                          zIndex: 10
                        }}
                        onClick={() => openAppointmentModal(appointment)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-900 text-sm truncate">
                            {appointment.customer}
                          </h4>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-600">{appointment.price}</span>
                            <div className="hidden group-hover:flex items-center space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openAppointmentModal(appointment);
                                }}
                                className="p-1 hover:bg-white rounded transition-colors"
                              >
                                <Edit className="w-3 h-3 text-gray-600" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm('Bạn có chắc chắn muốn xóa lịch hẹn này?')) {
                                    deleteAppointment(appointment.id);
                                  }
                                }}
                                className="p-1 hover:bg-white rounded transition-colors"
                              >
                                <Trash2 className="w-3 h-3 text-red-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 truncate mb-1">
                          {appointment.service}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500">
                            {appointment.staff} • {appointment.duration}ph
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng lịch hẹn</p>
              <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã hoàn thành</p>
              <p className="text-2xl font-bold text-green-600">
                {appointments.filter(apt => apt.status === 'completed').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang thực hiện</p>
              <p className="text-2xl font-bold text-blue-600">
                {appointments.filter(apt => apt.status === 'in-progress').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chờ xác nhận</p>
              <p className="text-2xl font-bold text-yellow-600">
                {appointments.filter(apt => apt.status === 'pending').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isEditing ? 'Chỉnh sửa lịch hẹn' : 'Thêm lịch hẹn mới'}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <AppointmentForm
                appointment={selectedAppointment}
                onSave={handleSaveAppointment}
                onCancel={closeModal}
                isEditing={isEditing}
                onUpdateStatus={updateAppointmentStatus}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;

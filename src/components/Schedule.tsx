import React, { useState } from 'react';
import { Calendar, Clock, Plus, Filter, ChevronLeft, ChevronRight, X, Edit, Trash2, Eye, User, Phone } from 'lucide-react';
import AppointmentForm from './AppointmentForm';

interface Appointment {
  id: number;
  time: string;
  duration: number;
  customer: string;
  customerId?: number;
  customerPhone?: string;
  service: string; // Keep for backward compatibility
  services?: string[]; // New multiple services field
  staff: string;
  status: 'confirmed' | 'in-progress' | 'pending' | 'cancelled' | 'completed';
  price: string; // Keep for backward compatibility
  totalPrice?: string; // New total price field
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
      customerId: 1,
      customerPhone: '0901234567',
      service: 'Chăm sóc da mặt Premium',
      services: ['Chăm sóc da mặt Premium'],
      staff: 'Nguyễn Mai',
      status: 'confirmed',
      price: '800K',
      totalPrice: '800K',
      date: new Date().toISOString().split('T')[0],
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
      date: new Date().toISOString().split('T')[0]
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

  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Start from Monday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getMonthDates = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }
    return dates;
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      const isDateMatch = appointmentDate.toDateString() === date.toDateString();
      const statusMatch = filterStatus === 'all' || appointment.status === filterStatus;
      return isDateMatch && statusMatch;
    });
  };

  const formatDateHeader = () => {
    if (viewMode === 'day') {
      return currentDate.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else if (viewMode === 'week') {
      const weekDates = getWeekDates(currentDate);
      const start = weekDates[0];
      const end = weekDates[6];
      return `Tuần ${start.getDate()}/${start.getMonth() + 1} - ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`;
    } else {
      return currentDate.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long'
      });
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    let dateMatch = false;

    if (viewMode === 'day') {
      dateMatch = appointmentDate.toDateString() === currentDate.toDateString();
    } else if (viewMode === 'week') {
      const weekDates = getWeekDates(currentDate);
      dateMatch = weekDates.some(date => date.toDateString() === appointmentDate.toDateString());
    } else if (viewMode === 'month') {
      dateMatch = appointmentDate.getMonth() === currentDate.getMonth() &&
                  appointmentDate.getFullYear() === currentDate.getFullYear();
    }

    const statusMatch = filterStatus === 'all' || appointment.status === filterStatus;
    return dateMatch && statusMatch;
  });

  const openAppointmentModal = (appointment?: Appointment, selectedDate?: Date) => {
    if (appointment) {
      setSelectedAppointment(appointment);
      setIsEditing(true);
    } else {
      // For new appointments, create a template with the selected or current date
      const appointmentDate = selectedDate || currentDate;
      setSelectedAppointment({
        id: 0,
        date: appointmentDate.toISOString().split('T')[0],
        time: '',
        duration: 60,
        customer: '',
        service: '',
        services: [],
        staff: '',
        status: 'pending',
        price: '',
        totalPrice: '',
        notes: ''
      });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const createAppointmentAtTime = (date: Date, time?: string) => {
    setSelectedAppointment({
      id: 0,
      date: date.toISOString().split('T')[0],
      time: time || '',
      duration: 60,
      customer: '',
      service: '',
      services: [],
      staff: '',
      status: 'pending',
      price: '',
      totalPrice: '',
      notes: ''
    });
    setIsEditing(false);
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
              {formatDateHeader()}
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
            onClick={() => openAppointmentModal(undefined, currentDate)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Đặt lịch</span>
          </button>
        </div>
      </div>

      {/* Schedule Views */}
      {viewMode === 'day' && (
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
                {timeSlots.map((time, index) => {
                  const timeAppointments = filteredAppointments.filter(apt => apt.time === time);
                  return (
                    <div
                      key={time}
                      className="h-20 border-b border-gray-200 relative group cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={(e) => {
                        // Only create appointment if clicking on empty space
                        if (e.target === e.currentTarget || e.currentTarget.contains(e.target as Node)) {
                          if (timeAppointments.length === 0) {
                            createAppointmentAtTime(currentDate, time);
                          }
                        }
                      }}
                    >
                      {/* Empty time slot indicator */}
                      {timeAppointments.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="flex items-center space-x-2 text-blue-600 text-sm">
                            <Plus className="w-4 h-4" />
                            <span>Thêm lịch hẹn lúc {time}</span>
                          </div>
                        </div>
                      )}

                      {timeAppointments.map((appointment) => (
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
                              <span className="text-xs text-gray-600">{appointment.totalPrice || appointment.price}</span>
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
                          <div className="text-xs text-gray-600 mb-1">
                            {appointment.services && appointment.services.length > 1 ? (
                              <div>
                                <span className="font-medium">{appointment.services.length} dịch vụ:</span>
                                <div className="mt-1 space-y-1">
                                  {appointment.services.slice(0, 2).map((service, idx) => (
                                    <div key={idx} className="truncate">• {service}</div>
                                  ))}
                                  {appointment.services.length > 2 && (
                                    <div className="text-blue-600">+{appointment.services.length - 2} dịch vụ khác</div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="truncate">{appointment.services?.[0] || appointment.service}</div>
                            )}
                          </div>
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Week View */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-8 gap-0">
            {/* Time Column */}
            <div className="col-span-1 border-r border-gray-200">
              <div className="h-16 border-b border-gray-200 flex items-center justify-center bg-gray-50">
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
              {timeSlots.slice(0, 8).map((time) => (
                <div key={time} className="h-16 border-b border-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-medium">{time}</span>
                </div>
              ))}
            </div>

            {/* Week Days */}
            {getWeekDates(currentDate).map((date, dayIndex) => (
              <div key={dayIndex} className="col-span-1 border-r border-gray-200 last:border-r-0">
                <div className="h-16 border-b border-gray-200 flex flex-col items-center justify-center bg-gray-50">
                  <span className="text-xs text-gray-500">
                    {date.toLocaleDateString('vi-VN', { weekday: 'short' })}
                  </span>
                  <span className={`text-sm font-medium ${
                    date.toDateString() === new Date().toDateString()
                      ? 'text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center'
                      : 'text-gray-900'
                  }`}>
                    {date.getDate()}
                  </span>
                </div>

                {timeSlots.slice(0, 8).map((time) => {
                  const dayAppointments = getAppointmentsForDate(date).filter(apt => apt.time === time);
                  return (
                    <div
                      key={time}
                      className="h-16 border-b border-gray-200 relative p-1 group cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={(e) => {
                        if (dayAppointments.length === 0 && e.target === e.currentTarget) {
                          createAppointmentAtTime(date, time);
                        }
                      }}
                    >
                      {/* Empty slot indicator */}
                      {dayAppointments.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <Plus className="w-3 h-3 text-blue-600" />
                        </div>
                      )}

                      {dayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`absolute inset-1 border-l-2 rounded text-xs p-1 cursor-pointer hover:shadow-sm ${getStatusColor(appointment.status)}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openAppointmentModal(appointment);
                          }}
                          title={`${appointment.customer} - ${appointment.services?.[0] || appointment.service}`}
                        >
                          <div className="truncate font-medium">{appointment.customer}</div>
                          <div className="truncate text-xs opacity-75">{appointment.time}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Month View */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Month Header */}
          <div className="grid grid-cols-7 gap-0 border-b border-gray-200">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50 border-r border-gray-200 last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-7 gap-0">
            {(() => {
              const monthDates = getMonthDates(currentDate);
              const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
              const startPadding = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Monday = 0

              // Add empty cells for padding
              const cells = [];
              for (let i = 0; i < startPadding; i++) {
                cells.push(<div key={`padding-${i}`} className="h-24 border-b border-r border-gray-200"></div>);
              }

              // Add month days
              monthDates.forEach((date) => {
                const dayAppointments = getAppointmentsForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();

                cells.push(
                  <div
                    key={date.getDate()}
                    className="h-24 border-b border-r border-gray-200 last:border-r-0 p-1 group cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={(e) => {
                      if (e.target === e.currentTarget || (!e.target.closest('.appointment-item'))) {
                        createAppointmentAtTime(date);
                      }
                    }}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isToday ? 'text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center' : 'text-gray-900'
                    }`}>
                      {date.getDate()}
                    </div>

                    {/* Empty day indicator */}
                    {dayAppointments.length === 0 && (
                      <div className="flex items-center justify-center h-12 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center space-x-1 text-blue-600 text-xs">
                          <Plus className="w-3 h-3" />
                          <span>Thêm lịch</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1 overflow-hidden">
                      {dayAppointments.slice(0, 3).map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`appointment-item text-xs p-1 rounded border-l-2 cursor-pointer hover:shadow-sm ${getStatusColor(appointment.status)}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openAppointmentModal(appointment);
                          }}
                          title={`${appointment.time} - ${appointment.customer}: ${appointment.services?.[0] || appointment.service}`}
                        >
                          <div className="truncate font-medium">{appointment.time} {appointment.customer}</div>
                        </div>
                      ))}
                      {dayAppointments.length > 3 && (
                        <div className="text-xs text-blue-600 font-medium">
                          +{dayAppointments.length - 3} khác
                        </div>
                      )}
                    </div>
                  </div>
                );
              });

              return cells;
            })()}
          </div>
        </div>
      )}

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

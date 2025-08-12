import React, { useState } from 'react';
import { Calendar, Clock, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  const appointments = [
    {
      id: 1,
      time: '09:00',
      duration: 90,
      customer: 'Nguyễn Thu Hà',
      service: 'Chăm sóc da mặt Premium',
      staff: 'Nguyễn Mai',
      status: 'confirmed',
      price: '800K'
    },
    {
      id: 2,
      time: '10:30',
      duration: 120,
      customer: 'Trần Mai Linh',
      service: 'Massage toàn thân + Tắm trắng',
      staff: 'Lê Hoa',
      status: 'in-progress',
      price: '1.2M'
    },
    {
      id: 3,
      time: '14:00',
      duration: 60,
      customer: 'Lê Minh Châu',
      service: 'Điều trị mụn',
      staff: 'Trần An',
      status: 'pending',
      price: '500K'
    },
    {
      id: 4,
      time: '15:30',
      duration: 180,
      customer: 'Phạm Thị Lan',
      service: 'Gói chăm sóc VIP',
      staff: 'Nguyễn Mai',
      status: 'confirmed',
      price: '2.5M'
    },
  ];

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
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {currentDate.toLocaleDateString('vi-VN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
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
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Filter className="w-4 h-4" />
            <span>Lọc</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
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
                  {appointments
                    .filter(apt => apt.time === time)
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`absolute left-2 right-2 top-1 border-l-4 rounded-lg p-3 ${getStatusColor(appointment.status)} hover:shadow-md transition-shadow duration-200 cursor-pointer`}
                        style={{ 
                          height: `${(appointment.duration / 60) * 80 - 8}px`,
                          zIndex: 10
                        }}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-900 text-sm truncate">
                            {appointment.customer}
                          </h4>
                          <span className="text-xs text-gray-600 ml-2">{appointment.price}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate mb-1">
                          {appointment.service}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appointment.staff} • {appointment.duration}ph
                        </p>
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
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã hoàn thành</p>
              <p className="text-2xl font-bold text-green-600">18</p>
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
              <p className="text-2xl font-bold text-blue-600">6</p>
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
              <p className="text-2xl font-bold text-yellow-600">4</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
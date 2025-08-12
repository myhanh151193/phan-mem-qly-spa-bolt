import React, { useState } from 'react';
import { Search, Plus, Calendar, User, ClipboardCheck } from 'lucide-react';

const Treatments: React.FC = () => {
  const treatments = [
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
      totalValue: '15,600,000'
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
      totalValue: '12,800,000'
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
      totalValue: '28,800,000'
    },
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm liệu trình..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          <span>Tạo liệu trình</span>
        </button>
      </div>

      {/* Treatments List */}
      <div className="space-y-4">
        {treatments.map((treatment) => (
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
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-1">
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Chi tiết</span>
                </button>
                {treatment.status === 'active' && treatment.nextSession && (
                  <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors duration-200">
                    Đặt lịch
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang thực hiện</p>
              <p className="text-2xl font-bold text-green-600">2</p>
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
              <p className="text-2xl font-bold text-blue-600">1</p>
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
              <p className="text-2xl font-bold text-purple-600">57.2M</p>
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
              <p className="text-2xl font-bold text-orange-600">75%</p>
            </div>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treatments;
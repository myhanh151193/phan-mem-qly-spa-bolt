import React, { useState } from 'react';
import { Search, Plus, User, Mail, Phone, Calendar, Edit, Eye } from 'lucide-react';

const Staff: React.FC = () => {
  const staff = [
    {
      id: 1,
      name: 'Nguyễn Thị Mai',
      position: 'Chuyên viên chăm sóc da',
      department: 'Điều trị',
      email: 'mai.nguyen@spa.com',
      phone: '0901234567',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=150',
      joinDate: '2023-06-15',
      salary: '15,000,000',
      status: 'active',
      specialties: ['Chăm sóc da mặt', 'Điều trị mụn', 'Tái tạo da'],
      rating: 4.8,
      totalServices: 156,
      branch: 'Chi nhánh Quận 1'
    },
    {
      id: 2,
      name: 'Lê Thanh Hoa',
      position: 'Massage Therapist',
      department: 'Massage',
      email: 'hoa.le@spa.com',
      phone: '0907654321',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=150',
      joinDate: '2023-04-22',
      salary: '12,000,000',
      status: 'active',
      specialties: ['Massage toàn thân', 'Massage thái', 'Massage đá nóng'],
      rating: 4.9,
      totalServices: 234,
      branch: 'Chi nhánh Quận 3'
    },
    {
      id: 3,
      name: 'Trần Minh An',
      position: 'Kỹ thuật viên',
      department: 'Làm đẹp',
      email: 'an.tran@spa.com',
      phone: '0912345678',
      avatar: 'https://images.pexels.com/photos/1037915/pexels-photo-1037915.jpeg?w=150',
      joinDate: '2023-08-10',
      salary: '10,000,000',
      status: 'on-leave',
      specialties: ['Tắm trắng', 'Triệt lông', 'RF giảm béo'],
      rating: 4.6,
      totalServices: 98,
      branch: 'Chi nhánh Thủ Đức'
    },
    {
      id: 4,
      name: 'Phạm Thu Hiền',
      position: 'Quản lý ca',
      department: 'Quản lý',
      email: 'hien.pham@spa.com',
      phone: '0909876543',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=150',
      joinDate: '2022-12-01',
      salary: '18,000,000',
      status: 'active',
      specialties: ['Quản lý vận hành', 'Đào tạo nhân viên', 'Chăm sóc khách hàng'],
      rating: 4.7,
      totalServices: 0,
      branch: 'Chi nhánh Quận 1'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang làm việc';
      case 'on-leave': return 'Đang nghỉ phép';
      case 'inactive': return 'Không hoạt động';
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
            placeholder="Tìm kiếm nhân viên..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          <span>Thêm nhân viên</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng nhân viên</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <User className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang làm việc</p>
              <p className="text-2xl font-bold text-green-600">20</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nghỉ phép</p>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đánh giá TB</p>
              <p className="text-2xl font-bold text-purple-600">4.7</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {staff.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.position}</p>
                  <p className="text-xs text-gray-500">{member.branch}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {getStatusText(member.status)}
                </span>
                <div className="flex space-x-1">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Gia nhập: {member.joinDate}</span>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Chuyên môn:</p>
              <div className="flex flex-wrap gap-2">
                {member.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{member.rating}</p>
                <p className="text-xs text-gray-500">Đánh giá</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{member.totalServices}</p>
                <p className="text-xs text-gray-500">Dịch vụ</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{member.salary}đ</p>
                <p className="text-xs text-gray-500">Lương</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
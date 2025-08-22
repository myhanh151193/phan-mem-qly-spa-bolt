import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Calendar, BarChart3, PieChart, User, Award, Target, TrendingDown, Filter, Download } from 'lucide-react';

interface ReportsProps {
  selectedBranch: string;
}

const Reports: React.FC<ReportsProps> = ({ selectedBranch }) => {
  const reportData = {
    revenue: {
      daily: '15.2M',
      weekly: '89.5M',
      monthly: '320.8M',
      growth: '+12.5%'
    },
    customers: {
      new: 24,
      returning: 156,
      total: 1234,
      retention: '78%'
    },
    services: {
      completed: 148,
      cancelled: 8,
      noShow: 3,
      satisfaction: '4.8/5'
    },
    staff: {
      active: 12,
      performance: '92%',
      avgRating: '4.7',
      utilization: '85%'
    }
  };

  const topServices = [
    { name: 'Chăm sóc da mặt Premium', revenue: '45.2M', sessions: 89, growth: '+15%' },
    { name: 'Massage toàn thân', revenue: '38.7M', sessions: 76, growth: '+8%' },
    { name: 'Tắm trắng toàn thân', revenue: '32.1M', sessions: 42, growth: '+22%' },
    { name: 'Điều trị mụn', revenue: '28.9M', sessions: 65, growth: '+5%' },
    { name: 'Liệu trình giảm béo', revenue: '25.3M', sessions: 28, growth: '+18%' },
  ];

  const monthlyRevenue = [
    { month: 'T7', value: 280 },
    { month: 'T8', value: 295 },
    { month: 'T9', value: 310 },
    { month: 'T10', value: 285 },
    { month: 'T11', value: 330 },
    { month: 'T12', value: 345 },
    { month: 'T1', value: 365 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Doanh thu tháng</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.revenue.monthly}</p>
              </div>
            </div>
            <span className="text-green-600 text-sm font-medium">{reportData.revenue.growth}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Khách hàng</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.customers.total}</p>
              </div>
            </div>
            <span className="text-blue-600 text-sm font-medium">+{reportData.customers.new} mới</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Dịch vụ hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.services.completed}</p>
              </div>
            </div>
            <span className="text-purple-600 text-sm font-medium">{reportData.services.satisfaction}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hiệu suất NV</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.staff.performance}</p>
              </div>
            </div>
            <span className="text-orange-600 text-sm font-medium">{reportData.staff.avgRating} ⭐</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Doanh thu 7 tháng qua</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {monthlyRevenue.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-8">{month.month}</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(month.value / 400) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12 text-right">{month.value}M</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top dịch vụ</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{service.name}</p>
                  <p className="text-xs text-gray-600">{service.sessions} buổi</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">{service.revenue}</p>
                  <span className="text-xs text-green-600">{service.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân tích khách hàng</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Khách mới</span>
              <span className="font-semibold text-blue-600">{reportData.customers.new}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Khách quay lại</span>
              <span className="font-semibold text-green-600">{reportData.customers.returning}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tỷ lệ giữ chân</span>
              <span className="font-semibold text-purple-600">{reportData.customers.retention}</span>
            </div>
          </div>
        </div>

        {/* Service Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiệu suất dịch vụ</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Hoàn thành</span>
              <span className="font-semibold text-green-600">{reportData.services.completed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Hủy bỏ</span>
              <span className="font-semibold text-red-600">{reportData.services.cancelled}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Không đến</span>
              <span className="font-semibold text-yellow-600">{reportData.services.noShow}</span>
            </div>
          </div>
        </div>

        {/* Staff Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiệu suất nhân viên</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nhân viên hoạt động</span>
              <span className="font-semibold text-blue-600">{reportData.staff.active}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tỷ lệ sử dụng</span>
              <span className="font-semibold text-green-600">{reportData.staff.utilization}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Đánh giá TB</span>
              <span className="font-semibold text-yellow-600">{reportData.staff.avgRating}/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

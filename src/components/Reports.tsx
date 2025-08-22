import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Calendar, BarChart3, PieChart, User, Award, Target, TrendingDown, Filter, Download } from 'lucide-react';

interface ReportsProps {
  selectedBranch: string;
}

const Reports: React.FC<ReportsProps> = ({ selectedBranch }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'employee'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [sortBy, setSortBy] = useState('revenue');

  // Branch-specific data
  const branchData = {
    'branch-1': {
      revenue: { daily: '6.2M', weekly: '38.5M', monthly: '145.3M', growth: '+15.2%' },
      customers: { new: 12, returning: 67, total: 456, retention: '82%' },
      services: { completed: 67, cancelled: 3, noShow: 1, satisfaction: '4.9/5' },
      staff: { active: 4, performance: '94%', avgRating: '4.8', utilization: '88%' }
    },
    'branch-2': {
      revenue: { daily: '4.8M', weekly: '28.2M', monthly: '98.7M', growth: '+10.3%' },
      customers: { new: 8, returning: 45, total: 312, retention: '75%' },
      services: { completed: 52, cancelled: 2, noShow: 1, satisfaction: '4.7/5' },
      staff: { active: 3, performance: '91%', avgRating: '4.7', utilization: '82%' }
    },
    'branch-3': {
      revenue: { daily: '2.9M', weekly: '15.8M', monthly: '58.2M', growth: '+8.7%' },
      customers: { new: 3, returning: 32, total: 287, retention: '76%' },
      services: { completed: 21, cancelled: 2, noShow: 1, satisfaction: '4.6/5' },
      staff: { active: 3, performance: '89%', avgRating: '4.6', utilization: '80%' }
    },
    'branch-4': {
      revenue: { daily: '1.3M', weekly: '7.0M', monthly: '18.6M', growth: '+12.8%' },
      customers: { new: 1, returning: 12, total: 179, retention: '79%' },
      services: { completed: 8, cancelled: 1, noShow: 0, satisfaction: '4.8/5' },
      staff: { active: 2, performance: '93%', avgRating: '4.9', utilization: '85%' }
    }
  };

  // Calculate aggregated data for all branches
  const aggregatedData = {
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

  // Get current report data based on selected branch
  const reportData = selectedBranch === 'all-branches'
    ? aggregatedData
    : branchData[selectedBranch as keyof typeof branchData] || aggregatedData;

  // Branch-specific top services
  const branchTopServices = {
    'branch-1': [
      { name: 'Chăm sóc da mặt Premium', revenue: '18.5M', sessions: 42, growth: '+18%' },
      { name: 'Massage toàn thân', revenue: '15.2M', sessions: 35, growth: '+12%' },
      { name: 'Tắm trắng toàn thân', revenue: '12.8M', sessions: 28, growth: '+25%' },
      { name: 'Điều trị mụn', revenue: '11.3M', sessions: 32, growth: '+8%' },
      { name: 'Liệu trình giảm béo', revenue: '9.8M', sessions: 15, growth: '+22%' },
    ],
    'branch-2': [
      { name: 'Massage toàn thân', revenue: '12.8M', sessions: 28, growth: '+10%' },
      { name: 'Chăm sóc da mặt Premium', revenue: '11.2M', sessions: 24, growth: '+15%' },
      { name: 'Tắm trắng toàn thân', revenue: '9.8M', sessions: 18, growth: '+20%' },
      { name: 'Điều trị mụn', revenue: '8.5M', sessions: 22, growth: '+5%' },
      { name: 'Liệu trình giảm béo', revenue: '7.2M', sessions: 8, growth: '+15%' },
    ],
    'branch-3': [
      { name: 'Chăm sóc da mặt Premium', revenue: '9.8M', sessions: 18, growth: '+12%' },
      { name: 'Massage toàn thân', revenue: '7.5M', sessions: 15, growth: '+8%' },
      { name: 'Điều trị mụn', revenue: '6.2M', sessions: 12, growth: '+3%' },
      { name: 'Tắm trắng toàn thân', revenue: '5.8M', sessions: 8, growth: '+18%' },
      { name: 'Liệu trình giảm béo', revenue: '4.5M', sessions: 6, growth: '+10%' },
    ],
    'branch-4': [
      { name: 'Massage toàn thân', revenue: '3.2M', sessions: 8, growth: '+15%' },
      { name: 'Chăm sóc da mặt Premium', revenue: '2.8M', sessions: 6, growth: '+12%' },
      { name: 'Điều trị mụn', revenue: '2.1M', sessions: 5, growth: '+8%' },
      { name: 'Tắm trắng toàn thân', revenue: '1.8M', sessions: 3, growth: '+20%' },
      { name: 'Liệu trình giảm béo', revenue: '1.2M', sessions: 2, growth: '+25%' },
    ]
  };

  // All branches aggregated
  const allBranchesTopServices = [
    { name: 'Chăm sóc da mặt Premium', revenue: '42.3M', sessions: 90, growth: '+15%' },
    { name: 'Massage toàn thân', revenue: '38.7M', sessions: 86, growth: '+11%' },
    { name: 'Tắm trắng toàn thân', revenue: '30.2M', sessions: 57, growth: '+21%' },
    { name: 'Điều trị mụn', revenue: '28.1M', sessions: 71, growth: '+6%' },
    { name: 'Liệu trình giảm béo', revenue: '22.7M', sessions: 31, growth: '+18%' },
  ];

  const topServices = selectedBranch === 'all-branches'
    ? allBranchesTopServices
    : branchTopServices[selectedBranch as keyof typeof branchTopServices] || allBranchesTopServices;

  // All employee revenue data with branch information
  const allEmployeeRevenue = [
    {
      id: 1,
      name: 'Nguyễn Thị Mai',
      position: 'Chuyên viên chăm sóc da',
      department: 'Điều trị',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=150',
      revenue: 42500000,
      revenueFormatted: '42.5M',
      sessions: 156,
      commission: 4250000,
      commissionFormatted: '4.25M',
      rating: 4.8,
      growth: '+12%',
      specialties: ['Chăm sóc da mặt', 'Điều trị mụn', 'Tái tạo da'],
      customers: 89,
      avgSessionValue: 272000,
      branchId: 'branch-1',
      branchName: 'Chi nhánh Quận 1',
      efficiency: 92,
      monthlyTarget: 45000000,
      targetAchievement: 94.4
    },
    {
      id: 2,
      name: 'Lê Thanh Hoa',
      position: 'Massage Therapist',
      department: 'Massage',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=150',
      revenue: 38200000,
      revenueFormatted: '38.2M',
      sessions: 234,
      commission: 3820000,
      commissionFormatted: '3.82M',
      rating: 4.9,
      growth: '+18%',
      specialties: ['Massage toàn thân', 'Massage thái', 'Massage đá nóng'],
      customers: 102,
      avgSessionValue: 163000,
      branchId: 'branch-2',
      branchName: 'Chi nhánh Quận 3',
      efficiency: 96,
      monthlyTarget: 35000000,
      targetAchievement: 109.1
    },
    {
      id: 3,
      name: 'Trần Minh An',
      position: 'Kỹ thuật viên',
      department: 'Làm đẹp',
      avatar: 'https://images.pexels.com/photos/1037915/pexels-photo-1037915.jpeg?w=150',
      revenue: 35800000,
      revenueFormatted: '35.8M',
      sessions: 187,
      commission: 3580000,
      commissionFormatted: '3.58M',
      rating: 4.7,
      growth: '+8%',
      specialties: ['Tắm trắng', 'Triệt lông', 'Căng da'],
      customers: 76,
      avgSessionValue: 191000,
      branchId: 'branch-1',
      branchName: 'Chi nhánh Quận 1',
      efficiency: 88,
      monthlyTarget: 40000000,
      targetAchievement: 89.5
    },
    {
      id: 4,
      name: 'Phạm Thị Lan',
      position: 'Chuyên viên tư vấn',
      department: 'Tư vấn',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?w=150',
      revenue: 28900000,
      revenueFormatted: '28.9M',
      sessions: 143,
      commission: 2890000,
      commissionFormatted: '2.89M',
      rating: 4.6,
      growth: '+5%',
      specialties: ['Tư vấn làm đẹp', 'Liệu trình cá nhân', 'Chăm sóc sau điều trị'],
      customers: 67,
      avgSessionValue: 202000,
      branchId: 'branch-2',
      branchName: 'Chi nhánh Quận 3',
      efficiency: 85,
      monthlyTarget: 30000000,
      targetAchievement: 96.3
    },
    {
      id: 5,
      name: 'Võ Minh Tâm',
      position: 'Giảm béo',
      department: 'Giảm béo',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150',
      revenue: 33200000,
      revenueFormatted: '33.2M',
      sessions: 98,
      commission: 3320000,
      commissionFormatted: '3.32M',
      rating: 4.8,
      growth: '+22%',
      specialties: ['Giảm béo RF', 'Massage giảm béo', 'Tư vấn dinh dưỡng'],
      customers: 45,
      avgSessionValue: 339000,
      branchId: 'branch-1',
      branchName: 'Chi nhánh Quận 1',
      efficiency: 94,
      monthlyTarget: 32000000,
      targetAchievement: 103.8
    },
    {
      id: 6,
      name: 'Lý Thị Bích',
      position: 'Nail Artist',
      department: 'Nail',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?w=150',
      revenue: 18500000,
      revenueFormatted: '18.5M',
      sessions: 167,
      commission: 1850000,
      commissionFormatted: '1.85M',
      rating: 4.5,
      growth: '+3%',
      specialties: ['Nail art', 'Gel nails', 'Manicure/Pedicure'],
      customers: 98,
      avgSessionValue: 111000,
      branchId: 'branch-2',
      branchName: 'Chi nhánh Quận 3',
      efficiency: 82,
      monthlyTarget: 20000000,
      targetAchievement: 92.5
    },
    // Branch 3 employees
    {
      id: 7,
      name: 'Nguyễn Văn Đức',
      position: 'Massage Therapist',
      department: 'Massage',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150',
      revenue: 22800000,
      revenueFormatted: '22.8M',
      sessions: 156,
      commission: 2280000,
      commissionFormatted: '2.28M',
      rating: 4.6,
      growth: '+9%',
      specialties: ['Massage toàn thân', 'Massage thái'],
      customers: 78,
      avgSessionValue: 146000,
      branchId: 'branch-3',
      branchName: 'Chi nhánh Thủ Đức',
      efficiency: 87,
      monthlyTarget: 25000000,
      targetAchievement: 91.2
    },
    {
      id: 8,
      name: 'Trần Thị Hương',
      position: 'Chuyên viên chăm sóc da',
      department: 'Điều trị',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=150',
      revenue: 26500000,
      revenueFormatted: '26.5M',
      sessions: 132,
      commission: 2650000,
      commissionFormatted: '2.65M',
      rating: 4.7,
      growth: '+12%',
      specialties: ['Chăm sóc da mặt', 'Điều trị mụn'],
      customers: 65,
      avgSessionValue: 201000,
      branchId: 'branch-3',
      branchName: 'Chi nhánh Thủ Đức',
      efficiency: 89,
      monthlyTarget: 28000000,
      targetAchievement: 94.6
    },
    // Branch 4 employees
    {
      id: 9,
      name: 'Lê Thị Mai',
      position: 'Kỹ thuật viên',
      department: 'Làm đẹp',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?w=150',
      revenue: 12800000,
      revenueFormatted: '12.8M',
      sessions: 89,
      commission: 1280000,
      commissionFormatted: '1.28M',
      rating: 4.5,
      growth: '+15%',
      specialties: ['Tắm trắng', 'Massage mặt'],
      customers: 42,
      avgSessionValue: 144000,
      branchId: 'branch-4',
      branchName: 'Chi nhánh Gò Vấp',
      efficiency: 85,
      monthlyTarget: 15000000,
      targetAchievement: 85.3
    },
    {
      id: 10,
      name: 'Phạm Văn Hải',
      position: 'Massage Therapist',
      department: 'Massage',
      avatar: 'https://images.pexels.com/photos/1037915/pexels-photo-1037915.jpeg?w=150',
      revenue: 8900000,
      revenueFormatted: '8.9M',
      sessions: 67,
      commission: 890000,
      commissionFormatted: '0.89M',
      rating: 4.4,
      growth: '+8%',
      specialties: ['Massage toàn thân'],
      customers: 34,
      avgSessionValue: 133000,
      branchId: 'branch-4',
      branchName: 'Chi nhánh Gò Vấp',
      efficiency: 82,
      monthlyTarget: 12000000,
      targetAchievement: 74.2
    }
  ];

  // Filter employees based on selected branch
  const employeeRevenue = selectedBranch === 'all-branches'
    ? allEmployeeRevenue
    : allEmployeeRevenue.filter(emp => emp.branchId === selectedBranch);

  // Sort employees based on selected criteria
  const sortedEmployees = [...employeeRevenue].sort((a, b) => {
    switch (sortBy) {
      case 'revenue':
        return b.revenue - a.revenue;
      case 'sessions':
        return b.sessions - a.sessions;
      case 'rating':
        return b.rating - a.rating;
      case 'efficiency':
        return b.efficiency - a.efficiency;
      case 'target':
        return b.targetAchievement - a.targetAchievement;
      default:
        return b.revenue - a.revenue;
    }
  });

  // Calculate employee stats
  const employeeStats = {
    totalRevenue: employeeRevenue.reduce((sum, emp) => sum + emp.revenue, 0),
    totalSessions: employeeRevenue.reduce((sum, emp) => sum + emp.sessions, 0),
    totalCommission: employeeRevenue.reduce((sum, emp) => sum + emp.commission, 0),
    avgRating: employeeRevenue.reduce((sum, emp) => sum + emp.rating, 0) / employeeRevenue.length,
    avgEfficiency: employeeRevenue.reduce((sum, emp) => sum + emp.efficiency, 0) / employeeRevenue.length,
    topPerformer: employeeRevenue.sort((a, b) => b.revenue - a.revenue)[0]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

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
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Tổng quan</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('employee')}
            className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${
              activeTab === 'employee'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Doanh thu nhân viên</span>
            </div>
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
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
        </>
      )}

      {activeTab === 'employee' && (
        <>
          {/* Employee Revenue Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tổng doanh thu NV</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(employeeStats.totalRevenue)}</p>
                  </div>
                </div>
                <span className="text-green-600 text-sm font-medium">+15.2%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tổng buổi dịch vụ</p>
                    <p className="text-2xl font-bold text-gray-900">{employeeStats.totalSessions}</p>
                  </div>
                </div>
                <span className="text-blue-600 text-sm font-medium">+8.3%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Đánh giá TB</p>
                    <p className="text-2xl font-bold text-gray-900">{employeeStats.avgRating.toFixed(1)}</p>
                  </div>
                </div>
                <span className="text-purple-600 text-sm font-medium">⭐</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hiệu suất TB</p>
                    <p className="text-2xl font-bold text-gray-900">{employeeStats.avgEfficiency.toFixed(0)}%</p>
                  </div>
                </div>
                <span className="text-orange-600 text-sm font-medium">+5.2%</span>
              </div>
            </div>
          </div>

          {/* Top Performer Highlight */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={employeeStats.topPerformer.avatar}
                    alt={employeeStats.topPerformer.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-yellow-300"
                  />
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Nhân viên xuất sắc tháng</h3>
                  <p className="text-yellow-700 font-semibold">{employeeStats.topPerformer.name}</p>
                  <p className="text-sm text-gray-600">{employeeStats.topPerformer.position}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-yellow-600">{employeeStats.topPerformer.revenueFormatted}</p>
                <p className="text-sm text-gray-600">Doanh thu tháng</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-yellow-600 text-sm">⭐ {employeeStats.topPerformer.rating}</span>
                  <span className="text-green-600 text-sm">{employeeStats.topPerformer.growth}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Sắp xếp theo:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="revenue">Doanh thu</option>
                  <option value="sessions">Số buổi dịch vụ</option>
                  <option value="rating">Đánh giá</option>
                  <option value="efficiency">Hiệu suất</option>
                  <option value="target">Hoàn thành mục tiêu</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="week">Tuần này</option>
                  <option value="month">Tháng này</option>
                  <option value="quarter">Quý này</option>
                  <option value="year">Năm này</option>
                </select>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Xuất báo cáo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Employee Revenue Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Chi tiết doanh thu nhân viên</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nhân viên
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doanh thu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Buổi DV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hoa hồng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đánh giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mục tiêu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hiệu suất
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tăng trường
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedEmployees.map((employee, index) => (
                    <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              src={employee.avatar}
                              alt={employee.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                              {index === 0 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <Award className="w-3 h-3 mr-1" />
                                  #1
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{employee.position}</p>
                            <p className="text-xs text-gray-400">{employee.department}</p>
                            {selectedBranch === 'all-branches' && (
                              <p className="text-xs text-blue-600 font-medium">{employee.branchName}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{employee.revenueFormatted}</p>
                          <p className="text-xs text-gray-500">TB: {formatCurrency(employee.avgSessionValue)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{employee.sessions}</p>
                          <p className="text-xs text-gray-500">{employee.customers} khách</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-green-600">{employee.commissionFormatted}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium text-gray-900">{employee.rating}</span>
                          <span className="text-yellow-400">⭐</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">{employee.targetAchievement.toFixed(1)}%</span>
                            {employee.targetAchievement >= 100 ? (
                              <span className="text-green-600">✓</span>
                            ) : (
                              <span className="text-red-600">-</span>
                            )}
                          </div>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                employee.targetAchievement >= 100 ? 'bg-green-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${Math.min(employee.targetAchievement, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{employee.efficiency}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${employee.efficiency}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          employee.growth.startsWith('+')
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.growth}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Employee Performance Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top 5 nhân viên theo doanh thu</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {sortedEmployees.slice(0, 5).map((employee, index) => (
                  <div key={employee.id} className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${(employee.revenue / sortedEmployees[0].revenue) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-16 text-right">{employee.revenueFormatted}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Phân bố theo phòng ban</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {Object.entries(
                  employeeRevenue.reduce((acc, emp) => {
                    acc[emp.department] = (acc[emp.department] || 0) + emp.revenue;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([department, revenue], index) => (
                  <div key={department} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-900">{department}</span>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(revenue)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;

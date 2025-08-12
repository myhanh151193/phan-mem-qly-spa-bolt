import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Calendar, BarChart3, PieChart, User, Star, Crown, Award } from 'lucide-react';

interface ReportsProps {
  selectedBranch: string;
}

const Reports: React.FC<ReportsProps> = ({ selectedBranch }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'customers'>('overview');

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

  const staffReports = [
    {
      id: 1,
      name: 'Nguyễn Thị Mai',
      position: 'Chuyên viên chăm sóc da',
      revenue: '58.2M',
      appointments: 145,
      rating: 4.9,
      completionRate: '98%',
      commission: '8.7M',
      efficiency: 'Xuất sắc'
    },
    {
      id: 2,
      name: 'Trần Văn Hùng',
      position: 'Massage therapist',
      revenue: '42.8M',
      appointments: 98,
      rating: 4.7,
      completionRate: '95%',
      commission: '6.4M',
      efficiency: 'Tốt'
    },
    {
      id: 3,
      name: 'Lê Thị Hoa',
      position: 'Chuyên viên điều trị',
      revenue: '36.5M',
      appointments: 112,
      rating: 4.8,
      completionRate: '96%',
      commission: '5.5M',
      efficiency: 'Tốt'
    },
    {
      id: 4,
      name: 'Phạm Minh Tuấn',
      position: 'Chuyên viên giảm béo',
      revenue: '31.2M',
      appointments: 67,
      rating: 4.6,
      completionRate: '94%',
      commission: '4.7M',
      efficiency: 'Khá'
    },
    {
      id: 5,
      name: 'Hoàng Thị Lan',
      position: 'Nail technician',
      revenue: '24.8M',
      appointments: 89,
      rating: 4.5,
      completionRate: '92%',
      commission: '3.7M',
      efficiency: 'Khá'
    }
  ];

  const customerReports = [
    {
      id: 1,
      name: 'Nguyễn Thị Linh',
      phone: '0901.234.567',
      totalSpent: '12.5M',
      visits: 28,
      lastVisit: '2025-01-08',
      favoriteService: 'Chăm sóc da Premium',
      membershipLevel: 'VIP Gold',
      satisfaction: 4.9,
      nextAppointment: '2025-01-15'
    },
    {
      id: 2,
      name: 'Trần Thị Mai',
      phone: '0912.345.678',
      totalSpent: '8.9M',
      visits: 22,
      lastVisit: '2025-01-10',
      favoriteService: 'Massage toàn thân',
      membershipLevel: 'VIP Silver',
      satisfaction: 4.8,
      nextAppointment: '2025-01-18'
    },
    {
      id: 3,
      name: 'Lê Văn Nam',
      phone: '0923.456.789',
      totalSpent: '6.7M',
      visits: 15,
      lastVisit: '2025-01-05',
      favoriteService: 'Điều trị mụn',
      membershipLevel: 'Regular',
      satisfaction: 4.7,
      nextAppointment: 'Chưa đặt'
    },
    {
      id: 4,
      name: 'Phạm Thị Hương',
      phone: '0934.567.890',
      totalSpent: '15.2M',
      visits: 35,
      lastVisit: '2025-01-12',
      favoriteService: 'Tắm trắng',
      membershipLevel: 'VIP Platinum',
      satisfaction: 5.0,
      nextAppointment: '2025-01-16'
    },
    {
      id: 5,
      name: 'Vũ Thị Nga',
      phone: '0945.678.901',
      totalSpent: '4.8M',
      visits: 12,
      lastVisit: '2025-01-07',
      favoriteService: 'Nail art',
      membershipLevel: 'Regular',
      satisfaction: 4.6,
      nextAppointment: '2025-01-20'
    }
  ];

  const renderTabContent = () => {
    if (activeTab === 'staff') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              Báo cáo chi tiết theo nhân viên
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Nhân viên</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Doanh thu</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Lịch hẹn</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Đánh giá</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tỷ lệ hoàn thành</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Hoa hồng</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Hiệu suất</th>
                  </tr>
                </thead>
                <tbody>
                  {staffReports.map((staff) => (
                    <tr key={staff.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{staff.name}</p>
                          <p className="text-sm text-gray-600">{staff.position}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-green-600">{staff.revenue}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{staff.appointments}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="font-medium">{staff.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-blue-600 font-medium">{staff.completionRate}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-purple-600">{staff.commission}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          staff.efficiency === 'Xuất sắc' ? 'bg-green-100 text-green-800' :
                          staff.efficiency === 'Tốt' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {staff.efficiency}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                Top performer
              </h4>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-3">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <p className="font-bold text-gray-900">{staffReports[0].name}</p>
                <p className="text-sm text-gray-600 mb-2">{staffReports[0].position}</p>
                <p className="text-lg font-semibold text-green-600">{staffReports[0].revenue}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Thống kê tổng</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng doanh thu:</span>
                  <span className="font-semibold text-green-600">193.5M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng lịch hẹn:</span>
                  <span className="font-semibold text-blue-600">511</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đánh giá TB:</span>
                  <span className="font-semibold text-yellow-600">4.7/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tỷ lệ hoàn thành:</span>
                  <span className="font-semibold text-purple-600">95%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Phân tích hiệu suất</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Xuất sắc</span>
                    <span>20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tốt</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Khá</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'customers') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              Báo cáo chi tiết theo khách hàng
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Khách hàng</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tổng chi tiêu</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Số lần đến</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Hạng thành viên</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Dịch vụ yêu thích</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Lần cuối đến</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Hẹn tiếp theo</th>
                  </tr>
                </thead>
                <tbody>
                  {customerReports.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-green-600">{customer.totalSpent}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{customer.visits}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          customer.membershipLevel.includes('Platinum') ? 'bg-purple-100 text-purple-800' :
                          customer.membershipLevel.includes('Gold') ? 'bg-yellow-100 text-yellow-800' :
                          customer.membershipLevel.includes('Silver') ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {customer.membershipLevel}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{customer.favoriteService}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600">{customer.lastVisit}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={customer.nextAppointment === 'Chưa đặt' ? 'text-red-600' : 'text-green-600'}>
                          {customer.nextAppointment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-500" />
                Khách hàng VIP
              </h4>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-3">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <p className="font-bold text-gray-900">{customerReports[3].name}</p>
                <p className="text-sm text-gray-600 mb-2">VIP Platinum</p>
                <p className="text-lg font-semibold text-green-600">{customerReports[3].totalSpent}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Phân tích khách hàng</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng khách hàng:</span>
                  <span className="font-semibold text-blue-600">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Khách VIP:</span>
                  <span className="font-semibold text-purple-600">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chi tiêu TB/khách:</span>
                  <span className="font-semibold text-green-600">426K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tỷ lệ quay lại:</span>
                  <span className="font-semibold text-yellow-600">78%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Phân bố thành viên</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>VIP Platinum</span>
                    <span>7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '7%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>VIP Gold</span>
                    <span>15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>VIP Silver</span>
                    <span>23%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Regular</span>
                    <span>55%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default overview tab
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

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Tổng quan</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'staff'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <User className="w-5 h-5" />
              <span>Theo nhân viên</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'customers'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Theo khách hàng</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Reports;

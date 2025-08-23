import React from 'react';
import { 
  TrendingUp, Users, Calendar, DollarSign, 
  Clock, Star, ArrowUp, ArrowDown 
} from 'lucide-react';

interface DashboardProps {
  selectedBranch: string;
}

const Dashboard: React.FC<DashboardProps> = ({ selectedBranch }) => {
  // Branch-specific stats
  const branchStats = {
    'branch-1': [
      {
        title: 'Doanh thu hôm nay',
        value: '6.2M VNĐ',
        change: '+15.2%',
        trend: 'up',
        icon: DollarSign,
        color: 'text-green-600',
        bg: 'bg-green-50',
      },
      {
        title: 'Khách hàng mới',
        value: '12',
        change: '+10.5%',
        trend: 'up',
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      },
      {
        title: 'Lịch hẹn hôm nay',
        value: '18',
        change: '+5.2%',
        trend: 'up',
        icon: Calendar,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
      },
      {
        title: 'Đánh giá trung bình',
        value: '4.9/5',
        change: '+0.2',
        trend: 'up',
        icon: Star,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
      },
    ],
    'branch-2': [
      {
        title: 'Doanh thu hôm nay',
        value: '4.8M VNĐ',
        change: '+10.3%',
        trend: 'up',
        icon: DollarSign,
        color: 'text-green-600',
        bg: 'bg-green-50',
      },
      {
        title: 'Khách hàng mới',
        value: '8',
        change: '+6.8%',
        trend: 'up',
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      },
      {
        title: 'Lịch hẹn hôm nay',
        value: '12',
        change: '-1.5%',
        trend: 'down',
        icon: Calendar,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
      },
      {
        title: 'Đánh giá trung bình',
        value: '4.7/5',
        change: '+0.4',
        trend: 'up',
        icon: Star,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
      },
    ],
    'branch-3': [
      {
        title: 'Doanh thu hôm nay',
        value: '2.9M VNĐ',
        change: '+8.7%',
        trend: 'up',
        icon: DollarSign,
        color: 'text-green-600',
        bg: 'bg-green-50',
      },
      {
        title: 'Khách hàng mới',
        value: '3',
        change: '+12.5%',
        trend: 'up',
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      },
      {
        title: 'Lịch hẹn hôm nay',
        value: '5',
        change: '-5.2%',
        trend: 'down',
        icon: Calendar,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
      },
      {
        title: 'Đánh giá trung bình',
        value: '4.6/5',
        change: '+0.1',
        trend: 'up',
        icon: Star,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
      },
    ],
    'branch-4': [
      {
        title: 'Doanh thu hôm nay',
        value: '1.3M VNĐ',
        change: '+12.8%',
        trend: 'up',
        icon: DollarSign,
        color: 'text-green-600',
        bg: 'bg-green-50',
      },
      {
        title: 'Khách hàng mới',
        value: '1',
        change: '+0%',
        trend: 'up',
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      },
      {
        title: 'Lịch hẹn hôm nay',
        value: '1',
        change: '-50%',
        trend: 'down',
        icon: Calendar,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
      },
      {
        title: 'Đánh giá trung bình',
        value: '4.8/5',
        change: '+0.5',
        trend: 'up',
        icon: Star,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
      },
    ]
  };

  // Aggregated stats for all branches
  const allBranchesStats = [
    {
      title: 'Doanh thu hôm nay',
      value: '15.2M VNĐ',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Khách hàng mới',
      value: '24',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Lịch hẹn hôm nay',
      value: '36',
      change: '-2.1%',
      trend: 'down',
      icon: Calendar,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Đánh giá trung bình',
      value: '4.8/5',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
  ];

  // Get current stats based on selected branch
  const stats = selectedBranch === 'all-branches'
    ? allBranchesStats
    : branchStats[selectedBranch as keyof typeof branchStats] || allBranchesStats;

  // Branch-specific appointments
  const branchAppointments = {
    'branch-1': [
      { id: 1, customer: 'Nguyễn Thu Hà', service: 'Chăm sóc da mặt Premium', time: '09:00', status: 'confirmed', branch: 'Quận 1' },
      { id: 2, customer: 'Võ Minh Tâm', service: 'Liệu trình giảm béo', time: '10:30', status: 'in-progress', branch: 'Quận 1' },
      { id: 3, customer: 'Trần Minh An', service: 'Tắm trắng', time: '14:00', status: 'pending', branch: 'Quận 1' },
      { id: 4, customer: 'Phạm Thị Lan', service: 'Massage toàn thân', time: '15:30', status: 'confirmed', branch: 'Quận 1' },
    ],
    'branch-2': [
      { id: 5, customer: 'Trần Mai Linh', service: 'Massage toàn thân', time: '09:30', status: 'confirmed', branch: 'Quận 3' },
      { id: 6, customer: 'Lê Thanh Hoa', service: 'Chăm sóc da mặt', time: '11:00', status: 'in-progress', branch: 'Quận 3' },
      { id: 7, customer: 'Lý Thị Bích', service: 'Nail art', time: '13:30', status: 'pending', branch: 'Quận 3' },
      { id: 8, customer: 'Phạm Thị Lan', service: 'Tư vấn làm đẹp', time: '16:00', status: 'confirmed', branch: 'Quận 3' },
    ],
    'branch-3': [
      { id: 9, customer: 'Lê Minh Châu', service: 'Điều trị mụn', time: '10:00', status: 'confirmed', branch: 'Thủ Đức' },
      { id: 10, customer: 'Nguyễn Văn Đức', service: 'Massage thái', time: '14:00', status: 'pending', branch: 'Thủ Đức' },
      { id: 11, customer: 'Trần Thị Hương', service: 'Chăm sóc da mặt', time: '16:30', status: 'confirmed', branch: 'Thủ Đức' },
    ],
    'branch-4': [
      { id: 12, customer: 'Lê Thị Mai', service: 'Tắm trắng', time: '11:00', status: 'confirmed', branch: 'Gò Vấp' },
      { id: 13, customer: 'Phạm Văn Hải', service: 'Massage toàn thân', time: '15:00', status: 'pending', branch: 'Gò Vấp' },
    ]
  };

  // All branches aggregated appointments
  const allBranchesAppointments = [
    { id: 1, customer: 'Nguyễn Thu Hà', service: 'Chăm sóc da mặt Premium', time: '09:00', status: 'confirmed', branch: 'Quận 1' },
    { id: 2, customer: 'Trần Mai Linh', service: 'Massage toàn thân', time: '09:30', status: 'in-progress', branch: 'Quận 3' },
    { id: 3, customer: 'Lê Minh Châu', service: 'Điều trị mụn', time: '10:00', status: 'pending', branch: 'Thủ Đức' },
    { id: 4, customer: 'Phạm Thị Lan', service: 'Tắm trắng', time: '15:30', status: 'confirmed', branch: 'Quận 1' },
  ];

  // Get current appointments based on selected branch
  const recentAppointments = selectedBranch === 'all-branches'
    ? allBranchesAppointments
    : branchAppointments[selectedBranch as keyof typeof branchAppointments] || [];

  // Helper function to get branch name
  const getBranchName = (branchId: string) => {
    const branchNames = {
      'branch-1': 'Chi nhánh Quận 1',
      'branch-2': 'Chi nhánh Quận 3',
      'branch-3': 'Chi nhánh Thủ Đức',
      'branch-4': 'Chi nhánh Gò Vấp',
      'all-branches': 'Tất cả chi nhánh'
    };
    return branchNames[branchId as keyof typeof branchNames] || 'Không xác định';
  };

  return (
    <div className="space-y-6">
      {/* Branch Info */}
      {selectedBranch !== 'all-branches' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <p className="text-blue-800 font-medium">
              Hiển thị dữ liệu cho: {getBranchName(selectedBranch)}
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Lịch hẹn hôm nay</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{appointment.customer}</p>
                  <p className="text-sm text-gray-600">{appointment.service}</p>
                  {selectedBranch === 'all-branches' && (
                    <p className="text-xs text-blue-600 font-medium mt-1">{appointment.branch}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{appointment.time}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status === 'confirmed' ? 'Đã xác nhận' :
                     appointment.status === 'in-progress' ? 'Đang thực hiện' :
                     'Chờ xác nhận'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Doanh thu 7 ngày qua</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {(() => {
              // Branch-specific revenue data
              const branchRevenueData = {
                'branch-1': [
                  { day: 'T2', revenue: '5.8M', growth: true },
                  { day: 'T3', revenue: '6.2M', growth: true },
                  { day: 'T4', revenue: '5.5M', growth: false },
                  { day: 'T5', revenue: '7.1M', growth: true },
                  { day: 'T6', revenue: '8.2M', growth: true },
                  { day: 'T7', revenue: '9.5M', growth: true },
                  { day: 'CN', revenue: '6.2M', growth: false },
                ],
                'branch-2': [
                  { day: 'T2', revenue: '4.2M', growth: true },
                  { day: 'T3', revenue: '4.8M', growth: true },
                  { day: 'T4', revenue: '4.1M', growth: false },
                  { day: 'T5', revenue: '5.2M', growth: true },
                  { day: 'T6', revenue: '5.8M', growth: true },
                  { day: 'T7', revenue: '6.9M', growth: true },
                  { day: 'CN', revenue: '4.8M', growth: false },
                ],
                'branch-3': [
                  { day: 'T2', revenue: '2.1M', growth: true },
                  { day: 'T3', revenue: '2.5M', growth: true },
                  { day: 'T4', revenue: '1.8M', growth: false },
                  { day: 'T5', revenue: '3.2M', growth: true },
                  { day: 'T6', revenue: '3.8M', growth: true },
                  { day: 'T7', revenue: '4.2M', growth: true },
                  { day: 'CN', revenue: '2.9M', growth: false },
                ],
                'branch-4': [
                  { day: 'T2', revenue: '0.4M', growth: true },
                  { day: 'T3', revenue: '0.7M', growth: true },
                  { day: 'T4', revenue: '0.4M', growth: false },
                  { day: 'T5', revenue: '0.8M', growth: true },
                  { day: 'T6', revenue: '0.9M', growth: true },
                  { day: 'T7', revenue: '1.5M', growth: true },
                  { day: 'CN', revenue: '1.3M', growth: false },
                ]
              };

              // All branches aggregated
              const allBranchesRevenueData = [
                { day: 'T2', revenue: '12.5M', growth: true },
                { day: 'T3', revenue: '14.2M', growth: true },
                { day: 'T4', revenue: '11.8M', growth: false },
                { day: 'T5', revenue: '16.3M', growth: true },
                { day: 'T6', revenue: '18.7M', growth: true },
                { day: 'T7', revenue: '22.1M', growth: true },
                { day: 'CN', revenue: '15.2M', growth: false },
              ];

              const revenueData = selectedBranch === 'all-branches'
                ? allBranchesRevenueData
                : branchRevenueData[selectedBranch as keyof typeof branchRevenueData] || allBranchesRevenueData;

              return revenueData;
            })().map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-8">{day.day}</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${day.growth ? 'bg-green-500' : 'bg-red-400'}`}
                    style={{ width: `${Math.random() * 60 + 20}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-16 text-right">{day.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

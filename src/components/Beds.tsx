import React, { useState } from 'react';
import { Bed, Clock, User, Plus, MapPin, Settings, Eye, CheckCircle, XCircle, Play, Pause, Timer } from 'lucide-react';

interface BedAssignment {
  customerId: number;
  customerName: string;
  service: string;
  staff: string;
  startTime: string;
  estimatedEndTime: string;
  status: 'in-progress' | 'preparing' | 'cleaning';
  appointmentId: number;
}

interface TreatmentBed {
  id: number;
  name: string;
  room: string;
  type: 'massage' | 'facial' | 'body' | 'vip';
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  currentAssignment?: BedAssignment;
  equipment: string[];
  lastCleaned: string;
}

const Beds: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  const [beds, setBeds] = useState<TreatmentBed[]>([
    {
      id: 1,
      name: 'Giường Massage 1',
      room: 'Phòng VIP A',
      type: 'vip',
      status: 'occupied',
      currentAssignment: {
        customerId: 1,
        customerName: 'Nguyễn Thu Hà',
        service: 'Chăm sóc da mặt Premium',
        staff: 'Nguyễn Mai',
        startTime: '09:00',
        estimatedEndTime: '10:30',
        status: 'in-progress',
        appointmentId: 1
      },
      equipment: ['Máy hút chân không', 'Đèn LED', 'Hệ thống âm thanh'],
      lastCleaned: '08:45'
    },
    {
      id: 2,
      name: 'Giường Massage 2',
      room: 'Phòng VIP A',
      type: 'vip',
      status: 'cleaning',
      equipment: ['Máy hút chân không', 'Đèn LED', 'Hệ thống âm thanh'],
      lastCleaned: '10:15'
    },
    {
      id: 3,
      name: 'Giường Facial 1',
      room: 'Phòng Chăm sóc da',
      type: 'facial',
      status: 'occupied',
      currentAssignment: {
        customerId: 2,
        customerName: 'Trần Mai Linh',
        service: 'Điều trị mụn',
        staff: 'Trần An',
        startTime: '10:00',
        estimatedEndTime: '11:00',
        status: 'in-progress',
        appointmentId: 3
      },
      equipment: ['Máy phun sương', 'Đèn chuyên dụng', 'Kính lúp'],
      lastCleaned: '09:30'
    },
    {
      id: 4,
      name: 'Giường Facial 2',
      room: 'Phòng Chăm sóc da',
      type: 'facial',
      status: 'available',
      equipment: ['Máy phun sương', 'Đèn chuyên dụng', 'Kính lúp'],
      lastCleaned: '11:00'
    },
    {
      id: 5,
      name: 'Giường Body 1',
      room: 'Phòng Tắm trắng',
      type: 'body',
      status: 'occupied',
      currentAssignment: {
        customerId: 4,
        customerName: 'Phạm Thị Lan',
        service: 'Tắm trắng toàn thân',
        staff: 'Lê Hoa',
        startTime: '14:00',
        estimatedEndTime: '15:00',
        status: 'preparing',
        appointmentId: 4
      },
      equipment: ['Bồn tắm cao cấp', 'Hệ thống massage', 'Đèn hồng ngoại'],
      lastCleaned: '13:45'
    },
    {
      id: 6,
      name: 'Giường Body 2',
      room: 'Phòng Tắm trắng',
      type: 'body',
      status: 'available',
      equipment: ['Bồn tắm cao cấp', 'Hệ thống massage'],
      lastCleaned: '12:30'
    },
    {
      id: 7,
      name: 'Giường Massage 3',
      room: 'Phòng Massage',
      type: 'massage',
      status: 'maintenance',
      equipment: ['Hệ th��ng massage tự động', 'Đèn âm thanh'],
      lastCleaned: '08:00'
    },
    {
      id: 8,
      name: 'Giường Massage 4',
      room: 'Phòng Massage',
      type: 'massage',
      status: 'available',
      equipment: ['Hệ thống massage tự động', 'Đèn âm thanh'],
      lastCleaned: '10:30'
    }
  ]);

  const rooms = ['all', 'Phòng VIP A', 'Phòng Chăm sóc da', 'Phòng Tắm trắng', 'Phòng Massage'];

  const getBedTypeColor = (type: string) => {
    switch (type) {
      case 'vip': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'facial': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'body': return 'bg-green-100 text-green-800 border-green-200';
      case 'massage': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-300';
      case 'occupied': return 'bg-red-100 text-red-800 border-red-300';
      case 'cleaning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'maintenance': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Sẵn sàng';
      case 'occupied': return 'Đang sử dụng';
      case 'cleaning': return 'Đang dọn dẹp';
      case 'maintenance': return 'Bảo trì';
      default: return status;
    }
  };

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'cleaning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAssignmentStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return 'Đang thực hiện';
      case 'preparing': return 'Chuẩn bị';
      case 'cleaning': return 'Dọn dẹp';
      default: return status;
    }
  };

  const filteredBeds = beds.filter(bed => 
    selectedRoom === 'all' || bed.room === selectedRoom
  );

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTimeRemaining = (endTime: string) => {
    const now = new Date();
    const [hours, minutes] = endTime.split(':').map(Number);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Đã quá giờ';
    
    const remainingMinutes = Math.floor(diff / (1000 * 60));
    const remainingHours = Math.floor(remainingMinutes / 60);
    const mins = remainingMinutes % 60;
    
    if (remainingHours > 0) {
      return `${remainingHours}h ${mins}p`;
    }
    return `${mins}p`;
  };

  const updateBedStatus = (bedId: number, newStatus: TreatmentBed['status']) => {
    setBeds(prev => prev.map(bed => 
      bed.id === bedId ? { ...bed, status: newStatus } : bed
    ));
  };

  const completeBedService = (bedId: number) => {
    setBeds(prev => prev.map(bed => 
      bed.id === bedId ? { 
        ...bed, 
        status: 'cleaning',
        currentAssignment: undefined,
        lastCleaned: getCurrentTime()
      } : bed
    ));
  };

  const stats = {
    total: beds.length,
    available: beds.filter(b => b.status === 'available').length,
    occupied: beds.filter(b => b.status === 'occupied').length,
    cleaning: beds.filter(b => b.status === 'cleaning').length,
    maintenance: beds.filter(b => b.status === 'maintenance').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center space-x-4">
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {rooms.map(room => (
              <option key={room} value={room}>
                {room === 'all' ? 'Tất cả phòng' : room}
              </option>
            ))}
          </select>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Lưới
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                viewMode === 'timeline'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Thời gian
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Cập nhật lúc: {getCurrentTime()}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng giường</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Bed className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sẵn sàng</p>
              <p className="text-2xl font-bold text-green-600">{stats.available}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang dùng</p>
              <p className="text-2xl font-bold text-red-600">{stats.occupied}</p>
            </div>
            <Play className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dọn dẹp</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.cleaning}</p>
            </div>
            <Timer className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bảo trì</p>
              <p className="text-2xl font-bold text-gray-600">{stats.maintenance}</p>
            </div>
            <Settings className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBeds.map((bed) => (
          <div key={bed.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
            {/* Bed Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{bed.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{bed.room}</span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 text-xs rounded-full border ${getBedTypeColor(bed.type)}`}>
                  {bed.type.toUpperCase()}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(bed.status)}`}>
                  {getStatusText(bed.status)}
                </span>
              </div>
            </div>

            {/* Current Assignment */}
            {bed.currentAssignment && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">{bed.currentAssignment.customerName}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getAssignmentStatusColor(bed.currentAssignment.status)}`}>
                    {getAssignmentStatusText(bed.currentAssignment.status)}
                  </span>
                </div>
                <p className="text-sm text-blue-700 mb-2">{bed.currentAssignment.service}</p>
                <div className="flex justify-between items-center text-xs text-blue-600">
                  <span>Nhân viên: {bed.currentAssignment.staff}</span>
                  <span>{bed.currentAssignment.startTime} - {bed.currentAssignment.estimatedEndTime}</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-blue-600">
                    Còn lại: {getTimeRemaining(bed.currentAssignment.estimatedEndTime)}
                  </span>
                  <button
                    onClick={() => completeBedService(bed.id)}
                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                  >
                    Hoàn thành
                  </button>
                </div>
              </div>
            )}

            {/* Equipment */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Thiết bị:</p>
              <div className="flex flex-wrap gap-1">
                {bed.equipment.map((item, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Last Cleaned */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Dọn dẹp lần cuối:</span>
              <span>{bed.lastCleaned}</span>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              {bed.status === 'available' && (
                <button
                  onClick={() => updateBedStatus(bed.id, 'occupied')}
                  className="flex-1 bg-green-600 text-white text-sm py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Bắt đầu sử dụng
                </button>
              )}
              {bed.status === 'cleaning' && (
                <button
                  onClick={() => updateBedStatus(bed.id, 'available')}
                  className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Hoàn tất dọn dẹp
                </button>
              )}
              {bed.status === 'maintenance' && (
                <button
                  onClick={() => updateBedStatus(bed.id, 'available')}
                  className="flex-1 bg-gray-600 text-white text-sm py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Hoàn tất bảo trì
                </button>
              )}
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Beds;

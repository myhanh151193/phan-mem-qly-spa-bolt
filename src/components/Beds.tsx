import React, { useState, useEffect } from 'react';
import { Bed, Clock, User, Plus, MapPin, Settings, Eye, CheckCircle, XCircle, Play, Pause, Timer, Edit, Trash2, X, Save } from 'lucide-react';
import AppointmentDialog from './AppointmentDialog';
import { useAuth } from '../contexts/AuthContext';

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
  branch: string; // Branch ID where the bed is located
}

interface BedsProps {
  selectedBranch: string;
}

const Beds: React.FC<BedsProps> = ({ selectedBranch }) => {
  const { user, canAccessBranch } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<string>('all');

  // Reset room selection when branch changes and current room is not available
  useEffect(() => {
    if (selectedRoom !== 'all' && !getAvailableRooms().includes(selectedRoom)) {
      setSelectedRoom('all');
    }
  }, [selectedBranch, selectedRoom]);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [editingBed, setEditingBed] = useState<TreatmentBed | null>(null);
  const [newBedForm, setNewBedForm] = useState({
    name: '',
    room: 'Phòng Massage',
    type: 'massage' as TreatmentBed['type'],
    equipment: [] as string[],
    branch: selectedBranch !== 'all-branches' ? selectedBranch : (user?.accessibleBranches[0] || 'branch-1')
  });
  const [editBedForm, setEditBedForm] = useState({
    name: '',
    room: 'Phòng Massage',
    type: 'massage' as TreatmentBed['type'],
    equipment: [] as string[],
    branch: 'branch-1'
  });

  // Appointment Dialog State
  const [showAppointmentDialog, setShowAppointmentDialog] = useState<boolean>(false);
  const [selectedBed, setSelectedBed] = useState<TreatmentBed | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [editingAssignment, setEditingAssignment] = useState<BedAssignment | null>(null);
  const [isEditingAppointment, setIsEditingAppointment] = useState<boolean>(false);

  // Helper function to map rooms to branches
  const getRoomBranch = (room: string): string => {
    const roomToBranch: { [key: string]: string } = {
      'Phòng VIP A': 'branch-1',
      'Phòng Chăm sóc da': 'branch-1',
      'Phòng Tắm trắng': 'branch-2',
      'Phòng Massage': 'branch-3'
    };
    return roomToBranch[room] || 'branch-1';
  };

  // Helper function to get branch name from ID
  const getBranchNameFromId = (branchId: string): string => {
    const branchMap: { [key: string]: string } = {
      'branch-1': 'Chi nhánh Quận 1',
      'branch-2': 'Chi nhánh Quận 3',
      'branch-3': 'Chi nhánh Thủ Đức',
      'branch-4': 'Chi nhánh Gò Vấp'
    };
    return branchMap[branchId] || '';
  };

  // Get accessible branches for current user
  const getAccessibleBranches = () => {
    if (!user) return [];

    const allBranches = [
      { id: 'branch-1', name: 'Chi nhánh Quận 1' },
      { id: 'branch-2', name: 'Chi nhánh Quận 3' },
      { id: 'branch-3', name: 'Chi nhánh Thủ Đức' },
      { id: 'branch-4', name: 'Chi nhánh Gò Vấp' }
    ];

    return allBranches.filter(branch => canAccessBranch(branch.id));
  };

  // Get rooms for selected branch
  const getRoomsForBranch = (branchId: string): string[] => {
    const branchRooms: { [key: string]: string[] } = {
      'branch-1': ['Phòng VIP A', 'Phòng Chăm sóc da'],
      'branch-2': ['Phòng Tắm trắng'],
      'branch-3': ['Phòng Massage'],
      'branch-4': ['Phòng VIP B', 'Phòng Trị liệu']
    };
    return branchRooms[branchId] || ['Phòng Massage'];
  };

  const [beds, setBeds] = useState<TreatmentBed[]>([
    {
      id: 1,
      name: 'Giường Massage 1',
      room: 'Phòng VIP A',
      type: 'vip',
      status: 'occupied',
      branch: 'branch-1',
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
      branch: 'branch-1',
      equipment: ['Máy hút chân không', 'Đèn LED', 'Hệ thống âm thanh'],
      lastCleaned: '10:15'
    },
    {
      id: 3,
      name: 'Giường Facial 1',
      room: 'Phòng Chăm sóc da',
      type: 'facial',
      status: 'occupied',
      branch: 'branch-1',
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
      branch: 'branch-1',
      equipment: ['Máy phun sương', 'Đèn chuyên dụng', 'Kính lúp'],
      lastCleaned: '11:00'
    },
    {
      id: 5,
      name: 'Giường Body 1',
      room: 'Phòng Tắm trắng',
      type: 'body',
      status: 'occupied',
      branch: 'branch-2',
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
      branch: 'branch-2',
      equipment: ['Bồn tắm cao cấp', 'Hệ thống massage'],
      lastCleaned: '12:30'
    },
    {
      id: 7,
      name: 'Giường Massage 3',
      room: 'Ph��ng Massage',
      type: 'massage',
      status: 'maintenance',
      branch: 'branch-3',
      equipment: ['Hệ thống massage tự động', 'Đèn âm thanh'],
      lastCleaned: '08:00'
    },
    {
      id: 8,
      name: 'Giường Massage 4',
      room: 'Phòng Massage',
      type: 'massage',
      status: 'available',
      branch: 'branch-3',
      equipment: ['Hệ thống massage tự động', 'Đèn âm thanh'],
      lastCleaned: '10:30'
    }
  ]);

  // Filter rooms based on selected branch
  const getAllRooms = () => ['Phòng VIP A', 'Phòng Chăm sóc da', 'Phòng Tắm trắng', 'Phòng Massage'];

  const getAvailableRooms = () => {
    if (selectedBranch === 'all-branches') {
      return ['all', ...getAllRooms()];
    }
    const availableRooms = getAllRooms().filter(room => getRoomBranch(room) === selectedBranch);
    return ['all', ...availableRooms];
  };

  const rooms = getAvailableRooms();

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

  const filteredBeds = beds.filter(bed => {
    // Room filtering
    const roomMatch = selectedRoom === 'all' || bed.room === selectedRoom;

    // Branch filtering - use bed.branch instead of getRoomBranch
    const branchMatch = selectedBranch === 'all-branches' || bed.branch === selectedBranch;

    return roomMatch && branchMatch;
  });

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

  const addNewBed = () => {
    setShowAddDialog(true);
  };

  const handleAddBed = () => {
    if (!newBedForm.name.trim()) return;

    const newBed: TreatmentBed = {
      id: beds.length + 1,
      name: newBedForm.name,
      room: newBedForm.room,
      type: newBedForm.type,
      status: 'available',
      equipment: newBedForm.equipment.length > 0 ? newBedForm.equipment : ['Thiết bị cơ bản'],
      lastCleaned: getCurrentTime()
    };
    setBeds(prev => [...prev, newBed]);
    setShowAddDialog(false);
    setNewBedForm({
      name: '',
      room: 'Phòng Massage',
      type: 'massage',
      equipment: []
    });
  };

  const handleCancelAdd = () => {
    setShowAddDialog(false);
    setNewBedForm({
      name: '',
      room: 'Phòng Massage',
      type: 'massage',
      equipment: []
    });
  };

  // Edit bed functions
  const openEditDialog = (bed: TreatmentBed) => {
    setEditingBed(bed);
    setEditBedForm({
      name: bed.name,
      room: bed.room,
      type: bed.type,
      equipment: [...bed.equipment]
    });
    setShowEditDialog(true);
  };

  const handleEditBed = () => {
    if (!editingBed || !editBedForm.name.trim()) return;

    const updatedBed: TreatmentBed = {
      ...editingBed,
      name: editBedForm.name,
      room: editBedForm.room,
      type: editBedForm.type,
      equipment: editBedForm.equipment.length > 0 ? editBedForm.equipment : ['Thiết bị cơ bản']
    };

    setBeds(prev => prev.map(bed =>
      bed.id === editingBed.id ? updatedBed : bed
    ));

    handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setShowEditDialog(false);
    setEditingBed(null);
    setEditBedForm({
      name: '',
      room: 'Phòng Massage',
      type: 'massage',
      equipment: []
    });
  };

  // Delete bed functions
  const openDeleteConfirm = (bedId: number) => {
    setShowDeleteConfirm(bedId);
  };

  const handleDeleteBed = (bedId: number) => {
    setBeds(prev => prev.filter(bed => bed.id !== bedId));
    setShowDeleteConfirm(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const handleAppointmentSave = (appointmentData: any) => {
    if (selectedBed) {
      const newAssignment: BedAssignment = {
        customerId: appointmentData.customerId || 0,
        customerName: appointmentData.customerName,
        service: appointmentData.service,
        staff: appointmentData.staff || 'Chưa chỉ định',
        startTime: appointmentData.startTime,
        estimatedEndTime: appointmentData.estimatedEndTime,
        status: 'preparing',
        appointmentId: Date.now() // Simple ID generation
      };

      if (isEditingAppointment && editingAssignment) {
        // Update existing assignment
        setBeds(prev => prev.map(bed =>
          bed.id === selectedBed.id ? {
            ...bed,
            currentAssignment: {
              ...newAssignment,
              appointmentId: editingAssignment.appointmentId
            }
          } : bed
        ));
      } else {
        // Add new assignment
        setBeds(prev => prev.map(bed =>
          bed.id === selectedBed.id ? {
            ...bed,
            status: 'occupied',
            currentAssignment: newAssignment
          } : bed
        ));
      }
    }

    handleCloseAppointmentDialog();
  };

  const handleCloseAppointmentDialog = () => {
    setShowAppointmentDialog(false);
    setSelectedBed(null);
    setSelectedTimeSlot('');
    setEditingAssignment(null);
    setIsEditingAppointment(false);
  };

  const calculateAssignmentHeight = (startTime: string, endTime: string) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const duration = endMinutes - startMinutes;

    // Each hour slot is 80px (h-20), so calculate proportional height
    return Math.max((duration / 60) * 80 - 8, 32); // Minimum 32px height
  };

  const showAssignmentDetails = (assignment: BedAssignment, bed: TreatmentBed) => {
    // Open edit dialog for existing assignments
    setSelectedBed(bed);
    setSelectedTimeSlot(assignment.startTime);
    setEditingAssignment(assignment);
    setIsEditingAppointment(true);
    setShowAppointmentDialog(true);
  };

  const handleTimeSlotClick = (bedId: number, timeSlot: string, bed: TreatmentBed) => {
    if (bed.status === 'available') {
      // Open booking dialog for available beds
      setSelectedBed(bed);
      setSelectedTimeSlot(timeSlot);
      setEditingAssignment(null);
      setIsEditingAppointment(false);
      setShowAppointmentDialog(true);
    } else {
      // Show bed status info for non-available beds
      alert(`${bed.name} hiện tại ${getStatusText(bed.status).toLowerCase()}`);
    }
  };

  // Calculate stats based on branch filtering
  const branchFilteredBeds = beds.filter(bed => {
    return selectedBranch === 'all-branches' || bed.branch === selectedBranch;
  });

  const stats = {
    total: branchFilteredBeds.length,
    available: branchFilteredBeds.filter(b => b.status === 'available').length,
    occupied: branchFilteredBeds.filter(b => b.status === 'occupied').length,
    cleaning: branchFilteredBeds.filter(b => b.status === 'cleaning').length,
    maintenance: branchFilteredBeds.filter(b => b.status === 'maintenance').length
  };

  return (
    <div className="space-y-6">
      {/* Branch Indicator */}
      {selectedBranch !== 'all-branches' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Đang xem giường/phòng của: {getBranchNameFromId(selectedBranch)}
            </span>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {branchFilteredBeds.length} giường
            </span>
          </div>
        </div>
      )}

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
          <button
            onClick={addNewBed}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm giường</span>
          </button>
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

      {/* Beds Display */}
      {viewMode === 'grid' ? (
        /* Grid View */
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
              <div className="space-y-2">
                {/* Status actions */}
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

                {/* Management actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditDialog(bed)}
                    className="flex-1 bg-orange-100 text-orange-700 text-sm py-2 rounded-lg hover:bg-orange-200 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Chỉnh sửa</span>
                  </button>
                  <button
                    onClick={() => openDeleteConfirm(bed.id)}
                    className="flex-1 bg-red-100 text-red-700 text-sm py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Xóa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Timeline View - Google Calendar Style */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            {/* Timeline Header */}
            <div className="min-w-max">
              <div className="grid gap-0" style={{ gridTemplateColumns: `120px repeat(${filteredBeds.length}, 200px)` }}>
                {/* Empty corner cell */}
                <div className="h-16 border-b border-r border-gray-200 bg-gray-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>

                {/* Bed Headers */}
                {filteredBeds.map((bed) => (
                  <div key={bed.id} className="h-16 border-b border-r border-gray-200 last:border-r-0 bg-gray-50 p-3">
                    <div className="flex flex-col h-full justify-center">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{bed.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500 truncate">{bed.room}</span>
                        <span className={`px-1 py-0.5 text-xs rounded-full border ${getStatusColor(bed.status)}`}>
                          {getStatusText(bed.status).slice(0, 3)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline Body */}
              <div className="relative">
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = i + 8;
                  const timeSlot = `${hour.toString().padStart(2, '0')}:00`;

                  return (
                    <div key={timeSlot} className="grid gap-0" style={{ gridTemplateColumns: `120px repeat(${filteredBeds.length}, 200px)` }}>
                      {/* Time Label */}
                      <div className="h-20 border-b border-r border-gray-200 bg-gray-50 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">{timeSlot}</span>
                      </div>

                      {/* Bed Time Slots */}
                      {filteredBeds.map((bed) => {
                        const hasAssignment = bed.currentAssignment &&
                          bed.currentAssignment.startTime <= timeSlot &&
                          bed.currentAssignment.estimatedEndTime > timeSlot;

                        const isStartTime = bed.currentAssignment && bed.currentAssignment.startTime === timeSlot;

                        return (
                          <div
                            key={`${bed.id}-${timeSlot}`}
                            className="h-20 border-b border-r border-gray-200 last:border-r-0 relative group hover:bg-blue-50 transition-colors cursor-pointer"
                            onClick={() => handleTimeSlotClick(bed.id, timeSlot, bed)}
                          >
                            {/* Assignment Block */}
                            {hasAssignment && isStartTime && (
                              <div
                                className={`absolute inset-x-1 top-1 rounded-lg p-2 border-l-4 cursor-pointer hover:shadow-lg transition-all duration-200 ${
                                  bed.currentAssignment.status === 'in-progress' ? 'bg-blue-100 border-blue-500' :
                                  bed.currentAssignment.status === 'preparing' ? 'bg-yellow-100 border-yellow-500' :
                                  'bg-orange-100 border-orange-500'
                                }`}
                                style={{
                                  height: `${calculateAssignmentHeight(bed.currentAssignment.startTime, bed.currentAssignment.estimatedEndTime)}px`,
                                  zIndex: 10
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showAssignmentDetails(bed.currentAssignment, bed);
                                }}
                              >
                                <div className="text-xs">
                                  <div className="font-medium text-gray-900 truncate mb-1">
                                    {bed.currentAssignment.customerName}
                                  </div>
                                  <div className="text-gray-600 truncate mb-1">
                                    {bed.currentAssignment.service}
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    {bed.currentAssignment.staff}
                                  </div>
                                  <div className="text-gray-500 text-xs mt-1">
                                    {bed.currentAssignment.startTime} - {bed.currentAssignment.estimatedEndTime}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Empty slot indicator */}
                            {!hasAssignment && bed.status === 'available' && (
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="flex items-center space-x-1 text-blue-600 text-xs">
                                  <Plus className="w-3 h-3" />
                                  <span>Đặt lịch</span>
                                </div>
                              </div>
                            )}

                            {/* Status indicator for non-available beds */}
                            {bed.status !== 'available' && !hasAssignment && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className={`text-xs px-2 py-1 rounded-full ${
                                  bed.status === 'cleaning' ? 'bg-yellow-100 text-yellow-800' :
                                  bed.status === 'maintenance' ? 'bg-gray-100 text-gray-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {getStatusText(bed.status)}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Bed Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thêm giường mới</h3>

            <div className="space-y-4">
              {/* Bed Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên giường *
                </label>
                <input
                  type="text"
                  value={newBedForm.name}
                  onChange={(e) => setNewBedForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Giường Massage 1"
                />
              </div>

              {/* Room */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phòng
                </label>
                <select
                  value={newBedForm.room}
                  onChange={(e) => setNewBedForm(prev => ({ ...prev, room: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {rooms.filter(room => room !== 'all').map(room => (
                    <option key={room} value={room}>{room}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại giường
                </label>
                <select
                  value={newBedForm.type}
                  onChange={(e) => setNewBedForm(prev => ({ ...prev, type: e.target.value as TreatmentBed['type'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="massage">Massage</option>
                  <option value="facial">Facial</option>
                  <option value="body">Body</option>
                  <option value="vip">VIP</option>
                </select>
              </div>

              {/* Equipment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thiết bị (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={newBedForm.equipment.join(', ')}
                  onChange={(e) => setNewBedForm(prev => ({
                    ...prev,
                    equipment: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Máy massage, Đèn LED, Hệ thống âm thanh"
                />
              </div>
            </div>

            {/* Dialog Actions */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCancelAdd}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleAddBed}
                disabled={!newBedForm.name.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Thêm giường
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bed Dialog */}
      {showEditDialog && editingBed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chỉnh sửa giường</h3>

            <div className="space-y-4">
              {/* Bed Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên giường *
                </label>
                <input
                  type="text"
                  value={editBedForm.name}
                  onChange={(e) => setEditBedForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Giường Massage 1"
                />
              </div>

              {/* Room */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phòng
                </label>
                <select
                  value={editBedForm.room}
                  onChange={(e) => setEditBedForm(prev => ({ ...prev, room: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {rooms.filter(room => room !== 'all').map(room => (
                    <option key={room} value={room}>{room}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại giường
                </label>
                <select
                  value={editBedForm.type}
                  onChange={(e) => setEditBedForm(prev => ({ ...prev, type: e.target.value as TreatmentBed['type'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="massage">Massage</option>
                  <option value="facial">Facial</option>
                  <option value="body">Body</option>
                  <option value="vip">VIP</option>
                </select>
              </div>

              {/* Equipment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thiết bị (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={editBedForm.equipment.join(', ')}
                  onChange={(e) => setEditBedForm(prev => ({
                    ...prev,
                    equipment: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Máy massage, Đèn LED, Hệ thống âm thanh"
                />
              </div>

              {/* Current Status Warning */}
              {editingBed.status !== 'available' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full mt-0.5"></div>
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Lưu ý</p>
                      <p className="text-sm text-yellow-700">
                        Giường đang có trạng thái: <strong>{getStatusText(editingBed.status)}</strong>.
                        Việc chỉnh sửa có thể ảnh hưởng đến lịch hẹn hi���n tại.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dialog Actions */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleEditBed}
                disabled={!editBedForm.name.trim()}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Cập nhật</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Xác nhận xóa giường</h3>

            <div className="mb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                    <Trash2 className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-800">Cảnh báo</p>
                    <p className="text-sm text-red-700 mt-1">
                      Bạn có chắc chắn muốn xóa giường này? Hành động này không thể hoàn tác và sẽ:
                    </p>
                    <ul className="text-sm text-red-700 mt-2 space-y-1">
                      <li>• Xóa tất cả thông tin về giường</li>
                      <li>• Hủy các lịch hẹn đang được lên kế hoạch (nếu có)</li>
                      <li>• Không thể khôi phục sau khi xóa</li>
                    </ul>
                  </div>
                </div>
              </div>

              {(() => {
                const bedToDelete = beds.find(bed => bed.id === showDeleteConfirm);
                return bedToDelete ? (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">{bedToDelete.name}</h4>
                    <p className="text-sm text-gray-600">{bedToDelete.room} • {bedToDelete.type.toUpperCase()}</p>
                    <p className="text-sm text-gray-500">Trạng thái: {getStatusText(bedToDelete.status)}</p>
                  </div>
                ) : null;
              })()}
            </div>

            {/* Dialog Actions */}
            <div className="flex space-x-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDeleteBed(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa giường</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Dialog */}
      {showAppointmentDialog && selectedBed && (
        <AppointmentDialog
          isOpen={showAppointmentDialog}
          onClose={handleCloseAppointmentDialog}
          onSave={handleAppointmentSave}
          bedName={selectedBed.name}
          timeSlot={selectedTimeSlot}
          date={new Date().toLocaleDateString('vi-VN')}
          existingAppointment={editingAssignment ? {
            customerId: editingAssignment.customerId,
            customerName: editingAssignment.customerName,
            customerPhone: '', // This might need to be added to BedAssignment interface
            service: editingAssignment.service,
            staff: editingAssignment.staff,
            startTime: editingAssignment.startTime,
            estimatedEndTime: editingAssignment.estimatedEndTime,
            notes: ''
          } : null}
          isEditing={isEditingAppointment}
        />
      )}
    </div>
  );
};

export default Beds;

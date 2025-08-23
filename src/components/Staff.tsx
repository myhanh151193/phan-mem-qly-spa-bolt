import React, { useState } from 'react';
import { Search, Plus, User, Mail, Phone, Calendar, Edit, Eye, Trash2, X, Save, Shield, Lock, Users, Settings, Star, MapPin, CreditCard, UserCheck, AlertCircle, Check } from 'lucide-react';

interface Staff {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  salary: string;
  status: 'active' | 'on-leave' | 'inactive';
  specialties: string[];
  rating: number;
  totalServices: number;
  branch: string;
  address?: string;
  emergencyContact?: string;
  idNumber?: string;
  bankAccount?: string;
  role: 'admin' | 'manager' | 'staff' | 'trainee';
  permissions: string[];
}

interface StaffFormData {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  salary: string;
  status: 'active' | 'on-leave' | 'inactive';
  specialties: string[];
  branch: string;
  address: string;
  emergencyContact: string;
  idNumber: string;
  bankAccount: string;
  role: 'admin' | 'manager' | 'staff' | 'trainee';
  permissions: string[];
}

interface StaffProps {
  selectedBranch: string;
}

const Staff: React.FC<StaffProps> = ({ selectedBranch }) => {
  const [staff, setStaff] = useState<Staff[]>([
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
      branch: 'Chi nhánh Quận 1',
      accessibleBranches: ['branch-1'], // Can only access their primary branch
      address: '123 Nguyễn Huệ, Q1, TP.HCM',
      emergencyContact: '0909888777',
      idNumber: '001234567890',
      bankAccount: '1234567890',
      role: 'staff',
      permissions: ['view_services', 'manage_appointments', 'view_customers']
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
      branch: 'Chi nhánh Quận 3',
      accessibleBranches: ['branch-2'], // Can only access their primary branch
      address: '456 Lê Lợi, Q3, TP.HCM',
      emergencyContact: '0909777666',
      idNumber: '001234567891',
      bankAccount: '1234567891',
      role: 'staff',
      permissions: ['view_services', 'manage_appointments', 'view_customers']
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
      branch: 'Chi nhánh Thủ Đức',
      accessibleBranches: ['branch-3'], // Can only access their primary branch
      address: '789 Võ Văn Ngân, Thủ Đức, TP.HCM',
      emergencyContact: '0909666555',
      idNumber: '001234567892',
      bankAccount: '1234567892',
      role: 'trainee',
      permissions: ['view_services']
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
      branch: 'Chi nhánh Quận 1',
      accessibleBranches: ['branch-1', 'branch-2', 'branch-3'], // Manager can access multiple branches
      address: '321 Đống Đa, Q1, TP.HCM',
      emergencyContact: '0909555444',
      idNumber: '001234567893',
      bankAccount: '1234567893',
      role: 'manager',
      permissions: ['view_services', 'manage_appointments', 'view_customers', 'manage_staff', 'view_reports', 'manage_inventory']
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const [formData, setFormData] = useState<StaffFormData>({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    avatar: '',
    joinDate: '',
    salary: '',
    status: 'active',
    specialties: [],
    branch: '',
    address: '',
    emergencyContact: '',
    idNumber: '',
    bankAccount: '',
    role: 'staff',
    permissions: []
  });

  const [specialtyInput, setSpecialtyInput] = useState('');

  // Available options
  const departments = ['Điều trị', 'Massage', 'Làm đẹp', 'Quản lý', 'Lễ tân', 'Kỹ thuật'];
  const allBranches: Branch[] = [
    { id: 'branch-1', name: 'Chi nhánh Quận 1', address: '123 Nguyễn Huệ, Q1' },
    { id: 'branch-2', name: 'Chi nhánh Quận 3', address: '456 Võ Văn Tần, Q3' },
    { id: 'branch-3', name: 'Chi nhánh Thủ Đức', address: '789 Phạm Văn Đồng, Thủ Đức' },
    { id: 'branch-4', name: 'Chi nhánh Gò Vấp', address: '321 Quang Trung, Gò Vấp' }
  ];
  const branches = allBranches.map(b => b.name);
  const availableSpecialties = [
    'Chăm sóc da mặt', 'Điều trị mụn', 'Tái tạo da', 'Massage toàn thân', 
    'Massage thái', 'Massage đá nóng', 'Tắm trắng', 'Triệt lông', 'RF giảm béo',
    'Quản lý vận hành', 'Đào tạo nhân viên', 'Chăm sóc khách hàng', 'Lễ tân',
    'Kỹ thuật máy móc', 'Tư vấn khách hàng'
  ];

  // Permission system
  const allPermissions = [
    { id: 'view_services', name: 'Xem dịch vụ', category: 'Dịch vụ' },
    { id: 'manage_services', name: 'Quản lý dịch vụ', category: 'Dịch vụ' },
    { id: 'view_appointments', name: 'Xem lịch hẹn', category: 'Lịch hẹn' },
    { id: 'manage_appointments', name: 'Quản lý lịch hẹn', category: 'Lịch hẹn' },
    { id: 'view_customers', name: 'Xem khách hàng', category: 'Khách hàng' },
    { id: 'manage_customers', name: 'Quản lý khách hàng', category: 'Khách hàng' },
    { id: 'view_staff', name: 'Xem nhân viên', category: 'Nhân viên' },
    { id: 'manage_staff', name: 'Quản lý nhân viên', category: 'Nhân viên' },
    { id: 'view_inventory', name: 'Xem kho', category: 'Kho hàng' },
    { id: 'manage_inventory', name: 'Quản lý kho', category: 'Kho hàng' },
    { id: 'view_reports', name: 'Xem báo cáo', category: 'Báo cáo' },
    { id: 'manage_reports', name: 'Quản lý báo cáo', category: 'Báo cáo' },
    { id: 'view_finance', name: 'Xem tài chính', category: 'Tài chính' },
    { id: 'manage_finance', name: 'Quản lý tài chính', category: 'Tài chính' },
    { id: 'system_admin', name: 'Quản trị hệ thống', category: 'Hệ thống' }
  ];

  const rolePermissions = {
    admin: allPermissions.map(p => p.id),
    manager: ['view_services', 'manage_services', 'view_appointments', 'manage_appointments', 'view_customers', 'manage_customers', 'view_staff', 'manage_staff', 'view_inventory', 'manage_inventory', 'view_reports'],
    staff: ['view_services', 'view_appointments', 'manage_appointments', 'view_customers', 'view_inventory'],
    trainee: ['view_services', 'view_appointments', 'view_customers']
  };

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'staff': return 'bg-green-100 text-green-800';
      case 'trainee': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'manager': return 'Quản lý';
      case 'staff': return 'Nhân viên';
      case 'trainee': return 'Thực tập sinh';
      default: return 'Không xác định';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'manager': return <UserCheck className="w-4 h-4" />;
      case 'staff': return <User className="w-4 h-4" />;
      case 'trainee': return <Users className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  // CRUD Operations
  const openCreateModal = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      position: '',
      department: '',
      email: '',
      phone: '',
      avatar: '',
      joinDate: new Date().toISOString().split('T')[0],
      salary: '',
      status: 'active',
      specialties: [],
      branch: '',
      accessibleBranches: [],
      address: '',
      emergencyContact: '',
      idNumber: '',
      bankAccount: '',
      role: 'staff',
      permissions: rolePermissions.staff
    });
    setShowModal(true);
  };

  const openEditModal = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setFormData({
      name: staffMember.name,
      position: staffMember.position,
      department: staffMember.department,
      email: staffMember.email,
      phone: staffMember.phone,
      avatar: staffMember.avatar,
      joinDate: staffMember.joinDate,
      salary: staffMember.salary,
      status: staffMember.status,
      specialties: [...staffMember.specialties],
      branch: staffMember.branch,
      accessibleBranches: [...staffMember.accessibleBranches],
      address: staffMember.address || '',
      emergencyContact: staffMember.emergencyContact || '',
      idNumber: staffMember.idNumber || '',
      bankAccount: staffMember.bankAccount || '',
      role: staffMember.role,
      permissions: [...staffMember.permissions]
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStaff(null);
    setSpecialtyInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const staffData: Staff = {
      id: editingStaff ? editingStaff.id : Date.now(),
      ...formData,
      rating: editingStaff ? editingStaff.rating : 5.0,
      totalServices: editingStaff ? editingStaff.totalServices : 0
    };

    if (editingStaff) {
      setStaff(prev => prev.map(s => s.id === editingStaff.id ? staffData : s));
    } else {
      setStaff(prev => [...prev, staffData]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    setStaff(prev => prev.filter(s => s.id !== id));
    setShowDeleteConfirm(null);
  };

  const addSpecialty = () => {
    if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialtyInput.trim()]
      }));
      setSpecialtyInput('');
    }
  };

  const removeSpecialty = (specialtyToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialtyToRemove)
    }));
  };

  const addPredefinedSpecialty = (specialty: string) => {
    if (!formData.specialties.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    }
  };

  const handleRoleChange = (newRole: string) => {
    // Set default branch access based on role
    let defaultAccessibleBranches: string[] = [];
    switch (newRole) {
      case 'admin':
        defaultAccessibleBranches = allBranches.map(b => b.id); // Admin can access all branches
        break;
      case 'manager':
        defaultAccessibleBranches = allBranches.slice(0, 3).map(b => b.id); // Manager can access multiple branches
        break;
      case 'staff':
      case 'trainee':
        defaultAccessibleBranches = formData.branch ? [getBranchIdByName(formData.branch)] : []; // Staff/trainee access their primary branch only
        break;
    }

    setFormData(prev => ({
      ...prev,
      role: newRole as any,
      permissions: rolePermissions[newRole as keyof typeof rolePermissions] || [],
      accessibleBranches: defaultAccessibleBranches.filter(Boolean)
    }));
  };

  // Helper functions for branch management
  const getBranchNameById = (branchId: string): string => {
    const branch = allBranches.find(b => b.id === branchId);
    return branch ? branch.name : branchId;
  };

  const getBranchIdByName = (branchName: string): string => {
    const branch = allBranches.find(b => b.name === branchName);
    return branch ? branch.id : '';
  };

  const toggleBranchAccess = (branchId: string) => {
    setFormData(prev => ({
      ...prev,
      accessibleBranches: prev.accessibleBranches.includes(branchId)
        ? prev.accessibleBranches.filter(id => id !== branchId)
        : [...prev.accessibleBranches, branchId]
    }));
  };

  const handlePrimaryBranchChange = (branchName: string) => {
    const branchId = getBranchIdByName(branchName);
    setFormData(prev => ({
      ...prev,
      branch: branchName,
      // Automatically add primary branch to accessible branches if not already included
      accessibleBranches: branchId && !prev.accessibleBranches.includes(branchId)
        ? [...prev.accessibleBranches, branchId]
        : prev.accessibleBranches
    }));
  };

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  // Permission management
  const openPermissionModal = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setShowPermissionModal(true);
  };

  const updateStaffPermissions = (staffId: number, newPermissions: string[]) => {
    setStaff(prev => prev.map(s => 
      s.id === staffId ? { ...s, permissions: newPermissions } : s
    ));
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

  // Filter staff
  const filteredStaff = staff.filter(member => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    const matchesRole = filterRole === 'all' || member.role === filterRole;

    // Branch filtering
    let matchesBranch = true;
    if (selectedBranch !== 'all-branches') {
      const selectedBranchName = getBranchNameFromId(selectedBranch);
      if (selectedBranchName) {
        matchesBranch = member.branch === selectedBranchName;
      }
    }

    return matchesSearch && matchesStatus && matchesRole && matchesBranch;
  });

  // Calculate stats based on branch filtering (but before other filters)
  const branchFilteredStaff = staff.filter(member => {
    if (selectedBranch === 'all-branches') return true;
    const selectedBranchName = getBranchNameFromId(selectedBranch);
    return selectedBranchName ? member.branch === selectedBranchName : true;
  });

  const stats = {
    total: branchFilteredStaff.length,
    active: branchFilteredStaff.filter(s => s.status === 'active').length,
    onLeave: branchFilteredStaff.filter(s => s.status === 'on-leave').length,
    inactive: branchFilteredStaff.filter(s => s.status === 'inactive').length,
    avgRating: branchFilteredStaff.length > 0 ? (branchFilteredStaff.reduce((sum, s) => sum + s.rating, 0) / branchFilteredStaff.length).toFixed(1) : '0'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Branch Indicator */}
        {selectedBranch !== 'all-branches' && (
          <div className="w-full mb-4 lg:mb-0">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Đang xem nhân viên của: {getBranchNameFromId(selectedBranch)}
                </span>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {stats.total} nhân viên
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang làm việc</option>
            <option value="on-leave">Nghỉ phép</option>
            <option value="inactive">Không hoạt động</option>
          </select>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="admin">Quản trị viên</option>
            <option value="manager">Quản lý</option>
            <option value="staff">Nhân viên</option>
            <option value="trainee">Thực tập sinh</option>
          </select>
        </div>

        <button 
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm nhân viên</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng nhân viên</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <User className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang làm việc</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
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
              <p className="text-2xl font-bold text-yellow-600">{stats.onLeave}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Không hoạt động</p>
              <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đánh giá TB</p>
              <p className="text-2xl font-bold text-purple-600">{stats.avgRating}</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStaff.map((member) => (
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
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                      {getRoleIcon(member.role)}
                      <span className="ml-1">{getRoleText(member.role)}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {getStatusText(member.status)}
                </span>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => {
                      setSelectedStaff(member);
                      setShowDetailModal(true);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Xem chi tiết"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openPermissionModal(member)}
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                    title="Phân quyền"
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openEditModal(member)}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    title="Chỉnh sửa"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(member.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
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
                {member.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                  >
                    {specialty}
                  </span>
                ))}
                {member.specialties.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    +{member.specialties.length - 3} khác
                  </span>
                )}
              </div>
            </div>

            {/* Branch Access */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Quyền truy cập chi nhánh ({member.accessibleBranches?.length || 0}):</p>
              <div className="flex flex-wrap gap-2">
                {member.accessibleBranches?.slice(0, 2).map((branchId) => {
                  const branchName = getBranchNameById(branchId);
                  const isPrimary = member.branch === branchName;
                  return (
                    <span
                      key={branchId}
                      className={`px-2 py-1 text-xs rounded-md flex items-center space-x-1 ${
                        isPrimary
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-orange-50 text-orange-700'
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      <span>{branchName.replace('Chi nhánh ', '')}</span>
                      {isPrimary && <span className="text-green-600">★</span>}
                    </span>
                  );
                }) || []}
                {(member.accessibleBranches?.length || 0) > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    +{(member.accessibleBranches?.length || 0) - 2} khác
                  </span>
                )}
                {(!member.accessibleBranches || member.accessibleBranches.length === 0) && (
                  <span className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md">
                    Chưa có quyền truy cập
                  </span>
                )}
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

            {/* Permissions Preview */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Quy���n hạn ({member.permissions.length}):</p>
              <div className="flex flex-wrap gap-1">
                {member.permissions.slice(0, 4).map((permission) => {
                  const perm = allPermissions.find(p => p.id === permission);
                  return perm ? (
                    <span key={permission} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                      {perm.name}
                    </span>
                  ) : null;
                })}
                {member.permissions.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{member.permissions.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingStaff ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin cơ bản</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="VD: Nguyễn Thị Mai"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chức vụ *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="VD: Chuyên viên chăm sóc da"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phòng ban *
                    </label>
                    <select
                      required
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Chọn phòng ban</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chi nhánh *
                    </label>
                    <select
                      required
                      value={formData.branch}
                      onChange={(e) => handlePrimaryBranchChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Chọn chi nhánh</option>
                      {branches.map((branch) => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="mai.nguyen@spa.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0901234567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày vào làm
                    </label>
                    <input
                      type="date"
                      value={formData.joinDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, joinDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lương (VNĐ)
                    </label>
                    <input
                      type="text"
                      value={formData.salary}
                      onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="15,000,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trạng thái
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Đang làm việc</option>
                      <option value="on-leave">Nghỉ phép</option>
                      <option value="inactive">Không hoạt động</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Avatar
                    </label>
                    <input
                      type="url"
                      value={formData.avatar}
                      onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin bổ sung</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123 Nguyễn Huệ, Q1, TP.HCM"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Liên hệ khẩn cấp
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0909888777"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CMND/CCCD
                    </label>
                    <input
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="001234567890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số tài khoản
                    </label>
                    <input
                      type="text"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData(prev => ({ ...prev, bankAccount: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1234567890"
                    />
                  </div>
                </div>
              </div>

              {/* Role & Permissions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Vai trò & Phân quyền</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vai trò *
                    </label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => handleRoleChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="trainee">Thực tập sinh</option>
                      <option value="staff">Nhân viên</option>
                      <option value="manager">Quản lý</option>
                      <option value="admin">Quản trị viên</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quyền hạn
                    </label>
                    <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {Object.entries(
                        allPermissions.reduce((acc, perm) => {
                          if (!acc[perm.category]) acc[perm.category] = [];
                          acc[perm.category].push(perm);
                          return acc;
                        }, {} as Record<string, typeof allPermissions>)
                      ).map(([category, perms]) => (
                        <div key={category} className="mb-3">
                          <p className="text-xs font-medium text-gray-600 mb-2">{category}</p>
                          {perms.map((perm) => (
                            <label key={perm.id} className="flex items-center mb-1">
                              <input
                                type="checkbox"
                                checked={formData.permissions.includes(perm.id)}
                                onChange={() => togglePermission(perm.id)}
                                className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{perm.name}</span>
                            </label>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Access Management */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quyền truy cập chi nhánh</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Cài đặt quyền truy cập</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Chọn những chi nhánh mà nhân viên này có thể xem và làm việc. Chi nhánh chính sẽ được tự động thêm vào danh sách.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Chi nhánh có thể truy cập ({formData.accessibleBranches.length}/{allBranches.length})
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {allBranches.map((branch) => {
                        const isAccessible = formData.accessibleBranches.includes(branch.id);
                        const isPrimary = formData.branch === branch.name;
                        return (
                          <div
                            key={branch.id}
                            className={`border rounded-lg p-4 transition-all ${
                              isAccessible
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <label className="flex items-start space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isAccessible}
                                onChange={() => toggleBranchAccess(branch.id)}
                                className="mt-1 rounded text-blue-600 focus:ring-blue-500"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h4 className="text-sm font-medium text-gray-900">{branch.name}</h4>
                                  {isPrimary && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Chi nh��nh chính
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{branch.address}</p>
                                {isAccessible && (
                                  <div className="flex items-center space-x-1 mt-2">
                                    <Check className="w-3 h-3 text-green-600" />
                                    <span className="text-xs text-green-600">Có quyền truy cập</span>
                                  </div>
                                )}
                              </div>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick access buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        accessibleBranches: allBranches.map(b => b.id)
                      }))}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    >
                      Chọn tất cả
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const primaryBranchId = getBranchIdByName(formData.branch);
                        setFormData(prev => ({
                          ...prev,
                          accessibleBranches: primaryBranchId ? [primaryBranchId] : []
                        }));
                      }}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Chỉ chi nhánh chính
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        accessibleBranches: []
                      }))}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Bỏ chọn tất cả
                    </button>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Chuyên môn</h3>
                
                {/* Predefined Specialties */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn từ danh sách
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSpecialties.map((specialty) => (
                      <button
                        key={specialty}
                        type="button"
                        onClick={() => addPredefinedSpecialty(specialty)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          formData.specialties.includes(specialty)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Specialty Input */}
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    placeholder="Thêm chuyên môn khác..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                  />
                  <button
                    type="button"
                    onClick={addSpecialty}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Selected Specialties */}
                {formData.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {specialty}
                        <button
                          type="button"
                          onClick={() => removeSpecialty(specialty)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingStaff ? 'Cập nhật' : 'Thêm mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Chi tiết nhân viên</h2>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start space-x-6 mb-6">
                <img
                  src={selectedStaff.avatar}
                  alt={selectedStaff.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedStaff.name}</h3>
                  <p className="text-gray-600 mb-2">{selectedStaff.position} • {selectedStaff.department}</p>
                  <p className="text-gray-500 mb-3">{selectedStaff.branch}</p>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedStaff.status)}`}>
                      {getStatusText(selectedStaff.status)}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getRoleColor(selectedStaff.role)}`}>
                      {getRoleIcon(selectedStaff.role)}
                      <span className="ml-1">{getRoleText(selectedStaff.role)}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{selectedStaff.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                    <p className="text-gray-900">{selectedStaff.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Địa chỉ</label>
                    <p className="text-gray-900">{selectedStaff.address || 'Chưa cập nhật'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Liên hệ khẩn cấp</label>
                    <p className="text-gray-900">{selectedStaff.emergencyContact || 'Chưa cập nhật'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngày vào làm</label>
                    <p className="text-gray-900">{selectedStaff.joinDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Lương</label>
                    <p className="text-gray-900">{selectedStaff.salary}đ</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">CMND/CCCD</label>
                    <p className="text-gray-900">{selectedStaff.idNumber || 'Chưa cập nhật'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Số tài khoản</label>
                    <p className="text-gray-900">{selectedStaff.bankAccount || 'Chưa cập nhật'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium text-gray-500">Chuyên môn</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedStaff.specialties.map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium text-gray-500">Quyền truy cập chi nhánh</label>
                <div className="mt-2">
                  {selectedStaff.accessibleBranches && selectedStaff.accessibleBranches.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedStaff.accessibleBranches.map((branchId) => {
                        const branch = allBranches.find(b => b.id === branchId);
                        const isPrimary = selectedStaff.branch === branch?.name;
                        return branch ? (
                          <div
                            key={branchId}
                            className={`border rounded-lg p-3 ${
                              isPrimary
                                ? 'border-green-200 bg-green-50'
                                : 'border-blue-200 bg-blue-50'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <MapPin className={`w-4 h-4 ${isPrimary ? 'text-green-600' : 'text-blue-600'}`} />
                              <h4 className={`text-sm font-medium ${isPrimary ? 'text-green-900' : 'text-blue-900'}`}>
                                {branch.name}
                                {isPrimary && <span className="ml-1 text-green-600">★</span>}
                              </h4>
                            </div>
                            <p className={`text-xs mt-1 ${isPrimary ? 'text-green-700' : 'text-blue-700'}`}>
                              {branch.address}
                            </p>
                            {isPrimary && (
                              <p className="text-xs text-green-600 mt-1 font-medium">Chi nhánh chính</p>
                            )}
                          </div>
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <div className="border border-red-200 bg-red-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <p className="text-sm text-red-700">
                          Nhân viên này chưa được cấp quyền truy cập chi nhánh nào
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium text-gray-500">Quyền hạn</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {Object.entries(
                    allPermissions.reduce((acc, perm) => {
                      if (!acc[perm.category]) acc[perm.category] = [];
                      acc[perm.category].push(perm);
                      return acc;
                    }, {} as Record<string, typeof allPermissions>)
                  ).map(([category, perms]) => (
                    <div key={category}>
                      <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
                      {perms.map((perm) => (
                        <div key={perm.id} className="flex items-center mb-1">
                          {selectedStaff.permissions.includes(perm.id) ? (
                            <Check className="w-4 h-4 text-green-600 mr-2" />
                          ) : (
                            <X className="w-4 h-4 text-red-400 mr-2" />
                          )}
                          <span className={`text-sm ${selectedStaff.permissions.includes(perm.id) ? 'text-gray-900' : 'text-gray-400'}`}>
                            {perm.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{selectedStaff.rating}</p>
                  <p className="text-sm text-gray-500">Đánh giá</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{selectedStaff.totalServices}</p>
                  <p className="text-sm text-gray-500">Dịch vụ đã th��c hiện</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{selectedStaff.permissions.length}</p>
                  <p className="text-sm text-gray-500">Quyền h���n</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permission Modal */}
      {showPermissionModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Shield className="w-6 h-6 text-purple-600" />
                <span>Phân quyền cho {selectedStaff.name}</span>
              </h2>
              <button 
                onClick={() => setShowPermissionModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò hiện tại</label>
                <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getRoleColor(selectedStaff.role)}`}>
                  {getRoleIcon(selectedStaff.role)}
                  <span className="ml-1">{getRoleText(selectedStaff.role)}</span>
                </span>
              </div>

              <div className="space-y-6">
                {Object.entries(
                  allPermissions.reduce((acc, perm) => {
                    if (!acc[perm.category]) acc[perm.category] = [];
                    acc[perm.category].push(perm);
                    return acc;
                  }, {} as Record<string, typeof allPermissions>)
                ).map(([category, perms]) => (
                  <div key={category} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">{category}</h3>
                    <div className="space-y-2">
                      {perms.map((perm) => (
                        <label key={perm.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedStaff.permissions.includes(perm.id)}
                            onChange={() => {
                              const newPermissions = selectedStaff.permissions.includes(perm.id)
                                ? selectedStaff.permissions.filter(p => p !== perm.id)
                                : [...selectedStaff.permissions, perm.id];
                              
                              setSelectedStaff({ ...selectedStaff, permissions: newPermissions });
                              updateStaffPermissions(selectedStaff.id, newPermissions);
                            }}
                            className="mr-3 rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{perm.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Lưu ý về phân quyền</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Quyền hạn sẽ được áp dụng ngay lập tức. Hãy cẩn thận khi thay đổi quyền hạn của nhân viên.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Xác nhận xóa nhân viên
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa nhân viên này? Hành động này không thể hoàn tác và sẽ xóa tất cả dữ liệu liên quan.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;

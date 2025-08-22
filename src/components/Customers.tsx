import React, { useState } from 'react';
import { 
  Search, Plus, Edit, Eye, Phone, Mail, MapPin, Calendar, X, AlertCircle,
  Gift, Star, Clock, FileText, Heart, Bell, Camera, Cake, Award
} from 'lucide-react';

interface ServiceHistory {
  id: number;
  date: string;
  service: string;
  staff: string;
  price: number;
  rating?: number;
  notes?: string;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string;
  avatar: string;
  membershipLevel: 'Member' | 'VIP' | 'VVIP';
  totalSpent: number;
  visits: number;
  lastVisit: string;
  joinDate: string;
  status: 'active' | 'inactive';
  serviceHistory: ServiceHistory[];
  notes: {
    allergies?: string;
    preferences?: string;
    favoriteServices?: string[];
    skinType?: string;
    specialRequests?: string;
  };
  loyaltyPoints: number;
  nextBirthday: string;
  personalOffers: string[];
  branch: string; // Branch where customer is primarily managed
}

interface NewCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string;
  allergies?: string;
  preferences?: string;
  skinType?: string;
  branch?: string;
}

interface CustomersProps {
  selectedBranch: string;
}

const Customers: React.FC<CustomersProps> = ({ selectedBranch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'notes' | 'offers'>('info');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  // Branch mapping for display
  const branchMap: { [key: string]: string } = {
    'branch-1': 'Chi nhánh Quận 1',
    'branch-2': 'Chi nhánh Quận 3',
    'branch-3': 'Chi nhánh Thủ Đức',
    'branch-4': 'Chi nhánh Gò Vấp'
  };
  
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Nguyễn Thu Hà',
      phone: '0901234567',
      email: 'thuha@email.com',
      address: '123 Nguyễn Huệ, Q.1, TP.HCM',
      dateOfBirth: '1990-05-15',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=150',
      membershipLevel: 'VVIP',
      totalSpent: 15200000,
      visits: 24,
      lastVisit: '2025-01-10',
      joinDate: '2023-03-15',
      status: 'active',
      loyaltyPoints: 1520,
      nextBirthday: '2025-05-15',
      personalOffers: ['Giảm 20% dịch vụ chăm sóc da', 'Tặng 1 buổi massage miễn phí'],
      serviceHistory: [
        {
          id: 1,
          date: '2025-01-10',
          service: 'Chăm sóc da mặt Premium',
          staff: 'Nguyễn Mai',
          price: 800000,
          rating: 5,
          notes: 'Khách hàng rất hài lòng'
        },
        {
          id: 2,
          date: '2025-01-03',
          service: 'Massage toàn thân',
          staff: 'Lê Hoa',
          price: 600000,
          rating: 5
        }
      ],
      notes: {
        allergies: 'Dị ứng với tinh dầu hoa hồng',
        preferences: 'Thích không gian yên tĩnh, nhạc nhẹ',
        favoriteServices: ['Chăm sóc da mặt Premium', 'Massage đá nóng'],
        skinType: 'Da khô, nhạy cảm',
        specialRequests: 'Luôn yêu cầu cùng một nhân viên'
      },
      branch: 'branch-1'
    },
    {
      id: 2,
      name: 'Trần Mai Linh',
      phone: '0907654321',
      email: 'mailinh@email.com',
      address: '456 Võ Văn Tần, Q.3, TP.HCM',
      dateOfBirth: '1985-08-22',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=150',
      membershipLevel: 'VIP',
      totalSpent: 8500000,
      visits: 12,
      lastVisit: '2025-01-08',
      joinDate: '2023-06-20',
      status: 'active',
      loyaltyPoints: 850,
      nextBirthday: '2025-08-22',
      personalOffers: ['Giảm 15% gói liệu trình'],
      serviceHistory: [
        {
          id: 3,
          date: '2025-01-08',
          service: 'Tắm trắng toàn thân',
          staff: 'Trần An',
          price: 1200000,
          rating: 4
        }
      ],
      notes: {
        preferences: 'Thích dịch vụ vào buổi sáng',
        favoriteServices: ['Tắm trắng', 'Massage thái'],
        skinType: 'Da dầu'
      },
      branch: 'branch-2'
    },
    {
      id: 3,
      name: 'Lê Minh Châu',
      phone: '0912345678',
      email: 'minhchau@email.com',
      address: '789 Phạm Văn Đồng, Thủ Đức, TP.HCM',
      dateOfBirth: '1995-12-03',
      avatar: 'https://images.pexels.com/photos/1037915/pexels-photo-1037915.jpeg?w=150',
      membershipLevel: 'Member',
      totalSpent: 4200000,
      visits: 8,
      lastVisit: '2025-01-05',
      joinDate: '2024-01-10',
      status: 'active',
      loyaltyPoints: 420,
      nextBirthday: '2025-12-03',
      personalOffers: ['Giảm 10% dịch vụ đầu tiên trong tháng'],
      serviceHistory: [
        {
          id: 4,
          date: '2025-01-05',
          service: 'Điều trị mụn',
          staff: 'Nguyễn Mai',
          price: 500000,
          rating: 4
        }
      ],
      notes: {
        allergies: 'Không dị ứng',
        skinType: 'Da mụn, dầu',
        favoriteServices: ['Điều trị mụn']
      },
      branch: 'branch-3'
    }
  ]);
  
  const [newCustomer, setNewCustomer] = useState<NewCustomer>({
    name: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    allergies: '',
    preferences: '',
    skinType: '',
    branch: 'branch-1' // Default branch
  });
  
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [errors, setErrors] = useState<Partial<NewCustomer>>({});
  const [editErrors, setEditErrors] = useState<Partial<NewCustomer>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  // Filtered customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterLevel === 'all' || customer.membershipLevel === filterLevel;

    // Branch filtering
    const matchesBranch = selectedBranch === 'all-branches' || customer.branch === selectedBranch;

    return matchesSearch && matchesFilter && matchesBranch;
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<NewCustomer> = {};
    
    if (!newCustomer.name.trim()) newErrors.name = 'Họ tên là bắt buộc';
    if (!newCustomer.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(newCustomer.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (newCustomer.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCustomer.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!newCustomer.address.trim()) newErrors.address = 'Địa chỉ là bắt buộc';
    if (!newCustomer.dateOfBirth) newErrors.dateOfBirth = 'Ngày sinh là bắt buộc';
    
    // Check duplicates
    const phoneExists = customers.some(customer => customer.phone === newCustomer.phone);
    const emailExists = newCustomer.email.trim() && customers.some(customer => customer.email === newCustomer.email);
    
    if (phoneExists) newErrors.phone = 'Số điện thoại đã tồn tại';
    if (emailExists) newErrors.email = 'Email đã tồn tại';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEditForm = (): boolean => {
    if (!editCustomer) return false;
    
    const newErrors: Partial<NewCustomer> = {};
    
    if (!editCustomer.name.trim()) newErrors.name = 'Họ tên là bắt buộc';
    if (!editCustomer.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(editCustomer.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (editCustomer.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editCustomer.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!editCustomer.address.trim()) newErrors.address = 'Địa chỉ là bắt buộc';
    if (!editCustomer.dateOfBirth) newErrors.dateOfBirth = 'Ngày sinh là bắt buộc';
    
    // Check duplicates (exclude current customer)
    const phoneExists = customers.some(customer => 
      customer.id !== editCustomer.id && customer.phone === editCustomer.phone
    );
    const emailExists = editCustomer.email.trim() && customers.some(customer => 
      customer.id !== editCustomer.id && customer.email === editCustomer.email
    );
    
    if (phoneExists) newErrors.phone = 'Số điện thoại đã tồn tại';
    if (emailExists) newErrors.email = 'Email đã tồn tại';
    
    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof NewCustomer, value: string) => {
    setNewCustomer(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleEditInputChange = (field: keyof Customer, value: string) => {
    if (!editCustomer) return;
    
    setEditCustomer(prev => prev ? { ...prev, [field]: value } : null);
    if (editErrors[field as keyof NewCustomer]) {
      setEditErrors(prev => ({ ...prev, [field as keyof NewCustomer]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCustomerData: Customer = {
        id: Math.max(...customers.map(c => c.id)) + 1,
        ...newCustomer,
        branch: newCustomer.branch || (selectedBranch === 'all-branches' ? 'branch-1' : selectedBranch),
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=150',
        membershipLevel: 'Member',
        totalSpent: 0,
        visits: 0,
        lastVisit: new Date().toISOString().split('T')[0],
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active',
        loyaltyPoints: 0,
        nextBirthday: newCustomer.dateOfBirth.replace(/^\d{4}/, '2025'),
        personalOffers: ['Giảm 10% dịch vụ đầu tiên'],
        serviceHistory: [],
        notes: {
          allergies: newCustomer.allergies || 'Chưa có thông tin',
          preferences: newCustomer.preferences || 'Chưa có thông tin',
          skinType: newCustomer.skinType || 'Chưa xác định',
          favoriteServices: []
        }
      };
      
      setCustomers(prev => [...prev, newCustomerData]);
      setNewCustomer({ name: '', phone: '', email: '', address: '', dateOfBirth: '', allergies: '', preferences: '', skinType: '', branch: 'branch-1' });
      setErrors({});
      setShowModal(false);
      
    } catch (error) {
      alert('Có lỗi xảy ra khi thêm khách hàng');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEditForm() || !editCustomer) return;
    
    setIsEditSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedCustomer: Customer = {
        ...editCustomer,
        nextBirthday: editCustomer.dateOfBirth.replace(/^\d{4}/, '2025'),
        notes: {
          ...editCustomer.notes,
          allergies: editCustomer.notes.allergies || 'Chưa có thông tin',
          preferences: editCustomer.notes.preferences || 'Chưa có thông tin',
          skinType: editCustomer.notes.skinType || 'Chưa xác định'
        }
      };
      
      setCustomers(prev => prev.map(customer => 
        customer.id === editCustomer.id ? updatedCustomer : customer
      ));
      
      // Update selected customer if it's being viewed
      if (selectedCustomer && selectedCustomer.id === editCustomer.id) {
        setSelectedCustomer(updatedCustomer);
      }
      
      setEditErrors({});
      setShowEditModal(false);
      setEditCustomer(null);
      
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật khách hàng');
    } finally {
      setIsEditSubmitting(false);
    }
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
    setActiveTab('info');
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditCustomer({ ...customer });
    setShowEditModal(true);
    setEditErrors({});
  };

  const getMembershipColor = (level: string) => {
    switch (level) {
      case 'VVIP': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'VIP': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'Member': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const isUpcomingBirthday = (nextBirthday: string) => {
    const today = new Date();
    const birthday = new Date(nextBirthday);
    const diffTime = birthday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  return (
    <div className="space-y-6">
      {/* Branch Indicator */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">
                {selectedBranch === 'all-branches' ? (
                  'Tất cả khách hàng'
                ) : (
                  `Khách hàng ${branchMap[selectedBranch] || selectedBranch}`
                )}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  {filteredCustomers.length} khách hàng
                </span>
              </div>
              {selectedBranch !== 'all-branches' && (
                <div className="flex items-center space-x-2 text-xs text-green-700">
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{filteredCustomers.filter(c => c.membershipLevel === 'VVIP').length} VVIP</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>{filteredCustomers.filter(c => c.membershipLevel === 'VIP').length} VIP</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{filteredCustomers.filter(c => c.membershipLevel === 'Member').length} Member</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {selectedBranch !== 'all-branches' && (
            <div className="text-right text-xs text-green-700">
              <div className="font-medium">
                {(() => {
                  const totalRevenue = filteredCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
                  return new Intl.NumberFormat('vi-VN').format(totalRevenue) + 'đ';
                })()}
              </div>
              <div className="text-green-600">Tổng doanh thu</div>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả hạng</option>
            <option value="Member">Member</option>
            <option value="VIP">VIP</option>
            <option value="VVIP">VVIP</option>
          </select>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm khách hàng</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {selectedBranch === 'all-branches' ? 'Tổng khách hàng' : 'Khách hàng chi nhánh'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{filteredCustomers.length}</p>
            </div>
            <Award className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">VVIP</p>
              <p className="text-2xl font-bold text-purple-600">
                {filteredCustomers.filter(c => c.membershipLevel === 'VVIP').length}
              </p>
            </div>
            <Star className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sinh nhật tháng này</p>
              <p className="text-2xl font-bold text-pink-600">
                {filteredCustomers.filter(c => isUpcomingBirthday(c.nextBirthday)).length}
              </p>
            </div>
            <Cake className="w-8 h-8 text-pink-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng chi tiêu</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(filteredCustomers.reduce((sum, c) => sum + c.totalSpent, 0))}
              </p>
            </div>
            <Gift className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {isUpcomingBirthday(customer.nextBirthday) && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                      <Cake className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getMembershipColor(customer.membershipLevel)}`}>
                    {customer.membershipLevel}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleViewCustomer(customer)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleEditCustomer(customer)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{calculateAge(customer.dateOfBirth)} tuổi</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Lần cuối: {customer.lastVisit}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                <p className="text-xs text-gray-500">Chi tiêu</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{customer.visits}</p>
                <p className="text-xs text-gray-500">Lần đến</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{customer.loyaltyPoints}</p>
                <p className="text-xs text-gray-500">Điểm</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Thêm khách hàng mới</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCustomer.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Nhập họ tên khách hàng"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{errors.name}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện tho���i <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={newCustomer.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{errors.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Nhập địa chỉ email"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{errors.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày sinh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={newCustomer.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{errors.dateOfBirth}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCustomer.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Nhập địa chỉ"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.address && (
                  <div className="flex items-center space-x-1 mt-1">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600">{errors.address}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chi nhánh <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newCustomer.branch || ''}
                    onChange={(e) => handleInputChange('branch', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="branch-1">{branchMap['branch-1']}</option>
                    <option value="branch-2">{branchMap['branch-2']}</option>
                    <option value="branch-3">{branchMap['branch-3']}</option>
                    <option value="branch-4">{branchMap['branch-4']}</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Chi nhánh chính để quản lý khách hàng
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại da</label>
                  <select
                    value={newCustomer.skinType || ''}
                    onChange={(e) => handleInputChange('skinType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn loại da</option>
                    <option value="Da khô">Da khô</option>
                    <option value="Da dầu">Da dầu</option>
                    <option value="Da hỗn hợp">Da hỗn hợp</option>
                    <option value="Da nhạy cảm">Da nhạy cảm</option>
                    <option value="Da thường">Da thường</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dị ứng</label>
                <input
                  type="text"
                  value={newCustomer.allergies || ''}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  placeholder="Ghi chú về dị ứng (nếu có)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sở thích</label>
                <textarea
                  value={newCustomer.preferences || ''}
                  onChange={(e) => handleInputChange('preferences', e.target.value)}
                  placeholder="Ghi chú về sở thích, yêu cầu đặc biệt..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Đang thêm...
                    </>
                  ) : (
                    'Thêm khách hàng'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEditModal && editCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Chỉnh sửa thông tin khách hàng</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editCustomer.name}
                    onChange={(e) => handleEditInputChange('name', e.target.value)}
                    placeholder="Nhập họ tên khách hàng"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      editErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {editErrors.name && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{editErrors.name}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={editCustomer.phone}
                    onChange={(e) => handleEditInputChange('phone', e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      editErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {editErrors.phone && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{editErrors.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editCustomer.email}
                    onChange={(e) => handleEditInputChange('email', e.target.value)}
                    placeholder="Nhập địa chỉ email"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      editErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {editErrors.email && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{editErrors.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày sinh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={editCustomer.dateOfBirth}
                    onChange={(e) => handleEditInputChange('dateOfBirth', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      editErrors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {editErrors.dateOfBirth && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{editErrors.dateOfBirth}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editCustomer.address}
                  onChange={(e) => handleEditInputChange('address', e.target.value)}
                  placeholder="Nhập địa chỉ"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    editErrors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {editErrors.address && (
                  <div className="flex items-center space-x-1 mt-1">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600">{editErrors.address}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hạng thành viên</label>
                  <select
                    value={editCustomer.membershipLevel}
                    onChange={(e) => handleEditInputChange('membershipLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Member">Member</option>
                    <option value="VIP">VIP</option>
                    <option value="VVIP">VVIP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại da</label>
                  <select
                    value={editCustomer.notes.skinType || ''}
                    onChange={(e) => {
                      setEditCustomer(prev => prev ? {
                        ...prev,
                        notes: { ...prev.notes, skinType: e.target.value }
                      } : null);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn loại da</option>
                    <option value="Da khô">Da khô</option>
                    <option value="Da dầu">Da dầu</option>
                    <option value="Da hỗn hợp">Da hỗn hợp</option>
                    <option value="Da nhạy cảm">Da nhạy cảm</option>
                    <option value="Da thường">Da thường</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dị ứng</label>
                <input
                  type="text"
                  value={editCustomer.notes.allergies || ''}
                  onChange={(e) => {
                    setEditCustomer(prev => prev ? {
                      ...prev,
                      notes: { ...prev.notes, allergies: e.target.value }
                    } : null);
                  }}
                  placeholder="Ghi chú về dị ứng (nếu có)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sở thích</label>
                <textarea
                  value={editCustomer.notes.preferences || ''}
                  onChange={(e) => {
                    setEditCustomer(prev => prev ? {
                      ...prev,
                      notes: { ...prev.notes, preferences: e.target.value }
                    } : null);
                  }}
                  placeholder="Ghi chú về sở thích, yêu cầu đặc biệt..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yêu cầu đặc biệt</label>
                <textarea
                  value={editCustomer.notes.specialRequests || ''}
                  onChange={(e) => {
                    setEditCustomer(prev => prev ? {
                      ...prev,
                      notes: { ...prev.notes, specialRequests: e.target.value }
                    } : null);
                  }}
                  placeholder="Ghi chú yêu cầu đặc biệt..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  disabled={isEditSubmitting}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isEditSubmitting}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
                >
                  {isEditSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Đang cập nhật...
                    </>
                  ) : (
                    'Cập nhật'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedCustomer.avatar}
                  alt={selectedCustomer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedCustomer.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getMembershipColor(selectedCustomer.membershipLevel)}`}>
                    {selectedCustomer.membershipLevel}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'info', label: 'Thông tin', icon: FileText },
                { id: 'history', label: 'Lịch sử', icon: Clock },
                { id: 'notes', label: 'Ghi chú', icon: Heart },
                { id: 'offers', label: 'Ưu đãi', icon: Gift }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {activeTab === 'info' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Thông tin cá nhân</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{selectedCustomer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{selectedCustomer.address}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">
                            {selectedCustomer.dateOfBirth} ({calculateAge(selectedCustomer.dateOfBirth)} tuổi)
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Cake className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">
                            Sinh nhật: {selectedCustomer.nextBirthday}
                            {isUpcomingBirthday(selectedCustomer.nextBirthday) && (
                              <span className="ml-2 px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                                Sắp tới
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Thống kê</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-blue-600">{selectedCustomer.visits}</p>
                          <p className="text-sm text-blue-600">Lần đến</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-green-600">{formatCurrency(selectedCustomer.totalSpent)}</p>
                          <p className="text-sm text-green-600">Tổng chi tiêu</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-purple-600">{selectedCustomer.loyaltyPoints}</p>
                          <p className="text-sm text-purple-600">Điểm tích lũy</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-orange-600">
                            {new Date().getFullYear() - new Date(selectedCustomer.joinDate).getFullYear()}
                          </p>
                          <p className="text-sm text-orange-600">Năm thành viên</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Lịch sử sử dụng dịch vụ</h4>
                  <div className="space-y-3">
                    {selectedCustomer.serviceHistory.map((service) => (
                      <div key={service.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900">{service.service}</h5>
                            <p className="text-sm text-gray-600">Nhân viên: {service.staff}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{formatCurrency(service.price)}</p>
                            <p className="text-sm text-gray-500">{service.date}</p>
                          </div>
                        </div>
                        {service.rating && (
                          <div className="flex items-center space-x-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < service.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">{service.rating}/5</span>
                          </div>
                        )}
                        {service.notes && (
                          <p className="text-sm text-gray-600 italic">{service.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Thông tin đặc biệt</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-red-50 rounded-lg p-4">
                        <h5 className="font-medium text-red-800 mb-2">Dị ứng</h5>
                        <p className="text-red-700">{selectedCustomer.notes.allergies}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h5 className="font-medium text-blue-800 mb-2">Loại da</h5>
                        <p className="text-blue-700">{selectedCustomer.notes.skinType}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Sở thích</h5>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{selectedCustomer.notes.preferences}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Dịch vụ yêu thích</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedCustomer.notes.favoriteServices?.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedCustomer.notes.specialRequests && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Yêu cầu đặc biệt</h5>
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <p className="text-yellow-800">{selectedCustomer.notes.specialRequests}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'offers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">Ưu đãi cá nhân hóa</h4>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Tạo ưu đãi mới
                    </button>
                  </div>
                  <div className="space-y-3">
                    {selectedCustomer.personalOffers.map((offer, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <Gift className="w-5 h-5 text-blue-600" />
                          <p className="text-gray-900">{offer}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {isUpcomingBirthday(selectedCustomer.nextBirthday) && (
                    <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-lg p-4 border border-pink-200">
                      <div className="flex items-center space-x-3">
                        <Cake className="w-5 h-5 text-pink-600" />
                        <div>
                          <p className="font-medium text-pink-800">Ưu đãi sinh nhật đặc biệt!</p>
                          <p className="text-pink-700 text-sm">Giảm 30% tất cả dịch vụ trong tháng sinh nhật</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;

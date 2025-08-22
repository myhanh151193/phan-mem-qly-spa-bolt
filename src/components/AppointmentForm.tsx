import React, { useState, useEffect } from 'react';
import { User, Phone, Clock, Calendar, DollarSign, FileText, UserCheck, Search, X, Plus } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  membershipLevel: 'Member' | 'VIP' | 'VVIP';
  branch: string;
  notes: {
    allergies?: string;
    preferences?: string;
    favoriteServices?: string[];
    skinType?: string;
    specialRequests?: string;
  };
}

interface Service {
  id: number;
  name: string;
  duration: number;
  price: string;
  category: string;
}

interface Appointment {
  id: number;
  time: string;
  duration: number;
  customer: string;
  customerId?: number;
  customerPhone?: string;
  services: string[];
  staff: string;
  status: 'confirmed' | 'in-progress' | 'pending' | 'cancelled' | 'completed';
  totalPrice: string;
  notes?: string;
  date: string;
  branch?: string;
}

interface AppointmentFormProps {
  appointment?: Appointment | null;
  onSave: (appointment: Partial<Appointment>) => void;
  onCancel: () => void;
  isEditing: boolean;
  onUpdateStatus?: (id: number, status: Appointment['status']) => void;
  selectedBranch?: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  onSave,
  onCancel,
  isEditing,
  onUpdateStatus,
  selectedBranch = 'branch-1'
}) => {
  const [formData, setFormData] = useState({
    customer: '',
    customerId: undefined as number | undefined,
    customerPhone: '',
    services: [] as string[],
    staff: '',
    date: new Date().toISOString().split('T')[0], // Default to today
    time: '',
    duration: 60,
    totalPrice: '',
    notes: '',
    status: 'pending' as Appointment['status'],
    branch: selectedBranch // Use selected branch
  });

  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [showServiceSearch, setShowServiceSearch] = useState(false);

  // Mock customer data (in real app, this would come from props or API)
  const allCustomers: Customer[] = [
    {
      id: 1,
      name: 'Nguyễn Thu Hà',
      phone: '0901234567',
      email: 'thuha@email.com',
      membershipLevel: 'VVIP',
      branch: 'branch-1',
      notes: {
        allergies: 'Dị ứng với tinh dầu hoa hồng',
        preferences: 'Thích không gian yên t��nh, nhạc nhẹ',
        favoriteServices: ['Chăm sóc da mặt Premium', 'Massage đá nóng'],
        skinType: 'Da khô, nhạy cảm',
        specialRequests: 'Luôn yêu cầu cùng một nhân viên'
      }
    },
    {
      id: 2,
      name: 'Trần Mai Linh',
      phone: '0907654321',
      email: 'mailinh@email.com',
      membershipLevel: 'VIP',
      branch: 'branch-2',
      notes: {
        preferences: 'Thích dịch vụ vào buổi sáng',
        favoriteServices: ['Tắm trắng', 'Massage thái'],
        skinType: 'Da dầu'
      }
    },
    {
      id: 3,
      name: 'Lê Minh Châu',
      phone: '0912345678',
      email: 'minhchau@email.com',
      membershipLevel: 'Member',
      branch: 'branch-3',
      notes: {
        allergies: 'Không dị ứng',
        skinType: 'Da mụn, dầu',
        favoriteServices: ['Điều trị mụn']
      }
    },
    {
      id: 4,
      name: 'Phạm Thị Lan',
      phone: '0934567890',
      email: 'lan.pham@email.com',
      membershipLevel: 'VIP',
      branch: 'branch-1',
      notes: {
        preferences: 'Thích dịch vụ buổi chiều',
        favoriteServices: ['Gói chăm sóc VIP'],
        skinType: 'Da thường'
      }
    },
    {
      id: 5,
      name: 'Nguyễn Thị Bích',
      phone: '0945678901',
      email: 'bich.nguyen@email.com',
      membershipLevel: 'Member',
      branch: 'branch-2',
      notes: {
        allergies: 'Dị ứng với nước hoa',
        skinType: 'Da nhạy cảm',
        favoriteServices: ['Chăm sóc da mặt cơ bản']
      }
    }
  ];

  // Filter customers by selected branch
  const customers = selectedBranch === 'all-branches'
    ? allCustomers
    : allCustomers.filter(customer => customer.branch === selectedBranch);

  const services: Service[] = [
    { id: 1, name: 'Chăm sóc da mặt Premium', duration: 90, price: '800K', category: 'Chăm sóc da' },
    { id: 2, name: 'Massage toàn thân', duration: 120, price: '600K', category: 'Massage' },
    { id: 3, name: 'Tắm trắng', duration: 60, price: '500K', category: 'Làm đẹp' },
    { id: 4, name: 'Điều trị mụn', duration: 60, price: '400K', category: 'Điều trị' },
    { id: 5, name: 'Gói chăm sóc VIP', duration: 180, price: '1500K', category: 'Gói combo' },
    { id: 6, name: 'Chăm sóc da mặt cơ bản', duration: 60, price: '300K', category: 'Chăm sóc da' },
    { id: 7, name: 'Tẩy tế bào chết', duration: 45, price: '250K', category: 'Làm đẹp' },
    { id: 8, name: 'Massage mặt', duration: 30, price: '200K', category: 'Massage' },
    { id: 9, name: 'Điều trị nám', duration: 75, price: '600K', category: 'Điều trị' },
    { id: 10, name: 'Phun môi', duration: 120, price: '800K', category: 'Phun xăm' },
    { id: 11, name: 'Phun mày', duration: 90, price: '700K', category: 'Phun xăm' }
  ];

  // Staff members with their branches
  const staffMembers = [
    { name: 'Nguyễn Mai', branch: 'branch-1' },
    { name: 'Lê Hoa', branch: 'branch-2' },
    { name: 'Trần An', branch: 'branch-3' },
    { name: 'Phạm Thùy', branch: 'branch-1' },
    { name: 'Lý Thu', branch: 'branch-2' },
    { name: 'Vũ Lan', branch: 'branch-3' }
  ];

  // Helper function to get staff member's branch
  const getStaffBranch = (staffName: string): string => {
    const staff = staffMembers.find(s => s.name === staffName);
    return staff ? staff.branch : 'branch-1';
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i + 8;
    if (hour >= 24) return null;
    return `${hour.toString().padStart(2, '0')}:00`;
  }).filter(Boolean);

  useEffect(() => {
    if (appointment) {
      setFormData({
        customer: appointment.customer || '',
        customerId: appointment.customerId,
        customerPhone: appointment.customerPhone || '',
        services: appointment.services || [],
        staff: appointment.staff || '',
        date: appointment.date || new Date().toISOString().split('T')[0],
        time: appointment.time || '',
        duration: appointment.duration || 60,
        totalPrice: appointment.totalPrice || '',
        notes: appointment.notes || '',
        status: appointment.status || 'pending',
        branch: appointment.branch || selectedBranch
      });
    }
  }, [appointment]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.phone.includes(customerSearchTerm)
  );

  // Filter staff members by selected branch (unless viewing all branches)
  const filteredStaffMembers = selectedBranch === 'all-branches'
    ? staffMembers
    : staffMembers.filter(staff => staff.branch === selectedBranch);

  const selectCustomer = (customer: Customer) => {
    setFormData(prev => ({
      ...prev,
      customer: customer.name,
      customerId: customer.id,
      customerPhone: customer.phone
    }));
    setShowCustomerSearch(false);
    setCustomerSearchTerm('');
  };

  const addService = (serviceName: string) => {
    if (!formData.services.includes(serviceName)) {
      const service = services.find(s => s.name === serviceName);
      if (service) {
        const newServices = [...formData.services, serviceName];
        const totalDuration = newServices.reduce((total, serviceName) => {
          const s = services.find(svc => svc.name === serviceName);
          return total + (s?.duration || 0);
        }, 0);

        setFormData(prev => ({
          ...prev,
          services: newServices,
          duration: totalDuration
        }));
        calculateTotalPrice(newServices);
      }
    }
    setShowServiceSearch(false);
  };

  const removeService = (serviceName: string) => {
    const newServices = formData.services.filter(s => s !== serviceName);
    const totalDuration = newServices.reduce((total, serviceName) => {
      const s = services.find(svc => svc.name === serviceName);
      return total + (s?.duration || 0);
    }, 0);

    setFormData(prev => ({
      ...prev,
      services: newServices,
      duration: totalDuration
    }));
    calculateTotalPrice(newServices);
  };

  const calculateTotalPrice = (selectedServices: string[]) => {
    const total = selectedServices.reduce((sum, serviceName) => {
      const service = services.find(s => s.name === serviceName);
      if (service) {
        const price = parseInt(service.price.replace(/[^0-9]/g, ''));
        return sum + price;
      }
      return sum;
    }, 0);

    setFormData(prev => ({
      ...prev,
      totalPrice: `${total}K`
    }));
  };

  const getMembershipColor = (level: string) => {
    switch (level) {
      case 'VVIP': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'VIP': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'Member': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      alert('Vui lòng chọn ít nhất một dịch vụ');
      return;
    }

    // Convert back to the expected format
    const appointmentData = {
      ...formData,
      service: formData.services.join(', '), // For backward compatibility
      price: formData.totalPrice
    };

    onSave(appointmentData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const quickStatusUpdate = (status: Appointment['status']) => {
    if (appointment && onUpdateStatus) {
      onUpdateStatus(appointment.id, status);
      onCancel();
    }
  };

  return (
    <div>
      {/* Quick Status Actions for Editing */}
      {isEditing && appointment && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Cập nhật trạng thái nhanh:</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => quickStatusUpdate('confirmed')}
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
            >
              Xác nhận
            </button>
            <button
              onClick={() => quickStatusUpdate('in-progress')}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              Bắt đầu
            </button>
            <button
              onClick={() => quickStatusUpdate('completed')}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Hoàn thành
            </button>
            <button
              onClick={() => quickStatusUpdate('cancelled')}
              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
            >
              Hủy lịch
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Khách hàng *
            </label>
            <div className="relative">
              <div
                onClick={() => setShowCustomerSearch(!showCustomerSearch)}
                className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[48px] flex items-center justify-between"
              >
                {formData.customer ? (
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-medium text-gray-900">{formData.customer}</p>
                      <p className="text-sm text-gray-600">{formData.customerPhone}</p>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-500">Chọn khách hàng từ danh sách</span>
                )}
                <Search className="w-4 h-4 text-gray-400" />
              </div>

              {showCustomerSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200">
                    <input
                      type="text"
                      value={customerSearchTerm}
                      onChange={(e) => setCustomerSearchTerm(e.target.value)}
                      placeholder="Tìm kiếm khách hàng..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredCustomers.map(customer => (
                      <div
                        key={customer.id}
                        onClick={() => selectCustomer(customer)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{customer.name}</p>
                            <p className="text-sm text-gray-600">{customer.phone}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getMembershipColor(customer.membershipLevel)}`}>
                            {customer.membershipLevel}
                          </span>
                        </div>
                        {customer.notes.favoriteServices && customer.notes.favoriteServices.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">Dịch vụ yêu thích:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {customer.notes.favoriteServices.slice(0, 2).map((service, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Service Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dịch vụ *
            </label>

            {/* Selected Services */}
            {formData.services.length > 0 && (
              <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-2">Dịch vụ đã chọn:</p>
                <div className="space-y-2">
                  {formData.services.map((serviceName, index) => {
                    const service = services.find(s => s.name === serviceName);
                    return (
                      <div key={index} className="flex items-center justify-between bg-white rounded-md p-2">
                        <div>
                          <span className="font-medium text-gray-900">{serviceName}</span>
                          <span className="text-sm text-gray-600 ml-2">({service?.duration}ph - {service?.price})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeService(serviceName)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add Service Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowServiceSearch(!showServiceSearch)}
                className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm dịch vụ</span>
              </button>

              {showServiceSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {/* Group services by category */}
                  {['Ch��m sóc da', 'Massage', 'Làm đẹp', 'Điều trị', 'Gói combo', 'Phun xăm'].map(category => {
                    const categoryServices = services.filter(s => s.category === category);
                    if (categoryServices.length === 0) return null;

                    return (
                      <div key={category} className="border-b border-gray-200 last:border-b-0">
                        <div className="px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700">
                          {category}
                        </div>
                        {categoryServices.map(service => (
                          <div
                            key={service.id}
                            onClick={() => addService(service.name)}
                            className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                              formData.services.includes(service.name) ? 'bg-blue-50 text-blue-600' : ''
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{service.name}</p>
                                <p className="text-sm text-gray-600">{service.duration} phút</p>
                              </div>
                              <span className="font-semibold text-green-600">{service.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Staff Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserCheck className="w-4 h-4 inline mr-2" />
              Nhân viên thực hiện
            </label>
            <select
              value={formData.staff}
              onChange={(e) => handleInputChange('staff', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn nhân viên (không bắt buộc)</option>
              {filteredStaffMembers.map(staff => (
                <option key={staff.name} value={staff.name}>{staff.name}</option>
              ))}
            </select>
          </div>

          {/* Total Price Display */}
          {formData.services.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Tổng giá dịch vụ
              </label>
              <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                <span className="text-xl font-bold text-green-600">{formData.totalPrice}</span>
                <span className="text-sm text-gray-600 ml-2">({formData.duration} phút)</span>
              </div>
            </div>
          )}
        </div>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Ngày hẹn *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]} // Prevent booking in the past
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Giờ hẹn *
            </label>
            <select
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Chọn giờ</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thời gian dự kiến
            </label>
            <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
              <span className="font-medium text-gray-900">{formData.duration} phút</span>
              <span className="text-sm text-gray-600 ml-2">
                ({Math.floor(formData.duration / 60)}h {formData.duration % 60}p)
              </span>
            </div>
          </div>
        </div>

        {/* Status (for editing) */}
        {isEditing && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="in-progress">Đang thực hiện</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Ghi ch��
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Ghi chú thêm về lịch hẹn..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Cập nhật' : 'Tạo lịch hẹn'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;

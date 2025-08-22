import React, { useState, useEffect } from 'react';
import { X, User, Clock, Calendar, FileText, UserCheck } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface Service {
  id: number;
  name: string;
  duration: number;
  price: string;
}

interface AppointmentData {
  customerId?: number;
  customerName: string;
  customerPhone: string;
  service: string;
  staff: string;
  bedId?: number;
  bedName?: string;
  startTime: string;
  estimatedEndTime: string;
  notes: string;
}

interface AppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointmentData: AppointmentData) => void;
  bedName?: string;
  timeSlot: string;
  date: string;
  existingAppointment?: AppointmentData | null;
  isEditing?: boolean;
  selectedBranch?: string;
}

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  bedName,
  timeSlot,
  date,
  existingAppointment,
  isEditing = false,
  selectedBranch = 'branch-1'
}) => {
  const [formData, setFormData] = useState<AppointmentData>({
    customerId: undefined,
    customerName: '',
    customerPhone: '',
    service: '',
    staff: '',
    bedId: undefined,
    bedName: bedName || '',
    startTime: timeSlot,
    estimatedEndTime: '',
    notes: ''
  });

  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');

  // Mock data
  const customers: Customer[] = [
    { id: 1, name: 'Nguyễn Thu Hà', phone: '0901234567', email: 'thuha@email.com' },
    { id: 2, name: 'Trần Mai Linh', phone: '0907654321', email: 'mailinh@email.com' },
    { id: 3, name: 'Lê Minh Châu', phone: '0912345678', email: 'minhchau@email.com' },
    { id: 4, name: 'Phạm Thị Lan', phone: '0934567890', email: 'thilan@email.com' }
  ];

  const services: Service[] = [
    { id: 1, name: 'Chăm sóc da mặt Premium', duration: 90, price: '800K' },
    { id: 2, name: 'Massage toàn thân', duration: 120, price: '600K' },
    { id: 3, name: 'Tắm trắng', duration: 60, price: '500K' },
    { id: 4, name: 'Điều trị mụn', duration: 60, price: '400K' },
    { id: 5, name: 'Chăm sóc da mặt cơ bản', duration: 60, price: '300K' }
  ];

  const staffMembers = [
    'Nguyễn Mai',
    'Lê Hoa',
    'Trần An',
    'Phạm Thùy',
    'Lý Thu',
    'Vũ Lan'
  ];

  // Beds/Treatment rooms data with their branches
  const allBeds = [
    { id: 1, name: 'Phòng VIP 1', room: 'Phòng VIP', branch: 'branch-1' },
    { id: 2, name: 'Phòng VIP 2', room: 'Phòng VIP', branch: 'branch-1' },
    { id: 3, name: 'Phòng thường 1', room: 'Phòng thường', branch: 'branch-1' },
    { id: 4, name: 'Phòng thường 2', room: 'Phòng thường', branch: 'branch-1' },
    { id: 5, name: 'Phòng VIP A', room: 'Phòng VIP', branch: 'branch-2' },
    { id: 6, name: 'Phòng VIP B', room: 'Phòng VIP', branch: 'branch-2' },
    { id: 7, name: 'Phòng thường A', room: 'Phòng thường', branch: 'branch-2' },
    { id: 8, name: 'Phòng thường B', room: 'Phòng thường', branch: 'branch-2' },
    { id: 9, name: 'Phòng đặc biệt 1', room: 'Phòng đặc biệt', branch: 'branch-3' },
    { id: 10, name: 'Phòng đặc biệt 2', room: 'Phòng đặc biệt', branch: 'branch-3' },
    { id: 11, name: 'Phòng cơ bản 1', room: 'Phòng cơ bản', branch: 'branch-3' },
    { id: 12, name: 'Phòng cơ bản 2', room: 'Phòng cơ bản', branch: 'branch-3' },
    { id: 13, name: 'Phòng spa 1', room: 'Phòng spa', branch: 'branch-4' },
    { id: 14, name: 'Phòng spa 2', room: 'Phòng spa', branch: 'branch-4' },
    { id: 15, name: 'Phòng massage 1', room: 'Phòng massage', branch: 'branch-4' },
    { id: 16, name: 'Phòng massage 2', room: 'Phòng massage', branch: 'branch-4' }
  ];

  // Filter beds by selected branch
  const filteredBeds = selectedBranch === 'all-branches'
    ? allBeds
    : allBeds.filter(bed => bed.branch === selectedBranch);

  useEffect(() => {
    if (existingAppointment) {
      setFormData(existingAppointment);
    } else {
      setFormData({
        customerId: undefined,
        customerName: '',
        customerPhone: '',
        service: '',
        staff: '',
        bedId: undefined,
        bedName: bedName || '',
        startTime: timeSlot,
        estimatedEndTime: '',
        notes: ''
      });
    }
  }, [existingAppointment, timeSlot, bedName]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.phone.includes(customerSearchTerm)
  );

  const selectCustomer = (customer: Customer) => {
    setFormData(prev => ({
      ...prev,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone
    }));
    setShowCustomerSearch(false);
    setCustomerSearchTerm('');
  };

  const calculateEndTime = (startTime: string, serviceName: string) => {
    const service = services.find(s => s.name === serviceName);
    if (!service) return startTime;

    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + service.duration;
    
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  const handleServiceChange = (serviceName: string) => {
    const endTime = calculateEndTime(formData.startTime, serviceName);
    setFormData(prev => ({
      ...prev,
      service: serviceName,
      estimatedEndTime: endTime
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.service) {
      alert('Vui lòng điền đầy đủ thông tin khách hàng và dịch vụ');
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Chỉnh sửa lịch hẹn' : 'Đặt lịch hẹn'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {bedName ? `${bedName} • ` : ''}{date} • {timeSlot}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Selection */}
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
                {formData.customerName ? (
                  <div>
                    <p className="font-medium text-gray-900">{formData.customerName}</p>
                    <p className="text-sm text-gray-600">{formData.customerPhone}</p>
                  </div>
                ) : (
                  <span className="text-gray-500">Chọn khách hàng</span>
                )}
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
                  <div>
                    {filteredCustomers.map(customer => (
                      <div
                        key={customer.id}
                        onClick={() => selectCustomer(customer)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Service Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dịch vụ *
            </label>
            <select
              value={formData.service}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Chọn dịch vụ</option>
              {services.map(service => (
                <option key={service.id} value={service.name}>
                  {service.name} ({service.duration}ph - {service.price})
                </option>
              ))}
            </select>
          </div>

          {/* Staff Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserCheck className="w-4 h-4 inline mr-2" />
              Nhân viên thực hiện
            </label>
            <select
              value={formData.staff}
              onChange={(e) => setFormData(prev => ({ ...prev, staff: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn nhân viên (không bắt buộc)</option>
              {staffMembers.map(staff => (
                <option key={staff} value={staff}>{staff}</option>
              ))}
            </select>
          </div>

          {/* Time Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Giờ bắt đầu
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => {
                  const newStartTime = e.target.value;
                  const endTime = formData.service ? calculateEndTime(newStartTime, formData.service) : '';
                  setFormData(prev => ({
                    ...prev,
                    startTime: newStartTime,
                    estimatedEndTime: endTime
                  }));
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giờ kết thúc dự kiến
              </label>
              <input
                type="time"
                value={formData.estimatedEndTime}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Ghi chú
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Ghi chú về lịch hẹn..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Cập nhật' : 'Đặt lịch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentDialog;

import React, { useState, useEffect } from 'react';
import { User, Phone, Clock, Calendar, DollarSign, FileText, UserCheck } from 'lucide-react';

interface Appointment {
  id: number;
  time: string;
  duration: number;
  customer: string;
  customerPhone?: string;
  service: string;
  staff: string;
  status: 'confirmed' | 'in-progress' | 'pending' | 'cancelled' | 'completed';
  price: string;
  notes?: string;
  date: string;
}

interface AppointmentFormProps {
  appointment?: Appointment | null;
  onSave: (appointment: Partial<Appointment>) => void;
  onCancel: () => void;
  isEditing: boolean;
  onUpdateStatus?: (id: number, status: Appointment['status']) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  onSave,
  onCancel,
  isEditing,
  onUpdateStatus
}) => {
  const [formData, setFormData] = useState({
    customer: '',
    customerPhone: '',
    service: '',
    staff: '',
    time: '',
    duration: 60,
    price: '',
    notes: '',
    status: 'pending' as Appointment['status']
  });

  const services = [
    'Chăm sóc da mặt Premium',
    'Massage toàn thân',
    'Tắm trắng',
    'Điều trị mụn',
    'Gói chăm sóc VIP',
    'Chăm sóc da mặt cơ bản',
    'Tẩy tế bào chết',
    'Massage mặt',
    'Điều trị nám',
    'Phun môi',
    'Phun mày'
  ];

  const staffMembers = [
    'Nguyễn Mai',
    'Lê Hoa',
    'Trần An',
    'Phạm Thùy',
    'Lý Thu',
    'Vũ Lan'
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i + 8;
    if (hour >= 24) return null;
    return `${hour.toString().padStart(2, '0')}:00`;
  }).filter(Boolean);

  useEffect(() => {
    if (appointment) {
      setFormData({
        customer: appointment.customer || '',
        customerPhone: appointment.customerPhone || '',
        service: appointment.service || '',
        staff: appointment.staff || '',
        time: appointment.time || '',
        duration: appointment.duration || 60,
        price: appointment.price || '',
        notes: appointment.notes || '',
        status: appointment.status || 'pending'
      });
    }
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Tên khách hàng *
            </label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) => handleInputChange('customer', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tên khách hàng"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Số điện thoại
            </label>
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => handleInputChange('customerPhone', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Số điện thoại"
            />
          </div>
        </div>

        {/* Service and Staff */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dịch vụ *
            </label>
            <select
              value={formData.service}
              onChange={(e) => handleInputChange('service', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Chọn dịch vụ</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserCheck className="w-4 h-4 inline mr-2" />
              Nhân viên thực hiện *
            </label>
            <select
              value={formData.staff}
              onChange={(e) => handleInputChange('staff', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Chọn nhân viên</option>
              {staffMembers.map(staff => (
                <option key={staff} value={staff}>{staff}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Time and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              Thời gian (phút) *
            </label>
            <select
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value={30}>30 phút</option>
              <option value={60}>1 giờ</option>
              <option value={90}>1.5 giờ</option>
              <option value={120}>2 giờ</option>
              <option value={150}>2.5 giờ</option>
              <option value={180}>3 giờ</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Giá dịch vụ *
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="VD: 500K"
              required
            />
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
            Ghi chú
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

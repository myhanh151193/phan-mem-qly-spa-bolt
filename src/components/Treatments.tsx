import React, { useState } from 'react';
import { Search, Plus, Calendar, User, ClipboardCheck, Edit2, Trash2, X, Save, ChevronDown } from 'lucide-react';

interface Treatment {
  id: number;
  name: string;
  customer: string;
  startDate: string;
  endDate: string;
  totalSessions: number;
  completedSessions: number;
  nextSession: string | null;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  progress: number;
  services: string[];
  totalValue: string;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  membershipLevel: 'Member' | 'VIP' | 'VVIP';
  avatar: string;
}

interface TreatmentFormData {
  name: string;
  customerId: number | null;
  customer: string;
  startDate: string;
  endDate: string;
  totalSessions: number;
  services: string[];
  totalValue: string;
}

const Treatments: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: 1,
      name: 'Liệu trình trị mụn 3 tháng',
      customer: 'Nguyễn Thu Hà',
      startDate: '2025-01-01',
      endDate: '2025-04-01',
      totalSessions: 12,
      completedSessions: 8,
      nextSession: '2025-01-15',
      status: 'active',
      progress: 67,
      services: ['Điều trị mụn', 'Tái tạo da', 'Chăm sóc da'],
      totalValue: '15,600,000'
    },
    {
      id: 2,
      name: 'Gói chăm sóc da toàn diện',
      customer: 'Trần Mai Linh',
      startDate: '2024-12-01',
      endDate: '2025-03-01',
      totalSessions: 8,
      completedSessions: 6,
      nextSession: '2025-01-20',
      status: 'active',
      progress: 75,
      services: ['Chăm sóc da mặt', 'Massage', 'Tắm trắng'],
      totalValue: '12,800,000'
    },
    {
      id: 3,
      name: 'Liệu trình giảm béo 6 tháng',
      customer: 'Lê Minh Châu',
      startDate: '2024-10-01',
      endDate: '2025-04-01',
      totalSessions: 24,
      completedSessions: 24,
      nextSession: null,
      status: 'completed',
      progress: 100,
      services: ['Giảm béo RF', 'Massage giảm béo', 'Tư vấn dinh dưỡng'],
      totalValue: '28,800,000'
    },
  ]);

  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Nguyễn Thu Hà',
      phone: '0901234567',
      email: 'thuha@email.com',
      membershipLevel: 'VVIP',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=150'
    },
    {
      id: 2,
      name: 'Trần Mai Linh',
      phone: '0907654321',
      email: 'mailinh@email.com',
      membershipLevel: 'VIP',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=150'
    },
    {
      id: 3,
      name: 'Lê Minh Châu',
      phone: '0912345678',
      email: 'minhchau@email.com',
      membershipLevel: 'Member',
      avatar: 'https://images.pexels.com/photos/1037915/pexels-photo-1037915.jpeg?w=150'
    },
    {
      id: 4,
      name: 'Phạm Thị Lan',
      phone: '0938567890',
      email: 'thilan@email.com',
      membershipLevel: 'VIP',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150'
    },
    {
      id: 5,
      name: 'Hoàng Văn Nam',
      phone: '0976543210',
      email: 'vannam@email.com',
      membershipLevel: 'Member',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [formData, setFormData] = useState<TreatmentFormData>({
    name: '',
    customerId: null,
    customer: '',
    startDate: '',
    endDate: '',
    totalSessions: 1,
    services: [],
    totalValue: ''
  });
  const [serviceInput, setServiceInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const availableServices = [
    'Điều trị mụn', 'Tái tạo da', 'Chăm sóc da', 'Chăm sóc da mặt', 
    'Massage', 'Tắm trắng', 'Giảm béo RF', 'Massage giảm béo', 
    'Tư vấn dinh dưỡng', 'Triệt lông', 'Trị thâm', 'Căng da mặt'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang thực hiện';
      case 'paused': return 'Tạm dừng';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  const filteredTreatments = treatments.filter(treatment =>
    treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    treatment.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingTreatment(null);
    setFormData({
      name: '',
      customerId: null,
      customer: '',
      startDate: '',
      endDate: '',
      totalSessions: 1,
      services: [],
      totalValue: ''
    });
    setShowModal(true);
  };

  const openEditModal = (treatment: Treatment) => {
    setEditingTreatment(treatment);
    const selectedCustomer = customers.find(c => c.name === treatment.customer);
    setFormData({
      name: treatment.name,
      customerId: selectedCustomer?.id || null,
      customer: treatment.customer,
      startDate: treatment.startDate,
      endDate: treatment.endDate,
      totalSessions: treatment.totalSessions,
      services: [...treatment.services],
      totalValue: treatment.totalValue
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTreatment(null);
    setServiceInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.customerId || !formData.startDate || !formData.endDate) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const selectedCustomer = customers.find(c => c.id === formData.customerId);
    if (!selectedCustomer) {
      alert('Vui lòng chọn khách hàng');
      return;
    }

    const treatmentData: Treatment = {
      id: editingTreatment ? editingTreatment.id : Date.now(),
      name: formData.name,
      customer: selectedCustomer.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalSessions: formData.totalSessions,
      services: formData.services,
      totalValue: formData.totalValue,
      completedSessions: editingTreatment ? editingTreatment.completedSessions : 0,
      nextSession: editingTreatment ? editingTreatment.nextSession : formData.startDate,
      status: editingTreatment ? editingTreatment.status : 'active',
      progress: editingTreatment
        ? Math.round((editingTreatment.completedSessions / formData.totalSessions) * 100)
        : 0
    };

    if (editingTreatment) {
      setTreatments(prev => prev.map(t => t.id === editingTreatment.id ? treatmentData : t));
    } else {
      setTreatments(prev => [...prev, treatmentData]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    setTreatments(prev => prev.filter(t => t.id !== id));
    setDeleteConfirm(null);
  };

  const addService = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()]
      }));
      setServiceInput('');
    }
  };

  const removeService = (serviceToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== serviceToRemove)
    }));
  };

  const addPredefinedService = (service: string) => {
    if (!formData.services.includes(service)) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, service]
      }));
    }
  };

  const stats = {
    active: treatments.filter(t => t.status === 'active').length,
    completed: treatments.filter(t => t.status === 'completed').length,
    totalValue: treatments.reduce((sum, t) => sum + parseFloat(t.totalValue.replace(/,/g, '')), 0) / 1000000,
    completionRate: Math.round(
      (treatments.reduce((sum, t) => sum + t.progress, 0) / treatments.length) || 0
    )
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm liệu trình..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo liệu trình</span>
        </button>
      </div>

      {/* Treatments List */}
      <div className="space-y-4">
        {filteredTreatments.map((treatment) => (
          <div key={treatment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Treatment Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{treatment.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{treatment.customer}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{treatment.startDate} - {treatment.endDate}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(treatment.status)}`}>
                    {getStatusText(treatment.status)}
                  </span>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {treatment.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Tiến độ</span>
                    <span className="text-sm font-medium text-gray-900">
                      {treatment.completedSessions}/{treatment.totalSessions} buổi
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${treatment.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Next Session & Value */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                  <div className="text-gray-600">
                    {treatment.nextSession ? (
                      <>Buổi tiếp theo: <span className="font-medium text-gray-900">{treatment.nextSession}</span></>
                    ) : (
                      <span className="text-green-600 font-medium">Đã hoàn thành</span>
                    )}
                  </div>
                  <div className="text-gray-900 font-semibold">
                    Giá trị: {treatment.totalValue}đ
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2 min-w-[120px]">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-1">
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Chi tiết</span>
                </button>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => openEditModal(treatment)}
                    className="flex-1 px-3 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setDeleteConfirm(treatment.id)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {treatment.status === 'active' && treatment.nextSession && (
                  <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors duration-200">
                    Đặt lịch
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang thực hiện</p>
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
              <p className="text-sm text-gray-600">Hoàn thành</p>
              <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng giá trị</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalValue.toFixed(1)}M</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
              <p className="text-2xl font-bold text-orange-600">{stats.completionRate}%</p>
            </div>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingTreatment ? 'Sửa liệu trình' : 'Tạo liệu trình mới'}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên liệu trình *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: Liệu trình trị mụn 3 tháng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khách hàng *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer}
                    onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày bắt đầu *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày kết thúc *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tổng số buổi
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalSessions}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalSessions: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá trị (VNĐ)
                  </label>
                  <input
                    type="text"
                    value={formData.totalValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalValue: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: 15,600,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dịch vụ
                </label>
                
                {/* Service Selection */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {availableServices.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => addPredefinedService(service)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          formData.services.includes(service)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Service Input */}
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={serviceInput}
                    onChange={(e) => setServiceInput(e.target.value)}
                    placeholder="Thêm dịch vụ khác..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                  />
                  <button
                    type="button"
                    onClick={addService}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Selected Services */}
                {formData.services.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {service}
                        <button
                          type="button"
                          onClick={() => removeService(service)}
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
                  <span>{editingTreatment ? 'Cập nhật' : 'Tạo mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Xác nhận xóa liệu trình
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa liệu trình này? Hành động này không thể hoàn tác.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
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

export default Treatments;

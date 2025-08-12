import React, { useState } from 'react';
import { Search, Plus, Package, AlertTriangle, TrendingUp, TrendingDown, Edit2, Trash2, X, Save, Eye, Filter, Download, Upload, Calendar, User } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  totalValue: number;
  lastRestocked: string;
  supplier: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  image: string;
  description?: string;
  expiryDate?: string;
  location?: string;
}

interface InventoryFormData {
  name: string;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  supplier: string;
  image: string;
  description: string;
  expiryDate: string;
  location: string;
}

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: 'Serum Vitamin C',
      category: 'Sản phẩm chăm sóc da',
      brand: 'SkinCare Pro',
      sku: 'SKU001',
      stock: 25,
      minStock: 10,
      maxStock: 100,
      unitPrice: 450000,
      totalValue: 11250000,
      lastRestocked: '2025-01-05',
      supplier: 'Beauty Supply Co.',
      status: 'in-stock',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=150',
      description: 'Serum dưỡng trắng da với Vitamin C tự nhiên',
      expiryDate: '2026-01-05',
      location: 'Kệ A1'
    },
    {
      id: 2,
      name: 'Kem dưỡng ẩm ban đêm',
      category: 'Sản phẩm chăm sóc da',
      brand: 'Beauty Plus',
      sku: 'SKU002',
      stock: 18,
      minStock: 15,
      maxStock: 80,
      unitPrice: 320000,
      totalValue: 5760000,
      lastRestocked: '2024-12-28',
      supplier: 'Cosmetics Wholesale',
      status: 'in-stock',
      image: 'https://images.pexels.com/photos/4041390/pexels-photo-4041390.jpeg?w=150',
      description: 'Kem dưỡng ẩm sâu cho da ban đêm',
      expiryDate: '2025-12-28',
      location: 'Kệ A2'
    },
    {
      id: 3,
      name: 'Mặt nạ collagen',
      category: 'Mặt nạ',
      brand: 'GlowSkin',
      sku: 'SKU003',
      stock: 3,
      minStock: 15,
      maxStock: 50,
      unitPrice: 150000,
      totalValue: 450000,
      lastRestocked: '2024-12-20',
      supplier: 'Natural Beauty Ltd.',
      status: 'low-stock',
      image: 'https://images.pexels.com/photos/4041388/pexels-photo-4041388.jpeg?w=150',
      description: 'Mặt nạ bổ sung collagen cho da căng mịn',
      expiryDate: '2025-06-20',
      location: 'Kệ B1'
    },
    {
      id: 4,
      name: 'Tinh dầu massage',
      category: 'Dầu massage',
      brand: 'Aromatherapy Pro',
      sku: 'SKU004',
      stock: 0,
      minStock: 8,
      maxStock: 40,
      unitPrice: 280000,
      totalValue: 0,
      lastRestocked: '2024-11-15',
      supplier: 'Essential Oils Inc.',
      status: 'out-of-stock',
      image: 'https://images.pexels.com/photos/4041387/pexels-photo-4041387.jpeg?w=150',
      description: 'Tinh dầu thư giãn cho massage toàn thân',
      expiryDate: '2025-11-15',
      location: 'Kệ C1'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockAdjustment, setStockAdjustment] = useState({ quantity: 0, type: 'in', note: '' });

  const [formData, setFormData] = useState<InventoryFormData>({
    name: '',
    category: '',
    brand: '',
    sku: '',
    stock: 0,
    minStock: 0,
    maxStock: 0,
    unitPrice: 0,
    supplier: '',
    image: '',
    description: '',
    expiryDate: '',
    location: ''
  });

  const categories = [
    'Sản phẩm chăm sóc da',
    'Mặt nạ',
    'Dầu massage',
    'Serum',
    'Kem dưỡng',
    'Toner',
    'Kem chống nắng',
    'Sữa rửa mặt',
    'Thiết bị',
    'Khác'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock': return 'Còn hàng';
      case 'low-stock': return 'Sắp hết';
      case 'out-of-stock': return 'Hết hàng';
      default: return 'Không xác định';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const getStockLevel = (stock: number, minStock: number, maxStock: number) => {
    if (maxStock === 0) return 'w-0';
    const percentage = (stock / maxStock) * 100;
    if (percentage === 0) return 'w-0';
    if (percentage <= 30) return 'w-1/3';
    if (percentage <= 60) return 'w-2/3';
    return 'w-full';
  };

  const getStockLevelColor = (stock: number, minStock: number) => {
    if (stock === 0) return 'bg-red-500';
    if (stock <= minStock) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const calculateStatus = (stock: number, minStock: number): InventoryItem['status'] => {
    if (stock === 0) return 'out-of-stock';
    if (stock <= minStock) return 'low-stock';
    return 'in-stock';
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: '',
      brand: '',
      sku: '',
      stock: 0,
      minStock: 0,
      maxStock: 0,
      unitPrice: 0,
      supplier: '',
      image: '',
      description: '',
      expiryDate: '',
      location: ''
    });
    setShowModal(true);
  };

  const openEditModal = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      brand: item.brand,
      sku: item.sku,
      stock: item.stock,
      minStock: item.minStock,
      maxStock: item.maxStock,
      unitPrice: item.unitPrice,
      supplier: item.supplier,
      image: item.image,
      description: item.description || '',
      expiryDate: item.expiryDate || '',
      location: item.location || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      name: '',
      category: '',
      brand: '',
      sku: '',
      stock: 0,
      minStock: 0,
      maxStock: 0,
      unitPrice: 0,
      supplier: '',
      image: '',
      description: '',
      expiryDate: '',
      location: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sku || !formData.category) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const status = calculateStatus(formData.stock, formData.minStock);
    const totalValue = formData.stock * formData.unitPrice;

    const itemData: InventoryItem = {
      id: editingItem ? editingItem.id : Date.now(),
      ...formData,
      totalValue,
      status,
      lastRestocked: editingItem ? editingItem.lastRestocked : new Date().toISOString().split('T')[0]
    };

    if (editingItem) {
      setInventory(prev => prev.map(item => item.id === editingItem.id ? itemData : item));
    } else {
      setInventory(prev => [...prev, itemData]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    setInventory(prev => prev.filter(item => item.id !== id));
    setShowDeleteConfirm(null);
  };

  const openDetailModal = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const openStockModal = (item: InventoryItem) => {
    setSelectedItem(item);
    setStockAdjustment({ quantity: 0, type: 'in', note: '' });
    setShowStockModal(true);
  };

  const handleStockAdjustment = () => {
    if (!selectedItem || stockAdjustment.quantity <= 0) {
      alert('Vui lòng nhập số lượng hợp lệ');
      return;
    }

    const newStock = stockAdjustment.type === 'in' 
      ? selectedItem.stock + stockAdjustment.quantity
      : selectedItem.stock - stockAdjustment.quantity;

    if (newStock < 0) {
      alert('Số lượng tồn kho không thể âm');
      return;
    }

    const status = calculateStatus(newStock, selectedItem.minStock);
    const totalValue = newStock * selectedItem.unitPrice;

    setInventory(prev => prev.map(item => 
      item.id === selectedItem.id 
        ? { 
            ...item, 
            stock: newStock, 
            totalValue,
            status,
            lastRestocked: stockAdjustment.type === 'in' ? new Date().toISOString().split('T')[0] : item.lastRestocked
          }
        : item
    ));

    setShowStockModal(false);
    setSelectedItem(null);
  };

  // Filter items
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: inventory.length,
    inStock: inventory.filter(item => item.status === 'in-stock').length,
    lowStock: inventory.filter(item => item.status === 'low-stock').length,
    outOfStock: inventory.filter(item => item.status === 'out-of-stock').length,
    totalValue: inventory.reduce((sum, item) => sum + item.totalValue, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
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
            <option value="in-stock">Còn hàng</option>
            <option value="low-stock">Sắp hết</option>
            <option value="out-of-stock">Hết hàng</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Xuất Excel</span>
          </button>
          <button 
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm sản phẩm</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Còn hàng</p>
              <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sắp hết</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hết hàng</p>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng giá trị</p>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(stats.totalValue)}</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU / Vị trí
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tồn kho
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá / Tổng giá trị
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nhà cung cấp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.brand} • {item.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span className="text-sm font-mono font-medium text-gray-900">{item.sku}</span>
                      {item.location && (
                        <div className="text-xs text-gray-500">{item.location}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{item.stock}</span>
                        <div className="text-xs text-gray-500">Min: {item.minStock}</div>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getStockLevelColor(item.stock, item.minStock)} ${getStockLevel(item.stock, item.minStock, item.maxStock)}`}
                          ></div>
                        </div>
                      </div>
                      {item.stock <= item.minStock && item.stock > 0 && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span className="text-sm text-gray-900">{formatCurrency(item.unitPrice)}</span>
                      <div className="text-sm font-semibold text-gray-900">{formatCurrency(item.totalValue)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{item.supplier}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => openDetailModal(item)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openStockModal(item)}
                        className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                        title="Điều chỉnh tồn kho"
                      >
                        <Package className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditModal(item)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowDeleteConfirm(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingItem ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
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
                    Tên sản phẩm *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: Serum Vitamin C"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: SKU001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thương hiệu
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: SkinCare Pro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng hiện tại
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tồn kho tối thiểu
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minStock}
                    onChange={(e) => setFormData(prev => ({ ...prev, minStock: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tồn kho tối đa
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.maxStock}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxStock: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá đơn vị (VNĐ)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, unitPrice: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: 450000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhà cung cấp
                  </label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: Beauty Supply Co."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vị trí lưu trữ
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: Kệ A1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày hết hạn
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL hình ảnh
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mô tả chi tiết về sản phẩm..."
                />
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
                  <span>{editingItem ? 'Cập nhật' : 'Thêm mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Chi tiết sản phẩm</h2>
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
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedItem.name}</h3>
                  <p className="text-gray-600 mb-2">{selectedItem.brand} • {selectedItem.category}</p>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedItem.status)}`}>
                    {getStatusText(selectedItem.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">SKU</label>
                    <p className="text-gray-900 font-mono">{selectedItem.sku}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Vị trí lưu trữ</label>
                    <p className="text-gray-900">{selectedItem.location || 'Chưa cập nhật'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Nhà cung cấp</label>
                    <p className="text-gray-900">{selectedItem.supplier}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngày nhập kho gần nhất</label>
                    <p className="text-gray-900">{selectedItem.lastRestocked}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tồn kho hiện tại</label>
                    <p className="text-2xl font-bold text-gray-900">{selectedItem.stock}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngưỡng tối thiểu / tối đa</label>
                    <p className="text-gray-900">{selectedItem.minStock} / {selectedItem.maxStock}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Giá đơn vị</label>
                    <p className="text-gray-900">{formatCurrency(selectedItem.unitPrice)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tổng giá trị</label>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(selectedItem.totalValue)}</p>
                  </div>
                </div>
              </div>

              {selectedItem.expiryDate && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">
                      Hạn sử dụng: {selectedItem.expiryDate}
                    </span>
                  </div>
                </div>
              )}

              {selectedItem.description && (
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-500">Mô tả</label>
                  <p className="text-gray-900 mt-1">{selectedItem.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {showStockModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Điều chỉnh tồn kho</h2>
              <button 
                onClick={() => setShowStockModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900">{selectedItem.name}</h3>
                <p className="text-sm text-gray-500">Tồn kho hiện tại: {selectedItem.stock}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại điều chỉnh
                  </label>
                  <select
                    value={stockAdjustment.type}
                    onChange={(e) => setStockAdjustment(prev => ({ ...prev, type: e.target.value as 'in' | 'out' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="in">Nhập kho (+)</option>
                    <option value="out">Xuất kho (-)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={stockAdjustment.quantity}
                    onChange={(e) => setStockAdjustment(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập số lượng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    value={stockAdjustment.note}
                    onChange={(e) => setStockAdjustment(prev => ({ ...prev, note: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Lý do điều chỉnh..."
                  />
                </div>

                {stockAdjustment.quantity > 0 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Tồn kho sau điều chỉnh: {
                        stockAdjustment.type === 'in' 
                          ? selectedItem.stock + stockAdjustment.quantity
                          : selectedItem.stock - stockAdjustment.quantity
                      }
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => setShowStockModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleStockAdjustment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Xác nhận
                </button>
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
                Xác nhận xóa sản phẩm
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa sản phẩm này khỏi kho? Hành động này không thể hoàn tác.
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

export default Inventory;

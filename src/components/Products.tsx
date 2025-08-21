import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, Package, Star, Trash2, X, Upload, Image, Tag, Award } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  category: string;
  price: string;
  duration: number;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  status: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  description: string;
  brand: string;
  image: string;
  status: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  type: 'service' | 'product';
  createdAt: string;
}

interface Brand {
  id: number;
  name: string;
  description: string;
  website?: string;
  createdAt: string;
}

const Products: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'products' | 'categories' | 'brands'>('services');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Service | Product | Category | Brand | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [formData, setFormData] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: 'Chăm sóc da mặt Premium',
      category: 'Chăm sóc da',
      price: '800,000',
      duration: 90,
      description: 'Liệu trình chăm sóc da mặt cao cấp với công nghệ hiện đại',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?w=300',
      status: 'active'
    },
    {
      id: 2,
      name: 'Massage toàn thân',
      category: 'Massage',
      price: '600,000',
      duration: 120,
      description: 'Massage thư giãn toàn thân với tinh dầu thiên nhiên',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?w=300',
      status: 'active'
    },
    {
      id: 3,
      name: 'Tắm trắng toàn thân',
      category: 'Làm đẹp',
      price: '1,200,000',
      duration: 150,
      description: 'Liệu trình tắm trắng an toàn với công nghệ Laser',
      rating: 4.7,
      reviews: 67,
      image: 'https://images.pexels.com/photos/3997376/pexels-photo-3997376.jpeg?w=300',
      status: 'active'
    },
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Serum Vitamin C',
      category: 'Sản phẩm chăm sóc da',
      price: '450,000',
      stock: 25,
      description: 'Serum dưỡng trắng da với Vitamin C tự nhiên',
      brand: 'SkinCare Pro',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=300',
      status: 'in-stock'
    },
    {
      id: 2,
      name: 'Kem dưỡng ẩm ban đêm',
      category: 'Sản phẩm chăm sóc da',
      price: '320,000',
      stock: 18,
      description: 'Kem dưỡng ẩm sâu cho da ban đêm',
      brand: 'Beauty Plus',
      image: 'https://images.pexels.com/photos/4041390/pexels-photo-4041390.jpeg?w=300',
      status: 'in-stock'
    },
    {
      id: 3,
      name: 'Mặt nạ collagen',
      category: 'M��t nạ',
      price: '150,000',
      stock: 3,
      description: 'Mặt nạ bổ sung collagen cho da căng mịn',
      brand: 'GlowSkin',
      image: 'https://images.pexels.com/photos/4041388/pexels-photo-4041388.jpeg?w=300',
      status: 'low-stock'
    },
  ]);

  // CRUD Functions
  const openAddDialog = () => {
    setEditingItem(null);
    setImagePreview('');
    setFormData(activeTab === 'services' ? {
      name: '',
      category: '',
      price: '',
      duration: 0,
      description: '',
      image: '',
      rating: 0,
      reviews: 0,
      status: 'active'
    } : {
      name: '',
      category: '',
      price: '',
      stock: 0,
      description: '',
      brand: '',
      image: '',
      status: 'in-stock'
    });
    setShowDialog(true);
  };

  const openEditDialog = (item: Service | Product) => {
    setEditingItem(item);
    setFormData({ ...item });
    setImagePreview(item.image || '');
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setEditingItem(null);
    setFormData({});
    setImagePreview('');
    setUploadingImage(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file hình ảnh.');
        return;
      }

      setUploadingImage(true);
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
        setUploadingImage(false);
      };

      reader.onerror = () => {
        alert('Lỗi khi đọc file. Vui lòng thử lại.');
        setUploadingImage(false);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) return;

    if (activeTab === 'services') {
      if (editingItem) {
        setServices(prev => prev.map(service =>
          service.id === editingItem.id ? { ...formData, id: editingItem.id } : service
        ));
      } else {
        const newService = { ...formData, id: Date.now() };
        setServices(prev => [...prev, newService]);
      }
    } else {
      if (editingItem) {
        setProducts(prev => prev.map(product =>
          product.id === editingItem.id ? { ...formData, id: editingItem.id } : product
        ));
      } else {
        const newProduct = { ...formData, id: Date.now() };
        setProducts(prev => [...prev, newProduct]);
      }
    }
    closeDialog();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      if (activeTab === 'services') {
        setServices(prev => prev.filter(service => service.id !== id));
      } else {
        setProducts(prev => prev.filter(product => product.id !== id));
      }
    }
  };

  // Filter items based on search
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === 'services'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dịch vụ
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === 'products'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sản phẩm
          </button>
        </div>
        
        <button
          onClick={openAddDialog}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm {activeTab === 'services' ? 'dịch vụ' : 'sản phẩm'}</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Tìm kiếm ${activeTab === 'services' ? 'dịch vụ' : 'sản phẩm'}...`}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Content */}
      {activeTab === 'services' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{service.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{service.category}</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{service.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-bold text-blue-600">{service.price}đ</div>
                  <div className="text-sm text-gray-500">{service.duration} phút</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{service.reviews} đánh giá</span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEditDialog(service)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'in-stock' ? 'bg-green-100 text-green-800' :
                    product.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.status === 'in-stock' ? 'Còn hàng' :
                     product.status === 'low-stock' ? 'Sắp hết' :
                     'Hết hàng'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-bold text-blue-600">{product.price}đ</div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Package className="w-4 h-4" />
                    <span>{product.stock}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{product.category}</span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEditDialog(product)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingItem ? 'Chỉnh sửa' : 'Thêm'} {activeTab === 'services' ? 'dịch vụ' : 'sản phẩm'}
              </h3>
              <button
                onClick={closeDialog}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên {activeTab === 'services' ? 'dịch vụ' : 'sản phẩm'} *
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Nhập tên ${activeTab === 'services' ? 'dịch vụ' : 'sản phẩm'}`}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danh mục *
                </label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập danh mục"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá *
                </label>
                <input
                  type="text"
                  value={formData.price || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: 500,000"
                />
              </div>

              {/* Service specific fields */}
              {activeTab === 'services' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời gian (phút)
                  </label>
                  <input
                    type="number"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ví dụ: 90"
                  />
                </div>
              )}

              {/* Product specific fields */}
              {activeTab === 'products' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thương hiệu
                    </label>
                    <input
                      type="text"
                      value={formData.brand || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập thương hiệu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số lượng tồn kho
                    </label>
                    <input
                      type="number"
                      value={formData.stock || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ví dụ: 50"
                    />
                  </div>
                </>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập mô tả chi tiết"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ��nh
                </label>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Upload Buttons */}
                <div className="flex flex-col space-y-3">
                  {/* File Upload */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploadingImage}
                    />
                    <div className={`w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 hover:bg-blue-50 transition-colors ${
                      uploadingImage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}>
                      <div className="flex flex-col items-center space-y-2">
                        {uploadingImage ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        ) : (
                          <Upload className="w-6 h-6 text-gray-400" />
                        )}
                        <p className="text-sm text-gray-600">
                          {uploadingImage ? 'Đang tải lên...' : 'Chọn ảnh từ thiết bị'}
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF tối đa 5MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* URL Input */}
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <input
                        type="url"
                        value={formData.image && !imagePreview ? formData.image : ''}
                        onChange={(e) => {
                          const url = e.target.value;
                          setFormData(prev => ({ ...prev, image: url }));
                          if (url && url.match(/\.(jpeg|jpg|gif|png)$/i)) {
                            setImagePreview(url);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Hoặc nhập URL hình ảnh"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const url = formData.image;
                        if (url && url.match(/\.(jpeg|jpg|gif|png)$/i)) {
                          setImagePreview(url);
                        }
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Image className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dialog Actions */}
            <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={closeDialog}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name || !formData.price}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {editingItem ? 'Cập nhật' : 'Thêm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, Package, Star, Trash2, X } from 'lucide-react';

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

const Products: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'products'>('services');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Service | Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [formData, setFormData] = useState<any>({});

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
      category: 'Mặt nạ',
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
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setEditingItem(null);
    setFormData({});
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
          {products.map((product) => (
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
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

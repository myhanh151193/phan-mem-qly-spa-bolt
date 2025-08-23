import React, { useState } from 'react';
import { Search, Plus, Package, AlertTriangle, TrendingUp, TrendingDown, Edit2, Trash2, X, Save, Eye, Filter, Download, Upload, Calendar, User, Tag, Award, Grid, List } from 'lucide-react';
import { categories as masterCategories, brands as masterBrands, Category, Brand } from '../data/masterData';

// Product master data (shared across all branches)
interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  sku: string;
  description?: string;
  image: string;
  unitPrice: number;
  supplier: string;
  expiryDate?: string;
  status: 'active' | 'inactive';
  createdDate: string;
}

// Stock tracking per branch
interface BranchStock {
  id: number;
  productId: number;
  branch: string;
  stock: number;
  minStock: number;
  maxStock: number;
  location?: string;
  lastRestocked: string;
}

// Combined view for display
interface InventoryView {
  product: Product;
  branchStock: BranchStock;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  totalValue: number;
}

interface InventoryProps {
  selectedBranch: string;
}


interface ProductFormData {
  name: string;
  category: string;
  brand: string;
  sku: string;
  unitPrice: number;
  supplier: string;
  image: string;
  description: string;
  expiryDate: string;
  status: 'active' | 'inactive';
}

interface StockFormData {
  stock: number;
  minStock: number;
  maxStock: number;
  location: string;
}

interface CategoryFormData {
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

interface BrandFormData {
  name: string;
  description: string;
  supplier: string;
  status: 'active' | 'inactive';
  logo: string;
}

const Inventory: React.FC<InventoryProps> = ({ selectedBranch }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'categories' | 'brands'>('inventory');
  
  // Product master data (shared across branches)
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Serum Vitamin C',
      category: 'Sản phẩm chăm sóc da',
      brand: 'SkinCare Pro',
      sku: 'SKU001',
      description: 'Serum dưỡng trắng da với Vitamin C tự nhiên',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=150',
      unitPrice: 450000,
      supplier: 'Beauty Supply Co.',
      expiryDate: '2026-01-05',
      status: 'active',
      createdDate: '2024-11-01'
    },
    {
      id: 2,
      name: 'Kem dưỡng ẩm ban đêm',
      category: 'Sản phẩm chăm sóc da',
      brand: 'Beauty Plus',
      sku: 'SKU002',
      description: 'Kem dưỡng ẩm sâu cho da ban đêm',
      image: 'https://images.pexels.com/photos/4041390/pexels-photo-4041390.jpeg?w=150',
      unitPrice: 320000,
      supplier: 'Cosmetics Wholesale',
      expiryDate: '2025-12-28',
      status: 'active',
      createdDate: '2024-11-01'
    },
    {
      id: 3,
      name: 'Mặt nạ collagen',
      category: 'Mặt nạ',
      brand: 'GlowSkin',
      sku: 'SKU003',
      description: 'Mặt nạ bổ sung collagen cho da căng mịn',
      image: 'https://images.pexels.com/photos/4041388/pexels-photo-4041388.jpeg?w=150',
      unitPrice: 150000,
      supplier: 'Natural Beauty Ltd.',
      expiryDate: '2025-06-20',
      status: 'active',
      createdDate: '2024-11-01'
    },
    {
      id: 4,
      name: 'Tinh dầu massage',
      category: 'Dầu massage',
      brand: 'Aromatherapy Pro',
      sku: 'SKU004',
      description: 'Tinh dầu thư giãn cho massage toàn thân',
      image: 'https://images.pexels.com/photos/4041387/pexels-photo-4041387.jpeg?w=150',
      unitPrice: 280000,
      supplier: 'Essential Oils Inc.',
      expiryDate: '2025-11-15',
      status: 'active',
      createdDate: '2024-11-01'
    },
    {
      id: 5,
      name: 'Kem chống nắng SPF50',
      category: 'Sản phẩm chăm sóc da',
      brand: 'SunGuard',
      sku: 'SKU005',
      description: 'Kem chống nắng bảo vệ da hiệu quả',
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=150',
      unitPrice: 380000,
      supplier: 'Beauty Supply Co.',
      expiryDate: '2026-06-15',
      status: 'active',
      createdDate: '2024-11-01'
    }
  ]);

  // Branch stock data (stock per branch for each product)
  const [branchStocks, setBranchStocks] = useState<BranchStock[]>([
    // Chi nhánh Quận 1 stocks
    { id: 1, productId: 1, branch: 'branch-1', stock: 25, minStock: 10, maxStock: 100, location: 'Kệ A1', lastRestocked: '2025-01-05' },
    { id: 2, productId: 2, branch: 'branch-1', stock: 18, minStock: 15, maxStock: 80, location: 'Kệ A2', lastRestocked: '2024-12-28' },
    { id: 3, productId: 3, branch: 'branch-1', stock: 3, minStock: 15, maxStock: 50, location: 'Kệ B1', lastRestocked: '2024-12-20' },
    { id: 4, productId: 4, branch: 'branch-1', stock: 0, minStock: 8, maxStock: 40, location: 'Kệ C1', lastRestocked: '2024-11-15' },
    { id: 5, productId: 5, branch: 'branch-1', stock: 12, minStock: 10, maxStock: 60, location: 'K��� A3', lastRestocked: '2025-01-08' },

    // Chi nhánh Quận 3 stocks
    { id: 6, productId: 1, branch: 'branch-2', stock: 30, minStock: 12, maxStock: 80, location: 'Kệ B1', lastRestocked: '2025-01-10' },
    { id: 7, productId: 2, branch: 'branch-2', stock: 22, minStock: 15, maxStock: 70, location: 'Kệ B2', lastRestocked: '2025-01-02' },
    { id: 8, productId: 3, branch: 'branch-2', stock: 8, minStock: 10, maxStock: 40, location: 'Kệ C1', lastRestocked: '2024-12-25' },
    { id: 9, productId: 4, branch: 'branch-2', stock: 15, minStock: 8, maxStock: 35, location: 'Kệ D1', lastRestocked: '2024-12-30' },
    { id: 10, productId: 5, branch: 'branch-2', stock: 5, minStock: 8, maxStock: 50, location: 'Kệ B3', lastRestocked: '2024-12-20' },

    // Chi nhánh Thủ Đức stocks
    { id: 11, productId: 1, branch: 'branch-3', stock: 15, minStock: 8, maxStock: 60, location: 'Kệ A1', lastRestocked: '2024-12-28' },
    { id: 12, productId: 2, branch: 'branch-3', stock: 10, minStock: 12, maxStock: 50, location: 'Kệ A2', lastRestocked: '2024-12-25' },
    { id: 13, productId: 3, branch: 'branch-3', stock: 20, minStock: 15, maxStock: 45, location: 'Kệ B1', lastRestocked: '2025-01-03' },
    { id: 14, productId: 4, branch: 'branch-3', stock: 8, minStock: 5, maxStock: 30, location: 'Kệ C1', lastRestocked: '2025-01-01' },
    { id: 15, productId: 5, branch: 'branch-3', stock: 18, minStock: 10, maxStock: 55, location: 'Kệ A3', lastRestocked: '2025-01-12' },

    // Chi nhánh Gò Vấp stocks
    { id: 16, productId: 1, branch: 'branch-4', stock: 8, minStock: 10, maxStock: 70, location: 'Kệ A1', lastRestocked: '2024-12-15' },
    { id: 17, productId: 2, branch: 'branch-4', stock: 25, minStock: 12, maxStock: 65, location: 'Kệ A2', lastRestocked: '2025-01-06' },
    { id: 18, productId: 3, branch: 'branch-4', stock: 0, minStock: 10, maxStock: 40, location: 'Kệ B1', lastRestocked: '2024-11-20' },
    { id: 19, productId: 4, branch: 'branch-4', stock: 12, minStock: 6, maxStock: 35, location: 'Kệ C1', lastRestocked: '2024-12-28' },
    { id: 20, productId: 5, branch: 'branch-4', stock: 22, minStock: 10, maxStock: 60, location: 'Kệ A3', lastRestocked: '2025-01-10' }
  ]);

  const [categories, setCategories] = useState<Category[]>(masterCategories.filter(cat => cat.type === 'product' || !cat.type));
  const [brands, setBrands] = useState<Brand[]>(masterBrands);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingStock, setEditingStock] = useState<BranchStock | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockAdjustment, setStockAdjustment] = useState({ quantity: 0, type: 'in', note: '' });

  const [productFormData, setProductFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    brand: '',
    sku: '',
    unitPrice: 0,
    supplier: '',
    image: '',
    description: '',
    expiryDate: '',
    status: 'active'
  });

  const [stockFormData, setStockFormData] = useState<StockFormData>({
    stock: 0,
    minStock: 0,
    maxStock: 0,
    location: ''
  });

  const [categoryFormData, setCategoryFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    status: 'active'
  });

  const [brandFormData, setBrandFormData] = useState<BrandFormData>({
    name: '',
    description: '',
    supplier: '',
    status: 'active',
    logo: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock': return 'Còn hàng';
      case 'low-stock': return 'Sắp hết';
      case 'out-of-stock': return 'Hết hàng';
      case 'active': return 'Hoạt động';
      case 'inactive': return 'Ngừng hoạt động';
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

  const calculateStatus = (stock: number, minStock: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (stock === 0) return 'out-of-stock';
    if (stock <= minStock) return 'low-stock';
    return 'in-stock';
  };

  // Create inventory views by combining products and branch stocks
  const createInventoryViews = (): InventoryView[] => {
    const views: InventoryView[] = [];

    // For each product, find its stock in the relevant branches
    products.filter(product => product.status === 'active').forEach(product => {
      if (selectedBranch === 'all-branches') {
        // Aggregate stock across all branches for this product
        const productStocks = branchStocks.filter(stock => stock.productId === product.id);

        if (productStocks.length > 0) {
          // Calculate total stock across all branches
          const totalStock = productStocks.reduce((sum, stock) => sum + stock.stock, 0);
          const totalMinStock = productStocks.reduce((sum, stock) => sum + stock.minStock, 0);
          const totalMaxStock = productStocks.reduce((sum, stock) => sum + stock.maxStock, 0);

          // Create aggregated view with total values
          const aggregatedBranchStock: BranchStock = {
            id: 0, // Dummy ID for aggregated view
            productId: product.id,
            branch: 'all-branches',
            stock: totalStock,
            minStock: totalMinStock,
            maxStock: totalMaxStock,
            location: 'Tổng hợp tất cả chi nhánh',
            lastRestocked: productStocks.reduce((latest, stock) =>
              stock.lastRestocked > latest ? stock.lastRestocked : latest,
              productStocks[0].lastRestocked
            )
          };

          const status = calculateStatus(totalStock, totalMinStock);
          const totalValue = totalStock * product.unitPrice;

          views.push({
            product,
            branchStock: aggregatedBranchStock,
            status,
            totalValue
          });
        }
      } else {
        // Show only selected branch stock
        const branchStock = branchStocks.find(stock =>
          stock.productId === product.id && stock.branch === selectedBranch
        );
        if (branchStock) {
          const status = calculateStatus(branchStock.stock, branchStock.minStock);
          const totalValue = branchStock.stock * product.unitPrice;
          views.push({
            product,
            branchStock,
            status,
            totalValue
          });
        }
      }
    });

    return views;
  };

  const inventoryViews = createInventoryViews();

  // Product CRUD Operations
  const openCreateModal = () => {
    setEditingProduct(null);
    setEditingStock(null);
    setProductFormData({
      name: '',
      category: '',
      brand: '',
      sku: '',
      unitPrice: 0,
      supplier: '',
      image: '',
      description: '',
      expiryDate: '',
      status: 'active'
    });
    setStockFormData({
      stock: 0,
      minStock: 0,
      maxStock: 0,
      location: ''
    });
    setShowModal(true);
  };

  const openEditModal = (view: InventoryView) => {
    setEditingProduct(view.product);
    setEditingStock(view.branchStock);
    setProductFormData({
      name: view.product.name,
      category: view.product.category,
      brand: view.product.brand,
      sku: view.product.sku,
      unitPrice: view.product.unitPrice,
      supplier: view.product.supplier,
      image: view.product.image,
      description: view.product.description || '',
      expiryDate: view.product.expiryDate || '',
      status: view.product.status
    });
    setStockFormData({
      stock: view.branchStock.stock,
      minStock: view.branchStock.minStock,
      maxStock: view.branchStock.maxStock,
      location: view.branchStock.location || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productFormData.name || !productFormData.sku || !productFormData.category) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const productData: Product = {
      id: editingProduct ? editingProduct.id : Date.now(),
      ...productFormData,
      createdDate: editingProduct ? editingProduct.createdDate : new Date().toISOString().split('T')[0]
    };

    const stockData: BranchStock = {
      id: editingStock ? editingStock.id : Date.now() + 1,
      productId: productData.id,
      branch: selectedBranch === 'all-branches' ? 'branch-1' : selectedBranch,
      ...stockFormData,
      lastRestocked: editingStock ? editingStock.lastRestocked : new Date().toISOString().split('T')[0]
    };

    if (editingProduct) {
      // Update existing product and stock
      setProducts(prev => prev.map(product => product.id === editingProduct.id ? productData : product));
      if (editingStock) {
        setBranchStocks(prev => prev.map(stock => stock.id === editingStock.id ? stockData : stock));
      }
    } else {
      // Create new product and initial stock for current branch
      setProducts(prev => [...prev, productData]);
      setBranchStocks(prev => [...prev, stockData]);
    }

    setShowModal(false);
    setEditingProduct(null);
    setEditingStock(null);
  };

  const handleDelete = (productId: number) => {
    // Delete product and all its branch stocks
    setProducts(prev => prev.filter(product => product.id !== productId));
    setBranchStocks(prev => prev.filter(stock => stock.productId !== productId));
    setShowDeleteConfirm(null);
  };

  // Category CRUD Operations
  const openCreateCategoryModal = () => {
    setEditingCategory(null);
    setCategoryFormData({ name: '', description: '', status: 'active' });
    setShowCategoryModal(true);
  };

  const openEditCategoryModal = (category: Category) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category.name,
      description: category.description,
      status: category.status
    });
    setShowCategoryModal(true);
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryFormData.name) {
      alert('Vui lòng nhập tên danh mục');
      return;
    }

    const categoryData: Category = {
      id: editingCategory ? editingCategory.id : Date.now(),
      ...categoryFormData,
      productCount: editingCategory ? editingCategory.productCount : 0,
      createdDate: editingCategory ? editingCategory.createdDate : new Date().toISOString().split('T')[0]
    };

    if (editingCategory) {
      setCategories(prev => prev.map(cat => cat.id === editingCategory.id ? categoryData : cat));
    } else {
      setCategories(prev => [...prev, categoryData]);
    }

    setShowCategoryModal(false);
    setEditingCategory(null);
  };

  const deleteCategoryHandler = (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category && category.productCount > 0) {
      alert('Không thể xóa danh mục đang có sản phẩm');
      return;
    }
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  // Brand CRUD Operations
  const openCreateBrandModal = () => {
    setEditingBrand(null);
    setBrandFormData({ name: '', description: '', supplier: '', status: 'active', logo: '' });
    setShowBrandModal(true);
  };

  const openEditBrandModal = (brand: Brand) => {
    setEditingBrand(brand);
    setBrandFormData({
      name: brand.name,
      description: brand.description,
      supplier: brand.supplier,
      status: brand.status,
      logo: brand.logo || ''
    });
    setShowBrandModal(true);
  };

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!brandFormData.name) {
      alert('Vui lòng nhập tên thương hiệu');
      return;
    }

    const brandData: Brand = {
      id: editingBrand ? editingBrand.id : Date.now(),
      ...brandFormData,
      productCount: editingBrand ? editingBrand.productCount : 0,
      createdDate: editingBrand ? editingBrand.createdDate : new Date().toISOString().split('T')[0]
    };

    if (editingBrand) {
      setBrands(prev => prev.map(brand => brand.id === editingBrand.id ? brandData : brand));
    } else {
      setBrands(prev => [...prev, brandData]);
    }

    setShowBrandModal(false);
    setEditingBrand(null);
  };

  const deleteBrandHandler = (id: number) => {
    const brand = brands.find(b => b.id === id);
    if (brand && brand.productCount > 0) {
      alert('Không thể xóa thương hiệu đang có sản phẩm');
      return;
    }
    setBrands(prev => prev.filter(brand => brand.id !== id));
  };

  // Filter and stats
  const filteredInventory = inventoryViews.filter(view => {
    const { product } = view;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || view.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: inventoryViews.length,
    inStock: inventoryViews.filter(view => view.status === 'in-stock').length,
    lowStock: inventoryViews.filter(view => view.status === 'low-stock').length,
    outOfStock: inventoryViews.filter(view => view.status === 'out-of-stock').length,
    totalValue: inventoryViews.reduce((sum, view) => sum + view.totalValue, 0)
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center space-x-2 ${
              activeTab === 'inventory'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Kho vật tư</span>
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center space-x-2 ${
              activeTab === 'categories'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Danh mục</span>
          </button>
          <button
            onClick={() => setActiveTab('brands')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center space-x-2 ${
              activeTab === 'brands'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Thương hiệu</span>
          </button>
        </div>
      </div>

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <>
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
                      SKU / V��� trí
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
                  {filteredInventory.map((view) => (
                    <tr key={selectedBranch === 'all-branches' ? view.product.id : `${view.product.id}-${view.branchStock.branch}`} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={view.product.image}
                            alt={view.product.name}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{view.product.name}</div>
                            <div className="text-sm text-gray-500">{view.product.brand} • {view.product.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className="text-sm font-mono font-medium text-gray-900">{view.product.sku}</span>
                          {view.branchStock.location && (
                            <div className="text-xs text-gray-500">{view.branchStock.location}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">{view.branchStock.stock}</span>
                            <div className="text-xs text-gray-500">Min: {view.branchStock.minStock}</div>
                            <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${getStockLevelColor(view.branchStock.stock, view.branchStock.minStock)} ${getStockLevel(view.branchStock.stock, view.branchStock.minStock, view.branchStock.maxStock)}`}
                              ></div>
                            </div>
                          </div>
                          {view.branchStock.stock <= view.branchStock.minStock && view.branchStock.stock > 0 && (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className="text-sm text-gray-900">{formatCurrency(view.product.unitPrice)}</span>
                          <div className="text-sm font-semibold text-gray-900">{formatCurrency(view.totalValue)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">{view.product.supplier}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(view.status)}`}>
                          {getStatusText(view.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openEditModal(view)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                            title="Chỉnh sửa"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(view.product.id)}
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
        </>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Tag className="w-6 h-6" />
              <span>Quản lý danh mục</span>
            </h2>
            <button 
              onClick={openCreateCategoryModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm danh mục</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Tag className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(category.status)}`}>
                        {getStatusText(category.status)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => openEditCategoryModal(category)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteCategoryHandler(category.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-500">
                    Ngày tạo: {category.createdDate}
                  </div>
                  <div className="flex items-center space-x-1 text-blue-600 font-medium">
                    <Package className="w-4 h-4" />
                    <span>{category.productCount} sản phẩm</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Brands Tab */}
      {activeTab === 'brands' && (
        <>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Award className="w-6 h-6" />
              <span>Qu���n lý thương hi���u</span>
            </h2>
            <button 
              onClick={openCreateBrandModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm thương hi��u</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div key={brand.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={brand.logo || 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=48'}
                      alt={brand.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(brand.status)}`}>
                        {getStatusText(brand.status)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => openEditBrandModal(brand)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteBrandHandler(brand.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{brand.description}</p>
                <p className="text-sm text-gray-500 mb-4">Nhà cung cấp: {brand.supplier}</p>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-500">
                    Ngày t��o: {brand.createdDate}
                  </div>
                  <div className="flex items-center space-x-1 text-blue-600 font-medium">
                    <Package className="w-4 h-4" />
                    <span>{brand.productCount} sản phẩm</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProduct ? 'Chỉnh sửa sản phẩm & tồn kho' : 'Thêm sản phẩm mới'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm *</label>
                  <input
                    type="text"
                    required
                    value={productFormData.name}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
                  <input
                    type="text"
                    required
                    value={productFormData.sku}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, sku: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục *</label>
                  <select
                    required
                    value={productFormData.category}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.filter(cat => cat.status === 'active').map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thương hiệu</label>
                  <select
                    value={productFormData.brand}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn thương hiệu</option>
                    {brands.filter(brand => brand.status === 'active').map((brand) => (
                      <option key={brand.id} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng hiện tại (Chi nhánh: {selectedBranch === 'all-branches' ? 'Quận 1' :
                    selectedBranch === 'branch-1' ? 'Quận 1' :
                    selectedBranch === 'branch-2' ? 'Quận 3' :
                    selectedBranch === 'branch-3' ? 'Thủ Đức' : 'Gò Vấp'})</label>
                  <input
                    type="number"
                    min="0"
                    value={stockFormData.stock}
                    onChange={(e) => setStockFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tồn kho tối thiểu</label>
                  <input
                    type="number"
                    min="0"
                    value={stockFormData.minStock}
                    onChange={(e) => setStockFormData(prev => ({ ...prev, minStock: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gi�� đơn vị (VNĐ)</label>
                  <input
                    type="number"
                    min="0"
                    value={productFormData.unitPrice}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, unitPrice: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tồn kho tối đa</label>
                  <input
                    type="number"
                    min="0"
                    value={stockFormData.maxStock}
                    onChange={(e) => setStockFormData(prev => ({ ...prev, maxStock: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí trong kho</label>
                  <input
                    type="text"
                    value={stockFormData.location}
                    onChange={(e) => setStockFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VD: Kệ A1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nhà cung cấp</label>
                  <input
                    type="text"
                    value={productFormData.supplier}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, supplier: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL hình ảnh</label>
                  <input
                    type="url"
                    value={productFormData.image}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                  <textarea
                    value={productFormData.description}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mô tả chi tiết về sản phẩm..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày hết hạn</label>
                  <input
                    type="date"
                    value={productFormData.expiryDate}
                    onChange={(e) => setProductFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Cập nhật' : 'Thêm mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
              </h2>
              <button onClick={() => setShowCategoryModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên danh mục *</label>
                <input
                  type="text"
                  required
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="VD: Sản phẩm chăm sóc da"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                <textarea
                  value={categoryFormData.description}
                  onChange={(e) => setCategoryFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mô tả chi tiết về danh mục..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                <select
                  value={categoryFormData.status}
                  onChange={(e) => setCategoryFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Ngừng hoạt động</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingCategory ? 'Cập nhật' : 'Thêm mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Brand Modal */}
      {showBrandModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingBrand ? 'Chỉnh sửa thương hiệu' : 'Thêm thương hiệu mới'}
              </h2>
              <button onClick={() => setShowBrandModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleBrandSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên thương hiệu *</label>
                <input
                  type="text"
                  required
                  value={brandFormData.name}
                  onChange={(e) => setBrandFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="VD: SkinCare Pro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                <textarea
                  value={brandFormData.description}
                  onChange={(e) => setBrandFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mô tả về thương hiệu..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nhà cung cấp</label>
                <input
                  type="text"
                  value={brandFormData.supplier}
                  onChange={(e) => setBrandFormData(prev => ({ ...prev, supplier: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="VD: Beauty Supply Co."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL Logo</label>
                <input
                  type="url"
                  value={brandFormData.logo}
                  onChange={(e) => setBrandFormData(prev => ({ ...prev, logo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/logo.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                <select
                  value={brandFormData.status}
                  onChange={(e) => setBrandFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Ngừng hoạt động</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowBrandModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingBrand ? 'Cập nhật' : 'Thêm mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Xác nhận xóa
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.
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

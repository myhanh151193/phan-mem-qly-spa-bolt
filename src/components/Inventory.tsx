import React, { useState } from 'react';
import { Search, Plus, Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const Inventory: React.FC = () => {
  const inventory = [
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
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=150'
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
      image: 'https://images.pexels.com/photos/4041390/pexels-photo-4041390.jpeg?w=150'
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
      image: 'https://images.pexels.com/photos/4041388/pexels-photo-4041388.jpeg?w=150'
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
      image: 'https://images.pexels.com/photos/4041387/pexels-photo-4041387.jpeg?w=150'
    },
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          <span>Nhập kho</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-gray-900">46</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Còn hàng</p>
              <p className="text-2xl font-bold text-green-600">32</p>
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
              <p className="text-2xl font-bold text-yellow-600">8</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hết hàng</p>
              <p className="text-2xl font-bold text-red-600">6</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-600" />
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
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tồn kho
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng giá trị
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nhà cung cấp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-900">{item.sku}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{item.stock}</span>
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
                    <span className="text-sm text-gray-900">{formatCurrency(item.unitPrice)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.totalValue)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{item.supplier}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
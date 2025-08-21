// Shared master data for categories and brands used across Inventory and Products components

export interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number;
  createdDate: string;
  status: 'active' | 'inactive';
  type?: 'service' | 'product'; // Optional type for service categories
}

export interface Brand {
  id: number;
  name: string;
  description: string;
  supplier: string;
  productCount: number;
  createdDate: string;
  status: 'active' | 'inactive';
  logo?: string;
}

// Categories data - can be used for both products and services
export const categories: Category[] = [
  {
    id: 1,
    name: 'Sản phẩm chăm sóc da',
    description: 'Các sản phẩm chăm sóc và dưỡng da',
    productCount: 2,
    createdDate: '2024-01-01',
    status: 'active',
    type: 'product'
  },
  {
    id: 2,
    name: 'Mặt nạ',
    description: 'Mặt nạ dưỡng da các loại',
    productCount: 1,
    createdDate: '2024-01-01',
    status: 'active',
    type: 'product'
  },
  {
    id: 3,
    name: 'Dầu massage',
    description: 'Tinh dầu và dầu massage thư giãn',
    productCount: 1,
    createdDate: '2024-01-01',
    status: 'active',
    type: 'product'
  },
  {
    id: 4,
    name: 'Serum',
    description: 'Serum dưỡng da cao cấp',
    productCount: 0,
    createdDate: '2024-01-01',
    status: 'active',
    type: 'product'
  },
  // Service categories
  {
    id: 5,
    name: 'Chăm sóc da',
    description: 'Các dịch vụ chăm sóc da mặt và toàn thân',
    productCount: 0,
    createdDate: '2024-01-01',
    status: 'active',
    type: 'service'
  },
  {
    id: 6,
    name: 'Massage',
    description: 'Các dịch vụ massage thư giãn',
    productCount: 0,
    createdDate: '2024-01-01',
    status: 'active',
    type: 'service'
  },
  {
    id: 7,
    name: 'Làm đẹp',
    description: 'Các dịch vụ làm đẹp tổng hợp',
    productCount: 0,
    createdDate: '2024-01-01',
    status: 'active',
    type: 'service'
  },
  {
    id: 8,
    name: 'Điều trị',
    description: 'Các dịch vụ điều trị chuyên sâu',
    productCount: 0,
    createdDate: '2024-01-01',
    status: 'active',
    type: 'service'
  }
];

// Brands data
export const brands: Brand[] = [
  {
    id: 1,
    name: 'SkinCare Pro',
    description: 'Thương hiệu chăm sóc da chuyên nghiệp',
    supplier: 'Beauty Supply Co.',
    productCount: 1,
    createdDate: '2024-01-01',
    status: 'active',
    logo: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=100'
  },
  {
    id: 2,
    name: 'Beauty Plus',
    description: 'Thương hiệu mỹ phẩm cao cấp',
    supplier: 'Cosmetics Wholesale',
    productCount: 1,
    createdDate: '2024-01-01',
    status: 'active',
    logo: 'https://images.pexels.com/photos/4041390/pexels-photo-4041390.jpeg?w=100'
  },
  {
    id: 3,
    name: 'GlowSkin',
    description: 'Thương hiệu làm đẹp tự nhiên',
    supplier: 'Natural Beauty Ltd.',
    productCount: 1,
    createdDate: '2024-01-01',
    status: 'active',
    logo: 'https://images.pexels.com/photos/4041388/pexels-photo-4041388.jpeg?w=100'
  },
  {
    id: 4,
    name: 'Aromatherapy Pro',
    description: 'Chuyên gia tinh dầu thơm',
    supplier: 'Essential Oils Inc.',
    productCount: 1,
    createdDate: '2024-01-01',
    status: 'active',
    logo: 'https://images.pexels.com/photos/4041387/pexels-photo-4041387.jpeg?w=100'
  }
];

// Helper functions
export const getActiveCategories = (type?: 'service' | 'product'): Category[] => {
  return categories.filter(cat => 
    cat.status === 'active' && 
    (!type || cat.type === type)
  );
};

export const getActiveBrands = (): Brand[] => {
  return brands.filter(brand => brand.status === 'active');
};

export const getCategoryById = (id: number): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getBrandById = (id: number): Brand | undefined => {
  return brands.find(brand => brand.id === id);
};

export const getCategoryByName = (name: string): Category | undefined => {
  return categories.find(cat => cat.name === name);
};

export const getBrandByName = (name: string): Brand | undefined => {
  return brands.find(brand => brand.name === name);
};

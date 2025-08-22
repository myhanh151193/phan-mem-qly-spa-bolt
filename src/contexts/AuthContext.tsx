import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'staff' | 'trainee';
  permissions: string[];
  accessibleBranches: string[];
  primaryBranch: string;
  position: string;
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  canAccessBranch: (branchId: string) => boolean;
  demoUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing different roles and permissions
const demoUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    name: 'Quản trị viên',
    email: 'admin@spa.com',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=150',
    role: 'admin',
    permissions: [
      'view_services', 'manage_services', 'view_appointments', 'manage_appointments',
      'view_customers', 'manage_customers', 'view_staff', 'manage_staff',
      'view_inventory', 'manage_inventory', 'view_reports', 'manage_reports',
      'view_finance', 'manage_finance', 'system_admin'
    ],
    accessibleBranches: ['branch-1', 'branch-2', 'branch-3', 'branch-4'],
    primaryBranch: 'Chi nhánh Quận 1',
    position: 'Quản trị viên hệ thống',
    department: 'Quản lý'
  },
  {
    id: 2,
    username: 'manager1',
    name: 'Phạm Thu Hiền',
    email: 'hien.pham@spa.com',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=150',
    role: 'manager',
    permissions: [
      'view_services', 'manage_services', 'view_appointments', 'manage_appointments',
      'view_customers', 'manage_customers', 'view_staff', 'manage_staff',
      'view_inventory', 'manage_inventory', 'view_reports'
    ],
    accessibleBranches: ['branch-1', 'branch-2', 'branch-3'],
    primaryBranch: 'Chi nhánh Quận 1',
    position: 'Quản lý ca',
    department: 'Quản lý'
  },
  {
    id: 3,
    username: 'staff1',
    name: 'Nguyễn Thị Mai',
    email: 'mai.nguyen@spa.com',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=150',
    role: 'staff',
    permissions: ['view_services', 'view_appointments', 'manage_appointments', 'view_customers', 'view_inventory'],
    accessibleBranches: ['branch-1'], // Chỉ được truy cập chi nhánh chính
    primaryBranch: 'Chi nhánh Quận 1',
    position: 'Chuyên viên chăm sóc da',
    department: 'Điều trị'
  },
  {
    id: 4,
    username: 'staff2',
    name: 'Lê Thanh Hoa',
    email: 'hoa.le@spa.com',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=150',
    role: 'staff',
    permissions: ['view_services', 'view_appointments', 'manage_appointments', 'view_customers', 'view_inventory'],
    accessibleBranches: ['branch-2'], // Chỉ được truy cập chi nhánh 3
    primaryBranch: 'Chi nhánh Quận 3',
    position: 'Massage Therapist',
    department: 'Massage'
  },
  {
    id: 5,
    username: 'trainee1',
    name: 'Trần Minh An',
    email: 'an.tran@spa.com',
    avatar: 'https://images.pexels.com/photos/1037915/pexels-photo-1037915.jpeg?w=150',
    role: 'trainee',
    permissions: ['view_services', 'view_appointments', 'view_customers'],
    accessibleBranches: ['branch-3'],
    primaryBranch: 'Chi nhánh Thủ Đức',
    position: 'Kỹ thuật viên',
    department: 'Làm đẹp'
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user by username (password is ignored for demo - any password works)
    const foundUser = demoUsers.find(u => u.username === username);
    
    if (foundUser) {
      setUser(foundUser);
      // Store in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const canAccessBranch = (branchId: string): boolean => {
    if (!user) return false;
    return user.accessibleBranches.includes(branchId);
  };

  // Check for existing user in localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission,
    canAccessBranch,
    demoUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

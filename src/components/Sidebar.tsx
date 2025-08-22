import React from 'react';
import {
  LayoutDashboard, Users, Calendar, Package,
  Clipboard, FileText, Archive, UserCheck,
  BarChart3, Sparkles, Bed, Shield, User
} from 'lucide-react';
import { User as UserType } from '../contexts/AuthContext';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  user: UserType;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu, user }) => {
  // Menu items with their required permissions
  const allMenuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', requiredPermissions: [] },
    { id: 'customers', icon: Users, label: 'Khách hàng', requiredPermissions: ['view_customers'] },
    { id: 'schedule', icon: Calendar, label: 'Lịch hẹn', requiredPermissions: ['view_appointments'] },
    { id: 'beds', icon: Bed, label: 'Giường / Phòng', requiredPermissions: ['view_services'] },
    { id: 'products', icon: Package, label: 'Sản phẩm & DV', requiredPermissions: ['view_services'] },
    { id: 'treatments', icon: Clipboard, label: 'Liệu trình', requiredPermissions: ['view_services'] },
    { id: 'invoices', icon: FileText, label: 'Hóa đơn', requiredPermissions: ['view_finance'] },
    { id: 'inventory', icon: Archive, label: 'Kho vật tư', requiredPermissions: ['view_inventory'] },
    { id: 'staff', icon: UserCheck, label: 'Nhân viên', requiredPermissions: ['view_staff'] },
    { id: 'reports', icon: BarChart3, label: 'Báo cáo', requiredPermissions: ['view_reports'] },
  ];

  // Filter menu items based on user permissions
  const menuItems = allMenuItems.filter(item => {
    if (item.requiredPermissions.length === 0) return true; // Dashboard is always accessible
    return item.requiredPermissions.some(permission => user.permissions.includes(permission));
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'manager': return <UserCheck className="w-4 h-4" />;
      case 'staff': return <User className="w-4 h-4" />;
      case 'trainee': return <Users className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'manager': return 'Quản lý';
      case 'staff': return 'Nhân viên';
      case 'trainee': return 'Thực tập sinh';
      default: return 'Không xác định';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-500/20 text-purple-200 border-purple-400/30';
      case 'manager': return 'bg-blue-500/20 text-blue-200 border-blue-400/30';
      case 'staff': return 'bg-green-500/20 text-green-200 border-green-400/30';
      case 'trainee': return 'bg-orange-500/20 text-orange-200 border-orange-400/30';
      default: return 'bg-gray-500/20 text-gray-200 border-gray-400/30';
    }
  };

  return (
    <div className="w-64 bg-gradient-to-b from-blue-600 to-purple-700 text-white flex flex-col h-screen overflow-hidden">
      <div className="p-6 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Spa Manager</h2>
            <p className="text-blue-100 text-sm">Pro Edition</p>
          </div>
        </div>
      </div>


      <nav className="flex-1 px-4 overflow-y-auto scrollbar-hide" style={{
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE/Edge
      }}>
        <ul className="space-y-2 pb-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isAccessible = item.requiredPermissions.length === 0 || 
              item.requiredPermissions.some(permission => user.permissions.includes(permission));
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => isAccessible && setActiveMenu(item.id)}
                  disabled={!isAccessible}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeMenu === item.id
                      ? 'bg-white/20 text-white shadow-lg transform scale-105'
                      : isAccessible 
                        ? 'text-blue-100 hover:bg-white/10 hover:text-white'
                        : 'text-blue-300/50 cursor-not-allowed'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {!isAccessible && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-red-400 rounded-full" title="Không có quyền truy cập" />
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/20 flex-shrink-0">
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm text-blue-100">Version 2.1.0</p>
          <p className="text-xs text-blue-200">© 2025 Spa Management</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

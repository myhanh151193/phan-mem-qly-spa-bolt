import React from 'react';
import {
  LayoutDashboard, Users, Calendar, Package,
  Clipboard, FileText, Archive, UserCheck,
  BarChart3, Sparkles, Bed
} from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'customers', icon: Users, label: 'Khách hàng' },
    { id: 'schedule', icon: Calendar, label: 'Lịch hẹn' },
    { id: 'beds', icon: Bed, label: 'Giường / Phòng' },
    { id: 'products', icon: Package, label: 'Sản phẩm & DV' },
    { id: 'treatments', icon: Clipboard, label: 'Liệu trình' },
    { id: 'invoices', icon: FileText, label: 'Hóa đơn' },
    { id: 'inventory', icon: Archive, label: 'Kho vật tư' },
    { id: 'staff', icon: UserCheck, label: 'Nhân viên' },
    { id: 'reports', icon: BarChart3, label: 'Báo cáo' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-600 to-purple-700 text-white flex flex-col">
      <div className="p-6">
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

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeMenu === item.id
                      ? 'bg-white/20 text-white shadow-lg transform scale-105'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/20">
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm text-blue-100">Version 2.1.0</p>
          <p className="text-xs text-blue-200">© 2025 Spa Management</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

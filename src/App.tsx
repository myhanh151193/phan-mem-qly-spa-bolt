import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Schedule from './components/Schedule';
import Beds from './components/Beds';
import Products from './components/Products';
import Treatments from './components/Treatments';
import Invoices from './components/Invoices';
import Inventory from './components/Inventory';
import Staff from './components/Staff';
import Reports from './components/Reports';
import BranchSelector from './components/BranchSelector';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AppointmentProvider } from './contexts/AppointmentContext';
import { TreatmentPaymentProvider } from './contexts/TreatmentPaymentContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LogOut } from 'lucide-react';

const AppContent: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedBranch, setSelectedBranch] = useState('branch-1');
  const { user, logout, isAuthenticated, canAccessBranch } = useAuth();

  // Filter accessible branches for the user
  const getAccessibleBranches = () => {
    if (!isAuthenticated || !canAccessBranch) return [];

    const allBranches = [
      { id: 'branch-1', name: 'Chi nhánh Quận 1' },
      { id: 'branch-2', name: 'Chi nhánh Quận 3' },
      { id: 'branch-3', name: 'Chi nhánh Thủ Đức' },
      { id: 'branch-4', name: 'Chi nhánh Gò Vấp' }
    ];
    return allBranches.filter(branch => canAccessBranch(branch.id));
  };

  const accessibleBranches = getAccessibleBranches();

  // Set default branch to first accessible branch if current selection is not accessible
  // This hook must be called every render, regardless of authentication status
  React.useEffect(() => {
    if (isAuthenticated && accessibleBranches.length > 0 && !canAccessBranch(selectedBranch)) {
      setSelectedBranch(accessibleBranches[0].id);
    }
  }, [isAuthenticated, accessibleBranches, selectedBranch, canAccessBranch]);

  // If not authenticated, show login (after all hooks have been called)
  if (!isAuthenticated) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'customers': 
        return (
          <ProtectedRoute requiredPermissions={['view_customers']}>
            <Customers />
          </ProtectedRoute>
        );
      case 'schedule': 
        return (
          <ProtectedRoute requiredPermissions={['view_appointments']}>
            <Schedule />
          </ProtectedRoute>
        );
      case 'beds': 
        return (
          <ProtectedRoute requiredPermissions={['view_services']}>
            <Beds />
          </ProtectedRoute>
        );
      case 'products': 
        return (
          <ProtectedRoute requiredPermissions={['view_services']}>
            <Products />
          </ProtectedRoute>
        );
      case 'treatments': 
        return (
          <ProtectedRoute requiredPermissions={['view_services']}>
            <Treatments />
          </ProtectedRoute>
        );
      case 'invoices': 
        return (
          <ProtectedRoute requiredPermissions={['view_finance']}>
            <Invoices />
          </ProtectedRoute>
        );
      case 'inventory': 
        return (
          <ProtectedRoute requiredPermissions={['view_inventory']}>
            <Inventory />
          </ProtectedRoute>
        );
      case 'staff': 
        return (
          <ProtectedRoute requiredPermissions={['view_staff']}>
            <Staff />
          </ProtectedRoute>
        );
      case 'reports': 
        return (
          <ProtectedRoute requiredPermissions={['view_reports']}>
            <Reports selectedBranch={selectedBranch} />
          </ProtectedRoute>
        );
      default: 
        return <Dashboard selectedBranch={selectedBranch} />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} user={user!} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeMenu === 'dashboard' && 'Dashboard'}
                {activeMenu === 'customers' && 'Quản lý Khách hàng'}
                {activeMenu === 'schedule' && 'Lịch hẹn'}
                {activeMenu === 'beds' && 'Quản lý Giường / Phòng'}
                {activeMenu === 'products' && 'Sản phẩm & Dịch vụ'}
                {activeMenu === 'treatments' && 'Liệu trình'}
                {activeMenu === 'invoices' && 'Hóa đơn'}
                {activeMenu === 'inventory' && 'Kho vật tư'}
                {activeMenu === 'staff' && 'Nhân viên'}
                {activeMenu === 'reports' && 'Báo cáo'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Branch Selector - only show accessible branches */}
              {accessibleBranches.length > 1 && (
                <BranchSelector 
                  selectedBranch={selectedBranch} 
                  setSelectedBranch={setSelectedBranch}
                />
              )}
              
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={user!.avatar}
                    alt={user!.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">{user!.name}</p>
                    <p className="text-xs text-gray-500">{user!.position}</p>
                  </div>
                </div>
                
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-scroll">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <TreatmentPaymentProvider>
          <AppContent />
        </TreatmentPaymentProvider>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;

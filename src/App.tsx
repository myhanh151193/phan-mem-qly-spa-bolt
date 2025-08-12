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
import { AppointmentProvider } from './contexts/AppointmentContext';

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedBranch, setSelectedBranch] = useState('branch-1');

  const renderContent = () => {
    switch (activeMenu) {
      case 'customers': return <Customers />;
      case 'schedule': return <Schedule />;
      case 'beds': return <Beds />;
      case 'products': return <Products />;
      case 'treatments': return <Treatments />;
      case 'invoices': return <Invoices />;
      case 'inventory': return <Inventory />;
      case 'staff': return <Staff />;
      case 'reports': return <Reports selectedBranch={selectedBranch} />;
      default: return <Dashboard selectedBranch={selectedBranch} />;
    }
  };

  return (
    <AppointmentProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        
        <div className="flex-1 flex flex-col">
          <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
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
              <BranchSelector selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} />
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </AppointmentProvider>
  );
}

export default App;

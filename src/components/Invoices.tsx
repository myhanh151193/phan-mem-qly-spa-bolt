import React, { useState, useEffect } from 'react';
import { Search, Plus, FileText, Download, Eye, Filter, Edit2, Trash2, X, Save, Calendar, User, ShoppingCart, Package, Percent, CreditCard, DollarSign, Clock, Printer } from 'lucide-react';
import { useTreatmentPayment } from '../contexts/TreatmentPaymentContext';

interface InvoiceItem {
  id: string;
  name: string;
  type: 'service' | 'product';
  quantity: number;
  price: number;
  total: number;
}

interface Invoice {
  id: string;
  customer: string;
  customerId?: number;
  treatmentId?: number;
  treatmentName?: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod: 'cash' | 'transfer' | 'card' | 'other';
  notes?: string;
}

// Sample treatment data - this should come from treatments context in real app
const sampleTreatments = [
  {
    id: 1,
    customer: 'Nguyễn Thu Hà',
    customerId: 1,
    name: 'Liệu trình trị mụn 3 tháng',
    services: ['Điều trị mụn', 'Tái tạo da', 'Chăm sóc da'],
    status: 'active'
  },
  {
    id: 2,
    customer: 'Trần Mai Linh',
    customerId: 2,
    name: 'Gói chăm sóc da toàn diện',
    services: ['Chăm sóc da mặt', 'Massage', 'Tắm trắng'],
    status: 'active'
  },
  {
    id: 3,
    customer: 'Lê Minh Châu',
    customerId: 3,
    name: 'Liệu trình giảm béo 6 tháng',
    services: ['Giảm béo RF', 'Massage giảm béo', 'Tư vấn dinh dưỡng'],
    status: 'completed'
  },
  {
    id: 4,
    customer: 'Phạm Thị Lan',
    customerId: 4,
    name: 'Gói làm đẹp cao cấp',
    services: ['Chăm sóc da mặt Premium', 'Tắm trắng toàn thân', 'Triệt lông'],
    status: 'active'
  },
  {
    id: 5,
    customer: 'Hoàng Văn Nam',
    customerId: 5,
    name: 'Liệu trình trị thâm nám',
    services: ['Trị thâm', 'Chăm sóc da mặt', 'Căng da mặt'],
    status: 'active'
  }
];

// Service catalog with pricing
const serviceCatalog = {
  'Điều trị mụn': { price: 500000, duration: 60, category: 'Chăm sóc da', description: 'Điều trị mụn chuyên sâu với công nghệ hiện đại' },
  'Tái tạo da': { price: 800000, duration: 90, category: 'Chăm sóc da', description: 'Tái tạo da bằng công nghệ laser và serum ��ặc biệt' },
  'Chăm sóc da': { price: 400000, duration: 60, category: 'Chăm sóc da', description: 'Chăm sóc da cơ bản với quy trình chuẩn' },
  'Chăm sóc da mặt': { price: 600000, duration: 75, category: 'Chăm sóc da', description: 'Chăm sóc da mặt toàn diện với các bước chuyên nghiệp' },
  'Chăm sóc da mặt Premium': { price: 800000, duration: 90, category: 'Chăm sóc da', description: 'Dịch vụ chăm sóc da mặt cao cấp với sản phẩm nhập khẩu' },
  'Massage': { price: 500000, duration: 90, category: 'Massage', description: 'Massage thư giãn cơ bản' },
  'Massage toàn thân': { price: 600000, duration: 120, category: 'Massage', description: 'Massage thư giãn toàn thân với tinh dầu thiên nhiên' },
  'Tắm trắng': { price: 800000, duration: 120, category: 'Làm đẹp', description: 'Tắm trắng cơ bản' },
  'Tắm trắng toàn thân': { price: 1200000, duration: 150, category: 'Làm đẹp', description: 'Tắm trắng toàn thân an toàn với công nghệ laser' },
  'Giảm béo RF': { price: 800000, duration: 90, category: 'Giảm béo', description: 'Giảm béo bằng sóng RF không xâm lấn' },
  'Massage giảm béo': { price: 700000, duration: 100, category: 'Giảm béo', description: 'Massage chuyên sâu hỗ trợ giảm béo' },
  'Tư vấn dinh dưỡng': { price: 200000, duration: 30, category: 'Tư vấn', description: 'Tư vấn chế độ dinh dưỡng phù hợp' },
  'Triệt lông': { price: 400000, duration: 45, category: 'Làm đẹp', description: 'Triệt lông vĩnh viễn bằng laser diode' },
  'Trị thâm': { price: 350000, duration: 60, category: 'Chăm sóc da', description: 'Điều trị thâm nám, tàn nhang hi���u quả' },
  'Căng da mặt': { price: 1500000, duration: 180, category: 'Làm ��ẹp', description: 'Căng da mặt không phẫu thuật bằng Hifu' },
};

// Available products
const availableProducts = [
  { id: 'prd-001', name: 'Serum Vitamin C', price: 450000, brand: 'SkinCare Pro', category: 'Serum' },
  { id: 'prd-002', name: 'Kem dưỡng ẩm ban đêm', price: 320000, brand: 'Beauty Plus', category: 'Kem dư��ng' },
  { id: 'prd-003', name: 'Mặt nạ collagen', price: 150000, brand: 'GlowSkin', category: 'Mặt nạ' },
  { id: 'prd-004', name: 'Sữa rửa mặt tạo bọt', price: 280000, brand: 'CleanFace', category: 'Sữa rửa mặt' },
  { id: 'prd-005', name: 'Toner cân bằng pH', price: 200000, brand: 'SkinCare Pro', category: 'Toner' },
  { id: 'prd-006', name: 'Kem chống nắng SPF50', price: 380000, brand: 'SunGuard', category: 'Kem chống nắng' },
];

// Sample customers
const customers = [
  { id: 1, name: 'Nguyễn Thu Hà', phone: '0901234567', membershipLevel: 'VVIP' },
  { id: 2, name: 'Trần Mai Linh', phone: '0907654321', membershipLevel: 'VIP' },
  { id: 3, name: 'Lê Minh Châu', phone: '0912345678', membershipLevel: 'Member' },
  { id: 4, name: 'Phạm Thị Lan', phone: '0938567890', membershipLevel: 'VIP' },
  { id: 5, name: 'Hoàng Văn Nam', phone: '0976543210', membershipLevel: 'Member' },
];

const Invoices: React.FC = () => {
  const { updateInvoicePayment } = useTreatmentPayment();

  // Check URL params for treatment linking
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const treatmentIdFromUrl = urlParams.get('treatmentId');
  const customerIdFromUrl = urlParams.get('customerId');

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'HD001',
      customer: 'Nguyễn Thu Hà',
      customerId: 1,
      date: '2025-01-10',
      dueDate: '2025-01-17',
      items: [
        { id: '1', name: 'Chăm sóc da mặt Premium', type: 'service', quantity: 1, price: 800000, total: 800000 },
        { id: '2', name: 'Serum Vitamin C', type: 'product', quantity: 1, price: 450000, total: 450000 }
      ],
      subtotal: 1250000,
      discount: 125000,
      tax: 112500,
      total: 1237500,
      status: 'paid',
      paymentMethod: 'cash'
    },
    {
      id: 'HD002',
      customer: 'Trần Mai Linh',
      customerId: 2,
      date: '2025-01-08',
      dueDate: '2025-01-15',
      items: [
        { id: '1', name: 'Massage toàn thân', type: 'service', quantity: 1, price: 600000, total: 600000 },
        { id: '2', name: 'Tắm tr��ng toàn thân', type: 'service', quantity: 1, price: 1200000, total: 1200000 }
      ],
      subtotal: 1800000,
      discount: 0,
      tax: 180000,
      total: 1980000,
      status: 'pending',
      paymentMethod: 'transfer'
    },
    {
      id: 'HD003',
      customer: 'Lê Minh Châu',
      customerId: 3,
      date: '2025-01-05',
      dueDate: '2025-01-12',
      items: [
        { id: '1', name: 'Điều trị mụn', type: 'service', quantity: 1, price: 500000, total: 500000 },
        { id: '2', name: 'Kem dưỡng ẩm ban đêm', type: 'product', quantity: 2, price: 320000, total: 640000 }
      ],
      subtotal: 1140000,
      discount: 114000,
      tax: 102600,
      total: 1128600,
      status: 'overdue',
      paymentMethod: 'card'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<Partial<Invoice>>({
    customer: '',
    customerId: undefined,
    treatmentId: undefined,
    treatmentName: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [],
    discount: 0,
    tax: 10,
    paymentMethod: 'cash',
    status: 'draft',
    notes: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Nháp';
      case 'paid': return 'Đã thanh toán';
      case 'pending': return 'Chờ thanh toán';
      case 'overdue': return 'Quá hạn';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const calculateTotals = (items: InvoiceItem[], discountPercent: number, taxPercent: number) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discount = (subtotal * discountPercent) / 100;
    const tax = ((subtotal - discount) * taxPercent) / 100;
    const total = subtotal - discount + tax;
    
    return { subtotal, discount, tax, total };
  };

  const openCreateModal = () => {
    setEditingInvoice(null);

    // Auto-fill treatment info if coming from treatment page
    const treatmentId = treatmentIdFromUrl ? parseInt(treatmentIdFromUrl) : undefined;
    const customerId = customerIdFromUrl ? parseInt(customerIdFromUrl) : undefined;
    const treatment = treatmentId ? sampleTreatments.find(t => t.id === treatmentId) : undefined;

    setFormData({
      customer: treatment?.customer || '',
      customerId: customerId,
      treatmentId: treatmentId,
      treatmentName: treatment?.name || '',
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      items: [],
      discount: 0,
      tax: 10,
      paymentMethod: 'cash',
      status: 'draft',
      notes: ''
    });
    setShowModal(true);
  };

  const openEditModal = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      ...invoice,
      treatmentId: invoice.treatmentId,
      treatmentName: invoice.treatmentName,
      discount: (invoice.discount / invoice.subtotal) * 100,
      tax: (invoice.tax / (invoice.subtotal - invoice.discount)) * 100
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingInvoice(null);
    setFormData({
      customer: '',
      customerId: undefined,
      treatmentId: undefined,
      treatmentName: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      items: [],
      discount: 0,
      tax: 10,
      paymentMethod: 'cash',
      status: 'draft',
      notes: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer || !formData.date || !formData.dueDate || !formData.items?.length) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const { subtotal, discount, tax, total } = calculateTotals(
      formData.items!,
      formData.discount || 0,
      formData.tax || 0
    );

    const invoiceData: Invoice = {
      id: editingInvoice ? editingInvoice.id : `HD${String(Date.now()).slice(-3)}`,
      customer: formData.customer!,
      customerId: formData.customerId,
      treatmentId: formData.treatmentId,
      treatmentName: formData.treatmentName,
      date: formData.date!,
      dueDate: formData.dueDate!,
      items: formData.items!,
      subtotal,
      discount,
      tax,
      total,
      status: formData.status as Invoice['status'] || 'draft',
      paymentMethod: formData.paymentMethod as Invoice['paymentMethod'] || 'cash',
      notes: formData.notes
    };

    // Update treatment payment if invoice is paid and linked to a treatment
    if (invoiceData.status === 'paid' && invoiceData.treatmentId) {
      // Check if this is a status change from non-paid to paid
      const wasAlreadyPaid = editingInvoice && editingInvoice.status === 'paid';

      if (!wasAlreadyPaid) {
        updateInvoicePayment(
          invoiceData.id,
          invoiceData.treatmentId,
          invoiceData.total,
          invoiceData.paymentMethod === 'other' ? 'cash' : invoiceData.paymentMethod as 'cash' | 'transfer' | 'card',
          `Thanh toán từ hóa đơn ${invoiceData.id}`
        );

        // Show success notification
        setTimeout(() => {
          alert(`✅ Hóa đơn đã được thanh toán và cập nhật vào liệu trình "${invoiceData.treatmentName}"`);
        }, 500);
      }
    }

    if (editingInvoice) {
      setInvoices(prev => prev.map(inv => inv.id === editingInvoice.id ? invoiceData : inv));
    } else {
      setInvoices(prev => [...prev, invoiceData]);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
    setShowDeleteConfirm(null);
  };

  const printInvoice = (invoice: Invoice) => {
    const customer = customers.find(c => c.id === invoice.customerId);
    const printWindow = window.open('', '_blank');

    if (!printWindow) {
      alert('Vui lòng cho phép popup để in hóa đơn');
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Hóa đơn ${invoice.id}</title>
        <meta charset="UTF-8">
        <style>
          @media print {
            @page {
              margin: 20mm;
              size: A4;
            }
            .no-print { display: none !important; }
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }

          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 20px;
          }

          .company-name {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 5px;
          }

          .company-info {
            color: #6b7280;
            font-size: 14px;
          }

          .invoice-title {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin: 20px 0;
          }

          .invoice-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
          }

          .info-section h3 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #374151;
          }

          .info-section p {
            margin-bottom: 5px;
            color: #6b7280;
          }

          .info-section .highlight {
            color: #1f2937;
            font-weight: 600;
          }

          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
          }

          .status-paid { background-color: #d1fae5; color: #047857; }
          .status-pending { background-color: #fef3c7; color: #92400e; }
          .status-overdue { background-color: #fee2e2; color: #dc2626; }
          .status-draft { background-color: #f3f4f6; color: #374151; }
          .status-cancelled { background-color: #fee2e2; color: #dc2626; }

          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            border: 1px solid #e5e7eb;
          }

          .items-table th,
          .items-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
          }

          .items-table th {
            background-color: #f9fafb;
            font-weight: 600;
            color: #374151;
          }

          .items-table tr:nth-child(even) {
            background-color: #f9fafb;
          }

          .text-center { text-align: center; }
          .text-right { text-align: right; }

          .totals {
            margin-left: auto;
            width: 300px;
            border: 1px solid #e5e7eb;
          }

          .totals tr td {
            padding: 8px 12px;
            border-bottom: 1px solid #e5e7eb;
          }

          .totals tr:last-child {
            font-weight: bold;
            background-color: #f3f4f6;
          }

          .totals tr:last-child td {
            border-bottom: none;
          }

          .notes {
            margin-top: 30px;
            padding: 15px;
            background-color: #f9fafb;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }

          .print-button {
            background-color: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            margin-bottom: 20px;
          }

          .print-button:hover {
            background-color: #2563eb;
          }

          .footer {
            margin-top: 40px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <button class="print-button no-print" onclick="window.print()">🖨️ In hóa đơn</button>

        <div class="header">
          <div class="company-name">SPA & BEAUTY CENTER</div>
          <div class="company-info">
            Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM<br>
            Điện thoại: 0123 456 789 | Email: contact@spa.com
          </div>
        </div>

        <div class="invoice-title text-center">HÓA ĐƠN THANH TOÁN</div>

        <div class="invoice-info">
          <div class="info-section">
            <h3>Thông tin hóa đơn</h3>
            <p><strong>Mã hóa đơn:</strong> <span class="highlight">${invoice.id}</span></p>
            <p><strong>Ngày tạo:</strong> <span class="highlight">${new Date(invoice.date).toLocaleDateString('vi-VN')}</span></p>
            <p><strong>Hạn thanh toán:</strong> <span class="highlight">${new Date(invoice.dueDate).toLocaleDateString('vi-VN')}</span></p>
            <p><strong>Trạng thái:</strong>
              <span class="status-badge status-${invoice.status}">${getStatusText(invoice.status)}</span>
            </p>
          </div>

          <div class="info-section">
            <h3>Thông tin khách hàng</h3>
            <p><strong>Tên khách hàng:</strong> <span class="highlight">${invoice.customer}</span></p>
            ${customer ? `
              <p><strong>Số điện thoại:</strong> <span class="highlight">${customer.phone}</span></p>
              <p><strong>Hạng thành viên:</strong> <span class="highlight">${customer.membershipLevel}</span></p>
            ` : ''}
            ${invoice.treatmentName ? `
              <p><strong>Liệu trình:</strong> <span class="highlight">${invoice.treatmentName}</span></p>
            ` : ''}
          </div>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên dịch vụ/sản phẩm</th>
              <th>Loại</th>
              <th class="text-center">Số lượng</th>
              <th class="text-right">Đơn giá</th>
              <th class="text-right">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map((item, index) => `
              <tr>
                <td class="text-center">${index + 1}</td>
                <td>${item.name}</td>
                <td>
                  <span class="status-badge ${item.type === 'service' ? 'status-paid' : 'status-pending'}">
                    ${item.type === 'service' ? 'Dịch vụ' : 'Sản phẩm'}
                  </span>
                </td>
                <td class="text-center">${item.quantity}</td>
                <td class="text-right">${formatCurrency(item.price)}</td>
                <td class="text-right">${formatCurrency(item.total)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <table class="totals">
          <tr>
            <td>Tạm tính:</td>
            <td class="text-right">${formatCurrency(invoice.subtotal)}</td>
          </tr>
          <tr>
            <td>Giảm giá:</td>
            <td class="text-right">-${formatCurrency(invoice.discount)}</td>
          </tr>
          <tr>
            <td>Thuế VAT:</td>
            <td class="text-right">${formatCurrency(invoice.tax)}</td>
          </tr>
          <tr>
            <td><strong>Tổng cộng:</strong></td>
            <td class="text-right"><strong>${formatCurrency(invoice.total)}</strong></td>
          </tr>
        </table>

        ${invoice.notes ? `
          <div class="notes">
            <h3>Ghi chú:</h3>
            <p>${invoice.notes}</p>
          </div>
        ` : ''}

        <div class="footer">
          <p>Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</p>
          <p>Hóa đơn được in vào ${new Date().toLocaleString('vi-VN')}</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
  };

  const addService = (serviceName: string) => {
    const serviceInfo = serviceCatalog[serviceName as keyof typeof serviceCatalog];
    if (!serviceInfo) return;

    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      name: serviceName,
      type: 'service',
      quantity: 1,
      price: serviceInfo.price,
      total: serviceInfo.price
    };

    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
    setShowServiceModal(false);
  };

  // Get customer's treatments and available services
  const getCustomerTreatments = (customerId: number | undefined) => {
    if (!customerId) return [];
    return sampleTreatments.filter(treatment =>
      treatment.customerId === customerId && treatment.status === 'active'
    );
  };

  const getAvailableServicesForCustomer = (customerId: number | undefined) => {
    const customerTreatments = getCustomerTreatments(customerId);
    if (customerTreatments.length === 0) {
      // If no treatments, show all services
      return Object.keys(serviceCatalog).map(serviceName => ({
        name: serviceName,
        ...serviceCatalog[serviceName as keyof typeof serviceCatalog]
      }));
    }

    // Get unique services from all customer's active treatments
    const uniqueServices = new Set<string>();
    customerTreatments.forEach(treatment => {
      treatment.services.forEach(service => uniqueServices.add(service));
    });

    return Array.from(uniqueServices).map(serviceName => ({
      name: serviceName,
      ...serviceCatalog[serviceName as keyof typeof serviceCatalog]
    }));
  };

  const addProduct = (product: typeof availableProducts[0]) => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      name: product.name,
      type: 'product',
      quantity: 1,
      price: product.price,
      total: product.price
    };

    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
    setShowProductModal(false);
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items?.map(item => 
        item.id === itemId 
          ? { ...item, quantity, total: item.price * quantity }
          : item
      )
    }));
  };

  const removeItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items?.filter(item => item.id !== itemId)
    }));
  };

  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: invoices.length,
    paid: invoices.filter(inv => inv.status === 'paid').length,
    pending: invoices.filter(inv => inv.status === 'pending').length,
    overdue: invoices.filter(inv => inv.status === 'overdue').length,
    revenue: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0)
  };

  const currentTotals = formData.items ? calculateTotals(formData.items, formData.discount || 0, formData.tax || 0) : null;

  // Auto-open modal if coming from treatment
  useEffect(() => {
    if (treatmentIdFromUrl && customerIdFromUrl && !showModal) {
      openCreateModal();
    }
  }, [treatmentIdFromUrl, customerIdFromUrl]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm hóa đơn..."
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
            <option value="draft">Nháp</option>
            <option value="pending">Chờ thanh toán</option>
            <option value="paid">Đã thanh toán</option>
            <option value="overdue">Qu�� hạn</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        <button 
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo hóa đơn</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng hóa đơn</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã thanh toán</p>
              <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chờ thanh toán</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Quá hạn</p>
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Doanh thu</p>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(stats.revenue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hóa đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hạn thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
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
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-sm font-medium text-gray-900">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{invoice.customer}</span>
                        {invoice.treatmentId && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <Calendar className="w-3 h-3 mr-1" />
                            Liệu trình
                          </span>
                        )}
                      </div>
                      {invoice.treatmentName && (
                        <div className="text-xs text-purple-600 mt-1 flex items-center space-x-1">
                          <span>{invoice.treatmentName}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{invoice.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{invoice.dueDate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(invoice.total)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(invoice)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => printInvoice(invoice)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="In hóa đơn"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowDeleteConfirm(invoice.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingInvoice ? 'Sửa hóa đơn' : 'Tạo hóa đơn mới'}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khách hàng *
                  </label>
                  <select
                    required
                    value={formData.customerId || ''}
                    onChange={(e) => {
                      const customerId = parseInt(e.target.value);
                      const customer = customers.find(c => c.id === customerId);
                      setFormData(prev => ({
                        ...prev,
                        customerId,
                        customer: customer?.name || '',
                        treatmentId: undefined,
                        treatmentName: '' // Reset treatment when customer changes
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn khách hàng</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} - {customer.phone} ({customer.membershipLevel})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Treatment Selection */}
                {formData.customerId && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Liệu trình (tùy chọn)
                    </label>
                    <select
                      value={formData.treatmentId || ''}
                      onChange={(e) => {
                        const treatmentId = e.target.value ? parseInt(e.target.value) : undefined;
                        const treatment = sampleTreatments.find(t => t.id === treatmentId);
                        setFormData(prev => ({
                          ...prev,
                          treatmentId,
                          treatmentName: treatment?.name || '',
                          items: [] // Reset items when treatment changes
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Không liên kết liệu trình</option>
                      {getCustomerTreatments(formData.customerId).map((treatment) => (
                        <option key={treatment.id} value={treatment.id}>
                          {treatment.name} - {treatment.services.join(', ')}
                        </option>
                      ))}
                    </select>
                    {formData.treatmentId && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700">
                          ✓ Đã chọn li��u trình: <strong>{formData.treatmentName}</strong>
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const treatment = sampleTreatments.find(t => t.id === formData.treatmentId);
                            if (treatment) {
                              const treatmentItems = treatment.services.map((serviceName, index) => {
                                const serviceInfo = serviceCatalog[serviceName as keyof typeof serviceCatalog];
                                if (serviceInfo) {
                                  return {
                                    id: `item-${Date.now()}-${index}`,
                                    name: serviceName,
                                    type: 'service' as const,
                                    quantity: 1,
                                    price: serviceInfo.price,
                                    total: serviceInfo.price
                                  };
                                }
                                return null;
                              }).filter(Boolean) as InvoiceItem[];

                              setFormData(prev => ({ ...prev, items: treatmentItems }));
                            }
                          }}
                          className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                        >
                          Tự động thêm dịch vụ liệu trình
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={formData.status || 'draft'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Invoice['status'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Nháp</option>
                    <option value="pending">Chờ thanh toán</option>
                    <option value="paid">Đã thanh toán</option>
                    <option value="overdue">Quá hạn</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày tạo *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hạn thanh toán *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phương thức thanh toán
                  </label>
                  <select
                    value={formData.paymentMethod || 'cash'}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as Invoice['paymentMethod'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="cash">Tiền mặt</option>
                    <option value="transfer">Chuyển khoản</option>
                    <option value="card">Thẻ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              {/* Items Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Dịch vụ & Sản phẩm</h3>
                  <div className="flex space-x-2">
                    {formData.treatmentId && (
                      <button
                        type="button"
                        onClick={() => {
                          const treatment = sampleTreatments.find(t => t.id === formData.treatmentId);
                          if (treatment) {
                            const treatmentItems = treatment.services.map((serviceName, index) => {
                              const serviceInfo = serviceCatalog[serviceName as keyof typeof serviceCatalog];
                              if (serviceInfo) {
                                return {
                                  id: `item-${Date.now()}-${index}`,
                                  name: serviceName,
                                  type: 'service' as const,
                                  quantity: 1,
                                  price: serviceInfo.price,
                                  total: serviceInfo.price
                                };
                              }
                              return null;
                            }).filter(Boolean) as InvoiceItem[];

                            setFormData(prev => ({ ...prev, items: [...(prev.items || []), ...treatmentItems] }));
                          }
                        }}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Thêm toàn bộ liệu trình</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowServiceModal(true)}
                      disabled={!formData.customerId}
                      className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center space-x-2 font-medium ${
                        !formData.customerId
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Chọn lẻ</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProductModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Package className="w-4 h-4" />
                      <span>Sản phẩm</span>
                    </button>
                  </div>
                </div>

                {/* Help text */}
                <div className={`border rounded-lg p-3 mb-4 ${
                  !formData.customerId
                    ? 'bg-yellow-50 border-yellow-200'
                    : formData.treatmentId
                    ? 'bg-purple-50 border-purple-200'
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <p className={`text-sm ${
                    !formData.customerId
                      ? 'text-yellow-700'
                      : formData.treatmentId
                      ? 'text-purple-700'
                      : 'text-blue-700'
                  }`}>
                    {!formData.customerId ? (
                      <>⚠️ <strong>Lưu ý:</strong> Vui lòng chọn khách hàng trước để xem dịch vụ từ liệu trình của họ.</>
                    ) : (
                      <>💡 <strong>Mẹo:</strong> Nhấn "Chọn từ liệu tr��nh" để thêm các dịch vụ từ liệu trình hiện tại của khách hàng này.</>
                    )}
                  </p>
                </div>

                {/* Items List */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tên
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loại
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Đơn giá
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Số lượng
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thành tiền
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.items?.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">
                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              item.type === 'service' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {item.type === 'service' ? 'Dịch vụ' : 'Sản phẩm'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-900">{formatCurrency(item.price)}</span>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-medium text-gray-900">{formatCurrency(item.total)}</span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {(!formData.items || formData.items.length === 0) && (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Chưa có dịch vụ hoặc sản phẩm nào</p>
                      <p className="text-sm">Nhấn "Thêm dịch vụ" hoặc "Thêm sản phẩm" để bắt đầu</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Totals Section */}
              {currentTotals && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giảm giá (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={formData.discount || 0}
                          onChange={(e) => setFormData(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thuế (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={formData.tax || 0}
                          onChange={(e) => setFormData(prev => ({ ...prev, tax: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tạm tính:</span>
                      <span>{formatCurrency(currentTotals.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span>-{formatCurrency(currentTotals.discount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thuế:</span>
                      <span>{formatCurrency(currentTotals.tax)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Tổng cộng:</span>
                      <span>{formatCurrency(currentTotals.total)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ghi chú thêm về hóa đơn..."
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingInvoice ? 'Cập nhật' : 'Tạo mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Selection Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[85vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <span>Chọn dịch vụ từ liệu trình</span>
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {(() => {
                    const selectedCustomer = customers.find(c => c.id === formData.customerId);
                    const customerTreatments = getCustomerTreatments(formData.customerId);
                    if (selectedCustomer && customerTreatments.length > 0) {
                      return `Dịch vụ từ ${customerTreatments.length} liệu trình hiện tại của ${selectedCustomer.name}`;
                    }
                    return selectedCustomer
                      ? `${selectedCustomer.name} chưa có liệu trình nào - hiển thị tất cả dịch vụ`
                      : 'Các dịch vụ có s���n trong h�� thống';
                  })()}
                </p>
              </div>
              <button
                onClick={() => setShowServiceModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white/50 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {(() => {
                const availableServices = getAvailableServicesForCustomer(formData.customerId);
                const customerTreatments = getCustomerTreatments(formData.customerId);
                const selectedCustomer = customers.find(c => c.id === formData.customerId);

                if (availableServices.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Không có dịch vụ nào</h3>
                      <p className="text-gray-600">Khách hàng này chưa có liệu trình nào đang hoạt đ���ng.</p>
                    </div>
                  );
                }

                return (
                  <>
                    {/* Show customer's active treatments */}
                    {customerTreatments.length > 0 && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2 flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Liệu trình hiện tại của {selectedCustomer?.name}:</span>
                        </h4>
                        <div className="space-y-1">
                          {customerTreatments.map(treatment => (
                            <div key={treatment.id} className="text-sm text-green-700">
                              • {treatment.name} ({treatment.services.join(', ')})
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {availableServices.map((service, index) => (
                        <div key={`${service.name}-${index}`} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                {service.category}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{service.description}</p>

                          <div className="flex justify-between items-center mb-4">
                            <div className="text-xl font-bold text-blue-600">{formatCurrency(service.price)}</div>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{service.duration} phút</span>
                            </div>
                          </div>

                          <button
                            onClick={() => addService(service.name)}
                            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm flex items-center justify-center space-x-2"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Thêm vào hóa ��ơn</span>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Footer info */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 text-center">
                        {customerTreatments.length > 0 ? (
                          <>💡 Hiển thị {availableServices.length} dịch vụ từ {customerTreatments.length} liệu trình hiện tại của {selectedCustomer?.name}.</>
                        ) : (
                          <>💡 {selectedCustomer?.name} chưa có liệu trình nào. Hiển thị tất cả {availableServices.length} dịch vụ có sẵn.</>
                        )}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Product Selection Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Chọn sản phẩm</h2>
              <button 
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableProducts.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                    <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-green-600">{formatCurrency(product.price)}</span>
                    </div>
                    <button
                      onClick={() => addProduct(product)}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Thêm vào hóa đơn
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Xác nhận xóa hóa đơn
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa hóa đơn này? Hành động này không thể hoàn tác.
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

export default Invoices;

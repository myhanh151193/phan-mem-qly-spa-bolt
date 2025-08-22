import React, { createContext, useContext, useState, useCallback } from 'react';

interface PaymentRecord {
  id: number;
  date: string;
  amount: number;
  method: 'cash' | 'transfer' | 'card';
  note?: string;
  invoiceId?: string; // Link to invoice
}

interface TreatmentPayment {
  treatmentId: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentStatus: 'pending' | 'partial' | 'completed';
  paymentHistory: PaymentRecord[];
}

interface TreatmentPaymentContextType {
  treatmentPayments: TreatmentPayment[];
  updateTreatmentPayment: (treatmentId: number, payment: Omit<PaymentRecord, 'id'>) => void;
  getTreatmentPayment: (treatmentId: number) => TreatmentPayment | null;
  initializeTreatmentPayment: (treatmentId: number, totalAmount: number, initialPaidAmount?: number, initialPayments?: PaymentRecord[]) => void;
  updateInvoicePayment: (invoiceId: string, treatmentId: number, amount: number, method: 'cash' | 'transfer' | 'card', note?: string) => void;
  getPaymentStatusColor: (status: string) => string;
  getPaymentStatusText: (status: string) => string;
  formatCurrency: (amount: number) => string;
}

const TreatmentPaymentContext = createContext<TreatmentPaymentContextType | undefined>(undefined);

export const TreatmentPaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [treatmentPayments, setTreatmentPayments] = useState<TreatmentPayment[]>([
    // Initialize with existing data
    {
      treatmentId: 1,
      totalAmount: 15600000,
      paidAmount: 10400000,
      remainingAmount: 5200000,
      paymentStatus: 'partial',
      paymentHistory: [
        { id: 1, date: '2025-01-01', amount: 8000000, method: 'transfer', note: 'Thanh toán lần 1' },
        { id: 2, date: '2025-01-08', amount: 2400000, method: 'cash', note: 'Thanh toán buổi 8' }
      ]
    },
    {
      treatmentId: 2,
      totalAmount: 12800000,
      paidAmount: 12800000,
      remainingAmount: 0,
      paymentStatus: 'completed',
      paymentHistory: [
        { id: 3, date: '2024-12-01', amount: 12800000, method: 'card', note: 'Thanh toán đầy đủ' }
      ]
    },
    {
      treatmentId: 3,
      totalAmount: 28800000,
      paidAmount: 23200000,
      remainingAmount: 5600000,
      paymentStatus: 'partial',
      paymentHistory: [
        { id: 4, date: '2024-10-01', amount: 15000000, method: 'transfer', note: 'Thanh toán lần 1' },
        { id: 5, date: '2024-12-01', amount: 8200000, method: 'cash', note: 'Thanh toán lần 2' }
      ]
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Đã thanh toán';
      case 'partial': return 'Thanh toán một phần';
      case 'pending': return 'Chưa thanh toán';
      default: return 'Không xác định';
    }
  };

  const getTreatmentPayment = useCallback((treatmentId: number): TreatmentPayment | null => {
    return treatmentPayments.find(tp => tp.treatmentId === treatmentId) || null;
  }, [treatmentPayments]);

  const initializeTreatmentPayment = useCallback((
    treatmentId: number, 
    totalAmount: number, 
    initialPaidAmount: number = 0,
    initialPayments: PaymentRecord[] = []
  ) => {
    setTreatmentPayments(prev => {
      const exists = prev.find(tp => tp.treatmentId === treatmentId);
      if (exists) return prev;

      const remainingAmount = totalAmount - initialPaidAmount;
      let paymentStatus: 'pending' | 'partial' | 'completed' = 'pending';
      
      if (initialPaidAmount >= totalAmount) {
        paymentStatus = 'completed';
      } else if (initialPaidAmount > 0) {
        paymentStatus = 'partial';
      }

      const newPayment: TreatmentPayment = {
        treatmentId,
        totalAmount,
        paidAmount: initialPaidAmount,
        remainingAmount,
        paymentStatus,
        paymentHistory: initialPayments
      };

      return [...prev, newPayment];
    });
  }, []);

  const updateTreatmentPayment = useCallback((treatmentId: number, payment: Omit<PaymentRecord, 'id'>) => {
    setTreatmentPayments(prev => 
      prev.map(tp => {
        if (tp.treatmentId !== treatmentId) return tp;

        const newPayment: PaymentRecord = {
          ...payment,
          id: Date.now() + Math.random()
        };

        const newPaidAmount = tp.paidAmount + payment.amount;
        const newRemainingAmount = tp.totalAmount - newPaidAmount;
        
        let newPaymentStatus: 'pending' | 'partial' | 'completed' = 'pending';
        if (newRemainingAmount <= 0) {
          newPaymentStatus = 'completed';
        } else if (newPaidAmount > 0) {
          newPaymentStatus = 'partial';
        }

        return {
          ...tp,
          paidAmount: newPaidAmount,
          remainingAmount: Math.max(0, newRemainingAmount),
          paymentStatus: newPaymentStatus,
          paymentHistory: [...tp.paymentHistory, newPayment]
        };
      })
    );
  }, []);

  const updateInvoicePayment = useCallback((
    invoiceId: string, 
    treatmentId: number, 
    amount: number, 
    method: 'cash' | 'transfer' | 'card',
    note?: string
  ) => {
    const payment = {
      date: new Date().toISOString().split('T')[0],
      amount,
      method,
      note: note || `Thanh toán từ hóa đơn ${invoiceId}`,
      invoiceId
    };

    updateTreatmentPayment(treatmentId, payment);
  }, [updateTreatmentPayment]);

  const value: TreatmentPaymentContextType = {
    treatmentPayments,
    updateTreatmentPayment,
    getTreatmentPayment,
    initializeTreatmentPayment,
    updateInvoicePayment,
    getPaymentStatusColor,
    getPaymentStatusText,
    formatCurrency
  };

  return (
    <TreatmentPaymentContext.Provider value={value}>
      {children}
    </TreatmentPaymentContext.Provider>
  );
};

export const useTreatmentPayment = () => {
  const context = useContext(TreatmentPaymentContext);
  if (context === undefined) {
    throw new Error('useTreatmentPayment must be used within a TreatmentPaymentProvider');
  }
  return context;
};

export default TreatmentPaymentContext;

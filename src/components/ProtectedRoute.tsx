import React from 'react';
import { Shield, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredBranches?: string[];
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  requiredBranches = [],
  fallback
}) => {
  const { user, hasPermission, canAccessBranch } = useAuth();

  if (!user) {
    return null; // This should not happen as Login handles this
  }

  // Check permissions
  const hasRequiredPermissions = requiredPermissions.every(permission => 
    hasPermission(permission)
  );

  // Check branch access
  const hasRequiredBranchAccess = requiredBranches.length === 0 || 
    requiredBranches.some(branchId => canAccessBranch(branchId));

  if (!hasRequiredPermissions || !hasRequiredBranchAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Không có quyền truy cập
          </h3>
          <p className="text-gray-600 mb-4">
            {!hasRequiredPermissions && 
              'Bạn không có quyền hạn cần thiết để truy cập trang này.'
            }
            {!hasRequiredBranchAccess && 
              'Bạn không có quyền truy cập chi nhánh này.'
            }
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Thông tin tài khoản hiện tại:</p>
                <p>• Vai trò: {user.role}</p>
                <p>• Quyền hạn: {user.permissions.length} quyền</p>
                <p>• Chi nhánh truy cập: {user.accessibleBranches.length} chi nhánh</p>
              </div>
            </div>
          </div>

          {requiredPermissions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-2">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Quyền hạn cần thiết:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {requiredPermissions.map(permission => (
                      <li key={permission} className={hasPermission(permission) ? 'text-green-700' : 'text-red-700'}>
                        {permission} {hasPermission(permission) ? '✓' : '✗'}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500">
            Liên hệ quản trị viên để được cấp quyền truy cập.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

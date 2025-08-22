import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, User, Lock, Shield, UserCheck, Users, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const { login, demoUsers } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Tên đăng nhập không tồn tại. Vui lòng thử lại.');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoUsername: string) => {
    setUsername(demoUsername);
    setPassword('demo');
    setError('');
    setIsLoading(true);

    try {
      await login(demoUsername, 'demo');
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4 text-purple-600" />;
      case 'manager': return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'staff': return <User className="w-4 h-4 text-green-600" />;
      case 'trainee': return <Users className="w-4 h-4 text-orange-600" />;
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
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'staff': return 'bg-green-100 text-green-800 border-green-200';
      case 'trainee': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Spa Manager</h1>
          <p className="text-blue-100">Hệ thống quản lý Spa chuyên nghiệp</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
            <p className="text-gray-600">Vui lòng đăng nhập để tiếp tục</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Đăng nhập</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {showDemoAccounts ? 'Ẩn tài khoản demo' : 'Xem tài khoản demo'}
            </button>

            {showDemoAccounts && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-600 mb-3">
                  Chọn một tài khoản demo để kiểm tra phân quyền:
                </p>
                {demoUsers.map((user) => (
                  <div
                    key={user.id}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                              {getRoleIcon(user.role)}
                              <span className="ml-1">{getRoleText(user.role)}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{user.position}</p>
                          <p className="text-xs text-gray-500">
                            Chi nhánh: {user.primaryBranch} • 
                            Truy cập: {user.accessibleBranches.length} chi nhánh
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDemoLogin(user.username)}
                        disabled={isLoading}
                        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm rounded-md transition-colors disabled:opacity-50"
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <strong>Lưu ý:</strong> Tất cả tài khoản demo đều dùng mật khẩu bất kỳ. 
                    Hệ thống sẽ tự động cấp quyền tương ứng với vai trò của từng tài khoản.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-blue-100 text-sm">
            © 2025 Spa Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

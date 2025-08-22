import React from 'react';
import { MapPin, ChevronDown, Building2 } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  address?: string;
}

interface BranchSelectorProps {
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  accessibleBranches?: Branch[];
  canViewAllBranches?: boolean;
}

const BranchSelector: React.FC<BranchSelectorProps> = ({
  selectedBranch,
  setSelectedBranch,
  accessibleBranches,
  canViewAllBranches = false
}) => {
  // Default branches if accessibleBranches is not provided (for backward compatibility)
  const defaultBranches = [
    { id: 'branch-1', name: 'Chi nhánh Quận 1', address: '123 Nguyễn Huệ, Q1' },
    { id: 'branch-2', name: 'Chi nhánh Quận 3', address: '456 Võ Văn Tần, Q3' },
    { id: 'branch-3', name: 'Chi nhánh Thủ Đức', address: '789 Phạm Văn Đồng, Thủ Đức' },
    { id: 'branch-4', name: 'Chi nhánh Gò Vấp', address: '321 Quang Trung, Gò Vấp' }
  ];

  const branches = accessibleBranches || defaultBranches;
  const currentBranch = branches.find(b => b.id === selectedBranch);

  // Create options list with "All Branches" if user can view all branches
  const getDisplayOptions = () => {
    const options = [...branches];

    // Add "All Branches" option if user can view all branches and has access to multiple branches
    if (canViewAllBranches && branches.length > 1) {
      options.unshift({
        id: 'all-branches',
        name: 'Tất cả chi nhánh',
        address: 'Báo cáo tổng hợp'
      });
    }

    return options;
  };

  const displayOptions = getDisplayOptions();

  // Get display text and icon based on selection
  const getDisplayInfo = () => {
    if (selectedBranch === 'all-branches') {
      return {
        icon: <Building2 className="w-4 h-4 text-blue-600" />,
        text: 'Tất cả chi nhánh'
      };
    }

    const branch = branches.find(b => b.id === selectedBranch);
    return {
      icon: <MapPin className="w-4 h-4 text-blue-600" />,
      text: branch ? branch.name : 'Chi nhánh'
    };
  };

  const displayInfo = getDisplayInfo();

  // If user has only one accessible branch and can't view all branches, show it as read-only
  if (branches.length === 1 && !canViewAllBranches) {
    return (
      <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
        <MapPin className="w-4 h-4 text-blue-600" />
        <span className="text-blue-900 font-medium">{branches[0].name}</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <select
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
        className="appearance-none bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 pr-8 text-blue-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {displayOptions.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        {displayInfo.icon}
      </div>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none" />
    </div>
  );
};

export default BranchSelector;

import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  address?: string;
}

interface BranchSelectorProps {
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  accessibleBranches?: Branch[];
}

const BranchSelector: React.FC<BranchSelectorProps> = ({ 
  selectedBranch, 
  setSelectedBranch, 
  accessibleBranches 
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

  // If user has only one accessible branch, show it as read-only
  if (branches.length === 1) {
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
        {branches.map(branch => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none" />
    </div>
  );
};

export default BranchSelector;

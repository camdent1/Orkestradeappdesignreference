import React from 'react';
import { Home, FolderOpen, Clock, Receipt, FileText } from 'lucide-react';

export type TabId = 'dashboard' | 'sites' | 'timer' | 'receipts' | 'invoices';

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  { id: 'dashboard' as TabId, label: 'Dash', icon: Home },
  { id: 'sites' as TabId, label: 'Sites', icon: FolderOpen },
  { id: 'timer' as TabId, label: 'Timer', icon: Clock },
  { id: 'receipts' as TabId, label: 'Rcpts', icon: Receipt },
  { id: 'invoices' as TabId, label: 'Invcs', icon: FileText },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-gray-light)] safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive
                  ? 'text-[var(--color-orkes-peach)]'
                  : 'text-[var(--color-gray-medium)] hover:text-[var(--color-gray-dark)]'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

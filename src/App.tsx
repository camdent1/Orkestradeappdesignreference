import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { JobSitesView } from './components/JobSitesView';
import { TimerView } from './components/TimerView';
import { ReceiptsView } from './components/ReceiptsView';
import { InvoicesView } from './components/InvoicesView';
import { CalendarView } from './components/CalendarView';
import { PersonalView } from './components/PersonalView';
import { SettingsView } from './components/SettingsView';
import { Home, FolderOpen, Clock, Receipt, FileText } from 'lucide-react';

type TabType = 'dashboard' | 'jobsites' | 'timer' | 'receipts' | 'invoices';
type ViewType = TabType | 'calendar' | 'personal' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dash', icon: Home },
    { id: 'jobsites' as TabType, label: 'Sites', icon: FolderOpen },
    { id: 'timer' as TabType, label: 'Timer', icon: Clock },
    { id: 'receipts' as TabType, label: 'Receipts', icon: Receipt },
    { id: 'invoices' as TabType, label: 'Invoices', icon: FileText },
  ];

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentView(tab);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigateToCalendar={() => setCurrentView('calendar')} />;
      case 'jobsites':
        return <JobSitesView />;
      case 'timer':
        return <TimerView />;
      case 'receipts':
        return <ReceiptsView />;
      case 'invoices':
        return <InvoicesView />;
      case 'calendar':
        return <CalendarView onBack={() => setCurrentView(activeTab)} />;
      case 'personal':
        return <PersonalView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard onNavigateToCalendar={() => setCurrentView('calendar')} />;
    }
  };

  // Show tab bar unless we're in calendar/personal/settings
  const showTabBar = !['calendar', 'personal', 'settings'].includes(currentView);

  return (
    <div className="min-h-screen bg-orkes-cream pb-20 md:pb-24">
      {/* Main Content */}
      <main className={showTabBar ? 'min-h-[calc(100vh-5rem)]' : 'min-h-screen'}>
        {renderContent()}
      </main>

      {/* Tab Bar - Fixed at bottom */}
      {showTabBar && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid grid-cols-5 h-20">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                      isActive 
                        ? 'text-orkes-peach' 
                        : 'text-gray-500 hover:text-orkes-navy'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
                    <span className="text-xs">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
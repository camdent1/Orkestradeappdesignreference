import { useState } from 'react';
import { User, Calendar as CalendarIcon, Plus, Clock, DollarSign, FileText } from 'lucide-react';
import { BucketNavigation } from './BucketNavigation';
import { ViewToggle } from './ViewToggle';
import { CardGrid } from './CardGrid';
import { CalendarMonthView } from './CalendarMonthView';
import { CalendarWeekView } from './CalendarWeekView';
import { CalendarDayView } from './CalendarDayView';
import { BucketFilter, ViewMode } from '../types';
import { mockTimeEntries, mockReceipts, mockInvoices, mockPersonalEvents } from '../lib/mockData';
import { Button } from './ui/button';

interface DashboardProps {
  onNavigateToCalendar?: () => void;
}

export function Dashboard({ onNavigateToCalendar }: DashboardProps) {
  const [bucketFilter, setBucketFilter] = useState<BucketFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [calendarMode, setCalendarMode] = useState<'month' | 'week'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const buckets = [
    { id: 'all' as BucketFilter, label: 'All' },
    { id: 'time' as BucketFilter, label: 'Time' },
    { id: 'receipt' as BucketFilter, label: 'Receipts' },
    { id: 'invoice' as BucketFilter, label: 'Invoices' },
    { id: 'personal' as BucketFilter, label: 'Personal' },
  ];

  // Combine all data for display
  const allItems = [
    ...mockTimeEntries.map(item => ({ type: 'time' as const, data: item, date: item.date })),
    ...mockReceipts.map(item => ({ type: 'receipt' as const, data: item, date: item.date })),
    ...mockInvoices.map(item => ({ type: 'invoice' as const, data: item, date: item.date })),
    ...mockPersonalEvents.map(item => ({ type: 'personal' as const, data: item, date: item.date })),
  ];

  // Filter items
  const filteredItems = allItems.filter(item => {
    if (bucketFilter === 'all') return true;
    return item.type === bucketFilter;
  });

  // Sort by date descending
  const sortedItems = [...filteredItems].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate weekly stats
  const weeklyStats = {
    hours: mockTimeEntries.reduce((sum, entry) => sum + entry.duration, 0),
    labor: mockTimeEntries.reduce((sum, entry) => sum + entry.amount, 0),
    expenses: mockReceipts.reduce((sum, receipt) => sum + receipt.total, 0),
    invoices: mockInvoices.length,
  };

  // Active timer (mock)
  const activeTimer = null; // Set to null for no active timer

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orkes-peach flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg">Good Morning, CAM</h1>
            <p className="text-sm opacity-60">Takumi Built</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white rounded-lg">
            <CalendarIcon className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white rounded-lg">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Active Timer */}
      {activeTimer && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-sm opacity-90">RUNNING</span>
          </div>
          <div className="text-3xl mb-2">2h 34m 17s</div>
          <p className="mb-4 opacity-90">Bridge Street Renovation</p>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1 bg-white/20 hover:bg-white/30 border-0">
              ⏸️ Pause
            </Button>
            <Button variant="secondary" className="flex-1 bg-white/20 hover:bg-white/30 border-0">
              ⏹️ Stop
            </Button>
          </div>
        </div>
      )}

      {/* Weekly Stats */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-time">
            <Clock className="w-4 h-4" />
            <span className="text-sm opacity-80">Hours</span>
          </div>
          <div className="text-2xl">{weeklyStats.hours.toFixed(1)}h</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-orkes-peach">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm opacity-80">Labor</span>
          </div>
          <div className="text-2xl">${weeklyStats.labor.toFixed(0)}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-receipt">
            <FileText className="w-4 h-4" />
            <span className="text-sm opacity-80">Expenses</span>
          </div>
          <div className="text-2xl">${weeklyStats.expenses.toFixed(0)}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-invoice">
            <FileText className="w-4 h-4" />
            <span className="text-sm opacity-80">Invoices</span>
          </div>
          <div className="text-2xl">{weeklyStats.invoices}</div>
        </div>
      </div>

      {/* Bucket Navigation */}
      <BucketNavigation
        buckets={buckets}
        selected={bucketFilter}
        onSelect={setBucketFilter}
      />

      {/* View Controls */}
      <div className="flex items-center justify-between">
        <h2>Recent Activity</h2>
        <ViewToggle view={viewMode} onViewChange={setViewMode} showList={true} />
      </div>

      {/* Content Area */}
      {viewMode === 'grid' && (
        <CardGrid items={sortedItems} />
      )}

      {viewMode === 'list' && (
        <div className="space-y-3">
          {sortedItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3>{(item.data as any).name || (item.data as any).jobSiteName || (item.data as any).vendor || (item.data as any).title}</h3>
                  <p className="text-sm opacity-60">{item.type} • {new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'calendar' && (
        <>
          {selectedDate ? (
            <CalendarDayView
              date={selectedDate}
              events={allItems}
              activeFilter={bucketFilter}
              onBack={() => setSelectedDate(null)}
            />
          ) : (
            <>
              {/* Calendar Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setCalendarMode('month')}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    calendarMode === 'month' 
                      ? 'bg-orkes-peach text-white shadow-md' 
                      : 'bg-white text-orkes-navy hover:bg-gray-50'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setCalendarMode('week')}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    calendarMode === 'week' 
                      ? 'bg-orkes-peach text-white shadow-md' 
                      : 'bg-white text-orkes-navy hover:bg-gray-50'
                  }`}
                >
                  Week
                </button>
              </div>

              {calendarMode === 'month' ? (
                <CalendarMonthView 
                  events={allItems}
                  activeFilter={bucketFilter}
                  onDayClick={(date) => setSelectedDate(date)}
                />
              ) : (
                <CalendarWeekView 
                  events={allItems}
                  activeFilter={bucketFilter}
                  onDayClick={(date) => setSelectedDate(date)}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
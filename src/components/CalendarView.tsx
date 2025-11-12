import { useState } from 'react';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { BucketNavigation } from './BucketNavigation';
import { CalendarMonthView } from './CalendarMonthView';
import { CalendarWeekView } from './CalendarWeekView';
import { CalendarDayView } from './CalendarDayView';
import { CalendarDayDetailPanel } from './CalendarDayDetailPanel';
import { CalendarViewModeToggle } from './CalendarViewModeToggle';
import { BucketFilter } from '../types';
import { mockTimeEntries, mockReceipts, mockInvoices, mockPersonalEvents } from '../lib/mockData';

interface CalendarViewProps {
  onBack: () => void;
}

type CalendarMode = 'month' | 'week' | 'day';
type ViewMode = 'month' | 'week';

export function CalendarView({ onBack }: CalendarViewProps) {
  const [bucketFilter, setBucketFilter] = useState<BucketFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDayDetail, setShowDayDetail] = useState(false);

  const buckets = [
    { id: 'all' as BucketFilter, label: 'All' },
    { id: 'time' as BucketFilter, label: 'Time' },
    { id: 'receipt' as BucketFilter, label: 'Receipts' },
    { id: 'invoice' as BucketFilter, label: 'Invoices' },
    { id: 'personal' as BucketFilter, label: 'Personal' },
  ];

  // Combine all data for calendar
  const allEvents = [
    ...mockTimeEntries.map(item => ({ type: 'time' as const, data: item, date: item.date })),
    ...mockReceipts.map(item => ({ type: 'receipt' as const, data: item, date: item.date })),
    ...mockInvoices.map(item => ({ type: 'invoice' as const, data: item, date: item.date })),
    ...mockPersonalEvents.map(item => ({ type: 'personal' as const, data: item, date: item.date })),
  ];

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    // Small delay for smooth transition
    setTimeout(() => {
      setShowDayDetail(true);
    }, 50);
  };

  const handleCloseDayDetail = () => {
    setShowDayDetail(false);
    // Clear selected date after animation completes
    setTimeout(() => {
      setSelectedDate(null);
    }, 300);
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    
    return allEvents.filter(event => {
      if (bucketFilter !== 'all') {
        if (bucketFilter === 'time' && event.type !== 'time') return false;
        if (bucketFilter === 'receipt' && event.type !== 'receipt') return false;
        if (bucketFilter === 'invoice' && event.type !== 'invoice') return false;
        if (bucketFilter === 'personal' && event.type !== 'personal') return false;
      }
      return event.date === dateStr;
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-[1800px] mx-auto relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1>Calendar</h1>
        </div>
        <button className="p-2 hover:bg-white rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Bucket Navigation */}
      <BucketNavigation
        buckets={buckets}
        selected={bucketFilter}
        onSelect={setBucketFilter}
      />

      {/* View Mode Toggle */}
      <CalendarViewModeToggle
        activeMode={viewMode}
        onModeChange={setViewMode}
      />

      {/* Instruction text */}
      <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-sm text-sky-900">
        {viewMode === 'month' && (
          <p>💡 <strong>Month view:</strong> Colored dots show activity. Tap any day with dots to see details.</p>
        )}
        {viewMode === 'week' && (
          <p>💡 <strong>Week view:</strong> Horizontally scrollable card stacks per day. Hover to expand, tap to see details.</p>
        )}
      </div>

      {/* Calendar Content */}
      <div className={`transition-opacity duration-200 ${showDayDetail ? 'opacity-40' : 'opacity-100'}`}>
        {viewMode === 'month' ? (
          <CalendarMonthView 
            events={allEvents}
            activeFilter={bucketFilter}
            onDayClick={handleDayClick}
          />
        ) : (
          <CalendarWeekView 
            events={allEvents}
            activeFilter={bucketFilter}
            onDayClick={handleDayClick}
          />
        )}
      </div>

      {/* Day Detail Panel (Slides up from bottom) */}
      {selectedDate && (
        <CalendarDayDetailPanel
          date={selectedDate}
          events={getEventsForSelectedDate()}
          onClose={handleCloseDayDetail}
          isVisible={showDayDetail}
        />
      )}
    </div>
  );
}

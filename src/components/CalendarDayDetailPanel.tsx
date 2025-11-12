import { X } from 'lucide-react';
import { UniversalCard } from './UniversalCard';
import { EntityType, TimeEntry, Receipt, Invoice, PersonalEvent } from '../types';

interface CalendarEvent {
  date: string;
  type: EntityType;
  data: TimeEntry | Receipt | Invoice | PersonalEvent;
}

interface CalendarDayDetailPanelProps {
  date: Date;
  events: CalendarEvent[];
  onClose: () => void;
  isVisible: boolean;
}

export function CalendarDayDetailPanel({ date, events, onClose, isVisible }: CalendarDayDetailPanelProps) {
  // Sort events chronologically
  const sortedEvents = [...events].sort((a, b) => {
    const getTime = (event: CalendarEvent) => {
      if (event.type === 'time') {
        const timeData = event.data as TimeEntry;
        return timeData.startTime;
      }
      if (event.type === 'personal') {
        const personalData = event.data as PersonalEvent;
        return personalData.time || '00:00';
      }
      return '00:00';
    };
    
    return getTime(a).localeCompare(getTime(b));
  });

  if (!isVisible) return null;

  return (
    <>
      {/* Dimmed background */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-200 ease-out"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={onClose}
      />
      
      {/* Day detail panel */}
      <div 
        className={`
          fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl
          transition-transform duration-300 ease-out
          ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{ 
          height: '60vh',
          minHeight: '400px',
          maxHeight: '80vh',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-100 rounded-t-3xl">
          <div className="flex items-center justify-between p-5">
            <h2 className="text-orkes-navy">
              {date.toLocaleDateString('en-AU', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </h2>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable card stack */}
        <div className="overflow-y-auto h-full pb-20 px-5">
          {sortedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-gray-400 mb-2">No events for this day</div>
              <div className="text-sm text-gray-300">Tap + to add an entry</div>
            </div>
          ) : (
            <div className="space-y-3 py-5">
              {sortedEvents.map((event, index) => (
                <div
                  key={index}
                  className="animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <UniversalCard
                    type={event.type}
                    data={event.data}
                    compact={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

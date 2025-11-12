import { ArrowLeft } from 'lucide-react';
import { UniversalCard } from './UniversalCard';
import { EntityType, TimeEntry, Receipt, Invoice, PersonalEvent, BucketFilter } from '../types';

interface CalendarEvent {
  date: string;
  type: EntityType;
  data: TimeEntry | Receipt | Invoice | PersonalEvent;
}

interface CalendarDayViewProps {
  date: Date;
  events: CalendarEvent[];
  activeFilter: BucketFilter;
  onBack: () => void;
}

export function CalendarDayView({ date, events, activeFilter, onBack }: CalendarDayViewProps) {
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  const dayEvents = events.filter(event => {
    if (activeFilter !== 'all') {
      if (activeFilter === 'time' && event.type !== 'time') return false;
      if (activeFilter === 'receipt' && event.type !== 'receipt') return false;
      if (activeFilter === 'invoice' && event.type !== 'invoice') return false;
      if (activeFilter === 'personal' && event.type !== 'personal') return false;
    }
    return event.date === dateStr;
  });

  // Group by entity type for organized display
  const groupedEvents = {
    time: dayEvents.filter(e => e.type === 'time'),
    receipt: dayEvents.filter(e => e.type === 'receipt'),
    invoice: dayEvents.filter(e => e.type === 'invoice'),
    personal: dayEvents.filter(e => e.type === 'personal'),
  };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const isToday = date.toDateString() === new Date().toDateString();

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1>{dayNames[date.getDay()]}</h1>
            {isToday && (
              <span className="px-3 py-1 bg-orkes-peach text-white rounded-full text-sm">Today</span>
            )}
          </div>
          <p className="opacity-60">
            {date.toLocaleDateString('en-AU', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <div className="text-2xl text-time">{groupedEvents.time.length}</div>
            <div className="text-sm opacity-60">Time</div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <div className="text-2xl text-receipt">{groupedEvents.receipt.length}</div>
            <div className="text-sm opacity-60">Receipts</div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <div className="text-2xl text-invoice">{groupedEvents.invoice.length}</div>
            <div className="text-sm opacity-60">Invoices</div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <div className="text-2xl text-personal">{groupedEvents.personal.length}</div>
            <div className="text-sm opacity-60">Personal</div>
          </div>
        </div>
      </div>

      {dayEvents.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-5xl mb-4">📅</div>
          <p className="text-lg">No records for this day</p>
        </div>
      ) : (
        <>
          {/* Time Entries */}
          {groupedEvents.time.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-time" />
                Time Entries ({groupedEvents.time.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedEvents.time.map((event, idx) => (
                  <UniversalCard key={idx} type={event.type} data={event.data} />
                ))}
              </div>
            </div>
          )}

          {/* Receipts */}
          {groupedEvents.receipt.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-receipt" />
                Receipts ({groupedEvents.receipt.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedEvents.receipt.map((event, idx) => (
                  <UniversalCard key={idx} type={event.type} data={event.data} />
                ))}
              </div>
            </div>
          )}

          {/* Invoices */}
          {groupedEvents.invoice.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-invoice" />
                Invoices ({groupedEvents.invoice.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedEvents.invoice.map((event, idx) => (
                  <UniversalCard key={idx} type={event.type} data={event.data} />
                ))}
              </div>
            </div>
          )}

          {/* Personal */}
          {groupedEvents.personal.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-personal" />
                Personal ({groupedEvents.personal.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedEvents.personal.map((event, idx) => (
                  <UniversalCard key={idx} type={event.type} data={event.data} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

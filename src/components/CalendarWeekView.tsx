import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { HorizontalCardStack } from './HorizontalCardStack';
import { EntityType, TimeEntry, Receipt, Invoice, PersonalEvent, BucketFilter } from '../types';

interface CalendarEvent {
  date: string;
  type: EntityType;
  data: TimeEntry | Receipt | Invoice | PersonalEvent;
}

interface CalendarWeekViewProps {
  events: CalendarEvent[];
  activeFilter: BucketFilter;
  onDayClick: (date: Date) => void;
}

export function CalendarWeekView({ events, activeFilter, onDayClick }: CalendarWeekViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDays = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    const sunday = new Date(date.setDate(diff));
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(sunday);
      day.setDate(sunday.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(new Date(currentDate));

  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    return events.filter(event => {
      if (activeFilter !== 'all') {
        if (activeFilter === 'time' && event.type !== 'time') return false;
        if (activeFilter === 'receipt' && event.type !== 'receipt') return false;
        if (activeFilter === 'invoice' && event.type !== 'invoice') return false;
        if (activeFilter === 'personal' && event.type !== 'personal') return false;
      }
      return event.date === dateStr;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const dayNamesShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Calculate week summary
  const weekSummary = weekDays.reduce((acc, date) => {
    const dayEvents = getEventsForDate(date);
    dayEvents.forEach(event => {
      if (event.type === 'time') {
        const timeData = event.data as TimeEntry;
        acc.hours += timeData.duration;
        acc.earned += timeData.amount;
      } else if (event.type === 'receipt') {
        const receiptData = event.data as Receipt;
        acc.expenses += receiptData.total;
      } else if (event.type === 'invoice') {
        acc.invoices += 1;
      }
    });
    return acc;
  }, { hours: 0, earned: 0, expenses: 0, invoices: 0 });

  return (
    <div className="flex flex-col gap-4">
      {/* Week navigation header */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={previousWeek} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-orkes-navy">
              Week of {weekDays[0].toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' })}
            </h2>
          </div>
          
          <button 
            onClick={nextWeek} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next week"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-orkes-peach/10 text-orkes-peach rounded-lg hover:bg-orkes-peach/20 transition-colors text-sm"
          >
            Today
          </button>
        </div>
      </div>

      {/* Week summary card */}
      {(weekSummary.hours > 0 || weekSummary.expenses > 0 || weekSummary.invoices > 0) && (
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
          <div className="text-sm opacity-60 mb-3">Week Summary</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">⏱️</span>
              <div>
                <div className="text-xs opacity-60">Hours worked</div>
                <div className="text-orkes-navy">{weekSummary.hours.toFixed(1)}h</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💰</span>
              <div>
                <div className="text-xs opacity-60">Earned</div>
                <div className="text-orkes-navy">${weekSummary.earned.toFixed(2)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🧾</span>
              <div>
                <div className="text-xs opacity-60">Expenses</div>
                <div className="text-orkes-navy">${weekSummary.expenses.toFixed(2)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📄</span>
              <div>
                <div className="text-xs opacity-60">Invoices</div>
                <div className="text-orkes-navy">{weekSummary.invoices}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Day rows */}
      <div className="space-y-0 bg-white rounded-xl shadow-sm overflow-hidden">
        {weekDays.map((date, dayIdx) => {
          const dayEvents = getEventsForDate(date);
          const isTodayDay = isToday(date);
          const isWeekendDay = isWeekend(date);
          
          return (
            <div key={dayIdx}>
              {/* Day row */}
              <div 
                className={`
                  ${isTodayDay ? 'bg-sky-50 border-l-4 border-sky-400' : isWeekendDay ? 'bg-gray-50' : 'bg-white'}
                  transition-colors
                `}
              >
                {/* Day header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`${isTodayDay ? 'text-sky-600' : isWeekendDay ? 'text-gray-500' : 'text-orkes-navy'}`}>
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline">
                          {dayNames[date.getDay()]}
                        </span>
                        <span className="sm:hidden">
                          {dayNamesShort[date.getDay()]}
                        </span>
                        <span>{date.getDate()}</span>
                        {isTodayDay && (
                          <>
                            <span className="text-sky-600">•</span>
                            <span className="text-xs text-sky-600">TODAY</span>
                          </>
                        )}
                      </div>
                    </div>
                    {dayEvents.length > 0 && (
                      <div className="text-xs opacity-50">
                        ({dayEvents.length} {dayEvents.length === 1 ? 'item' : 'items'})
                      </div>
                    )}
                  </div>
                  
                  <button
                    className="w-10 h-10 rounded-lg bg-orkes-peach/10 text-orkes-peach hover:bg-orkes-peach/20 transition-colors flex items-center justify-center"
                    aria-label={`Add event for ${dayNames[date.getDay()]}`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Card container */}
                <div className="min-h-[120px]">
                  <HorizontalCardStack 
                    events={dayEvents}
                    onCardClick={() => onDayClick(date)}
                  />
                </div>
              </div>

              {/* Day separator (except for last day) */}
              {dayIdx < weekDays.length - 1 && (
                <div className="border-b border-gray-200" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

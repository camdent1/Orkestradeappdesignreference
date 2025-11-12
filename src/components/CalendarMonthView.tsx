import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EntityType, TimeEntry, Receipt, Invoice, PersonalEvent, BucketFilter } from '../types';

interface CalendarEvent {
  date: string;
  type: EntityType;
  data: TimeEntry | Receipt | Invoice | PersonalEvent;
}

interface CalendarMonthViewProps {
  events: CalendarEvent[];
  activeFilter: BucketFilter;
  onDayClick: (date: Date) => void;
}

export function CalendarMonthView({ events, activeFilter, onDayClick }: CalendarMonthViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week for first day (0 = Sunday)
    const startDayOfWeek = firstDay.getDay();
    
    // Calculate days to show (including previous/next month)
    const days: Date[] = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0);
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(prevMonthLastDay);
      day.setDate(prevMonthLastDay.getDate() - i);
      days.push(day);
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Next month days to fill grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const previousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
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

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth() && 
           date.getFullYear() === currentDate.getFullYear();
  };

  const getEntityDotColor = (type: EntityType) => {
    switch (type) {
      case 'time': return 'bg-orkes-peach'; // Orange
      case 'receipt': return 'bg-green-400'; // Green
      case 'invoice': return 'bg-purple-400'; // Purple
      case 'personal': return 'bg-sky-400'; // Blue
      default: return 'bg-gray-400';
    }
  };

  const monthDays = getMonthDays(currentDate);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="flex flex-col gap-4">
      {/* Month navigation header */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={previousMonth} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-orkes-navy">
            {currentDate.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
          </h2>
          
          <button 
            onClick={nextMonth} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={goToToday}
          className="w-full px-4 py-2 bg-orkes-peach/10 text-orkes-peach rounded-lg hover:bg-orkes-peach/20 transition-colors text-sm"
        >
          Today
        </button>
      </div>

      {/* Calendar grid */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, idx) => (
            <div key={idx} className="text-center text-xs opacity-60 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((date, idx) => {
            const dayEvents = getEventsForDate(date);
            const isTodayDay = isToday(date);
            const isCurrentMonthDay = isCurrentMonth(date);
            
            // Get unique entity types (for dots)
            const entityTypes = Array.from(new Set(dayEvents.map(e => e.type)));
            const visibleDots = entityTypes.slice(0, 3);
            const remainingCount = entityTypes.length - visibleDots.length;
            
            return (
              <button
                key={idx}
                onClick={() => dayEvents.length > 0 && onDayClick(date)}
                className={`
                  aspect-square p-2 rounded-lg transition-all duration-200 ease-in-out
                  ${!isCurrentMonthDay ? 'opacity-40' : ''}
                  ${isTodayDay ? 'bg-sky-50 ring-2 ring-sky-400' : ''}
                  ${dayEvents.length > 0 && isCurrentMonthDay ? 'hover:bg-orkes-peach hover:text-white hover:shadow-md cursor-pointer' : ''}
                  ${dayEvents.length === 0 && isCurrentMonthDay ? 'hover:bg-gray-50' : ''}
                  flex flex-col items-center justify-center relative
                `}
              >
                {/* Date number */}
                <span className={`text-sm mb-1 ${dayEvents.length > 0 && isCurrentMonthDay ? 'font-semibold' : ''}`}>
                  {date.getDate()}
                </span>
                
                {/* Activity dots */}
                {dayEvents.length > 0 && (
                  <div className="flex items-center gap-0.5">
                    {visibleDots.map((type, dotIdx) => (
                      <div
                        key={dotIdx}
                        className={`w-1.5 h-1.5 rounded-full ${getEntityDotColor(type)} transition-opacity duration-200`}
                      />
                    ))}
                    {remainingCount > 0 && (
                      <span className="text-[10px] opacity-50 ml-0.5">+{remainingCount}</span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

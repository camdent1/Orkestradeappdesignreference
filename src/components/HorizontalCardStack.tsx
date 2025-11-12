import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { UniversalCard } from './UniversalCard';
import { EntityType, TimeEntry, Receipt, Invoice, PersonalEvent } from '../types';

interface CalendarEvent {
  date: string;
  type: EntityType;
  data: TimeEntry | Receipt | Invoice | PersonalEvent;
}

interface HorizontalCardStackProps {
  events: CalendarEvent[];
  onCardClick: (event: CalendarEvent) => void;
}

export function HorizontalCardStack({ events, onCardClick }: HorizontalCardStackProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [events]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 260; // Scroll ~2 cards at a time
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div className="text-sm opacity-40">No events today</div>
        <div className="text-xs opacity-30 mt-1">Tap + to add</div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Left scroll indicator */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 flex items-center pointer-events-none">
          <button
            onClick={() => scroll('left')}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors ml-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Right scroll indicator */}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 flex items-center justify-end pointer-events-none">
          <button
            onClick={() => scroll('right')}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors mr-1"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Scrollable card container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="overflow-x-auto scrollbar-hide py-3"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="flex items-start px-4" style={{ minWidth: 'max-content' }}>
          {events.map((event, index) => (
            <div
              key={index}
              className="flex-shrink-0 transition-transform hover:scale-105 cursor-pointer"
              style={{
                width: '140px',
                marginLeft: index > 0 ? '-20px' : '0', // 20pt overlap
                zIndex: events.length - index, // Left cards on top
              }}
              onClick={() => onCardClick(event)}
            >
              <div style={{ width: '140px' }}>
                <UniversalCard
                  type={event.type}
                  data={event.data}
                  compact
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint for many cards */}
      {events.length > 3 && showRightArrow && (
        <div className="text-xs opacity-40 text-center -mt-1 mb-2">
          Swipe to see {events.length - 3} more →
        </div>
      )}
    </div>
  );
}

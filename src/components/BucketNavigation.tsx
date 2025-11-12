import { BucketFilter } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface BucketNavigationProps {
  buckets: { id: BucketFilter; label: string; color?: string }[];
  selected: BucketFilter;
  onSelect: (bucket: BucketFilter) => void;
}

export function BucketNavigation({ buckets, selected, onSelect }: BucketNavigationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getColorClass = (bucketId: BucketFilter, isSelected: boolean) => {
    const colorMap: Record<string, { bg: string; text: string; selectedBg: string; selectedText: string }> = {
      time: { bg: 'bg-time/10', text: 'text-time', selectedBg: 'bg-time', selectedText: 'text-white' },
      receipt: { bg: 'bg-receipt/10', text: 'text-receipt', selectedBg: 'bg-receipt', selectedText: 'text-white' },
      invoice: { bg: 'bg-invoice/10', text: 'text-invoice', selectedBg: 'bg-invoice', selectedText: 'text-white' },
      personal: { bg: 'bg-personal/10', text: 'text-personal', selectedBg: 'bg-personal', selectedText: 'text-white' },
      jobsite: { bg: 'bg-jobsite/10', text: 'text-jobsite', selectedBg: 'bg-jobsite', selectedText: 'text-white' },
      billable: { bg: 'bg-receipt/10', text: 'text-receipt', selectedBg: 'bg-receipt', selectedText: 'text-white' },
      overhead: { bg: 'bg-gray-200', text: 'text-gray-700', selectedBg: 'bg-gray-500', selectedText: 'text-white' },
      active: { bg: 'bg-active/10', text: 'text-active', selectedBg: 'bg-active', selectedText: 'text-white' },
      completed: { bg: 'bg-gray-200', text: 'text-gray-700', selectedBg: 'bg-gray-500', selectedText: 'text-white' },
      draft: { bg: 'bg-draft/10', text: 'text-draft', selectedBg: 'bg-draft', selectedText: 'text-white' },
      sent: { bg: 'bg-invoiced/10', text: 'text-invoiced', selectedBg: 'bg-invoiced', selectedText: 'text-white' },
      paid: { bg: 'bg-paid/10', text: 'text-paid', selectedBg: 'bg-paid', selectedText: 'text-white' },
      overdue: { bg: 'bg-overdue/10', text: 'text-overdue', selectedBg: 'bg-overdue', selectedText: 'text-white' },
      events: { bg: 'bg-personal/10', text: 'text-personal', selectedBg: 'bg-personal', selectedText: 'text-white' },
      tasks: { bg: 'bg-personal/10', text: 'text-personal', selectedBg: 'bg-personal', selectedText: 'text-white' },
      bills: { bg: 'bg-personal/10', text: 'text-personal', selectedBg: 'bg-personal', selectedText: 'text-white' },
    };

    const colors = colorMap[bucketId] || { bg: 'bg-orkes-peach/10', text: 'text-orkes-peach', selectedBg: 'bg-orkes-peach', selectedText: 'text-white' };
    
    if (isSelected) {
      return `${colors.selectedBg} ${colors.selectedText} shadow-md`;
    }
    return `${colors.bg} ${colors.text}`;
  };

  return (
    <div className="relative flex items-center gap-2 py-2">
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 bg-orkes-cream/95 p-1 rounded-full shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-8 flex-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {buckets.map((bucket) => (
          <button
            key={bucket.id}
            onClick={() => onSelect(bucket.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${getColorClass(bucket.id, selected === bucket.id)}`}
          >
            {bucket.label}
          </button>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 bg-orkes-cream/95 p-1 rounded-full shadow-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

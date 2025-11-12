type ViewMode = 'month' | 'week';

interface CalendarViewModeToggleProps {
  activeMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export function CalendarViewModeToggle({ activeMode, onModeChange }: CalendarViewModeToggleProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-orkes-cream rounded-full p-1 inline-flex gap-1">
        <button
          onClick={() => onModeChange('month')}
          className={`
            px-6 py-2 rounded-full transition-all duration-200 ease-in-out
            ${activeMode === 'month' 
              ? 'bg-white text-orkes-navy shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          Month
        </button>
        <button
          onClick={() => onModeChange('week')}
          className={`
            px-6 py-2 rounded-full transition-all duration-200 ease-in-out
            ${activeMode === 'week' 
              ? 'bg-white text-orkes-navy shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          Week
        </button>
      </div>
    </div>
  );
}

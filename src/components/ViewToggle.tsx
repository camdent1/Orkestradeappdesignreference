import { ViewMode } from '../types';
import { Grid3x3, Calendar, List } from 'lucide-react';

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  showList?: boolean;
}

export function ViewToggle({ view, onViewChange, showList = true }: ViewToggleProps) {
  return (
    <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded ${view === 'grid' ? 'bg-orkes-peach text-white' : 'text-orkes-navy hover:bg-gray-100'}`}
      >
        <Grid3x3 className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewChange('calendar')}
        className={`p-2 rounded ${view === 'calendar' ? 'bg-orkes-peach text-white' : 'text-orkes-navy hover:bg-gray-100'}`}
      >
        <Calendar className="w-4 h-4" />
      </button>
      {showList && (
        <button
          onClick={() => onViewChange('list')}
          className={`p-2 rounded ${view === 'list' ? 'bg-orkes-peach text-white' : 'text-orkes-navy hover:bg-gray-100'}`}
        >
          <List className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

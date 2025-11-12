import { useState } from 'react';
import { User, Plus } from 'lucide-react';
import { BucketNavigation } from './BucketNavigation';
import { ViewToggle } from './ViewToggle';
import { CardGrid } from './CardGrid';
import { CalendarMonthView } from './CalendarMonthView';
import { CalendarWeekView } from './CalendarWeekView';
import { BucketFilter, ViewMode } from '../types';
import { mockPersonalEvents } from '../lib/mockData';

export function PersonalView() {
  const [bucketFilter, setBucketFilter] = useState<BucketFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const buckets = [
    { id: 'all' as BucketFilter, label: 'All' },
    { id: 'events' as BucketFilter, label: 'Events' },
    { id: 'tasks' as BucketFilter, label: 'Tasks' },
    { id: 'bills' as BucketFilter, label: 'Bills' },
  ];

  // Filter personal events
  const filteredEvents = mockPersonalEvents.filter(event => {
    if (bucketFilter === 'all') return true;
    if (bucketFilter === 'events') return event.category === 'event';
    if (bucketFilter === 'tasks') return event.category === 'task';
    if (bucketFilter === 'bills') return event.category === 'bill';
    return true;
  });

  const items = filteredEvents.map(event => ({
    type: 'personal' as const,
    data: event,
    date: event.date,
  }));

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orkes-peach flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <h1>Personal</h1>
        </div>
        <button className="p-2 bg-orkes-peach text-white rounded-lg hover:bg-orkes-peach/90">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Bucket Navigation */}
      <BucketNavigation
        buckets={buckets}
        selected={bucketFilter}
        onSelect={setBucketFilter}
      />

      {/* View Controls */}
      <div className="flex items-center justify-between">
        <h2>Upcoming</h2>
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {/* Content Area */}
      {viewMode === 'grid' && (
        <CardGrid items={items} />
      )}

      {viewMode === 'calendar' && (
        <div className="hidden md:block">
          <CalendarWeekView 
            events={items}
            activeFilter={bucketFilter}
          />
        </div>
      )}

      {viewMode === 'calendar' && (
        <div className="md:hidden">
          <CalendarMonthView 
            events={items}
            activeFilter={bucketFilter}
          />
        </div>
      )}

      {viewMode === 'list' && (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3>{item.data.title}</h3>
                  <p className="text-sm opacity-60">
                    {new Date(item.date).toLocaleDateString()} • {item.data.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

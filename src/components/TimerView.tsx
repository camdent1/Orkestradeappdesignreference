import { useState } from 'react';
import { User, Calendar as CalendarIcon, Plus, Clock, Play } from 'lucide-react';
import { BucketNavigation } from './BucketNavigation';
import { ViewToggle } from './ViewToggle';
import { CardGrid } from './CardGrid';
import { CalendarMonthView } from './CalendarMonthView';
import { CalendarWeekView } from './CalendarWeekView';
import { CalendarDayView } from './CalendarDayView';
import { BucketFilter, ViewMode } from '../types';
import { mockTimeEntries } from '../lib/mockData';
import { Button } from './ui/button';

export function TimerView() {
  const [bucketFilter, setBucketFilter] = useState<BucketFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [calendarMode, setCalendarMode] = useState<'month' | 'week'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const buckets = [
    { id: 'all' as BucketFilter, label: 'All Time' },
  ];

  const items = mockTimeEntries.map(entry => ({
    type: 'time' as const,
    data: entry,
    date: entry.date,
  }));

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orkes-peach flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <h1>Time Tracking</h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white rounded-lg">
            <CalendarIcon className="w-5 h-5" />
          </button>
          <button className="p-2 bg-orkes-peach text-white rounded-lg hover:bg-orkes-peach/90">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Timer Status */}
      {isTimerRunning ? (
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white shadow-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-sm opacity-90">RUNNING</span>
          </div>
          <div className="text-5xl mb-4">2h 34m 17s</div>
          <p className="text-lg mb-2">Bridge Street Renovation</p>
          <small className="opacity-80">Started at 8:30 AM</small>
          
          <div className="flex gap-3 mt-6 max-w-md mx-auto">
            <Button 
              variant="secondary" 
              className="flex-1 bg-white/20 hover:bg-white/30 border-0 h-12"
              onClick={() => setIsTimerRunning(false)}
            >
              ⏸️ Pause
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 bg-white/20 hover:bg-white/30 border-0 h-12"
              onClick={() => setIsTimerRunning(false)}
            >
              ⏹️ Stop
            </Button>
          </div>

          <p className="mt-4 text-sm opacity-80">📍 Auto via geofence</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Clock className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="mb-2">No Timer Running</h2>
          <p className="text-sm opacity-60 mb-6">Select a job site to start tracking time</p>
          
          <select className="w-full max-w-md mx-auto mb-4 px-4 py-3 rounded-lg border border-gray-300">
            <option>Select Job Site</option>
            <option>Bridge Street Renovation</option>
            <option>Kitchen Renovation</option>
          </select>

          <Button 
            className="w-full max-w-md mx-auto h-12 bg-green-600 hover:bg-green-700"
            onClick={() => setIsTimerRunning(true)}
          >
            <Play className="w-5 h-5 mr-2" />
            Start Timer
          </Button>

          <div className="mt-4">
            <span className="text-sm opacity-60">or</span>
          </div>

          <Button variant="outline" className="mt-4">
            + Manual Time Entry
          </Button>
        </div>
      )}

      {/* Bucket Navigation */}
      <BucketNavigation
        buckets={buckets}
        selected={bucketFilter}
        onSelect={setBucketFilter}
      />

      {/* View Controls */}
      <div className="flex items-center justify-between">
        <h2>Recent</h2>
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {/* Content Area */}
      {viewMode === 'grid' && (
        <CardGrid items={items} />
      )}

      {viewMode === 'calendar' && (
        <>
          {selectedDate ? (
            <CalendarDayView
              date={selectedDate}
              events={items}
              activeFilter={bucketFilter}
              onBack={() => setSelectedDate(null)}
            />
          ) : (
            <>
              <div className="flex gap-2">
                <button
                  onClick={() => setCalendarMode('month')}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    calendarMode === 'month' 
                      ? 'bg-orkes-peach text-white shadow-md' 
                      : 'bg-white text-orkes-navy hover:bg-gray-50'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setCalendarMode('week')}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    calendarMode === 'week' 
                      ? 'bg-orkes-peach text-white shadow-md' 
                      : 'bg-white text-orkes-navy hover:bg-gray-50'
                  }`}
                >
                  Week
                </button>
              </div>

              {calendarMode === 'month' ? (
                <CalendarMonthView 
                  events={items}
                  activeFilter={bucketFilter}
                  onDayClick={(date) => setSelectedDate(date)}
                />
              ) : (
                <CalendarWeekView 
                  events={items}
                  activeFilter={bucketFilter}
                  onDayClick={(date) => setSelectedDate(date)}
                />
              )}
            </>
          )}
        </>
      )}

      {viewMode === 'list' && (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3>{item.data.jobSiteName}</h3>
                  <p className="text-sm opacity-60">
                    {new Date(item.date).toLocaleDateString()} • {item.data.duration}h • ${item.data.amount}
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
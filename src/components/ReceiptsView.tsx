import { useState } from 'react';
import { User, Calendar as CalendarIcon, Camera, DollarSign, FileText } from 'lucide-react';
import { BucketNavigation } from './BucketNavigation';
import { ViewToggle } from './ViewToggle';
import { CardGrid } from './CardGrid';
import { CalendarMonthView } from './CalendarMonthView';
import { CalendarWeekView } from './CalendarWeekView';
import { BucketFilter, ViewMode } from '../types';
import { mockReceipts } from '../lib/mockData';

export function ReceiptsView() {
  const [bucketFilter, setBucketFilter] = useState<BucketFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const buckets = [
    { id: 'all' as BucketFilter, label: 'All' },
    { id: 'billable' as BucketFilter, label: 'Billable' },
    { id: 'overhead' as BucketFilter, label: 'Overhead' },
  ];

  // Filter receipts
  const filteredReceipts = mockReceipts.filter(receipt => {
    if (bucketFilter === 'all') return true;
    return receipt.category === bucketFilter;
  });

  const items = filteredReceipts.map(receipt => ({
    type: 'receipt' as const,
    data: receipt,
    date: receipt.date,
  }));

  // Calculate stats
  const totalAmount = filteredReceipts.reduce((sum, r) => sum + r.total, 0);
  const totalCount = filteredReceipts.length;

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orkes-peach flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <h1>Receipts</h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white rounded-lg">
            <CalendarIcon className="w-5 h-5" />
          </button>
          <button className="p-2 bg-orkes-peach text-white rounded-lg hover:bg-orkes-peach/90">
            <Camera className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-receipt">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm opacity-80">Total</span>
            </div>
            <div className="text-3xl">${totalAmount.toFixed(2)}</div>
          </div>
          <div className="w-px h-12 bg-gray-200" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-receipt">
              <FileText className="w-5 h-5" />
              <span className="text-sm opacity-80">Receipts</span>
            </div>
            <div className="text-3xl">{totalCount}</div>
          </div>
        </div>
      </div>

      {/* Bucket Navigation */}
      <BucketNavigation
        buckets={buckets}
        selected={bucketFilter}
        onSelect={setBucketFilter}
      />

      {/* View Controls */}
      <div className="flex items-center justify-between">
        <h2>This Week</h2>
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
                  <h3>{item.data.vendor}</h3>
                  <p className="text-sm opacity-60">
                    {new Date(item.date).toLocaleDateString()} • ${item.data.total} • {item.data.category}
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

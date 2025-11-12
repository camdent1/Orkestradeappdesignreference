import { useState } from 'react';
import { User, Calendar as CalendarIcon, Plus, DollarSign, FileText } from 'lucide-react';
import { BucketNavigation } from './BucketNavigation';
import { ViewToggle } from './ViewToggle';
import { CardGrid } from './CardGrid';
import { CalendarMonthView } from './CalendarMonthView';
import { CalendarWeekView } from './CalendarWeekView';
import { BucketFilter, ViewMode } from '../types';
import { mockInvoices } from '../lib/mockData';

export function InvoicesView() {
  const [bucketFilter, setBucketFilter] = useState<BucketFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const buckets = [
    { id: 'all' as BucketFilter, label: 'All' },
    { id: 'draft' as BucketFilter, label: 'Draft' },
    { id: 'sent' as BucketFilter, label: 'Sent' },
    { id: 'paid' as BucketFilter, label: 'Paid' },
    { id: 'overdue' as BucketFilter, label: 'Overdue' },
  ];

  // Filter invoices
  const filteredInvoices = mockInvoices.filter(invoice => {
    if (bucketFilter === 'all') return true;
    return invoice.status === bucketFilter;
  });

  const items = filteredInvoices.map(invoice => ({
    type: 'invoice' as const,
    data: invoice,
    date: invoice.date,
  }));

  // Calculate stats
  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const outstanding = filteredInvoices
    .filter(inv => inv.status !== 'paid')
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orkes-peach flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <h1>Invoices</h1>
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

      {/* Summary Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-invoice">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm opacity-80">Total</span>
            </div>
            <div className="text-2xl">${totalAmount.toFixed(0)}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-invoice">
              <FileText className="w-5 h-5" />
              <span className="text-sm opacity-80">Count</span>
            </div>
            <div className="text-2xl">{filteredInvoices.length}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-overdue">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm opacity-80">Outstanding</span>
            </div>
            <div className="text-2xl">${outstanding.toFixed(0)}</div>
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
        <h2>November 2024</h2>
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
                  <h3>Invoice #{item.data.invoiceNumber}</h3>
                  <p className="text-sm opacity-60">
                    {item.data.clientName} • ${item.data.total} • {item.data.status}
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

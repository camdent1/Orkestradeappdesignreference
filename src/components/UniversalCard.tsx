import { EntityType, TimeEntry, Receipt, Invoice, JobSite, PersonalEvent } from '../types';
import { Clock, DollarSign, FileText, MapPin, Calendar, MoreVertical } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface UniversalCardProps {
  type: EntityType;
  data: TimeEntry | Receipt | Invoice | JobSite | PersonalEvent;
  compact?: boolean;
  onClick?: () => void;
}

export function UniversalCard({ type, data, compact = false, onClick }: UniversalCardProps) {
  const getGradientClass = () => {
    switch (type) {
      case 'time': return 'card-gradient-time';
      case 'receipt': return 'card-gradient-receipt';
      case 'invoice': return 'card-gradient-invoice';
      case 'jobsite': return 'card-gradient-jobsite';
      case 'personal': return 'card-gradient-personal';
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'time':
        return <TimeEntryCard data={data as TimeEntry} compact={compact} />;
      case 'receipt':
        return <ReceiptCard data={data as Receipt} compact={compact} />;
      case 'invoice':
        return <InvoiceCard data={data as Invoice} compact={compact} />;
      case 'jobsite':
        return <JobSiteCard data={data as JobSite} compact={compact} />;
      case 'personal':
        return <PersonalCard data={data as PersonalEvent} compact={compact} />;
    }
  };

  return (
    <div
      className={`${getGradientClass()} rounded-xl shadow-sm cursor-pointer transition-transform active:scale-[0.98] text-white ${
        compact ? 'p-3 min-h-[72px]' : 'p-4 min-h-[180px]'
      }`}
      onClick={onClick}
    >
      {renderContent()}
    </div>
  );
}

function TimeEntryCard({ data, compact }: { data: TimeEntry; compact: boolean }) {
  const statusColors = {
    unbilled: 'bg-orange-500/90 border-orange-400',
    invoiced: 'bg-blue-500/90 border-blue-400',
  };

  if (compact) {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-start gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-orkes-peach flex-shrink-0 mt-1"></div>
            <p className="truncate line-clamp-1">{data.jobSiteName}</p>
          </div>
          <p className="text-xs opacity-80">{data.startTime} - {data.endTime}</p>
        </div>
        <div className="border-t border-white/20 pt-2 mt-2">
          <div className="flex items-center justify-between text-xs">
            <span>⏱️ {data.duration}h</span>
            <span>💰 ${data.amount}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <Clock className="w-5 h-5" />
          <h3 className="truncate">{data.jobSiteName}</h3>
        </div>
        <Badge className={statusColors[data.status]}>{data.status}</Badge>
      </div>
      <p className="opacity-90 mb-3">
        {new Date(data.date).toLocaleDateString('en-AU', { weekday: 'short', month: 'short', day: 'numeric' })} • {data.startTime} - {data.endTime}
      </p>
      <div className="border-t border-white/20 pt-3 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>${data.amount.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{data.duration}h</span>
          </div>
        </div>
      </div>
      {!compact && (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1 bg-white/20 hover:bg-white/30 border-0">
            Resume
          </Button>
          <Button variant="secondary" size="sm" className="flex-1 bg-white/20 hover:bg-white/30 border-0">
            Invoice
          </Button>
        </div>
      )}
    </>
  );
}

function ReceiptCard({ data, compact }: { data: Receipt; compact: boolean }) {
  const categoryColors = {
    billable: 'bg-green-600/90 border-green-500',
    overhead: 'bg-gray-500/90 border-gray-400',
  };

  if (compact) {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-start gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 mt-1"></div>
            <p className="truncate line-clamp-1">{data.vendor}</p>
          </div>
          <p className="text-xs opacity-80">{data.category}</p>
        </div>
        <div className="border-t border-white/20 pt-2 mt-2">
          <div className="text-xs">💰 ${data.total.toFixed(2)}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <FileText className="w-5 h-5" />
          <h3 className="truncate">{data.vendor}</h3>
        </div>
        <Badge className={categoryColors[data.category]}>{data.category}</Badge>
      </div>
      <p className="opacity-90 mb-3">
        {data.jobSiteName || 'Overhead'} • {new Date(data.date).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}
      </p>
      <div className="border-t border-white/20 pt-3 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>${data.total.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>{data.itemCount} items</span>
          </div>
        </div>
      </div>
      {!compact && (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1 bg-white/20 hover:bg-white/30 border-0">
            View
          </Button>
          <Button variant="secondary" size="sm" className="flex-1 bg-white/20 hover:bg-white/30 border-0">
            Assign
          </Button>
        </div>
      )}
    </>
  );
}

function InvoiceCard({ data, compact }: { data: Invoice; compact: boolean }) {
  const statusColors = {
    draft: 'bg-gray-500/90 border-gray-400',
    sent: 'bg-blue-500/90 border-blue-400',
    paid: 'bg-green-600/90 border-green-500',
    overdue: 'bg-red-500/90 border-red-400',
  };

  if (compact) {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-start gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0 mt-1"></div>
            <p className="truncate line-clamp-1">#{data.invoiceNumber}</p>
          </div>
          <p className="text-xs opacity-80">{data.jobSiteName}</p>
        </div>
        <div className="border-t border-white/20 pt-2 mt-2">
          <div className="text-xs">💰 ${data.total.toFixed(2)}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <FileText className="w-5 h-5" />
          <h3 className="truncate">Invoice #{data.invoiceNumber}</h3>
        </div>
        <Badge className={statusColors[data.status]}>{data.status}</Badge>
      </div>
      <p className="opacity-90 mb-3">
        {data.jobSiteName}
      </p>
      <div className="border-t border-white/20 pt-3 mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="opacity-90 text-sm">Labor: ${data.labor.toFixed(2)}</span>
          <span className="opacity-90 text-sm">Materials: ${data.materials.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>${data.total.toFixed(2)}</span>
          </div>
          <small className="opacity-90">Due {new Date(data.dueDate).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}</small>
        </div>
      </div>
      {!compact && (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1 bg-white/20 hover:bg-white/30 border-0">
            Send
          </Button>
          <Button variant="secondary" size="sm" className="flex-1 bg-white/20 hover:bg-white/30 border-0">
            Mark Paid
          </Button>
        </div>
      )}
    </>
  );
}

function JobSiteCard({ data, compact }: { data: JobSite; compact: boolean }) {
  const statusColors = {
    active: 'bg-sky-500/90 border-sky-400',
    completed: 'bg-gray-500/90 border-gray-400',
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <p className="truncate">{data.name}</p>
          </div>
          <small className="opacity-90">{data.clientName}</small>
        </div>
        <Badge className={statusColors[data.status]}>{data.status}</Badge>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="w-5 h-5" />
          <h3 className="truncate">{data.name}</h3>
        </div>
        <Badge className={statusColors[data.status]}>{data.status}</Badge>
      </div>
      <p className="opacity-90 mb-3 line-clamp-2">
        {data.clientName} • {data.address}
      </p>
      <div className="border-t border-white/20 pt-3 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{data.totalHours}h</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>${data.totalRevenue.toFixed(0)}</span>
          </div>
        </div>
      </div>
      {!compact && data.status === 'active' && (
        <Button variant="secondary" size="sm" className="w-full bg-white/20 hover:bg-white/30 border-0">
          Start Timer
        </Button>
      )}
    </>
  );
}

function PersonalCard({ data, compact }: { data: PersonalEvent; compact: boolean }) {
  const categoryIcons = {
    event: Calendar,
    task: FileText,
    bill: DollarSign,
  };
  
  const Icon = categoryIcons[data.category];

  if (compact) {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-start gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-1"></div>
            <p className="truncate line-clamp-1">{data.title}</p>
          </div>
          <p className="text-xs opacity-80">{data.time || 'All day'}</p>
        </div>
        {data.location && (
          <div className="border-t border-white/20 pt-2 mt-2">
            <div className="text-xs truncate">📍 {data.location}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <Icon className="w-5 h-5" />
          <h3 className="truncate">{data.title}</h3>
        </div>
        <Badge className="bg-blue-500/90 border-blue-400">{data.category}</Badge>
      </div>
      <p className="opacity-90 mb-3">
        {data.location || new Date(data.date).toLocaleDateString('en-AU', { weekday: 'long', month: 'short', day: 'numeric' })}
      </p>
      <div className="border-t border-white/20 pt-3">
        <div className="flex items-center justify-between">
          {data.time && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{data.time}</span>
            </div>
          )}
          {data.duration && (
            <span className="opacity-90">{data.duration}</span>
          )}
        </div>
      </div>
    </>
  );
}
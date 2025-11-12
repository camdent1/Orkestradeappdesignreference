export type EntityType = 'time' | 'receipt' | 'invoice' | 'jobsite' | 'personal';

export type StatusType = 'unbilled' | 'invoiced' | 'paid' | 'overdue' | 'active' | 'draft' | 'completed' | 'sent';

export interface TimeEntry {
  id: string;
  jobSiteId: string;
  jobSiteName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in hours
  amount: number;
  status: 'unbilled' | 'invoiced';
  isRunning?: boolean;
}

export interface Receipt {
  id: string;
  vendor: string;
  date: string;
  total: number;
  gst: number;
  category: 'billable' | 'overhead';
  jobSiteId?: string;
  jobSiteName?: string;
  itemCount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  jobSiteId: string;
  jobSiteName: string;
  clientName: string;
  date: string;
  dueDate: string;
  labor: number;
  materials: number;
  subtotal: number;
  gst: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

export interface JobSite {
  id: string;
  name: string;
  clientName: string;
  address: string;
  status: 'active' | 'completed';
  hourlyRate: number;
  totalHours: number;
  totalExpenses: number;
  totalRevenue: number;
  geofenceRadius: number; // in meters
  lat?: number;
  lng?: number;
}

export interface PersonalEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  duration?: string;
  location?: string;
  category: 'event' | 'task' | 'bill';
}

export type ViewMode = 'grid' | 'calendar' | 'list';

export type BucketFilter = 'all' | 'time' | 'receipt' | 'invoice' | 'personal' | 'billable' | 'overhead' | 'draft' | 'sent' | 'paid' | 'overdue' | 'active' | 'completed' | 'events' | 'tasks' | 'bills';

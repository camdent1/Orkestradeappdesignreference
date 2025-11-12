import { useState } from 'react';
import { User, Calendar as CalendarIcon, Plus, Search } from 'lucide-react';
import { BucketNavigation } from './BucketNavigation';
import { CardGrid } from './CardGrid';
import { BucketFilter } from '../types';
import { mockJobSites } from '../lib/mockData';
import { Input } from './ui/input';

export function JobSitesView() {
  const [bucketFilter, setBucketFilter] = useState<BucketFilter>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const buckets = [
    { id: 'active' as BucketFilter, label: 'Active' },
    { id: 'completed' as BucketFilter, label: 'Completed' },
    { id: 'all' as BucketFilter, label: 'All' },
  ];

  // Filter job sites
  const filteredJobSites = mockJobSites.filter(site => {
    const matchesFilter = bucketFilter === 'all' || site.status === bucketFilter;
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const items = filteredJobSites.map(site => ({
    type: 'jobsite' as const,
    data: site,
  }));

  const activeCount = mockJobSites.filter(s => s.status === 'active').length;
  const completedCount = mockJobSites.filter(s => s.status === 'completed').length;

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orkes-peach flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <h1>Job Sites</h1>
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search job sites..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      {/* Bucket Navigation */}
      <BucketNavigation
        buckets={buckets}
        selected={bucketFilter}
        onSelect={setBucketFilter}
      />

      {/* Section Headers */}
      {bucketFilter === 'all' && (
        <>
          <div>
            <h2 className="mb-4">Active ({activeCount})</h2>
            <CardGrid 
              items={mockJobSites.filter(s => s.status === 'active').map(site => ({
                type: 'jobsite' as const,
                data: site,
              }))}
            />
          </div>

          <div>
            <h2 className="mb-4">Completed ({completedCount})</h2>
            <CardGrid 
              items={mockJobSites.filter(s => s.status === 'completed').map(site => ({
                type: 'jobsite' as const,
                data: site,
              }))}
            />
          </div>
        </>
      )}

      {bucketFilter !== 'all' && (
        <CardGrid items={items} />
      )}
    </div>
  );
}

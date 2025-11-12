import React from 'react';
import { UniversalCard } from './UniversalCard';
import { Play, Pause, Square } from 'lucide-react';

interface DashboardViewProps {
  timerRunning: boolean;
  timerDuration: string;
  timerProject: string;
  onPauseTimer: () => void;
  onStopTimer: () => void;
}

export function DashboardView({
  timerRunning,
  timerDuration,
  timerProject,
  onPauseTimer,
  onStopTimer,
}: DashboardViewProps) {
  return (
    <div className="pb-20 px-4 space-y-6 max-w-screen-lg mx-auto">
      {/* Active Timer */}
      {timerRunning && (
        <div className="bg-white rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1)] mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-[var(--color-success)] animate-pulse" />
            <span className="text-[var(--color-success)] uppercase tracking-wider text-[13px]">
              Timer Running
            </span>
          </div>
          <div className="text-4xl mb-2 text-[var(--color-orkes-navy)] tabular-nums">
            {timerDuration}
          </div>
          <div className="text-[var(--color-gray-dark)] mb-4">{timerProject}</div>
          <div className="flex gap-3">
            <button
              onClick={onPauseTimer}
              className="flex-1 bg-[var(--color-orkes-peach)] text-white py-3 px-4 rounded-lg hover:bg-[var(--color-orkes-peach-dark)] transition-colors flex items-center justify-center gap-2"
            >
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </button>
            <button
              onClick={onStopTimer}
              className="flex-1 bg-[var(--color-error)] text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <Square className="w-5 h-5" />
              <span>Stop</span>
            </button>
          </div>
        </div>
      )}

      {/* Weekly Summary */}
      <div className="bg-white rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
        <h2 className="text-[var(--color-orkes-navy)] mb-4">This Week</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[var(--color-gray-medium)] text-[13px] mb-1">Hours</div>
            <div className="text-2xl text-[var(--color-orkes-navy)]">24.5h</div>
          </div>
          <div>
            <div className="text-[var(--color-gray-medium)] text-[13px] mb-1">Revenue</div>
            <div className="text-2xl text-[var(--color-orkes-navy)]">$1,225</div>
          </div>
          <div>
            <div className="text-[var(--color-gray-medium)] text-[13px] mb-1">Expenses</div>
            <div className="text-2xl text-[var(--color-orkes-navy)]">$842</div>
          </div>
          <div>
            <div className="text-[var(--color-gray-medium)] text-[13px] mb-1">Invoices</div>
            <div className="text-2xl text-[var(--color-orkes-navy)]">2</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-[var(--color-orkes-navy)] mb-3 px-1">Recent Activity</h2>
        <div className="space-y-3">
          <UniversalCard
            colorDot="#ff8c52"
            title="Bridge Street Renovation"
            subtitle="Mon, Nov 11 • 8:30 AM - 4:30 PM"
            status="unbilled"
            insights={[
              { icon: '⏱️', value: '7h 30m' },
              { icon: '💰', value: '$375.00' },
            ]}
            metadata="🤖 Auto-started via geofence"
          />

          <UniversalCard
            colorDot="#87ffad"
            title="Bunnings Warehouse"
            subtitle="Timber & Hardware"
            status="billable"
            metadata="Mon, Nov 11 • 2:34 PM"
            insights={[
              { icon: '💰', value: '$342.50 (inc. $31.14 GST)' },
              { icon: '📋', value: '4 items → Bridge St Renovation' },
            ]}
          />

          <UniversalCard
            colorDot="#87c4ff"
            title="Invoice #2024-11-001"
            subtitle="Bridge Street Renovation"
            status="sent"
            metadata="Due: Nov 30, 2024"
            insights={[
              { icon: '⏱️', value: '24.5h' },
              { icon: '🧾', value: '$842.50' },
              { icon: '💰', value: 'Total: $2,067.50 (inc. GST)' },
            ]}
          />

          <UniversalCard
            colorDot="#ff8c52"
            title="Kitchen Renovation - Smith"
            subtitle="Tue, Nov 12 • 9:00 AM - 5:00 PM"
            status="unbilled"
            insights={[
              { icon: '⏱️', value: '7h 0m' },
              { icon: '💰', value: '$350.00' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

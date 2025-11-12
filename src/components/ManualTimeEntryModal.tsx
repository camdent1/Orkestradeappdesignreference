import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

interface ManualTimeEntryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function ManualTimeEntryModal({ open, onClose, onSave }: ManualTimeEntryModalProps) {
  const [selectedProject, setSelectedProject] = useState('');
  const [date, setDate] = useState('2024-11-11');
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('16:30');
  const [billable, setBillable] = useState(true);
  const [notes, setNotes] = useState('');

  const calculateDuration = () => {
    if (!startTime || !endTime) return '0h 0m';
    
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    let hours = endHour - startHour;
    let minutes = endMin - startMin;
    
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    
    return `${hours}h ${minutes}m`;
  };

  const handleSave = () => {
    onSave({
      selectedProject,
      date,
      startTime,
      endTime,
      duration: calculateDuration(),
      billable,
      notes,
    });
    onClose();
  };

  const canSave = selectedProject && date && startTime && endTime;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-[var(--color-orkes-navy)]">
            Manual Time Entry
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project */}
          <div>
            <h3 className="text-[var(--color-gray-medium)] text-[11px] uppercase tracking-wide mb-3">
              Project
            </h3>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--color-gray-light)] rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-orkes-peach)] text-[var(--color-orkes-navy)] bg-white"
            >
              <option value="">Select Project</option>
              <option value="1">Bridge Street Renovation</option>
              <option value="2">Kitchen Renovation - Smith</option>
              <option value="3">Deck Build - Johnson</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <h3 className="text-[var(--color-gray-medium)] text-[11px] uppercase tracking-wide mb-3">
              Date
            </h3>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--color-gray-light)] rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-orkes-peach)] text-[var(--color-orkes-navy)]"
            />
          </div>

          {/* Time */}
          <div>
            <h3 className="text-[var(--color-gray-medium)] text-[11px] uppercase tracking-wide mb-3">
              Time
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[var(--color-gray-medium)] text-[13px] mb-2">
                  Start
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-gray-light)] rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-orkes-peach)] text-[var(--color-orkes-navy)]"
                />
              </div>
              <div>
                <label className="block text-[var(--color-gray-medium)] text-[13px] mb-2">
                  End
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-gray-light)] rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-orkes-peach)] text-[var(--color-orkes-navy)]"
                />
              </div>
              <div className="bg-[var(--color-gray-light)] rounded-lg p-3">
                <span className="text-[var(--color-gray-medium)] text-[13px]">Duration: </span>
                <span className="text-[var(--color-orkes-navy)]">{calculateDuration()}</span>
              </div>
            </div>
          </div>

          {/* Billable */}
          <div>
            <h3 className="text-[var(--color-gray-medium)] text-[11px] uppercase tracking-wide mb-3">
              Billable?
            </h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={billable}
                  onChange={() => setBillable(true)}
                  className="w-4 h-4 text-[var(--color-orkes-peach)] focus:ring-[var(--color-orkes-peach)]"
                />
                <span className="text-[var(--color-orkes-navy)] text-[15px]">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!billable}
                  onChange={() => setBillable(false)}
                  className="w-4 h-4 text-[var(--color-orkes-peach)] focus:ring-[var(--color-orkes-peach)]"
                />
                <span className="text-[var(--color-orkes-navy)] text-[15px]">No</span>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-[var(--color-gray-medium)] text-[11px] uppercase tracking-wide mb-3">
              Notes (optional)
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this time entry..."
              rows={3}
              className="w-full px-4 py-3 border border-[var(--color-gray-light)] rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-orkes-peach)] text-[var(--color-orkes-navy)] resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-[var(--color-gray-light)]">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!canSave}
            className="flex-1 bg-[var(--color-orkes-peach)] hover:bg-[var(--color-orkes-peach-dark)] text-white disabled:opacity-40"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

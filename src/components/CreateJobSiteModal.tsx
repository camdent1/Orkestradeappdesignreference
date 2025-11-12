import React, { useState } from 'react';
import { X, Search, MapPin, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

interface CreateJobSiteModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function CreateJobSiteModal({ open, onClose, onSave }: CreateJobSiteModalProps) {
  const [siteName, setSiteName] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [address, setAddress] = useState('');
  const [geofenceRadius, setGeofenceRadius] = useState('150');
  const [hourlyRate, setHourlyRate] = useState('85.00');
  const [showClientModal, setShowClientModal] = useState(false);

  const handleSave = () => {
    onSave({
      siteName,
      selectedClient,
      address,
      geofenceRadius,
      hourlyRate,
    });
    onClose();
  };

  const canSave = siteName && selectedClient && address;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl text-[var(--color-orkes-navy)]">
              New Job Site
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Job Site Details */}
          <div>
            <h3 className="text-[var(--color-gray-medium)] text-[11px] uppercase tracking-wide mb-3">
              Job Site Details
            </h3>
            <div>
              <label className="block text-[var(--color-gray-medium)] text-[13px] mb-2">
                Site Name *
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="e.g. Bridge Street Renovation"
                className="w-full px-4 py-3 border border-[var(--color-gray-light)] rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-orkes-peach)] text-[var(--color-orkes-navy)]"
              />
            </div>
          </div>

          {/* Client */}
          <div>
            <h3 className="text-[var(--color-gray-medium)] text-[11px] uppercase tracking-wide mb-3">
              Client
            </h3>
            <div className="mb-3">
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--color-gray-light)] rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-orkes-peach)] text-[var(--color-orkes-navy)] bg-white"
              >
                <option value="">Select Client</option>
                <option value="1">John Smith (john@smithconstruction.com)</option>
                <option value="2">Sarah Smith (sarah@example.com)</option>
                <option value="3">Mike Johnson (mike@example.com)</option>
              </select>
            </div>
            <button
              onClick={() => setShowClientModal(true)}
              className="flex items-center gap-2 text-[var(--color-orkes-peach)] text-[15px] hover:text-[var(--color-orkes-peach-dark)]"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Client</span>
            </button>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-[var(--color-gray-medium)] text-[11px] uppercase tracking-wide mb-3">
              Location
            </h3>
            <p className="text-[var(--color-gray-medium)] text-[13px] mb-3">
              Address is required for geofencing
            </p>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-medium)]" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Search address..."
                className="w-full pl-10 pr-4 py-3 border border-[var(--color-gray-light)] rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-orkes-peach)] text-[var(--color-orkes-navy)]"
              />
            </div>

            {address && (
              <div className="bg-[var(--color-gray-light)] rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[var(--color-orkes-peach)] mt-1" />
                  <div>
                    <div className="text-[var(--color-orkes-navy)]">{address}</div>
                    <div className="text-[var(--color-gray-medium)] text-[13px]">
                      Lat: -37.123456, Long: 144.123456
                    </div>
                  </div>
                </div>
                <div className="bg-[var(--color-gray-medium)] h-32 rounded-lg flex items-center justify-center text-white text-[13px]">
                  Map Preview
                </div>
              </div>
            )}

            <div className="mt-3">
              <label className="block text-[var(--color-gray-medium)] text-[13px] mb-2">
                Geofence Radius (meters)
              </label>
              <input
                type="number"
                value={geofenceRadius}
                onChange={(e) => setGeofenceRadius(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--color-gray-light)] rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-orkes-peach)] text-[var(--color-orkes-navy)]"
              />
            </div>
          </div>

          {/* Billing */}
          <div>
            <h3 className="text-[var(--color-gray-medium)] text-[11px] uppercase tracking-wide mb-3">
              Billing
            </h3>
            <div>
              <label className="block text-[var(--color-gray-medium)] text-[13px] mb-2">
                Hourly Rate ($)
              </label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                step="0.01"
                className="w-full px-4 py-3 border border-[var(--color-gray-light)] rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-orkes-peach)] text-[var(--color-orkes-navy)]"
              />
            </div>
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

import { User, ChevronRight } from 'lucide-react';
import { Switch } from './ui/switch';
import { Button } from './ui/button';

export function SettingsView() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1>Settings</h1>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="mb-4">Profile</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-orkes-peach flex items-center justify-center text-white text-2xl">
            C
          </div>
          <div>
            <h3>CAM</h3>
            <p className="text-sm opacity-60">Takumi Built</p>
            <p className="text-sm opacity-60">ABN: 57365793408</p>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      </div>

      {/* Business Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="mb-4">Business</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Default Hourly Rate</span>
            <span className="text-sm">$85.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Geofence Radius</span>
            <span className="text-sm">150m</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">GST Registered</span>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Geofence Entry</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Geofence Exit</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Timer Reminders</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Invoice Due Alerts</span>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Data */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="mb-4">Data</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Sync Status</span>
            <span className="text-sm text-green-600">✓ Up to date</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Force Sync
            </Button>
            <Button variant="outline" className="flex-1">
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="mb-4">Display</h2>
        <div className="space-y-4">
          <div>
            <span className="text-sm block mb-2">Theme</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Auto</Button>
              <Button variant="outline" size="sm">Light</Button>
              <Button variant="outline" size="sm">Dark</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Default View</span>
            <span className="text-sm opacity-60">Card Grid</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Week Starts</span>
            <span className="text-sm opacity-60">Monday</span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="mb-4">About</h2>
        <div className="space-y-3">
          <p className="text-sm opacity-60">Version 1.0.0 (Build 42)</p>
          <div className="flex gap-3">
            <button className="text-sm text-orkes-peach">Terms</button>
            <button className="text-sm text-orkes-peach">Privacy</button>
            <button className="text-sm text-orkes-peach">Support</button>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <Button variant="destructive" className="w-full">
        Sign Out
      </Button>
    </div>
  );
}

import React from 'react';
import { User, Calendar, Plus, Camera } from 'lucide-react';

interface NavigationBarProps {
  title: string;
  onProfileClick?: () => void;
  onCalendarClick?: () => void;
  onAddClick?: () => void;
  onCameraClick?: () => void;
  showCalendar?: boolean;
  showAdd?: boolean;
  showCamera?: boolean;
}

export function NavigationBar({
  title,
  onProfileClick,
  onCalendarClick,
  onAddClick,
  onCameraClick,
  showCalendar = true,
  showAdd = true,
  showCamera = false,
}: NavigationBarProps) {
  return (
    <header className="bg-white border-b border-[var(--color-gray-light)] sticky top-0 z-40">
      <div className="flex items-center justify-between h-14 px-4 max-w-screen-lg mx-auto">
        {/* Left: Profile Icon */}
        <button
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full bg-[var(--color-orkes-peach)] flex items-center justify-center text-white hover:bg-[var(--color-orkes-peach-dark)] transition-colors"
        >
          <User className="w-5 h-5" />
        </button>

        {/* Center: Page Title */}
        <h1 className="font-bitcrusher text-[var(--color-orkes-navy)] text-xl">{title}</h1>

        {/* Right: Calendar, Camera, and Plus Icons */}
        <div className="flex items-center gap-2">
          {showCalendar && (
            <button
              onClick={onCalendarClick}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--color-orkes-navy)] hover:bg-[var(--color-gray-light)] transition-colors"
            >
              <Calendar className="w-5 h-5" />
            </button>
          )}
          {showCamera && (
            <button
              onClick={onCameraClick}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--color-orkes-navy)] hover:bg-[var(--color-gray-light)] transition-colors"
            >
              <Camera className="w-5 h-5" />
            </button>
          )}
          {showAdd && (
            <button
              onClick={onAddClick}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--color-orkes-navy)] hover:bg-[var(--color-gray-light)] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
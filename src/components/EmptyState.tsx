import React from 'react';
import { Button } from './ui/button';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-[var(--color-orkes-navy)] mb-2 text-center">{title}</h2>
      <p className="text-[var(--color-gray-medium)] text-center mb-6 max-w-md">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-[var(--color-orkes-peach)] hover:bg-[var(--color-orkes-peach-dark)] text-white"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

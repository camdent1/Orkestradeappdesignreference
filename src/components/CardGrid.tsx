import { UniversalCard } from './UniversalCard';
import { EntityType, TimeEntry, Receipt, Invoice, JobSite, PersonalEvent } from '../types';

interface CardGridProps {
  items: Array<{
    type: EntityType;
    data: TimeEntry | Receipt | Invoice | JobSite | PersonalEvent;
  }>;
  onCardClick?: (item: any) => void;
}

export function CardGrid({ items, onCardClick }: CardGridProps) {
  if (items.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
        <p className="text-lg">No items to display</p>
        <p className="text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {items.map((item, idx) => (
        <UniversalCard
          key={idx}
          type={item.type}
          data={item.data}
          onClick={() => onCardClick?.(item)}
        />
      ))}
    </div>
  );
}

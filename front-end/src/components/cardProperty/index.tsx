import type { CardPropertyProps } from '../../types/cardProperty';
import { MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

const LISTING_TYPE_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  SALE: { label: 'Venda', className: 'bg-violet-700 text-white' },
  RENT: { label: 'Aluguel', className: 'bg-green-700 text-white' },
};

export function Feature({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-sm text-gray-500">
      <Icon className="w-4 h-4" />
      {children}
    </span>
  );
}

export function CardProperty({
  listingType,
  title,
  location,
  price,
  fictures,
  condoFee,
}: CardPropertyProps) {
  const listingStyle = LISTING_TYPE_STYLES[listingType];
  return (
    <article className="shadow-sm rounded w-full p-4 bg-white">
      <div className="flex gap-2 items-center">
        <span
          className={`text-sm px-3 py-1 rounded-full ${listingStyle.className}`}
        >
          {listingStyle.label}
        </span>
        <strong className='text-lg'>{price}</strong>
        <span className="text-gray-600 text-sm"> + R${condoFee} cond.</span>
      </div>
      <h2 className='text-sm'>{title}</h2>
      <p>  <MapPin /> {location}</p>
      <ul className="flex gap-4">
        {fictures.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

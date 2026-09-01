  import type { ReactNode } from 'react';
  
  export interface CardPropertyProps{
    listingType: string;
    title: string;
    location: string;
    price: number;
    condoFee?: number;
    fictures: ReactNode[];
  }

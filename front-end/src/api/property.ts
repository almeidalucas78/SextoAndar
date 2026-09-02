export type PropertyType = 'APARTMENT' | 'HOUSE' | 'STUDIO';
export type PropertyStatus = 'AVAILABLE' | 'RENTED' | 'PAUSED';
export type ListingType = 'RENT' | 'SALE';

export interface Property { // tem a função de definir o tipo de dado que será retornado da API
  id: string
  title: string
  description: string
  type: PropertyType
  street: string
  city: string
  state: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  parkingSpots?: number
  areaM2: number
  status: PropertyStatus
  listingType: ListingType
  rentPrice?: number
  salePrice?: number
  condoFee?: number
  iptu?: number
  photoUrls?: string
}

export interface PropertyFilters{ // tem a função de definir o tipo de dado que será enviado para a API
  city?: string
  type?: PropertyType
  listingType?: ListingType
  minPrice?: number
  maxPrice?: number
}
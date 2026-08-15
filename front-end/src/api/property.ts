export type PropertyType = 'APARTMENT' | 'HOUSE' | 'STUDIO';
export type PropertyStatus = 'AVAILABLE' | 'RENTED' | 'PAUSED';

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
  rentPrice: number
  condoFee: number
  iptu: number
  status: PropertyStatus
  photoUrls?: string
}

export interface PropertyFiters{ // tem a função de definir o tipo de dado que será enviado para a API
  city?: string
  type?: PropertyType
  minPrice?: number
  maxPrice?: number
}
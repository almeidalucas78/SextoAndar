import { api } from './cliente';
import { propertiesMock } from './property.mock';
import type { Property, PropertyFiters } from './property';

export async function getProperties(
  filters: PropertyFiters,
): Promise<Property[]> {
  // --- MOCK (hoje) ---
  const filtered = propertiesMock.filter((property) => {
    if (filters.city && property.city !== filters.city) return false;
    if (filters.type && property.type !== filters.type) return false;
    if (filters.minPrice && property.rentPrice < filters.minPrice) return false;
    if (filters.maxPrice && property.rentPrice > filters.maxPrice) return false;
    return true;
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filtered);
    }, 300); //simula latência de rede
  });

  // --- API REAL (depois, é só trocar pelo bloco acima) ---
  // const { data } = await api.get<Property[]>('/properties', { params: filters });
  // return data;
}

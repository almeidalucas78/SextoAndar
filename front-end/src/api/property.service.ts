// import { api } from './cliente';
import { propertiesMock } from './property.mock';
import type { Property, PropertyFiters, PropertyType } from './property';

//Mapeia os valores do input de tipo de imóvel para os valores do enum PropertyType
const PROPERTY_TYPE_MAP: Record<string, PropertyType> = {
  apartamento: 'APARTMENT',
  casa: 'HOUSE',
  studio: 'STUDIO',
};

//Converte o valor do input de preço para um número, ou undefined caso o valor seja inválido
function parsePriceInput(value: string | null): number | undefined {
  if (!value) return undefined;
  //tira tudo que não for número ou vírgula, e substitui vírgula por ponto
  const numeric = Number(value.replace(/[^\d,]/g, '').replace(',', '.'));
  return Number.isNaN(numeric) ? undefined : numeric;
}

//Função que recebe os parâmetros de busca da URL e retorna um objeto com os filtros
export function parseSearchParams(searchParams: URLSearchParams): PropertyFiters {
  const propertyType = searchParams.get('propertyType');
  
  return{
    city: searchParams.get('city') || undefined,
    type: propertyType ? PROPERTY_TYPE_MAP[propertyType] : undefined,
    maxPrice: parsePriceInput(searchParams.get('maxPrice')),
  }
}

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

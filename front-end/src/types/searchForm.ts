export type SearchMode = 'comprar' | 'alugar';

export interface SearchFormValues { // Interface para os valores do formulário de busca
  mode: SearchMode; // 'comprar' ou 'alugar'
  city: string;
  propertyType: string;
  maxPrice: string;
}

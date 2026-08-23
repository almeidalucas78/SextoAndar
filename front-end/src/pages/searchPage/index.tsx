import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import type { Property } from '../../api/property';
import Container from '../../components/container/index';
import Header from '../../components/header';
import { getProperties, parseSearchParams } from '../../api/property.service';
import {
  PROPERTY_TYPE_LABEL,
  LISTING_TYPE_LABEL,
} from '../../api/property.service';

function SearchPage() {
  const [searchParams] = useSearchParams(); //armazena os parâmetros da URL
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProperties(parseSearchParams(searchParams))
      .then(setProperties)
      .catch(() => setError('Erro ao carregar os imóveis'))
      .finally(() => setLoading(false));
  }, [searchParams]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  console.log(properties);
  return (
    <>
      <Header />
      <Container>
        <div className="">
          <ul className="flex flex-wrap items-center gap-2 mt-4">
            <li className="font-semibold text-gray-800">
              {properties.length} imóveis em {searchParams.get('city')}
            </li>
            {searchParams.get('mode') && (
              <li className="bg-violet-100 text-violet-700 rounded-full px-3 py-1 text-sm">
                {searchParams.get('mode') === 'alugar' ? 'Alugar' : 'Comprar'}
              </li>
            )}
            {searchParams.get('propertyType') && (
              <li className="bg-violet-100 text-violet-700 rounded-full px-3 py-1 text-sm capitalize">
                {searchParams.get('propertyType')}
              </li>
            )}
            {searchParams.get('maxPrice') && (
              <li className="bg-violet-100 text-violet-700 rounded-full px-3 py-1 text-sm">
                até R$ {searchParams.get('maxPrice')}
              </li>
            )}
          </ul>
        </div>
      </Container>
    </>
  );
}

export default SearchPage;

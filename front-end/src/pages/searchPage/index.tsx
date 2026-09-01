import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import type { Property } from '../../api/property';
import Container from '../../components/container/index';
import Header from '../../components/header';
import { getProperties, parseSearchParams } from '../../api/property.service';
import { CardProperty, Feature } from '../../components/cardProperty';
import { Bath, BedDouble, Car, RulerDimensionLine } from 'lucide-react';

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
        <div className="flex w-full gap-4 mt-10">
          <div className="w-1/5">Filtro</div>
          <div className="grid grid-cols-2 gap-6">
            {properties.map((item) => (
              <CardProperty
                key={item.title}
                condoFee={item.condoFee}
                listingType={item.listingType}
                price={item.rentPrice ?? item.salePrice ?? 0}
                title={item.title}
                location={item.city}
                fictures={[
                  <Feature icon={BedDouble}>{item.bedrooms} Quartos</Feature>,
                  <Feature icon={Bath}>{item.bathrooms} Banheiros</Feature>,
                  <Feature icon={Car}>{item.parkingSpots} Vagas</Feature>,
                  <Feature icon={RulerDimensionLine}>{item.areaM2}m²</Feature>,
                ]}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export default SearchPage;

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getProperties } from '../../api/property.service';
import type { Property } from '../../api/property';
import Container from '../../components/container/index';

function SearchPage() {
  const [searchParams] = useSearchParams(); //armazena os parâmetros da URL
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProperties({ city: searchParams.get('city') ?? undefined })
      .then(setProperties)
      .catch(() => setError('Erro ao carregar os imóveis'))
      .finally(() => setLoading(false));
  }, [searchParams]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div>{properties[0]?.title}</div>
      <Container>
        <h1>Teste</h1>
      </Container>
    </>
  );
}

export default SearchPage;

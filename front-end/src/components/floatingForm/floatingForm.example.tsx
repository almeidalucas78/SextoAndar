// Arquivo de EXEMPLO/ESTUDO — não é importado em nenhum lugar do app.
// Mostra como o FloatingForm poderia ficar reduzindo a duplicação entre
// as abas "comprar" e "alugar" e já enviando os dados pra outra página.
// Serve de base pra você adaptar dentro do index.tsx real.

import { useNavigate } from 'react-router';
import { useState } from 'react';
import type { SearchFormValues, SearchMode } from '../../types/searchForm';
import './floatingForm.css';

// ---------------------------------------------------------------------------
// 1) TIPOS E CONSTANTES
// Tudo que é "dado fixo" (não muda em runtime) fica fora do componente.
// Assim não é recriado a cada render, e fica fácil de achar/editar.
// ---------------------------------------------------------------------------

type TabOption = SearchMode | 'lancamentos';

interface TabItem {
  id: TabOption;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'comprar', label: 'Comprar' },
  { id: 'alugar', label: 'Alugar' },
  { id: 'lancamentos', label: 'Lançamentos' },
];

// Opções do <select> de tipo de imóvel: existiam duplicadas (comprar/alugar).
// Centralizando aqui, se precisar adicionar um tipo novo, muda só neste lugar.
const PROPERTY_TYPE_OPTIONS = [
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'casa', label: 'Casa' },
  { value: 'cobertura', label: 'Cobertura' },
  { value: 'studio', label: 'Studio' },
];

// "comprar" e "alugar" têm os MESMOS campos (cidade, tipo, preço máximo),
// só o texto do label/placeholder muda. Em vez de duplicar o JSX inteiro,
// guardamos só o que varia, indexado pela aba.
interface TabText {
  cityLabel: string;
  cityPlaceholder: string;
  priceLabel: string;
  pricePlaceholder: string;
}

const TAB_TEXT: Record<SearchMode, TabText> = {
  comprar: {
    cityLabel: 'Cidade ou Bairro',
    cityPlaceholder: 'Ex: São Paulo, SP',
    priceLabel: 'Imóvel até',
    pricePlaceholder: 'Ex: R$ 500.000,00',
  },
  alugar: {
    cityLabel: 'Bairro ou Cidade para alugar',
    cityPlaceholder: 'Ex: São Paulo, SP',
    priceLabel: 'Aluguel até',
    pricePlaceholder: 'Ex: R$ 500.000,00',
  },
};

// ---------------------------------------------------------------------------
// 2) SUBCOMPONENTE DOS CAMPOS
// Os 3 campos (city, propertyType, maxPrice) só existiam uma vez no JSX
// de cada aba. Virando um componente próprio, ele é escrito uma vez e
// reaproveitado nas duas abas — só trocam os textos (via props) e o
// estado/handler (que continuam vivendo no componente pai).
// ---------------------------------------------------------------------------

interface SearchFieldsProps extends TabText {
  values: Omit<SearchFormValues, 'mode'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function SearchFields({
  cityLabel,
  cityPlaceholder,
  priceLabel,
  pricePlaceholder,
  values,
  onChange,
}: SearchFieldsProps) {
  return (
    <>
      <div className="tab-2-list-item">
        <label htmlFor="city">{cityLabel}</label>
        <input
          id="city"
          name="city" // o "name" precisa bater com a chave do objeto de estado (formValues.city)
          type="text"
          placeholder={cityPlaceholder}
          value={values.city}
          onChange={onChange}
        />
      </div>

      <div className="tab-2-list-item">
        <label htmlFor="propertyType">Tipo de Imóvel</label>
        <select
          id="propertyType"
          name="propertyType"
          value={values.propertyType}
          onChange={onChange}
        >
          <option value="">Selecione</option>
          {PROPERTY_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="tab-2-list-item">
        <label htmlFor="maxPrice">{priceLabel}</label>
        <input
          id="maxPrice"
          name="maxPrice"
          type="text"
          placeholder={pricePlaceholder}
          value={values.maxPrice}
          onChange={onChange}
        />
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// 3) COMPONENTE PRINCIPAL
// ---------------------------------------------------------------------------

function FloatingFormExample() {
  const navigate = useNavigate(); // hook do react-router pra navegar via código (sem <Link>)

  // Estado da aba ativa. Continua igual ao original.
  const [activeTab, setActiveTab] = useState<TabOption>('comprar');

  // Estado dos campos do formulário. Fica DENTRO do componente (hooks só
  // podem ser chamados no corpo de um componente/hook — nunca no
  // nível do módulo, isso quebra o React).
  // Usamos Omit<SearchFormValues, 'mode'> porque o "mode" já é controlado
  // pelo activeTab; não faz sentido guardar essa informação duas vezes.
  const [formValues, setFormValues] = useState<Omit<SearchFormValues, 'mode'>>({
    city: '',
    propertyType: '',
    maxPrice: '',
  });

  // Um único handler genérico serve pra QUALQUER input/select do formulário,
  // porque ele lê o "name" do elemento que disparou o evento e atualiza
  // só essa chave no objeto de estado.
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  // Dispara ao clicar em "Buscar". Junta o estado dos campos com a aba
  // ativa (que vira o "mode") e navega pra /search levando tudo como
  // query params — é assim que o dado "viaja" pra outra página.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: SearchFormValues = {
      ...formValues,
      mode: activeTab as SearchMode, // seguro aqui: este form só existe pras abas comprar/alugar
    };

    const params = new URLSearchParams(data);
    navigate(`/search?${params.toString()}`);
  }

  return (
    <div className="tab-list-container mt-10 p-5 border border-gray-100 rounded-lg shadow-md bg-white">
      {/* Navegação das abas — não muda em relação ao original */}
      <ul className="tab-list flex gap-5 font-bold text-gray-500 border-b border-gray-300 mb-4">
        {TABS.map((tab) => (
          <li
            key={tab.id}
            className={`hover:text-violet-500 cursor-pointer ${
              activeTab === tab.id ? 'active border-b-2 pb-1 border-violet-500' : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      {/*
        Antes: dois blocos JSX quase idênticos (~25 linhas cada) para
        "comprar" e "alugar", cada um com sua própria estrutura de <form>
        (e "alugar" nem tinha botão de submit).

        Agora: UM bloco só, com UM <form> consistente pras duas abas.
        TAB_TEXT[activeTab] escolhe os textos certos; SearchFields e o
        botão são compartilhados.
      */}
      {(activeTab === 'comprar' || activeTab === 'alugar') && (
        <form
          onSubmit={handleSubmit}
          className="tab-2-list-content grid grid-cols-4 gap-4"
        >
          <SearchFields
            {...TAB_TEXT[activeTab]}
            values={formValues}
            onChange={handleChange}
          />
          <div className="tab-2-list-item">
            <button
              type="submit"
              className="bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-600"
            >
              Buscar
            </button>
          </div>
        </form>
      )}

      {/* Aba "lançamentos" não tem formulário, então fica fora da lógica acima */}
      {activeTab === 'lancamentos' && (
        <div className="tab-2-list-content">
          <p>Conteudo lançamentos</p>
        </div>
      )}
    </div>
  );
}

export default FloatingFormExample;

import './floatingForm.css';
import { useState } from 'react';

//Defini os tipos possiveis de abas que o componente pode ter, para evitar erros de digitação e facilitar a manutenção do código.
type TabOption = 'comprar' | 'alugar' | 'lancamentos';

interface TabItem{
  id: TabOption;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'comprar', label: 'Comprar' },
  { id: 'alugar', label: 'Alugar' },
  { id: 'lancamentos', label: 'Lançamentos' },
];

function FloatingForm() {
  //Estado para guardar a aba anual, iniciando em 'comprar'
  const [activeTab, setActiveTab] = useState<TabOption>('comprar'); // Conteudo dentro de "<>" se chama Generic no TS

  return (
    <div className="tab-list-container mt-5">
      <ul className="tab-list flex gap-5 font-bold  text-gray-500 border-b border-gray-300 mb-4">
        {
          TABS.map((tab) => (
            <li
              key={tab.id}
              className={` hover:text-violet-500 cursor-pointer  ${activeTab === tab.id ? 'active border-b-2 pb-1 border-violet-500' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))
        }
      </ul>

      {activeTab === 'comprar' && (
        <div className="tab-2-list-content grid grid-cols-3 gap-4">
          <div className="tab-2-list-item">
            <label>Cidade ou Bairro</label>
            <input type="text" placeholder="Ex: São Paulo, SP" />
          </div>
        </div>
      )}
      {activeTab === 'alugar' && (
        <div className="tab-2-list-content">
          <p>Conteudo alugar</p>
        </div>
      )}
      {activeTab === 'lancamentos' && (
        <div className="tab-2-list-content">
          <p>Conteudo lançamentos</p>
        </div>
      )}
    </div>
  );
}
export default FloatingForm;

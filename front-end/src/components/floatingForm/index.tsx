import './floatingForm.css';
import { useState } from 'react';

//Defini os tipos possiveis de abas que o componente pode ter, para evitar erros de digitação e facilitar a manutenção do código.
type tabOptions = 'comprar' | 'alugar' | 'lancamentos';

function FloatingForm() {
  //Estado para guardar a aba anual, iniciando em 'comprar'
  const [activeTab, setActiveTab] = useState<tabOptions>('comprar');

  return (
    <div className="tab-list-container">
      <ul>
        <li
          className={activeTab === 'comprar' ? 'active' : ''}
          onClick={() => setActiveTab('comprar')}
        >
          Comprar
        </li>
        <li
          className={activeTab === 'alugar' ? 'active' : ''}
          onClick={() => setActiveTab('alugar')}
        >
          Alugar
        </li>
        <li
          className={activeTab === 'lancamentos' ? 'active' : ''}
          onClick={() => setActiveTab('lancamentos')}
        >
          Lançamentos
        </li>
      </ul>

      {activeTab === 'comprar' && (
        <div className="tab-2-list-content">
          <p>Conteudo comprar</p>
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

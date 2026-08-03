import {react} from 'react';

function Header() {
  return (
    <header className="border-b border-gray-200">
      <nav className="flex max-w-7xl items-center justify-between p-6 lg:px-8 mx-auto ">
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5">
            <span>SextoAndar</span>
          </a>
        </div>
        <div className="lg:flex lg:gap-x-12">
          <a href="/">Comprar</a>
          <a href="/about">Alugar</a>
          <a href="/contact">Lançamentos</a>
        </div>
        <div className="lg:flex lg:gap-x-12 justify-end items-center">
          <a href="/login">Login</a>
          <a href="/cadastro" className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
            Cadastro
          </a>
        </div>
      </nav>
    </header>
  );
}
export default Header;

import bannerHomeHouse from '../../assets/banner-home-house.png';
import FloatingForm from '../floatingForm';

function Banner() {
  return (
    <div className="container mx-auto px-4 grid grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold">
          Bem vindo ao <br />
          <strong className="text-violet-500">SextoAndar</strong>
        </h1>
        <p className="text-lg text-gray-600 mt-4 w-2/3 mb-10">
          Explore nossa seleção exclusiva de propriedades requintadas,
          meticulosamente projetadas para atender à sua visão única da casa dos
          sonhos.
        </p>
        <a
          href="/search"
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mt-4 display: inline-block"
        >
          Buscar Imóveis
        </a>
        <a href="/como-funciona" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mt-4 ml-4 display: inline-block">
          Como Funciona
        </a>
        <FloatingForm />
      </div>
      <div className="text-left">
        <img src={bannerHomeHouse} alt="Banner" className="w-full h-auto" />
    </div>
    </div>
  );
}
export default Banner;

import Banner from '../../components/banner';
import Header from '../../components/header/index';
import { useAppContext } from '../../context/context';

function Home() {
  const { testValue, setTestValue } = useAppContext();

  return (
    <>
      <div className=" min-h-screen">
        <Header />
        <Banner />
        <button onClick={() => setTestValue((prev) => prev + 1)}>
          Valor do contexto: {testValue}
        </button>
      </div>
    </>
  );
}
export default Home;

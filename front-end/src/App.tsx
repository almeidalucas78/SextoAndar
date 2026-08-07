import { Route, Routes } from 'react-router'
import Home from './pages/home'
import './App.css'
import SearchPage from './pages/searchPage'

function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resultados" element={<SearchPage />} />
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/*" element={<h1>Not Found</h1>} />
     </Routes>
    </>
  )
}

export default App

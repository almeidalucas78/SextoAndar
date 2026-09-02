import { Route, Routes } from 'react-router'
import Home from './pages/home'
import './App.css'
import SearchPage from './pages/searchPage'
import AppProvider from './context/provider'

function App() {

  return (
    <AppProvider>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/*" element={<h1>Not Found</h1>} />
     </Routes>
    </AppProvider>
  )
}

export default App

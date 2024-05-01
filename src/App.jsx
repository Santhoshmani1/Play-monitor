import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AppResults from './pages/AppResults'
import Analyser from './pages/Analyser'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}  id='home'/>
      <Route path='/apps/:appName' element={<AppResults />} id='searchResults' />
      <Route path='/analyse' element={<Analyser />} id='Analyser' />
    </Routes>
    </>
  )
}

export default App

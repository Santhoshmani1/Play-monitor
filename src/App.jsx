import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AppResults from './pages/AppResults'


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}  id='home'/>
      <Route path='/apps/:appName' element={<AppResults />} id='searchResults' />
    </Routes>
    </>
  )
}

export default App

import './css/App.css'
import {Routes, Route} from "react-router"
import Home from "./pages/home"
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Dashboard from './pages/Dashboard'
import PesertaDidik from './pages/PesertaDidik'
import GuruKelas from './pages/GuruKelas'

function App() {
  return (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/menu' element={<Menu/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/peserta-didik' element={<PesertaDidik/>}></Route>
          <Route path='/guru-kelas' element={<GuruKelas/>}></Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
  )
}


export default App

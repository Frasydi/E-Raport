import './css/App.css'
import {Routes, Route} from "react-router"
import Home from "./pages/home"
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Menu from './pages/Menu'

function App() {
  return (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/Menu' element={<Menu/>}></Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
  )
}


export default App

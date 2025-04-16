import './App.css'
import {Routes, Route} from "react-router"
import Home from "./pages/home"
import NotFound from './pages/NotFound'
import Login from './pages/Login'

function App() {
  return (
      <div> 
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
  )
}


export default App

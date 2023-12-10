import './App.css'
import {Route, Routes} from "react-router-dom"
import Login from './components/auth/Login.jsx'
import Home from './components/Home.jsx'
import SignUp from './components/auth/SignUp.jsx'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    )
}

export default App

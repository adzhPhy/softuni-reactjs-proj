import './App.css'
import {Route, Routes} from "react-router-dom"
import Login from './components/auth/Login.jsx'
import Home from './components/Home.jsx'
import SignUp from './components/auth/SignUp.jsx'
import AuthRoute from './components/auth/AuthRoute.jsx'

function App() {
  return (
    <div className="w-full p-2 bg-whitesmoke border border-slate-100 ">
      <Routes>
        <Route element={<AuthRoute/>}>
        </Route>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
    )
}

export default App

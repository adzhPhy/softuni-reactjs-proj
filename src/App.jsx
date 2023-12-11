import './App.css'
import {Route, Routes} from "react-router-dom"
import Login from './components/auth/Login.jsx'
import Home from './components/Home.jsx'
import SignUp from './components/auth/SignUp.jsx'
import AuthRoute from './components/auth/AuthRoute.jsx'

function App() {
  return (
    <div className='flex justify-center'>
      <Routes>
        <Route element={<AuthRoute/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
    )
}

export default App

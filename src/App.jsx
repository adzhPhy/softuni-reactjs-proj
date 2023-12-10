import './App.css'
import supabase from './client.js'
import Login from './components/auth/Login.jsx'

function App() {
  const {session} = supabase.auth.getSession()
  console.log(session)
  if (session!=undefined) {
    return <div>Hello</div>
  } else {
    return <Login/>
  }
}

export default App

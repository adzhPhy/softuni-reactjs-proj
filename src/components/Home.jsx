import {useAuth} from '../context/AuthProvider'
import Navbar from './Navbar'
import Hero from './Hero'
import Footer from './Footer'

function Home() {
  const {user} = useAuth();
  return (
  <>
    <Navbar/>
    <div className='w-full shadow'>
      <Hero/>
    </div> 
    <Footer/>  
  </>
  )}

export default Home
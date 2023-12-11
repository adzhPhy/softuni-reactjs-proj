import {useAuth} from '../context/AuthProvider'
import Navbar from './Navbar'
import Hero from './Hero'
import Footer from './Footer'

function Home() {
  const {user} = useAuth();
  return (
  <>
    <div className='w-full flex-col justify-center'>
      <Navbar/>
      <Hero/>
      <Footer/>  
    </div> 
  </>
  )}

export default Home
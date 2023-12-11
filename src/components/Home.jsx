import Navbar from './Navbar'
import Footer from './Footer'
import Taskbar from './Taskbar';
import PostList from './PostList';

function Home() {
  
  return (
  <div className="main">
    <Navbar/>
    <div className='container shadow bg-white text-gray-900'>
        <PostList/>
    </div> 
    <Footer/>  
  </div>
  )}

export default Home
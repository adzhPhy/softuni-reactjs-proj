import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Navbar = () => {
  const {auth, signOut} = useAuth();
  const handleSignout = async (event) => {
    event.preventDefault();
    const {error} = await signOut();
  };
  return (
    <>
    <nav className="bg-gray-50 text-black">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
            <div className="flex gap-2 border border-slate-100 justify-evenly items-center">
                <ul className="flex flex-row justify-between font-medium mt-0 text-sm">
                    <li>
                        <Link to="/" className="text-gray-900 hover:underline" aria-current="page">Home</Link>
                    </li>
                    {auth && (<div className='flex gap-2 justify-evenly items-center'>
                      <li>
                      <Link href="#" className="text-sm text-gray-900 hover:underline">My Profile</Link>
                    </li><li>
                      <Link href="#" onClick={handleSignout} className="text-sm text-gray-900 hover:underline">Sign Out</Link>
                    </li>
                    </div>)
                    }
                    {
                      !auth &&
                      (<li>
                      <Link to="/login" className="text-sm text-gray-900 hover:underline">Login</Link>
                      </li>)
                      }
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar
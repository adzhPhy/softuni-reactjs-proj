import {useAuth} from '../context/AuthProvider'

function Home() {
  const {user} = useAuth();
  if (!user) {
    return <div>Welcome!</div>
  } else {
    return (
    <div>
    Welcome, {user.email}!
  </div>
    )
  }
}

export default Home
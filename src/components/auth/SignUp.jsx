import { useState } from "react";
import supabase from "../../client"
import { Link, Navigate } from "react-router-dom";


function SignUp() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confpass, setConfpass] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pass!=confpass) {
      alert("Password must match!")
    } else {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: pass,
      });
      if (error) {
        alert(error.error_description || error.message)
      } else {
        return <Navigate to='/' />
      }
    }
  };
  
  return (
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="main text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Create your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" name="email" id="email" onChange={(e) => {setEmail(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" onChange={(e) => {setPass(e.target.value)}} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" name="confirm-password" onChange={(e) => {setConfpass(e.target.value)}} id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-light text-gray-500 ">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                  <p className="text-sm font-light text-gray-500">
                      Already have an account? <Link to='/login' className="font-medium text-stone-900 hover:underline">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  )
}

export default SignUp
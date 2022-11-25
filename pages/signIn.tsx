import { initFirebase } from "../firebase/firebase";
import { getAuth} from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { login } from '../firebase/firebase';
import { useRef, useState } from "react";
import Navbar from '../components/Navbar'
import {googleSignIn, fbSignIn} from '../firebase/firebase'
const Login = () => {
  const app = initFirebase()
  const auth = getAuth();
  const [user,loading] = useAuthState(auth);
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const router = useRouter()
  const [load, setLoad] = useState(false)
  
  if(loading){
    return<div>LOADING...</div>
  }
  if(user){
    router.push('/taskReminder')
    console.log(user.displayName);
    return <div>WELCOME {user.email}</div>
  }
  const handleLogin = async() =>{
    setLoad(true)
    try{
      await login(emailRef.current.value, passwordRef.current.value)
      router.push('/taskReminder')
    }
    catch(err){
      alert(err)
    }
    setLoad(false)
  }

  return (
    <div className='bg-slate-800'>
      <div className="z-10 relative">
        <Navbar />
      </div>
      <div className="z-0 flex flex-col items-center max-w-full mt-5 shrink">
        <div className="drop-shadow-2xl rounded-xl bg-white flex flex-col border w-80 pb-14 md:w-80 lg:w-[450px]" >
          <form className="flex flex-col">
            <div className="relative top-7 ml-4 lg:ml-10">
              <h1 className="text-black">Sign In</h1>
              <p>Click here to <a className='text-orange-500' type="button"onClick={() => router.push('/signUp')}>Sign Up!</a></p>
            </div>
            <div className="flex items-center flex-col">
              <input ref={emailRef} type="text" className="bg-transparent text-black outline outline-transparent border-2 border-transparent border-b-orange-600 mt-4 h-8 w-11/12 lg:w-10/12" placeholder="Email"></input>
              <input ref={passwordRef} type="password" className="text-black mt-3 h-8 bg-transparent outline outline-transparent border-2 border-transparent border-b-orange-600 w-11/12 lg:w-10/12" placeholder="Password"></input>
              <button type='button' onClick={handleLogin} disabled={load} className="hover:bg-orange-500 w-11/12 mt-3 bg-orange-600 h-10 text-white lg:w-10/12">Sign In</button>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-black mt-4 text-2xl">Or sign in with</p>
              <button type='button' className="mt-3 bg-blue-600 rounded-md p-2 w-5/6" onClick={googleSignIn}>
                <div className="text-white"><FontAwesomeIcon icon={faGoogle as IconProp} className="pr-2"/>GOOGLE</div>
              </button>
              <button disabled={true} type='button' className="mt-3 bg-blue-300 rounded-md p-2 w-5/6" onClick={fbSignIn}>
                <div className="text-white"><FontAwesomeIcon icon={faFacebook as IconProp} className="pr-2"/> FACEBOOK</div>
              </button>    
            </div>     
          </form>
        </div>
      </div>  
    </div>
  )
}
export default Login

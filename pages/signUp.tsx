import { getAuth} from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from 'react'
import { signUp} from '../firebase/firebase';
import { useRef } from 'react'
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, } from '@fortawesome/free-solid-svg-icons'
const  SignUp = () => {
  const emailRef = useRef(null)
  const rePasswordRef = useRef(null)
  const passwordRef = useRef(null)
  const [loadings ,setLoading] = useState(false)
  const router = useRouter()
  const auth = getAuth()
  const [errorMessage, seterrorMessage] = useState('')
  const [hide, setHide] = useState(false)

  const handleSignUp = async() =>{
    setLoading(true)
    if(rePasswordRef.current.value === passwordRef.current.value && emailRef.current.value){
      try{
        await signUp(emailRef.current.value, passwordRef.current.value)
        seterrorMessage("Register Success!")
        setHide(true)
      }
      catch(err){
        seterrorMessage(`${err}`)
      }
      
    }
    else if(rePasswordRef.current.value !== passwordRef.current.value){
      seterrorMessage("Password is not the same")
      setHide(false)
      passwordRef.current.value = '';
      rePasswordRef.current.value = '';
    }
    else if(emailRef.current.value === ''){
      seterrorMessage("Email is empty")
      setHide(false)
    }
    setLoading(false)
  }

  return ( 
    <div className='bg-slate-800'>
      <div className="z-20 relative">
        <Navbar />
      </div>
      <div className='z-10 py-5 mt-10 flex justify-center max-w-full'>
        {
          hide ? 
          <div className='absolute top-[180px] h-72 w-11/12 rounded-xl z-20 bg-black flex flex-col items-center gap-5 opacity-[0.9] md:w-[500px] lg:w-6/12 lg:top-[200px]'>
            <h1 className='text-green-600 text-[30px] pt-20 md:text-[50px]'>{errorMessage}</h1>
            <a type='button'onClick={() => router.push('/signIn')} className='text-orange-600 text-[20px]'>CONTINUE</a>
          </div>
          : null
        }
        <form className="z-10 rounded-xl bg-white grid gap-2 h-96 py-5 flex flex-col border items-center w-72 md:w-80 lg:w-3/12">
          <h1 className='text-black pl-4'>Sign Up!</h1>
          <label className='text-red-500 pl-4'>{errorMessage === '' ? null : <FontAwesomeIcon icon={faXmark} className='pr-2'/>}{errorMessage}</label>
          <div className='pl-4 relative flex flex-col gap-4'>
            <input ref={emailRef} className='text-black outline outline-transparent bg-transparent border-2 border-transparent border-b-orange-500 w-4/5' type='text' placeholder='Email'></input>
            <input ref={passwordRef} className="text-black outline outline-transparent bg-transparent border-2 border-transparent border-b-orange-500 w-4/5"placeholder="Password" type="Password"></input>  
            <input ref={rePasswordRef} className="text-black outline outline-transparent bg-transparent border-2 border-transparent border-b-orange-500 w-4/5"placeholder="Confirm Password" type="Password"></input>
          </div>
          <div className='pl-4 mt-4'>
            <button disabled={loadings} type='button' onClick={handleSignUp}className="text-white h-10 border w-9/12 bg-orange-600">REGISTER</button>
          </div>  
        </form>
      </div>
    </div>
   );
}
 
export default SignUp ;
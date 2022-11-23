import CreateList from "../components/AddList"
import {NextPage} from 'next'
import { getAuth } from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useRouter } from "next/router";
import { initFirebase } from "../firebase/firebase";
import Navbar from "../components/Navbar";
import FetchList from "../components/FetchList";
const Home: NextPage = () => {
  const app = initFirebase()
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  if(loading){
    return <div>LOADING....</div>
  }
  if(!user){
    router.push('/signIn')
    return<div>Please sign in to continue...</div>
  }
  return (
    <div className="bg-slate-800 h-150">
      <nav className="mt-3 flex justify-between pr-4 pl-2 py-2 ">
        <p className="border-2 border-transparent border-b-orange-600 text-white text-[15px] relative top-2">USER: {user.email}</p>
        <button onClick={() => auth.signOut()} className="text-white w-24 h-8 relative border-2 border-transparent border-b-orange-600 top-1"> SIGN OUT</button>
      </nav>
      <div className="flex flex-col justify-center">
        <CreateList />
      </div>
      <div className="flex flex-col justify-center">
        <FetchList />
      </div>
    </div>
  );   
}; <Navbar />
export default Home;
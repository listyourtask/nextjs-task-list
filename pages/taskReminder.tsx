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
    <div className="flex flex-col justify-center bg-slate-800 h-150">
      <div>
        <button onClick={() => auth.signOut()} className="bg-red-600 border"> SIGN OUT</button>
      </div>
      <div>
        <CreateList />
      </div>
      <div>
        <FetchList />
      </div>
    </div>
  );   
}; <Navbar />
export default Home;
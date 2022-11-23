import { Router } from "react-router-dom";
import Navbar from "../components/Navbar"
import { useRouter } from 'next/router';
import Head from 'next/head'      
const Home = () => {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>TASK LIST</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
     <Navbar />
      <div>
        <div className="bg-slate-800 flex flex-col items-center pt-40 pb-20">
          <h1 className="flex justify-center text-white text-[70px] drop-shadow-xl">TASK LIST</h1>
          {/* <h1 className="text-white text-[100px] drop-shadow-xl">LIST</h1> */}
          <p className="text-white text-[20px] drop-shadow-xl">List everything that you have to do!</p>
          <div className="w-80 flex justify-center h-12 mt-5">
            <button onClick={()=> router.push('/signIn')}className="bg-orange-600 hover:bg-orange-500 text-white w-4/6 rounded-xl">SIGN IN</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

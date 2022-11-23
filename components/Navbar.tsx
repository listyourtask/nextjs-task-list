import {useState} from 'react'
import { useRouter } from 'next/router';
export default function Navbar(){
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();


  return(
    <nav className="flex h-12 items-center justify-between bg-orange-600 drop-shadow-xl">
      <button className="ml-5 md:hidden" onClick={() => setIsOpen(!isOpen)}data-bs-target='#dropdownMenu'>
        <label className="cursor-pointer">
          <svg className="fill-current text-slate-600" width="25" height="25" viewBox="0 0 20 20">
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
      </button>
      
      <div className={`${isOpen ? "flex w-52 opacity-90 absolute top-12 pb-4 bg-slate-700 rounded-b-lg drop-shadow-xl z-10":"hidden"} md:rounded-none md:relative md:bottom-2 md:ml-5 md:flex justify-center md:w-64`}>
        <ul className="text-l relative grid gap-4 flex items pr-7 center flex-col md:h-5 md:flex flex-row md:justify-center md:justify-evenly md:w-full">
          <li className="inline-block mt-3 relative w-48 h-full flex justify-center pb-1 border-2 border-transparent border-b-slate-500 hover:text-[20px] hover:text-blue-500 no-underline text-white md:border-none"><a type="button" onClick={() => {router.push('/')}}>HOME</a></li>
          <li className="inline-block w-48 flex justify-center h-full mt-3 hover:drop-shadow-2xl hover:text-[20px] no-underline text-white md:border-none md:mt-5"><a type="button">ABOUT</a></li>
        </ul>
      </div>
    </nav>
  )
}
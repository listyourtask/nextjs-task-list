import ReactDOM from 'react-dom'
import "firebase/firestore";
import {doc,setDoc} from "firebase/firestore";
import {db} from '../firebase/firebase'
import { useState } from 'react'
import { getAuth } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';


export default function CreateList(){
  const auth = getAuth()
  const[user,loading] = useAuthState(auth)
  const [inputItem, setinputItem] = useState('');
  const [inputTime, setinputTime] = useState('');
  const [inputDate, setinputDate] = useState('');
  const [toDoList, setToDoList] = useState([]); 


  const id = Date.now()

  const saveData = () =>{
    const docRef = doc(db,`${user.displayName || user.email}/${id}`)
    setDoc(docRef, {  
      toDo: inputItem,
      time: inputTime,
      date: inputDate
    })
    setinputItem('');
    setinputTime('');
    setinputDate('');
  }
 
  return(
    <div>
      <div className='flex flex-col items-center'>
        <h1 className='mt-5 text-xl font-bold text-white text-[50px]'>TASK LIST</h1>
        <form className='flex flex-col w-72 pt-10 pb-10 grid gap-2'>
          <input type='text' placeholder="Input Task"  value={inputItem} onChange={(e) => setinputItem(e.target.value)} className='border border-black'/>
          <input type='Time' value={inputTime} onChange={(e) => setinputTime(e.target.value)} className='border border-black'/>
          <input type='Date' value={inputDate} onChange={(e) => setinputDate(e.target.value)} className='border border-black'/>
          <button className='drop-shadow-md rounded-xl pt-2 pb-2 mt-4 bg-orange-600 text-white text-[20px]' type="button" onClick={saveData}>ADD</button>
        </form>
      </div>
    </div>
  )
}
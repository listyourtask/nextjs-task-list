import "firebase/firestore";
import {collection,getDocs,doc,deleteDoc} from "firebase/firestore";
import { useState, useEffect } from "react";
import {db} from '../firebase/firebase'
import { getAuth } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const FetchList = () => {
  const auth = getAuth()
  const [data, setData] = useState([])
  const [user, loading] = useAuthState(auth)


  const handleAdd = async() =>{
    try{
      const colRef = collection(db, user.displayName || user.email)
      const snapshots = await getDocs(colRef)
      const docs = snapshots.docs.map(docs => {
      const data = docs.data();
        data.id = docs.id
        return data
      })
      setData(docs);
    }
    catch(err){
      alert(err)
    }
  }
  useEffect(() => {  
    handleAdd()
  })

 const deleteData = async (data) =>{
  await deleteDoc(doc(db, user.displayName || user.email, data.id));
 }
  return (  
    <div className="flex justify-center">
      <div className='w-5/6 flex flex-col items-center pb-10 md:grid grid-cols-2 md:pl-10 lg:grid-cols-3'>
        {
          data.map(data => { 
             return( 
                <div key={data.id} className='mt-5 w-4/5 grid gap-2 bg-white flex flex-col drop-shadow-2xl border rounded-xl md:w-[350px]'>
                  <div className='flex flex-row pt-4'>
                    <dl className='flex flex-col pl-5 gap-2'>
                      <div className="flex flex-row gap-3 items-center">
                        <h2 className="text-lg text-black">ACTIVITY:</h2>
                        <p className="relative text-sm text-black">{data.toDo === '' ? '?' : data.toDo.toUpperCase()}</p>
                      </div> 
                      <div className="flex flex-row gap-3">
                        <h2 className="text-lg text-black">DATE:</h2><p className={`${data.date === '' ? "text-red-600": "text-black"} pl-8`}>{data.date === '' ? 'null' : data.date.toUpperCase()}</p>
                      </div> 
                      <div className="flex flex-row gap-3">
                        <h2 className="text-lg text-black">TIME:</h2><p className={`${data.date === '' ? "text-red-600": "text-slate-500"} pl-8`}>{data.time === '' ? 'null' : data.time.toUpperCase()}</p>
                      </div> 
                    </dl>
                  </div>
                  <div className='flex justify-center h-10 text-xl font-bold rounded-b-xl bg-orange-600 w-12/12 hover:bg-orange-500'>
                    <button className="w-5/6" key={data.id} onClick={() => deleteData(data)}><FontAwesomeIcon icon={faTrash} color="black" className="pr-2 text-[25px]"/></button>
                  </div>
                </div>
              )
          })
        }
      </div>
    </div>
  );
}
 
export default FetchList;
'use client'
import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { set } from 'mongoose'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
export default function DeleteButton({id}:{id:string}) {

    const [showDeleteQuestion,setshowDeleteQuestion]=useState(false);
  const router = useRouter();

    function handleDelete(){
        fetch(`/api/ads?id=${id}`,{
            method:'DELETE',
        }).then(()=>{
        setshowDeleteQuestion(false);
        router.push('/');
        });
    }
 if(showDeleteQuestion){
 return(
<div className='bg-black/90 fixed inset-0 z-50 flex items-center justify-center '>
    <div className='items-center justify-center bg-white p-4 rounded-lg '>
        <h2 className='text-center font-bold text-[23px] text-red-950'>Are you Sure??</h2>
        <br/>
        <h2 className='font-semibold p-3'>Do you really want to delete this Ad?</h2>
        <div className='flex items-center justify-center gap-2 mt-2 '>
            <button onClick={()=>setshowDeleteQuestion(false)} className='px-2 py-1 rounded-md  bg-gray-400 hover:bg-gray-500 duration-200 hover:scale-x-90'>No,cancel</button>
            <button 
            onClick={
            handleDelete}
            className=' text-white px-2 py-1 rounded-md  bg-red-600 hover:bg-red-800 duration-200  hover:scale-x-90'>Yes,Delete!</button>
        </div>
    </div>

</div>
) 
    }
    
  return (
    <button 
              onClick={()=>setshowDeleteQuestion(true)}
              className='border rounded-md border-red-600 text-red-500 py-1 px-4 hover:bg-red-400 hover:text-white 
              inline-flex gap-2 items-center cursor-pointer'><FontAwesomeIcon icon={faTrash}  />
                <span>Delete</span></button>
  )
}

import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton({children}:{children:React.ReactNode}) {

   const {pending}= useFormStatus();
  return (
    <>
      <button 
       disabled={pending}
      className={(pending?'bg-gray-400':'bg-amber-600 ')+" mt-2 text-white  rounded-md px-7 py-2 hover:bg-amber-800 duration-200"}>
{pending &&(<span>Saving...</span>)}

{!pending &&( <span>{children}</span> )}
        
        </button>
    </>
  )
}

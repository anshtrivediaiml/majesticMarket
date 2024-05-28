'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRectangleAd, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { signIn,signOut } from 'next-auth/react'
import { Session, getServerSession } from 'next-auth'
import Image from 'next/image'
import {authOptions} from '@/utils/authOptions';
export default function Header({session}:{session:Session | null}) {

  const [showDropdown,setShowDropdown]= useState(false);
  
  return (
    <header className='bg-slate-800  border-b border-gray-500 p-4 flex justify-between items-center min-w-screen h-auto'>
        <div>
            <Link href="/" className="text-amber-500 font-extrabold hover:text-amber-700
            max-lg:text-xl  max-md:text-lg max-sm:text-md">MajesticMarket</Link> 
        </div>
        <nav  className='flex gap-4  *:rounded'>

          {session?.user&&(<> <Link href="/new" className='border border-amber-400 text-amber-400 inline-flex items-center px-3 mx-auto py-1 gap-1 mr-4  hover:bg-amber-700 duration-200 hover:text-gray-300 h-auto '><FontAwesomeIcon icon={faPlus} className="sm:h-3 md:h-4 lg:h-5"/><span>Post an add</span></Link>
       <span className='border-r-2'></span></>)}
      
       {!session?.user && (
        <>
         <button onClick={()=>{
          signIn('google')
         }}className='px-5 border-0 text-gray-500 hover:text-gray-300 duration-200'>SignUp</button>
       <button onClick={()=>{
        signIn('google')
       }} className='bg-amber-600 text-white border-0 px-4 py-1 hover:bg-amber-800'>Login</button>
        </>
       )}
      
      {session?.user && (
        <>
        <div className='relative'>
       <button onClick={()=>{setShowDropdown(prev => !prev)}}>
        <Image src={session.user.image as string} alt={"session.user.name"} width={36} height={36} className={'rounded-full relative  '+(showDropdown?' z-50':'')} quality={80} />
        </button>

        {showDropdown &&(
          <>
        <div onClick={()=>{
          setShowDropdown(false);
        }}
         className={'bg-black/90 fixed inset-0 z-40'}></div>
        <div className='absolute z-50 top-9  bg-white rounded-md right-0 w-36 h-auto'>
        <Link onClick={()=>setShowDropdown(false)}
        className='p-2  text-center rounded-md hover:bg-gray-400 hover:font-semibold duration-200 flex items-center'
         href={'/my-ads'}>
          <FontAwesomeIcon icon={faRectangleAd} className='px-2 size-7 text-red-500 '/>
          <span>My Ads</span>
          </Link>
        <button className='p-2 flex items-center border rounded-md w-full hover:bg-gray-400 hover:font-semibold duration-200' onClick={()=>{
          signOut();
        }}>
          <FontAwesomeIcon className='px-2 size-7 text-blue-500' icon={faRightFromBracket}/>
          <span>Logout</span>
        
        </button>
      </div>
      </>
      )  
        }
       
        </div>
        </>
      )}
        </nav>
        
    </header>
  )
}

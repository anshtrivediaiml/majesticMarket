//Shows the ads on the landing page
'use client'
import React from 'react'
import Link from 'next/link'
import UploadThumbnail
 from './UploadThumbnail'
import { Ad } from '../models/Ad'
export default function AdItem({ad}:{ad:Ad}) {
  return (
    <>
    {/* bg-gray to bg-zinc-500 */}
     <div className=" border-red-400  min-h-24  flex flex-col justify-start p-4
       rounded-lg px-4 items-center bg-zinc-500 opacity-70  hover:bg-gray-300 duration-200">
        {ad.files?.length>0 &&(
          <div className="rounded-md overflow-hidden relative  ">
       <UploadThumbnail onClick={()=>{}} file={ad.files[0]}/>
       <Link href={`/ad/${ad._id}`} className="absolute inset-0 "></Link>
          </div>
        )}

        {/* /Rest of information about the ads */}
        <div>
          <p className="font-bold mt-1 text-zinc-900">{new Intl.NumberFormat('en-IN',{maximumSignificantDigits:3,style:'currency',currency:'INR'}).format(ad?.price)}</p>
        <Link className='text-zinc-900 font-semibold' href={`/ad/${ad._id}`}>{ad.title}</Link>
        </div>
       </div> 
    </>
  )
}

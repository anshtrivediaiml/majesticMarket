'use server'
import React from 'react'
import {connect} from '@/libs/helpers'; 
import { AdModel } from '@/models/Ad';
import UploadThumbnail from '@/components/UploadThumbnail';
import UploadView from '@/components/UploadView';
import Gallery from '@/components/Gallery';
import {authOptions} from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import LocationMap from '@/components/LocationMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleUp, faDeleteLeft, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Location } from '@/components/LocationPicker';
import DeleteButton from '@/components/DeleteButton';


type Props={
    params:{
        id:string,
    };
    searchParams: {[key:string]:string};  
}


export  default async function SingleAdpage(args:  Props) {
    await connect();
   const adDoc= await AdModel.findById(args.params.id);
   const session= await getServerSession(authOptions);

   if(!adDoc){
    return 'Not Found!';
   }
  return (
    <div className='flex absolute inset-0 top-16 bg-gradient-to-br from-neutral-900 to-slate-900'>
        <div className=' w-3/5 grow bg-black text-white flex flex-col relative'>
        <Gallery files={adDoc.files}/>   
        </div>

        <div className='w-2/5 p-8 grow shrink-0 overflow-y-scroll'>
          <h1 className='text-lg font-bold text-amber-500'> {adDoc.title}</h1> 
          {session && session?.user?.email===adDoc.userEmail &&(
            <div className='mt-2 flex gap-2'>
              <Link href={`/edit/${adDoc._id}`} className='border border-blue-600 text-blue-600 rounded-md py-1 px-4 hover:bg-blue-400 hover:text-white inline-flex gap-2 items-center cursor-pointer'>
                <FontAwesomeIcon icon={faPencil} />
                <span>Edit</span></Link>
              <DeleteButton id={adDoc._id}/>
            </div>
          )}
          <label className='text-amber-700'>Price:</label>
          <p className='text-gray-400'>{new Intl.NumberFormat('en-IN',{maximumSignificantDigits:3,style:'currency',currency:'INR'}).format(adDoc.price)}</p>
          <label htmlFor='' className='text-amber-700'>Category:</label>
          <p className='text-gray-400'>{adDoc.category}</p>
          <label htmlFor='' className='text-amber-700'>
            description
          </label>
          <p className='texxt-sm text-gray-400'>{adDoc.description}</p>
          <label className='text-amber-700'>contact:</label>
          <p className='text-gray-400'>{adDoc.contact}</p>
<label className='text-amber-700'>Location:</label>
 <LocationMap className='w-full p-3 h-48' location={adDoc.location}/>
 <p className='mt-4  text-sm text-gray-500'>Posted:
  <span className='italic'>
  {(new Date(adDoc.createdAt)).toLocaleDateString()}
  </span>
  <span className='mx-2 italic'>
  {(new Date(adDoc.createdAt)).toLocaleTimeString()}
  </span>
  </p>
  <p className='text-sm text-gray-500'>Last Updated:
    <span className='italic'> {(new Date(adDoc.updatedAt)).toLocaleDateString()}</span>
    <span className='mx-2 italic '>{(new Date(adDoc.updatedAt)).toLocaleTimeString()}</span>
  </p>

<div className='flex mt-14'>
  <Link href='/' className='bg-amber-700 opacity-60  px-4 py-2 rounded-md font-semibold hover:opacity-100 duration-200' title="Navigate to Homepage"> <FontAwesomeIcon icon={faArrowAltCircleLeft} className='px-1'/>Homepage</Link> </div>
      </div>
    {/* Homepage navigation after ad is created */}
    </div>
  )
}

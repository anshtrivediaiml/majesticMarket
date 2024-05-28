'use server';
import { getServerSession } from 'next-auth';
import React from 'react'
import {authOptions} from '@/utils/authOptions';
import { connect } from '@/libs/helpers';
import { AdModel } from '@/models/Ad';
import AdItem from '@/components/AdItem';
export default async  function myAdsPage() {

    const session= await getServerSession(authOptions);
    await connect();
    const userEmail=session?.user?.email;
    if(!userEmail){
        return 'You need to be logged in to view this page'
    }
    const adDocs= await AdModel.find({userEmail:userEmail})
  return (
    <div className='bg-gradient-to-br from-neutral-800 to-slate-700 w-full min-h-screen my-0'>

    <div className=' container py-5 mx-auto '>
        <h1 className='text-2xl font-bold mb-4 text-amber-500 '>Your Ads</h1>
        <div className='mx-2 grid lg:grid-cols-5 gap-x-2 gap-y-4 items-center md:grid-cols-4 sm:grid-cols-3 '>
        {adDocs?.map(ad=>(
       <AdItem key={ad._id} ad={ad}/>
      ))}
        </div>
      
    </div>
    </div>
  )
}

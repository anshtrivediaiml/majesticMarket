"use server";
//We will save the ad data to the database
//using mongoDB and mongoose for data modelling
import { AdModel } from "@/models/Ad";
import mongoose from "mongoose";
import {authOptions} from '@/utils/authOptions';
import { getServerSession } from "next-auth";
import {connect} from "@/libs/helpers"; //importing the connect function from helpers.ts
import { revalidatePath } from "next/cache";

export async function createAd(formData: FormData) {
  const { files, location, ...data } = Object.fromEntries(formData);
  await connect();
  const session = await getServerSession(authOptions);
  const newAdData={
    ...data,
    files: JSON.parse(files as string),
    location: JSON.parse(location as string),
    userEmail: session?.user?.email,
  }
   const newAdDoc=await AdModel.create(newAdData);
   return JSON.parse(JSON.stringify(newAdDoc));
}


export async function updateAd(formData: FormData) {
  const { _id,files, location, ...data } = Object.fromEntries(formData);
  await connect();
  const session = await getServerSession(authOptions);

  const adDoc= await AdModel.findById(_id);

  if( !adDoc || adDoc?.userEmail !== session?.user?.email)
  {
  return 
  }

  const AdData={
    ...data,
    files: JSON.parse(files as string),
    location: JSON.parse(location as string),
  }
   const newAdDoc=await AdModel.findByIdAndUpdate(_id,AdData);
   revalidatePath('/ad/'+_id)
   return JSON.parse(JSON.stringify(newAdDoc));
}


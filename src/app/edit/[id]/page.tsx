'use server';
import {authOptions} from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
//Will be used to edit the page 
import { connect } from '@/libs/helpers';
import React from 'react'
import { AdModel } from '@/models/Ad';
import EditForm from '@/components/EditForm';

type Props={
    params:{
        id:string,
    };
    searchParams: {[key:string]:string};  
}

export default async function Editpage(props:Props) {

    const id=props.params.id;
    await connect();
const session= await getServerSession(authOptions);
const adDoc = await AdModel.findById(id);
if(!adDoc){
    return '404 Not Found';
}
if(session?.user?.email!==adDoc?.userEmail){
return 'You dont have permission to edit this ad';
}

return (
    <EditForm 
    id={adDoc._id}
    defaultText={adDoc}
    defaultFiles={adDoc.files} defaultLocation={adDoc.location} />
)
  
}

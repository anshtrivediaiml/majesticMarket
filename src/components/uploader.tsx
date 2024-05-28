'use client'
import React from 'react'
import { IKContext, IKUpload } from 'imagekitio-react'
import { IKUploadProps } from 'imagekitio-react/src/components/IKUpload/props'
export default function Uploader(props:IKUploadProps) {
  return (
    <>
    <IKContext urlEndpoint={process.env.NEXT_PUBLIC_IK_URL_ENDPOINT}
     publicKey={process.env.NEXT_PUBLIC_IK_PUBLIC_KEY}
     authenticator={async()=>{
        const response = await fetch('/api/imagekit/auth')
        return await response.json()
     }}
     >
      <IKUpload {...props}></IKUpload>
    </IKContext>
    </>
  )
}

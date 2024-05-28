
import React from 'react'
import { faImage, faPlus } from '@fortawesome/free-solid-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Uploader from './uploader'
import { UploadResponse } from 'imagekit/dist/libs/interfaces'
import { Dispatch, SetStateAction } from 'react'
import {useState } from 'react'
import UploadThumbnail from './UploadThumbnail'

type Props={
    files:UploadResponse[];
    setFiles: Dispatch<SetStateAction<UploadResponse[]>>;
}
export default function UploadArea({files,setFiles}:Props) {
    const [isUploading,setIsUploading]= useState(false);

  return (
    <div className="bg-slate-900 p-4 rounded-md">
          <h2 className="text-center text-gray-500 uppercase text-xs font-bold">
            Add photos of your product:
          </h2>
          <div className="flex flex-col">
            <FontAwesomeIcon icon={faImage} className="h-20 text-gray-300" />

            <label
              className={
                'upload-btn  mt-2 border  px-4 py-2 rounded-md inline-flex gap-1 items-center justify-center '+
               ( isUploading? 'text-gray-400 cursor-not-allowed':
                ` text-amber-500  border-amber-500 cursor-pointer
             `)} 
            >
                <Uploader onUploadStart={()=>{
                    setIsUploading(true)
                }}  onSuccess={(file)=>{
                setFiles(prev=>[...prev,file])
                setIsUploading(false)
            }} />

            {isUploading? <span>Uploading...</span>
            :<>
            <FontAwesomeIcon icon={faPlus} />
              <span>Add Photos</span>
            </>}
              
            </label>
            <div className='flex gap-2 mt-2 flex-wrap '>
            {files.map((file)=>(
                <div className='size-16 rounded overflow-hidden' key={file.fileId} >
                 <UploadThumbnail file={file} />  
                </div>
            ))}
            </div>
          </div>
        </div>

  )
}
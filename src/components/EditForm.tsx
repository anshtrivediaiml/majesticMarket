//The form for giving the products details and description
'use client';
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import SubmitButton from '@/components/SubmitButton'
import UploadArea from '@/components/UploadArea'
import AdtextInputs from '@/components/AdtextInputs'
import LocationPicker, { Location } from '@/components/LocationPicker'
import { UploadResponse } from 'imagekit/dist/libs/interfaces'
import { createAd, updateAd } from '@/app/actions/adActions'
import { redirect } from 'next/navigation'
import AdTextInputs,{AdTexts} from '@/components/AdtextInputs';

type Props={
 defaultFiles?:UploadResponse[],
 defaultLocation:Location;
 defaultText?:AdTexts;
 id?:string | null;
}
export default function EditForm({defaultFiles=[],defaultLocation,defaultText={},id=null}:Props) {

        const [files, setFiles] = useState<UploadResponse[]>(defaultFiles);
    const [location, setLocation] = useState<Location | null>(defaultLocation);
  const [gpsCoords,setGpsCoords]= useState<Location | null>(null);
 
  
  function handleFindMyPositionClick() {
    navigator.geolocation.getCurrentPosition((ev) => {
      const location={lat:ev.coords.latitude,lng:ev.coords.longitude}
      setLocation(location);
      setGpsCoords(location);
  },console.error);
}
 
async function handleSubmitForm(formData:FormData){
  
    formData.set('location',JSON.stringify(location));
    formData.set('files',JSON.stringify(files));

    if(id){
      formData.set('_id',id);
    }
    const result= id
    ?await updateAd(formData)
    :await createAd(formData);
    redirect('/ad/'+result._id);    
   }


  return (
    <div className='bg-gradient-to-br from-neutral-800 to-slate-700 min-h-screen'>
    <form action={handleSubmitForm} className="max-w-xl mx-auto grid grid-cols-2 gap-12">
    <div className="grow pt-8 ">
      <UploadArea files={files} setFiles={setFiles} />
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <label htmlFor="" className="mt-0 mb-0 text-amber-700">
            Where
          </label>
          <div>
            <button
              type="button"
              onClick={handleFindMyPositionClick}
              className=" border border-slate-800 flex p-1 items-center gap-1   text-amber-700 rounded-md my-2 justify-center"
            >
              <FontAwesomeIcon icon={faLocationCrosshairs} />
            </button>
          </div>
        </div>

        <div className="bg-gray-200 overflow-hidden min-h-12 rounded text-gray-400 text-center">
          {/* map will be here */}
          <LocationPicker
          gpsCoords={gpsCoords} defaultlocation={defaultLocation} onChange={location =>setLocation(location)} />
        </div>
      </div>
    </div>
    <div className="grow pt-2">
      <AdtextInputs defaultValues={defaultText} />
      <SubmitButton>{id?'Save':'Publish'}</SubmitButton>
    </div>
  </form>

  </div>
  )
}

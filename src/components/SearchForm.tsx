import React,{use, useEffect, useRef,useState} from 'react'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import LabelRadioButton from './LabelRadioButton'
import { Location } from './LocationPicker'
import { categories } from '../libs/helpers'
import DistancePicker from './DistancePicker'
import {defaultRadius} from '../libs/helpers'
type Props={
    action:(data:FormData)=>void;
}


export default function SearchForm({action}:Props) {
    
    const [radius,setRadius]= useState<number | null> (defaultRadius)

    const [center,setCenter]= useState<Location|null>(null)
    
    const [prevCenter,setPrevCenter]= useState<Location | null>(null)
    const formRef=useRef<HTMLFormElement | null>(null);

   useEffect(()=>{
        if(center && !prevCenter){
            formRef.current?.requestSubmit();
            setPrevCenter(center);
        }
   },[center])
   
  return (
    <form  ref={formRef}
    action={action}
    // bg-white to bg-gradient
    className="bg-gradient-to-br from-neutral-900 to-slate-800 p-4 grow w-1/6  ">

      <input className='bg-gray-900 mb-1
      focus:caret-amber-400 text-amber-400'
       type="text" name="phrase" placeholder="search Marketplace"/>
      <div className="flex flex-col gap-0">
       <LabelRadioButton
        name={'category'}
        icon={faStore}
        onClick={()=>formRef.current?.requestSubmit()}
        value={""}
        label={'All Categories'}
        defaultChecked={true}
       />
        {
          categories.map(({key:categoryKey,label,icon})=>(
           <LabelRadioButton 
           key={categoryKey}
           name={'category'} 
           icon={icon} 
           onClick={()=>formRef.current?.requestSubmit()} 
           label={label} 
           value={categoryKey}
           defaultChecked={false}
           />
          
          ))
        }
      </div>
      <div className="">
      <label htmlFor="" className='text-amber-600' >Filter By Price:</label>
        <div className="grid grid-cols-2 gap-4">
            <div >
             <input type="number" name="min-price" placeholder="min" className="bg-gray-900 focus:outline-none focus:caret-amber-400"/>
            </div>
            <div>
             <input  type="number" name="max-price" placeholder="max" className="bg-gray-900 focus:outline-none focus:caret-amber-400"/>
            </div>
            
        </div>
      </div>
      <div>
        <input type="hidden"  name="radius" value={radius as number} />
        <input type="hidden"  name="center" value={center?.lat+'-'+center?.lng} />
        {/* maps filtering here */}
        <DistancePicker defaultRadius={defaultRadius as number}
        onChange={({radius,center})=>{setRadius(radius);
        setCenter(center);
        }}/>
      </div>

      <button
      className="bg-amber-400 font-bold  px-3 py-2 rounded-md my-2 w-full hover:bg-amber-700 duration-200" type="submit" onClick={()=>{
        formRef.current?.requestSubmit();
      }}>Search</button>
    </form>
  )
}

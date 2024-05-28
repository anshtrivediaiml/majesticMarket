import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type Props={
    name:string;
    value:string;
    icon:IconDefinition;
    onClick:()=>void;
    label:string;
    defaultChecked:boolean;
}
export default function LabelRadioButton({name,value,icon,onClick,label,defaultChecked}:Props) {
  return (

       <label 
       
             className="text-gray-500 has-[:checked]:bg-blue-50  py-2 px-2 rounded-md flex items-center gap-2  my-0 duration-100  radio-btn group "  >
                <span className="icon group-has-[:checked]:bg-amber-600 group-has-[:checked]:text-gray-100">
               <FontAwesomeIcon icon={icon} className="font-bold text-[16px]  "/>
                </span>
                <input defaultChecked={defaultChecked} onClick={()=>onClick()}
                 type="radio" hidden name={name} value={value}/>{label}
              </label>

  )
}

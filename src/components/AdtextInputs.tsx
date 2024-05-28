import { categories } from '@/libs/helpers'
import React from 'react'


export type AdTexts={
  
    title?:string;
    price?:string|number;
    category?:string;
    description?:string;
    contact?:string; 
}

type Props={
  defaultValues:AdTexts;
}

export default function AdtextInputs({defaultValues}:Props) {
  return (
    <div>
      <label htmlFor="TitleIn" className='text-amber-700'>Title:</label>
        <input required
        className='focus:outline-none focus:caret-amber-500 bg-slate-900 border-none text-gray-400'
        name="title" id="TitleIn" type="text" placeholder="Title" defaultValue={defaultValues.title} />
        <label htmlFor="PriceIn" className='text-amber-700'>Price:</label>
        <input required
        className='focus:outline-none focus:caret-amber-500 bg-slate-900 border-none text-gray-400'
        name="price" id="PriceIn" type="number" placeholder="price" defaultValue={defaultValues.price} />

        <label htmlFor="CategoryIn" className='text-amber-700'>Category:</label>
        <select required className='focus:caret-amber-500 bg-slate-900 border-none text-gray-400'
        name="category" id="CategoryIn"
         defaultValue={defaultValues.category || '0'}>
        <option  disabled value="0">
            Select the category
          </option>
         {categories.map(({key:categoryKey,label:categoryLabel}) => (
            <option key={categoryKey} value={categoryKey}>
              {categoryLabel}
            </option>
          ))}
        </select>
        <label htmlFor="DescriptionIn" className='text-amber-700'>Description</label>
        <textarea 
         defaultValue={defaultValues.description}
          name="description"
          id="DescriptionIn"
          placeholder="Description"
          className='focus:outline-none focus:caret-amber-500 bg-slate-900 border-none text-gray-400'
        ></textarea>
        <label htmlFor="ContactIn" className='text-amber-700'>Contact Information:</label>
        <textarea required
        defaultValue={defaultValues.contact}
        name="contact"  id="ContactIn" placeholder="Mobile:+91" className='resize-none h-32 focus:outline-none focus:caret-amber-500 bg-slate-900 border-none text-gray-400'></textarea>
      
    </div>
  )
}

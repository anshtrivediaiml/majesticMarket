'use client'
import React, { HTMLAttributes, createRef, useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { Location } from './LocationPicker';


 type Props = HTMLAttributes<HTMLDivElement> & {
  location:Location;
}
export default function LocationMap({location,...divProps}:Props) {

    const divRef=createRef<HTMLDivElement>();

    useEffect(()=>{
        loadMap();
    },[])

    async function loadMap()
    {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,  
        })
        //importing the map library
        const {Map}= await loader.importLibrary('maps'); 

        //importing the marker library for red marker on the map 
        const {AdvancedMarkerElement} = await loader.importLibrary('marker'); 

        const map= new Map(divRef.current as HTMLDivElement,{
            mapId:'map',
            center:location,
            zoom:3,
            mapTypeControl:false,
            streetViewControl:false,
            zoomControl:true
        });

         new AdvancedMarkerElement({
            map,
            position:location,
        })
    }
 
    return (
    <>
     <div {...divProps} ref={divRef}>
        
    </div> 
    </>
  )
}

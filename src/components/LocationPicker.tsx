'use effect'
import React, { createRef, useEffect,useRef,useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { env } from "process";
export type Location={
  lat:number,
  lng:number;
}

export default function LocationPicker({defaultlocation,onChange,gpsCoords}:{defaultlocation:Location;
  onChange:(location:Location)=>void;
  gpsCoords:Location | null;
}) {

    const divRef = createRef<HTMLDivElement>();
   async function LoadMap() {
    const loader = new Loader({
      apiKey: process.env.NEXT_GOOGLE_MAPS_API_KEY as string,
    });
    console.log("loading map")

    const {Map}= await loader.importLibrary("maps");
    const {AdvancedMarkerElement}= await loader.importLibrary('marker');
    
    const map= new Map(divRef.current as HTMLDivElement,{
        mapId:'map',
        center:defaultlocation,
        zoom:3,
        mapTypeControl:false,
        streetViewControl:false
    });
 
    
    const pin= new AdvancedMarkerElement({
        map,
        position:defaultlocation,
    })
    
    map.addListener('click',(ev:any) => {

       pin.position= ev.latLng;
       const lat=ev.latLng.lat();
       const lng= ev.latLng.lng();
       onChange({lat,lng});
       
    })
  }

 
  useEffect(()=>{
LoadMap();
  },[gpsCoords]);

  return( <div ref={divRef} id="map" className="w-full h-[200px]">picker maps google</div>)
}


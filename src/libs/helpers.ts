import { faBicycle, faCameraRetro, faCar, faComputer, faHouse, faHouseFlag, faMobile, faMobileAndroid, faTabletAlt } from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";


export async function connect(){
    return mongoose.connect(process.env.MONGODB_URL as string)
}

export const categories=[
  {key:'electronics',label:'Electronics',icon:faComputer},
   { key:'Mobile-devices',label:'Mobile devices',icon:faTabletAlt},
   {key:'4-wheeler',label:'4 Wheeler vehicles',icon:faCar},
   {key:'2-wheeler',label:'2 Wheeler vehicles',icon:faBicycle},
    {key:'properties-for-rent',label:'Properties for Rent',icon:faHouseFlag},
    {key:'properties-for-sale',label:'Properties for Sale',icon:faHouse}
]
  
export const defaultRadius=50*1000;


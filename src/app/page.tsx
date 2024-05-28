//main landing page

'use client'
import React,{useEffect,useState} from "react";
import { Ad } from "../models/Ad"; 
import AdItem from "@/components/AdItem";
import "./globals.css";
import SearchForm from "@/components/SearchForm";
import { defaultRadius } from "../libs/helpers";
import Loading from "@/components/Loading";
export default function Home() {

const [ads,setAds]= useState<Ad[]|null>(null);
const [adsParams,setAdsParams]=useState<URLSearchParams>(new URLSearchParams);

//   useEffect(()=>{
// fetchAds();
//   },[]);

  function fetchAds(params?:URLSearchParams){

    if(!params){ //If there is no params, we will create a new URLSearchParams object
      params= new URLSearchParams();
    }

    //If there is no center or radius do not fetch the ads and return
    if(!params.get('radius')){
      return ;
    }

    if(!params.has('radius')){ //If there is no radius in the params, we will set the default radius
      params.set('radius',defaultRadius.toString());
    }
    const url=`/api/ads?${params?.toString()|| ''}`;
    fetch(url).then(response=>{
      response.json().then(adDocs=>{
        setAds(adDocs);
        setAdsParams(params);
      });
    });
  }

  function handleSearch(formData:FormData){
   //When the user searches for a product, We will create a new url with the help of URLSearchParams interface and append the search query to the url and redirect the user to the new url
   const params= new URLSearchParams();
   formData.forEach((value,key)=>{
     if(typeof value === 'string'){
      params.set(key,value);
     }
   });
   fetchAds(params);
  }

const formDirty= adsParams.get('phrase')|| adsParams.get('category')|| adsParams.get('minPrice')|| adsParams.get('maxPrice')

  return (
    //left side sidebar here
    <div className="flex w-full h-full">
        {/*SearchForm used for different types of filterings  */}
<SearchForm action={handleSearch}/>

 {/* //right side product here */}
 {/* bg-gray-50 changed, text color changed */}
      <div className=" grow w-5/6 p-4  min-h-screen bg-gradient-to-br from-neutral-800 to-slate-700">
     <h2 className="font-bold mt-2 mb-4 text-amber-400 ">{formDirty?'Search Results..':'Latest ads'}</h2>
        <div className="grid  lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-6">
        {ads &&ads.map(ad=>(

       <AdItem key={ad._id} ad={ad}/>
      ))}
        </div>
        { ads && ads?.length==0 &&(
          <div className="text-gray-400">
            No products found..
          </div>
        )}

        {ads ===null &&(
          <div className="text-gray-400">
            Loading products
            <div className="flex items-center justify-center  min-w-screen">
           <Loading />
            </div>
          </div>
        
        )}
      </div>
    </div>
  );
}

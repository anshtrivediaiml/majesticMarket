//used for fetching data from the database and also for implementing search functionality and filtering
import {connect} from '@/libs/helpers'
import { AdModel,Ad } from '@/models/Ad';
import { FilterQuery, PipelineStage } from 'mongoose';
import { getServerSession } from 'next-auth';
import {authOptions} from '@/utils/authOptions';
export async function GET(req: Request, res: Response){
 await connect();
 const url= new URL(req.url);
 const filter:FilterQuery<Ad>={};
 const aggregationSteps:PipelineStage[]=[];
 const phrase = url.searchParams.get('phrase');
 const category= url.searchParams.get('category');
 const minprice= url.searchParams.get('min-price'); 
 const maxprice= url.searchParams.get('max-price'); 
 console.log(category);
 const radius= url.searchParams.get('radius');
 const center=url.searchParams.get('center');

 //filtering by search
 if(phrase){
    console.log(phrase);
    filter.title={$regex:'.*'+phrase+'.*',$options:'i'};
 }

 //filtering by category
 if(category){
    filter.category=category;
 }

 //filtering by price if we have either minprice or maxprice
 if(minprice || maxprice){
    if(minprice) filter.price={$gte:parseInt(minprice)};
     
     if(maxprice)  filter.price={$lte:parseInt(maxprice)};
         
 }

  //filtering by price if we have both minprice and maxprice
 if(minprice && maxprice) filter.price={$gte:parseInt(minprice),$lte:parseInt(maxprice)};

 //filtering by location implementing aggregation pipelines for location based filtering 
 if(radius && center){

   const coords=center.split('-')
 aggregationSteps.push(
   {
      $geoNear:
          {
        near: { 
              type: 'Point', 
           coordinates: [ parseFloat(coords[0]),parseFloat(coords[1]) ] 
         },
            distanceField: 'distance',
            maxDistance: parseFloat(radius),
            spherical: true
          }
   }
 );
 }

 //Also pushing all the minimum and maximum and category filters to the aggregation pipeline
 aggregationSteps.push({
   $match: {...filter}
 });
 
 //sorting the ads by the latest created
 aggregationSteps.push({
   $sort:{
       createdAt:-1
   }
 })

const adDocs= await AdModel.aggregate(aggregationSteps)
 return Response.json(adDocs);
}

export async function DELETE(req:Request,res:Response){
  //delete the ad
  const url=new URL(req.url);
  const id= url.searchParams.get('id');
  await connect();
  const adDoc = await AdModel.findById(id);
  const session = await getServerSession(authOptions);
  if(!adDoc || adDoc?.userEmail!==session?.user?.email){
    return Response.json(false);
  }
  await AdModel.findByIdAndDelete(id);
  return Response.json(true);
}

import connectDB from "@/utils/connectDB";
import CorporatePartners from"@/models/corporatePartnerSchema";

export const POST = async (req) => {
    
    const dataArray = await req.json();
   
    try{
        await connectDB();
        await CorporatePartners.insertMany(dataArray);

        return new Response("Success in inserting database",{status:201})
    }catch(error){
        return new Response("Failed in inserting database",{status:500})
    }

}
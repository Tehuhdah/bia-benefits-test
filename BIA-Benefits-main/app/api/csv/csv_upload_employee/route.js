
import connectDB from "@/utils/connectDB";
import BiaEmp from "@/models/biaEmployeeSchema";

export const POST = async (req) => {
    
    const dataArray = await req.json();
   
    try{
        await connectDB();
        await BiaEmp.insertMany(dataArray);

        return new Response("Success in inserting database",{status:201})
    }catch(error){
        return new Response("Failed in inserting database",{status:500})
    }

}
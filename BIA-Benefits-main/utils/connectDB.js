const mongoose = require("mongoose");

export default async function connectDB(){
    //If already connected return 
    if(mongoose.connection.readyState >= 1){
        return;
    }
    
    // If not connected - Connect
    try{
        await mongoose.connect(process.env.MONGODB_URI,
            {
                dbName: "BiaBenefits",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log("Connected to DB");
    }
    catch(error){
        console.log("Error connecting to db: ", error);
    }
}
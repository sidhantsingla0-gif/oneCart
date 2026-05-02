import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB Connected");        
    } catch(err){
        console.error("DB Connection Failed", err);
    }
}

export default connectDb;
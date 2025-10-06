import express from "express";
import cors from "cors";
const app=express() 

app.listen(8000,()=>{
    console.log("Product service is runnig 8000");
})

app.use(cors({
    origin:["http://localhost:3002/","http://localhost:3003/"],
    credentials:true,
}))
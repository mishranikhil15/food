const express=require('express');
const{ Connection}=require("./config/db");
const{userrouter}=require("./routes/userroute");
const { resturantrouter}=require("./routes/resturantroute")
const app=express();

require('dotenv').config();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/users",userrouter);
app.use("/resturant",resturantrouter)

app.listen(process.env.port,async()=>{
    try {
        await Connection
        console.log("Connected To DataBase")
    } catch (error) {
        console.log('Error While Connecting To DataBase')
        console.log(error)
    }
    console.log(`Server is running on port ${process.env.port}`)
})
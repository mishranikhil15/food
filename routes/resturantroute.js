const express=require('express');
const {resturantModel}=require("../models/resturantmodel")
const resturantrouter=express.Router();


resturantrouter.post("/create",async(req,res)=>{
    const payload=req.body;
        
    try {
       const new_resturant=new resturantModel(payload);
       await new_resturant.save();
       res.json({"msg":"created the resturant"})
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while creating the user"})
    }
})

resturantrouter.get("/restaurants",async(req,res)=>{
    try {
        const data= await resturantModel.find();
        res.json({"msg":data})
    } catch (error) {
        console.log(error)
        res.json({"msg":"Error while finding the resturant"})
    }
})


resturantrouter.get("/restaurants/:id",async(req,res)=>{
    let id=req.params.id
    try {
        const data= await resturantModel.find({"_id":id});
        res.json({"msg":data})
    } catch (error) {
        console.log(error)
        res.json({"msg":"Error while finding the resturant"})
    }
})

resturantrouter.get("/restaurants/:id/menu",async(req,res)=>{
    let id=req.params.id
    try {
        const data= await resturantModel.find({"_id":id});
        console.log(data[0].menu);
        res.json({"msg":data[0].menu})
    } catch (error) {
        console.log(error)
        res.json({"msg":"Error while finding the resturant"})
    }
})




resturantrouter.put("/restaurants/:id/menu",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id;
    const res_data=await resturantModel.find({"_id":id});
    let res_data_id=res_data[0]._id;
    try {
        if(id==res_data_id){
            // console.log(res_data[0].menu);
            // res_data[0].menu.push(payload);

            console.log(res_data[0]);
            let data=new resturantModel({"menu":payload})
        
            let resp= await res_data[0].save();
            res.json({"msg":"added data in menu","resp":resp})
            // let menu=
        }
    } catch (error) {
        console.log(error)
        res.json({"msg":"Error while updating the menu"})
    }
})


resturantrouter.delete("/restaurants/:id/menu",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id;
    const res_data=await resturantModel.find({"_id":id});
    let res_data_id=res_data[0]._id;
    try {
        if(id==res_data_id){
            // console.log(res_data[0].menu);
            // res_data[0].menu.push(payload);
            let menu_data=res_data[0].menu;
            console.log(menu_data);

        //   await resturantModel.findByIdAndDelete({_i})
        }
    } catch (error) {
        console.log(error)
        res.json({"msg":"Error while updating the menu"})
    }
})



module.exports={
    resturantrouter
}


// {
//     "name":"anna",
//     "address":{
//        "street":"indian",
//        "city":"newdelhi",
//        "state":"newdelhi",
//        "country":"india",
//        "zip":"1111"
//      },
//      "menu": [{
//         "name": "chicken",
//        "description": "kebab",
//        "price":100,
//        "image":"https://via.placeholder.com/350x250"
//      }]
   
//   }
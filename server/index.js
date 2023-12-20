const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const app=express()

app.use(cors())
app.use(express.json())

const PORT=process.env.PORT || 8080

//schema

const schemaData=mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
},{
    timestamps:true
})

const userModel=mongoose.model("user",schemaData)

//read data API
app.get("/",async(req,res)=>{

    const data= await userModel.find({})
    res.json({success:true , data : data })
})



// create data || save data in mongoDb API
// http://localhost:8080/create
/*
  "name":"Amit",
  "email" :"amit@gmail.com",
  "mobile":706799898
*/

app.post("/create" , async(req , res) =>{

    console.log(req.body)
    const data= new userModel(req.body)
   await data.save()
   res.send({success : true , message:"data save successfully" })
})

// update data API
// http://localhost:8080/update
/*
   {
    "id":"",
    "name":""
    "email":""
   }
*/
 
app.put("/update"  , async(req, res)=>{
  console.log(req.body)
  const {_id, ...rest} = req.body
  console.log(rest)
const data=await userModel.updateOne({_id :_id },rest)
res.send({success:true, message:"data upaded successfuly"})


})

// Delete data API
// http://localhost:8080/delete/id

app.delete("/delete/:id", async(req, res)=>{
    const id=req.params.id
    console.log(id)
    const data=await userModel.deleteOne({_id:id})
    res.send({success:true, message:"data deleted successfuly", data:data})

})


mongoose.connect("mongodb://127.0.0.1:27017/crudoperation")
.then(()=>console.log("conneted to DB"))
.catch(()=>console.log("error"))


app.listen(PORT,()=>console.log("Server is running"))
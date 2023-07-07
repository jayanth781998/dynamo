const aws =require("aws-sdk")
const ddb = new aws.DynamoDB({
  endpoint: "http://localhost:8000",
  region:"us-east-1"
  // configuration variables
})
const del= async(req,res)=>{
   const {name}=req.params
   const {Artist,SongTitle}=req.body
   const params={
      TableName:name,
      Key:{
         Artist:{S:Artist},
         SongTitle:{S:SongTitle}
      }
   }
   console.log(params);
   await ddb.deleteItem(params,(err)=>{//deleting specific data
      if(!err){res.send(`deleted ${Artist} ${SongTitle}`)} 
   else{res.send("fail"+err)}
   })
}                   
const post1=async(req,res)=>{
   const {name}=req.params
   const {Artist,SongTitle}=req.body
   var params = {
      TableName: name,
      Item: {
         Artist:{S:Artist},
         SongTitle:{S:SongTitle}
      }
  };
  await ddb.putItem(params,(err)=>{//inserting data
   if(!err){res.send(`success addes ${Artist} ${SongTitle}`)} 
   else{res.send("fail"+err)}
  })
}
const putt=async(req,res)=>{
   const {name}=req.params
   const {Artist,SongTitle}=req.body
   var params = {
      TableName: name,
      Item: {
         Artist:{S:Artist},
         SongTitle:{S:SongTitle},
         new:{S:"test"}//testing to update value 
      }
  };
  await ddb.putItem(params,(err)=>{
   if(!err){res.send(`success addes ${Artist} ${SongTitle}`)} 
   else{res.send("fail"+err)}
  })
}
const all=async(req,res)=>{
   const params={
      TableName:"Music",
   }
   await ddb.scan(params,(err,data)=>{//fetching all data in table
      if(!err){
         res.send(data.Items)
      }
      else{
         res.send(err)
      }
   })
}
const spec=async(req,res)=>{
   const {name}=req.params
   console.log(req.body)
   const {Artist,SongTitle}=req.body
   const params={
      TableName:name,
      Key:{
         Artist:{S:Artist},
         SongTitle:{S:SongTitle}
      }
   }
   console.log(params);
   await ddb.getItem(params,(err,data)=>{//fetching only specific data from db
      if(!err){res.send(data.Item)} 
   else{res.send("fail"+err)}
   })
}
module.exports={del,post1,putt,all,spec}


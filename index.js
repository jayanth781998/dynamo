const express=require("express")
const app = express()
const body=require("body-parser")
const {del,post1,putt,all,spec,query}=require("./Controller/controller")
app.delete("/:name",body.json(),del)
app.post("/:name",body.json(),post1)
app.put("/:name",body.json(),putt)
app.get("/",all)
app.get("/:name",body.json(),spec)
app.get("/:name/:Artist",body.json(),query)
app.listen(5000, () => {
   console.log('Server is listening on port 5000....')
 })


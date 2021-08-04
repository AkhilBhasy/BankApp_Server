const express=require('express')
const dataService=require('./services/data.service')
const app=express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(401).send("Server Started,GET Method...")
})

// app.post('/',(req,res)=>{
//     res.send("POST Method")
// })
// app.put('/',(req,res)=>{
//     res.send("PUT Method")
// })
// app.patch('/',(req,res)=>{
//     res.send("PATCH Method")
// })
// app.delete('/',(req,res)=>{
//     res.send("DELETE Method")
// })


app.post('/register',(req,res)=>{
    console.log(req.body)
   const result= dataService.register(req.body.acno,req.body.uname,req.body.password)
    res.status(result.statusCode).json(result)
})


app.post('/login',(req,res)=>{
    console.log(req.body)
   const result= dataService.login(req.body.acno,req.body.pswd)
   res.status(result.statusCode).json(result)
})

app.post('/deposit',(req,res)=>{
    console.log(req.body)
   const result= dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)
   res.status(result.statusCode).json(result)
})

app.post('/withdraw',(req,res)=>{
    console.log(req.body)
   const result= dataService.withdraw(req.body.acno,req.body.pswd,req.body.amt)
   res.status(result.statusCode).json(result)
})

app.listen(3000,()=>{
    console.log("Server started at port number:3000");
})
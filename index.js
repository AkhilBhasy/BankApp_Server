const express=require('express')
const dataService=require('./services/data.service')
const session=require('express-session')
const app=express()
const cors=require('cors')
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))
app.use(session({
    secret:'randomSecureString',
    resave:false,
    saveUninitialized:false
}))
app.use(express.json())

app.use((req,res,next)=>{
    console.log("Middleware");
    next()
})

const loginMiddleware=(req,res,next)=>{
    if(!req.session.currentAcc){
        return res.json({
            statusCode:422,
            status:false,
            message:"Plz log in" 
        })
    }
    next()
}

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
   // console.log(req.body)
    dataService.register(req.body.acno,req.body.uname,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
   // res.status(result.statusCode).json(result)
  // res.status(200).send("success")
})


app.post('/login',(req,res)=>{
   // console.log(req.body)
    dataService.login(req,req.body.acno,req.body.pswd)
   .then(result=>{
    res.status(result.statusCode).json(result)
})
})
app.post('/deposit',loginMiddleware,(req,res)=>{
    //console.log(req.body)
   // console.log(req.session.currentAcc)
   dataService.deposit(req,req.body.acno,req.body.pswd,req.body.amt)
  .then(result=>{
   res.status(result.statusCode).json(result)
})
})
app.post('/withdraw',loginMiddleware,(req,res)=>{
    //console.log(req.body)
   dataService.withdraw(req,req.body.acno,req.body.pswd,req.body.amt)
  .then(result=>{
   res.status(result.statusCode).json(result)
})
})

app.post('/transaction',loginMiddleware,(req,res)=>{
    //console.log(req.body)
   dataService.getTransaction(req.body.acno)
   .then(result=>{
   res.status(result.statusCode).json(result)
})
})


app.delete('/deleteAcc/:acno',loginMiddleware,(req,res)=>{
    //console.log(req.body)
   dataService.deleteAcc(req.params.acno)
   .then(result=>{
   res.status(result.statusCode).json(result)
})
})

app.listen(3000,()=>{
    console.log("Server started at port number:3000");
})
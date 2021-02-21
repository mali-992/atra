const express=require('express');
const app=express();
const mongoose=require('mongoose')
const usersRoutes=require('./routes/usersApi')
const countriesRoutes=require('./routes/countryApi')
 
const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
 }
 mongoose.connect(process.env.DB_CONNECT,connectionParams)
.then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(`connection error: ${err}`)
})
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*"),
    res.header("Access-Control-Allow-Methods","*")
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    next();
});
app.use('/users',usersRoutes);
app.use('/countries',countriesRoutes);
app.listen(3004,()=>{console.log("app is listening on port 3004")});
app.use((req,res,next)=>{
    const error=new Error("Not Found");
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        } 
    }) 
});

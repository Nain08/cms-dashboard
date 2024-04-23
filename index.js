var express=require('express');
var app=express();
var cors=require('cors');

const dbConnect=require('./config/dbConnect')
const userRouter=require('./routes/UserRoutes')
const categoryRouter=require('./routes/CategoryRoutes')
const pageRouter=require('./routes/PageRoutes')

dbConnect();
app.use(cors());
app.use(express.json());
app.use('/user',userRouter);
app.use('/category',categoryRouter);
app.use('/page',pageRouter);

var port=8080;
app.listen(port,()=>{
    console.log('Listening on port ',port);
})
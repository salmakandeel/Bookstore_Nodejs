
const express = require('express');
const adminRouter = require('./src/routers/adminRouter');
 const userRouter = require('./src/routers/userRouter');
const bookRouter=require('./src/routers/bookRouter')

const app = express();
const port = 3000;


app.use(express.json());
app.use(adminRouter);
 app.use(userRouter);
app.use(bookRouter)

app.listen(port, ()=>{
    console.log('Server is on port: ',port);
});




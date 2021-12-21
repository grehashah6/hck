const express = require('express') 
const cors = require("cors");
require('./db/mongoose')
var Razorpay=require("razorpay");
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const cartRouter = require('./routers/cart')
const orderRouter = require('./routers/order')
const razRouter = require('./routers/razorpay')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4000
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

app.use(express.json())
//app.use(bodyParser.urlencoded({extended:true}))
//app.use('/uploads', express.static('./public'));
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/payment',razRouter)
app.use('/api/order',orderRouter)












app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
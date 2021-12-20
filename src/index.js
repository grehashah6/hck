const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const cartRouter = require('./routers/cart')
const orderRouter = require('./routers/order')

const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
//app.use(bodyParser.urlencoded({extended:true}))
//app.use('/uploads', express.static('./public'));
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
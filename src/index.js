const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/uploads', express.static('./public'));
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
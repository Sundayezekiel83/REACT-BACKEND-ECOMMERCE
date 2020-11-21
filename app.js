const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const expressValidator = require('express-validator')

require('dotenv').config()
authRoutes = require('./routes/auth')
userRoutes = require('./routes/userRoutes')
categoryRoutes = require('./routes/categoryRoutes')
productRoutes = require('./routes/productRoutes')
orderRoutes = require('./routes/orderRoute')
braintreeRoutes = require('./routes/braintreeRoutes')


const app = express()



//db
mongoose.connect(process.env.DATABASE, {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true,})
.then(()=>console.log('database is connected'))
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cookieParser())


//Routes middlewares
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use('/api', orderRoutes)
app.use("/api", braintreeRoutes)
//error handler
 
const port = process.env.PORT || 8080

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
}) 
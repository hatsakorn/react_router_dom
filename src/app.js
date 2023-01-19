// const {sequelize} = require('./models')
// sequelize.sync({force:true})

const express = require('express')
require('dotenv').config()
const authRoute = require('./routes/authRoute')
const todoRoute = require('./routes/todoRoute')
const notFoundMiddleware = require('./middlewares/notFound')
const errMiddleware = require('./middlewares/error')
const authenticationMiddleware = require('./middlewares/authenticate')
const cors = require('cors')

const app = express()

//cors middleware set response header to allow cross origin
app.use(cors())

//body parser middleware
app.use(express.json())

//auth router middleware
app.use('/auth',authRoute)
app.use('/todos',authenticationMiddleware,todoRoute)

app.use((req,res,next)=>{
    next(new Error('test error middleware'))
})

//404 not found middleware
app.use(notFoundMiddleware)

//500 error handling middleware
app.use(errMiddleware)

const port = process.env.PORT || 8000;
app.listen(8013,()=>console.log('server running on port '+ port))
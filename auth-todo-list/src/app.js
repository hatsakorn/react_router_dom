const express = require('express')

const notFoundMiddleware = require('./middlewares/notFound')
const errMiddleware = require('./middlewares/error')
const app = express()

//body parser middleware
app.use(express.json())

app.use((req,res,next)=>{
    next(new Error('test error middleware'))
})

//404 not found middleware
app.use(notFoundMiddleware)

//500 error handling middleware
app.use(errMiddleware)

app.listen(8013,()=>console.log('server running on port 8013'))
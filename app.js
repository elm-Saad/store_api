require('dotenv').config()

const express = require('express')
const app = express()
const connectDB = require('./db/connect')

const productsRoutes = require('./routes/routes')

//middleware
app.use(express.static('./public'))

app.use(express.json())
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

//Routes
app.get('/',(req,res)=>{
    res.send('this is the home page')
})

// api routes
app.use('/api/v1/products',productsRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT | 5000

const start = async ()=>{
    try {
        // connect to DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log('server is listening on port ' + port)
        })
    } catch (error) {
        console.log('server error: ' + error)
    }
}

start()
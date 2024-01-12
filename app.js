require('dotenv').config()

const express = require('express')
const app = express()

//middleware
app.use(express.json())
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

//Routes
app.get('/',(req,res)=>{
    res.send('this is the home page')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT | 5000

const start = async ()=>{
    try {
        // connect to DB
        app.listen(port,()=>{
            console.log('server is listening on port ' + port)
        })
    } catch (error) {
        console.log('server error: ' + error);
    }
}

start()
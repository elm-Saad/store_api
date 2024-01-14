const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'product name must be provided']
    },
    price:{
        type:Number,
        required:[true,'product price must be provided']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default: 7
    },
    createdAT:{
        type:Date,
        default: Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['SmartHome Appliances','TechGuru','InnoTech','GadgetMasters'],
            message:'{VALUE} is not supported',//handle error 
        },
    },

})


module.exports = mongoose.model('Product',productSchema)

/**
 * [
  {
    "companyName": "SmartHome Appliances",
    "location": "Silicon Valley, USA",
    "foundedYear": 2010,
    "CEO": "John Techerson"
  },
  {
    "companyName": "TechGuru",
    "location": "San Francisco, USA",
    "foundedYear": 2008,
    "CEO": "Laura Innovista"
  },
  {
    "companyName": "InnoTech",
    "location": "Seoul, South Korea",
    "foundedYear": 2012,
    "CEO": "Kim Innovator"
  },
  {
    "companyName": "GadgetMasters",
    "location": "Tokyo, Japan",
    "foundedYear": 2015,
    "CEO": "Yuki Techimoto"
  }
]

 */

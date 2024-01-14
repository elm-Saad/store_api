const product = require('../models/product')


// static
const getALLproducts = async (req,res)=>{
    // get all products
    const AllProducts = await product.find({})
    res.status(200).json({AllProducts})
}

//
const getProducts = async (req,res)=>{
    // search Query Params filtering
    //?name=.&....
    
    const {featured,company,name,sort,fields,numericFilters} = req.query
    const queryObject = {}

    if(featured){
        //set featured to queryObject
        queryObject.featured = (featured === 'true')?true:false
    }
    if(company){
        queryObject.company = company
    }

    if(name){
        queryObject.name = {$regex: name, $options:'i'}
    }

    // numericFilters logic > < = ...

    /**nard coded =>  .find({price:{$gt:10}}) */
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let MongooseFilters = numericFilters.replace(
            regEx,
            (match) => `_${operatorMap[match]}_`
        )
        //set option for just numbers to have numericFilters
        const options = ['price','rating']

        MongooseFilters = MongooseFilters.split(',').forEach(element => {
            //price_$gt_40 
            const [field,operator,value]=element.split('_')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
                /**
                 * {
                 *  price:{'$gt': 40}
                 * }
                 */
            }
        })
    }


    let result = product.find(queryObject)

    /** sorting logic */
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt') // default sort
    }

    // select options => return just the selected props
    if(fields){
        const selectedList = fields.split(',').join(' ')
        result = result.select(selectedList)
    }

    // Skip & Limit => pagination 

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    /**
     * pagination logic => skip number of items base on the page requested
     */
    const skip = (page-1)*limit

    result = result.skip(skip).limit(limit)


    const products = await result
    res.status(200).json({products, nbHits: products.length})
}


module.exports = {getALLproducts,getProducts}
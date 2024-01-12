const express = require('express')
// create router
const router = express.Router()
//
const { getProducts, getALLproducts } = require('../controllers/products')


router.route('/').get(getProducts)
router.route('/all').get(getALLproducts)


module.exports = router

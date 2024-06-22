import Product from '../Models/Product.js'

//http://localhost:4000/api/v1/product/
const allProducts = async (req, res) => {
  try {
    const products = await Product.find() // Query to get all product
    res.status(200).json({ success: true, result: products })
  } catch (error) {
    next('Server Error while fetching data')
  }
}

// http://localhost:4000/api/v1/product/category/Female
const category = async (req, res) => {
  try {
    const category = req.params.category // Extract category from URL parameters
    const products = await Product.find({ category }) // Query to get products by category
    res.status(200).json({ success: true, result: products })
  } catch (error) {
    next('Server Error while fetching data')
  }
}

// http://localhost:4000/api/v1/product/size/Medium
const filterBySize = async (req, res) => {
  try {
    const size = req.params.size // Extract category from URL parameters
    const products = await Product.find({ size }) // Query to get products by category
    res.status(200).json({ success: true, result: products })
  } catch (error) {
    next('Server Error while fetching data')
  }
}

// http://localhost:4000/api/v1/product/filterByPrice?minPrice=0&maxPrice=999999
const filterByPrice = async (req, res) => {
  try {
    const minPrice = parseFloat(req.query.minPrice) // Extract minPrice from query parameters
    const maxPrice = parseFloat(req.query.maxPrice) // Extract maxPrice from query parameters

    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid price values' })
    }

    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice } // Query to filter products by price range
    })

    res.status(200).json({ success: true, result: products })
  } catch (error) {
    next('Server Error while fetching data')
  }
}

//http://localhost:4000/api/v1/product/add
const add = async (req, res) => {
  try {
    await Product.create(req.body) // Add new product
    res.status(200).json({ success: true, result: 'Added successfully' })
  } catch (error) {
    next('Server Error while fetching data')
    console.log(error)
  }
}


//http:localhost:4000/api/v1/product/:productId
const productDetails = async ( req, res ) => {
  try {
    const productId = req.params.productId
    const product = await Product.findById(productId);
    if(!product) return res.status(404).json({ success: false, error: 'Product not found' })
    res.status(200).json({ success: true, result: product })
  }catch(error){
    next('Server Error while fetching data')
  }
}

export default { allProducts, category, filterBySize, filterByPrice, add,productDetails }

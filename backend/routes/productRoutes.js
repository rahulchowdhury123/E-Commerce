const express = require('express')
const router = express.Router()

const {getProducts,getproductById,getmaxSell,getadminProduct,
    deleteProduct,adminCreateProduct,
    adminUpdateProduct,adminUpload,adminDeleteProductImage} = require("../controllers/productController")
const {verifyIsLoggedIn, verifyIsAdmin}=require("../middleware/verifyAuthToken")
router.get("/", getProducts)
router.get("/category/:categoyName",getProducts)
router.get("/category/:categoyName/search/:searchQuery",getProducts)
router.get("/bestseller",getmaxSell) 
router.get("/search/:searchQuery",getProducts)

router.get("/get-one/:id",getproductById)

//admin
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.get("/admin",getadminProduct)
router.delete("/admin/:id",deleteProduct)
router.post("/admin",adminCreateProduct)
router.put("/admin/:id",adminUpdateProduct)
router.post("/admin/upload",adminUpload)
router.delete("/admin/image/:imagePath/:productId",adminDeleteProductImage)
module.exports = router

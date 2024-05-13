const express = require('express')
const router = express.Router()
const {getCategories,nextdata,deleteCategory,createAttribute} = require("../controllers/categoryController")
const {verifyIsLoggedIn, verifyIsAdmin}=require("../middleware/verifyAuthToken")


router.get("/", getCategories)

router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.post("/",nextdata)
router.delete("/:category",deleteCategory)
router.post("/category",createAttribute)
module.exports = router

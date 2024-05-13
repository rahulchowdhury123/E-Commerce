const connectDB = require("../config/db")
connectDB()

const categoryData = require("./categories")
const productData = require("./product")
const reviewData = require("./review")
const userData = require("./user")
const orderData = require("./order")
const Category = require("../models/CategoryModel")
const Product = require("../models/productmodel")
const Review = require("../models/ReviewModel")
const Users = require("../models/UserModel")
const Orders = require("../models/OrderModel")

const importData = async () => {
    try {
        await Category.collection.dropIndexes()
        await Product.collection.dropIndexes()

        await Category.collection.deleteMany({})
        await Product.collection.deleteMany({})
        await Review.collection.deleteMany({})
        await Users.collection.deleteMany({})
        await Orders.collection.deleteMany({})
        if (process.argv[2] !== "-d") {
            await Category.insertMany(categoryData)
            const reviews = await Review.insertMany(reviewData)
            const sampleProducts = productData.map((product) => {
                reviews.map((review) => {
                    product.reviews.push(review._id)
                })
                return { ...product }
            })
            await Product.insertMany(sampleProducts)
            await Users.insertMany(userData)
            await Orders.insertMany(orderData)

            console.log("Seeder data proceeded successfully")
            process.exit()
            return;
        }
        console.log("Seeder data deleted successfully")
        return;

    } catch (error) {
        console.error("Error while proccessing seeder data", error)
        process.exit(1);
    }
}
importData()


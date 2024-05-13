const Product = require("../models/productmodel")
const reqproduct = require("../config/pagination")
const imageValidate=require("../utils/imageValidate")

const getProducts = async (req, res, next) => {

    try {

        let query = {}
        let querycondition = false
        let sort_price = {}
        let sort_rating = {}
        let categorycondition = {}



        let sort = {}
        const pagenum = Number(req.query.pagenumber) || 1
        const sortoption = req.query.sort || ""
        if (sortoption) {
            const sorting = sortoption.split("_")
            sort = { [sorting[0]]: Number(sorting[1]) }
        }

        if (req.query.price) {
            querycondition = true
            sort_price = { price: { $lte: Number(req.query.price) } }

        }
        if (req.query.rating) {
            querycondition = true
            sort_rating = { rating: { $in: req.query.rating.split(',') } }
        }
        const categoryName = req.params.categoryName || ""
        if (categoryName) {
            querycondition = true
            let a = categoryName.replaceAll(",", "/")
            console.log(a)
            var regexp = new RegExp("^" + a)
            console.log(regexp)
            categorycondition = { category: regexp }
        }
        if (req.query.category) {
            querycondition = true
            let a = req.query.category.split(',').map((items) => {
                if (items) {
                    return new RegExp("^" + items)
                }
            })
            console.log(a)
            categorycondition = { category: { $in: a } }
        }

        let attrsQueryCondition = [];
        if (req.query.attrs) {
            // attrs=RAM-1TB-2TB-4TB,color-blue-red
            // [ 'RAM-1TB-4TB', 'color-blue', '' ]
            querycondition = true;
            attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
                if (item) {
                    let a = item.split("-");
                    console.log(a)
                    let values = [...a];
                    console.log(values)
                    values.shift(); // removes first item
                    console.log(values)
                    let a1 = {
                        attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
                    };
                    acc.push(a1);
                    // console.dir(acc, { depth: null })
                    return acc;
                } else return acc;
            }, []);
            //   console.dir(attrsQueryCondition, { depth: null });

        }

        let searchoption = {}
        const searchQuery = req.params.searchQuery || ""
        let select = {}
        if (searchQuery) {
            querycondition = true;
            searchoption = { $text: { $search: searchQuery } }
            select = {
                score: { $meta: "textScore" }
            }
            sort = { score: { $meta: "textScore" } }
        }

        console.log(searchQuery)


        if (querycondition) {

            query = { $and: [sort_price, sort_rating, categorycondition, ...attrsQueryCondition, searchoption] }
        }







        const products = await Product.find(query).select(select).skip(reqproduct * (pagenum - 1)).sort(sort).limit(reqproduct)
        res.json({ produc: products })

    }
    catch (error) {
        next(error)
    }

}

const getproductById=async(req,res,next)=>{
    try{
        const product=await Product.findById(req.params.id).populate("reviews").orFail()
        res.json(product) 
    }
    catch(error){
        next(error)
    }
    

}
const getmaxSell=async(req,res,next)=>{
    try{

        const product=await Product.aggregate([
            {$sort:{category:1,sales:-1}},
            {$group:{_id:"$category",doc_with_max_sales:{$first:"$$ROOT"}}},
            {$replaceWith:"$doc_with_max_sales"},
            {$project:{_id:1,name:1,category:1,images:1,description:1,sales:1}},
            {$limit:3}

        ])
        res.json(product)

    }
    catch(error){
        next(error)
    }
}


//admin
const getadminProduct=async(req,res,next)=>{
    try{
        const products=await Product.find({}).sort({category:1}).select("name price category reviews")
        res.json(products)
    }
    catch(error){
        next(error)
    }
}
const deleteProduct=async(req,res,next)=>{
    try{
            const product=await Product.findById(req.params.id).orFail()
           await product.remove()
            res.json({product:"deleted"})
    }
    catch(error){
        next(error)
    }
}
const adminCreateProduct=async(req,res,next)=>{
    try{
        const product=new Product()
        const {name,category,description,count,price,attributesTable}=req.body
        product.name=name
        product.description=description
        product.category=category
        product.price=price
        product.count=count
        if(attributesTable.length>0){
            attributesTable.map((items)=>{
                product.attrs.push(items)
            })
        }
        await product.save()
        res.json({id:product._id,name:product.name,description:product.description,count:product.count})
    }
    catch(error){
        next(error)
    }
}
const adminUpdateProduct = async (req, res, next) => {
    try {
       const product = await Product.findById(req.params.id).orFail()
       const { name, description, count, price, category, attributesTable } = req.body
       product.name = name || product.name
       product.description = description || product.description 
       product.count = count || product.count
       product.price = price || product.price
       product.category = category || product.category
       if( attributesTable.length > 0 ) {
           product.attrs = []
           attributesTable.map((item) => {
               product.attrs.push(item)
           })
       } else {
           product.attrs = []
       }
       await product.save()
       res.json({
          message: "product updated" 
       })
    } catch(err) {
        next(err)
    }
}


const adminUpload = async (req, res, next) => {
    try {
      if (!req.files || !!req.files.images === false) {
        return res.status(400).send("No files were uploaded.");
      }
  
      const validateResult = imageValidate(req.files.images);
      if (validateResult.error) {
        return res.status(400).send(validateResult.error);
      }
  
      const path = require("path");
      const { v4: uuidv4 } = require("uuid");
      const uploadDirectory = path.resolve(
        __dirname,
        "../../frontend",
        "public",
        "images",
        "products"
      );
  
      let product = await Product.findById(req.query.productId).orFail();
  
      let imagesTable = [];
      if (Array.isArray(req.files.images)) {
        imagesTable = req.files.images;
      } else {
        imagesTable.push(req.files.images);
      }
  
      for (let image of imagesTable) {
        var fileName = uuidv4() + path.extname(image.name);
        var uploadPath = uploadDirectory + "/" + fileName;
        product.images.push({ path: "/images/products/" + fileName });
        image.mv(uploadPath, function (err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
      }
      await product.save();
      return res.send("Files uploaded!");
    } catch (err) {
      next(err);
    }
  };
  
  const adminDeleteProductImage = async (req, res, next) => {
    try {
      const imagePath = decodeURIComponent(req.params.imagePath);
      const path = require("path");
      const finalPath = path.resolve("../frontend/public") + imagePath;
  
      const fs = require("fs");
      fs.unlink(finalPath, (err) => {
        if (err) {
          res.status(500).send(err);
        }
      });
      await Product.findOneAndUpdate(
        { _id: req.params.productId },
        { $pull: { images: { path: imagePath } } }
      ).orFail();
      return res.end();
    } catch (err) {
      next(err);
    }
  };



module.exports = {getProducts,getproductById,getmaxSell,getadminProduct,
    deleteProduct,adminCreateProduct,adminUpdateProduct,adminUpload,adminDeleteProductImage} 

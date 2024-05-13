const Category=require("../models/CategoryModel")
const getCategories = async(req, res,next) => {
    try{
        const categories=await Category.find({}).sort({name:"asc"}).orFail()
        res.json(categories)
    }
    catch(error){
        next(error)
    }
}
const nextdata=async(req,res,next)=>{
    try{
        const {category}=req.body
        if(!category){
            res.status(400).send("category name not provided")
        }
        const categoryexist=await Category.findOne({name:category})
        if(categoryexist){
            res.status(400).send("Category already exist")
        }
        else{
            const newcategory=await Category.create({name:category})
            res.status(201).send({a:newcategory})
        }
        

    }
    catch(error){
        next(error)
    }
}
const deleteCategory=async(req,res,next)=>{
        try{

            const category=req.params.category
            if(!category){
                res.status(400).send("error")
            }
            if(category!=="Choose Category"){
                const categoryexist=await Category.findOne({name:decodeURI(category)}).orFail()
                await categoryexist.remove()
                res.json({categorydeleted:true})

            }


        }
        catch(error){
            next(error)
        }
}
const createAttribute=async(req,res,next)=>{
    const {key,value,categoryName}=req.body
    if(!key || !value || !categoryName){
        return res.status(400).send("All fields are required")
    }
    try{
        const category=categoryName.split('/')[0]
        const categoryexist=await Category.findOne({name:category}).orFail()
        console.log(categoryexist)
        if(categoryexist){
            if(categoryexist.attrs.length>0){
                var keyexist=false;
                categoryexist.attrs.map((item,ix)=>{
                    if(item.key===key){
                        keyexist=true;
                        var copyval=[...categoryexist.attrs[ix].value]
                        copyval.push(value)
                        var finalval=[...new Set(copyval)]
                        categoryexist.attrs[ix].value=finalval
                    }
                })  
                if(!keyexist){
                    categoryexist.attrs.push({key:key,value:[value]})
                }      
            }
            else{
                categoryexist.attrs.push({key:key,value:[value]})
            }
            await categoryexist.save()
            return res.status(201).json({category:categoryexist})
        }




    }
    catch(error){
        next(error)

    }
}



module.exports = {getCategories,nextdata,deleteCategory,createAttribute}

const User = require("../models/UserModel")
const Review = require("../models/ReviewModel");
const Product = require("../models/productmodel");
const { hashPassword, comparePassword } = require("../utils/hash")
const genAuthToken = require("../utils/userAuthToken")
const getUsers = async (req, res, next) => {
    try {
        const user = await User.find({})
        return res.send(user);

    }
    catch (error) {
        next(error)
    }
}
const registerUser = async (req, res, next) => {
    try {
        const { name, lastName, password, email } = req.body;
        if (!(name && password && lastName && email)) {
            return res.status(400).send("All fields are required")
        }
        const user = await User.findOne({ email: email })
        const pass = hashPassword(password)
        if (!user) {
            const users = await User.create({ name: name, lastName: lastName, password: pass, email: email });

            // users.save();
            return res.cookie("access_token", genAuthToken(users.id, users.name, users.lastName, users.email, users.isAdmin), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            }).
                json("user registered")
        }
        return res.send("User already exist")

    }
    catch (error) {
        next(error)
    }
}
const userLogin = async (req, res, next) => {
    try {
        const { email, password, do_not_logout } = req.body;
        if (!(email && password)) {
            return res.status(400).send("All fields are required")
        }
        const user = await User.findOne({email:email})
        
        
        if (!user) {
            return res.status(400).send("User does not exist")
        }
        if (!comparePassword(password,user.password)) {
            return res.status(400).send("Credentials not matched")
        }
        let cookieparam={
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"

        }
        if(do_not_logout){
            cookieparam={...cookieparam,maxAge:1000*60*60*24*7}
        }

        return res.cookie("access_token",genAuthToken(user.id, user.name, user.lastName, user.email, user.isAdmin),cookieparam).json({id:user.id,name:user.name,password:user.password,email:user.email})

    }
    catch (error) {
        next(error)
    }



}
const updateUserProfile = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).orFail();
      user.name = req.body.name || user.name;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.phoneNumber = req.body.phoneNumber;
      user.address = req.body.address;
      user.country = req.body.country;
      user.zipCode = req.body.zipCode;
      user.city = req.body.city;
      user.state = req.body.state;
      if (req.body.password !== user.password) {
        user.password = hashPassword(req.body.password);
      }
      await user.save();
  
      res.json({
        success: "user updated",
        userUpdated: {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } catch (err) {
      next(err);
    }
  };
  const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).orFail();
        return res.send(user);
    } catch(err) {
        next(err)
    }
}
const writeReview = async (req, res, next) => {
    try {
        // get comment, rating from request.body:
        // const session = await Review.startSession();
        const { comment, rating } = req.body;
        // validate request:
        if (!(comment && rating)) {
            return res.status(400).send("All inputs are required");
        }

        // create review id manually because it is needed also for saving in Product collection
        const ObjectId = require("mongodb").ObjectId;
        let reviewId = ObjectId();
        // session.startTransaction();
        await Review.create([
            {
                _id: reviewId,
                comment: comment,
                rating: Number(rating),
                user: { _id: req.user._id, name: req.user.name + " " + req.user.lastName },
            }
        ])
        const product = await Product.findById(req.params.productId).populate("reviews")
        console.log(req.user._id)
        const alreadyreviewed=product.reviews.find((ix)=>ix.user._id.toString()===req.user._id.toString())
        if(alreadyreviewed){
            // await session.abortTransaction();
            // session.endSession();
            return res.status(400).send("User already review")
        }
        // res.send(product)
        let prc = [...product.reviews];
        prc.push({ rating: rating });
        product.reviews.push(reviewId);
        if (product.reviews.length === 1) {
            product.rating = Number(rating);
            product.reviewsNumber = 1;
        } else {
            product.reviewsNumber = product.reviews.length;
            product.rating = prc.map((item) => Number(item.rating)).reduce((sum, item) => sum + item, 0) / product.reviews.length;
        }
        await product.save();
        // await session.commitTransaction();
        // session.endSession();
        return res.send('review created') 
        
       
    } catch (err) {
        // await session.abortTransaction();
        next(err)   
    }
}
const getUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id).select("name lastName email isAdmin").orFail()
        return res.send(user)
    }
    catch(err){
        next(err)
    }
}
const updateUser = async (req, res, next) => {
    try {
       const user = await User.findById(req.params.id).orFail(); 

        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        await user.save();

        res.send("user updated");

    } catch (err) {
       next(err); 
    }
}
const deleteUser = async (req, res, next) => {
    try {
       const user = await User.findById(req.params.id).orFail();
       await user.remove(); 
       res.send("user removed");
    } catch (err) {
        next(err);
    }
}

module.exports = { getUsers, registerUser, userLogin,updateUserProfile,getUserProfile,writeReview,getUser,updateUser ,deleteUser}

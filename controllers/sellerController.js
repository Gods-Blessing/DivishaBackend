const jwt = require('jsonwebtoken');
const User = require('../models/Seller');
const Store = require('../models/Store');




// signing up
module.exports.signup = async function(req,res){
    try{
        console.log(req.body);
        const user =await User.findOne({email:req.body.email});
    
        if(user){
            return res.status(200).json({
                message:"User already exist"
            })
        }
    
        if(req.body.password != req.body.confirmpassword){
            return res.status(200).json({
                message:"Password and confirm password do not match"
            })
        }
    
        const createduser = await User.create(req.body);
        // console.log(createduser);
    
        return res.status(200).json({
            message:"user created"
        })

    }catch(error){
        return res.status(404).json({
            message:"error"
        })
    }
}



module.exports.home = async function(req,res){
    console.log(req.user)
    let user = await User.findById(req.user);
    await (await user.populate('store')).populate({path:'store',populate:{path:'products'}})
    // console.log(user)
    let newlist =[]
    let arraylist = user.store.products.map((data)=>newlist.push(data));
    // console.log(newlist);
    if(user){
        let {username, list} = user;
        return res.status(200).json({
            message:{
                user:user.email,
                store:user.store,
                products: newlist
            }
        })
    }

    return res.status(200).json({
        message:"error"
    })

}


module.exports.signin =async function(req,res){
    try {
        let user = await User.findOne({username:req.body.email});
        if(user){
            if(user.password != req.body.password){
                return res.status(422).json({message:"error"})
            }
            const token = jwt.sign({id:user.id},"gameison",{ expiresIn: '1d' })
            // console.log(token);
            
            res.set("authorization",token);
            user.password = undefined;
            return res.status(200).json({
                message:{
                    user:user,
                    token:token
                }
            })
        }
        
    } catch (error) {
        return res.status(404).json({
            message:"error"
        })
    }
}








// registering store
module.exports.register =async function(req,res){
    
    const store = await Store.create({
        seller:req.user._id,
        address: req.body.content,
        gst:req.body.gst,
        logo:req.file.path.substring(47),
        timing:req.body.timing,
    });

    await store.populate('seller');

    const user = await User.findById(req.user._id);

    user.store = store._id;

    user.save();
    if(store){
            return res.status(200).json({
                message:{
                    data:store
                }
            })
    }

        return res.status(200).json({
            error:"Post not created"
        })

}



// adding products
module.exports.AddingProduct =async function(req,res){

    const product =await Product.create({
        productname:req.body.name,
        mrp:req.body.mrp,
        sp:req.body.sp,
        qty:req.body.qty,
    });



    return res.status(200).json({
        message:'product added'
    })
}




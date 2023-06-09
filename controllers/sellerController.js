const jwt = require('jsonwebtoken');
const User = require('../models/Seller');




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









module.exports.register =async function(req,res){
    let contenttype;
    if(req.file.mimetype == "video/mp4"){
        contenttype = "video"
    }else{
        contenttype = "img"
    }
    
    const post = await Post.create({
        content: req.body.content,
        user:req.user._id,
        imgvid:req.file.path.substring(47),
        contenttype: contenttype
    });

    await post.populate('user');

    

    // console.log(req.file.path.substring(47))
    // console.log(post)
    const user =await User.findById(req.user._id);
    // console.log(user);

    user.posts.push(post);

    user.save();
    if(req.xhr){
        if(post){
            return res.status(200).json({
                message:{
                    data:post
                }
            })
        }

        return res.status(200).json({
            error:"Post not created"
        })
    }
    // console.log(req.file);
    return res.redirect("back");
}





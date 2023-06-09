const express = require('express');
const fs = require('fs');
const path = require('path');
const multer  = require('multer');
const router = express.Router();
const sellerController = require('../controllers/sellerController');


// console.log("her is the dirname====", __dirname);
const storage = multer.diskStorage({
    destination:function (req, file, cb) {
          if(!fs.existsSync(path.join(__dirname,"..",`/uploads/imageposts/${req.user.name}`))){
            fs.mkdir(path.join(__dirname,"..",`/uploads/imageposts/${req.user.name}`),{recursive:true},(err)=>{
              if(err){
                console.log("error while making the folder");
                return;
              }
            })
          
           
          cb(null, path.join(__dirname,'..',`/uploads/imageposts/${req.user.name}`))
          
        }
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now() + '-' + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage, limits: {fileSize:200000000} })

router.post('/createpost', upload.single('imgvid'),postController.register);
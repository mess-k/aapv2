require("dotenv").config();
sessionKey = process.env.SESSION
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require('multer')
const db = require("../config/db");
const path = require('path')
const bodyParser = require('body-parser');
const cors = require("cors");
const { response } = require("express");

router.use(cookieParser());

router.use(
    session({
        key: "shelterId",
        secret: `${sessionKey}`,
        resave: false,
        saveUninitialized: false,
        cookie: {
        expires: 60 * 60 * 24,
        },
    })
);

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../../aapv2/client/public/images/PetProfile')     
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
})

var upload = multer({
    storage: storage
});


////////////////////CREATE///////////////

router.post("/createprofile", upload.single('profilepic'),(req,res)=>{
    const shelter_id = req.body.shelter;
    const name = req.body.name;
    const type = req.body.type;
    const age = req.body.age;
    const desc = req.body.description
    const pic = "/images/PetProfile/"+req.file.filename
    

    
    db.query(
        "INSERT INTO profiles set name=?, age=?, type=?, description=?, img_url=?, uploader_id=?",[name,age,type,desc,pic,shelter_id],(err,result)=>{
            if(err){
                console.log({err:err})
            }
            if(result){
                res.send(result)
                // console.log(result)
            }
        }
    )
})





module.exports = router;
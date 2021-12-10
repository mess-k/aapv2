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
const { profile } = require("console");

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
    const desc = req.body.desc
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

///////////////////////////FIND/////////////////////////////

router.get("/find", (req,res)=>{
    const proID = req.query.id
    console.log(proID)
    db.query(
        "SELECT * FROM profiles WHERE id=?",[proID],(err, result)=>{
            if(result){
                res.send(result)
                console.log(result)
            }
        }
    )
})

/////////////////////////UPDATE////////////////////////////////////


router.post("/update", (req,res) => {
    const pro_id = req.body.id;
    const name = req.body.name;
    const type = req.body.type;
    const age = req.body.age;
    const desc = req.body.desc
    db.query(
        "SELECT * FROM profiles WHERE id=?",[pro_id],(err,result)=>{
            if(err){
                console.log({err:err})
            }
            if(result){
                db.query(
                    "UPDATE profiles SET name=?, age=?, type=?, description=? WHERE id=?",[name,age,type,desc,pro_id],(err,response)=>{
                        if(response)
                        res.send("success!")
                    }
                )
            }
        }
    )

})

router.post("/update/w/pic", upload.single('profilepic'),(req,res)=>{
    const pro_id = req.body.id;
    const name = req.body.name;
    const type = req.body.type;
    const age = req.body.age;
    const desc = req.body.desc
    const pic = "/images/PetProfile/"+req.file.filename
    
    db.query(
        "SELECT * FROM profiles WHERE id=?",[pro_id],(err,result)=>{
            if(err){
                console.log({err:err})
            }
            if(result){
                db.query(
                    "UPDATE profiles SET name=?, age=?, type=?, description=?, img_url=? WHERE id=?",[name,age,type,desc,pic,pro_id],(err,response)=>{
                        if(response)
                        res.send("success!")
                    }
                )
            }
        }
    )
})


module.exports = router;
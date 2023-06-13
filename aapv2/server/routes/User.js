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
const { off } = require("process");
const { appendFile } = require("fs");

router.use(cookieParser());

router.use(
    session({
        key: "userId",
        secret: `${sessionKey}`,
        resave: false,
        saveUninitialized: false,
    })
);



var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../../aapv2/client/public/images')     
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
})

var upload = multer({
    storage: storage
});

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../../aapv2/client/public/images/PetProfile')     
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now()+`${file.originalname}`)
    }
})
var upload = multer({
    storage: storage
});

var postStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../../aapv2/client/public/images/PetProfile/Post')     
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now()+`${file.originalname}`)
    }
})
var postUpload = multer({
    storage: postStorage
});


////////////////////////REGISTER///////////////////////////////

router.post("/register", (req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword

    db.query(
        "SELECT * FROM users WHERE email = ?",
        email,(err,result) => {
            if (result.length>0) {
                res.send({message:"This email is already associated with another account" })
            }
            if(result.length <= 0 ){
                if (password != confirmPassword){
                    res.send({pwMessage:"Passwords do not match" })
                }
                if (password == confirmPassword) {
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        db.query(
                            "INSERT INTO users (first_name,last_name,email,password) VALUES (?,?,?,?)",[firstName,lastName,email,hash],
                            (err, results)=>{
                                if(results){
                                    req.session.user = results;
                                    res.send(results)
                                }
                                
                            }
                        )
                    })
                }
            }
        }
    )
});

router.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

/////////////////////////////////LOGIN/////////////////////////////

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ?;",
        email,
        (err, result) => {
            if (result.length<=0) {
            res.send({ message: "No account associated with this email" });
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
                req.session.user = result;
                
                res.send(result);
            } else {
                res.send ({ EPMessage: "Wrong email/password combination!" });
            }
            });
        }}
    );
});

///////////////////////UPDATE///////////////////////////////////

router.put("/edit", (req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    // const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword


    if (req.session.user){
        db.query(
            "SELECT * FROM users WHERE id = ?", 
            req.session.user[0].id, (err,result) => {
                if (err) {
                    res.send({ err: err })
                    console.log("email asscoicated with another account");
                }
                if(result){
                    db.query(
                        "UPDATE users SET first_name=?, last_name=?, email=? WHERE id = ?;",[firstName,lastName,email,req.session.user[0].id],(err, results)=>{
                            if(err){
                            console.log(err)
                            res.send(results)
                            }
                            if(results){
                                db.query(
                                    "SELECT * FROM users WHERE id = ?",req.session.user[0].id, (err,final)=>{
                                        if(err){
                                        }
                                        if(final){
                                            req.session.user = final;
                                            res.send(results);
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        )
    }
})

///////////////////////////////////////////FIND//////////////
router.get("/find", (req,res)=>{
    const UID = req.query.id;

    db.query(
        "SELECT * FROM users WHERE id=?",[UID],(err,result)=>{
            if(result){
                res.send(result)
            }
        }
    )
})


router.put ("/edit/uploadPic", upload.single('profilepic'), (req,res) => {
    const imgsrc = "/images/PetProfile/"+req.file.filename
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    if (req.session.user){
        db.query(
            "SELECT * FROM users WHERE id = ?", 
            req.session.user[0].id, (err,results) => {
                if (err) {
                    res.send({ err: err })
                }
                if(results.length > 0 ){
                    db.query(
                        "UPDATE users SET first_name=?, last_name=?, email=?, img_url=? WHERE id = ?;",[firstName,lastName,email,imgsrc,req.session.user[0].id],(err,result)=>{
                            if(err){
                                console.log("something wrong with image upload")
                            }
                            if(result){
                                db.query(
                                    "SELECT * FROM users WHERE id = ?", req.session.user[0].id, (err,final) =>{
                                        req.session.user = final
                                        res.send(final)
                                    }
                                )
                            }
                        }
                    )
                }
            }
        )
    }
})

///////////////////////////////LIKES//////////////////////////////

router.post("/like",(req,res) =>{
    const postID = req.body.postID;
    const userID = req.session.user[0].id

    db.query(
        "INSERT INTO likes SET post_id=?, user_id=?;",[postID,userID],(err,result)=>{
            if(result){
                db.query(
                    "SELECT * FROM likes WHERE post_id=? AND user_id=?", [postID,userID],(err,result)=>{
                    if(result.length > 0){
                        res.send(true)
                    }
                    else{
                        res.send(false)
                    }
                    if(err){
                        console.log(err)
                    }
                })
            }
            if(err){
                console.log(err)
            }
        }
    )
})
router.delete("/like",(req,res) =>{
    const postID = req.query.id;
    const userID = req.session.user[0].id

    db.query(
        "DELETE FROM likes WHERE post_id=? AND user_id=?;",[postID,userID],(err,result)=>{
            if(result){
                
                db.query(
                    "SELECT * FROM likes WHERE post_id=? AND user_id=?", [postID,userID],(err,results)=>{
                    if(results.length > 0){
                        res.send(true)
                        
                    }
                    else{
                        res.send(false)
                    }
                    if(err){
                        console.log(err)
                    }
                })
            }
            if(err){
                console.log(err)
            }
        }
    )
})


router.get("/find/like", (req,res) => {
    const postID = req.query.id;
    const userID = req.session.user[0].id


    db.query(
        "SELECT * FROM likes WHERE post_id=? AND user_id=?", [postID,userID],(err,result)=>{
            if(result.length > 0){
                res.send(true)
            }
            else{
                res.send(false)
            }
        }
    )
})

////////////////////////////FOLLOW PROFILE////////////////////////////////////////////

router.get("/find/profile/follow", (req,res) => {
    const proID = req.query.id;
    const userID = req.session.user[0].id


    db.query(
        "SELECT * FROM user_pet_follows WHERE profile_id=? AND user_id=?", [proID,userID],(err,result)=>{
            if(result.length > 0){
                res.send(true)
            }
            else{
                res.send(false)
            }
            if(err){
                console.log(err)
            }
        }
    )
})

router.get("/find/profiles/follow", (req,res) => {
    const userID = req.session.user[0].id

    db.query(
        "SELECT b.profile_id as followID, b.user_id, a.id as proID, a.age,a.description ,a.name,a.uploader_id ,a.img_url FROM aap2.user_pet_follows as b join aap2.profiles as a on a.id = b.profile_id where b.user_id = ?", [userID],(err,result)=>{
            if(result){
                res.send(result)
            }
            else{
                res.send(false)
            }
            if(err){
                console.log(err)
            }
        }
        )
    })
    
    router.delete("/follow",(req,res) =>{
        const proID = req.query.id;
        const userID = req.session.user[0].id
    
        db.query(
            "DELETE FROM user_pet_follows WHERE profile_id=? AND user_id=?;",[proID,userID],(err,result)=>{
                if(result){

                    db.query(
                        "SELECT * FROM user_pet_follows WHERE profile_id=? AND user_id=?", [proID,userID],(err,results)=>{
                        if(results.length > 0){
                            res.send(true)
                        }
                        else{
                            res.send(false)
                        }
                        if(err){
                            console.log(err)
                        }
                    })
                }
                if(err){
                    console.log(err)
                }
            }
        )
    })

////////////////FOLLOW SHELTER/////////////////////////////////////
router.get("/find/shelter/follow", (req,res) => {
    const SID = req.query.id;
    const userID = req.session.user[0].id

    db.query(
        "SELECT * FROM user_shelters_follows WHERE shelter_id=? AND user_id=?", [SID,userID],(err,result)=>{
            if(result.length > 0){
                res.send(true)
            }
            else{
                res.send(false)
            }
            if(err){
                console.log(err)
            }
        }
        )
})

router.post("/follow",(req,res) =>{
    const proID = req.body.profileID;
    const userID = req.session.user[0].id

    db.query(
        "INSERT INTO user_pet_follows SET profile_id=?, user_id=?;",[proID,userID],(err,result)=>{
            if(result){
                db.query(
                    "SELECT * FROM user_pet_follows WHERE profile_id=? AND user_id=?", [proID,userID],(err,result)=>{
                    if(result.length > 0){
                        res.send(true)
                    }
                    else{
                        res.send(false)
                    }
                    if(err){
                        console.log(err)
                    }
                })
            }
            if(err){
                console.log(err)
            }
        }
    )
})

router.post("/follow/shelter",(req,res) =>{
    const proID = req.body.profileID;
    const userID = req.session.user[0].id

    db.query(
        "INSERT INTO user_shelters_follows SET shelter_id=?, user_id=?;",[proID,userID],(err,result)=>{
            if(result){
                db.query(
                    "SELECT * FROM user_shelters_follows WHERE shelter_id=? AND user_id=?", [proID,userID],(err,result)=>{
                    if(result.length > 0){
                        res.send(true)
                    }
                    else{
                        res.send(false)
                    }
                    if(err){
                        console.log(err)
                    }
                })
            }
            if(err){
                console.log(err)
            }
        }
    )
})

router.get("/find/shelters/follow", (req,res) => {
    const userID = req.session.user[0].id

    db.query(
        "Select a.shelter_id as followID, a.user_id, b.id as proID, b.name, b.img_url,b.email From aap2.user_shelters_follows as a join aap2.shelters as b on b.id = a.shelter_id where a.user_id = ?", [userID],(err,result)=>{
            if(result){
                res.send(result)
            }
            else{
                res.send(false)
            }
            if(err){
                console.log(err)
            }
        }
        )
    })

router.delete("/follow/shelter",(req,res) =>{
    const SID = req.query.id;
    const userID = req.session.user[0].id

    db.query(
        "DELETE FROM user_shelters_follows WHERE shelter_id=? AND user_id=?;",[SID,userID],(err,result)=>{
            if(result){
                db.query(
                    "SELECT * FROM user_shelters_follows WHERE shelter_id=? AND user_id=?", [SID,userID],(err,results)=>{
                    if(results.length > 0){
                        res.send(true)
                    }
                    else{
                        res.send(false)
                    }
                    if(err){
                        console.log(err)
                    }
                })
            }
            if(err){
                console.log(err)
            }
        }
    )
})

router.get("/notfollowing",(req,res)=>{
    const userID = req.session.user[0].id
    db.query(
        "SELECT a.id as proID, a.age  ,a.description ,a.name,a.uploader_id ,a.img_url   ,b.user_id as F_userID,b.profile_id as F_profile_id FROM aap2.profiles as a left join aap2.user_pet_follows as b on a.id = b.profile_id where b.user_id IS NULL or b.user_id NOT IN (?)ORDER BY RAND() LIMIT 6",[userID],(err,result)=>{
            if(result){
                res.send(result)
            }
        }
    )
})

////////////////////////////////POST//////////////////////////////////////////

router.post("/post",(req,res)=>{
    const context = req.body.context
    const profile = req.body.profile
    const user = req.body.user
    const date = req.body.date

    db.query(
        "INSERT INTO posts SET context=?, profile_id=?, user_id=?, created_at=?", [context,profile,user,date],(err,result)=>{
            if(result){
                console.log("HELL YEAH!")
            }
            if(err){
                console.log(err)
            }
        }
    )
})

router.post("/post/w/pic", postUpload.single("postFile"),(req,result) => {
    const context = req.body.context
    const profile = req.body.profile
    const user = req.body.user
    const date = req.body.date
    const pic = "/images/PetProfile/Post/"+req.file.filename

    db.query(
        "INSERT INTO posts SET context=?, post_url=?, profile_id=?, user_id=?, created_at=?", [context,pic,profile,user,date],(err,result)=>{
            if(result){
                console.log("HELL YEAH!")
            }
            if(err){
                console.log(err)
            }
        }
    )
})

/////////////////////////////////////////FIND POSTS/////////////////////////

router.get("/show/posts", (req,res) =>{
    const proID = req.session.user[0].id
    db.query(
        "SELECT * FROM posts where user_id=? ORDER BY id DESC",[proID],(err,result)=>{
            if(result){
                res.send(result)
            }
        }
    )
})


///////////////////////////////COMMENT///////////////////////////////
router.post("/postcomment",(req,res)=>{
    const postID = req.body.postID
    const comment = req.body.comment
    const date = req.body.date
    const user = req.session.user[0].id
    
    db.query(
        "INSERT INTO comments SET comment=?, usercom_id=?, comcreated_at=?,compost_id=?",[comment,user,date,postID],(err,result)=>{
            if(err){
                console.log(err)
            }
        }
    )
})

///////////////////////SHOW COMMENTS//////////////////////////
router.get("/show/comments",(req,res)=>{
    const postID = req.query.id

    db.query(
        "SELECT a.id as post_id,a.comment,a.sheltercom_id,a.usercom_id,a.comcreated_at,a.compost_id,b.id as s_id,b.name,b.img_url as s_img,c.id as u_id,c.first_name,c.last_name,c.img_url as u_img FROM aap2.comments as a left join aap2.shelters as b on a.sheltercom_id = b.id left join aap2.users as c on a.usercom_id = c.id WHERE a.compost_id = ? ORDER BY a.id",[postID],(err,result)=>{
            if(result){
                res.send(result)
            }
            if(err){
                console.log(err)
            }
        }
    )
})

///////////////////////FULL HOME POSTS/////////////////////////////

router.get("/following/posts", (req,res) => {
    const user = req.session.user[0].id

    db.query(
        "SELECT * FROM aap2.user_pet_follows join (select aap2.posts.id as post_id, aap2.posts.context,aap2.posts.post_url,aap2.posts.profile_id,aap2.posts.shelter_id,aap2.posts.user_id from aap2.posts) posts ON aap2.user_pet_follows.profile_id = aap2.posts.profile_id join aap2.profiles ON aap2.profiles.id = aap2.posts.profile_id Where aap2.user_pet_follows. user_id = ? Order by aap2.posts.post_id desc ",[user],(err,result) =>{
            if(result){
                res.send(result)
            }
            if(err){
                console.log(err)
            }
        }
    )
})


////////////////////LOGOUT////////////////////////////////

router.use("/logout",function(req,res){
    req.session.destroy(function(err) {
        res.send("logout")
    })
    
})


module.exports = router;
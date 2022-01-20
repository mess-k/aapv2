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
        key: "userId",
        secret: `${sessionKey}`,
        resave: false,
        saveUninitialized: false,
    })
);

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
                // console.log(req.session.user);
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
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword

    if (req.session.user){
        db.query(
            "SELECT * FROM users WHERE id = ?", 
            req.session.user[0].id, (err,result) => {
                if (err) {
                    res.send({ err: err })
                    console.log("email asscoicated with another account");
                }
                if(result.length > 0 ){
                    if (password == confirmPassword) {
                        bcrypt.hash(password, saltRounds, (err, hash) => {
                            if (err) {
                                console.log("after hash before query");
                            }
                            db.query(
                                "UPDATE users SET first_name=?, last_name=?, email=?, password=? WHERE id = ?;",[firstName,lastName,email,hash,req.session.user[0].id],
                                (err, results)=>{
                                    if(err){
                                    console.log(err)
                                    res.send(results)
                                    }
                                    if(results){
                                        db.query(
                                            "SELECT * FROM users WHERE id = ?",req.session.user[0].id, (err,results)=>{
                                                if(err){
                                                }
                                                req.session.user = results;
                                                // console.log(results);
                                                res.send(result);
                                            }
                                        )
                                    }
                                }
                            )
                        })
                    }
                }
            }
        )
    }else{
        console.log("no match")
    }
})


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

router.put ("/edit/uploadPic", upload.single('profilepic'), (req,res) => {
    const imgsrc = "/images/"+req.file.filename

    if (req.session.user){
        db.query(
            "SELECT * FROM users WHERE id = ?", 
            req.session.user[0].id, (err,results) => {
                if (err) {
                    res.send({ err: err })
                }
                if(results.length > 0 ){
                    db.query(
                        "UPDATE users SET img_url=? WHERE id = ?;",[imgsrc,req.session.user[0].id],(err,result)=>{
                            if(err){
                                console.log("something wrong with image upload")
                            }
                            if(result){
                                        req.session.user = results;
                                        // console.log(result);
                                        // console.log(results);
                                        res.send(result);
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
                console.log("like")
            }
            if(err){
                console.log(err)
            }
        }
    )
})


router.post("/find/like", (req,res) => {
    const postID = req.body;
    const userID = req.session.user[0].id
    console.log(postID)
    // console.log(userID)

    db.query(
        "SELECT * FROM likes WHERE post_id IN (?)", [postID],(err,result)=>{
            if(result){
                console.log(result)
            }
        }
    )
})

module.exports = router;
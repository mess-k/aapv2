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





router.use(cookieParser());



router.use(
    session({
        key: "userId",
        secret: `${sessionKey}`,
        resave: false,
        saveUninitialized: false,
        cookie: {
        expires: 60 * 60 * 24,
        },
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
        if (err) {
            res.send({ err: err })
            console.log("email exists");
        }
        if(result.length <= 0 ){
            if (password == confirmPassword) {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    
                    db.query(
                        "INSERT INTO users (first_name,last_name,email,password) VALUES (?,?,?,?)",[firstName,lastName,email,hash],
                        (err, results)=>{
                            console.log(err)
                            res.send(results)
                        }
                        )
                    })
                }
            }
            })
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
        if (err) {
        res.send({ err: err });
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
                req.session.user = result;
                console.log(req.session.user);
                res.send(result);
            } else {
                res.send ({ message: "Wrong email/password combination!" });
            }
            });
            } else {
                console.log("No account associated with this email")
                res.send({ message: "No account associated with this email" });
            }
        }
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
                    console.log("email exists");
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
                                                console.log(results);
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
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

router.put ("/edit/uploadPic", upload.single('image'), (req,res) => {
    const proPic = req.body.profilepic
    // const imgsrc = 'http://localhost:3000/upload' + req.file.filename

    if (req.session.user){
        db.query(
            "SELECT * FROM users WHERE id = ?", 
            req.session.user[0].id, (err,results) => {
                if (err) {
                    res.send({ err: err })
                    console.log("email exists");
                }
                console.log(results)
                if(results.length > 0 ){
                    console.log("working!")
                    db.query(
                        "UPDATE users SET img_url=? WHERE id = ?;",[proPic,req.session.user[0].id],(err,result)=>{
                            if(err){
                                console.log("something wrong with image upload")
                            }
                            if(result){
                                        req.session.user = results;
                                        console.log("here")
                                        console.log(result);
                                        console.log(results);
                                        res.send(result);
                            }
                        }
                    )
                }
            }
        )
    }
})






module.exports = router;
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

///////////////////////////REGISTER///////////////////////////////

router.post("/register", (req,res)=>{
    const shelterName = req.body.shelterName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword


db.query(
    "SELECT * FROM shelters WHERE email = ?",
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
                        "INSERT INTO shelters (name,email,password) VALUES (?,?,?)",[shelterName,email,hash],
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
            })
        });

router.get("/login", (req, res) => {
    if (req.session.shelter) {
        res.send({ loggedIn: true, shelter: req.session.shelter });
    } else {
        res.send({ loggedIn: false });
    }
});

//////////////////////////LOGIN/////////////////////////////

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM shelters WHERE email = ?;",
        email,
        (err, result) => {
            if (result.length<=0) {
                res.send({ message: "No account associated with this email" });
                }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
                req.session.shelter = result;
                console.log(req.session.shelter);
                res.send(result);
            } else {
                res.send ({ EPMessage: "Wrong email/password combination!" });
            }
        });
        }}
    );
});

//////////////////////UPDATE/////////////////////

router.put("/edit", (req,res) => {
    
    const shelterName = req.body.shelterName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword

    if (req.session.shelter){
        db.query(
            "SELECT * FROM shelters WHERE id = ?", 
            req.session.shelter[0].id, (err,result) => {
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
                                "UPDATE shelters SET name=?, email=?, password=? WHERE id = ?;",[shelterName,email,hash,req.session.shelter[0].id],
                                (err, results)=>{
                                    if(err){
                                    console.log(err)
                                    res.send(results)
                                    }
                                    if(results){
                                        db.query(
                                            "SELECT * FROM shelters WHERE id = ?",req.session.shelter[0].id, (err,results)=>{
                                                if(err){
                                                }
                                                req.session.shelter = results;
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
        callBack(null, '../../aapv2/client/public/images/Shelter/ShelterPic')     
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
})

var upload = multer({
    storage: storage
});

router.put ("/edit/uploadPic", upload.single('profilepic'), (req,res) => {
    const imgsrc = "/images/Shelter/ShelterPic/"+req.file.filename

    if (req.session.shelter){
        db.query(
            "SELECT * FROM shelters WHERE id = ?", 
            req.session.shelter[0].id, (err,results) => {
                if (err) {
                    res.send({ err: err })
                }
                if(results.length > 0 ){
                    db.query(
                        "UPDATE shelters SET img_url=? WHERE id = ?;",[imgsrc,req.session.shelter[0].id],(err,result)=>{
                            if(err){
                                console.log("something wrong with image upload")
                            }
                            if(result){
                                        req.session.shelter = results;
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
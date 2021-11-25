require("dotenv").config();
sessionKey = process.env.SESSION
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");
const cookieParser = require("cookie-parser");

const db = require("../config/db");

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
    if (req.session.shelter) {
        res.send({ loggedIn: true, shelter: req.session.shelter });
    } else {
        res.send({ loggedIn: false });
    }
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM shelters WHERE email = ?;",
        email,
        (err, result) => {
        if (err) {
        res.send({ err: err });
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
                req.session.shelter = result;
                console.log(req.session.shelter);
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

//////////////////////UPDATE/////////////////////

router.put("/edit", (req,res) => {
    const shelterName = req.body.shelterName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword

    if (req.session.user){
        db.query(
            "SELECT * FROM shelters WHERE id = ?", 
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
                                "UPDATE shelters SET shelter_name=?, last_name=?, email=?, password=? WHERE id = ?;",[shelterName,lastName,email,hash,req.session.user[0].id],
                                (err, results)=>{
                                    if(err){
                                    console.log(err)
                                    res.send(results)
                                    }
                                    if(results){
                                        db.query(
                                            "SELECT * FROM shelters WHERE id = ?",req.session.user[0].id, (err,results)=>{
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




module.exports = router;
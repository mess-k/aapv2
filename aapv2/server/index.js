require("dotenv").config();
port = process.env.PORT;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const express = require('express');
const app = express();
const cors = require("cors");



app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST, PUT, DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());



const userRoute = require("./routes/User");
app.use("/api/user", userRoute)
const shelterRoute = require("./routes/Shelter")
app.use("/api/shelter", shelterRoute)
const profileRoute = require("./routes/Profile")
app.use("/api/profile", profileRoute)





server=app.listen(port,()=> console.log(`listening on port ${port}`));
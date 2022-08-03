const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authConfig = require("./config/authConfig");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const auth = require("./routes/auth");
const user = require("./routes/user");

//Middlewares

app.use(
    session({
        name:'session-id',
        secret:'secret',
        saveUninitialized:false,
        resave:false,
        cookie:{
            expires:600000
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());
authConfig(passport);

app.use("/auth",auth);
app.use("/user",user);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(3000, ()=>{
    console.log('Run on 3000 port');
});
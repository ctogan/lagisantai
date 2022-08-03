const { check, validationResult } = require("express-validator");
const user = require("../models/user");

exports.signup = [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({min:5}),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        }
        else next();
    }
]


const express = require('express');
const { body, check, validationResult } = require('express-validator');
const User = require('../modals/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
let fetchuser = require('../middleware/fetchuser')
let jwt = require('jsonwebtoken');

// ROUTE 1: SignUp using: POST "/api/auth/signup". No login required
router.post('/signup', [
    body('fName', 'Enter a valid name').isLength({min: 1}),
    body('email', 'Enter a valid E-mail').isEmail(),
    body('password', 'Password must be minimum 3 characters in length').isLength({min: 3}),
    check('passwordConfirmation', 'Password must be minimum 3 characters in length').isLength({min: 3}).custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error("Passwords didn't match");
        } else {
            return true;
        }
    }),
] ,async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ validationErrors: errors.array()});
    }
    try {
        //whether the email already exists or not
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(400).json({success, error: "A user with this email already exist" });
        }

        //Hashing password with salt
        var salt = bcrypt.genSaltSync(10);
        const secPass = bcrypt.hashSync(req.body.password, salt);
        user = User.create({
            name: {
                first: req.body.fName,
                last: req.body.lName
            },
            email: req.body.email,
            password: secPass
        });
        
        //Creating auth-token
        const data = {
            user: {
                id: user.id
            }
        };

        jwt.sign(data, process.env.JWT_SECRET, (err, authtoken) => {
            if(err) {
                res.status(500).send("Internal server error occured");
            }
            else {
                success=true;
                res.json({success, authtoken});
            }
        });

    } catch(error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})


// ROUTE 2: SignIn using: POST "/api/auth/signin". No login required
router.post('/signin', [
    body('email', 'Enter valid credentials').isEmail(),
    body('password', 'Enter valid credentials').notEmpty(),
] ,async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ validationErrors: errors.array()});
    }
    try {
        const {email, password} = req.body;
        //whether the email already exists or not
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success, error: "Enter valid credentials"});
        }

        //Compare the entered password hash with stored hash
        let passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Enter valid credentials" })
        };
        
        //Returning auth-token
        const data = {
            user: {
                id: user.id
            }
        };
        
        jwt.sign(data, process.env.JWT_SECRET, (err, authtoken) => {
            if(err) {
                res.status(500).send("Internal server error occured");
            } else {
                success=true;
                res.json({success, authtoken});
            }
        });

    } catch(error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})


// ROUTE 3: Get logged in user details POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async(req, res) => {
    try {
        //fetchuser middleware will return the id using auth-token
        const userId = req.user.id;
        let user = await User.findOne({_id: userId}).select("-password");
        //if no such user found with the given token
        if(!user) {
            res.status(401).json({error: 'Please use a valid token'});
        } else {
            res.json(user);
        }
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal server error occurmmmed");
    }
})

module.exports = router;
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
var fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'coloutoutlound';

// Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // check wheather the user exist 
    let user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
        return res.status(400).json({ success, error: "sorry a user with this email already exists" })
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);


        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server  Error occured");
    }
})


// Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let sucess = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            sucess = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            sucess = false;
            return res.status(400).json({ sucess, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        sucess = true;
        res.json({ sucess, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


});


//route 3 

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await user.findByID(userId).select("-password");
        res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


});








module.exports = router
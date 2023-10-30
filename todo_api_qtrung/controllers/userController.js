const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { json } = require("express");

async function addUser(req, res) {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing email or password" 
        });
    }

    try {
        const userExisting = await User.findOne({email: email});

        if (userExisting) {
            return res.status(400).json({
                success: false,
                message: "User name are existed"
            });
        }

        const hashedPassword = await argon2.hash(password);

        const newUser = new User({
            email: email,
            password: hashedPassword
        });

        // add database
        await newUser.save();

        const accessToken = jwt.sign({
            userId: newUser._id
        }, process.env.ACCESS_TOKEN);

        return res.status(200).json({
            success: true,
            message: "User are create successfully",
            accessToken: accessToken
        });

    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            success: false, 
            message: "Internal server error" 
        });        
    }
}

async function loginUser(req, res) {
    const {email, password} = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing email or password" 
        });
    }

    try {
        const userVaild = await User.findOne({email: email});
        if (!userVaild) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password" 
            });
        }

        const passwordValid = await argon2.verify(userVaild.password, password);

        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password" 
            });
        }

        const accessToken = jwt.sign({
            userId: userVaild._id
        }, process.env.ACCESS_TOKEN);

        return res.status(200).json({
            success: true, 
            message: "Login successfully",
            accessToken
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false, 
            message: "Internal server error" 
        });  
    }
}

async function getUser(req, res) {
    try {
        console.log(req.userId);
        const infoUser = await User.findById(req.userId).exec();
        if (!infoUser) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            infoUser: infoUser
        });
    } catch (error) {
        console.log(error.message);
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = {addUser, loginUser, getUser}
import Users from "../models/User.js"
import asyncHandler from 'express-async-handler'
import generateToken from "../utils/generateToken.js"
import jwt from 'jsonwebtoken'
import jwtTokenDecoder from "../utils/decodeToken.js"
import bcrypt from 'bcryptjs'
import { isValidElement } from "react"



const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await Users.findOne({ email: email })

    if (user && (await user.matchPasswords(password))) {
        generateToken(res, user._id)
        res.status(201).json(user);
    } else {
        return res.status(401).json({ error: 'invalid email or password' })
    }

})


const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body

    const userExist = await Users.findOne({ email: email })
    if (userExist) {
        return res.status(400).json({ error: 'user already exist' })
        // throw new Error('user already exist')
    }

    const newUser = await Users.create({
        userName,
        email,
        password,
        role: 'user'
    });

    if (newUser) {
        generateToken(res, newUser._id)
        res.status(201).json(newUser);
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

const fetchUserData = async (req, res) => {
    try {

        const token = req.cookies.jwt || req.headers.authorization

        // check if the token exists
        if (!token) {
            return res.status(401).json({ error: 'unAuthorized,no token provided' })
        }


        const userId = jwtTokenDecoder(token)

        console.log('decoded under reached', userId)
        const user = await Users.findById(userId)
        console.log('this is the user', user)

        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }

        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal server error' })
    }
}



const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    return res.status(200).json({ message: 'user logged out' })
})



const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        userName: req.user.userName,
        email: req.user.email,
    }
    res.status(200).json(user)
})


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.user._id)

    if (user) {
        user.userName = req.body.userName || user.userName
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            userName: updatedUser.userName,
            email: updatedUser.email
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    res.status(200).json({ message: 'update user profile' })
})



const uploadFile = async (req, res) => {
    try {
        const token = req.headers.cookie.split('=')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const file = req.file

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }

        const userExist = await Users.findById(userId)

        if (!userExist) {
            return res.status(401).json({ error: 'user not found' })
        }

        userExist.profile = file.originalname

        await userExist.save()

        console.log('file uploaded brooo')
        res.status(200).json({ message: 'file uploaded successfully', userExist })

    } catch (error) {
        console.log('error occured', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const resetPassword = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const { currentPassword, newPassword } = req.body;
        console.log('req.body',req.body)

        // Check if the current password and new password are the same
        if (currentPassword === newPassword) {
            return res.status(400).json({ error: 'Please choose a new password' });
        }

        // Verify the token
        if (!token) {
            console.log('no token',token)
            return res.status(401).json({ error: 'Unauthorized, no token found' });
        }

        // Decode the token to get the user's ID
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        // Find the user by ID
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('current password',currentPassword)
        console.log('NEW password',user.password)
        // Check if the current password matches the user's password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        console.log('ismatch',isMatch)
        if (!isMatch) {
            console.log('password not match')
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password in the database
        await Users.findOneAndUpdate(
            { _id: userId },
            { $set: { password: hashedPassword } }
        );

        console.log('password reset success')

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    uploadFile,
    fetchUserData,
    resetPassword   

}
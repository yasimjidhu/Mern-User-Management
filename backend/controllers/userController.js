import Users from "../models/User.js"
import asyncHandler from 'express-async-handler'
import generateToken from "../utils/generateToken.js"
import jwt, { decode } from 'jsonwebtoken'
import jwtTokenDecoder from "../utils/decodeToken.js"
import bcrypt from 'bcryptjs'



const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email: email });

        if (user && (await user.matchPasswords(password))) {

            const { _id, role } = user;

            // Generate token with user ID and role
            const token = generateToken(res, _id, role);
            console.log('generated token',token)

            res.status(201).json({ user, role });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    // Check if the user already exists
    const userExist = await Users.findOne({ email: email });
    if (userExist) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user with default role 'user'
    const newUser = await Users.create({
        userName,
        email,
        password,
        role: 'user'
    });

    if (newUser) {
        // Generate token with user's ID and role
        generateToken(res, newUser._id, newUser.role);
        res.status(201).json(newUser);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


const fetchUserData = async (req, res) => {
    try {

        const token = req.cookies.jwt || req.headers.authorization

        // check if the token exists
        if (!token) {
            return res.status(401).json({ error: 'unAuthorized,no token provided' })
        }


        const userId = jwtTokenDecoder(token)

        const user = await Users.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }

        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
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

    const {userId,key,value} = req.body

    const user = await Users.findById(userId)

    if (user) {
        if(key=='userName'){
            user.userName = value|| user.userName
        }else if(key=='email'){
            user.email = value || user.email
        }

        const updatedUser = await user.save()
        console.log('updated user backend',updatedUser)

        return res.status(200).json(updatedUser)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const uploadFile = async (req, res) => {
    try {
        const token = req.cookies.jwt;  // Now using req.cookies instead of manually parsing headers
        
        console.log('Token is:', token);  // For debugging, inspect the token

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decodedToken);

        const userId = decodedToken.userId;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const userExist = await Users.findById(userId);

        if (!userExist) {
            return res.status(401).json({ error: 'User not found' });
        }

        userExist.profile = file.originalname;

        const updatedProfile = await userExist.save();

        res.status(200).json({ message: 'File uploaded successfully', updatedProfile });

    } catch (error) {
        console.log('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const resetPassword = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const { currentPassword, newPassword } = req.body;

        // Check if the current password and new password are the same
        if (currentPassword === newPassword) {
            return res.status(400).json({ error: 'Please choose a new password' });
        }

        // Verify the token
        if (!token) {
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


        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password in the database
        const updatedUser = await Users.findOneAndUpdate(
            { _id: userId },
            { $set: { password: hashedPassword } }
        );

        console.log('updated user yasim bro',updatedUser)
        return res.status(200).json({ message: 'Password reset successfully',updatedUser });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// route to update the username
const updateUserData = async (req, res) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization
        const { userName } = req.body

    } catch (error) {
        console.log(error)
    }
}

// get userData based on the input fileld
const getUserDataBasedOnSearch = async (req, res) => {
    try {
        const { query } = req.query

        const regexPattern = new RegExp(`^${query}`, 'i');

        const userData = await Users.find({ userName: { $regex: regexPattern } })


        res.json(userData);

    } catch (error) {
        console.error('error fetching userData', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getAllUsers = async (req, res) => {

    try {

        const allUsers = await Users.find()
        res.json(allUsers)

    } catch (error) {

        console.log(error)
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
    resetPassword,
    updateUserData,
    getUserDataBasedOnSearch,
    getAllUsers

}
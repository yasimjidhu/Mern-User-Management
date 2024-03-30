import Users from "../models/User.js"
import asyncHandler from 'express-async-handler'
import generateToken from "../utils/generateToken.js"
import jwt from 'jsonwebtoken'
import jwtTokenDecoder from "../utils/decodeToken.js"
import bcrypt from 'bcryptjs'



const authUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            console.log('no user found');
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        console.log('user',user)
        console.log('password from the login',password)

        const isPasswordMatch = await user.matchPasswords(password);

        if (isPasswordMatch) {
            console.log('password matched');
            generateToken(res, user._id);
            return res.status(200).json(user);
        } else {
            console.log('password does not match');
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



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

        const user = await Users.findById(userId)

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

   
        res.status(200).json({ message: 'file uploaded successfully', userExist })

    } catch (error) {
        console.log('error occured', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const resetPassword = async (req, res) => {

    try {
        const token = req.cookies.jwt || req.headers.authorization
        console.log('body', req.body)

        const { currentPassword, newPassword } = req.body

        if(currentPassword === newPassword){
            console.log('old and new password are correct')
            return res.status(401).json({error:'try new new password'})
        }


        if (!token) {
            return res.status(401).json({ error: 'unauthorized , no token found' })
        }

        const userId = jwtTokenDecoder(token)

        const user = await Users.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: 'current password is incorrect' })
        }

        // hash the new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        // update the user's password in the database
        user.password = hashedPassword
        await user.save()
        console.log('password reset successfullly')

        res.status(200).json({ message: 'password reset successfully' })


    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'internal server error' })
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
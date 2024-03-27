import Users from "../models/User.js"
import asyncHandler from 'express-async-handler'
import generateToken from "../utils/generateToken.js"


// auth user/set/token
// route POST /api/users/auth
//access public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await Users.findOne({ email: email })

    if (user && (await user.matchPasswords(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            userName: user.userName,
            email: user.email
        });
    } else {
        res.status(401)
        throw new Error('invalid email or password')
    }
})

// desc     register a new user
// route    POST /api/users/
//access    public

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body

    const userExist = await Users.findOne({ email: email })
    if (userExist) {
        res.status(400)
        throw new Error('user already exist')
    }

    const newUser = await Users.create({
        userName,
        email,
        password
    });

    if (newUser) {
        generateToken(res, newUser._id)
        res.status(201).json({
            _id: newUser._id,
            userName: newUser.userName,
            email: newUser.email
        });
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

// desc     logout user
// route    POST /api/users/logout
//access    public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'user logged out' })
})

// desc     get user profile
// route    GET /api/users/profile
//access    private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        userName: req.user.userName,
        email: req.user.email
    }
    res.status(200).json(user)
})

// desc     update user profile
// route    PUT /api/users/profile
//access    private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await Users.findById(req.user._id)

    if (user) {
        user.userName = req.body.userName || user.userName
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id:updatedUser._id,
            userName:updatedUser.userName,
            email:updatedUser.email
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    res.status(200).json({ message: 'update user profile' })
})






export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}
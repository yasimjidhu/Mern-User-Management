import express from 'express'
import { authUser } from '../controllers/userController.js'

const router = express.Router()
import {
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js'
import { protect } from '../middlewares/AuthMiddleware.js'

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

export default router
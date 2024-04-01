import express from 'express'
const router = express.Router()
import {
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    uploadFile,
    authUser,
    fetchUserData,
    getUserDataBasedOnSearch,
    resetPassword,
    updateUserData,
    getAllUsers
} from '../controllers/userController.js'
import { protect } from '../middlewares/AuthMiddleware.js'
import { upload } from '../utils/multer.js'
// import uploadFile from '../../frontend/src/slices/UploadSlice.js'

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/signup', registerUser)
router.post('/logout', logoutUser)
router.post('/upload', upload.single('profileImage'), uploadFile);
router.get('/getUserProfile',fetchUserData)  
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.post('/resetPassword', resetPassword)
router.post('/updateUserData',updateUserData)
router.get('/search',getUserDataBasedOnSearch)
// router.get('/getAllUsers',getAllUsers)
export default router
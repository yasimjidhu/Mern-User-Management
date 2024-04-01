import express from 'express'
import { adminLogout, deleteUser, getAllUsers, updateUser } from '../controllers/admincontroller.js'
import checkRole from '../middlewares/roleMiddleware.js'
import { protect } from '../middlewares/AuthMiddleware.js'
const adminRouter = express.Router()

adminRouter.post('/edit-user',updateUser)
adminRouter.delete('/delete-user/:userId',checkRole('admin'),deleteUser)
adminRouter.post('/logout',protect,adminLogout)
adminRouter.get('/getAllUsers',getAllUsers)

export default adminRouter
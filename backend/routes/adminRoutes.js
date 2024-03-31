import express from 'express'
import { deleteUser } from '../controllers/admincontroller.js'
const adminRouter = express.Router()

adminRouter.put('/edit-user',)
adminRouter.delete('/delete-user/:userId',deleteUser)


export default adminRouter
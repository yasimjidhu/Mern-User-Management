import Users from "../models/User.js";
import jwt from 'jsonwebtoken'


// edit the user
const updateUser = async(req,res)=>{
    const {_id,userName} = req.body
    
    console.log('update user new reached',_id,userName)

    try {
        
        const user = await Users.findById(_id)

        if(!user){
            return res.status(404).json({error:'user not found'})
        }

        // update the user's userName
        if(userName){
            user.userName = userName
        }

        const updatedUser = await user.save()

        return res.status(200).json({message:'user updated successfully',updatedUser:updatedUser})
    } catch (error) {
        console.error('error updating user:',error)
        return res.status(500).json({error:'Failed to update user'})
    }
}



// delete the user
const deleteUser = async(req,res)=>{
  
    const userId = req.params.userId

    try {
        const userDeleted = await Users.findByIdAndDelete(userId)

        if(!userDeleted){
            return res.status(400).json({message:'user deletion failed'})
        }
        console.log('user deleted successfully',userDeleted)
        return res.status(200).json({message:'user deleted successfully',deletedUserId:userDeleted._id})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'internal server error'})
    }
}

// admin logout
const adminLogout = async(req,res)=>{
    try {
        res.cookie('jwt','',{expires:new Date(0)})
        res.status(200).json({message:'Logout Successfull'})
    } catch (error) {
        console.log('logout failed',error)
        res.status(500).json({err:'internal server error'})
    }
}


// get all users
const getAllUsers = async (req,res)=>{
    try {
        const allUsers = await Users.find()
        res.json(allUsers)
    } catch (error) {
        console.log('error occured',error)
        res.status(500).json({error:error})
    }
}


export {
    deleteUser,
    updateUser,
    adminLogout,
    getAllUsers
}

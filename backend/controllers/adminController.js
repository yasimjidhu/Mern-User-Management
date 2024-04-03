import Users from "../models/User.js";
import jwt from 'jsonwebtoken'
import generateToken from "../utils/generateToken.js";



// add user
const addUser = async (req,res)=>{

    const {userName,email,password} = req.body
 
    // check if the user already exist
    const userExist = await Users.findOne({email:email})

    if(userExist){
        return res.status(400).json({error:'user already exists'})
    }

    // create a new user with the data
    const newUser = await Users.create({
        userName,
        email,
        password,
        role: 'user'
    })

    if(newUser){
        const token = generateToken(res,newUser._id,newUser.role)
        console.log('admin added a user',newUser)
        return res.status(201).json({userData:newUser,token})
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

}


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
    addUser,
    deleteUser,
    updateUser,
    adminLogout,
    getAllUsers
}

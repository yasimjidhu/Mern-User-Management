import Users from "../models/User.js";


// delete the user
const deleteUser = async(req,res)=>{
    console.log('deletion backend reached')
    const userId = req.params.userId

    try {
        const userDeleted = await Users.findByIdAndDelete(userId)

        if(!userDeleted){
            return res.status(400).json({message:'user deletion failed'})
        }
        return res.status(200).json({message:'user deleted successfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'internal server error'})
    }


}

export {
    deleteUser
}

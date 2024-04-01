import jwt, { decode } from 'jsonwebtoken'

const checkRole = (role)=> (req,res,next)=>{
    console.log('check role reached')
   const token = req.cookies.jwt || req.headers.authorization

   if(token){
    const tokenString = token.startsWith('Bearer')?token.split('')[1]:token
    

    jwt.verify(tokenString,process.env.JWT_SECRET,(err,decodedToken)=>{
        if(err){
            console.log('error occured',err)
            return res.status(401).json({message:'UnAuthorized'})
        }else{

            if(decodedToken.role !== role){
                console.log(`you are not the${role}`)
                return res.status(403).json({message:'forbidden: insufficient role'})
            }
            req.user = decodedToken
            next()
            console.log('all set')
        }
    })
   }else{
    console.log('no token provided')
    return res.status(401).json({message:'no token provided'})
   }
}

export default checkRole
import jwt from 'jsonwebtoken'

const jwtTokenDecoder = (token)=>{
     //verify the token
     const decoded = jwt.verify(token, process.env.JWT_SECRET)

     if (!decoded) {
         return {error:'to token found'}
     }

     const tokenParts = token.split('.')

     // Get the payload, which is the second part
     const encodedPayload = tokenParts[1];

     // decode the payload
     const decodedPayload = Buffer.from(encodedPayload, 'base64').toString()
     const decodedToken = JSON.parse(decodedPayload)

     const userId = decodedToken.userId

     return userId
}

export default jwtTokenDecoder
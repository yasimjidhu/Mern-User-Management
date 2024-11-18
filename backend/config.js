// database conncection
import mongoose from "mongoose"

const uri = 'mongodb://localhost:27017/User-mgt'

const db = mongoose.connect(uri,{useNewUrlParser:true,
useUnifiedTopology:true}).then(()=>{
    console.log('connected')

})
.catch((error)=>{
     console.log(error)
})

export default db

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

// const db = mongoose.connection

// db.on('error',console.error.bind(console,'mogodb connection error'))
// db.once('open',function(){
//     console.log('mongodb connected')
// })

// export default db

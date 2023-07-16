import express from 'express'
import UserRoute from './routers/users'
import mongoose from 'mongoose'
import { env } from './environment'
import mongoRoutes from './routers/postuser'
import TokenRequired from './middlewares/toeknreq'
import ProtectRoute from './routers/protected'
// import user from './models/user'

const app = express()
const port = 3000

app.use(express.json())
//! middle were will be called for the requestes
app.use((req,res,next)=>{
    console.log(" middleware was called")
    next()
})
// const mongoURI="mongodb+srv://hdewani2002:GE4I7gBMoXQ4RH67@cluster0.tr56hkn.mongodb.net/?retryWrites=true&w=majority"
app.use("/postuser",mongoRoutes)
app.use("/users",UserRoute)
app.use("/protected",TokenRequired,ProtectRoute)


app.route('/').get((req,res)=>{
    res.send("hello world")
})

// app.get('/', (req, res) => {
//     res.json({message:'Hello '})
//   })

function main(){
    //connect to mongodb
    mongoose.connect(env.mongoURI)
    .then(()=>{
        console.log("connected to mongodb")
        app.listen(port,()=>{
            console.log(`listening at  ${port}`)

        }) 
    })
    .catch((err)=>{
        console.log(err)
    })



}
main() 
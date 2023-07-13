import express from 'express'
// import UserRoute from './routers/users'
import UserRoute from './routers/postuser'
import mongoose from 'mongoose'
import user from './models/user'
const app = express()
const port = 3000

app.use(express.json())
const mongoURI="mongodb+srv://hdewani2002:GE4I7gBMoXQ4RH67@cluster0.tr56hkn.mongodb.net/?retryWrites=true&w=majority"
 
app.use("/postuser",UserRoute)
// app.use("/user",UserRoute)


app.route('/').get((req,res)=>{
    res.send("hello world")
})

// app.get('/', (req, res) => {
//     res.json({message:'Hello '})
//   })

function main(){
    //connect to mongodb
    mongoose.connect(mongoURI )
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
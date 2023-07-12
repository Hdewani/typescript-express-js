import express from 'express'
import UserRoute from './routers/users'

const app = express()
const port = 3000

app.use(express.json())

app.use("/user",UserRoute)

app.route('/').get((req,res)=>{
    res.send("hello world")
})

// app.get('/', (req, res) => {
//     res.json({message:'Hello '})
//   })

function main(){
app.listen(port,()=>{
    console.log(`listening at  ${port}`)
})

}
main() 
import { Router } from "express"
const router = Router()

type user={
    name:string,
    age: number
}

// type userpost=user | {
//     fullname:string,
//     Dob:number
// }
const users:user[] = [
    {
        name:'john',
        age:20,
    },
    {
        name:'doe',
        age:21,
    },
]

router.get('/', (req, res) => {
   return res.json(users)
  })

  router.post('/', (req, res) => {
    const {name,age}=req.body as user
    users.push({name,age})
    console.log(users)
    
    return res.json({message:'Hello from post!'})
   })

   router.put("/:name",(req,res)=>{
    console.log(req.body)
    return res.json({message:'Hello from put!'})

   })

//    router.delete('/:name/:age',(req,res)=>{
//     const name=req.params.name
//     const age=parseInt(req.params.age)

//     console.log(name,age)
//     return res.json({name,age})
//    })

router.delete("/:name",(req,res)=>{
    const name=req.params.name

    const index=users.findIndex((user)=>user.name === name)
    if(index===-1){
        return res.status(404).json({message:"user not found"})
    }
    users.splice(index,1)
    return res.json ({ message:"user deleted" })
})

  export default router
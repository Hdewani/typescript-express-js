import { Router } from "express"
const router = Router()

type user={
    name:string,
    age: number
}

type userpost=user | {
    fullname:string,
    Dob:number
}
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
    const data=req.body as userpost
    console.log(data)
    return res.json({message:'Hello from post!'})
   })

  export default router
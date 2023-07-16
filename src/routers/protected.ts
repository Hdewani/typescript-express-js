import { Router } from "express";
const router=Router()


// //* if we want to call the function for specific method we can include middel ware like this
// router.get("/",(req,res,next)=>{
//     console.log("hello from middleware route")
//     next()
// },
// (req,res)=>{
//     return res.json({message:"hello from protcted route"})
// })
 
 
//!if we want to call middleware for the all the requestes present in protected.ts file we can include it here or simply we can directly include it in main.ts file as app.use 
// router.use((req,res,next)=>{
//     console.log(" middleware was called")
//     next()
// })

router.get("/",(req,res)=>{
    return res.json({message:"hello from protcted route "})
})


export default router
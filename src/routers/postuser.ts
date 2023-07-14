import { Router } from 'express'
import UserSchema from '../models/user'
import user from '../models/user'
const router = Router()

router.post('/', async (req, res) => {
	try {
		const { name, password, email, username } = req.body 

		if (!password || !username) {
			return res
				.status(400)
				.json({ message: 'password and username are required' })
		}

		const user = await UserSchema.findOne({ username })

		if (user) {
			return res.status(400).json({ message: 'username already exists' })
		}

		const newUser = await UserSchema.create({
			name,
			password,
			email,
			username,
		})

		return res.json(newUser.toObject())
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'something went wrong' })
	}
})

// router.get("/",async(req,res)=>{
// 	// res.send("get req");
// 	try {
// 		const list= await UserSchema.find({});
// 		res.json(list);
// 	  } catch (error) {
// 		res.json(error);
// 	  }
// });

router.get("/",async(req,res)=>{
	// res.send("get req");
	try {
		const list= await UserSchema.find({});
		res.json(list);
	  } catch (error) {
		return res.status(500).json({message:error.message || "internal server error"})
	  }
})	;

// router.delete("/:id",(req,res)=>{
//     req.params.id

//     return res.json ({ message:"user deleted" })
// })
// router.delete("/:id", (req, res) => {
//     UserSchema.findByIdAndDelete(req.params.id).then((UserSchema) => {
//         if (!UserSchema) {
//             return res.status(404).send();
//         }
//         res.send(UserSchema);
// 		console.log("Data base deleted ")
//     }).catch((error) => {
//         res.status(500).send(error);
//     })
// })


router.delete("/:id", async (req, res) => {
	try{
   const User= await UserSchema.findByIdAndDelete(req.params.id)
        if (!User) {
            return res.status(404).send();
        }
		console.log("Data base deleted ")
		return res.send(User);
    }
	catch(error) {
        res.status(500).json({message:"interval server error"});
    }
})

// router.patch("/:id", (req, res) => {
//     UserSchema.findByIdAndUpdate(req.params.id, req.body).then((UserSchema) => {
//         if (!UserSchema) {
//             return res.status(404).send();
//         }
//         res.send(UserSchema);
// 		console.log("Data base updated")

//     }).catch((error) => {
//         res.status(500).send(error);
//     })
// })

router.patch("/:id",async (req, res) => {
	try{
    const user=await UserSchema.findByIdAndUpdate(req.params.id, req.body)
        if (!user) {
            return res.status(404).send();
        }
		console.log("Data base updated")
        res.send(user);
    }
	catch(error) {
		return res.status(500).json({message:error.message || "internal server error"})
    }
})

export default router
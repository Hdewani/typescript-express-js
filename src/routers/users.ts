import { Router } from "express";
import UserSchema, { User } from "../models/user";
import { createHash, verifyHash,createAccessToken,checkAccessToken } from "../Controller/auth";

interface LoginInput {
  username?: string;
  password?: string;
}
interface UserInput extends LoginInput {
  fullname?: string;
  email?: string;
  phone?: string;
}

const router = Router();
router.post("/", async (req, res) => {
  console.log("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const formData = req.body as UserInput;
    //1.username and password  are required fields
    if (!formData.username)
      return res.status(400).json({ message: "username is required" });

    if (!formData.password)
      return res.status(400).json({ message: "password is required" });

    //1.1 username should be unique
    const ExistingUser = await UserSchema.findOne({
      username: formData.username,
    });

    if (ExistingUser) {
      return res.status(400).json({ message: "username already exists " });
    }

    //2. passowrd has to be alteast 8 chars
    if (formData.password.length < 8) {
      return res.status(400).json({
        message: "password should be atleast 8 char long",
      });
    }

    //3.hash the password
    const hashedPassword = await createHash(formData.password);

    //4.save the user in database
    const newUser = await UserSchema.create({
      username: formData.username,
      password: hashedPassword,
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
    });
    //5. retrun the user & accesstoken

    return res.json({
      message: "user created successfully",
      payload: {
        username: newUser.username,
        fullname: newUser.fullname,
        email: newUser.email,
        phone: newUser.phone,
      },
	  accessToken: createAccessToken({
		username: newUser.username,
	}),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});


router.post('/login', async (req, res) => {
	try {
    //& 1.username and pasword are required
    const { username, password } = req.body as LoginInput;

    if (!username)
      return res.status(400).json({ message: "username is required" });

    if (!password)
      return res.status(400).json({ message: "password is required" });

    //& 2.username should exist in the database
    const user = await UserSchema.findOne({ username });

    //& 2.1 if not user then return error 404
    if (!user) return res.status(400).json({ message: "user not found" });

    //& 3.verify the password
    const result = await verifyHash(password, user.password);

    //& 3.1 if password is wrong then retrun error 400
    if (!result) return res.status(400).json({ message: "wrong password" });

    //& 3.2 if password is correct  then retrun user with accessToken
    return res.json({
      message: "user logged-in Successfully",
      payload: {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
      accessToken: createAccessToken({
			username: user.username,
		}),
        
      },
    });

    //&  4.retrun the user and accesstoken
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/verifyToken', async (req, res) => {
	try {
		const authorization = req.headers.authorization
		if (!authorization)
			return res
				.status(401)
				.json({ message: 'authorization header is required' })

		const result = checkAccessToken(authorization)

		if (!result.success)
			return res.status(401).json({ message: result.message })

		console.log(result)
		return res.json({ message: 'hello from verifyToken route' })
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error' })
	}
})






export default router;



import { UserModel } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

//     /api/v1/users/register
const register = async(req, res) => {
    try {
        
        const { email, password, username } = req.body;
        console.log(req.body);

        if(!username || !email || !password) {
            return res.status(400).json({ ok: false, msg: "datos faltantes: email, password o username"})
        }

        const user = await UserModel.findOneByEmail(email)
        if (user) {
            return res.status(409).json({ ok:false, msg:"El email ya existe"})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        
        const newUser = await UserModel.create({ email, password: hashedPassword, username})
        console.log(newUser)
        return res.status(201).json({ ok: true, msg: newUser})

    }catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

//   /api/v1/users/login
const login = async(req,res) => {
    try{

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Error server '
        })
    }
}

export const UserController = {
    register,
    login
}
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/user.model.js";

//     /api/v1/users/register
const register = async(req, res) => {
    try {
        // a traves del body enviamos emial, username y password
        const { email, password, username } = req.body;
        console.log(req.body);
        // validacion de datos    
        if(!username || !email || !password) {
            return res.status(400).json({ ok: false, msg: "datos faltantes: email, password o username"})
        }
        // verificamos si existe el usuario en la base de datos
        const user = await UserModel.findOneByEmail(email)
        if (user) {
            return res.status(409).json({ ok:false, msg:"El email ya existe"})
        }
        // si no existe hashear la contraseña
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        // creamos el usuario
        const newUser = await UserModel.create({ email, password: hashedPassword, username})
        console.log(newUser)
        // creamos el token con jsonwebtoken con la palabra secreta de la variable de entorno
        // y solo pasamos el email porque los datos que se envian son publicos
        const token = jwt.sign({email: newUser.email},
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )   
    
        return res.status(201).json({ ok: true, msg: token})

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
        const {email, password}= req.body

        // validacion simple : si no se ingresan los datos de email y password
        if(!email || !password) {
            return res
            .status(400)
            .json({ error: "Faltan Datos: email, password" });
        }

        // busca si existe el email
        const user = await UserModel.findOneByEmail(email)
        if(!user){
            return res.status(404).json({ error: "Usuario no existe"})
        }
        // compara la contraseña
        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({ error: "Credenciales inválidas"});
        }

        const token = jwt.sign({email: user.email},
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )
        
        return res.json({ ok: true, msg: token})


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Error server '
        })
    }
}

const profile = async(req, res) => {
    try {

        const user = await UserModel.findOneByEmail(req.email)
        return res.json({ ok: true, msg: user})

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
    login,
    profile
}
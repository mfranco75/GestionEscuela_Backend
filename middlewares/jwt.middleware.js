// middleware son funciones que se ejecutan antes de llamar a otra funcion

import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {

    let token = req.headers.authorization

    if(!token) {
        return res.status(401).json({ error: "Token no enviado"});
    }

    token = token.split(" ")[1] // separa el token del Bearer

     try {

        const { email} = jwt.verify(token, process.env.JWT_SECRET)

        req.email = email
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Token no válido"});
    }




}
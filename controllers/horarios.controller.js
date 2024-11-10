import { HorariosModel } from "../models/horarios.model.js";

// ver si es necesario o usar buscahorariodepersona es MEJOR
const buscaprofesor = async(req, res) => {
    try {

        const { profesor_id} = req.body;

        const horarios = await HorariosModel.findByIdProfesor(profesor_id)
        
        return res.json(horarios) //devuelve todos los datos del PROFESOR   ORDENAR EN FRONTEND???

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Error server '
        })
    }
}

const buscacarrera = async(req, res) => {
    try {

        const { carrera_id} = req.body;

        const horarios = await HorariosModel.findByIdCarrera(carrera_id)
        
        return res.json(horarios) //devuelve todos los datos de la carrera ORDENAR EN FRONTEND???

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Error server '
        })
    }
}

const buscamateriadia = async(req, res) => {
    try {

        const { dia } = req.body;

        const horarios = await HorariosModel.findByDia(dia)
        
        return res.json(horarios) //devuelve todos los datos de los horarios para un dia ORDENAR EN FRONTEND???

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Error server '
        })
    }
}

const buscamateriadiayhora = async(req, res) => {
    try {

        const { dia, hora } = req.body;

        const horarios = await HorariosModel.findByDiayHora(dia, hora)
        
        return res.json(horarios) //devuelve todos las materias del dia en un horario especifico - ORDENAR EN FRONTEND???

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Error server '
        })
    }
}

const buscahorariodepersona = async(req, res) => {
    try {

        const { profesor_id } = req.body;

        const horarios = await HorariosModel.verHorariosDePersona(profesor_id)
        
        return res.json(horarios) //devuelve el horario materias de una persona - ORDENAR EN FRONTEND???

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Error server '
        })
    }
}


export const HorariosController = {
    buscaprofesor,
    buscacarrera,
    buscamateriadia,
    buscamateriadiayhora,
    buscahorariodepersona
}
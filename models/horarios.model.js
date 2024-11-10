import {db} from '../database/connection.database.js'

/*nst create = async({email, password,username}) => {
    const query = {
        text: "INSERT INTO users (email, password, username) VALUES ($1,$2,$3) RETURNING email, username, uid",
        values: [email, password, username]
    }

    const {rows} = await db.query(query)
    return rows[0]
}
*/
const findByIdProfesor = async(profesor_id) => {
    const query = {
        text: "SELECT * FROM horarios WHERE profesor_id = $1",
        values: [profesor_id]
    }
    const{rows} = await db.query(query)
    console.log(profesor_id)
    console.log(rows)
    return rows
}

const findByIdCarrera = async(carrera_id) => {
    const query = {
        text: "SELECT * FROM horarios WHERE carrera_id = $1",
        values: [carrera_id]
    }
    const{rows} = await db.query(query)
    return rows
}

const findByDia = async(dia) => {
    const query = {
        text: "SELECT * FROM horarios WHERE dia = $1",
        values: [dia]
    }
    const{rows} = await db.query(query)
    return rows
}

const findByDiayHora = async(dia,hora) => {
    const query = {
        text: "SELECT h.*, p.apellido_nombre FROM horarios h INNER JOIN profesores p ON h.profesor_id = p.id WHERE h.dia = $1 AND h.hora_inicio <= $2 AND hora_fin >= $3",
        values: [dia, hora, hora]
    }
    const{rows} = await db.query(query)
    return rows
}

const verHorariosDePersona = async(profesor_id) => {
    const query = {
        text: "SELECT h.*, p.apellido_nombre FROM horarios h INNER JOIN profesores p ON h.profesor_id = p.id WHERE h.profesor_id = $1 ",
        values: [profesor_id]
    }
    const{rows} = await db.query(query)
    return rows
}


export const HorariosModel = {
    findByIdProfesor,
    findByIdCarrera,
    findByDia,
    findByDiayHora,
    verHorariosDePersona

}

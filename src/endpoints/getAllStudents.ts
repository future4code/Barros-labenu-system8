import { Request, Response } from "express"
import { connection } from "../database/connection"
import { EstudanteDatabase } from "../database/EstudanteDatabase"
import { HobbiesDatabase } from "../database/HobbiesDatabase"
import { EstudanteHobbies } from "../database/Rel_Hobbies"
import { Estudante } from "../models/estudante"

export const getAllStudents = async (req:Request, res:Response) => {
    let errorCode = 400
    const nome = req.query.name as string
    const allStudents = new EstudanteDatabase()
    try {
        let selectedStudent = await allStudents.getAll()
        let filteredStudent = selectedStudent.filter((item) => {
            return item.nome === nome
        })
        let onlyId = filteredStudent.map((item) => {
            return item.id
        })

        let hobbiesFromStudent = await connection.raw(`
        select Estudantes.id, Estudantes.nome, Hobbies.nome as hobbies, email, data_nasc from Estudantes 
        inner join Rel_Hobbies
        ON Estudantes.id = Rel_Hobbies.FK_Estudante and '${onlyId}' = Rel_Hobbies.FK_Estudante
        join Hobbies
        on Hobbies.id = Rel_Hobbies.FK_Hobbies;
        `)
        let hobbies = hobbiesFromStudent[0].map((item:any) => {
            return item.hobbies
        })
        let newHobbies = hobbies.filter((a:any, i:any) => hobbies.indexOf(a) === i);

        let result = ({...filteredStudent, newHobbies})

        res.send(result)
    } catch (err:any) {
        res.send(err.message)
    }
}
import { Request, Response } from "express"
import { Turma } from "../models/turma"
import { TurmaDatabase } from "../database/TurmaDatabase"
import { EstudanteDatabase } from "../database/EstudanteDatabase"
import { connection } from "../database/connection"
import { DocentesDatabase } from "../database/DocenteDatabase"



export const getClass = async (req:Request,res:Response) => {
    let errorCode = 400
    const id = req.query.id as string
    const allStudents = new EstudanteDatabase()
    const allTeachers = new DocentesDatabase()
    
    try {
        let selectedStudent = await allStudents.getAll()
        let filteredStudent = selectedStudent.filter((item) => {
            return item.turma_id === id
        })

        let selectedTeacher = await allTeachers.getAll()
        let filteredTeacherd = selectedTeacher.filter((item) => {
            return item.turma_id
        })

        res.status(200).send({ })
    } catch (error:any) {
        res.send(error.message)
    }
}

// Desisto..
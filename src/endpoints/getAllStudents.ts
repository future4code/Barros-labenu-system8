import { Request, Response } from "express"
import { Estudante } from "../models/estudante"
import { AlunoDatabase } from "../database/AlunoDatabase"


export const getAllStudents = async (req:Request,res:Response) => {

    try {
        const dataBase = new AlunoDatabase()
        let result = await dataBase.getAll() 
       
        res.status(200).send({ Alunos: result })
    } catch (error:any) {
        res.send(error.message)
    }
}

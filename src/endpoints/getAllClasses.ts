import { Request, Response } from "express"
import { Turma } from "../models/turma"
import { TurmaDatabase } from "../database/TurmaDatabase"



export const getAllClasses = async (req:Request,res:Response) => {
    let errorCode = 400
    try {
        const dataBase = new TurmaDatabase()
        let result = await dataBase.getAll() 
        // if (!result) {
        //     throw new Error("Oops, algo deu errado, tente novamente mais tarde.");
            
        // } 
        res.status(200).send({ Turmas: result })
    } catch (error:any) {
        res.send(error.message)
    }
}
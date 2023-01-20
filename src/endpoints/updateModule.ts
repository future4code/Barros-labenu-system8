import { Request, Response } from "express"
import { Turma } from "../models/turma"
import { TurmaDatabase } from "../database/TurmaDatabase"
import { generateId } from "../functions/generateId"

export const updateModule = async (req:Request, res:Response) => {
    let errorCode = 400
    const { id, modulo } = req.body
    const dataBase = new TurmaDatabase()
    const getById = await dataBase.getById(id)
    try {
        if (!id || !modulo) {
            throw new Error("Body invalido, verifique a formatação"); 
        }  
        if ( getById.length === 0) {
            errorCode = 404
            throw new Error("Turma não encontrada.");  
        }
        dataBase.changeModule(id, modulo)
        res.status(201).send("Modulo alterado com sucesso!")
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}
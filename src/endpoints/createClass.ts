import { Request, Response } from "express"
import { Turma } from "../models/turma"
import { TurmaDatabase } from "../database/TurmaDatabase"
import { generateId } from "../functions/generateId"


export const createClass= async (req:Request, res:Response) => {
    let errorCode = 400
    let result
    try {
        const { nome, modulo } = req.body
        if (!nome) {
            throw new Error("Insira um nome para turma");
        }
        if (modulo > 6 || modulo < 0) {
            throw new Error("Modulo invalido");
            
        }
        if (!modulo) {
            result = {
                id: generateId(30),
                nome:nome,
                modulo:0
            }
        } else {
            result = {
                id: generateId(30),
                nome:nome,
                modulo:modulo
            }
        }
        const turmaDatabase = new TurmaDatabase()
        await turmaDatabase.create(result)
        res.status(201).send("Turma criada com sucesso!")
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}
import { Request, Response } from "express"
import { Estudante } from "../models/estudante"
import { AlunoDatabase } from "../database/AlunoDatabase"
import { generateId } from "../functions/generateId"


export const createStudent= async (req:Request, res:Response) => {

    let errorCode = 400

    try {
        const { nome, email, nascimento, hobbies } = req.body

        if (!nome) {
            throw new Error("Insira o nome do aluno.");
        }
        if (!email) {
            throw new Error("Insira o email do aluno.");
        }
        if (!nascimento) {
            throw new Error("Insira uma data de nascimento válida.");
        }
        if (!hobbies) {
            throw new Error("Insira pelo menos um hobbie.");
        }

        let result = {
            id: generateId(35),
            nome: nome,
            email: email,
            data_nasc: nascimento,
            turma_id: "Sem turma definida",
            hobbies: hobbies
        }
        
        const alunoDatabase = new AlunoDatabase()
        await alunoDatabase.create(result)
        res.status(201).send("Matrícula feita com sucesso!")

    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}
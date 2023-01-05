import { Request, Response } from "express"
import { EstudanteDatabase } from "../database/EstudanteDatabase";
import { HobbiesDatabase } from "../database/HobbiesDatabase";
import { EstudanteHobbies } from "../database/Rel_Hobbies";
import { generateId } from "../functions/generateId";
import { Estudante } from "../models/estudante";

export const createNewStudent = async (req:Request, res:Response) => {
    // let errorCode = 400;
    const { nome, email, data_nasc, turma_id } = req.body;
    const id = generateId(30)
    const hobbies = req.body.hobbies
    console.log(hobbies);
    const hobbiesDatabase = new HobbiesDatabase()
    const studentDatabase = new EstudanteDatabase()
    const relHobbiesDatabase = new EstudanteHobbies()
    // let database = new Estudante(generateId(30), nome, email, data_nasc, turma_id, hobbies)
    try {
        
        studentDatabase.create({id, nome, email, data_nasc, turma_id}) 
        for (let index = 0; index < hobbies.length; index++) {
            const element = hobbies[index];
            hobbiesDatabase.create({id:generateId(30), nome:element}) 
        }
        let allHobbies = await hobbiesDatabase.getAll() 
        console.log(allHobbies[0]);
        
        for (let index = 0; index < hobbies.length; index++) {
            const currentHobby = hobbies[index];
            for (let index = 0; index < allHobbies.length; index++) {
                const tableHobby = allHobbies[index];  
                if (currentHobby === tableHobby.nome) {
                    relHobbiesDatabase.create(
                        {
                            id:generateId(30),
                            FK_Estudante:id, 
                            FK_Hobbies:tableHobby.id
                        })
                }  
            }
        }
        res.send("Estudante adicionado com sucesso!")
    } catch (error:any) {
        res.send(error.message)
    }
}
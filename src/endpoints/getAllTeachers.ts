import { Request, Response } from "express"
import { connection } from "../database/connection"
import { DocentesDatabase } from "../database/DocenteDatabase"
import { Docente } from "../models/docente"

export const getAllTeachers = async (req:Request, res:Response) => {
    try {
        let result = await connection.raw(`
        select Docentes.id, Docentes.nome, Docentes.email, Docentes.email, Especialidades.nome as especialidades, Rel_Especialidades.FK_Docente From Docentes
        join Rel_Especialidades
        On Docentes.id = Rel_Especialidades.FK_Docente
        join Especialidades
        on Rel_Especialidades.FK_Especialidade = Especialidades.id;
        `)
        let especialidades = result[0].map((item:any) => {
            return {
                especialidades:item.especialidades,
                FK_Docente: item.FK_Docente
            }
        })
        console.log(especialidades.especialidades);
        
        let finalResult = []
        let teachers = new DocentesDatabase()
        let getAllTeachers = await teachers.getAll()
        for (let index = 0; index < getAllTeachers.length; index++) {
            const element = getAllTeachers[index];
            let filterByPerson = getAllTeachers.filter((item:any) => {
                return item.id === element.id
            })
            let filterBySpecialty = especialidades.filter((item:any) => {
                return item.FK_Docente === element.id
            }).map((item:any) => {
                return item.especialidades
            })
            console.log(filterBySpecialty);

            let noRepeat = filterBySpecialty.filter((a:any, i:any) => filterBySpecialty.indexOf(a) === i);
            
            let filterAll = ({...filterByPerson, especialidades:noRepeat})
            
            finalResult.push(filterAll)
        }
        res.send(finalResult)
    } catch (error:any) {
        res.send(error.message)
    }
}
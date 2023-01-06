import { Request, Response } from "express"
import { DocentesDatabase } from "../database/DocenteDatabase";
import { EspecialidadesDatabase } from "../database/EspecialidadesDatabase";
import { Rel_Especialidades } from "../database/Rel_Especialidades";
import { generateId } from "../functions/generateId";
import { Docente } from "../models/docente";

export const createNewTeacher = async (req:Request, res:Response) => {
    let errorCode = 400
    const { nome, email, data_nasc, turma_id, especialidades } = req.body
    const teacherClass = new Docente(generateId(30), nome, email, data_nasc, turma_id, especialidades)
    console.log(teacherClass.especialidades);
    
    try {
        if (!nome || !email || !data_nasc || !turma_id || !especialidades) {
            throw new Error("Body inválido, cheque o formato e tente novamente.");
        }
        let teacherTable = new DocentesDatabase()
        
        await teacherTable.create({
            id:teacherClass.id,
            nome:teacherClass.nome,
            email:teacherClass.email,
            data_nasc: teacherClass.data_nasc,
            turma_id: teacherClass.turma_id,
        })
        const teacherById = await teacherTable.getById(teacherClass.id)
        console.log(teacherById[0].id);
        
        let especialidadesTable = new EspecialidadesDatabase()
        let relation = new Rel_Especialidades()
        for (let index = 0; index < teacherClass.especialidades.length; index++) {
            const element = teacherClass.especialidades[index];
            let idEspecialidades = generateId(30)
            await especialidadesTable.create({
                id:idEspecialidades,
                nome:element
            })
        }
        let getAllSpecialty = await especialidadesTable.getAll()
        console.table(getAllSpecialty);
        
        for (let index = 0; index < teacherClass.especialidades.length; index++) {
            const currSpecialty = teacherClass.especialidades[index];
            for (let index = 0; index < getAllSpecialty.length; index++) {
                const comparing = getAllSpecialty[index];
                console.log(currSpecialty);
                console.log(comparing.nome);
                
                if (currSpecialty === comparing.nome) {
                await relation.create({
                    'id':generateId(30),
                    'FK_Docente': teacherById[0].id,
                    'FK_Especialidade':comparing.id
                })
            }
            }
        }
        res.status(201).send("Docente adicionado com sucesso!")
    } catch (error:any) {
        res.send(error.message)
    }
}
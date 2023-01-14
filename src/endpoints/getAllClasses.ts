import { Request, Response } from "express"
import { Turma } from "../models/turma"
import { TurmaDatabase } from "../database/TurmaDatabase"
import { EstudanteDatabase } from "../database/EstudanteDatabase"
import { connection } from "../database/connection"



export const getAllClasses = async (req:Request,res:Response) => {
    let errorCode = 400
    
    try {
        let resultJoin = await connection.raw(`
        select Turma.id, Turma.nome, Turma.modulo, Estudantes.nome as estudantes, Estudantes.turma_id as estudanteId, Docentes.nome as docentes, Docentes.turma_id as docenteId from Turma
        join Estudantes
        On Estudantes.turma_id = Turma.id
        join Docentes 
        on Docentes.turma_id = Turma.id;
        `)
        console.log(resultJoin[0].id);
        let resultMapped = resultJoin[0].map((item:any) => {
            return {
                id: item.id,
                nome: item.nome,
                modulo: item.modulo,
                estudantes: item.estudantes,
                estudanteId: item.estudanteId,
                docenteId: item.docenteId,
                docentes: item.docentes
            }
        })

        console.log(resultMapped[0].id);
        
        
        
        let studentsName = resultJoin[0].map((item:any) => {
            return {
                turma_id: item.estudanteId,
                nome: item.estudantes
            }
        })
        console.log(studentsName);
        
        let teacherNames = resultJoin[0].map((item:any) =>  {
            return {
                turma_id: item.docenteId,
                nome:item.docentes
            }
    })
        const dataBase = new TurmaDatabase()
        let newClass
        let finalResult = []
        let getStudentsByClass : any= []
        let getTeacherByClass:any = []
        let resultTurma = await dataBase.getAll() 
        for (let index = 0; index < resultTurma.length; index++) {
            const element = resultTurma[index];
            getStudentsByClass = studentsName.filter((item:any) => {
                return item.turma_id === element.id
            }).map((item:any) => {
                return item.nome
            })
            let noRepeatStudents: any = getStudentsByClass.filter((a:any, i:any) => getStudentsByClass.indexOf(a) === i);
            
            getTeacherByClass = teacherNames.filter((item:any) => {
                return item.turma_id === element.id
            }).map((item:any) => {
                return item.nome
            })

            let noRepeatTeachers: any = getTeacherByClass.filter((a:any, i:any) => getTeacherByClass.indexOf(a) === i);

            newClass = new Turma(resultTurma[index].id, resultTurma[index].nome, noRepeatTeachers, noRepeatStudents, resultTurma[index].modulo) 
            console.log(newClass);
            
            finalResult.push(newClass)
        }
        res.status(200).send({ Turmas: finalResult })
    } catch (error:any) {
        res.send(error.message)
    }
}
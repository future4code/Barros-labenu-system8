import express from "express"
import cors from 'cors'
import { createClass } from "./endpoints/createClass"
import { updateModule } from "./endpoints/updateModule"
import { getAllClasses } from "./endpoints/getAllClasses"
import { createNewStudent } from "./endpoints/createNewStudent"
import { getAllStudents } from "./endpoints/getStudentByName"
import { createNewTeacher } from "./endpoints/createNewTeacher"
import { getAllTeachers } from "./endpoints/getAllTeachers"

const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});




app.get("/turma", getAllClasses)

app.get("/estudante", getAllStudents)

app.post("/turma", createClass)

app.put("/turma", updateModule)

app.post("/estudante", createNewStudent)

app.get("/docente", getAllTeachers)

app.post("/docente", createNewTeacher)


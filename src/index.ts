import express from "express"

import cors from 'cors'
import { createClass } from "./endpoints/createClass"

const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});

app.post("/turma", createClass)
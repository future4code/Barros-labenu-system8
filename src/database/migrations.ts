import { connection } from "./connection";

const createTables = async () => {
    try {
    await connection.raw(`
        CREATE TABLE IF NOT EXISTS Turma (
            id VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            modulo INT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS Estudantes (
            id VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255),
            email VARCHAR(255),
            data_nasc VARCHAR(255),
            turma_id VARCHAR(255),
            FOREIGN KEY(turma_id) REFERENCES Turma(id)
        );
        CREATE TABLE IF NOT EXISTS Hobbies (
            id VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255)
            );
        CREATE TABLE IF NOT EXISTS Rel_Hobbies(
            id VARCHAR(255) PRIMARY KEY,
            FK_Estudante VARCHAR(255),
            FK_Hobbies VARCHAR(255),
            FOREIGN KEY(FK_Estudante) REFERENCES Estudantes(id),
            FOREIGN KEY(FK_Hobbies) REFERENCES Hobbies(id)
        );

        CREATE TABLE IF NOT EXISTS Docentes (
            id VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255),
            email VARCHAR(255),
            data_nasc VARCHAR(255),
            turma_id VARCHAR(255),
            FOREIGN KEY(turma_id) REFERENCES Turma(id)
        );

        
            
        CREATE TABLE IF NOT EXISTS Especialidades (
            id VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255)
            );
                

        CREATE TABLE IF NOT EXISTS Rel_Especialidades(
            id VARCHAR(255) PRIMARY KEY,
            FK_Docente VARCHAR(255),
            FK_Especialidade VARCHAR(255),
            FOREIGN KEY(FK_Docente) REFERENCES Docentes(id),
            FOREIGN KEY(FK_Especialidade) REFERENCES Especialidades(id)
        );

    `)} 
    catch (error:any) {
        console.log(error.message);
    }
}

createTables()
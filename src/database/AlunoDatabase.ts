import { BaseDatabase } from "./BaseDatabase";

export class AlunoDatabase extends BaseDatabase {
    TABLE_NAME = 'Alunos'


    public async create(aluno:any) {
        await super.create(aluno)
    }

    public async getAll() {
        return super.getAll()
        
    }
}
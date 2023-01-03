import { BaseDatabase } from "./BaseDatabase";

export class TurmaDatabase extends BaseDatabase {
    TABLE_NAME = 'Turma'


    public async create(turma:any) {
        await super.create(turma)
    }

    public async changeModule(id:string, update:number){
        await BaseDatabase.connection.raw(`
            UPDATE ${this.TABLE_NAME}
            SET modulo = ${update}
            WHERE id = "${id}"
        `)
    }

    // public async getById(id: string) {
    //     return super.getById(id)
    //   }

    public async getActiveClass(){
        await BaseDatabase.connection.raw(`
            SELECT * FROM ${this.TABLE_NAME} WHERE Turma.modulo > 0
        `)
    }
}
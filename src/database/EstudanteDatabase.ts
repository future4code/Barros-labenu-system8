import { BaseDatabase } from "./BaseDatabase";

export class EstudanteDatabase extends BaseDatabase {
    TABLE_NAME = "Estudantes"

    public async create(item:any) {
        await super.create(item)
    }
}
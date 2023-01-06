import { BaseDatabase } from "./BaseDatabase";

export class EspecialidadesDatabase extends BaseDatabase {
    TABLE_NAME: string = "Especialidades"

    public async create(item:any) {
        await super.create(item)
    }


    public async getAll() {
        return super.getAll()
        
    }
}
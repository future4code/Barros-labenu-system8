import { BaseDatabase } from "./BaseDatabase";

export class Rel_Especialidades extends BaseDatabase {
    TABLE_NAME = "Rel_Especialidades"

    public async create(item:any) {
        await super.create(item)
    }
}
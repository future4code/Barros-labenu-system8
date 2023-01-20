import { BaseDatabase } from "./BaseDatabase";

export class EstudanteHobbies extends BaseDatabase {
    TABLE_NAME = "Rel_Hobbies"

    public async create(item:any) {
        await super.create(item)
    }
}
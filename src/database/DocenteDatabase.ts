import { BaseDatabase } from "./BaseDatabase";

export class DocentesDatabase extends BaseDatabase {
    TABLE_NAME = "Docentes"

    public async create(item:any) {
        await super.create(item)
    }

    public async getByName(name: string) {
        return await super.getByName(name)
    }

    public async getById(id: string) {
        return await super.getById(id)
    }
}
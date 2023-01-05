import { BaseDatabase } from "./BaseDatabase";

export class HobbiesDatabase extends BaseDatabase {
    TABLE_NAME = "Hobbies"

    public async create(item:any) {
        await super.create(item)
    }


    public async getAll() {
        return super.getAll()
        
    }
}
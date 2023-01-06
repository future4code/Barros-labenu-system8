import knex from "knex"
import dotenv from "dotenv"

dotenv.config()

export abstract class BaseDatabase {
    protected static connection = knex({
        client: "mysql",
        connection: {
           host: process.env.DB_HOST,
           port: 3306,
           user: process.env.DB_USER,
           password: process.env.DB_PASS,
           database: process.env.DB_NAME,
           multipleStatements: true
        },
     });

    abstract TABLE_NAME : string


    public async getAll(){
        const result = await BaseDatabase.connection(this.TABLE_NAME).select();
        return result
    }

    public async create(item: any) {
        await BaseDatabase.connection(this.TABLE_NAME).insert(item);
    }

    public async getById(id:string) {
        let result = await BaseDatabase.connection(this.TABLE_NAME)
        .select()
        .where({id})

        return result
    }
    public async getByName(name:string) {
        let result = await BaseDatabase.connection(this.TABLE_NAME)
        .select()
        .where({name})

        return result
    }

    // public async putItem(id:string, update:any, item:any) {
    //     let result = this.getById(id)
    //     await BaseDatabase.connection(this.TABLE_NAME)
        
    // }

    }
import { Pessoa } from "./pessoa";

export class Estudante extends Pessoa{
    constructor(
        id:string,
        name:string,
        email:string,
        data_nasc:string,
        turma_id:string,
        public hobbies: string[]
    ){
        super(id,name,email,data_nasc, turma_id)
        this.hobbies=hobbies
    }
}
import { Pessoa } from "./pessoa";

export class Estudante extends Pessoa{
    constructor(
        public id:string,
        public nome:string,
        public email:string,
        public data_nasc:string,
        public turma_id:string,
        public hobbies: string[]
    ){
        super(id,nome,email,data_nasc, turma_id)
        this.hobbies=hobbies
    }
}
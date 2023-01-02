import { Pessoa } from "./pessoa";

export class Docente extends Pessoa{
    constructor(
        id:string,
        name:string,
        email:string,
        data_nasc:string,
        turma_id:string,
        public especialidades: string[]
    ){
        super(id,name,email,data_nasc,turma_id)
        this.especialidades=especialidades
    }
}
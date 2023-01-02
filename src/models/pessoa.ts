export class Pessoa{
    constructor(
        protected id: string,
        protected nome: string,
        protected email:string,
        protected data_nasc:string,
        protected turma_id:string
    ){
        this.id = id,
        this.nome = nome,
        this.email = email,
        this.data_nasc = data_nasc
        this.turma_id = turma_id
    }
}
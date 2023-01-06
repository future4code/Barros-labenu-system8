export class Turma {
    constructor(
        public id:string, 
        public nome:string, 
        public docentes:string, 
        public estudantes:string, 
        public modulo:number
        )
        {
        this.id = id,
        this.nome = nome,
        this.docentes = docentes,
        this.estudantes = estudantes,
        this.modulo = modulo
    }
}
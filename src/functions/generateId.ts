// Gerar string aleatória. Exemplo: generateId(30) -> Gera string aleatória com 30 caracteres
export function generateId(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let stringLength = characters.length;
    let id = "";
    for (let index = 0; index < length; index++) {
      id += characters.charAt(Math.floor(Math.random() * stringLength));
    }
    return id;
  }
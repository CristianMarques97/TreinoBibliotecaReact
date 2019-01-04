export default class Cliente {
    id;
    nome;
    sobrenome;
    dataNasc;
    email;
    senha;
    livros;

constructor(id, nome, sobrenome, email ,dataNasc, senha, livros) {
    this.id = id;
    this.nome =nome;
    this.sobrenome = sobrenome;
    this.email = email;
    this.dataNasc = dataNasc;
    this.senha = senha;
    this.livros = livros;
}

setId(id){this.nome = id;}
setNome(nome){this.nome = nome;}
setSobrenome(sobrenome){this.sobrenome = sobrenome;}
setDataNasc(dataNasc){this.dataNasc = dataNasc;}
setSenha(senha){this.senha = senha;}

getId(){return this.id;}
getNome(){return this.nome;}
getSobrenome(){return this.sobrenome;}
getDataNasc(){return this.dataNasc;}
getSenha(){return this.senha;}

}
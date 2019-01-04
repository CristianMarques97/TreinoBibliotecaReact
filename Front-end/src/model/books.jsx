class Livros extends Component {
    
    id;
    nome;
    ano;
    editora;
    nPaginas;
    isAlugado;
    dataEntrega;

    setId(id){this.id = id;}
    
    setNome(nome){this.nome = nome;}
    setAno(ano){this.ano = ano;}

    setEditora(editora){this.editora = editora;}
    setnPaginas(paginas){this.npaginas = paginas;}
    setisAlugado(alugado){this.alugado = alugado;}
    setDataEntrega(data){this.dataEntrega = data;}

    
    getId(){return this.id;}
    getNome(){return this.nome;}
    getAno(){return this.ano;}
    getEditora(){return this.editora;}
    getnPaginas(){return this.nPaginas;}
    getisAlugado(){return this.isAlugado;}
    getDataEntrega(){return this.dataEntrega;}
}
 

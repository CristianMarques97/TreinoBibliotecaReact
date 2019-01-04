import Cliente from './model/client';
class Database {

    static lstClientes = [];
    constructor() {
        var json = require('./database.json');
        var clientes =  json.clientes;
        console.log("Usuários: ");

        clientes.forEach(cliente => {
            var cli = new Cliente(cliente.id, cliente.nome, cliente.sobrenome, cliente.email,cliente.dataNasc,cliente.senha,cliente.livros);
            Database.lstClientes.push(cli);
        });
        console.log(Database.lstClientes);
    }
}
export default Database;
 
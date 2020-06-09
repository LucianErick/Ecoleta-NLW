// importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

// Utilizar o objeto do banco de dados para nossas aplicações
 module.exports = db

// Utilizar o objeto do banco de dados pra nossas operações
 db.serialize(() =>{
//     // com comandos SQL, eu vou:
    
//     // criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT   
//         );
//     `)
//     // inserir dados na tabela
//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "Papersider",
//         "Guilherme Genballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
// `
//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this) // o this não funciona numa arrow function
//     }
    
//      db.run(query, values, afterInsertData)

//     // consultar os dados na tabela
    // db.all(`SELECT * FROM places`, function(err, rows) { // * remete a todos os dados, pra um especifico só usar o nome da variavel
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros:")
    //     console.log(rows)
    // })
//     // deletar um dado da tabela

    // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso")
    //     // console.log(rows)
    // })    
 })  


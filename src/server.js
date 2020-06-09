const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// configurar caminhos da aplicação
// página incial

//Configurar pasta pública
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

// Utilizando Template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    // res.sendFile(__dirname + "/views/index.html")
    // Como o nunjucks já está ligado ao server(express), só precisa usar o render
    return res.render("index.html", {title: "Seu marketplace de coleta de resíduos"}) // Na página index.html, o título mudou
    // isso mostra o poder do nunjucks, podendo fazer com que possa mudar dinamicamente o conteudo de uma página
})

server.get("/create-point", (req, res) => {
    // res.sendFile(__dirname + "/views/create-point.html")
    // Como o nunjucks já está ligado ao server(express), só precisa usar o render
    console.log(req.query)
    
    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) => {
    
    // req.body : o corpo do nosso formulário
    // console.log(req.body)
    
    // inserir dados no banco de dados

    // inserir dados na tabela
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this) // o this não funciona numa arrow function
    
        return res.render("create-point.html", {saved:true})
    }
    
     db.run(query, values, afterInsertData)


})

server.get("/search-results", (req, res) => {
    
    const search = req.query.search

    if (search == "") {
        // Pesquisa vazia
        return res.render("search.html", {total: 0})
    }



    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) { 
        // * remete a todos os dados, pra um especifico só usar o nome da variavel
        if (err) {
            return console.log(err)
        }

        const total = rows.length
        
        // mostrar a página html com os dados do banco de dados
        return res.render("search.html", {places: rows, total})
    })

})

//Ligar o servidor
server.listen(3000)


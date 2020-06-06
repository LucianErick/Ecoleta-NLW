const express = require("express")
const server = express()

// configurar caminhos da aplicação
// página incial

//Configurar pasta pública
server.use(express.static("public"))


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
    return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
    // res.sendFile(__dirname + "/views/create-point.html")
    // Como o nunjucks já está ligado ao server(express), só precisa usar o render
    return res.render("search.html")
})

//Ligar o servidor
server.listen(3000)


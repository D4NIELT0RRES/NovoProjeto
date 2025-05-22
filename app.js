/*************************************************************************************************
 * OBJETIVO: API referente ao projeto de controle de jogos
 * DATA: 13/02/2025
 * AUTOR: DANIEL TORRES
 * VERSÃO: 1.0
 *================================================================================================ 
 * 
 * 
 * OBSERVAÇÃO:
 * 
 * ****************** Para configurar e instalar a API, precisamos das seguites bibliotecas:
 *                      -> express          npm install express --save
 *                      -> cors             npm install cors --save
 *                      -> body-parser      npm install body-parser --save
 * 
 * ****************** Para configurar e Instalar o acesso remoto ao Banco de Dados precisamos:
 *                      -> prisma          npm install prisma --save (conexão com o BD)
 *                      -> prisma/client   npm install @prisma/client --save (Executa scrips no BD)
 * 
 * 
 * ******************* Após a instalação do prisma e do prisma/client, devemos:
 * 
 *                     npx prisma init (Inicializar o prisma no projeto)
 * 
 * ******************* Para realizar o sincronismo do prisma com o BD, devemos executar o seguinte comando:
 * 
 *                     npx prisma migrate dev                   
 * 
 *************************************************************************************************/

 //Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Importe das controles para realizar o CRUD de dados
const controllerJogo        = require('./controller/jogo/controllerJogo.js')
const controllerEmpresa     = require('./controller/empresa/controllerEmpresa.js')
const controllerVersao      = require('./controller/versao/controllerVersao.js')
const controllerPlataforma  = require('./controller/plataforma/controllerPlataforma.js')
const controllerGenero      = require('./controller/genero/controllerGenero.js')
const controllerFaixaEtaria = require('./controller/faixa_etaria/controllerFaixa_etaria.js')
const controllerAvaliacao   = require('./controller/avaliacao/avaliacao.js')

//Estabelecendo o formato de dados que deverá chegar no body da aquisição (POST ou PUT)
const bodyParserJson = bodyParser.json()

 //Cria o objeto app para criar a API
const app = express()

//Configuração do cors   
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

    app.use(cors())
    next()
})

/**************************************************************************************************/

//EndPoint para inserir um jogo no banco de dados
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJson, async function (request,response) {
        
    //Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    //Encaminha os dados do body da requisição para a controller inserir no banco de dados
    let resultJogo = await controllerJogo.inserirJogo(dadosBody,contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogo', cors(), async function (request, response) {

    //Chama a função para listar os jogos
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint para retornar um jogo pelo ID
app.get('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
    
    let idJogo = request.params.id
    let resultJogo = await controllerJogo.buscarJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)

})

//EndPoint para deletar um jogo pelo ID
app.delete('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
    
    let idJogo = request.params.id
    let resultJogo = await controllerJogo.excluirJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint para atualizar um jogo pelo ID
app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJson, async function (request, response){

    //Recebe o content-type para válidar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID do jogo
    let idJogo = request.params.id
    //Recebe os dados do Jogo encaminhado no BODY da requisição
    let dadosBody = request.body
    
    //Encaminhando os dados do body da requisição para a Controller inserir no banco de dados
    let resultJogo = await controllerJogo.atualizarJogo(dadosBody,idJogo,contentType)
    
    response.status(resultJogo.status_code)
    response.json(resultJogo)
})







//////////////////////////  TBL_EMPRESA //////////////////////////

//EndPoint para inserir uma empresa no banco de dados
app.post('/v1/controle-jogos/empresa', cors(), bodyParserJson, async function (request, response) {
    
    //Recebe o content-type para válidar o tipo de dados de requisição
    let contentType = request.headers['content-type']

    //Recebe o conteúdo do BODY da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no banco de dados
    let resultEmpresa = await controllerEmpresa.inserirEmpresa(dadosBody, contentType)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})

//EndPoint para retornar uma lista de empresas
app.get('/v1/controle-jogos/empresa', cors(), async function (request, response) {
    
    //Chama a função para lista de empresa
    let resultEmpresa = await controllerEmpresa.listarEmpresa()

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})

//EndPoint para retornar uma empresa pelo ID
app.get('/v1/controle-jogos/empresa/:id', cors(), async function (request, response) {
    
    let idEmpresa = request.params.id
    //Chama a função para retornar uma empresa pelo ID
    let resultEmpresa = await controllerEmpresa.buscarEmpresa(idEmpresa)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})

//EndPoint para deletar uma empresa pelo ID
app.delete('/v1/controle-jogos/empresa/:id', cors(), async function(request,response){
    // Recebendo o id da requisição
    let idEmpresa = request.params.id

    let resultEmpresa = await controllerEmpresa.excluirEmpresa(idEmpresa)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})

//EndPoint para atualizar uma empresa pelo ID
app.put('/v1/controle-jogos/empresa/:id', cors(), bodyParserJson, async function (request, response) {
    //Recebe o content-type para válidar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da empresa
    let idEmpresa = request.params.id

    //Recebe os dados da Empresa encaminhado no BODY da requisição
    let dadosBody = request.body

    //Recebe os dados do body da requisição para a Controller inserir no banco de dados
    let resultEmpresa = await controllerEmpresa.atualizarEmpresa(dadosBody,idEmpresa,contentType)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
})



////////////////////////// TBL_ VERSAO //////////////////////////

//EndPoint para inserir uma versão no banco de dados
app.post('/v1/controle-jogos/versao', cors(), bodyParserJson, async function (request, response) {
    
    //Recebe o content-type para válidar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteúdo do BODY da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no banco de dados
    let resultVersao = await controllerVersao.inserirVersao(dadosBody,contentType)

    response.status(resultVersao.status_code)
    response.json(resultVersao)

})

//EndPoint para retornar uma lista de versões
app.get('/v1/controle-jogos/versao', cors(), async function (request, response) {

    //Chama a função para lista de versões
    let resultVersao = await controllerVersao.listarVersao()

    response.status(resultVersao.status_code)
    response.json(resultVersao)
})

//EndPoint para retornar uma versão pelo ID
app.get('/v1/controle-jogos/versao/:id', cors(), async function (request, response) {

    let idVersao = request.params.id

    //Chama a função para retornar uma versão pelo ID
    let resultVersao = await controllerVersao.buscarVersao(idVersao)

    response.status(resultVersao.status_code)
    response.json(resultVersao)
})

//EndPoint para deletar uma versão pelo ID
app.delete('/v1/controle-jogos/versao/:id', cors(), bodyParserJson, async function (request, response) {

    //Recebe o ID da versão
    let idVersao = request.params.id

    let resultVersao = await controllerVersao.excluirVersao(idVersao)

    response.status(resultVersao.status_code)
    response.json(resultVersao)
})

//EndPoint para atualizar uma  versao pelo ID
app.put('/v1/controle-jogos/versao/:id', cors(), bodyParserJson, async function (request, response) {
    //Recebe o contentType para válidar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da versão
    let idVersao = request.params.id

    //Recebe os dados da Versão encaminhados no BODY da requisição
    let dadosBody = request.body

    //Recebe os dados do body da requisição para a Controller no banco de dados
    let resultVersao = await controllerVersao.atualizarVersao(dadosBody,idVersao,contentType)

    response.status(resultVersao.status_code)
    response.json(resultVersao)
})



////////////////////////// TBL_ PLATAFORMA //////////////////////////

//EndPoint para inserir uma versão no banco de dados
app.post('/v1/controle-jogos/plataforma', cors(), bodyParserJson, async function (request, response) {
    
    //Recebe o content-type para válidar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteúdo do BODY da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no banco de dados
    let resultPlataforma = await controllerPlataforma.inserirPlataforma(dadosBody,contentType)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)

})

//EndPoint para retornar uma lista de versões
app.get('/v1/controle-jogos/plataforma', cors(), async function (request, response) {

    //Chama a função para lista de versões
    let resultPlataforma = await controllerPlataforma.listarPLataforma()

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})

//EndPoint para retornar uma versão pelo ID
app.get('/v1/controle-jogos/plataforma/:id', cors(), async function (request, response) {

    let idPlataforma = request.params.id

    //Chama a função para retornar uma versão pelo ID
    let resultPlataforma = await controllerPlataforma.buscarPlataforma(idPlataforma)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})

//EndPoint para deletar uma versão pelo ID
app.delete('/v1/controle-jogos/plataforma/:id', cors(), bodyParserJson, async function (request, response) {

    //Recebe o ID da versão
    let idPlataforma = request.params.id

    let resultPlataforma = await controllerPlataforma.excluirPlataforma(idPlataforma)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})

//EndPoint para atualizar uma empresa pelo ID
app.put('/v1/controle-jogos/plataforma/:id', cors(), bodyParserJson, async function (request, response) {
    //Recebe o contentType para válidar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da versão
    let idPlataforma = request.params.id

    //Recebe os dados da Versão encaminhados no BODY da requisição
    let dadosBody = request.body

    //Recebe os dados do body da requisição para a Controller no banco de dados
    let resultPlataforma = await controllerPlataforma.atualizarPlataforma(dadosBody,idPlataforma,contentType)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
})






////////////////////////// TBL_ GENERO //////////////////////////

//EndPoint para inserir uma versão no banco de dados
app.post('/v1/controle-jogos/genero', cors(), bodyParserJson, async function (request, response) {
    
    //Recebe o content-type para válidar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteúdo do BODY da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no banco de dados
    let resultGenero = await controllerGenero.inserirGenero(dadosBody,contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)

})

//EndPoint para retornar uma lista de versões
app.get('/v1/controle-jogos/genero', cors(), async function (request, response) {

    //Chama a função para lista de versões
    let resultGenero = await controllerGenero.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//EndPoint para retornar uma versão pelo ID
app.get('/v1/controle-jogos/genero/:id', cors(), async function (request, response) {

    let idGenero = request.params.id

    //Chama a função para retornar uma versão pelo ID
    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//EndPoint para deletar uma versão pelo ID
app.delete('/v1/controle-jogos/genero/:id', cors(), bodyParserJson, async function (request, response) {
    
    //Recebe o ID da versão
    let idGenero = request.params.id


    let resultGenero = await controllerGenero.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//EndPoint para atualizar uma empresa pelo ID
app.put('/v1/controle-jogos/genero/:id', cors(), bodyParserJson, async function (request, response) {
    //Recebe o contentType para válidar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da versão
    let idGenero = request.params.id

    //Recebe os dados da Versão encaminhados no BODY da requisição
    let dadosBody = request.body

    //Recebe os dados do body da requisição para a Controller no banco de dados
    let resultGenero = await controllerGenero.atualizarGenero(dadosBody,idGenero,contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})







////////////////////////// TBL_ FaixaEtaria //////////////////////////
//EndPoint para inserir uma faixa etária no banco de dados
app.post('/v1/controle-jogos/faixaEtaria', cors(), bodyParserJson, async function (request, response) {
    
    //Recebe o content-type para válidar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    //Recebe o conteúdo do BODY da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no banco de dados
    let resultFaixaEtaria = await controllerFaixaEtaria.inserirFaixaEtaria(dadosBody,contentType)

    response.status(resultFaixaEtaria.status_code)
    response.json(resultFaixaEtaria)

})

//EndPoint para retornar uma lista de faixa etaria
app.get('/v1/controle-jogos/faixaEtaria', cors(), async function (request, response) {
    
    //Chama a função para lista de classificações
    let resultFaixaEtaria = await controllerFaixaEtaria.listarFaixaEtaria()

    response.status(resultFaixaEtaria.status_code)
    response.json(resultFaixaEtaria)
})

//EndPoint para retornar uma faixa etaria pelo ID
app.get('/v1/controle-jogos/faixaEtaria/:id', cors(), async function (request, response) {
    
    let idFaixaEtaria = request.params.id

    //Chama a função para retornar uma classificação pelo ID
    let resultFaixaEtaria = await controllerFaixaEtaria.buscarFaixaEtaria(idFaixaEtaria)

    response.status(resultFaixaEtaria.status_code)
    response.json(resultFaixaEtaria)
})

//EndPoint para deletar uma faixa etaria pelo ID
app.delete('/v1/controle-jogos/faixaEtaria/:id', cors(), bodyParserJson, async function (request, response) {

    //Recebe o ID da classificação
    let idFaixaEtaria = request.params.id

    let resultFaixaEtaria = await controllerFaixaEtaria.excluirFaixaEtaria(idFaixaEtaria)

    response.status(resultFaixaEtaria.status_code)
    response.json(resultFaixaEtaria)
})

//EndPoint para atualizar uma faixa etaria pelo ID
app.put('/v1/controle-jogos/faixaEtaria/:id', cors(), bodyParserJson, async function (request, response) {
    
    let contentType = request.headers['content-type']

    let idFaixaEtaria = request.params.id

    let dadosBody = request.body

    let resultFaixaEtaria = await controllerFaixaEtaria.atualizarFaixaEtaria(dadosBody,idFaixaEtaria,contentType)

    response.status(resultFaixaEtaria.status_code)
    response.json(resultFaixaEtaria)
})






////////////////////////// TBL_ AVALIAÇÃO //////////////////////////
//EndPoint para inserir uma avaliacao no banco de dados
app.post('/v1/controle-jogos/avaliacao', cors(), bodyParserJson, async function (request,response) {
    
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultAvaliacao = await controllerAvaliacao.inserirAvaliacao(dadosBody,contentType)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

//EndPoint para retornar uma lista de avalicao
app.get('/v1/controle-jogos/avaliacao', cors(), async function (request,response) {
    
    let resultAvaliacao = await controllerAvaliacao.listarAvaliacao()

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

//EndPoint para retornar uma avaliacao pelo ID
app.get('/v1/controle-jogos/avaliacao/:id', cors(), async function (request,response){

    let idAvaliacao = request.params.id

    let resultAvaliacao = await controllerAvaliacao.buscarAvaliacao(idAvaliacao)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

//EndPoint para deletar uma avaliacao pelo ID
app.delete('/v1/controle-jogos/avaliacao/:id', cors(), bodyParserJson, async function (request,response){

    let idAvaliacao = request.params.id

    let resultAvaliacao = await controllerAvaliacao.excluirAvalicao(idAvaliacao)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})

//EndPoint para atualizar uma avaliacao pelo ID
app.put('/v1/controle-jogos/avaliacao/:id', cors(), bodyParserJson, async function (request,response){

    let contentType = request.headers['content-type']

    let idAvaliacao = request.params.id

    let dadosBody = request.body

    let resultAvaliacao = await controllerAvaliacao.atualizarAvaliacao(dadosBody,idAvaliacao,contentType)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
})


app.listen('8080', function(){
    console.log('API aguardando Requisições...')
})
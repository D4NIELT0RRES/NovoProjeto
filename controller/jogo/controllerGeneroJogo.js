/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do JOGO.
 * DATA: 21/05/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const jogoGeneroDAO = require('../../model/DAO/genero_jogo.js')

//Função para tratar a inserção de uma nova Plataforma Jogo no DAO
const inserirJogoGenero = async function(generoJogo, contentType){
    try {
        if(contentType == 'application/json')
        {
                if (
                    generoJogo.id_jogo      == ''           || generoJogo.id_jogo             == undefined    || generoJogo.id_jogo   == null        || isNaN(generoJogo.id_jogo)   || generoJogo.id_jogo <=0 ||
                    generoJogo.id_genero    == ''           || generoJogo.id_genero           == undefined    || generoJogo.id_genero == null        || isNaN(generoJogo.id_genero) || generoJogo.id_genero<=0 
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultGeneroJogo = await jogoGeneroDAO.insertJogoGenero(generoJogo)
                    if(resultGeneroJogo)
                        return MESSAGE.SUCCESS_CREATED_ITEM //201
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de uma nova Plataforma Jogo no DAO
const atualizarJogoGenero = async function(id, generoJogo, contentType){
    try {
        if(contentType == 'application/json')
            {
                if (id                             == ''           || id                           == undefined    || id                    == null      || isNaN(id)                                 || id  <= 0                 ||
                    generoJogo.id_jogo             == ''           || generoJogo.id_jogo           == undefined    || generoJogo.id_jogo    == null      || isNaN(generoJogo.id_jogo)                 || jogoGenero.id_jogo<=0    ||
                    generoJogo.id_genero           == ''           || generoJogo.id_genero         == undefined    || generoJogo.id_genero  == null      || isNaN(generoJogo.id_genero)               || jogoGenero.id_genero<=0
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultGeneroJogo = await jogoGeneroDAO.selectByIdJogoGenero(parseInt(id))

                    if(resultGeneroJogo != false || typeof(resultGeneroJogo) == 'object'){
                        if(resultGeneroJogo.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            jogo.id = parseInt(id)

                            let result = await jogoGeneroDAO.updateJogoGenero(generoJogo)

                            if(result){
                                return MESSAGE.SUCCESS_UPDATE_ITEM //200
                            }else{
                                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return MESSAGE.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE //415
            }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de uma nova Plataforma Jogo no DAO
const excluirJogoGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultGeneroJogo = await jogoGeneroDAO.selectByIdJogoGenero(parseInt(id))

            if(resultGeneroJogo != false || typeof(resultGeneroJogo) == 'object'){
                //Se existir, faremos o delete
                if(resultGeneroJogo.length > 0){
                    //delete
                    let result = await jogoGeneroDAO.deleteJogoGenero(parseInt(id))

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de uma Plataforma Jogo do DAO
const listarJogoGenero = async function(){
    try {
        //Objeto do tipo JSON
        let dadosGeneroJogos = {}
        //Chama a função para retornar os generos cadastrados
        let resultGeneroJogo = await jogoGeneroDAO.selectAllJogoGenero()

        if(resultGeneroJogo != false || typeof(resultGeneroJogo) == 'object'){
            if(resultGeneroJogo.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosGeneroJogos.status = true
                dadosGeneroJogos.status_code = 200
                dadosGeneroJogos.items = resultGeneroJogo.length
                dadosGeneroJogos.genero_jogos = resultGeneroJogo

                return dadosGeneroJogos
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarGeneroPorJogo = async function(idJogo){
    try {
        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosGeneroJogos = {}

            let resultGeneroJogo = await jogoGeneroDAO.selectGeneroByIdJogo(parseInt(idJogo)) // SEMPRE COLOQUE O NOME CERTO DA FUNÇÃO
            
            if(resultGeneroJogo != false || typeof(resultGeneroJogo) == 'object'){
                if(resultGeneroJogo.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosGeneroJogos.status = true
                     dadosGeneroJogos.status_code = 200
                     dadosGeneroJogos.generos = resultGeneroJogo

                    return dadosGeneroJogos //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarJogoPorGenero = async function(idGenero){
    try {
        if(idGenero == '' || idGenero == undefined || idGenero == null || isNaN(idGenero) || idGenero <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosGeneroJogos = {}

            let resultGeneroJogo = await jogoGeneroDAO.selectJogoByIdGenero(parseInt(idGenero))
            
            if(resultGeneroJogo != false || typeof(resultGeneroJogo) == 'object'){
                if(resultGeneroJogo.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosGeneroJogos.status = true
                     dadosGeneroJogos.status_code = 200
                     dadosGeneroJogos.jogos = resultGeneroJogo

                    return dadosGeneroJogos //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirJogoGenero,
    atualizarJogoGenero,
    excluirJogoGenero,
    listarJogoGenero,
    buscarJogoPorGenero,
    buscarGeneroPorJogo
}




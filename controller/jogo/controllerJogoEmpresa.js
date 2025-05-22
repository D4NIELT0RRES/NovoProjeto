/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do JOGO.
 * DATA: 21/05/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const jogoEmpresaDAO = require('../../model/DAO/empresa_jogo.js')

const inserirJogoEmpresa = async function(jogoEmpresa, contentType){
    try {
        if(contentType == 'application/json')
        {
                if (
                    jogoEmpresa.id_jogo       == ''           || jogoEmpresa.id_jogo         == undefined    || jogoEmpresa.id_jogo       == null          || isNaN(jogoEmpresa.id_jogo)          || jogoEmpresa.id_jogo <=0 ||
                    jogoEmpresa.id_empresa    == ''           || jogoEmpresa.id_empresa      == undefined    || jogoEmpresa.id_empresa    == null          || isNaN(jogoEmpresa.id_empresa)       || jogoEmpresa.id_empresa<=0 
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultJogoEmpresa = await jogoEmpresaDAO.insertJogoEmpresa(jogoEmpresa)
                    if(resultJogoEmpresa)
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

const atualizarJogoEmpresa = async function(id, jogoEmpresa, contentType){
    try {
        if(contentType == 'application/json')
            {
                if (id                    == ''           || id                      == undefined    || id                       == null   || isNaN(id)                           || id  <= 0                ||
                jogoEmpresa.id_jogo       == ''           || jogoEmpresa.id_jogo     == undefined    || jogoEmpresa.id_jogo       == null  || isNaN(jogoEmpresa.id_jogo)          || jogoEmpresa.id_jogo <=0 ||
                jogoEmpresa.id_empresa    == ''           || jogoEmpresa.id_empresa  == undefined    || jogoEmpresa.id_empresa    == null  || isNaN(jogoEmpresa.id_empresa)       || jogoEmpresa.id_empresa<=0 
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultJogoEmpresa = await jogoDesenvolvedoraDAO.selectByIdJogoDesenvolvedora(parseInt(id))

                    if(resultJogoEmpresa != false || typeof(resultJogoEmpresa) == 'object'){
                        if(resultJogoEmpresa.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            jogo.id = parseInt(id)

                            let result = await jogoEmpresaDAO.updateJogoEmpresa(jogoEmpresa)

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
    } catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirJogoEmpresa = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultJogoEmpresa = await jogoEmpresaDAO.selectByIdJogoEmpresa(parseInt(id))

            if(resultJogoEmpresa != false || typeof(resultJogoEmpresa) == 'object'){
                //Se existir, faremos o delete
                if(resultJogoEmpresa.length > 0){
                    //delete
                    let result = await jogoEmpresaDAO.deleteJogoEmpresa(parseInt(id))

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

const listarJogoEmpresa = async function(){
    try {
        //Objeto do tipo JSON
        let dadosJogoEmpresa = {}
        //Chama a função para retornar os generos cadastrados
        let resultJogoEmpresa = await jogoDesenvolvedoraDAO.selectAllJogoDesenvolvedora()

        if(resultJogoEmpresa != false || typeof(resultJogoEmpresa) == 'object'){
            if(resultJogoEmpresa.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosJogoEmpresa.status = true
                dadosJogoEmpresa.status_code = 200
                dadosJogoEmpresa.items = resultJogoEmpresa.length
                dadosJogoEmpresa.jogo_empresa = resultJogoEmpresa

                return dadosJogoEmpresa
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

const buscarJogoEmpresa = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{

            let dadosJogoEmpresa = {}

            let resultJogoEmpresa = await jogoEmpresaDAO.selectByIdJogoEmpresa(parseInt(id))
            
            if(resultJogoEmpresa != false || typeof(resultJogoEmpresa) == 'object'){
                if(resultJogoEmpresa.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosJogoEmpresa.status = true
                     dadosJogoEmpresa.status_code = 200
                     dadosJogoEmpresa.generos = resultJogoEmpresa

                    return dadosJogoEmpresa //200
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

const buscarEmpresaPorJogo = async function(idJogo){
    try {
        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosEmpresaPorJogo = {}

            let resultEmpresaPorJogo = await jogoEmpresaDAO.selectByIdJogoEmpresa(parseInt(idJogo)) // SEMPRE COLOQUE O NOME CERTO DA FUNÇÃO
            
            if(resultEmpresaPorJogo != false || typeof(resultEmpresaPorJogo) == 'object'){
                if(resultEmpresaPorJogo.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosEmpresaPorJogo.status = true
                     dadosEmpresaPorJogo.status_code = 200
                     dadosEmpresaPorJogo.empresa = resultEmpresaPorJogo

                    return dadosEmpresaPorJogo //200
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
    inserirJogoEmpresa,
    atualizarJogoEmpresa,
    excluirJogoEmpresa,
    listarJogoEmpresa,
    buscarJogoEmpresa,
    buscarEmpresaPorJogo
}
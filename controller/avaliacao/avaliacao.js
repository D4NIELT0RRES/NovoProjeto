/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do JOGO.
 * DATA: 17/05/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração para a mensagem e status code
const MESSAGE = require('../../modulo/config.js')

const avaliacaoDAO = require('../../model/DAO/avaliacao.js')

const controllerJogo = require('../jogo/controllerJogo.js')

const inserirAvaliacao = async function (avaliacao, contentType) {
    
    try {
        if(contentType == 'application/json'){

            if( avaliacao.nome            == undefined  ||  avaliacao.nome            == ''   || avaliacao.nome            == null   || avaliacao.nome.length > 45 || 
                avaliacao.email           == undefined  ||  avaliacao.email           == ''   || avaliacao.email           == null   || avaliacao.email.length > 50 ||
                avaliacao.descricao       == undefined  ||  avaliacao.descricao       == ''   || avaliacao.descricao       == null   ||
                avaliacao.tipo_de_console == undefined  ||  avaliacao.tipo_de_console == ''   || avaliacao.tipo_de_console == null   || avaliacao.tipo_de_console.length > 45 ||
                avaliacao.id_jogo         == undefined  || avaliacao.id_jogo          == ''   
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
            }else{
                let resultAvaliacao = await avaliacaoDAO.insertAvaliacao(avaliacao)

                if(resultAvaliacao){
                    return MESSAGE.SUCCESS_CREATED_ITEM//201
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
    }catch(error){
        console.log(error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

const atualizarAvaliacao = async function (avaliacao,id,contentType) {
    
    try {
        if(contentType == 'application/json'){

            if( avaliacao.nome            == undefined  ||  avaliacao.nome            == ''   || avaliacao.nome            == null   || avaliacao.nome.length > 45 || 
                avaliacao.email           == undefined  ||  avaliacao.email           == ''   || avaliacao.email           == null   || avaliacao.email.length > 50 ||
                avaliacao.descricao       == undefined  ||  avaliacao.descricao       == ''   || avaliacao.descricao       == null   || 
                avaliacao.tipo_de_console == undefined  ||  avaliacao.tipo_de_console == ''   || avaliacao.tipo_de_console == null   || avaliacao.tipo_de_console.length > 45 ||
                id == undefined || id == '' || id == null || isNaN(id) || id<= 0 ||
                avaliacao.id_jogo         == undefined ||   avaliacao.id_jogo         == ''   || avaliacao.id_jogo         == null   || isNaN(avaliacao.id_jogo) || avaliacao.id_jogo <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
            }else{
                let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))

                if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
                    if(resultAvaliacao.length > 0){

                        avaliacao.id = parseInt(id)

                        let result = await avaliacaoDAO.updateAvaliacao(avaliacao)

                        if(result){
                            return MESSAGE.SUCCESS_UPDATE_ITEM//200
                        }else{
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                        }
                    }else{
                        return MESSAGE.ERROR_NOT_FOUND//404
                    }
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

const excluirAvalicao = async function (id) {
    
    try {
        if(id == undefined || id == '' || id == null || isNaN(id) || id<= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{
            let resulAvaliacao = await buscarAvaliacao(parseInt(id))

            if(resulAvaliacao.status_code == 200){

                let result = await avaliacaoDAO.deleteAvaliacao(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM//200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else if(resulAvaliacao.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND//404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500   
    }
}

const listarAvaliacao = async function () {
    try {

        const arrayAvaliacao = []
        let dadosAvaliacao = {}
        let resultAvaliacao = await avaliacaoDAO.selectAllAvaliacao()

        if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
            if(resultAvaliacao.length > 0){

                dadosAvaliacao.status = true
                dadosAvaliacao.status_code = 200
                dadosAvaliacao.items = resultAvaliacao.length

                for(itemAvaliacao of resultAvaliacao){

                    let dadosAvaliacao = await controllerJogo.buscarJogo(itemAvaliacao.id_jogo)

                    itemAvaliacao.jogo = dadosAvaliacao.games

                    delete itemAvaliacao.id_jogo

                    arrayAvaliacao.push(itemAvaliacao)
                }

                dadosAvaliacao.avaliacao = arrayAvaliacao

                return dadosAvaliacao
            }else{
                return MESSAGE.ERROR_NOT_FOUND//400
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

const buscarAvaliacao =async function (id) {
    
    try {
        if(id == undefined || id == '' || id == null || isNaN(id) || id<= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{
            let dadosAvaliacao = {}

            let resulAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))

            if(resulAvaliacao != false || typeof(resulAvaliacao) == 'object'){
                if(resulAvaliacao.length > 0){

                    dadosAvaliacao.status = true
                    dadosAvaliacao.status_code = 200
                    dadosAvaliacao.games = resulAvaliacao

                    return dadosAvaliacao
                }else{
                    return MESSAGE.ERROR_NOT_FOUND//404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
            }
        }
    }catch(error){        
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

module.exports = {
    inserirAvaliacao,
    atualizarAvaliacao,
    excluirAvalicao,
    listarAvaliacao,
    buscarAvaliacao
}
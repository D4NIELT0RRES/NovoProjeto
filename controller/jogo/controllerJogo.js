/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do JOGO.
 * DATA: 13/02/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração para a mensagem e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar um CRUD no banco de dados
const jogoDAO = require('../../model/DAO/jogo.js')
const { deserializeRawResult } = require('@prisma/client/runtime/library')

//Import das controllers para criar as relações com a faixa_etaria
const controllerFaixaEtaria = require('../faixa_etaria/controllerFaixa_etaria.js')

const controllerGeneroJogo     = require('../jogo/controllerGeneroJogo.js')
const controllerJogoEmpresa    = require('../jogo/controllerJogoEmpresa.js')
const controllerPlataformaJogo = require('../jogo/controllerPlataformaJogo.js')

//Função para inserir um novo jogo
const inserirJogo = async function(jogo,contentType){

    try{
        
        if(contentType == 'application/json'){

            if( jogo.nome            == undefined  ||  jogo.nome             == ''   || jogo.nome            == null   || jogo.nome.length            > 80   ||
                jogo.data_lancamento == undefined  ||  jogo.data_lancamento  == ''   || jogo.data_lancamento == null   || jogo.data_lancamento.length > 10   ||
                jogo.versao          == undefined  ||  jogo.versao           == ''   || jogo.versao          == null   || jogo.versao.length          > 10   ||
                jogo.tamanho         == undefined  ||  jogo.tamanho.length   > 10    ||
                jogo.descricao       == undefined  || 
                jogo.foto_capa       == undefined  ||  jogo.foto_capa.length > 200   ||
                jogo.link            == undefined  ||  jogo.link.length      > 200   ||
                jogo.id_faixa_etaria == undefined  ||  jogo.id_faixa_etaria == ''    || jogo.id_faixa_etaria  == null || isNaN(jogo.id_faixa_etaria) || jogo.id_faixa_etaria <= 0 
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //encamnha os dados do novo jogo para ser inserido no banco de dados
                let resultJogo = await jogoDAO.insertJogo(jogo)
                                
                if(resultJogo){
                    for(itemPlataforma of jogo.plataforma){
                        itemPlataforma.id_jogo = resultJogo.id

                        let resultPlataforma = await controllerPlataformaJogo.inserirPlataformaJogo(itemPlataforma,contentType)
                        

                        if(!resultPlataforma){
                            return MESSAGE.ERROR_CONTENT_TYPE
                        }
                    }

                    for(itemGenero of jogo.generos){
                        itemGenero.id_jogo = resultJogo.id

                        let resultGenero = await controllerGeneroJogo.inserirJogoGenero(itemGenero,contentType)

                        if(!resultGenero){
                            return MESSAGE.ERROR_CONTENT_TYPE
                        }
                    }

                    for(itemEmpresa of jogo.empresa){
                        itemEmpresa.id_jogo = resultJogo.id

                        let resultEmpresa = await controllerJogoEmpresa.inserirJogoEmpresa(itemEmpresa,contentType)

                        if(!resultEmpresa){
                            return MESSAGE.ERROR_CONTENT_TYPE
                        }
                    }
                    return MESSAGE.SUCCESS_CREATED_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }
        

        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    
    } catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }   
}

//Função para atualizar um jogo
const atualizarJogo = async function(jogo,id,contentType){

    try{
        if(contentType == 'application/json'){

            if( jogo.nome            == undefined ||            jogo.nome            == ''  ||            jogo.nome            == null || jogo.nome.length              > 80 ||
                jogo.data_lancamento == undefined ||            jogo.data_lancamento == ''  ||            jogo.data_lancamento == null || jogo.data_lancamento.length   > 10 ||
                jogo.versao          == undefined ||            jogo.versao          == ''  ||            jogo.versao          == null || jogo.versao.length            > 10 ||
                jogo.tamanho         == undefined ||            jogo.tamanho.length   > 10  ||
                jogo.descricao       == undefined ||
                jogo.foto_capa       == undefined ||            jogo.foto_capa.length > 200 ||
                jogo.link            == undefined ||            jogo.link.length      > 200 ||
                id                   == undefined ||            id == ''  || id == null || isNaN(id) || id<= 0 ||
                jogo.id_faixa_etaria == undefined ||            jogo.id_faixa_etaria == '' || jogo.id_faixa_etaria == null || isNaN(jogo.id_faixa_etaria) || jogo.id_faixa_etaria <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Validar se o ID existe no BD
                let resultJogo = await jogoDAO.selectByIdJogo(parseInt(id))
                
                if(resultJogo != false || typeof(resultJogo) == 'object'){
                    if(resultJogo.length > 0){

                        jogo.id = parseInt(id)

                        let result = await jogoDAO.updateJogo(jogo)

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

//Função para excluir um jogo 
const excluirJogo = async function(id){

    try{
        if(id == "" || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{
            let resultJogo = await buscarJogo(parseInt(id))
            
            if(resultJogo.status_code == 200){
                //Delete
                let result = await jogoDAO.deleteJogo(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM//200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else if(resultJogo.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND//404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500 
    }

}

//Função para retornar todos os jogos
const listarJogo = async function(){

    try{

        //Objeto do tipo array para utilizar no foreach para carregar os dados 
        //do filme e da classificacao
        const arrayJogos = []

        let dadosJogos = {}
        //Chama a função para retornar os dados do jogo
        let resultJogo = await jogoDAO.selectAllJogo()

        if(resultJogo != false || typeof(resultJogo) == 'object'){
            if(resultJogo.length > 0){

                //Cria um objeto do tipo JSON para retornar a lista de jogos
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.items = resultJogo.length
                
                //resultFilme.forEach(async function(itemFilme){
                //foi necessário substituir o foreach pelo for of, pois
                //o foreach não consegue trabalhar com requisições async e await
                for(itemJogo of resultJogo){
                    //Busca os dados da classificação na controller de classificação
                    //Utilizando o ID da classificação (Chave estrangeira)
                    let dadosFaixaEtaria = await controllerFaixaEtaria.buscarFaixaEtaria(itemJogo.id_faixa_etaria)
                    
                    //Adicionando um atributo "classificacao" no JSON de filmes
                    itemJogo.faixa_etaria = dadosFaixaEtaria.games

                    //Remove o atributo id_classificacao do JSON de filmes, pois já temos
                    //o ID dentro dos dados da classificação
                    delete itemJogo.id_faixa_etaria

                    let dadosPlataforma = await controllerPlataformaJogo.buscarPlataformaPorJogo(itemJogo.id)
                    itemJogo.plataforma = dadosPlataforma.plataforma

                    let dadosVersaoPlataformaJogo = await controllerPlataformaJogo.buscarVersaoPorJogo(itemJogo.id)
                    itemJogo.versoes = dadosVersaoPlataformaJogo.games

                    let dadosGeneroJogo = await controllerGeneroJogo.buscarGeneroPorJogo(itemJogo.id)
                    itemJogo.generos = dadosGeneroJogo.generos

                    let dadosEmpresa = await controllerJogoEmpresa.buscarEmpresaPorJogo(itemJogo.id)
                    itemJogo.empresa = dadosEmpresa.empresa

                    //Adiciona o JSON do filme, agora com os dados da classificação
                    //em um array
                    arrayJogos.push(itemJogo)

                }
                //Adiciona o nov array de filmes no JSON para retornar ao APP
                dadosJogos.jogos = arrayJogos

                return dadosJogos//200

            }else{
                return MESSAGE.ERROR_NOT_FOUND//400
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
        }
    }catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    


}

//Função para buscar um jogo pelo ID
const buscarJogo = async function(id){

    try{

        let arrayJogos = []
        let idJogo = id

        if(id == "" || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{

            let dadosJogos = {}

            //Chama a função para retornar os dados do jogo
            let resultJogo = await jogoDAO.selectByIdJogo(parseInt(idJogo))
            if(resultJogo != false || typeof(resultJogo) == 'object'){
                if(resultJogo.length > 0){

                    //Cria um objeto do tipo JSON para retornar a lista de jogos
                    dadosJogos.status = true
                    dadosJogos.status_code = 200
                    dadosJogos.games = resultJogo

                    for(itemJogo of resultJogo){
                        //Busca os dados da classificação na controller de classificação
                        //Utilizando o ID da classificação (Chave estrangeira)
                        let dadosFaixaEtaria = await controllerFaixaEtaria.buscarFaixaEtaria(itemJogo.id_faixa_etaria)
                        
                        //Adicionando um atributo "classificacao" no JSON de filmes
                        itemJogo.faixa_etaria = dadosFaixaEtaria.games
    
                        //Remove o atributo id_classificacao do JSON de filmes, pois já temos
                        //o ID dentro dos dados da classificação
                        delete itemJogo.id_faixa_etaria
    
                        let dadosPlataforma = await controllerPlataformaJogo.buscarPlataformaPorJogo(itemJogo.id)
                        itemJogo.plataforma = dadosPlataforma.plataforma

                        let dadosVersaoPlataformaJogo = await controllerPlataformaJogo.buscarVersaoPorJogo(itemJogo.id)
                        itemJogo.versoes = dadosVersaoPlataformaJogo.versoes

                        let dadosGeneroJogo = await controllerGeneroJogo.buscarGeneroPorJogo(itemJogo.id)
                        itemJogo.generos = dadosGeneroJogo.generos

                        let dadosEmpresa = await controllerJogoEmpresa.buscarEmpresaPorJogo(itemJogo.id)
                        itemJogo.empresa = dadosEmpresa.empresa
    
                        //Adiciona o JSON do filme, agora com os dados da classificação
                        //em um array
                        arrayJogos.push(itemJogo)
    
                    }

                    dadosJogos.jogos = arrayJogos

                    return dadosJogos//200
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

module.exports ={
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}
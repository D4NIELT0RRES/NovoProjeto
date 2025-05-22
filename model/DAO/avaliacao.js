/***************************************************************************************
 * OBJETIVO: Model responsável pelo CRUD de dados referente a JOGOS no BANCO DE DADOS.
 * DATA: 17/05/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

const insertAvaliacao = async function (avaliacao) {
    
    try {
        
        let sql = `insert into tbl_avaliacao(
                                                nome,
                                                email,
                                                descricao,
                                                tipo_de_console,
                                                id_jogo
                                            ) values (
                                                '${avaliacao.nome}',
                                                '${avaliacao.email}',
                                                '${avaliacao.descricao}',
                                                '${avaliacao.tipo_de_console}',
                                                ${avaliacao.id_jogo}
                                            );`

    //Executa o script SQL no BD e aguarde o retorno no BD
    let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }  
    }catch(error){
        console.log(error);
        return false
    }
}

const updateAvaliacao = async function (avaliacao) {
    
    try {
        let sql = `update tbl_avaliacao set    nome            = '${avaliacao.nome}',
                                               email           = '${avaliacao.email}',
                                               descricao       = '${avaliacao.descricao}',
                                               tipo_de_console = '${avaliacao.tipo_de_console}',
                                               id_jogo         = ${avaliacao.id_jogo}
                                               where id        = ${avaliacao.id}` 
        
        //Executa o script SQL no BD e aguarda o retorno no BD     
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result){
            return true
        }else{
            return false                    
        }
    } catch (error) {
        
    }
}

const deleteAvaliacao = async function (id) {
    
    try {        
        let sql = `delete from tbl_avaliacao where id=${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectAllAvaliacao = async function () {
    
    try {
        //Script SQL para retornar os dados no BD
        let sql = `select * from tbl_avaliacao order by id desc`

        //Executa o script SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

const selectByIdAvaliacao = async function (id) {
    
    try {
        let idAvaliacao = id
        let sql = `select * from tbl_avaliacao where id=${idAvaliacao}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    }catch(error){
        console.log(error)
        return false
    }
}

module.exports = {
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacao,
    selectByIdAvaliacao
}
/***************************************************************************************
 * OBJETIVO: Model responsável pelo CRUD de dados referente a JOGOS no BANCO DE DADOS.
 * DATA: 13/02/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//TRY-CATCH - usado para nao derrubar a api depois de subir ela, e usando o console.log ela guia o lugar do erro (Sempre usar Try-Catch)

//quando for script que nao retorna dados (insert,update e delete) -> executeRawUnsafe
//quando for script que tem algum retorno (return) - queryRawUnsafe

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco da Dados um novo jogo
const insertJogo = async function(jogo){
    try{

        let sql = `insert into tbl_jogo(
                                            nome,
                                            data_lancamento,
                                            versao,
                                            tamanho,
                                            descricao,
                                            foto_capa,
                                            link,
                                            id_faixa_etaria

                                        ) values (
                                            '${jogo.nome}',
                                            '${jogo.data_lancamento}',
                                            '${jogo.versao}',
                                            '${jogo.tamanho}',
                                            '${jogo.descricao}',
                                            '${jogo.foto_capa}',
                                            '${jogo.link}',
                                            ${jogo.id_faixa_etaria}
                                        );`
        //Executa o script SQL no BD e aguarda o retorno no BD
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result){
            let sqlSelect = `SELECT * FROM tbl_jogo WHERE nome = '${jogo.nome}' ORDER BY id DESC LIMIT 1` // DEVOLVER O ID DO JOGO PARA USAR NA CONTROLLER
            let criado = await prisma.$queryRawUnsafe(sqlSelect) 
            return criado[0] 
        }else{
            return false
        }    
    } catch(error){        
        return false    
    }

}

//Função para atualizar no Banco de Dados um jogo existente
const updateJogo = async function(jogo){

    try{
        let sql = `update tbl_jogo set      nome            ='${jogo.nome}',
                                            data_lancamento = '${jogo.data_lancamento}',
                                            versao          = '${jogo.versao}',
                                            tamanho         = '${jogo.tamanho}',
                                            descricao       = '${jogo.descricao}',
                                            foto_capa       = '${jogo.foto_capa}',
                                            link            = '${jogo.link}', 
                                            id_faixa_etaria = '${jogo.id_faixa_etaria}'
                                            where id = ${jogo.id}`

        //Executa o script SQL no BD e aguarda o retorno no BD
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result){
            return true
        }else{
            return false                    
        }
    }catch(error){
        return false
    }
}

//Função para excluir no Banco de Dados um jogo existente
const deleteJogo = async function(id){

    try{
        let idJogo = id
        let sql = `delete from tbl_jogo where id=${idJogo}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }

    }catch(error){
        return false
    }
}

//Função para retornar do Banco de dados uma lista de jogos
const selectAllJogo = async function(){

    try{
        //Script SQL para retornar os dados do BD
        let sql = `select * from tbl_jogo `

        //Executa o script SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    }catch (error){
        return false
    }

}

//Função para buscar no Banco de Dados um jogo pelo ID
const selectByIdJogo = async function(id){

    try{
        let idJogo = id
        let sql = `select * from tbl_jogo where id=${idJogo}`

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

module.exports = {
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo
}

/***************************************************************************************
 * OBJETIVO: Model responsável pelo CRUD de dados referente a genero_jogo no BANCO DE DADOS.
 * DATA: 21/05/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo genero_jogo
const insertJogoGenero = async function(jogoGenero){
    try {
  
        let sql = `insert into tbl_genero_jogo (
                                                  id_jogo,
                                                  id_genero
                                                ) values(
                                                    '${jogoGenero.id_jogo}',
                                                    '${jogoGenero.id_genero}'
                                                );`
        //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
        //saber se deu certo                                  
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

//Função para atualizar um genero_jogo existente
const updateJogoGenero = async function(jogoGenero){
    try {
        let sql = `update tbl_genero_jogo set         id_jogo       = '${jogoGenero.id_jogo}',
                                                      id_genero     = '${jogoGenero.id_genero}'
                                                      where id = ${jogoGenero.id}`
        let resultJogoGenero = await prisma.$executeRawUnsafe(sql)
  
        if(resultJogoGenero){
            return true
        }else{
            return false
        }
    } catch (error) {
      return false
    }
}

//Função para excluir um FilmeGenero existente
const deleteJogoGenero = async function(id){
    try {
      let sql = `delete from tbl_genero_jogo where id = ${id}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result){
        return true
      }else{
        return false
      }
    } catch (error) {
      return false
    }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllJogoGenero = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_genero_jogo order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result){
        return result
      }else{
        return false
      }

    } catch (error) {
      return false
    }
}

//Função para buscar um FilmeGenero pelo ID
const selectByIdJogoGenero = async function(id){
    try {
      let sql = `select * from tbl_genero_jogo where id=${id}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if(result){
        return result
      }else{
        return false
      }
    } catch (error) {
      return false
    }
}

const selectGeneroByIdJogo= async function(idJogo){
    try{
      let sql= `select tbl_genero.* from tbl_jogo
                      inner join tbl_jogo_genero
                        on tbl_jogo.id = tbl_jogo_genero.id_jogo
                      inner join tbl_genero
                        on tbl_genero.id = tbl_jogo_genero.id_genero
                    where tbl_jogo.id = ${idJogo}`
  
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
    insertJogoGenero,
    updateJogoGenero,
    deleteJogoGenero,
    selectAllJogoGenero,
    selectByIdJogoGenero,
    selectGeneroByIdJogo
}
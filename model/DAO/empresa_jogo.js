/***************************************************************************************
 * OBJETIVO: Model responsável pelo CRUD de dados referente a empresa_jogo no BANCO DE DADOS.
 * DATA: 21/05/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um nova PlataformaJogo
const insertJogoEmpresa = async function(JogoEmpresa){
    try {
  
        let sql = `insert into tbl_jogo_empresa (id_jogo,
                                                 id_empresa
                                                ) values (
                                                    '${JogoEmpresa.id_jogo}',
                                                    '${JogoEmpresa.id_empresa}'
                                                );`
        //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
        //saber se deu certo                                  
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

//Função para atualizar uma PlataformaJogo existente
const updateJogoEmpresa = async function(JogoEmpresa){
    try {
        let sql = `update tbl_jogo_desenvolvedora set     id_jogo      = '${JogoEmpresa.id_jogo}',
                                                          id_empresa   = '${JogoEmpresa.id_empresa}'
                                                      where id = ${JogoEmpresa.id}`
        let resultJogoEmpresa = await prisma.$executeRawUnsafe(sql)
  
        if(resultJogoEmpresa){
            return true
        }else{
            return false
        }
    }catch(error){
      return false
    }
}

//Função para excluir um FilmeGenero existente
const deleteJogoEmpresa = async function(id){
    try {
      let sql = `delete from tbl_jogo_empresa where id = ${id}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result){
        return true
      }else{
        return false
      }
    }catch(error){
      return false
    }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllJogoEmpresa = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_jogo_empresa order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
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

//Função para buscar um FilmeGenero pelo ID
const selectByIdJogoEmpresa = async function(id){
    try {
      let sql = `select * from tbl_jogo_empresa where id = ${id}`
  
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

const selectEmpresaByIdJogo = async function(idJogo){
    try{
      let sql= `select tbl_empresa.* from tbl_jogo
                      inner join tbl_jogo_empresa
                        on tbl_jogo.id = tbl_jogo_empresa.id_jogo
                      inner join tbl_empresa
                        on tbl_empresa.id = tbl_jogo_empresa.id_empresa
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

const selectJogoByIdEmpresa = async function (idEmpresa) {
  
  try {
    let sql = `SELECT tbl_jogo.* FROM tbl_jogo
                INNER JOIN tbl_jogo_empresa
                  ON tbl_jogo.id = tbl_jogo_empresa.id_jogo
                INNER JOIN tbl_empresa
                  ON tbl_empresa.id = tbl_jogo_empresa.id_empresa
                WHERE tbl_empresa.id = ${idEmpresa};`

    let result = prisma.$queryRawUnsafe(sql)

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
    insertJogoEmpresa,
    updateJogoEmpresa,
    deleteJogoEmpresa,
    selectAllJogoEmpresa,
    selectByIdJogoEmpresa,
    selectEmpresaByIdJogo,
    selectJogoByIdEmpresa
}
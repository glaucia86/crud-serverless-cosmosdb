/**
 * Arquivo: shared/error.js
 * Descrição: arquivo responsável pelas mensagens de erros relacionados a 
 *  Conexão com o CosmosDb
 * Data: 24/08/2019
 * Author: Glaucia Lemos
 */

module.exports = function handleError (status, message, context) {
  context.res = {
    status: status,
    body: message
  };

  context.done();
}



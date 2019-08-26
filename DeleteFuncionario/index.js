// @ts-nocheck
/**
 * Arquivo: DeleteFuncionario/index.js
 * Data: 24/08/2019
 * Descrição: arquivo responsável por excluir um 'Funcionário' pelo Id via CosmosDb
 *
 * Digitar o snippet: cosmos-serverless-delete
 */

const mongodb = require('mongodb');
const conn = require('../shared/databaseCosmosDb');
const handleError = require('../shared/error');

module.exports = function(context, req) {
  conn
    .connect()
    .then(client => {
      query(client);
    })
    .catch(err => handleError(500, err, context));

  const query = client => {
    const db = client.db('crud-serverless-wavy');
    db.collection('funcionarios')
      .findOneAndDelete({ _id: mongodb.ObjectID(context.req.params.id) })
      .then(res => {
        const documentDeleted = res.value;
        if (documentDeleted) {
          context.res = {
            status: 200,
            body: { message: 'Funcionário excluído com sucesso!' }
          };
          context.done();
        } else {
          handleError(500, "Document not found", context);
        }
      })
      .catch(err => handleError(500, err, context));
  };
};
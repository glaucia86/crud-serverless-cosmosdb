// @ts-nocheck
/**
 * Arquivo: DeleteFuncionario/index.js
 * Data: 24/08/2019
 * Descrição: arquivo responsável por excluir um 'Funcionário' pelo Id via CosmosDb
 *
 * Digitar o snippet: cosmos-serverless-delete
 */

const { ObjectID } = require('mongodb');
const conn = require('../shared/databaseCosmosDb');
const handleError = require('../shared/error');

module.exports = async function(context, req) {
  try {
    const client = await conn.connect();
    const db = client.db('crud-serverless-wavy');
    const res = await db.collection('funcionarios')
      .findOneAndDelete({ _id: ObjectID(context.req.params.id) });
    const documentDeleted = res.value;
    if (documentDeleted) {
      return context.res.json({ message: 'Funcionário excluído com sucesso!' });
    } else {
      return handleError(500, "Document not found", context);
    }

  } catch (err) {
    return handleError(500, err, context);
  }
};
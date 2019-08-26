// @ts-nocheck
/**
 * Arquivo: UpdateFuncionario/index.js
 * Data: 24/08/2019
 * Descrição: arquivo responsável por atualizar 'Funcionario' por Id via CosmosDb
 * Author: Glaucia Lemos
 *
 * Digitar o snippet: cosmos-serverless-update
 */

const { ObjectID } = require("mongodb");
const conn = require("../shared/databaseCosmosDb");
const handleError = require("../shared/error");

module.exports = async function(context, req) {
  try {
    const client = await conn.connect();
    const db = client.db("crud-serverless-wavy");
  
    const funcionario = ({
      nomeFuncionario,
      cargo,
      numeroIdentificador
    } = context.req.body);
  
    funcionario._id = ObjectID(req.params.id);
  
    const res = await db.collection("funcionarios")
      .findOneAndReplace({ _id: funcionario._id }, funcionario);

    const updatedDocument = res.value;
    if (updatedDocument) {
      context.res.json(res.value);
    } else {
      return handleError(500, "Document not found", context);
    }

  } catch (err) {
    return handleError(500, err, context);
  }
};


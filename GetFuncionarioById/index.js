// @ts-nocheck
/**
 * Arquivo: GetFuncionarioById/index.js
 * Data: 24/08/2019
 * Descrição: arquivo responsável por selecionar um 'Funcionário' pelo Id via CosmosDb
 *
 * Digitar o snippet: cosmos-serverless-listOne
 */

const { ObjectID } = require("mongodb");
const conn = require("../shared/databaseCosmosDb");
const handleError = require("../shared/error");

module.exports = async function(context) {
  try {
    const client = await conn.connect();
    const db = client.db("crud-serverless-wavy");
    const res = await db.collection("funcionarios")
      .findOne({ _id: ObjectID(context.req.params.id) });

    if (res) {
      context.res.json(res);
    } else {
      context.res = {
        status: 404,
        body: "Not found"
      }
    }

  } catch (err) {
    return handleError(500, err, context);
  }
}
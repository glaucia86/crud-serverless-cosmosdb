// @ts-nocheck
/**
 * Arquivo: GetFuncionarios/index.js
 * Data: 24/08/2019
 * Descrição: arquivo responsável por listar Funcionarios via CosmosDb
 * Author: Glaucia Lemos
 * 
 * Digitar o snippet: cosmos-serverless-list
 */

const conn = require("../shared/databaseCosmosDb");
const handleError = require("../shared/error");

module.exports = async function (context) {
  try {
    const client = await conn.connect();
    const database = client.db("crud-serverless-wavy");
    const res = await database.collection("funcionarios")
      .find()
      .toArray();
    context.log("Retornando todos os funcionários com sucesso!");
    context.res.json(res);
  } catch (err) {
    return handleError(500, err, context);
  }
};

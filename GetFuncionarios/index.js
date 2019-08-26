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

module.exports = context => {
  conn
    .connect()
    .then(client => {
      query(client);
    })
    .catch(err => handleError(500, err, context));

    const query = client => {
    const database = client.db("crud-serverless-wavy");

    database
      .collection("funcionarios")
      .find()
      .toArray()
      .then(res => {
        context.log("Retornando todos os funcionários com sucesso!");

        context.res = {
          status: 200,
          body: res
        };
        context.done();
      })
      .catch(err => handleError(500, err.stack, context));
  };
};

// @ts-nocheck
/**
 * Arquivo: CreateFuncionario/index.js
 * Data: 24/08/2019
 * Descrição: arquivo responsável por criar um novo 'Funcionário' via CosmosDb
 *
 * Digitar o snippet: cosmos-serverless-create
 */

const conn = require("../shared/databaseCosmosDb");
const handleError = require("../shared/error");

module.exports = async function(context, req) {
  try {
    const client = await conn.connect();
    const database = client.db("crud-serverless-wavy");

    const funcionario = ({
      nomeFuncionario,
      cargo,
      numeroIdentificador
    } = context.req.body);

    const res = await database
      .collection("funcionarios")
      .insertOne(funcionario);
    context.res.json(res);

  } catch (err) {
    context.log("Erro ao criar um novo(a) Funcionário(a)");
    return handleError(500, err, context);
  }
}
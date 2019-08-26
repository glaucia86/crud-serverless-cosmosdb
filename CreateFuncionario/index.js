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

module.exports = (context, req) => {
  conn
    .connect()
    .then(client => {
      query(client);
    })
    .catch(err => handleError(500, err, context));

  const query = client => {
    let funcionario = ({
      nomeFuncionario,
      cargo,
      numeroIdentificador
    } = context.req.body);

    const database = client.db("crud-serverless-wavy");

    database
      .collection("funcionarios")
      .insertOne({
        nomeFuncionario: funcionario.nomeFuncionario,
        cargo: funcionario.cargo,
        numeroIdentificador: funcionario.numeroIdentificador
      })
      .then(res => {
        context.res = {
          body: funcionario
        };

        context.done();
      })
      .catch(err => {
        context.log("Erro ao criar um novo(a) Funcionário(a)");
        context.res = {
          status: 500,
          body: err.stack
        };

        context.done();
      });
  };
};

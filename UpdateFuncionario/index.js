// @ts-nocheck
/**
 * Arquivo: UpdateFuncionario/index.js
 * Data: 24/08/2019
 * Descrição: arquivo responsável por atualizar 'Funcionario' por Id via CosmosDb
 * Author: Glaucia Lemos
 *
 * Digitar o snippet: cosmos-serverless-update
 */

const conn = require("../shared/databaseCosmosDb");
const handleError = require("../shared/error");

module.exports = function(context, req) {
  conn
    .connect()
    .then(client => {
      query(client);
    })
    .catch(err => handleError(500, err, context));

  const query = client => {
    const database = client.db("crud-serverless-wavy");

    const funcionario = ({
      id,
      nomeFuncionario,
      cargo,
      numeroIdentificador
    } = context.req.body);

    database
      .collection("funcionarios")
      .findOneAndUpdate(
        {
          id: context.req.params.id
        },
        {
          id: funcionario.id,
          nomeFuncionario: funcionario.nomeFuncionario,
          cargo: funcionario.cargo,
          numeroIdentificador: funcionario.numeroIdentificador
        })
      .then(funcionario => {
        context.res = {
          body: funcionario
        };
        context.done();
      })
      .catch(err => handleError(500, err, context));
  };
};

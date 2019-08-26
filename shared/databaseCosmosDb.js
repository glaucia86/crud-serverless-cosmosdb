/**
 * Arquivo: shared/dataBaseCosmosDb.js
 * Descrição: arquivo responsável pela conexão com o CosmosDb
 * Data: 24/08/2019
 * Author: Glaucia Lemos
 * Snippet: cosmos-serverless-conn
 */

const MongoClient = require('mongodb').MongoClient;

const auth = {
  user: process.env.CosmosDBUser,
  password: process.env.CosmosDBPassword
};

const clientPromise = MongoClient.connect(process.env.CosmosDBURL, { auth: auth });

module.exports = {
  connect: () => clientPromise
};

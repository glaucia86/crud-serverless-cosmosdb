/**
 * Arquivo: shared/dataBaseCosmosDb.js
 * Descrição: arquivo responsável pela conexão com o CosmosDb
 * Data: 24/08/2019
 * Author: Glaucia Lemos
 * Snippet: cosmos-serverless-conn
 */

const MongoClient = require('mongodb').MongoClient;

let client =  null;

module.exports = {
  connect: () => {
    const auth = {
      user: process.env.CosmosDBUser,
      password: process.env.CosmosDBPassword
    };

    return new Promise((resolve, reject) => {
      if (client == null) {
        MongoClient.connect(process.env.CosmosDBURL, { auth: auth }).then(_client => {
          client = _client;
          resolve(_client);  
        }).catch(err => {
          reject(err.status);
        });
      } else {
        resolve(client);
      }
    })
  }
};



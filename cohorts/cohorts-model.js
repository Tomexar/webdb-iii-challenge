const knex = require('knex');
const knexConfig =  require('../knexfile')
db = knex(knexConfig.development)

module.exports = {
    find,
    findById
}
function find(){
    return db('cohorts')
}
function findById(id) {
    return db('cohorts')
      .where({ id })
      .first();
  }
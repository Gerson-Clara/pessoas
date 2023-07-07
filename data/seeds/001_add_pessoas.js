/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  return knex("pessoas").del()
    .then(function () {
      return knex("pessoas").insert([
        {
          nome: "Felipe", idade: 18,
        },
        {
          nome: "Bruna", idade: 17,
        },
        {
          nome: "Renata", idade: 19,
        },
      ])
    })
}

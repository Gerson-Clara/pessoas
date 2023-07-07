/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("pessoas", (table) => {
        table.increments()
        table.string("nome", 250).notNullable()
        table.integer("idade", 3).notNullable()
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable("pessoas")
}

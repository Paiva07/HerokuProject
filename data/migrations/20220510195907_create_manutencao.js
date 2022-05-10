exports.up = function (knex) {
  return knex.schema.createTable('manutencao', (table) => {
    table.increments();
    table.string('servico', 80).notNullable();
    table.string('prestador', 80).notNullable();
    table.string('mecanico', 80).notNullable();
    table.boolean('seguro').notNullable();
    table.decimal('preco', 9.2).notNullable();

    table.integer('carro_id').notNullable().unsigned();
    table
      .foreign('carro_id')
      .references('carros.id')
      .onDelete('restrict')
      .onUpdate('cascade');

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('manutencao');
};

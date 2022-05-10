exports.seed = async function (knex) {
  await knex('marcas').del();
  await knex('marcas').insert([
    { id: 1, nome: 'Chevrolet' },
    { id: 2, nome: 'Ford' },
    { id: 3, nome: 'Renault' },
    { id: 4, nome: 'Fiat' },
    { id: 5, nome: 'Volkswagen' },
    { id: 6, nome: 'Honda' },
  ]);
};

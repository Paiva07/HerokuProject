exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('manutencao').del();
  await knex('manutencao').insert([
    {
      servico: 'Troca de Oleo',
      prestador: 'Show Carros',
      mecanico: 'Ricardo Paiva',
      seguro: true,
      preco: 180,
      carro_id: 1,
    },
    {
      servico: 'Troca de Patilha de Freio',
      prestador: 'Auto Carros',
      mecanico: 'Lucas Fonseca',
      seguro: false,
      preco: 150,
      carro_id: 2,
    },
    {
      servico: 'Troca de Pneu',
      prestador: 'Carros Avenida',
      mecanico: 'Maicon Fernandes',
      seguro: true,
      preco: 50,
      carro_id: 3,
    },
  ]);
};

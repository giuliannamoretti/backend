const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres', 
  password: 'postgres',
  port: 5432,
});

const getWeather = (request, response) => {
  const city = request.params.city;
  const year = request.params.year;
  const month = request.params.month;
  const day = request.params.day;

  // retorna um erro se nao for enviado a cidade ou o ano
  if (!!!city || !!!year || !!!day || !!!month) {
    throw new Error('Input invalido');
  }

  const date = new Date(year, month - 1, day);
  const query = `SELECT * FROM dadosclima.${city}_${year}pg WHERE "DATA" = $1`

  pool.query(query, [date], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// const getUserById = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

// const createUser = (request, response) => {
//   const { name, email } = request.body;

//   pool.query(
//     'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
//     [name, email],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(201).send(`User added with ID: ${results.rows[0].id}`);
//     }
//   );
// };

// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id);
//   const { name, email } = request.body;

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(`User modified with ID: ${id}`);
//     }
//   );
// };

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(`User deleted with ID: ${id}`);
//   });
// };

module.exports = {
  getWeather,
  // getUserById,
  // createUser,
  // updateUser,
  // deleteUser,
};

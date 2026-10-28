import { pool } from './database.js'
import 'dotenv/config'

const createPizzasTable = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS pizzas (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      size VARCHAR(20) NOT NULL,
      crust VARCHAR(20) NOT NULL,
      sauce VARCHAR(20) NOT NULL,
      topping VARCHAR(20) NOT NULL,
      price NUMERIC(8, 2) NOT NULL
    );
  `

    try {
        await pool.query(createTableQuery)
        console.log('Pizzas table created successfully!')
    } catch (error) {
        console.error('Error creating pizzas table:', error)
    }
}

await createPizzasTable()
await pool.end()

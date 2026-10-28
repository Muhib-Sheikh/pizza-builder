import { pool } from '../config/database.js'
import { validatePizza, calculatePrice } from '../utils/pizza.js'

const getPizzas = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM pizzas ORDER BY id DESC')

        res.status(200).json(results.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch pizzas' })
    }
}


const getPizzaById = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({ error: 'Invalid pizza ID' })
        }

        const results = await pool.query(
            'SELECT * FROM pizzas WHERE id = $1',
            [id]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Pizza not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch pizza' })
    }
}


const createPizza = async (req, res) => {
    try {
        const { name, size, crust, sauce, topping } = req.body

        const pizza = { name, size, crust, sauce, topping }

        const error = validatePizza(pizza)

        if (error) {
            return res.status(400).json({ error })
        }

        const price = calculatePrice(pizza)

        const results = await pool.query(
            `INSERT INTO pizzas (name, size, crust, sauce, topping, price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
            [name.trim(), size, crust, sauce, topping, price]
        )

        res.status(201).json(results.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to create pizza' })
    }
}


const updatePizza = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({ error: 'Invalid pizza ID' })
        }

        const { name, size, crust, sauce, topping } = req.body

        const pizza = { name, size, crust, sauce, topping }
        const error = validatePizza(pizza)

        if (error) {
            return res.status(400).json({ error })
        }

        const price = calculatePrice(pizza)

        const results = await pool.query(
            `UPDATE pizzas
       SET name = $1, size = $2, crust = $3,
           sauce = $4, topping = $5, price = $6
       WHERE id = $7
       RETURNING *`,
            [name.trim(), size, crust, sauce, topping, price, id]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Pizza not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to update pizza' })
    }
}


const deletePizza = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({ error: 'Invalid pizza ID' })
        }

        const results = await pool.query(
            'DELETE FROM pizzas WHERE id = $1 RETURNING *',
            [id]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Pizza not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to delete pizza' })
    }
}

export default {
    getPizzas,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
}

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPizzas, deletePizza } from '../services/PizzasAPI'
import '../css/ViewPizzas.css'

const ViewPizzas = () => {
    const [pizzas, setPizzas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const data = await getAllPizzas()
                setPizzas(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPizzas()
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this pizza?')) {
            return
        }

        try {
            await deletePizza(id)
            setPizzas(pizzas.filter((pizza) => pizza.id !== id))
        } catch (error) {
            setError(error.message)
        }
    }

    if (loading) return <p className='page-message'>Loading pizzas...</p>

    return (
        <main className='saved-pizzas'>
            <header className='saved-pizzas-header'>
                <h2>My Pizzas 🍕</h2>
                <Link to='/' role='button'>+ Create Pizza</Link>
            </header>

            {error && <p role='alert'>{error}</p>}

            {pizzas.length === 0 ? (
                <p>No pizzas yet! Create your first pizza to get started.</p>
            ) : (
                <div className='pizza-grid'>
                    {pizzas.map((pizza) => (
                        <article className='pizza-card' key={pizza.id}>
                            <header>
                                <h3>{pizza.name}</h3>
                            </header>

                            <div className='pizza-card-icon'>🍕</div>

                            <p><strong>Size:</strong> {pizza.size}</p>
                            <p><strong>Crust:</strong> {pizza.crust}</p>
                            <p><strong>Sauce:</strong> {pizza.sauce}</p>
                            <p><strong>Topping:</strong> {pizza.topping}</p>
                            <h3>${Number(pizza.price).toFixed(2)}</h3>

                            <footer className='pizza-card-actions'>
                                <Link to={`/pizzas/${pizza.id}`} role='button'>
                                    View
                                </Link>

                                <Link to={`/edit/${pizza.id}`} role='button'>
                                    Edit
                                </Link>

                                <button
                                    type='button'
                                    onClick={() => handleDelete(pizza.id)}
                                >
                                    Delete
                                </button>
                            </footer>
                        </article>
                    ))}
                </div>
            )}
        </main>
    )
}

export default ViewPizzas


import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPizza, deletePizza } from '../services/PizzasAPI'
import '../css/PizzaDetails.css'

const PizzaDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [pizza, setPizza] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const data = await getPizza(id)
                setPizza(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPizza()
    }, [id])

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this pizza?')) {
            return
        }

        try {
            await deletePizza(id)
            navigate('/pizzas')
        } catch (error) {
            setError(error.message)
        }
    }

    if (loading) {
        return <p className='page-message'>Loading pizza...</p>
    }

    if (!pizza) {
        return (
            <main className='pizza-details'>
                <p role='alert'>{error || 'Pizza not found.'}</p>
                <Link to='/pizzas'>Back to My Pizzas</Link>
            </main>
        )
    }

    return (
        <main className='pizza-details'>
            <article className='pizza-details-card'>
                <h2>{pizza.name} 🍕</h2>

                <div className='pizza-details-icon'>
                    {pizza.topping === 'Pineapple' ? '🍍' :
                        pizza.topping === 'Mushroom' ? '🍄' : '🫒'}
                </div>

                <p><strong>Size:</strong> {pizza.size}</p>
                <p><strong>Crust:</strong> {pizza.crust}</p>
                <p><strong>Sauce:</strong> {pizza.sauce}</p>
                <p><strong>Topping:</strong> {pizza.topping}</p>

                <h3>Total: ${Number(pizza.price).toFixed(2)}</h3>

                {error && <p role='alert'>{error}</p>}

                <div className='pizza-details-actions'>
                    <Link to={`/edit/${pizza.id}`} role='button'>
                        Edit Pizza
                    </Link>

                    <button type='button' onClick={handleDelete}>
                        Delete Pizza
                    </button>

                    <Link to='/pizzas' role='button'>
                        Back
                    </Link>
                </div>
            </article>
        </main>
    )
}

export default PizzaDetails

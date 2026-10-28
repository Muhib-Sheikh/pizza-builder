import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPizza, updatePizza, deletePizza } from '../services/PizzasAPI'
import { calculatePrice, PRICES } from '../utilities/calcPrice'
import { validatePizza } from '../utilities/validation'
import '../css/CreatePizza.css'

const EditPizza = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [pizza, setPizza] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

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

    const handleChange = (event) => {
        const { name, value } = event.target

        setPizza({
            ...pizza,
            [name]: value
        })

        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const validationError = validatePizza(pizza)

        if (validationError) {
            setError(validationError)
            return
        }

        setSaving(true)
        setError('')

        try {
            await updatePizza(id, pizza)
            navigate('/pizzas')
        } catch (error) {
            setError(error.message)
        } finally {
            setSaving(false)
        }
    }

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
            <main className='pizza-builder'>
                <section>
                    <p role='alert'>{error || 'Pizza not found.'}</p>
                </section>
            </main>
        )
    }

    const price = calculatePrice(pizza)

    return (
        <main className='pizza-builder'>
            <section>
                <h2>Edit Pizza 🍕</h2>
                <p>Update your pizza's customization options.</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Pizza Name</label>
                    <input
                        id='name'
                        type='text'
                        name='name'
                        maxLength={100}
                        value={pizza.name}
                        onChange={handleChange}
                    />

                    {Object.entries(PRICES).map(([feature, options]) => (
                        <div key={feature}>
                            <label htmlFor={feature}>
                                {feature.charAt(0).toUpperCase() + feature.slice(1)}
                            </label>

                            <select
                                id={feature}
                                name={feature}
                                value={pizza[feature]}
                                onChange={handleChange}
                            >
                                {Object.entries(options).map(([option, cost]) => (
                                    <option key={option} value={option}>
                                        {option} {cost > 0 ? `(+$${cost})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <h3>Total: ${price.toFixed(2)}</h3>

                    {error && <p role='alert'>{error}</p>}

                    <button type='submit' disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>

                    <button
                        type='button'
                        className='secondary'
                        onClick={handleDelete}
                    >
                        Delete Pizza
                    </button>
                </form>
            </section>

            <section className='pizza-preview'>
                <h2>Your Pizza Preview</h2>

                <div className={`pizza-display ${pizza.size.toLowerCase()}`}>
                    <div className={`pizza-crust ${pizza.crust.toLowerCase()}`}>
                        <div className={`pizza-sauce ${pizza.sauce.toLowerCase()}`}>
                            <span className='pizza-icon'>
                                {pizza.topping === 'Pineapple' ? '🍍' :
                                    pizza.topping === 'Mushroom' ? '🍄' : '🫒'}
                            </span>
                        </div>
                    </div>
                </div>

                <h3>${price.toFixed(2)}</h3>
                <p>
                    {pizza.size} • {pizza.crust} • {pizza.sauce} • {pizza.topping}
                </p>
            </section>
        </main>
    )
}

export default EditPizza

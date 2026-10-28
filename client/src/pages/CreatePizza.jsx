import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPizza } from '../services/PizzasAPI'
import { calculatePrice, PRICES } from '../utilities/calcPrice'
import { validatePizza } from '../utilities/validation'
import '../css/CreatePizza.css'

const CreatePizza = () => {
    const navigate = useNavigate()

    const [pizza, setPizza] = useState({
        name: '',
        size: 'Medium',
        crust: 'Classic',
        sauce: 'Tomato',
        topping: 'Pineapple'
    })

    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

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
            await createPizza(pizza)
            navigate('/pizzas')
        } catch (error) {
            setError(error.message)
        } finally {
            setSaving(false)
        }
    }

    const price = calculatePrice(pizza)

    return (
        <main className='pizza-builder'>
            <section>
                <h2>Build Your Pizza 🍕</h2>
                <p>Choose your favorite ingredients to create your perfect pizza!</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Pizza Name</label>
                    <input
                        id='name'
                        type='text'
                        name='name'
                        placeholder='My Awesome Pizza'
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
                        {saving ? 'Saving...' : 'Create Pizza'}
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

export default CreatePizza

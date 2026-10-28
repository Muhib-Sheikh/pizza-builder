const API_URL = '/api/pizzas'

const getAllPizzas = async () => {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Failed to fetch pizzas')
    }

    return response.json()
}

const getPizza = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch pizza')
    }

    return response.json()
}

const createPizza = async (pizza) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pizza)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to create pizza')
    }

    return data
}

const updatePizza = async (id, pizza) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pizza)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to update pizza')
    }

    return data
}

const deletePizza = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error('Failed to delete pizza')
    }

    return response.json()
}

export {
    getAllPizzas,
    getPizza,
    createPizza,
    updatePizza,
    deletePizza
}

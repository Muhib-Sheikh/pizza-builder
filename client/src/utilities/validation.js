import { PRICES } from './calcPrice.js'

export const validatePizza = (pizza) => {
    const { name, size, crust, sauce, topping } = pizza

    if (typeof name !== 'string' || !name.trim() ||
        name.length > 100) {
        return 'Please enter a pizza name.'
    }

    for (const [feature, selection] of Object.entries({
        size, crust, sauce, topping
    })) {
        if (!Object.hasOwn(PRICES[feature], selection)) {
            return `Please select a valid ${feature}.`
        }
    }

    if (size === 'Small' && crust === 'Stuffed') {
        return 'Small pizzas cannot have stuffed crust.'
    }

    return null
}

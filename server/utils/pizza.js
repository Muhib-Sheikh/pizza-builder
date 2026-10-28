export const PRICES = {
    size: {
        Small: 8,
        Medium: 12,
        Large: 16
    },
    crust: {
        Thin: 0,
        Classic: 0,
        Stuffed: 3
    },
    sauce: {
        Tomato: 0,
        Pesto: 1,
        BBQ: 1
    },
    topping: {
        Pineapple: 2,
        Mushroom: 1,
        Olive: 1
    }
}

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

export const calculatePrice = (pizza) => {
    const { size, crust, sauce, topping } = pizza

    return PRICES.size[size] +
        PRICES.crust[crust] +
        PRICES.sauce[sauce] +
        PRICES.topping[topping]
}


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

export const calculatePrice = (pizza) => {
    const { size, crust, sauce, topping } = pizza

    return PRICES.size[size] +
        PRICES.crust[crust] +
        PRICES.sauce[sauce] +
        PRICES.topping[topping]
}

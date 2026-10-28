import express from 'express'
import PizzasController from '../controllers/pizzas.js'

const router = express.Router()

router.get('/', PizzasController.getPizzas)
router.get('/:id', PizzasController.getPizzaById)

router.post('/', PizzasController.createPizza)
router.patch('/:id', PizzasController.updatePizza)
router.delete('/:id', PizzasController.deletePizza)

export default router

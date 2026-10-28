import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewPizzas from './pages/ViewPizzas'
import EditPizza from './pages/EditPizza'
import CreatePizza from './pages/CreatePizza'
import PizzaDetails from './pages/PizzaDetails'
import './App.css'

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <CreatePizza />
    },
    {
      path: '/pizzas',
      element: <ViewPizzas />
    },
    {
      path: '/pizzas/:id',
      element: <PizzaDetails />
    },
    {
      path: '/edit/:id',
      element: <EditPizza />
    }
  ])

  return (
    <div className='app'>
      <Navigation />
      {element}
    </div>
  )
}

export default App

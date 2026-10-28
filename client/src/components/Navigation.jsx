import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><h1>Slice Studio</h1></li>
      </ul>

      <ul>
        <li>
          <Link to='/' role='button'>Customize</Link>
        </li>
        <li>
          <Link to='/pizzas' role='button'>My Pizzas</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation

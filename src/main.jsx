import React from 'react'
import "./index.css"
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Inicio from "./pages/inicio.jsx"
import Authprovide from './utils/authprovider.jsx'
import Login from './pages/login.jsx'
import Paginaprincipal from './pages/paginaprincipal.jsx'
import Usuario from './pages/usuario.jsx'
import CambiarContraseña from './pages/cambiocontraseña.jsx'
import PokemonAleatorio from './pages/apiPokemon.jsx'
import PokemonsFavoritos from './pages/pokemonsFavoritos.jsx'

const router = createBrowserRouter([
  {
    path: "*",
    element: <Inicio />,
  },
  {
    path: "inicio",
    element: <Inicio />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "paginaprincipal",
    element: <Paginaprincipal />,
  },
  {
    path: "usuario",
    element: <Usuario />,
  },
  {
    path: "cambiocontraseña",
    element: <CambiarContraseña />,
  },
  {
    path: "apiPokemon",
    element: <PokemonAleatorio />,
  },
  {
    path: "PokeFavoritos",
    element: <PokemonsFavoritos />,
  }
]);



ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)

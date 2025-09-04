import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import Home from "./routes/Home.jsx"
import AddMemory from "./routes/AddMemory.jsx"


const router = createBrowserRouter ([
  {
    path:"/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/add-memory",
        element: <AddMemory />
      } 
    ]
  } 
]);














// createBroewserRouter - RouterProvider 

// criar as pages Home e AddMemory e importar elas para o main 

// criar o obj router do createBroewserRouter 
// passando o caminho path o elemento ou seja a pasta principal app
// depois passo o children ou seja as pages o home e o addMemory 

// passo o provider no meu StrivtMode como router e a prop de router 
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)

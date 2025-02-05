// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GlobalState } from './Componet/State/provider.jsx'
import reducer,  { initialstate } from './Componet/State/reducer.jsx'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
  <GlobalState initialstate={initialstate} reducer={reducer} >
    <App />
    </GlobalState>
  
)

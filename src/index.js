import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import '@style/style.css'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)

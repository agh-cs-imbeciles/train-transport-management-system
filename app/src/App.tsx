

import Login from './login_register/login'
import Register from './login_register/register'
import Base from './base/base'
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cockpit from './cockpit/cockpit'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Base/>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cockpit" element={<Cockpit />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App



import Login from './login_register/login'
import Register from './login_register/register'
import Base from './base/base'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cockpit from './cockpit/cockpit'
import SearchPanel from './cockpit/cockpit_views/search_panel';
import Reservations from './cockpit/cockpit_views/reservations';
import ReservationsHistory from './cockpit/cockpit_views/reservations_history';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base/>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cockpit" element={<Cockpit />} >
            <Route path="search" element={<SearchPanel/>} />
            <Route path="reservations" element={<Reservations/>} />
            <Route path="history" element={<ReservationsHistory/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App

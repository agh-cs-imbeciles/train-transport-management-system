

import Login from './login_register/login'
import Register from './login_register/register'
import Base from './base/base'
import styles from './App.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cockpit from './cockpit/cockpit'
import SearchPanel from './cockpit/cockpit_views/search_panel';
import Reservations from './cockpit/cockpit_views/reservations';
import ReservationsHistory from './cockpit/cockpit_views/reservations_history';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/pl"
import ReservationPanel from './reservation_panel/reservation_panel';
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Base/>}>
              <Route path="connection" element={<ReservationPanel/>}/>
              <Route path="connection/:id" element={<ReservationPanel/>}/>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="cockpit" element={<Cockpit />} >
                <Route path="search" element={<SearchPanel/>} />
                <Route path="reservations" element={<Reservations/>} />
                <Route path="history" element={<Reservations/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>


  )
}

export default App

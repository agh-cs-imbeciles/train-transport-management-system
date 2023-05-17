import { Nav, Navbar }  from "react-bootstrap"
import { Container } from "react-bootstrap"
import { Outlet,Link } from "react-router-dom" 
import "./cockpit.scss"
export default function Cockpit(){

    return(

        <Container className="whole">
            <Container bsPrefix="cockpit-panel">
                <Nav bsPrefix="navbar" className="me-auto">
                    <Nav.Link bsPrefix="nav-link" href="/cockpit/search">Wyszukaj</Nav.Link>
                    <Nav.Link bsPrefix="nav-link" href="/cockpit/reservations">Rezerwacje</Nav.Link>
                    <Nav.Link bsPrefix="nav-link" href="/cockpit/history">Historia Rezerwacji</Nav.Link>
                </Nav>
            </Container>
            <Container bsPrefix="selected">
                <Outlet></Outlet>
            </Container>
        </Container>
    )
}
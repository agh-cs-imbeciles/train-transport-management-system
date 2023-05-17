import { Nav, Navbar }  from "react-bootstrap"
import { Container } from "react-bootstrap"
import { Outlet,Link } from "react-router-dom" 

export default function Base(){
    return(
        <>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="me-auto">
                    <Nav.Link href="/cockpit/search">Kokpit</Nav.Link>
                    <Nav.Link href="/login">Zaloguj</Nav.Link>
                    <Nav.Link href="/register">Zarejestruj</Nav.Link>
                </Nav>
             </Container>
             <Container className="main-block">
                <Outlet></Outlet>
             </Container>

        </>
    )

}
import { Nav, Navbar }  from "react-bootstrap"
import { Container } from "react-bootstrap"
import { Outlet,Link } from "react-router-dom" 

export default function Base(){
    return(
        <>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="me-auto">
                    {localStorage.getItem("login_id")==null ?                    
                        <>
                            <Nav.Link href="/login">Zaloguj</Nav.Link>
                            <Nav.Link href="/register">Zarejestruj</Nav.Link>
                        </> :
                        <Nav.Link href="/cockpit/search">Kokpit</Nav.Link>
                    }
                </Nav>
             </Container>
             <Container className="main-block">
                <Outlet></Outlet>
             </Container>

        </>
    )

}
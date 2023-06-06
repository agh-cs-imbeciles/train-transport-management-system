import { Nav, Navbar }  from "react-bootstrap"
import { Container } from "react-bootstrap"
import { Outlet,Link, Navigate } from "react-router-dom" 
import styles from "./cockpit.module.scss"
export default function Cockpit(){
    if(localStorage.getItem("login_id")==null){
        return <Navigate to="/login" replace/>
    }
    return(

        <Container className={styles.whole}>
            <Container bsPrefix={styles.cockpit_panel}>
                <Nav bsPrefix={styles.navbar}>
                    <Nav.Link bsPrefix="nav-link" href="/cockpit/search">Wyszukaj</Nav.Link>
                    <Nav.Link bsPrefix="nav-link" href="/cockpit/reservations">Rezerwacje</Nav.Link>
                    <Nav.Link bsPrefix="nav-link" href="/cockpit/history">Historia Rezerwacji</Nav.Link>
                </Nav>
            </Container>
            <Container bsPrefix={styles.selected}>
                <Outlet></Outlet>
            </Container>
        </Container>
    )
}
import { Button, Container } from "react-bootstrap";
import "./cockpit.scss"
import Reservations from "./cockpit_views/reservations";
import ReservationsHistory from "./cockpit_views/reservations_history";
import SearchPanel from "./cockpit_views/search_panel";
import { Component, useState } from "react"

export default function Cockpit(){
    const [currentComponent, setCurrentComponent] = useState<number>(0);
    const components = [
        <SearchPanel/>,
        <Reservations/>,
        <ReservationsHistory/>,
        
    ]

    return(
        <Container className="whole">
            <Container bsPrefix="cockpit-panel">
                <Button onClick={()=>setCurrentComponent(0)}><p>Wyszukiwarka</p>
                </Button>
                <Button onClick={()=>setCurrentComponent(1)}><p>Rezerwacje</p>
                </Button>
                <Button onClick={()=>setCurrentComponent(2)}><p>Historia rezerwacji</p>
                </Button>
            </Container>
            <Container bsPrefix="selected">
                {components[currentComponent]}
            </Container>
        </Container>
    )
}
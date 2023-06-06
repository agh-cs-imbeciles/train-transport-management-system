import { Button, Container, Form } from "react-bootstrap";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import styles from "./panel.module.scss"
export default function SearchPanel(){
    return(
        <Container className="whole2">
            <Container className="search-tab">
                <Container className="dates">
                    <MobileDateTimePicker label="Data początkowa"/>
                    <MobileDateTimePicker label="Data końcowa"/>
                </Container>
                <Container className="from-to">
                    <Container bsPrefix="single">
                        <Form.Label>Wybierz stację początkową</Form.Label>
                        <Form.Select>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Container>
                    <Container bsPrefix="single">
                        <Form.Label htmlFor="end">Wybierz stację końcową</Form.Label>
                        <Form.Select name="end">
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Container>
                </Container>
                <Button>Szukaj</Button>
            </Container>
            <Container className="list">

            </Container>
            
        </Container>
       ) 
}
import { Button, Card, Container, Form } from "react-bootstrap";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import styles from "./panel.module.scss"
import ListElement from "./list_element/list_element";
import * as dayjs from "dayjs";
import { useState } from "react";
import { Autocomplete } from "@mui/material";

export default function SearchPanel(){
    const [firstDate, setFirstDate] = useState<dayjs.Dayjs>(dayjs().add(1,"minute"));
    const [secondDate, setSecondDate] = useState<dayjs.Dayjs>(dayjs().add(1,"day").add(1,"minute"));
    const [firstPlace, setFirstPlace] = useState<string>();
    const [secondPlace, setSecondPlace] = useState<string>();
    return(
        <Container className={styles.whole}>
            <Form className={styles.search_tab}>
                <Container className={styles.dates}>
                    <MobileDateTimePicker defaultValue={firstDate} minDateTime={dayjs()} onChange={(val:any)=>setFirstDate(val)} className={styles.picker} label="Data początkowa"/>
                    <MobileDateTimePicker defaultValue={secondDate} minDateTime={firstDate} onChange={(val:any)=>setSecondDate(val)} className={styles.picker} label="Data końcowa"/>
                </Container>
                <Container className={styles.from_to}>
                    <Container className={styles.single}>
                        <Form.Label>Wybierz stację początkową</Form.Label>
                        {/* <Form.Select onChange={(val:any)=>setFirstPlace(val)}>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select> */}
                    </Container>
                    <Container className={styles.single}>
                        <Form.Label htmlFor="end">Wybierz stację końcową</Form.Label>
                        <Form.Select onChange={(val:any)=>{setSecondPlace(val);console.log(secondDate>firstDate)}}>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Container>
                </Container>
                <Button disabled={secondDate<firstDate ? true:false} className={styles.look_for}>Szukaj</Button>
            </Form>
            
            <Container className={styles.list}>
                <p></p>
                <Container className={styles.list_items}>
                    <ListElement type="express" from="Kraków" to="Warszawa" departure="2023" arrival="2024"/>
                </Container>
            </Container>
        </Container>
       ) 
}
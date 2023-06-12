import { Button, Card, Container, Form } from "react-bootstrap";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import styles from "./panel.module.scss"
import ListElement from "./list_element/list_element";
import * as dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { URLPath } from "../../global_values";

export default function SearchPanel(){
    const [firstDate, setFirstDate] = useState<dayjs.Dayjs>(dayjs().add(1,"minute"));
    const [secondDate, setSecondDate] = useState<dayjs.Dayjs>(dayjs().add(1,"day").add(1,"minute"));
    const [firstPlace, setFirstPlace] = useState<string>();
    const [secondPlace, setSecondPlace] = useState<string>();
    const [places, setPlaces] = useState<Array<any>>([]);
    const [ends, setEnds] = useState<Array<any>>([]);
    
    useEffect(() => {
        fetch(URLPath.placesAll)
          .then(res => res.json())
          .then(data => {setPlaces(data.map((x:any)=>
            {
                const container = {
                    label:x.name,
                    _id:x._id
                };
                return container
            }
            ))});
      }, []);

    async function getAllEnds(place:string){

    }

    
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
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={places}
                            renderInput={(params) => <TextField {...params} label="Stacja początkowa" />}
                            onChange={(event,input)=>{console.log(input);setFirstPlace(input);getAllEnds(input)}}
                        />
                    </Container>
                    <Container className={styles.single}>
                        <Form.Label htmlFor="end">Wybierz stację końcową</Form.Label>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={ends}
                            renderInput={(params) => <TextField {...params} label="Stacja końcowa" />}
                            onChange={(event,input)=>setSecondPlace(input)}
                        />
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
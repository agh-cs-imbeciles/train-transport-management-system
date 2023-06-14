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
    const [firstPlace, setFirstPlace] = useState<any>();
    const [secondPlace, setSecondPlace] = useState<any>();
    const [places, setPlaces] = useState<Array<any>>([]);
    const [connectionsElements, setConnectionsElements] = useState<Array<any>>([]);

    const disable:boolean =
     firstPlace==null ||
     secondPlace==null ||
     firstDate>secondDate;
    
    useEffect(() => {
        fetch(URLPath.placesAll)
          .then(res => res.json())
          .then(data => {setPlaces(data.map((x:any)=>
            {
                console.log(x);
                const container = {
                    label:x.name,
                    _id:x._id
                };
                return container
            }
            ))});
      }, []);
    
    async function getConnections(){
        if(firstPlace===undefined || secondPlace===undefined){
            return;
        }
        const data = {
            "departureDate": firstDate,
            "arrivalDate": secondDate,
            "departureStopId": firstPlace._id,
            "arrivalStopId": secondPlace._id
        }
        const response = await fetch(URLPath.routesAll,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json;charset=utf-8"}
            });
        const connections = await response.json();
        const conList = [];
        for(let c in connections){
            conList.push(<ListElement type="express" from={firstPlace} to={secondPlace} departure={c.departure.date} arrival={c.arrival.date}/>);
        }
        setConnectionsElements(conList);
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
                            onChange={(event,input)=>{
                                console.log(input);
                                setFirstPlace(input)
                            }}
                        />
                    </Container>
                    <Container className={styles.single}>
                        <Form.Label htmlFor="end">Wybierz stację końcową</Form.Label>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={places}
                            renderInput={(params) => <TextField {...params} label="Stacja końcowa" />}
                            onChange={(event,input)=>setSecondPlace(input)}
                        />
                    </Container>
                </Container>
                <Button disabled={disable} className={styles.look_for} onClick={getConnections}>Szukaj</Button>
            </Form>
            
            <Container className={styles.list}>
                <p></p>
                <Container className={styles.list_items}>
                    {connectionsElements}
                    <ListElement type="express" from="Kraków" to="Warszawa" departure="2023.12.01" arrival="2023.12.01"/>
                </Container>
            </Container>
        </Container>
       ) 
}
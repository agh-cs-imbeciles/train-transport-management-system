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

    const [firstPlace, setFirstPlace] = useState<any>();
    const [secondPlace, setSecondPlace] = useState<any>();
    const [text, setText] = useState<string>("");
    const [places, setPlaces] = useState<Array<any>>([]);
    const [connectionsElements, setConnectionsElements] = useState<Array<JSX.Element>>([]);
    const [type,setType] = useState<string>("start");
    const disable:boolean =
     firstPlace==null ||
     secondPlace==null ||
     firstDate==null
    
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
        var data;
        if(type=="start"){
             data = {
                "departureDate": firstDate,
                "departureStopId": firstPlace._id,
                "arrivalStopId": secondPlace._id
            }
        }
        else{
             data = {
                "arrivalDate": firstDate,
                "departureStopId": firstPlace._id,
                "arrivalStopId": secondPlace._id
            }
        }
        
        console.log(JSON.stringify(data))
        const response = await fetch(URLPath.routesAll,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json;charset=utf-8"}
            });
        if(!response.ok){
            setText("Nie znaleziono pociągów");
        }
        else{
            setText("");
        }
        const connections = await response.json();
        const conList:Array<JSX.Element> = [];
        console.log(connections,"com");
        for(let c of connections){
            console.log(c);
            console.log(secondPlace);
            conList.push(<ListElement type="express" id={c._id} from={firstPlace.label} to={secondPlace.label} departure={c.departure.date} arrival={c.arrival.date}/>);
        }
        setConnectionsElements(conList);
    }
    function changeRadio(event:any){
        setType(event.target.value);
    }
    
    return(
        <Container className={styles.whole}>
            <Form className={styles.search_tab}>
                <Container className={styles.dates}>
                    <MobileDateTimePicker defaultValue={firstDate} minDateTime={dayjs()} onChange={(val:any)=>setFirstDate(val)} className={styles.picker} label="Data odjazdu"/>
                    <Container onChange={changeRadio}>
                    <input defaultChecked type="radio" id="start" name="sol" value="start"/>
                    <label  htmlFor="start">Data odjazdu</label><br/>
                    <input type="radio" id="end" name="sol" value="end"/>
                    <label htmlFor="end">Data przyjazdu</label><br/>
                    </Container>
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
                <p>{text}</p>
                <Container className={styles.list_items}>
                    {connectionsElements}
                </Container>
            </Container>
        </Container>
       ) 
}
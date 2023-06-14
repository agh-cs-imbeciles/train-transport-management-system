import { Icon, List, ListItemIcon } from "@mui/material";
import { ListItem } from '@mui/material';
import { Container } from "react-bootstrap";
import styles from "./reservation_list.module.scss";
import TrainIcon from '@mui/icons-material/Train';
import { URLPath } from "../../../global_values";
import { SingleBedRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function ReservationList(props: any){
    const [used,setUsed] = useState<boolean>(false);
    const [start,setStart] = useState<string>("");
    const [end,setEnd] = useState<string>("");
    const [listElements,setListElements] = useState<Array<JSX.Element>>([]);
    const elements: Array<any/*Do zmienienia*/> = props.elements;
    const current:boolean = props.current
    const tmp:any = [];
    useEffect(() => {
        setInterval(() => {
            console.log(end);
        }, 1000);
      }, []);
      

    if(elements===undefined){
        return <></>
    }
    // console.log(elements,"sdsa");
    if(used==false){
        setUsed(true);
        for(let single of elements){
            console.log(single,"sd");
            // console.log(URLPath.routesId+"/"+single.railRouteId,"asd");
            fetch(URLPath.routesId+"/"+single.railRouteId)
            .then(res => res.json())
            .then(data => createList(data,single))
        }
        
    }

    
    // setListElements(tmp);

    function createList(values:any, single:any){
        const places = [];
        for(let s of single.seats){
            places.push(<p>{s.seatId}</p>)
        }
        fetch(URLPath.stopsId+"/"+values.departure.stopId)
            .then(res => res.json())
            .then(data => {
                setStart(data.name);
                console.log(start);
                return fetch(URLPath.stopsId+"/"+values.departure.stopId);
            })
            .then(res => res.json())
            .then(data => {
                setEnd(data.name);
                console.log(data.name);
                console.log(end);
            });
        tmp.push(
        <>
            <Container className={styles.single_container}>
                <ListItem className={styles.list_item}>
                    <ListItemIcon className={styles.icon_item}>
                        <TrainIcon className={styles.icon}/>
                    </ListItemIcon>
                    <Container className={styles.time_place}>
                        <h5>Odjazd</h5>
                        <h5>Przyjazd</h5>
                        <p>{values.departure.date}</p>
                        <p>{values.arrival.date}</p>
                        <h5>Z</h5>
                        <h5>Do</h5>
                        <p>{start}</p>
                        <p>{end}</p>
                    </Container>
                    <Container className={styles.places}>
                        <h5>Lista miejsc</h5>
                        {places}
                    </Container>
                    <Container>
                        <h5>Cena</h5>
                        <p>21,37zł</p>
                    </Container>
                </ListItem>
            </Container>
        </>)
        setListElements(tmp);
        // console.log(tmp,"dasd")
    }

    return(
    <>
       <List>
        {listElements}
       </List>
    </>
    ) 
}
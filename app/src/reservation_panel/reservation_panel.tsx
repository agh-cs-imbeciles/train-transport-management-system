import { ListItemIcon } from "@mui/material";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styles from "./reservation_panel.module.scss"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TrainIcon from '@mui/icons-material/Train';
import { Navigate, useLocation, useParams } from "react-router-dom";
import { URLPath } from "../global_values";
import { useEffect, useState } from "react";

export default function ReservationPanel(props: any){
    const location = useLocation();
    const params = useParams();
    const [placesElements,SetPlacesElements] = useState([]);
    const [selected,SetSelected] = useState([]);
    var dataFirst:any;//,setDataFirst] = useState();
    var trainFValues:any;//,setTrainFValues] = useState();

    const trainData = props.trainData;
    const placesPositions: Array<JSX.Element> = [];
    if(localStorage.getItem("login_id")==null){
        return <Navigate to="/login" />
    }
    console.log(params)
    useEffect(() => {
        fetch(URLPath.routesId+"/"+params.id)
          .then(res => res.json())
          .then(data => {
            dataFirst=data;
            console.log(data);
            // setDataFirst(data);
            return fetch(URLPath.trains+"/"+data.trainId);
        })
        .then(res => res.json())
        .then(data =>{
            trainFValues = data;
            // setTrainFValues(data);console.log(trainFValues,"ads");
            // createPlaces();
            console.log(placesPositions);
            createPlaces()
        })
      }, []);
    function createPlaces(){
        console.log(trainFValues.seats,"seats")
        for(let [k,s] of Object.entries(trainFValues.seats)){
            console.log(s);
            var price;
            if('standard' in s.types){
                price = dataFirst.ticketsCost.standard
            }
            else{
                price = dataFirst.ticketsCost.firstClass
            }
            placesPositions.push(
                <Container className={styles.position}>
                    <Container>
                        <h5>Miejsce {s.seatId}</h5>
                        <p>{price}zł</p>
                    </Container>
                    <Button value={s.seatId} onClick={add} className={styles.icon_button}>
                        <AddIcon className={styles.icon}/>
                    </Button>
                </Container>
            )
        }
        SetPlacesElements(placesPositions);
    }
    function add(event:any){
        // placesElements..event.target.parent.
    }
   
    return(
        <Container className={styles.whole}>
            <Container className={styles.train_data}>
                <TrainIcon className={styles.icon}/>
                <Container className={styles.time_place}>
                    <h5>Odjazd</h5>
                    <h5>Przyjazd</h5>
                    <p>{location.state.departure}</p>
                    <p>{location.state.arrival}</p>
                    <h5>Z</h5>
                    <h5>Do</h5>
                    <p>{location.state.from}</p>
                    <p>{location.state.to}</p>
                </Container>
            </Container>
            <Container className={styles.places_selection}>
                <Container className={styles.list_block}>
                    <h5>Wybierz</h5>
                    <Container className={styles.list}>
                        {placesElements}
                    </Container>
                </Container>
                <Container className={styles.list_block}>
                    <h5>Wybrane</h5>
                    <Container className={styles.list}>
                        {/* {placesPositions} */}
                    </Container>
                </Container>
                <Container className={styles.price_button}>
                    {/* <h5>Cena sumaryczna</h5>
                    <p>420,69zł</p> */}
                    <Button>
                        Zarezerwuj
                    </Button>
                </Container>
            </Container>

        </Container>
    )
    }
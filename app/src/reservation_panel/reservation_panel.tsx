import { ListItemIcon } from "@mui/material";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styles from "./reservation_panel.module.scss"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TrainIcon from '@mui/icons-material/Train';
import { Navigate } from "react-router-dom";

export default function ReservationPanel(props: any){
    const trainData = props.trainData;
    const placesPositions: Array<JSX.Element> = [];
    if(localStorage.getItem("login_id")==null){
        return <Navigate to="/login" />
    }
    for(let i=0; i<10;i++){
        placesPositions.push(
            <Container className={styles.position}>
                <Container>
                    <h5>Miejsce 23</h5>
                    <p>21,37zł</p>
                </Container>
                <Button className={styles.icon_button}>
                    <AddIcon className={styles.icon}/>
                </Button>
            </Container>
        )
    }
   
    return(
        <Container className={styles.whole}>
            <Container className={styles.train_data}>
                <TrainIcon className={styles.icon}/>
                <Container className={styles.time_place}>
                    <h5>Odjazd</h5>
                    <h5>Przyjazd</h5>
                    <p>2023</p>
                    <p>2023</p>
                    <h5>Z</h5>
                    <h5>Do</h5>
                    <p>Warszawa</p>
                    <p>Kraków</p>
                </Container>
            </Container>
            <Container className={styles.places_selection}>
                <Container className={styles.list_block}>
                    <h5>Wybierz</h5>
                    <Container className={styles.list}>
                        {placesPositions}
                    </Container>
                </Container>
                <Container className={styles.list_block}>
                    <h5>Wybrane</h5>
                    <Container className={styles.list}>
                        {placesPositions}
                    </Container>
                </Container>
                <Container className={styles.price_button}>
                    <h5>Cena sumaryczna</h5>
                    <p>420,69zł</p>
                    <Button>
                        Zarezerwuj
                    </Button>
                </Container>
            </Container>

        </Container>
    )
    }
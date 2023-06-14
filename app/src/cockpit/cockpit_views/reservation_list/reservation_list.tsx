import { Icon, List, ListItemIcon } from "@mui/material";
import { ListItem } from '@mui/material';
import { Container } from "react-bootstrap";
import styles from "./reservation_list.module.scss";
import TrainIcon from '@mui/icons-material/Train';

export default function ReservationList(props: any){
    const elements: Array<any/*Do zmienienia*/> = props.elements;
    const current:boolean = props.current
    const list_elements: Array<JSX.Element> = [];
    for(let single in elements){
        list_elements.push(
        <>
            <Container className={styles.single_container}>
                <ListItem className={styles.list_item}>
                    <ListItemIcon className={styles.icon_item}>
                        <TrainIcon className={styles.icon}/>
                    </ListItemIcon>
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
                    <Container className={styles.places}>
                        <h5>Lista miejsc</h5>
                        <p>12</p>
                        <p>69</p>
                        <p>420</p>
                    </Container>
                    <Container>
                        <h5>Cena</h5>
                        <p>21,37zł</p>
                    </Container>
                </ListItem>
            </Container>
        </>)
        
    }

    return(
    <>
       <List>
        {list_elements}
       </List>
    </>
    ) 
}
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import img_1 from "./ok.png"
import styles from "./list_element.module.scss"

export default function ListElement(props: any){
    const type: string = props.type;
    const from: string = props.from;
    const to: string = props.to;
    const arrival: string = props.arrival;
    const departure: string = props.departure;
   
    var img: string = img_1;
    switch(type){
        case "express":{
            img = img_1;
            break;
        }
    }
    return(
        <Card className={styles.single_train}>
            <Card.Img className={styles.card_image} variant="top" src={img} />
            <Container className={styles.card_text}>
                <Container >
                    <Card.Subtitle>Odjazd</Card.Subtitle>
                    <Card.Text>{departure}</Card.Text>
                    <Card.Subtitle>Przyjazd</Card.Subtitle>
                    <Card.Text>{arrival}</Card.Text>
                </Container>
                <Container>
                    <Card.Subtitle>Z</Card.Subtitle>
                    <Card.Text>{from}</Card.Text>
                    <Card.Subtitle>Do</Card.Subtitle>
                    <Card.Text>{to}</Card.Text>
                </Container>
            </Container>
        </Card>
    )
    }
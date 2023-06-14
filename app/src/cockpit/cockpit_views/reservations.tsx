import { useEffect, useState } from "react";
import { URLPath } from "../../global_values";
import ReservationList from "./reservation_list/reservation_list";

export default function Reservations(props:any){
    const [elements,setElements] = useState<any>();
    const current = props.current;
    useEffect(() => {
        fetch(URLPath.reservations+"/"+"648753ca8e152e03689ed029")
          .then(res => res.json())
          .then(data => {setElements(data);console.log(data)});
      }, []);
    if(current){

    }
    return (
        <>
        <ReservationList elements={elements}></ReservationList>
        </>
    )
}
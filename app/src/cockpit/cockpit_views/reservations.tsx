import { useEffect, useState } from "react";
import { URLPath } from "../../global_values";
import ReservationList from "./reservation_list/reservation_list";

export default function Reservations(props:any){
    const [elements,setElements] = useState<any>();
    const current = props.current;
    console.log(URLPath.reservations+"/"+localStorage.getItem("login_id"));
    useEffect(() => {
        fetch(URLPath.reservations+"/"+localStorage.getItem("login_id"))
          .then(res => res.json())
          .then(data => {setElements(data);console.log(data,"das")});
      }, []);
      console.log(elements);
    if(current){

    }
    return (
        <>
        <ReservationList elements={elements}></ReservationList>
        </>
    )
}
import { ChangeEvent, FormEvent, useState } from 'react';
import './form.scss';
import {Adress, LoginData, Message, UserData} from './types';

type UserDataKey = keyof UserData;
type AdressDataKey = keyof Adress;

export default function Register(){
    const [messages, setMessages] = useState<Message>({value:undefined,text:undefined});
    const [rData, setRData] = useState<UserData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeat: '',
        address:{
            street:'',
            city: '',
            zipCode: ''
        }
    })
    const [aData, setAData] = useState<Adress>({
        street: '',
        city: '',
        zipCode: ''
    })


    function changeVal(e:ChangeEvent<HTMLInputElement>){
        const tmpData:UserData = structuredClone(rData);
        const key = e.target.name as UserDataKey;
        tmpData[key] = (e.target.value as string & Adress);
        setRData(tmpData);
        console.log(rData)
    }
    function changeValAddres(e:ChangeEvent<HTMLInputElement>){
        const tmpData:Adress = structuredClone(aData);
        const key = e.target.name as AdressDataKey;
        tmpData[key] = e.target.value;
        const tmpDataAddr:UserData = rData;
        tmpDataAddr.address = tmpData
        setRData(tmpDataAddr)
        setAData(tmpData);
        console.log(aData)
    }

    
    function submit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        //database
        const accepted:Boolean = true;
        if(accepted){
            setMessages({value: true, text:"Udało się zalogować"});
        }
        else{
            setMessages({value: false, text:"Niepoprawne hasło bądź nazwa użytkownika"});
        }

    }
    return (
    <div className='main'>
        <form className='form' onSubmit={submit}>
            <p>Zarejestruj się</p>
            <div className='fields'>
                <div className='left'>
                    <p>Dane osobowe</p>
                    <input type="text" name="firstName" onChange={changeVal} placeholder="Imię" required/><br/>
                    <input type="text" name="lastName" onChange={changeVal} placeholder="Nazwisko" required/><br/>
                    <input type="text" name="email" onChange={changeVal} placeholder="Adres E-mail" required/><br/>
                    <input type="password" name="password" onChange={changeVal} placeholder="Hasło" required/><br/>
                    <input type="password" name="repeat" onChange={changeVal} placeholder="Powtórz Hasło" required/><br/>
                    <input className='submit' type="submit" value="Zarejestuj"/>
                </div>
                <div className='right'>
                    <p>Adres</p>
                    <input type="text" name="city" onChange={changeValAddres} placeholder="Miasto" required/><br/>
                    <input type="text" name="street" onChange={changeValAddres} placeholder="Ulica" required/><br/>
                    <input type="text" name="zipCode" onChange={changeValAddres} placeholder="Kod pocztowy" required/><br/>
                </div>
            </div>
            <p>{messages.text}</p> 
        </form>
    </div>
    )
}
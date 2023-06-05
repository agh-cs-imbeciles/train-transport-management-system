import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { URLPath } from '../global_values';
import './form.scss'
import {LoginData, Message} from './types';
import { Navigate} from 'react-router-dom';

type LoginDataKey = keyof LoginData;


export default function Login(){
    const [messages, setMessages] = useState<Message>({value:undefined,text:undefined});
    const [lData, setLData] = useState<LoginData>({
        email:'',
        password:''
    })
    if(localStorage.getItem("login_id")!=null){
        return <Navigate to="/cockpit/search" />
    }

    function changeVal(e:ChangeEvent<HTMLInputElement>){
        const tmpData:LoginData = structuredClone(lData);
        const key = e.target.name as LoginDataKey;
        tmpData[key] = e.target.value;
        setLData(tmpData);
        console.log(lData)
    }

    
    async function submit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        const response = await fetch(URLPath.loginPath,
            {
                method: 'POST',
                body: JSON.stringify(lData),
                headers: {"Content-Type": "application/json;charset=utf-8"}
            });
        if(response.ok){
            const value = await response.json()
            setMessages({value: true, text:"Udało się zalogować"});
            localStorage.setItem("login_id",value.userId);
        }
        else{
            setMessages({value: false, text:"Niepoprawne hasło bądź nazwa użytkownika"});
        }
    }
    return (
    <div className='main'>
        <form className='form' onSubmit={submit}>
                <p>Zaloguj się</p>
                <input type="text" name="email" id="mail" value={lData.email} onChange={changeVal} placeholder="Adres e-mail" required/><br/>
                <input type="password" name="password" id="password" value={lData.password} onChange={changeVal} placeholder="Hasło" required/><br/>
                <input className='submit' type="submit" value="Zaloguj"/>
                <p>{messages.text}</p>
        </form>
    </div>
    )
}
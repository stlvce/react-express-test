import React, { useState, useEffect } from "react";
import "./styles/App.css";
import MainPage from "./components/MainPage";
import { ContextState } from "./context";

function App() {
    const [params, setParams] = useState([]);
    const [log, setLog] = useState([]);
    const [isError, setIsError] = useState(false)
    const [dataForm, setDataForm] = useState(params);
    const [shutdown, setShutdown] = useState(false);
    const [restart, setRestart] = useState(false);

    const restartDevice = () => {
        setRestart(true)
        fetch("http://localhost:5000/device/?action=restart")
            .then(res => res.json())
            .then(res => setRestart(res))
            .catch(rej => console.log(rej))
    }
    
    const offDevice = () => {
        setShutdown(true)
        fetch("http://localhost:5000/device/?action=off")
            .then(res => res.json())
            .then(res => {
                setParams(res.params)
                setLog(res.log)
            })
            .catch(rej => console.log(rej))
    }

    const onDevice = () => {
        setShutdown(false)
        fetch("http://localhost:5000/device/?action=on")
            .then(res => res.json())
            .then(res => {
                setParams(res.params)
                setLog(res.log)
            })
            .catch(rej => console.log(rej))
    }

    const uploadParams = () => {
        fetch('http://localhost:5000/device/parameters')
            .then(res => {
                setIsError(false)
                return res.json()
            })
            .then(res => {
                setParams(res)
                if (res[0].value === "отключено") {
                    setShutdown(true)
                }
                setDataForm(res)
            })
            .catch(rej => setIsError(true))
    }

    const uploadLog = () => {
        fetch('http://localhost:5000/changelog')
            .then(res => {
                setIsError(false)
                return res.json()
            })
            .then(res => setLog(res))
            .catch(rej => setIsError(true))
    }

    const handleChange = (e) => {
        let value =  e.target.value;
        let name = e.target.name;
        setParams([
                { "name": "Состояние устройства", "value": (name === "Состояние устройства" ? value : dataForm[0].value), "oldValue": params[0].value},
                { "name": "Состояние детектора", "value": (name === "Состояние детектора" ? value : dataForm[1].value), "oldValue": params[1].value},
                { "name": "Температура корпуса", "value": (name === "Температура корпуса" ? value : dataForm[2].value), "oldValue": params[2].value},
                { "name": "Температура процессора", "value": (name === "Температура процессора" ? value : dataForm[3].value), "oldValue": params[3].value},
                { "name": "Имя Wi-Fi сети (SSID)", "value": (name === "Имя Wi-Fi сети (SSID)" ? value : dataForm[4].value), "oldValue": params[4].value}, 
                { "name": "Сила сигнала Wi-Fi сети", "value": (name === "Сила сигнала Wi-Fi сети" ? value : dataForm[5].value), "oldValue": params[5].value} 
        ])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(JSON.stringify(dataForm))
        fetch('http://localhost:5000/device/parameters', { 
            method: 'PUT',
            headers: { 
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true' 
            },
            body: JSON.stringify(dataForm),
        })
            .then(res => {
                setIsError(false)
                return res.json()
            })
            .then(res => setParams(res))
            .catch(rej => console.log(rej))
            
    }
    
    useEffect(() => {
        uploadParams()
        uploadLog()
    },[])

    return (
        <ContextState.Provider 
            value={[
                params, 
                log, 
                isError, 
                handleSubmit, 
                handleChange,
                restart,
                restartDevice,
                shutdown,
                offDevice,
                onDevice
            ]}
        >
            <MainPage/>
        </ContextState.Provider>
    );
}

export default App;

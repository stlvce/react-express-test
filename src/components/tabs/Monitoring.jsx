import React, { useContext } from "react";
import { ContextState } from "../../context";
import Button from "../ui/button/Button";

const Monitoring = ({ restart, restartDevice, shutdown, shutdownDevice }) => {
    const [params] = useContext(ContextState);
    
    return (
        <div>
            <div className="header">
                <h1>
                    Мониторинг и управление
                </h1>
                <div className="switches">
                    {restart && <p style={{ color: "red" }}>Устройство перезагружается!</p>}
                    <Button onClick={restartDevice} disabled={restart || shutdown}>Перезагрузка</Button>
                    <Button color="#F00" onClick={shutdownDevice} disabled={restart}>{shutdown ? "Включение" : "Отключение"}</Button>
                </div>
            </div>
            <div className="main">
                <ul>
                    {params.map(item => <li key={item.name}>{item.name}: {item.state}</li>)}
                </ul>
            </div>
        </div>    
    )
}

export default Monitoring;
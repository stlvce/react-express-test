import React, { useContext } from "react";
import { ContextState } from "../../context";
import Button from "../ui/button/Button";

const Monitoring = () => {
    const [params,, isError,,, restart, restartDevice, shutdown, offDevice, onDevice] = useContext(ContextState);
    
    return (
        <div>
            <div className="header">
                <h1>
                    Мониторинг и управление
                </h1>
                <div className="switches">
                    {restart && <p style={{ color: "red" }}>Устройство перезагружается!</p>}
                    <Button onClick={restartDevice} disabled={restart || shutdown || isError}>Перезагрузка</Button>
                    <Button color="#F00" 
                        onClick={()=>{
                            if (!shutdown) {
                                offDevice()
                            } else {
                                onDevice()
                            }
                        }} 
                        disabled={restart || isError}>{shutdown ? "Включение" : "Отключение"}</Button>
                </div>
            </div>
            <div className="main">
                    {params.map(item =>{ 
                        if (item.name==="Состояние устройства") {
                            return (
                                <div className="parameter" key={item.name}>
                                    <span>{item.name}:</span>
                                    <span>
                                        {restart ? "перезапуск" : item.value}
                                    </span>
                                </div>
                            )
                        }
                        return (
                            <div className="parameter" key={item.name}>
                                <span>{item.name}:</span><span>{item.value}</span>
                            </div>
                        )

                    })}
            </div>
        </div>    
    )
}

export default Monitoring;
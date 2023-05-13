import React, { useState } from "react";
import Monitoring from "./tabs/Monitoring";
import Settings from "./tabs/Settings";
import ActivityLog from "./tabs/ActivityLog";
import imgOpenTab from "../assets/open-nav.svg";
import arrow from "../assets/arrow.svg";

const MainPage = () => {
    const [active, setActive] = useState(0);
    const [shutdown, setShutdown] = useState(false);
    const [restart, setRestart] = useState(false);
    const [navPanel, setNavPanel] = useState(true)
    
    const openTab = e => setActive(+e.target.dataset.index);
    const shutdownDevice = () => setShutdown(!shutdown);
    const restartDevice = () => {
        setRestart(true)
        // setTimeout(() => {
        //     setRestart(false)
        // }, 5000);
        fetch("http://localhost:5000/")
            .then(res => console.log(res))
            .catch(rej => console.log(rej))
    }
    
    const tabs = [
        { title: 'Мониторинг и управление', component: <Monitoring 
                restart={restart} 
                restartDevice={restartDevice}
                shutdown={shutdown}
                shutdownDevice={shutdownDevice}
            /> 
        },
        { title: 'Настройка', component: <Settings /> },
        { title: 'Журнал действий', component: <ActivityLog /> },
    ];
    
    return (
        <main>
            {!navPanel && 
                <button className="open" onClick={() => setNavPanel(true)}>
                    <img src={imgOpenTab} alt="open" width={40}/>
                </button>}
            {navPanel && 
                <aside className="tab">
                    <nav>
                        {tabs.map((n, i) => (
                            <button
                                className={`tablinks ${i === active ? 'active' : ''}`}
                                onClick={openTab}
                                data-index={i}
                                key={i}
                            >{n.title}</button>
                        ))}
                    </nav>
                    <button className="close" onClick={() => setNavPanel(false)}>
                        <img src={arrow} alt="close" />
                    </button>
                </aside>
            }
            {tabs[active].component}
        </main>
    );
}

export default MainPage;
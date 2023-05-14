import React, { useState, useContext } from "react";
import { ContextState } from "../context";
import Monitoring from "./tabs/Monitoring";
import Settings from "./tabs/Settings";
import ActivityLog from "./tabs/ActivityLog";
import imgOpenTab from "../assets/open-nav.svg";
import arrow from "../assets/arrow.svg";

const tabs = [
    { title: 'Мониторинг и управление', component: <Monitoring /> },
    { title: 'Настройка', component: <Settings /> },
    { title: 'Журнал действий', component: <ActivityLog /> },
];

const MainPage = () => {
    const [active, setActive] = useState(0);
    const [navPanel, setNavPanel] = useState(true);
    const [,,isError] = useContext(ContextState);
    const openTab = e => setActive(+e.target.dataset.index);
        
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
            {isError && <p style={{ position: "absolute", top: "40%", left: "50%", color: "red", fontSize: "30px" }}>Сервер не отвечает</p>}
        </main>
    );
}

export default MainPage;
import React, {useContext } from "react";
import { ContextState } from "../../context";

const ActivityLog = () => {
    const [,log] = useContext(ContextState);

    return (
        <div>
            <div className="header">
                <h1>Журнал действий</h1>
            </div>
            <div className="main">
                {log.map((item, i) => 
                    <p key={i}>
                        «{item.name}» изменено с {item.oldValue} на {item.value}
                    </p>
                )}
            </div>    
        </div>
    )
}

export default ActivityLog;
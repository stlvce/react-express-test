import React, {useContext} from "react";
import { ContextState } from "../../context";

const ActivityLog = () => {
    const [, log] = useContext(ContextState);

    return (
        <div>
            <div className="header">
                <h1>Журнал действий</h1>
            </div>
            <div className="main">
                {log.map(item => 
                    <p key={item.name}>
                        Время обновление параметра «{item.name}» изменено с {item.prev} на {item.next}
                    </p>
                )}
            </div>    
        </div>
    )
}

export default ActivityLog;
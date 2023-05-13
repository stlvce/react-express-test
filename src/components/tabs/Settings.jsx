import React, { useContext } from "react";
import { ContextState } from "../../context";

const Settings = () => {
    const [params] = useContext(ContextState);

    const sendForm = (e) => {
        e.preventDefault()
    }
    
    return (
        <div>
            <div className="header">
                <h1>
                    Настройки
                </h1>
            </div>
            <div className="main">  
                <form>
                    {params.map(item =>
                        <div key={item.name}>
                            <label htmlFor={item.name}>
                                {item.name}
                                <input type="text" name={item.name} id={item.name} defaultValue={item.state}/>
                            </label>
                            <label htmlFor={item.name+"ref"}>
                                Период обновления
                                <input type="number" name={item.name+"ref"} id={item.name+"ref"} defaultValue={0}/>
                            </label>
                        </div> 
                    )}
                    <input type="submit" onClick={sendForm} value="Сохранить"/>
                </form> 
            </div>
        </div>
   
    )
}

export default Settings;
import React, { useContext } from "react";
import { ContextState } from "../../context";
import Input from "../ui/input/Input";

const Settings = () => {
    const [params,,,handleSubmit, handleChange] = useContext(ContextState);

    return (
        <div>
            <div className="header">
                <h1>
                    Настройки
                </h1>
            </div>
            <div className="main">  
                <form onSubmit={handleSubmit}>
                    {params.map(item =>
                        <div key={item.name}>
                            <label htmlFor={item.name}>
                                {item.name}:
                                <Input 
                                    type="text" 
                                    name={item.name} 
                                    id={item.name} 
                                    defaultValue={item.value}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor={item.name+"ref"}>
                                Период обновления:
                                <Input type="number" name={item.name+"ref"} id={item.name+"ref"} defaultValue={0}/>
                            </label>
                        </div> 
                    )}
                    <input className="submit" type="submit" onClick={handleSubmit} value="Сохранить"/>
                </form> 
            </div>
        </div>
   
    )
}

export default Settings;
import "./styles/App.css";
import MainPage from "./components/MainPage";
import { ContextState } from "./context";

const params = [
    { name: "Состояние устройства", state: "включено"},
    { name: "Состояние детектора", state: "ожидание"},
    { name: "Температура корпуса", state: "40.6"},
    { name: "Имя Wi-Fi сети (SSID)", state: "MyOwnNetwork"}, 
    { name: "Сила сигнала Wi-Fi сети", state: "-68 dB"} 
];

const log = [
    { name: "Состояние детектора", prev: "5", next: "1"},
    { name: "Состояние детектора", prev: "1", next: "10"},
    { name: "Сила сигнала Wi-Fi сети", prev: "20", next: "3"}
];

function App() {
    return (
        <ContextState.Provider value={[params, log]}>
            <MainPage />
        </ContextState.Provider>
    );
}

export default App;

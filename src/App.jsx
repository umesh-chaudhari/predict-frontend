import "./App.css";
import Predict from "./components/Predict.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Metrics from "./components/Metrics.jsx";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Predict/>} path="/"/>
                <Route element={<Metrics />} path="/metrics" />
            </Routes>
        </BrowserRouter>

    )
}
export default App;

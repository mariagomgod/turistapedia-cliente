import './App.sass';

import { useState, createContext } from "react";

import Header from "./components/Header";
import Router from "./components/Router";
import Footer from "./components/Footer";

export const GlobalContext = createContext({});

function App() {

  const [coldColors, setColdColors] = useState(false);
  const [volume, setVolume] = useState(1);

  return (

    <div className={"App " + (coldColors ? "colorblind" : "")}> {/*Implanto con estilos sass (colorblind) un toggle para que cambie la gama de color para discapacitados visuales.*/}
      <GlobalContext.Provider value={{volume, setVolume}}>
        <Header coldColors={coldColors} setColdColors={setColdColors} volume={volume} setVolume={setVolume} />
        <div id="main-content">
          <Router />
        </div>
        <Footer />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;

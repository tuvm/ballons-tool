import React from "react";
import ModalVerify from "./components/ModalVerify/ModalVerify";
import Header from "./components/header/Header";
import LeftSidebar from "./components/left-sidebar/LeftSidebar";
import Main from "./components/main/Main";
import useVerify from "./utils/useVerify";
import { ThemeProvider } from "@material-tailwind/react";
import { GlobalProvider, useGlobalContext } from "./GlobalContext";

import "./App.css";

function App() {
  const [, , result] = useVerify();

  return (
    <div className="App h-screen flex flex-col">
      <GlobalProvider>{result ? <AppChild /> : <ModalVerify />}</GlobalProvider>
    </div>
  );
}

function AppChild() {
  const { state } = useGlobalContext();
  const toolMode = state.toolMode;
  console.log(toolMode)

  return (
    <ThemeProvider>
      <Header />
      <section className="flex gap-2 main-wrapper bg-slate-100">
        <LeftSidebar />
        <Main />
      </section>
    </ThemeProvider>
  );
}

export default App;

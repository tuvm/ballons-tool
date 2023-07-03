import React from "react";
import { Tool, useGlobalContext } from "../../GlobalContext";
import BrushOptions from "./BrushOptions";
import "./RightSidebar.scss";
import TextOptions from "./TextOptions";
import Subtitles from "./Subtitles";

const RightSidebar = () => {
  const { state } = useGlobalContext();
  const toolMode = state.toolMode;

  const Tools = {
    [Tool.brush]: <BrushOptions />,
    [Tool.text]: <Subtitles />,
  };

  return (
    <div className="max-w-xs w-1/3 sidebar h-full shrink-0 right-sidebar">
      {Tools[toolMode]}
    </div>
  );
};

export default RightSidebar;

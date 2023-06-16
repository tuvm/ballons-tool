import React, { useEffect, useRef } from "react";
import { Tool, useGlobalContext } from "../../App";

import "./Main.scss";
import TopSidebar from "../top-bar/TopSidebar";
import Upload from "../upload/Upload";
import BottomBar from "../bottom-bar/BottomBar";
import RightSidebar from "../right-sidebar/RightSidebar";

const Main = () => {
  const { state, dispatch, canvasControl } = useGlobalContext();
  const toolMode = state.toolMode;
  const [canvasRef, wrapperRef] = [useRef(null), useRef(null)];
  console.log(state);

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return;

    canvasControl.init(canvasRef.current, wrapperRef.current);
    canvasControl.setBackground(state.focusImage?.src);

    // Add shortcut key
    document.addEventListener("keydown", canvasControl.shortcut);
    // Add mouse wheel event
    // document.addEventListener("wheel", canvasControl.mouseWheel);
    wrapperRef.current.addEventListener("wheel", canvasControl.mouseWheel);

    return () => {
      document.removeEventListener("keydown", canvasControl.shortcut);
      // document?.removeEventListener("wheel", canvasControl.mouseWheel);
      wrapperRef.current?.removeEventListener(
        "wheel",
        canvasControl.mouseWheel
      );
    };
  }, [state.focusImage]);

  return (
    <div className="flex-auto flex flex-col main-editor">
      <TopSidebar />
      {!state.images?.length ? (
        <Upload />
      ) : (
        <>
          <div className="flex h-full">
            <div className="main flex items-center justify-center gap-6">
              {state.focusImage > -1 && state.images[state.focusImage]?.origin && (
                <div className="image flex items-center justify-center">
                  <img src={state.images[state.focusImage]?.origin} alt="" />
                </div>
              )}
              {state.focusImage > -1 && (
                <div className="image relative" ref={wrapperRef}>
                  <canvas ref={canvasRef} id="canvas" />
                </div>
              )}
            </div>
            {toolMode === Tool.text && <RightSidebar />}
          </div>
          
          <BottomBar />
        </>
      )}
    </div>
  );
};

export default Main;

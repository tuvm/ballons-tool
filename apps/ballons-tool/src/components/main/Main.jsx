import React, { useEffect, useRef } from "react";
import { Tool, useGlobalContext } from "../../GlobalContext";

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
    canvasControl.onChange = (state) => {
      dispatch({ type: 'checkPoint', value: state });
    }
    canvasControl.setBackground(state.images[state.focusImageIdx]?.origin);

    // Add shortcut key
    // document.addEventListener("keydown", canvasControl.shortcut);
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
  }, [state.focusImageIdx]);

  return (
    <div className="flex-auto flex flex-col main-editor">
      <TopSidebar />
      {!state.images?.length ? (
        <Upload />
      ) : (
        <>
          <div className="flex h-full">
            <div className="main flex items-center justify-center gap-6">
              {state.compare && state.focusImageIdx > -1 && state.images[state.focusImageIdx]?.origin && (
                <div className="image flex items-center justify-center">
                  <img src={state.images[state.focusImageIdx]?.origin} alt="" />
                </div>
              )}
              {state.focusImageIdx > -1 && (
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

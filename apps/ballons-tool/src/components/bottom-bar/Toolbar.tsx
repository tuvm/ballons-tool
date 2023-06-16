import React from "react";
import { Tool, useGlobalContext } from "../../App";
import { Button, Slider } from "@material-tailwind/react";
import { CompareOutlined, FullscreenOutlined, RedoOutlined, RefreshOutlined, RemoveRedEyeOutlined, UndoOutlined, ZoomInOutlined } from "icons";

const Toolbar = () => {
  const { canvasControl, dispatch, state } = useGlobalContext();

  const addText = () => {
    if (state.toolMode === Tool.text) {
      dispatch({ type: "setTool", value: "" });
      return;
    }

    dispatch({ type: "setTool", value: Tool.text });
    canvasControl.disableBrush();
    canvasControl.addText();
  };

  const addBrush = () => {
    if (state.toolMode === Tool.brush) {
      dispatch({ type: "setTool", value: "" });
      canvasControl.disableBrush();
    } else {
      dispatch({ type: "setTool", value: Tool.brush });
      canvasControl.addBrush();
    }
  };

  // const changeDiff = (val) => {
  //   dispatch({
  //     type: "changeImageMode",
  //     value: {
  //       mode: val,
  //       index: state.focusImage,
  //     },
  //   });
  //   canvasControl.addImage(state.images[state.focusImage][val]);
  // };

  return (
    <div className="h-full flex items-center gap-1 justify-end p-2">
      {/* {state.step >= Step.translated && (
        <select
          className="diff"
          onChange={(e) => changeDiff(e.target.value)}
          value={state.images[state.focusImage]?.imageMode}
          title="Change Image Mode"
        >
          {diffOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )} */}
      {/* <Button variant="text" className="p-3" onClick={() => canvasControl.zoom("zoomIn")} title="Zoom In">
        <ZoomInLineIcon />
      </Button> */}
      {/* <Button variant="text" className="p-3" onClick={() => canvasControl.zoom("fit")} title="Fit">
        Fit
      </Button> */}
      {/* <Button variant="text" className="p-3" onClick={() => canvasControl.zoom("zoomOut")} title="Zoom Out">
        <ZoomOutLineIcon />
      </Button> */}
      <div className="tool-group border-r border-gray-400 pr-2">
        <Button variant="text" className="p-2" title="Undo" onClick={() => canvasControl.undo()}>
          <UndoOutlined className="text-2xl leading-4" />
        </Button>
        <Button variant="text" className="p-2" title="Reno" onClick={() => canvasControl.redo()}>
          <RedoOutlined className="text-2xl leading-4" />
        </Button>
        <Button variant="text" className="p-2" title="Compare" onClick={() => canvasControl.redo()}>
          <CompareOutlined className="text-2xl leading-4" />
        </Button>
        <Button variant="text" className="p-2" title="Eye" onClick={() => canvasControl.redo()}>
          <RemoveRedEyeOutlined className="text-2xl leading-4" />
        </Button>
      </div>
      <div className="tool-group border-r border-gray-400 pr-2 flex items-center">
        <Button variant="text" className="p-2" onClick={() => canvasControl.zoom("zoomIn")} title="Zoom In">
          <ZoomInOutlined className="text-2xl leading-4" />
        </Button>
        <Slider defaultValue={50} />
      </div>
      <div className="tool-group">
        <Button variant="text" className="p-2" title="Full Screen" onClick={() => canvasControl.undo()}>
          <FullscreenOutlined className="text-2xl leading-4" />
        </Button>
        <Button variant="text" className="p-2" title="Reset" onClick={() => canvasControl.redo()}>
          <RefreshOutlined className="text-2xl leading-4" />
        </Button>
      </div>
      {/* <Button variant="text" className="p-3" onClick={addBrush} title="Brush">
        <BrushFill
          className={clsx({
            "rounded border-solid border-2 border-gray-400":
              state.toolMode === Tool.brush,
          })}
          size={32}
        />
      </Button>
      <Button variant="text" className="p-3" onClick={addText} title="Text">
        <TextIcon
          className={clsx({
            "rounded border-solid border-2 border-gray-400":
              state.toolMode === Tool.text,
          })}
          size={32}
        />
      </Button> */}
    </div>
  );
};

const diffOptions = [
  { value: "origin", label: "Origin" },
  { value: "inpainted", label: "Inpainted" },
  { value: "mask", label: "Mask" },
];

export default Toolbar;

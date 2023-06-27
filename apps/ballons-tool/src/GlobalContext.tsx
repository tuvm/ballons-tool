import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useImmerReducer } from "use-immer";
import CanvasControl from "./utils/CanvasControl";
import { UndoRedo } from "./utils/UndoRedo";
import { TEXT_ALIGN, TEXT_ROTATION } from "./utils/constants";

interface Action {
  type:
    | "setImageInpainted"
    | "setImageMask"
    | "setImageState"
    | "setProjectName"
    | "focusImage"
    | "setResult"
    | "changeStep"
    | "setImages"
    | "setTool"
    | "checkPoint"
    | "setExportImage"
    | "undo"
    | "redo"
    | "changeImageMode"
    | "setCompare"
    | "addText"
    | "updateText";
  value?: any;
}
export enum Step {
  select,
  upload,
  ready,
  translate,
  translating,
  translated,
  download,
  downloaded,
}
// Step flow: 0.select -> 1.upload -> 2.ready -> 3.translate -> 4.translating -> 5.translated -> 6.download -> 7.downloaded

export enum Tool {
  upload = "upload",
  brush = "brush",
  eraser = "eraser",
  text = "text",
  clean = "clean",
  export = "export",
}

type ImageMode = "origin" | "inpainted" | "mask";

export interface GlobalState {
  images: {
    origin?: string;
    inpainted?: string;
    mask?: string;
    state?: string;
    imageMode?: ImageMode;
    history?: UndoRedo<{ version: string, objects: Object[] }>;
    texts?: any[];
    focusTextIdx?: number;
    export?: string;
  }[];
  projectName: string;
  process: number;
  focusImageIdx: number;
  canvasState: any;
  inpainted: string[];
  mask: string[];
  trans: string;
  step: Step;
  toolMode: Tool;
  compare: boolean;
}

const reducer = (draft: GlobalState, action: Action) => {
  console.log(`📕 action.type - 93:App.tsx \n`, action.type, action?.value);
  switch (action.type) {
    case "setImages":
      draft.images = [];
      draft.step = Step.upload;
      draft.toolMode = Tool.clean;
      action.value.forEach((image, index: number) => {
        draft.images[index] = {
          origin: URL.createObjectURL(image),
          imageMode: "origin",
          history: new UndoRedo<{ version: string, objects: Object[] }>({version: '0.0.1', objects: []}, 20),
          texts: [],
          focusTextIdx: -1,
          export: "",
        };
      });
      draft.focusImageIdx = 0;
      return;
    case "setImageInpainted":
      draft.images[action.value.index].inpainted = action.value.data;
      return;
    case "setImageMask":
      draft.images[action.value.index].mask = action.value.data;
      return;
    case "setImageState":
      draft.images[action.value.index].state = action.value.data;
      return;
    case "setExportImage":
      if (draft.images?.length && draft.focusImageIdx !== -1) {
        draft.images[draft.focusImageIdx].export = action.value;
      }
      return;
    case "setProjectName":
      draft.projectName = action.value?.data?.project_name;
      draft.step = Step.ready;
      return;
    case "focusImage":
      draft.focusImageIdx = action.value;
      return;
    case "setResult":
      draft.inpainted = action.value?.inpainted;
      draft.mask = action.value?.mask;
      draft.trans = action.value?.trans;
      draft.step = Step.translated;
      return;
    case "changeImageMode":
      draft.images[action.value.index].imageMode = action.value.mode;
      return;
    case "changeStep":
      draft.step = action.value;
      return;
    case "setTool":
      draft.toolMode = action.value;
      return;
    case "checkPoint":
      
      if (!draft.images?.length || draft.focusImageIdx === -1) return;
      draft.images[draft.focusImageIdx].history?.insert(action.value);
      return;
    case "addText":
      if (!draft.images?.length || draft.focusImageIdx === -1) return;
      draft.images[draft.focusImageIdx].texts?.push(action.value);
      draft.images[draft.focusImageIdx].focusTextIdx = (draft.images[draft.focusImageIdx]?.texts?.length || 0) - 1;
      return;
    case "updateText":
      if (!draft.images?.length || draft.focusImageIdx === -1 || draft.images[draft.focusImageIdx].focusTextIdx === undefined || draft.images[draft.focusImageIdx].focusTextIdx === -1) return;
      const texts = draft.images[draft.focusImageIdx].texts;
      const text: fabric.IText = texts && texts[draft.images[draft.focusImageIdx].focusTextIdx];
      text.set("textAlign", TEXT_ALIGN[action.value.align]);
      text.set("fill", action.value.color);
      text.set("fontWeight", action.value.bold ? 'bold' : 'normal');
      text.set('underline', action.value.underline);
      text.set('fontStyle', action.value.italic ? 'italic' : 'normal');
      text.set('lineHeight', action.value.lineSpacing);
      text.set('charSpacing', action.value.letterSpacing);
      text.set('fontFamily', action.value.font);
      text.set('fontSize', action.value.fontSize);
      text.set('angle', action.value.rotation === TEXT_ROTATION.HORIZONTAL ? 0 : 90)
      return;
    case "undo":
      if (!draft.images?.length || draft.focusImageIdx === -1) return;
      const undoState = draft.images[draft.focusImageIdx].history?.undo();
      draft.canvasState = undoState;
      return;

    case "redo":
      if (!draft.images?.length || draft.focusImageIdx === -1) return;
      const redoState = draft.images[draft.focusImageIdx].history?.redo();
      draft.canvasState = redoState;
      return;
    case "setCompare":
      draft.compare = action.value;
    default:
      return draft;
  }
};

const initialState: GlobalState = {
  process: -1,
  projectName: "",
  images: [],
  step: Step.select,
  focusImageIdx: -1,
  compare: false,
  inpainted: [],
  canvasState: null,
  mask: [],
  trans: "",
  toolMode: Tool.upload
};

const GlobalContext = createContext({});
const canvasControl = new CanvasControl();

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useImmerReducer<any, any>(reducer, initialState);
  // const [CV, setSV] = useImmer(null);

  const memoizedValue = useMemo(
    () => ({ state, dispatch, canvasControl }),
    [state, dispatch, canvasControl]
  );

  useEffect(() => {
    if (canvasControl) {
      canvasControl.setState(state.canvasState);
    }
  }, [state.canvasState]);
  

  // useEffect(() => {
  //   console.log(`📕 CV - 150:App.tsx \n`, CV);
  // }, [CV]);

  return (
    <GlobalContext.Provider value={memoizedValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext) as {
    state: GlobalState;
    dispatch: React.Dispatch<Action>;
    canvasControl: CanvasControl;
  };
};
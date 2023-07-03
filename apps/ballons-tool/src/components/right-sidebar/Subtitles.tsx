import { Button, Textarea } from "@material-tailwind/react";
import { useGlobalContext } from "../../GlobalContext";
import React from "react";
import TextOptions from "./TextOptions";

const Subtitles = () => {
  const { canvasControl, dispatch, state } = useGlobalContext();
  const { images, focusImageIdx } = state;
  const texts = images?.[focusImageIdx]?.texts || [];
  const focusTextIdx = images?.[focusImageIdx]?.focusTextIdx;
  console.log(texts);
  const handleAddText = () => {
    const text = canvasControl.addText();
    text?.set('fill', 'Red');
    dispatch({ type: 'addText', value: text });
  }
  const handleFocus = (idx: number) => {
    dispatch({ type: 'focusText', value: idx });
  }
  const handleChangeText = (e: any) => {
    dispatch({ type: 'changeText', value: e.target.value });
    setTimeout(() => {
      canvasControl.rerender();
    }, 0);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b">
        <Button variant="filled" onClick={handleAddText} className="w-full">Add Text</Button>
      </div>
      <div className="overflow-y-scroll overflow-x-hidden flex-shrink p-2">
        {texts.map((it, idx) => (
          <div className="pt-2 border-t border-gray-400">
            <div>Text Block #{idx + 1}</div>
            {focusTextIdx === idx && <TextOptions />}
            <div className="mt-2">
              <Textarea
                label="Content" placeholder="Enter Text" defaultValue={it.text}
                onFocus={() => handleFocus(idx)} onChange={handleChangeText}
              />
            </div> 
          </div>
        ))}
      </div>
    </div>
  )
};

export default Subtitles;

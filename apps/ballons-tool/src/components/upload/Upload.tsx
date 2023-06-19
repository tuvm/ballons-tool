import clsx from "clsx";
import React, { memo, useCallback, useRef } from "react";
import { Step, useGlobalContext } from "../../GlobalContext";
import { UploadImg } from "../../services/api";
import useSetDragFile from "../../utils/useSetDragFile";

const Upload = () => {
  const { state, dispatch, canvasControl } = useGlobalContext();
  const [currentIndexFocus, dragBox] = [useRef(null), useRef(null)];

  const onChangeFile = useCallback(
    (e) => {
      const files = e.target.files;
      if (files.length === 0) return;

      importImage([...files]);
    },
    [state.images]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const importImage = useCallback(
    (files) => {
      dispatch({ type: "changeStep", value: Step.upload }); //? 1: upload
      const images = files.sort((a, b) => a.name.localeCompare(b.name));

      dispatch({ type: "setImages", value: images });

      UploadImg(images).then((res) => {
        dispatch({ type: "setProjectName", value: res }); //? 2: ready to translate
      });
    },
    [state.images]
  );

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!inputRef.current) return;
      inputRef.current.click();
    },
    [inputRef]
  );

  useSetDragFile(dragBox, importImage);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div
        className={clsx(
          "drag-box flex py-14 px-4 cursor-pointer flex-col items-center justify-center text-center rounded-lg border border-dashed border-gray-600 hover:bg-gray-50",
          {
            "cursor-not-allowed hover:bg-white": [
              Step.upload,
              Step.translate,
            ].includes(state.step),
          }
        )}
        onClick={handleClick}
        ref={dragBox}
      >
        <div className="text-[32px]">Click or Drag here to upload images</div>
        <div>Supported format: jpg, jpeg, png</div>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg"
        onChange={onChangeFile}
        hidden
      />
    </div>
  );
};

export default memo(Upload);

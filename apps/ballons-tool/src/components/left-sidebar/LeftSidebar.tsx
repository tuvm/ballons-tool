import { ArtificialIntelligence1Outlined, FileExportOutlined, HealingOutlined, InputTextOutlined, SubtitlesOutlined } from "icons";
import React, { useEffect } from "react";
import "./LeftSidebar.scss";
import clsx from "clsx";
import { Tool, useGlobalContext } from "../../GlobalContext";
import boxModel from "../../UI/box-model/BoxModel";

const LeftSidebar = () => {
  const {
    state: { toolMode },
    dispatch,
    canvasControl,
  } = useGlobalContext();
  const ref = React.useRef<HTMLDivElement>(null);
  const tabInkBarRef = React.useRef<HTMLDivElement>(null);
  const backgroundActiveRef = React.useRef<HTMLDivElement>(null);

  const items = [
    // {
    //   label: "Upload",
    //   key: Tool.upload,
    //   icon: <AddImage />,
    //   onClick: () => {},
    // },
    {
      label: "Auto AI",
      key: Tool.clean,
      icon: <ArtificialIntelligence1Outlined className="text-3xl" />,
      onClick: () => {},
    },
    {
      label: "Healing Brush",
      key: Tool.brush,
      icon: <HealingOutlined className="text-3xl" />,
      onClick: () => {},
    },
    {
      label: "Subtitle",
      key: Tool.text,
      icon: <SubtitlesOutlined className="text-3xl" />,
      onClick: () => {},
    },
    {
      label: "Export",
      key: Tool.export,
      icon: <FileExportOutlined className="text-3xl" />,
      onClick: () => {},
    },
  ];

  useEffect(() => {
    if (!ref.current) return;

    ref.current.childNodes.forEach((node) => {
      node.addEventListener("click", () => {
        if (!tabInkBarRef.current) return;

        const { top, height } = (
          node as HTMLDivElement
        ).getBoundingClientRect();
        tabInkBarRef.current.style.top = `${top}px`;
        tabInkBarRef.current.style.height = `${height}px`;
      });
    });
  }, []);

  return (
    <nav className="left-sidebar flex flex-col shrink-0" ref={ref}>
      {items.map((item) => (
        <div className={clsx("item-wrapper mt-1")} key={item.key}>
          <div
            className={clsx("item flex flex-col gap-2 cursor-pointer", {
              selected: toolMode === item.key,
            })}
            onClick={() => {
              if (item.key === Tool.brush) canvasControl.enableBrush();
              else if (item.key === Tool.text) {
                canvasControl.disableBrush();
              }
              dispatch({ type: "setTool", value: item.key });
            }}
          >
            <div className="function-wrapper flex flex-col items-center px-2 py-2 gap-1">
              {item.icon}
              <span className="text-base">{item.label}</span>
            </div>
          </div>
        </div>
      ))}
      <div ref={tabInkBarRef} className="tab-ink-bar" />
      <div ref={backgroundActiveRef} className="background-active" />
    </nav>
  );
};

export default LeftSidebar;

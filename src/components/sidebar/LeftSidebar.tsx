import { ReactComponent as HealingBrush } from "@assets/bandage.svg";
import { ReactComponent as FileExport } from "@assets/file-export.svg";
import { ReactComponent as InputText } from "@assets/input-text.svg";
import {
  Card,
  List,
  ListItem,
} from "@material-tailwind/react";
import React from "react";
import { Tool, useGlobalContext } from "@/App";
import clsx from "clsx";
 
export default function LeftSidebar() {
  const {
    state: { toolMode },
    dispatch,
  } = useGlobalContext();

  const items = [
    {
      label: "Auto AI",
      key: Tool.clean,
      icon: <img className="" src="/ai.png" />,
      onClick: () => {},
    },
    {
      label: "Healing Brush",
      key: Tool.brush,
      icon: <HealingBrush />,
      onClick: () => {},
    },
    {
      label: "Subtitle",
      key: Tool.text,
      icon: <InputText />,
      onClick: () => {},
    },
    {
      label: "Export",
      key: Tool.export,
      icon: <FileExport />,
      onClick: () => {},
    },
  ];

  return (
    <Card className="rounded-none top-18 h-[calc(100vh-2rem)] shadow-xl shadow-blue-gray-900/5">
      <List className="min-w-14 p-0">
        {items.map(it => (
          <ListItem className={clsx("flex flex-col rounded-none", { 'bg-primary-main': toolMode === it.key })} onClick={() => dispatch({ type: "setTool", value: it.key })}>
            <div className="w-10 h-10">{it.icon}</div>
            <div>{it.label}</div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
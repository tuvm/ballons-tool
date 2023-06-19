import React, { useState } from "react";
import Loading from "../../UI/loading/Loading";
import "./TopSidebar.scss";
import { Tool, useGlobalContext } from "../../GlobalContext";
import { Select, Option, Button, Slider, Input, Checkbox } from "@material-tailwind/react";
import classnames from 'classnames';
import { ArtificialIntelligence1Outlined, HealingOutlined } from "icons";

type ToolList = Pick<
  { [key in keyof typeof Tool]: React.ReactNode },
  "clean" | "brush" | "export"
>;

const TopSidebar = () => {
  const { state } = useGlobalContext();
  const toolMode = state.toolMode;

  const Tools: ToolList = {
    [Tool.clean]: <AI />,
    [Tool.brush]: <BrushOptions />,
    [Tool.export]: <ExportOptions />,
  };

  return Tools[toolMode] ? <div className="p-4 border-b border-gray-400">{Tools[toolMode]}</div> : null;
};

const AI = () => {
  const [mode, setMode] = useState('clean-raw');
  const [images, setImages] = useState('all');

  return (
    <ListOptions>
      <div className="flex items-center text-xl text-gray-700">
        <ArtificialIntelligence1Outlined className="mr-2 text-3xl leading-4" />
        <span>Auto AI</span>
      </div>
      <div>
        <Select label="Choose mode AI" value={mode} onChange={(val) => val && setMode(val)}>
          <Option value="clean-raw">Clean Raw</Option>
          <Option value="translate" disabled>
            Translate (Coming soon)
          </Option>
        </Select>
      </div>
      <div>
        <Select label="Choose images" value={images} onChange={(val) => val && setImages(val)}>
          <Option value="all">All Images</Option>
          <Option value="current">Current Image</Option>
        </Select>
      </div>
      <Button>Run AI</Button>
    </ListOptions>
  );
};

const BrushOptions = () => {
  const { canvasControl } = useGlobalContext();
  const [brushSize, setBrushSize] = useState(25);
  const handleChangeBrushSize = (size: number) => {
    setBrushSize(size);
    canvasControl.setBrushSize(size);
  }

  return (
    <ListOptions>
      <div className="flex items-center text-xl text-gray-700">
        <HealingOutlined className="mr-2 text-3xl leading-4" />
        <span>Healing Brush</span>
      </div>
      <div className="flex items-center">
        <p className="text-base whitespace-nowrap text-gray-700">Brush size</p>
        <Slider
          className="mx-3"
          step={1}
          defaultValue={50}
          value={brushSize}
          onChange={(e) => handleChangeBrushSize(Number(e.target.value))}
        />
        <Input
          max={100}
          label="Enter Size"
          type="number"
          value={brushSize}
          onChange={(e) => handleChangeBrushSize(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center">
        <Button>Healing</Button>
        <Checkbox label="Heal automatically in 01 second" />
      </div>
    </ListOptions>
  );
};

const ExportOptions = () => {
  const [fileType, setFileType] = useState('');

  const sizes = {
    original: {
      width: 0,
      height: 0,
      title: "Original",
    },
    standard: {
      width: 640,
      height: 480,
      title: "Standard",
    },
    medium: {
      width: 1280,
      height: 720,
      title: "Medium",
    },
    high: {
      width: 1920,
      height: 1080,
      title: "High",
    },
  };

  return (
    <ListOptions>
      <div>
        <Select label="File type" value={fileType} onChange={(value) => { console.log(value); setFileType(value);}}>
          <Option value="png">PNG</Option>
          <Option value="jpg">JPG</Option>
          <Option value="jpg">PDF</Option>
        </Select>
      </div>
      <div>
        <Select label="Size">
          {Object.entries(sizes).map(([key, value]) => (
            <Option
              value={key}
            >{`${value.title} (${value.width} x ${value.height})`}</Option>
          ))}
        </Select>
      </div>
      <div>
        <Button>Export</Button>
      </div>
    </ListOptions>
  );
};

const ListOptions = ({ children }: { children: React.ReactNode }) => {
  if (!children) return null;

  if (!Array.isArray(children)) {
    children = [children];
  }
  
  return (
    <div className="flex gap-2">
      {(children as React.ReactElement[]).map((child, index) => (
        <div
          className={classnames('flex gap-2', {'border-r border-gray-400 pr-2': index !== (children as any).length - 1 })}
          key={index}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default TopSidebar;

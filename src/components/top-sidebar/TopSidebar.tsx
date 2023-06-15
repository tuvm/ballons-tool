import React, { useState } from "react";
import Loading from "../../UI/loading/Loading";
import "./TopSidebar.scss";
import { Tool, useGlobalContext } from "@/App";
import { Select, Option, Button, Slider, Input, Checkbox } from "@material-tailwind/react";
import classnames from 'classnames';

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
  const items = [
    {
      label: "Choose mode AI:",
      component: (
        <select>
          <option value="clean-raw">Clean Raw</option>
          <option value="translate" disabled>
            Translate (Coming soon)
          </option>
        </select>
      ),
    },
    {
      label: "Choose images:",
      component: (
        <select>
          <option value="all">All Images</option>
          <option value="current">Current Image</option>
        </select>
      ),
    },
    {
      label: false,
      component: (
        <>
          <button>Run AI</button>
          <Loading />
        </>
      ),
    },
  ];

  return (
    <ListOptions>
      <div>
        <Select label="Choose mode AI">
          <Option value="clean-raw">Clean Raw</Option>
          <Option value="translate" disabled>
            Translate (Coming soon)
          </Option>
        </Select>
      </div>
      <div>
        <Select label="Choose images">
          <Option value="all">All Images</Option>
          <Option value="current">Current Image</Option>
        </Select>
      </div>
      <Button>Run AI</Button>
    </ListOptions>
  );
};

const BrushOptions = () => {
  return (
    <ListOptions>
      <div className="flex items-center">
        <p>Brush size</p>
        <Slider className="mx-3" defaultValue={50} />
        <Input label="Enter Size" type="number" />
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
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default TopSidebar;

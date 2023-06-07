import React, { useState } from "react";
import Loading from "../../UI/loading/Loading";
import "./TopSidebar.scss";
import { Tool, useGlobalContext } from "@/App";
import { Select, Option, Button } from "@material-tailwind/react";
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

  return <div className="p-4 border-b border-gray-400">{Tools[toolMode]}</div>;
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
      <Select label="Select Version">
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
        <Select label="Choose mode AI">
          <Option value="clean-raw">Clean Raw</Option>
          <Option value="translate" disabled>
            Translate (Coming soon)
          </Option>
        </Select>
      </div>
      {/* <div>
        <p>Choose images</p>
        <select>
          <option value="all">All Images</option>
          <option value="current">Current Image</option>
        </select>
      </div>
      <div>
        <button>Run AI</button>
        <Loading />
      </div> */}
    </ListOptions>
  );
};

const BrushOptions = () => {
  return (
    <ListOptions>
      <div>
        <p>Brush size</p>
        <input type="range" />
        <input type="number" />
      </div>
      <div>
        <button>Healing</button>
        <label>
          <input type="checkbox" />
          Heal automatically in 01 second
        </label>
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
    <div>
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
    </div>
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
          {child.props.children}
        </div>
      ))}
    </div>
  );
};

export default TopSidebar;

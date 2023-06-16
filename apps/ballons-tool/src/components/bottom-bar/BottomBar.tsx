import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "icons";
import React, { useState } from "react";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import { Collapse } from "@material-tailwind/react";

const BottomBar = () => {
  const triggerStyle = {
    width: 100,
    height: 20,
    position: 'absolute',
    transition: '0.25s ease-in-out',
    top: -20,
    left: '50%',
    zIndex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 -2px 5px -5px'
  };
  const [open, setOpen] = useState(false);

  return (
    <div className="bottom-bar relative bg-white">
      <div
        className="trigger flex justify-center items-center bg-white cursor-pointer z-0 overflow-hidden left-1/2 -top-4 absolute"
        style={{
          width: 100,
          height: 16,
          transition: '0.25s ease-in-out',
          zIndex: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          boxShadow: '0 -2px 5px -5px'
        }}
        onClick={() => setOpen(prev => !prev)}
      >
        {open ? <KeyboardArrowDownOutlined className="text-xl" /> : <KeyboardArrowUpOutlined className="text-xl" />}
      </div>
      <div className="content z-10">
        <Collapse open={open}>
          <Sidebar />
        </Collapse>
        <Toolbar />
      </div>
    </div>
  )
};

export default BottomBar;

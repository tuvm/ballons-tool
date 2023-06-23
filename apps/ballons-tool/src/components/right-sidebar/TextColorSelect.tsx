import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  Button,
} from "@material-tailwind/react";
import { TextFormatOutlined } from "icons";
 
interface Item {
  title: React.ReactNode | string | number;
  displayTitle?: React.ReactNode | string | number;
  value: string;
}
 
export default function TextColorSelect({
  value = '#000',
  onChange,
}: {
  value?: Item['value'],
  onChange?: (value: Item['value']) => unknown,
}) {
  const [openMenu, setOpenMenu] = React.useState(false);

  const items = [
    'Black', 'Maroon', 'Saddle Brown', 'Dark Slate Gray', 'Teal', 'Navy', 'Indigo', 'Dark Gray',
    'Fire Brick', 'Brown', 'Golden Rod', 'Dark Green', 'Turquoise', 'Medium Blue', 'Purple', 'Gray',
    'Red', 'Dark Orange', 'Gold', 'Green', 'Cyan', 'Blue', 'Violet', 'Dim Gray',
    'Light Salmon', 'Orange', 'Yellow', 'Lime', 'Pale Turquoise', 'Light Blue', 'Plum', 'Light Grey',
    'Lavender Blush', 'Antique White', 'Light Yellow', 'Honeydew', 'Azure', 'Alice Blue', 'Lavender', 'White',
  ];
 
  const triggers = {
    onClick: () => setOpenMenu((prev) => !prev),
  };
 
  return (
    <Menu open={openMenu} handler={setOpenMenu}>
      <MenuHandler>
        <Button
          {...triggers}
          variant={openMenu ? "filled" : "text"}
          className="flex items-center text-base font-normal capitalize tracking-normal whitespace-nowrap p-2"
        >
          <TextFormatOutlined className="text-2xl leading-4" style={{ color: value }} />
        </Button>
      </MenuHandler>
      <MenuList
        {...triggers}
        className="hidden overflow-visible lg:grid grid-cols-8"
      >
        {items.map((title) => {
          const value = title.replace(/\s/g, '');
          return (
            <Button variant="text" key={title} onClick={() => {
              onChange && onChange(value);
              setOpenMenu((prev) => !prev);
            }} className="w-10 h-4 rounded-none border-none outline-none" style={{ backgroundColor: value }} title={title}>
              </Button>
          )}
        )}
        <div className="col-span-8 mt-2 items-center flex">
          <input type="color" className="mr-2" placeholder="Custom" onChange={(e) => onChange && onChange(e.target.value)} />
          <span>Custom</span>
        </div>
      </MenuList>
    </Menu>
  );
}
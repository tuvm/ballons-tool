import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { KeyboardArrowDownOutlined } from "icons";
 
interface Item {
  title: React.ReactNode | string | number;
  displayTitle?: React.ReactNode | string | number;
  value: string | number;
}
 
export default function Dropdown({
  prefix,
  items,
  placeholder = 'Select',
  value,
  onChange,
}: {
  prefix?: React.ReactNode,
  items: Item[],
  placeholder?: string,
  value?: Item['value'],
  onChange?: (value: Item['value']) => unknown,
}) {
  const [openMenu, setOpenMenu] = React.useState(false);
 
  const triggers = {
    onClick: () => setOpenMenu((prev) => !prev),
  };
  const selectedItem = items.find(it => it.value === value);
 
  return (
    <Menu open={openMenu} handler={setOpenMenu}>
      <MenuHandler>
        <Button
          {...triggers}
          variant="text"
          className="flex items-center gap-3 text-base font-normal capitalize tracking-normal whitespace-nowrap"
        >
          {prefix}
          {selectedItem ? (
            <div>{selectedItem.displayTitle || selectedItem.title}</div>
          ) : (
            <div>{placeholder}</div>
          )}
          {" "}
          <KeyboardArrowDownOutlined
            className={`h-3.5 w-3.5 text-xl flex items-center transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList
        {...triggers}
        className="hidden gap-3 overflow-visible lg:grid"
      >
        <ul className="flex w-full flex-col gap-1">
          {items.map(({ title, value }) => (
            <a href="#" key={value} onClick={() => {
              onChange && onChange(value);
              setOpenMenu((prev) => !prev);
            }}>
              <MenuItem>
                {title}
              </MenuItem>
            </a>
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
}
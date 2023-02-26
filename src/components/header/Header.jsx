import React from "react";
import { useGlobalContext } from "../../App";
import { UploadImg } from "../../services/api";
import './header.scss';

const Header = () => {
  const { dispatch } = useGlobalContext();

  const importImage = () => {
    const input = document.createElement("input");
    // Import multiple images
    input.multiple = true;
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const files = e.target.files;
      const images = [...files];
      console.log(images);
      dispatch({ type: "setImage", value: images });

      UploadImg(images).then((res) => {
        dispatch({ type: "setProjectName", value: res });
      });
    };
    input.click();
  };

  return (
    <header className="header">
      <button onClick={importImage}>Import Image</button>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../GlobalContext";
import { Button } from "@material-tailwind/react";
import Dropdown from "@/UI/Dropdown";
import { FormatAlignCenterOutlined, FormatAlignLeftOutlined, FormatAlignRightOutlined, FormatBoldOutlined, FormatItalicOutlined, FormatLineSpacingOutlined, FormatUnderlinedOutlined, TextRotationDownOutlined, TextRotationNoneOutlined } from "icons";
import TextColorSelect from './TextColorSelect';
import { DEFAULT_TEXT_OPTIONS, FONT, TEXT_ALIGN, TEXT_ROTATION } from "@/utils/constants";

const TextOptions = () => {
  const { canvasControl, dispatch } = useGlobalContext();
  const [textStyle, setTextStyle] = useState(DEFAULT_TEXT_OPTIONS);

  useEffect(() => {
    dispatch({ type: 'updateText', value: textStyle });
    setTimeout(() => {
      canvasControl.rerender();
    }, 0);
  }, [textStyle]);

  const fonts = Object.keys(FONT).filter((v) => isNaN(Number(v))).map(it => ({ title: it, value: it }));

  const fontSizes = [4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 50, 60, 70, 80, 100];

  const textRotations = [
    {
      title: <div><TextRotationNoneOutlined className="text-xl" /> Horizontal</div> ,
      displayTitle: <TextRotationNoneOutlined className="text-2xl" />,
      value: TEXT_ROTATION.HORIZONTAL,
    }, {
      title: <div><TextRotationDownOutlined className="text-xl" /> Vertical</div>,
      displayTitle: <TextRotationDownOutlined className="text-2xl" />,
      value: TEXT_ROTATION.VERTICAL,
    },
  ];

  return (
    <div>
      <div className="font flex justify-between mb-2">
        <Dropdown items={fonts} value={textStyle.font} onChange={(val) => setTextStyle(prev => ({ ...prev, font: val }))} />
        <Dropdown items={fontSizes.map(it => ({ title: it + 'pt', value: it }))} value={textStyle.fontSize} onChange={(val) => setTextStyle(prev => ({ ...prev, fontSize: val }))} />
      </div>
      <div className="text flex justify-center mb-2">
        <div className="flex border-r border-gray-400 pr-2">
          <Button variant={textStyle.bold ? "filled" : "text"} className="p-2" title="Bold" onClick={() => setTextStyle(prev => ({ ...prev, bold: !prev.bold }))}>
            <FormatBoldOutlined className="text-2xl leading-4" />
          </Button>
          <Button variant={textStyle.italic ? "filled" : "text"} className="p-2" title="Italic" onClick={() => setTextStyle(prev => ({ ...prev, italic: !prev.italic }))}>
            <FormatItalicOutlined className="text-2xl leading-4" />
          </Button>
          <Button variant={textStyle.underline ? "filled" : "text"} className="p-2" title="Underlined" onClick={() => setTextStyle(prev => ({ ...prev, underline: !prev.underline }))} >
            <FormatUnderlinedOutlined className="text-2xl leading-4" />
          </Button>
          <TextColorSelect value={textStyle.color} onChange={(val) => setTextStyle(prev => ({ ...prev, color: val }))} />
        </div>
        <div className="flex pl-2">
          <Button variant={textStyle.align === TEXT_ALIGN.START ? "filled" : "text"} className="p-2" title="Bold" onClick={() => setTextStyle(prev => ({ ...prev, align: TEXT_ALIGN.START }))}>
            <FormatAlignLeftOutlined className="text-2xl leading-4" />
          </Button>
          <Button variant={textStyle.align === TEXT_ALIGN.CENTER ? "filled" : "text"} className="p-2" title="Italic" onClick={() => setTextStyle(prev => ({ ...prev, align: TEXT_ALIGN.CENTER }))}>
            <FormatAlignCenterOutlined className="text-2xl leading-4" />
          </Button>
          <Button variant={textStyle.align === TEXT_ALIGN.END ? "filled" : "text"} className="p-2" title="Underlined" onClick={() => setTextStyle(prev => ({ ...prev, align: TEXT_ALIGN.END }))} >
            <FormatAlignRightOutlined className="text-2xl leading-4" />
          </Button>
        </div>
      </div>
      <div className="text flex justify-center mb-2">
        <Dropdown
          prefix={<FormatLineSpacingOutlined />}
          items={['auto', 0.8, 1, 1.2, 1.25, 1.5, 2].map(it => ({ title: it, value: it === 'auto' ? 1.1 : it }))}
          value={textStyle.lineSpacing}
          onChange={(val) => setTextStyle(prev => ({ ...prev, lineSpacing: val }))}
        />
        <Dropdown
          prefix={<FormatLineSpacingOutlined className="-rotate-90" />}
          items={['auto', 0.8, 1, 1.2, 1.25, 1.5, 2].map(it => ({ title: it, value: it === 'auto' ? 1.1 : it }))}
          value={textStyle.letterSpacing}
          onChange={(val) => setTextStyle(prev => ({ ...prev, letterSpacing: val }))}
        />
        <Dropdown
          items={textRotations}
          value={textStyle.rotation}
          onChange={(val) => setTextStyle(prev => ({ ...prev, rotation: val }))}
        />
      </div>
      
    </div>
  );
};

export default TextOptions;

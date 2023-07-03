export enum TEXT_ALIGN {
  START,
  CENTER,
  END,
};

export enum TEXT_ROTATION {
  HORIZONTAL,
  VERTICAL,
};

export enum FONT {
  "Pacifico",
  "VT323",
  "Quicksand",
  "Inconsolata"
}

export const DEFAULT_TEXT_OPTIONS = {
  font: FONT[0],
  fontSize: 12,
  bold: false,
  italic: false,
  underline: false,
  align: TEXT_ALIGN.START,
  rotation: TEXT_ROTATION.HORIZONTAL,
  lineSpacing: 1.1,
  letterSpacing: 1.1,
  color: 'Black',
}

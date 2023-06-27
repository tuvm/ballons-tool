import { fabric } from "fabric";
import { Image } from "fabric/fabric-impl";

export class CanvasControl {
  private canvasElement: HTMLCanvasElement | undefined;
  private wrapperElement: HTMLDivElement | undefined;
  private canvas: fabric.Canvas | undefined;
  toggleText: boolean = false;
  pauseSaving: boolean = false; // flag to do not fire onChange event on update state
  isRestore: boolean = false;
  width: number = 0;
  height: number = 0;

  onChange: (state: any) => unknown = (state) => {
    console.log('onChange is not implemented', state);
  };

  constructor() {}

  init = (canvasRef: HTMLCanvasElement, wrapperRef: HTMLDivElement) => {
    this.canvasElement = canvasRef;
    this.wrapperElement = wrapperRef;
    if (this.canvas) return;

    this.canvas = new fabric.Canvas(this.canvasElement, {
      selection: false,
      width: this.wrapperElement.clientWidth,
      height: this.wrapperElement.clientHeight,
    });

    this.canvas.on("object:added", (e) => {
      const imageType = e.target?.cacheKey === "image-overlay";
      if (this.pauseSaving || this.isRestore) return;

      if (imageType) return;

      // if (pathType) {
      //   postPath(e.target).then((res) => {
      //     this.addImage(res.image);

      //     // Remove path
      //     this.canvas.remove(e.target);
      //   });
      // }

      this.onChange(this.exportJSON());
    });

    this.canvas.on("object:modified", (e) => {
      const imageType = e.target?.cacheKey === "image-overlay";
      if (this.pauseSaving || this.isRestore) return;

      if (imageType) return;

      this.onChange(this.exportJSON());
    });

    this.canvas.on("object:removed", (e) => {
      const imageType = e.target?.cacheKey === "image-overlay";
      const pathType = Boolean(e.target?.path);
      if (this.pauseSaving || this.isRestore) return;
      if (pathType) return;

      if (imageType) return;

      this.onChange(this.exportJSON())
    });
  }

  setBackground = (url: string) => {
    if (!this.canvas) return;
    console.log('🚀 ~ CanvasControl ~ url:', url)
    this.removeOldImage();
    fabric.Image.fromURL(url, (img) => {
      // this.image = url;
      if (!this.canvas) return;
      this.canvas.setBackgroundImage(
        img,
        this.canvas.renderAll.bind(this.canvas)
      );
      this.zoom("fit");
    });
  }

  hasBackground = () => {
    if (!this.canvas) return;
    return !!this.canvas.backgroundImage;
  }

  zoom = (type: "fit" | "zoomIn" | "zoomOut" | "reset" | "fill") => {
    if (!this.canvas) return;
    if (!this.canvas.backgroundImage) return;
    const img = (this.canvas.backgroundImage as Image).getElement();

    const { width, height } = img;
    const [widthCanvas, heightCanvas] = [
      this.canvas.getWidth(),
      this.canvas.getHeight(),
    ];

    switch (type) {
      case "fill":
        // Fill width image with width canvas

        if (width > height) {
          // Landscape
          this.canvas.setZoom(widthCanvas / width);
        } else {
          // Portrait
          this.canvas.setZoom(widthCanvas / width);
        }
        this.canvas.setHeight(height * this.canvas.getZoom());

        this.canvas.absolutePan({
          y: 0,
          x: 0,
        });

        return;
      case "zoomIn":
        const zoomRatio = this.canvas.getZoom() + 0.05;
        const center = this.canvas.getCenter();
        this.canvas.zoomToPoint(
          new fabric.Point(center.left, center.top),
          zoomRatio
        );
        return;
      case "zoomOut":
        const zoomRatioOut = this.canvas.getZoom() - 0.05;
        const centerOut = this.canvas.getCenter();
        this.canvas.zoomToPoint(
          new fabric.Point(centerOut.left, centerOut.top),
          zoomRatioOut
        );
        return;
      case "reset":
      case "fit":
      default:
        if (!this.wrapperElement) return;
        // Fit height image with height canvas
        this.canvas.setHeight(this.wrapperElement.clientHeight);

        if (width > height) {
          // Landscape
          this.canvas.setZoom(widthCanvas / width);
        } else {
          // Portrait
          this.canvas.setZoom(widthCanvas / width);
        }

        // Set center image
        this.canvas.absolutePan({
          y: (height / 2) * this.canvas.getZoom() - heightCanvas / 2,
          x: (width / 2) * this.canvas.getZoom() - widthCanvas / 2,
        });

        return;
    }
  }

  addImage = (url: string) => {
    fabric.Image.fromURL(url, (img) => {
      const fabricImage = new fabric.Image(img.getElement(), {
        selectable: false,
        evented: false,
        cacheKey: "image-overlay",
      });

      this.removeOldImage();
      if (!this.canvas) return;
      this.canvas.add(fabricImage);
      this.setAutoLayer();
    });
  }

  removeOldImage = () => {
    if (!this.canvas) return;
    Array.from(this.canvas.getObjects()).forEach((obj) => {
      if (obj.type === "image") {
        if (!this.canvas) return;
        this.canvas.remove(obj);
      }
    });
  }

  enableBrush = () => {
    const [brushSize, brushColor] = [Math.round(25 / 1.8), "rgba(0,0,0,.5)"];
    if (!this.canvas) return;
    this.canvas.isDrawingMode = true;
    this.canvas.freeDrawingBrush.color = brushColor;
    this.canvas.freeDrawingBrush.width = brushSize;

    // set cursor size
    this.canvas.freeDrawingCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${brushSize}' height='${brushSize}'><circle cx='${
      brushSize / 2
    }' cy='${brushSize / 2}' r='${
      brushSize / 2
    }' fill='${brushColor}' /></svg>") ${brushSize / 2} ${brushSize / 2}, auto`;
  }

  disableBrush = () => {
    if (!this.canvas) return;
    this.canvas.isDrawingMode = false;
  }

  setBrushSize = (size: number) => {
    if (!this.canvas) return;
    this.canvas.freeDrawingBrush.width = size;

    // set cursor size
    const cursorSize = Math.round(size / 1.8);
    this.canvas.freeDrawingCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${cursorSize}' height='${cursorSize}'><circle cx='${
      cursorSize / 2
    }' cy='${cursorSize / 2}' r='${
      cursorSize / 2
    }' fill='rgba(0, 0, 0, 0.5)' /></svg>") ${cursorSize / 2} ${
      cursorSize / 2
    }, auto`;
  }

  addText = () => {
    if (!this.canvas) return;
    const center = this.canvas.getCenter();
    
    const newText = new fabric.IText("Tap and Type", {
      left: center.left,
      top: center.top,
      fontFamily: "Helvetica",
      fill: "#000",
      fontSize: 40,
      textAlign: "center",
    });
    this.canvas.add(newText);
    return newText;
  }

  editText = (config: { fill?: string }) => {
    if (!this.canvas) return;
    const active = this.canvas.getActiveObject();
    if (active && active.type === "i-text") {
      active.set(config);
      this.canvas.renderAll();
    }
  }

  setState = (state: any) => {
    if (!this.canvas || !state) return;

    this.pauseSaving = true;
    this.canvas.loadFromJSON(state, () => {
      if (!this.canvas) return;
      this.canvas.renderAll();
      this.pauseSaving = false;
    });
  }

  getState = () => {
    if (!this.canvas) return;
    return this.canvas.toJSON();
  }

  // shortcut(e: KeyboardEvent) {
  //   const activeObj = this.canvas.getActiveObject();
  //   const notEditText = activeObj?.isEditing;

  //   if (e.key === "z" && e.ctrlKey) {
  //     this.undo();
  //   } else if (e.key === "y" && e.ctrlKey) {
  //     this.redo();
  //   } else if (e.key === "t" && e.ctrlKey) {
  //     this.addText();
  //   } else if (e.key === "Delete" && !notEditText) {
  //     this.canvas.remove(this.canvas.getActiveObject() as any);

  //     this.dispatch({
  //       type: "setExportImage",
  //       value: this.exportCanvasToImage(),
  //     });
  //   }
  // }

  mouseWheel = (e: WheelEvent) => {
    if (!this.canvas) return;
    // Get image object
    const imageLayer = this.canvas
      .getObjects()
      .find((obj) => obj.type === "image");

    if (imageLayer) {
      // Set image is active
      this.canvas.setActiveObject(imageLayer);
    }

    // const imageLayer = this.canvas.getActiveObject();
    if (imageLayer && imageLayer.type === "image") {
      const opacity = imageLayer.get("opacity") || 1;

      const opacityResult = opacity + e.deltaY / 2500;
      if (opacityResult < 0 || opacityResult > 1) return;

      imageLayer.set({ opacity: opacityResult });
      this.canvas.renderAll();
    }
  }

  exportJSON = () => {
    if (!this.canvas) return;
    return this.canvas.toJSON();
  }

  exportCanvasToImage = () => {
    // const transform = this.canvas.viewportTransform.slice(0);
    // this.canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    if (!this.canvas) return;
    const data = this.canvas.toDataURL({
      format: "jpeg",
      multiplier: 2,
      quality: 0.8,
    });

    // this.canvas.viewportTransform = transform;
    this.canvas.renderAll();

    return data;
  }

  rerender = () => {
    if (!this.canvas) return;
    this.canvas.renderAll();
  }

  importJSON = (json: string) => {
    if (!this.canvas) return;
    this.isRestore = true;
    this.canvas.loadFromJSON(json, () => {
      if (!this.canvas) return;
      this.canvas.renderAll();
      this.zoom("fit");
      this.setAutoLayer();
      this.isRestore = false;
    });
  }

  setAutoLayer = () => {
    if (!this.canvas) return;
    this.canvas.getObjects().forEach((obj) => {
      if (obj.type === "i-text") {
        if (!this.canvas) return;
        this.canvas.bringToFront(obj);
      }

      if (obj.type === "image") {
        obj.set({
          selectable: false,
          evented: false,
        });
        if (!this.canvas) return;
        this.canvas.sendToBack(obj);
      }
    });
  }

  clear = () => {
    if (!this.canvas) return;
    this.canvas.clear();
  }
}

export default CanvasControl;

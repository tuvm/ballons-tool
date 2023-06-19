export class UndoRedo<T> {
  private _undoStack: any[];
  private _redoStack: any[];
  private _maxState: number;

  constructor(currentstate: T, maxState: number) {
    this._undoStack = [];
    this._redoStack = [];
    this._maxState = maxState;
    this._redoStack.push(currentstate);
  }

  insert(state: T) {
    if (this._undoStack.length === this._maxState) {
      this._undoStack.unshift();
    }
    this._undoStack.push(this._redoStack.pop());
    this._redoStack.length = 0;
    this._redoStack.push(state);
  }

  undo(): T {
    if (this._undoStack.length >= 1) {
      let state = this._undoStack.pop();
      this._redoStack.push(state);
      return state;
    } else {
      return null as T;
    }
  }

  redo() {
    if (this._redoStack.length >= 2) {
      let state = this._redoStack.pop();
      this._undoStack.push(state);
      return this._redoStack[this._redoStack.length - 1];
    } else {
      return null as T;
    }
  }

  clear() {
    if (this._redoStack.length >= 1) {
      let state = this._redoStack.pop();
      this._undoStack.length = 0;
      this._redoStack.length = 0;
      this._redoStack.push(state);
    }
  }
}

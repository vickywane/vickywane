import React from "react";

interface IKeyboard {
  key: string;
  keyName: string;
  keyCode: number;
}

interface useKeyboardKeyProps {
  keyMatch: IKeyboard;
  callback: () => void;
}

const useKeyboardKey = ({ callback, keyMatch }: useKeyboardKeyProps) => {
  React.useEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      let isRecognizedKey = false;
      if ("key" in event) {
        isRecognizedKey =
          event.key === keyMatch.key || event.key === keyMatch.keyName;
      } else {
        isRecognizedKey = event.keyCode === keyMatch.keyCode;
      }

      if (isRecognizedKey) {
        callback();
      }
    };

    document.addEventListener("keydown", eventListener);
    return () => {
      document.removeEventListener("keydown", eventListener);
    };
  });
};

export default useKeyboardKey;

export const ESCAPE_KEY: IKeyboard = {
  key: "Escape",
  keyName: "Esc",
  keyCode: 27,
};

export const ENTER_KEY: IKeyboard = {
  key: "Enter",
  keyName: "Enter",
  keyCode: 13,
};

export const BACKSPACE_KEY: IKeyboard = {
  key: "Backspace",
  keyName: "Backspace",
  keyCode: 8,
};

export const ARROW_KEY_DOWN: IKeyboard = {
  key: "ArrowDown",
  keyName: "ArrowDown",
  keyCode: 40,
};

export const ARROW_KEY_UP: IKeyboard = {
  key: "ArrowUp",
  keyName: "ArrowUp",
  keyCode: 38,
};

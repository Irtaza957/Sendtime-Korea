import React from 'react';
import { HexColorPicker } from 'react-colorful';

import { CustomInputWrapper, PickerWrapper } from './index.styles';

interface IColorPicker {
  color: string;
  setColor: (newColor: string) => void;
}

const ColorPicker = ({ color, setColor }: IColorPicker) => {
  const changeHexValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };

  return (
    <PickerWrapper>
      <HexColorPicker color={color} onChange={setColor} />
      <CustomInputWrapper>
        <input
          type="text"
          value={color}
          onChange={changeHexValue}
          placeholder="hex 컬러를 입력하세요."
        />
      </CustomInputWrapper>
    </PickerWrapper>
  );
};

export default ColorPicker;

import React from 'react';

import { SelectedValuesType } from '@components/SelectBox';

import Line from '../Line';
import SelectTextInput from '../SelectTextInput';

import { Wrapper } from './index.styles';

interface RangeSelectProps {
  startValue: string;
  selectStartValues: SelectedValuesType;
  onClickStartSelectBox: (event: React.MouseEvent<HTMLButtonElement>) => void;

  endValue: string;
  selectEndValues: SelectedValuesType;
  onClickEndSelectBox: (event: React.MouseEvent<HTMLButtonElement>) => void;

  isStartDisabled?: boolean;
  isEndDisabled?: boolean;
}

const RangeSelect = ({
  startValue,
  selectStartValues,
  onClickStartSelectBox,
  endValue,
  selectEndValues,
  onClickEndSelectBox,
  isStartDisabled,
  isEndDisabled,
}: RangeSelectProps) => {
  return (
    <Wrapper>
      <SelectTextInput
        value={startValue}
        selectValues={selectStartValues}
        onClickSelectBox={onClickStartSelectBox}
        disabled={isStartDisabled}
      />

      <Line margin="0 10px" />

      <SelectTextInput
        value={endValue}
        selectValues={selectEndValues}
        onClickSelectBox={onClickEndSelectBox}
        disabled={isEndDisabled}
      />
    </Wrapper>
  );
};

export default RangeSelect;

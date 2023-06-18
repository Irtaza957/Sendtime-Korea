import React from 'react';

import RadioButton from '@components/RadioButton';

import { BlockBox } from '../../../../styles/container/index.styles';

import { OneChoiceContainer } from './index.styles';

interface OneChoiceProps {
  choices: string[];
  handleClick: (id: number, text: string) => void;
  checked: string;
}
const OneChoice = ({ choices, handleClick, checked }: OneChoiceProps) => {
  return (
    <OneChoiceContainer>
      {choices.map((c, idx) => (
        <BlockBox key={idx} padding="8px">
          <RadioButton
            checked={checked === c}
            onClick={() => handleClick(idx, c)}
          >
            {c}
          </RadioButton>
        </BlockBox>
      ))}
    </OneChoiceContainer>
  );
};

export default OneChoice;

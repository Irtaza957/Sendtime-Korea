import React from 'react';

import TextInput from '@components/TextInput';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@iconify/react';

import * as Styled from './index.styles';
interface Options {
  option: Option;
  index: number;
  isLastInput: boolean;
  changeOptionHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  deleteOptionHandler: () => void;
}
interface Option {
  text: string;
}
const Options = ({
  option,
  index,
  isLastInput,
  deleteOptionHandler,
  changeOptionHandler,
}: Options) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: option as unknown as UniqueIdentifier,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div>
      <Styled.OptionsWrapper ref={setNodeRef} style={style}>
        <Styled.DragHandleContainer {...attributes} {...listeners}>
          <Icon icon="ic:baseline-drag-indicator" width={'100%'} />
        </Styled.DragHandleContainer>

        <Styled.InputWrapper>
          <TextInput
            value={option.text}
            inputPadding={5}
            onChange={(e) => changeOptionHandler(e, index)}
          />
        </Styled.InputWrapper>
        {isLastInput && (
          <Icon
            onClick={deleteOptionHandler}
            cursor="pointer"
            icon="ic:baseline-delete-outline"
            color="#60666D"
            width={20}
            height={20}
          />
        )}
      </Styled.OptionsWrapper>
    </div>
  );
};

export default Options;

import React, { ChangeEvent, useState } from 'react';

import TextInput from '@components/TextInput';
import styled from '@emotion/styled';
import { TrashBin } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { makePhoneNumberWithHyphen } from '@utils/phoneNumber';

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  &:not(:first-of-type) {
    margin-top: 15px;
  }

  > div:nth-of-type(1) {
    flex-basis: 24%;
  }
  > div:nth-of-type(2) {
    flex-basis: 38%;
  }
  > div:nth-of-type(3) {
    flex-basis: 38%;
  }

  input::placeholder {
    color: var(--gray-800-30);
  }
`;

export const InputSideButton = styled.button<{ rowId?: number }>`
  margin-top: ${({ rowId }) => (rowId === 0 ? '20px' : 0)};
  text-align: center;
  min-height: 40px;
  min-width: 40px;
  height: 40px;
  width: 40px;
  border-radius: 50%;

  &:hover {
    background: var(--purple-50);

    path {
      fill: var(--purple-500) !important;
    }
  }
  &:active {
    background: var(--purple-100);
  }
`;

/* { value: '이름', required: true }[] */
type PlusInputColumnType = {
  value: string;
  placeholder: string;
  required: boolean;
};
type InputListType = {
  name: string;
  placeholder: string;
  required: boolean;
  value: string;
  validated: boolean;
}[][];

const usePlusInput = (fields: PlusInputColumnType[]) => {
  const requiredOptionCount = fields.filter(({ required }) => required).length;
  const defaultInputList = fields.map(({ value, placeholder, required }) => {
    const data = {
      name: value,
      placeholder,
      required,
      value: '',
      validated: true,
    };
    return data;
  });

  const [inputList, setInputList] = useState<InputListType>([defaultInputList]);

  const handleClickPlus = () => {
    setInputList((prev) => [...prev, defaultInputList]);
  };

  const handleClickDelete = (idx: number) => {
    setInputList((prev) => {
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
  };

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement>,
    name: string,
    rowId: number
  ) => {
    setInputList((prev) => {
      const copy = [...prev];
      const targetList = copy[rowId];
      const copyTargetList = [...targetList];

      const target = targetList.filter((t) => t.name === name);
      const targetId = targetList.findIndex((t) => t.name === name);

      const newValue = e.target.value;
      const newPhoneValue = newValue.slice(0, 13);

      copyTargetList.splice(targetId, 1, {
        ...target[0],
        value:
          name !== '전화번호'
            ? newValue
            : makePhoneNumberWithHyphen(newPhoneValue),
        validated: !!newValue,
      });

      copy.splice(rowId, 1, copyTargetList);

      return [...copy];
    });
  };

  const handleValidation = () => {
    const validationList = inputList.map((list) =>
      list.filter(({ required, value }) => required && !!value)
    );

    return validationList.every((list) => list.length === requiredOptionCount);
  };

  const PlusInput = () => {
    return (
      <>
        {inputList.map((list, rowId) => {
          return (
            <Box key={rowId}>
              {list.map(
                ({ name, value, placeholder, required, validated }, colId) => (
                  <TextInput
                    key={colId}
                    label={rowId === 0 ? name : ''}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    validated={required ? validated : true}
                    onChange={(e) => handleChangeInput(e, name, rowId)}
                    inputPadding={5}
                  />
                )
              )}

              <div>
                {inputList.length !== 1 && (
                  <InputSideButton
                    onClick={() => handleClickDelete(rowId)}
                    rowId={rowId}
                  >
                    <CustomIcon
                      size={14}
                      height={10}
                      viewBox="0 0 14 16"
                      scale={1.35}
                      fill="gray-600"
                      stroke="none"
                    >
                      <TrashBin />
                    </CustomIcon>
                  </InputSideButton>
                )}
              </div>
            </Box>
          );
        })}
      </>
    );
  };

  return {
    PlusInput,
    inputList,
    isValid: handleValidation(),
    makeInput: handleClickPlus,
  };
};

export default usePlusInput;

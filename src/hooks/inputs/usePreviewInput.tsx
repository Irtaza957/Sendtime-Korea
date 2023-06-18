import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { MouseEvent } from 'react';
import i18next from 'i18next';
import { nanoid } from 'nanoid';

import StyledButton from '@components/Button';
import { TextContent } from '@components/DailyTimeSelect/index.styles';
import { SubSection } from '@components/Reservation/Common';
import { CustomCheckbox } from '@components/Reservation/index.styles';
import TextCheckbox from '@components/TextCheckbox';
import TextInput from '@components/TextInput';
import { useNestedModal } from '@contexts/NestedModalProvider';
import { InputSideButton } from '@hooks/inputs/usePlusInput';
import { TrashBin } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import {
  CustomInputContainer,
  InputContainer,
  PreviewContainer,
  PreviewTitle,
  RequiredContainer,
} from '@pages/Group/New/index.styles';
import { GridBox } from '@pages/GuestReservation/common.styles';

type CustomInputType = {
  id: string;
  value: string;
  required: boolean;
};

const usePreviewInput = (defaultInput?: CustomInputType[]) => {
  const [customValue, setCustomValue] = useState('');
  const [customValueRequired, setCustomValueRequired] = useState(false);
  const [customInputs, setCustomInputs] = useState<CustomInputType[]>(
    defaultInput ?? []
  );
  const { showModal, hideModal } = useNestedModal({
    type: 'delete',
    title: i18next.t('groupSettingPage:deleteMessage.title'),
    description: i18next.t('groupSettingPage:deleteMessage.subtitle'),
  });

  useEffect(() => {
    if (defaultInput) {
      setCustomInputs(defaultInput);
    }
  }, []);

  const handleCustomValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomValue(e.target.value);
  };

  const handleRequired = () => {
    setCustomValueRequired((prev) => !prev);
  };

  const resetValues = () => {
    setCustomValue('');
    setCustomValueRequired(false);
  };

  const makeCustomInput = () => {
    setCustomInputs((prev) => [
      ...prev,
      { id: nanoid(), value: customValue, required: customValueRequired },
    ]);
    resetValues();
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !!customValue) {
      makeCustomInput();
    }
  };

  const deleteCustomInput = (inputId: string) => {
    setCustomInputs((prev) => {
      const newInput = prev.filter(({ id }) => id !== inputId);

      return newInput;
    });
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const isValidated = await showModal();

    if (isValidated) {
      deleteCustomInput(id);
    }

    hideModal();
  };

  const CustomPreviewView = () => {
    return (
      <SubSection
        subTitle={i18next.t('groupSettingPage:customField.title')}
        description={i18next.t('groupSettingPage:customField.subtitle')}
        gap={5}
      >
        <InputContainer>
          <TextInput
            value={customValue}
            onChange={handleCustomValue}
            placeholder={i18next.t(
              'groupSettingPage:customField.add.placeholder'
            )}
            inputPadding={3}
            onKeyPress={handleEnter}
          />
          <StyledButton
            onClickButton={makeCustomInput}
            bgColor="white"
            color="purple-500"
            borderColor="purple-500"
            borderRadius={50}
            withBorder
            disabled={!customValue}
          >
            {i18next.t('groupSettingPage:customField.add.btn')}
          </StyledButton>
        </InputContainer>

        <RequiredContainer>
          <CustomCheckbox>
            <TextCheckbox
              onClick={handleRequired}
              checked={customValueRequired}
            >
              <TextContent>
                {i18next.t('groupSettingPage:customField.required.title')}
              </TextContent>
            </TextCheckbox>
          </CustomCheckbox>
        </RequiredContainer>

        <PreviewContainer>
          <PreviewTitle>
            {i18next.t('groupSettingPage:customField.required.previewTitle')}
          </PreviewTitle>
          <GridBox>
            <TextInput
              label={i18next.t(
                'groupSettingPage:customField.required.name.title'
              )}
              value={i18next.t(
                'groupSettingPage:customField.required.name.placeholder'
              )}
              onChange={() => {}}
              inputPadding={5}
              disabled
              required
            />
            <TextInput
              label={i18next.t(
                'groupSettingPage:customField.required.email.title'
              )}
              value={i18next.t(
                'groupSettingPage:customField.required.email.placeholder'
              )}
              onChange={() => {}}
              inputPadding={5}
              disabled
              required
            />
            {customInputs.map(({ id, value, required }) => (
              <CustomInputContainer key={id}>
                <TextInput
                  label={value}
                  required={required}
                  value=""
                  onChange={() => {}}
                  inputPadding={5}
                  disabled
                />
                <InputSideButton onClick={(e) => handleDelete(e, id)} rowId={0}>
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
              </CustomInputContainer>
            ))}
          </GridBox>
        </PreviewContainer>
      </SubSection>
    );
  };

  return { CustomPreviewView, customInputs };
};

export default usePreviewInput;

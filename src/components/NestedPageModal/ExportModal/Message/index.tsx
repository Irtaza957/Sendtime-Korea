import React, { ChangeEvent, useState } from 'react';

import StyledButton from '@components/Button';
import { PreviewDescription } from '@components/NestedPageModal/ThreePartyModal/index.styles';
import TextArea from '@components/TextArea';
import useCopy from '@hooks/useCopy';
import { Copy } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { ButtonText } from '@pages/ReservationCompleted/index.styles';

import { BlockBox } from '../../../../../styles/container/index.styles';

interface MessageProps {
  pageUrl: string;
  description?: string;
}

const Message = ({ pageUrl, description }: MessageProps) => {
  const { copyText } = useCopy();
  const textboxDescription = `${description ? description : ''}

아래 센드타임 링크에서 예약해주세요:
${pageUrl}`;

  const [value, setValue] = useState({
    description: textboxDescription,
    pageUrl,
  });

  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue((prevValue) => ({
      ...prevValue,
      description: event.target.value,
    }));
  };

  return (
    <BlockBox alignItems="center" gap={23.99}>
      <PreviewDescription margin="40px 0 10px 0" textAlign="center">
        예약페이지 설명을 자유롭게 수정하여 <br />
        텍스트와 함께 예약페이지 URL을 복사하세요.
      </PreviewDescription>

      <TextArea
        value={value.description}
        onChange={onChangeTextArea}
        rows={8}
      />

      <StyledButton onClickButton={() => copyText(value.description)}>
        <CustomIcon size={18} stroke="none" fill="white">
          <Copy />
        </CustomIcon>
        <ButtonText>복사하기</ButtonText>
      </StyledButton>
    </BlockBox>
  );
};

export default Message;

import React from 'react';
import { useTranslation } from 'react-i18next';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { PreviewDescription } from '@components/NestedPageModal/ThreePartyModal/index.styles';
import { BASE_URL } from '@constants/baseUrl';
import useCopy from '@hooks/useCopy';

import { BlockBox } from '../../../../../styles/container/index.styles';
import { CodeBlock, PreviewBlock } from '../index.styles';

interface ButtonCodeProps {
  pageUrl: string;
}

const ButtonCode = ({ pageUrl }: ButtonCodeProps) => {
  const { t } = useTranslation('eventHistoryPage');
  const { copyText } = useCopy(t('confirmModal.Btndescription'));

  const code = `
<a href="${pageUrl}">
  <img src="https://storage.sendtime.app/buttons/reservation_export.png" alt="${t(
    'exportModal.imageAltText'
  )}" style="width: 200px;"/>
</a>
  
`;

  return (
    <BlockBox alignItems="center" gap={15}>
      <PreviewDescription margin="32px 0 15px 0">
        {t('exportModal.withButtonDescription')}
      </PreviewDescription>
      <CodeBlock>{code}</CodeBlock>
      <PreviewBlock>
        <ImageContainer width={250}>
          <AutoHeightImage
            src={`${BASE_URL.image}/buttons/reservation_export.png`}
          />
        </ImageContainer>
        {t('exportModal.preview')}
      </PreviewBlock>
      <StyledButton
        onClickButton={() => copyText(code)}
        padding="15px 35px"
        size="big"
      >
        {t('exportModal.copyBtn')}
      </StyledButton>
    </BlockBox>
  );
};

export default ButtonCode;

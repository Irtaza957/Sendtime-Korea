import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { PreviewDescription } from '@components/NestedPageModal/ThreePartyModal/index.styles';
import { BASE_URL } from '@constants/baseUrl';
import useCopy from '@hooks/useCopy';
import useSaveImage from '@hooks/useSaveImage';
import { QrArea } from '@pages/QrList/QrPrintPage/index.styles';

import { BlockBox } from '../../../../../styles/container/index.styles';

interface QrCodeProps {
  pageUrl?: string;
}

const QrCode = ({ pageUrl }: QrCodeProps) => {
  const { t } = useTranslation('eventHistoryPage');
  const [imageUrl, setImageUrl] = useState(
    `${BASE_URL.image}/loading/loading_dots.gif`
  );

  const { convertImage } = useSaveImage();

  const { copyImage } = useCopy(t('confirmModal.QRDescription'));

  useEffect(() => {
    const copy = async () => {
      const url = await convertImage();

      if (!url) return;

      setImageUrl(url);
    };

    copy();
  }, []);

  return (
    <BlockBox alignItems="center" gap={23.99}>
      <PreviewDescription margin="40px 0 0 0">
        {t('exportModal.withQRDescription')}
      </PreviewDescription>
      <QrArea id="capture">
        {imageUrl ? (
          <QRCode value={pageUrl} size={200} />
        ) : (
          <ImageContainer width={200}>
            <AutoHeightImage src={imageUrl} alt="qr-image" />
          </ImageContainer>
        )}
      </QrArea>

      <StyledButton
        onClickButton={() => copyImage({ imgSrc: imageUrl })}
        padding="15px 35px"
        size="big"
      >
        {t('exportModal.copyBtn')}
      </StyledButton>
    </BlockBox>
  );
};

export default QrCode;

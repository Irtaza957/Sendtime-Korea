import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { QRCode } from 'react-qrcode-logo';

import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import useSaveImage from '@hooks/useSaveImage';
import useTimeout from '@hooks/useTimeout';

import poweredBy from '../../../assets/images/qr/powered_by_no_bg.png';
import qrContainer from '../../../assets/images/qr/qr-container.png';

import {
  ButtonArea,
  CustomImage,
  PrintArea,
  QrAbsolute,
  QrArea,
  QrHostName,
  QrPrintContainer,
  QrSendTime,
  QrSideArea,
} from './index.styles';

const QrPrintPage = () => {
  const router = useRouter();

  const { saveToImage, convertImage } = useSaveImage();

  const { query } = router;
  const { hostName, url } = query;
  const u = typeof url === 'string' ? url : '';

  const [imageUrl, setImageUrl] = useState('');
  const [firstRender, setFirstRender] = useState(true);

  useTimeout(async () => {
    if (!firstRender) return;
    const url = await convertImage();

    if (!url) {
      alert('이미지 저장에 실패했습니다.');
      return;
    }

    setFirstRender(false);
    setImageUrl(url);
  }, 500);

  return (
    <>
      {imageUrl ? (
        <PrintArea>
          <ImageContainer>
            <AutoHeightImage src={imageUrl} alt="qr" />
          </ImageContainer>
        </PrintArea>
      ) : (
        <PrintArea id="capture">
          <QrPrintContainer>
            <QrHostName>{hostName} </QrHostName>
            <QrSendTime>님의 센드타임</QrSendTime>
          </QrPrintContainer>
          <QrArea>
            <QrSideArea>
              <CustomImage>
                <img src={qrContainer} alt="qr-container" />
              </CustomImage>
            </QrSideArea>
            <QrAbsolute>
              <QRCode value={u} size={200} />
            </QrAbsolute>
          </QrArea>
          <ImageContainer width={300}>
            <CustomImage>
              <img src={poweredBy} alt="powered_by_sendtime" />
            </CustomImage>
            {/* <Image
            src={poweredBy}
            alt="powered_by_sendtime"
            width={240}
            height={240}
          /> */}
            {/* <AutoHeightImage src={poweredBy} alt="powered_by_sendtime" /> */}
          </ImageContainer>
        </PrintArea>
      )}

      <ButtonArea>
        <StyledButton onClickButton={saveToImage}>
          이미지로 저장하기
        </StyledButton>
      </ButtonArea>
    </>
  );
};

export default QrPrintPage;

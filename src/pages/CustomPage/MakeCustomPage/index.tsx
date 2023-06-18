import React, { ChangeEvent, useState } from 'react';
import { useS3Upload } from 'next-s3-upload';
import { useMutation } from 'react-query';

import {
  CreateCustomPageRequest,
  CustomPageAPI,
} from '@api/customPage/CustomPage';
import WithAuth from '@components/AuthRedirect';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import ColorPicker from '@components/ColorPicker';
import { CardTags, TagsContainer } from '@components/CustomCard/index.styles';
import MiniConfirmModal from '@components/Modal/MiniConfirmModal';
import TextArea from '@components/TextArea';
import TextInputWithLabel from '@components/TextInputWithLabel';
import { useModal } from '@contexts/ModalProvider';
import useDebounce from '@hooks/useDebounce';
import useLoading from '@hooks/useLoading';
import * as Sentry from '@sentry/browser';

import { Flex, InputContainer, MakeCustomPageContainer } from './index.styles';

type CustomCardInfoType = {
  title: string;
  description: string;
  buttonLink: string;
  tags: string[];
  buttonText: string;
  color: string;
  imageUrl?: string;
};

const defaultCustomPageInfo: CreateCustomPageRequest = {
  companyName: '',
  description: '',
  logoUrl: '',
  phone: '',
  email: '',
  website: '',
};

const defaultCustomCardInfo: CustomCardInfoType = {
  title: '',
  description: '',
  buttonLink: '',
  tags: [],
  buttonText: '',
  color: '#383CC1',
  imageUrl: '',
};

const MakeCustomPage = () => {
  const { openModal, closeModal } = useModal();
  const { loadingView } = useLoading();
  const { debounce } = useDebounce();
  const [customUrl, setCustomUrl] = useState('');
  const [customPage, setCustomPage] = useState<CreateCustomPageRequest>(
    defaultCustomPageInfo
  );
  const [customCard, setCustomCard] = useState<CustomCardInfoType>(
    defaultCustomCardInfo
  );
  const [tags, setTags] = useState('');

  const { mutate: createCustomPage, isLoading: isCustomPageLoading } =
    useMutation(
      (customUrl: string) =>
        CustomPageAPI.createCustomPage(customUrl, customPage),
      {
        onSuccess: () => {
          setCustomPage(defaultCustomPageInfo);
          openModal(
            <MiniConfirmModal
              content="저장되었습니다."
              onConfirmClick={closeModal}
              buttonText="확인"
            />
          );
        },
        onError: (error) => {
          Sentry.captureException(error);
          alert(error);
        },
      }
    );

  const params = {
    title: customCard.title,
    description: customCard.description,
    tags: customCard.tags,
    buttonText: customCard.buttonText,
    color: customCard.color,
    reservationPageUuid: customCard.buttonLink.split('i=')[1],
    imageUrl: customCard.imageUrl,
  };

  const { mutate: createCustomCard, isLoading: isCustomCardLoading } =
    useMutation(
      (customUrl: string) => {
        return CustomPageAPI.createCustomCard(customUrl, [params]);
      },
      {
        onSuccess: () => {
          setCustomCard(defaultCustomCardInfo);
          setTags('');
          openModal(
            <MiniConfirmModal
              content="저장되었습니다."
              onConfirmClick={closeModal}
              buttonText="확인"
            />
          );
        },
        onError: (error) => {
          Sentry.captureException(error);
          alert(error);
        },
      }
    );

  const onChangeCustomUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomUrl(e.target.value);
  };

  const onChangeCompany = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setCustomPage((prevValue) => ({
      ...prevValue,
      [type]: e.target.value.trim(),
    }));
  };

  const onChangeCard = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setCustomCard((prevValue) => ({
      ...prevValue,
      [type]: e.target.value,
    }));
  };

  const onChangeTags = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
    setCustomCard((prevValue) => ({
      ...prevValue,
      tags: e.target.value.split(',') || [],
    }));
  };

  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPage((prevValue) => ({
      ...prevValue,
      description: e.target.value,
    }));
  };

  const onChangeCardDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCustomCard((prevValue) => ({
      ...prevValue,
      description: e.target.value,
    }));
  };

  const onSaveProfilePage = () => {
    debounce(() => createCustomPage(customUrl), 500);
  };

  const onChangeCardColor = (newColor: string) => {
    setCustomCard((prevValue) => ({
      ...prevValue,
      color: newColor,
    }));
  };

  const onSaveProfileCard = () => {
    debounce(() => createCustomCard(customUrl), 500);
  };

  const [imageUrl, setImageUrl] = useState('');
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const handleFileChange = async (file: File) => {
    const { url } = await uploadToS3(file);
    const imageUrl = url.replace(
      'https://storage.sendtime.app.s3.ap-northeast-2.amazonaws.com/',
      'https://storage.sendtime.app/'
    );
    setCustomCard((prev) => ({ ...prev, imageUrl }));

    setImageUrl(url);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100%',
      }}
    >
      <MakeCustomPageContainer>
        {(isCustomPageLoading || isCustomCardLoading) && loadingView()}
        <InputContainer>
          <h1 style={{ fontWeight: 'bold' }}>프로필 커스텀 Url 입력</h1>
          <TextInputWithLabel
            title="프로필 Url"
            placeholder="만들 사람의 커스텀 Url ex) splab"
            required
            value={customUrl}
            onChange={onChangeCustomUrl}
          />
          {customUrl && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              아래부터는
              <span
                style={{
                  fontWeight: 'var(--semi-bold)',
                  margin: '0 15px',
                  color: 'var(--purple-600)',
                }}
              >
                https://sendtime.app/@{customUrl}
              </span>
              에 들어갈 내용입니다.
            </div>
          )}
        </InputContainer>

        <InputContainer>
          <h1 style={{ fontWeight: 'bold' }}>페이지 만들기</h1>
          <TextInputWithLabel
            title="ㅤ회사이름"
            placeholder="ex) 스플랩 팀"
            required
            value={customPage.companyName}
            onChange={(event) => onChangeCompany(event, 'companyName')}
          />
          <Flex>
            <label style={{ display: 'flex', marginTop: '8px' }}>
              설명 <span style={{ color: 'var(--alert)' }}>*</span>
            </label>
            <TextArea
              value={customPage.description}
              onChange={onChangeDescription}
              placeholder="엔터를 치려면 \n 을 넣어주세요."
            />
          </Flex>
          <TextInputWithLabel
            title="ㅤ로고링크"
            placeholder="ex) https://사진링크"
            required
            value={customPage.logoUrl}
            onChange={(event) => onChangeCompany(event, 'logoUrl')}
          />
          <TextInputWithLabel
            title="ㅤ전화번호"
            placeholder="ex) 010-0000-0000"
            value={customPage.phone}
            onChange={(event) => onChangeCompany(event, 'phone')}
          />
          <TextInputWithLabel
            title="ㅤㅤ이메일"
            placeholder="ex) sendtime@splab.io"
            value={customPage.email}
            onChange={(event) => onChangeCompany(event, 'email')}
          />
          <TextInputWithLabel
            title="ㅤ웹사이트"
            placeholder="ex) https://sendtime.app"
            value={customPage.website}
            onChange={(event) => onChangeCompany(event, 'website')}
          />

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <StyledButton onClickButton={onSaveProfilePage}>
              프로필 페이지 저장하기
            </StyledButton>
          </div>
        </InputContainer>

        <InputContainer>
          <h1 style={{ fontWeight: 'bold' }}>카드 만들기</h1>
          <TextInputWithLabel
            title="ㅤㅤㅤ제목"
            placeholder="ex) 편한 만남 신청 😎"
            required
            value={customCard.title}
            onChange={(event) => onChangeCard(event, 'title')}
          />
          <Flex>
            <label style={{ display: 'flex', marginTop: '8px' }}>
              설명 <span style={{ color: 'var(--alert)' }}>*</span>
            </label>
            <TextArea
              value={customCard.description}
              onChange={onChangeCardDescription}
              placeholder="엔터를 치려면 \n 을 넣어주세요."
            />
          </Flex>
          <TextInputWithLabel
            title="ㅤㅤ태그들"
            placeholder="쉼표로 구분해주세요. ex) quick하게, 용건만 간단히 ✅"
            required
            value={tags}
            onChange={onChangeTags}
          />
          <div style={{ marginLeft: '80px' }}>
            <TagsContainer>
              {customCard.tags.map((tag, id) => (
                <CardTags key={id}>#{tag}</CardTags>
              ))}
            </TagsContainer>
          </div>
          <div style={{ marginLeft: '80px' }}>
            <FileInput onChange={handleFileChange} />
            <StyledButton onClickButton={openFileDialog}>
              파일 업로드
            </StyledButton>
            {imageUrl && (
              <ImageContainer width={200}>
                <AutoHeightImage src={imageUrl} />
              </ImageContainer>
            )}
          </div>
          <TextInputWithLabel
            title="ㅤ버튼링크"
            placeholder="버튼을 누르면 이동할 센드타임 예약 링크 ex) https://sendtime.app/reservation?u=teampangapp?&i=8F4E0m"
            required
            value={customCard.buttonLink}
            onChange={(event) => onChangeCard(event, 'buttonLink')}
          />
          <TextInputWithLabel
            title="ㅤ버튼내용"
            placeholder="ex) 문의하기"
            required
            value={customCard.buttonText}
            onChange={(event) => onChangeCard(event, 'buttonText')}
          />
          <div style={{ maxWidth: 'fit-content' }}>
            <Flex marginLeft={10}>
              <label style={{ display: 'flex', marginTop: '28px' }}>
                카드 버튼 및 상단 색깔{' '}
                <span style={{ color: 'var(--alert)' }}>*</span>
              </label>
              <ColorPicker
                color={customCard.color}
                setColor={onChangeCardColor}
              />
            </Flex>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <StyledButton onClickButton={onSaveProfileCard}>
              프로필 카드 저장하기
            </StyledButton>
          </div>
        </InputContainer>
      </MakeCustomPageContainer>
    </div>
  );
};

export default WithAuth(MakeCustomPage);

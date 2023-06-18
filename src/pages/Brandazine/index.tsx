import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import MediaQuery from 'react-responsive';

import { BrandazinePageAPI, BrandazinePageKeys } from '@api/etc/Brandazine';
import AutoHeightImage, { ImageContainer } from '@components/AutoHeightImage';
import StyledButton from '@components/Button';
import { SubSection } from '@components/Reservation/Common';
import SelectTextInput from '@components/SelectTextInput';
import TextInput from '@components/TextInput';
import { ACCOUNT_MESSAGE } from '@constants/accountMessage';
import { BASE_URL } from '@constants/baseUrl';
import { REGEX } from '@constants/regex';
import useLoading from '@hooks/useLoading';
import { RightArrow } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { Main } from '@pages/MyPage/index.styles';
import * as Sentry from '@sentry/browser';
import { makePhoneNumberWithHyphen } from '@utils/phoneNumber';
import { validate } from '@utils/validation';

import { Alert } from '../../styles/common.styles';

import {
  BrandazineContainer,
  BrandazineSection,
  ButtonContent,
  CategoryInputContainer,
  InputSection,
  SendtimeLogoContainer,
  SubmitButtonContainer,
  SubTitle,
  Title,
  TitleSection,
} from './index.styles';

type CategoryContent = {
  key: string;
  value: string;
  validated: 'initial' | 'validated' | 'error';
};

type PersonalContent = {
  value: string;
  alertMessage: JSX.Element;
  validated: 'initial' | 'validated' | 'error';
};

type PersonalFormInput = Record<string, PersonalContent>;
type CategorizedFormInput = Record<string, CategoryContent>;

const Brandazine = () => {
  const { t } = useTranslation('accountMessage');
  const [personalFormInputs, setPersonalFormInputs] =
    useState<PersonalFormInput>({
      name: { value: '', alertMessage: <></>, validated: 'initial' },
      email: { value: '', alertMessage: <></>, validated: 'initial' },
      brandName: { value: '', alertMessage: <></>, validated: 'initial' },
      role: { value: '', alertMessage: <></>, validated: 'initial' },
      phoneNumber: { value: '', alertMessage: <></>, validated: 'initial' },
    });
  const [categorizedFormInputs, setCategorizedFormInputs] =
    useState<CategorizedFormInput>({
      category1: {
        key: '카테고리 분류',
        value: '카테고리 선택',
        validated: 'initial',
      },
    });

  const { data: brandazineFormData, isLoading: isBrandazineFormDataLoading } =
    useQuery(BrandazinePageKeys.get(), BrandazinePageAPI.get, {
      onSuccess: ({ results }) => {},
      onError: (error) => console.error(error),
      refetchOnWindowFocus: false,
    });

  const { loadingView } = useLoading();
  const router = useRouter();

  const { mutate: submitBrandazineFormData, isLoading: isSubmittingFormData } =
    useMutation(
      (params: SubmitBrandazineFormDataRequestParams) =>
        BrandazinePageAPI.submitFormData(params),
      {
        onSuccess: ({ data: { results } }) => {
          const [{ mappingResultType, mappingResultBody }] = results;
          if (mappingResultType === 'REDIRECT_URL') {
            router.push(`https://${mappingResultBody}`);
          }

          if (mappingResultType === 'TEXT') {
            router.push(`/Brandazine/Completed`);
          }
        },
        onError: (error) => {
          Sentry.captureException(error);
          console.error(error);
        },
      }
    );

  if (!brandazineFormData) return loadingView();
  const [formData] = brandazineFormData.results;

  const setName = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!validate.name.korEng(target.value)) {
      setPersonalFormInputs((prevValue) => ({
        ...prevValue,
        name: {
          value: target.value,
          alertMessage: <Alert>{t('name.inputError')}</Alert>,
          validated: 'error',
        },
      }));

      return;
    }

    setPersonalFormInputs((prevValue) => ({
      ...prevValue,
      name: {
        value: target.value,
        alertMessage: <></>,
        validated: 'validated',
      },
    }));

    if (validate.phone.empty(target.value)) {
      setPersonalFormInputs((prevValue) => ({
        ...prevValue,
        name: {
          ...prevValue.name,
          validated: 'error',
          alertMessage: <></>,
        },
      }));
    }
  };

  const setEmail = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const withoutSpace = target.value;
    if (!withoutSpace.match(REGEX.EMAIL)) {
      setPersonalFormInputs((prevValue) => ({
        ...prevValue,
        email: {
          value: withoutSpace,
          alertMessage: <Alert>이메일 형식에 맞게 입력해주세요.</Alert>,
          validated: 'error',
        },
      }));

      return;
    }

    setPersonalFormInputs((prevValue) => ({
      ...prevValue,
      email: {
        value: target.value,
        alertMessage: <></>,
        validated: 'validated',
      },
    }));
  };

  const setBrandName = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setPersonalFormInputs((prevValue) => ({
      ...prevValue,
      brandName: {
        value: target.value,
        alertMessage: <></>,
        validated: 'validated',
      },
    }));

    if (validate.phone.empty(target.value)) {
      setPersonalFormInputs((prevValue) => ({
        ...prevValue,
        brandName: {
          ...prevValue.brandName,
          validated: 'error',
          alertMessage: <></>,
        },
      }));
    }
  };

  const setRole = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setPersonalFormInputs((prevValue) => ({
      ...prevValue,
      role: {
        value: target.value,
        alertMessage: <></>,
        validated: 'validated',
      },
    }));

    if (validate.phone.empty(target.value)) {
      setPersonalFormInputs((prevValue) => ({
        ...prevValue,
        role: {
          ...prevValue.role,
          validated: 'error',
          alertMessage: <></>,
        },
      }));
    }
  };

  const setPhoneNumber = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (validate.phone.length(target.value.length)) {
      const newValue = target.value.slice(0, 13);
      setPersonalFormInputs((prevValue) => ({
        ...prevValue,
        phoneNumber: {
          value: makePhoneNumberWithHyphen(newValue),
          validated: 'validated',
          alertMessage: <></>,
        },
      }));

      return;
    }

    if (!validate.phone.form(target.value)) {
      setPersonalFormInputs((prevValue) => ({
        ...prevValue,
        phoneNumber: {
          ...prevValue.phoneNumber,
          alertMessage: <Alert>{ACCOUNT_MESSAGE.PHONE.INPUT_ERROR}</Alert>,
          validated: 'error',
        },
      }));

      return;
    }

    if (!validate.phone.must11digits(target.value)) {
      setPersonalFormInputs((prevValue) => ({
        ...prevValue,
        phoneNumber: {
          value: makePhoneNumberWithHyphen(target.value),
          alertMessage: <Alert>{ACCOUNT_MESSAGE.PHONE.MUST_11_DIGITS}</Alert>,
          validated: 'error',
        },
      }));

      return;
    }

    setPersonalFormInputs((prevValue) => ({
      ...prevValue,
      phoneNumber: {
        value: makePhoneNumberWithHyphen(target.value),
        validated: 'validated',
        alertMessage: <></>,
      },
    }));
  };

  const setCategory1 = (e: MouseEvent<HTMLButtonElement>) => {
    setCategorizedFormInputs((prev) => ({
      ...prev,
      category1: {
        ...prev.category1,
        value: e.currentTarget.innerText,
        validated: 'validated',
      },
    }));
  };

  const submitFormData = (e: MouseEvent<HTMLButtonElement>) => {
    submitBrandazineFormData({
      categories: Object.values(categorizedFormInputs).map((category) => ({
        categoryName: category.key,
        selectedOption: category.value,
      })),
      reservationAttendee: {
        name: personalFormInputs.name.value,
        organization: personalFormInputs.brandName.value,
        role: personalFormInputs.role.value,
        department: '',
        phone: personalFormInputs.phoneNumber.value,
        email: personalFormInputs.email.value,
      },
    });
  };

  const isFormValidated =
    personalFormInputs.brandName.validated === 'validated' &&
    personalFormInputs.email.validated === 'validated' &&
    personalFormInputs.name.validated === 'validated' &&
    personalFormInputs.phoneNumber.validated === 'validated' &&
    personalFormInputs.role.validated === 'validated' &&
    categorizedFormInputs.category1.validated === 'validated';

  const category1 = formData.categories[0].options.map((value) => ({ value }));

  return (
    <Main>
      <BrandazineContainer>
        <BrandazineSection>
          <TitleSection>
            <Title>{formData.title}</Title>
            <SubTitle>{formData.description}</SubTitle>
          </TitleSection>
          <InputSection>
            <SubSection subTitle="이름" required>
              <TextInput
                value={personalFormInputs.name.value}
                placeholder="이름을 입력해주세요"
                alert={personalFormInputs.name.alertMessage}
                onChange={setName}
                validated={personalFormInputs.name.validated !== 'error'}
              />
            </SubSection>
            <SubSection subTitle="이메일" required>
              <TextInput
                value={personalFormInputs.email.value}
                placeholder="이메일을 입력해주세요"
                alert={personalFormInputs.email.alertMessage}
                onChange={setEmail}
                validated={personalFormInputs.email.validated !== 'error'}
              />
            </SubSection>
            <SubSection subTitle="브랜드명" required>
              <TextInput
                value={personalFormInputs.brandName.value}
                alert={personalFormInputs.brandName.alertMessage}
                placeholder="브랜드명을 입력해주세요"
                onChange={setBrandName}
                validated={personalFormInputs.brandName.validated !== 'error'}
              />
            </SubSection>
            <SubSection subTitle="직책" required>
              <TextInput
                value={personalFormInputs.role.value}
                placeholder="직책을 입력해주세요"
                alert={personalFormInputs.role.alertMessage}
                onChange={setRole}
                validated={personalFormInputs.role.validated !== 'error'}
              />
            </SubSection>
            <SubSection subTitle="휴대폰 번호" required>
              <TextInput
                value={personalFormInputs.phoneNumber.value}
                alert={personalFormInputs.phoneNumber.alertMessage}
                placeholder="휴대폰 번호를 입력해주세요"
                onChange={setPhoneNumber}
                validated={personalFormInputs.phoneNumber.validated !== 'error'}
              />
            </SubSection>
            {categorizedFormInputs && (
              <>
                <SubSection subTitle="카테고리 분류" required>
                  <CategoryInputContainer>
                    <SelectTextInput
                      value={categorizedFormInputs.category1.value}
                      selectValues={category1}
                      validated={
                        categorizedFormInputs.category1.validated !== 'error'
                      }
                      onClickSelectBox={setCategory1}
                    />
                  </CategoryInputContainer>
                </SubSection>
              </>
            )}
          </InputSection>
          <SubmitButtonContainer>
            <StyledButton
              onClickButton={submitFormData}
              disabled={!isFormValidated}
            >
              <ButtonContent>
                다음
                <CustomIcon
                  size={8}
                  height={16}
                  fill="none"
                  stroke="white"
                  viewBox="0 0 8 14"
                >
                  <RightArrow />
                </CustomIcon>
              </ButtonContent>
            </StyledButton>
          </SubmitButtonContainer>
          <MediaQuery maxWidth={768}>
            <SendtimeLogoContainer>
              <ImageContainer width={260}>
                <AutoHeightImage
                  src={`${BASE_URL.image}/banners/powered_by_no_bg.png`}
                  alt="powered_by_sendtime"
                />
              </ImageContainer>
            </SendtimeLogoContainer>
          </MediaQuery>
        </BrandazineSection>
        <MediaQuery minWidth={769}>
          <SendtimeLogoContainer>
            <ImageContainer width={320}>
              <AutoHeightImage
                src={`${BASE_URL.image}/banners/powered_by_no_bg.png`}
                alt="powered_by_sendtime"
              />
            </ImageContainer>
          </SendtimeLogoContainer>
        </MediaQuery>
      </BrandazineContainer>
    </Main>
  );
};

export default Brandazine;

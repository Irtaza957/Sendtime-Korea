import React, { FormEvent, MouseEvent, useEffect } from 'react';
import i18n from 'locales';
import { useTranslation } from 'react-i18next';
import { Alert } from 'styles/common.styles';

import TextInput from '@components/TextInput';
import TimezoneSelect from '@components/TimezoneSelect';
import { SignUpFormValue } from '@hooks/useSignUp';
import useTranslate from '@hooks/useTranslate';
import useUserInfo from '@hooks/useUserInfo';

import { PrimaryButton } from '../common';
import { FormContainer, Section, Title } from '../common/index.styles';

import * as Styled from './index.styles';

interface UserInfoFormProps {
  onSubmit: (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => void;
  signUpFormValue: SignUpFormValue;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTimezone: (timezone: Timezone) => void;
  onChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  timezones: Timezone[];
}

const UserInfoForm = ({
  onSubmit,
  signUpFormValue: { email, name, phone, timezone },
  onChangeName,
  onChangeTimezone,
  onChangePhone,
  timezones,
}: UserInfoFormProps) => {
  const { t } = useTranslation('signUp');
  const { saveUserInfo } = useUserInfo();

  useEffect(() => {
    saveUserInfo();
  }, [timezone]);

  return (
    <FormContainer>
      <Title>{t('userInfoStep.tellMeAboutYou')}</Title>
      <Section>
        <TextInput
          label={t('userInfoStep.email')}
          value={email.text}
          onChange={() => {}}
          disabled
          required
        />
        <TextInput
          label={t('userInfoStep.name')}
          value={name.text}
          onChange={onChangeName}
          placeholder={t('userInfoStep.namePlaceholder')}
          alert={<Alert>{name.alertMessage}</Alert>}
          autoComplete="name"
          required
        />
        <TimezoneSelect
          timezones={timezones || []}
          selectedValue={timezone}
          onMouseDown={onChangeTimezone}
          confirmChange={false}
          page="signup"
        />
        {useTranslate}
        {i18n.language.includes('ko') && (
          <Section gap={4}>
            <TextInput
              label={t('userInfoStep.phoneNumber')}
              value={phone.text}
              onChange={onChangePhone}
              placeholder={t('userInfoStep.phoneNumberPlaceholder')}
              alert={<Alert>{phone.alertMessage}</Alert>}
              autoComplete="tel"
              prefixNode={
                <Styled.CountryNumberText>+82</Styled.CountryNumberText>
              }
            />
            <Styled.Text>
              {t('userInfoStep.phoneNumberDescription')}
            </Styled.Text>
          </Section>
        )}
      </Section>
      <PrimaryButton onClickButton={onSubmit}>
        {t('userInfoStep.signUp')}
      </PrimaryButton>
    </FormContainer>
  );
};

export default UserInfoForm;

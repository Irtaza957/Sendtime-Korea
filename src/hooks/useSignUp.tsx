import { useState } from 'react';
import { useRouter } from 'next/router';
import i18n from 'locales';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { signupAPI } from '@api/user/Auth';
import { decodeBase64Json } from '@utils/encoding';
import { makePhoneNumberWithHyphen10Digits } from '@utils/phoneNumber';
import { getMatchBrowserTimezone } from '@utils/time';
import { validate } from '@utils/validation';

export type SignUpFormValue = {
  email: {
    text: string;
    alertMessage: string;
  };
  password: {
    text: string;
    lengthValidated: boolean;
    alertMessage: string;
  };
  name: {
    text: string;
    alertMessage: string;
  };
  phone: {
    text: string;
    alertMessage: string;
  };
  timezone: Timezone;
  verificationEmailSent: boolean;
  alreadySignedUp: boolean;
};

export interface UserInfoForRedirectToSignUp {
  email?: string;
  name?: string;
  phone?: string;
}

const useSignUp = ({ timezones }: { timezones: Timezone[] }) => {
  const router = useRouter();
  const { info, tags: tagsString = '' } = router.query;
  const tags = (tagsString as string).split(',').filter((tag) => tag);

  let prefilledInfo: UserInfoForRedirectToSignUp = {};
  if (info) {
    const { email, name, phone } = decodeBase64Json(
      info as string
    ) as UserInfoForRedirectToSignUp;
    let phone10Digits = '';
    const phoneWithoutHyphen = phone?.replaceAll('-', '');
    if (phoneWithoutHyphen && phoneWithoutHyphen.length > 10) {
      phone10Digits = phoneWithoutHyphen.slice(
        phoneWithoutHyphen.replaceAll('-', '').length - 10
      );
    }

    prefilledInfo = {
      email: email,
      name: name,
      phone:
        phone && i18n.language.includes('ko')
          ? makePhoneNumberWithHyphen10Digits(phone10Digits)
          : '',
    };
  }
  const [value, setValue] = useState<SignUpFormValue>({
    email: { text: prefilledInfo.email ?? '', alertMessage: '' },
    password: { text: '', lengthValidated: false, alertMessage: '' },
    name: { text: prefilledInfo.name ?? '', alertMessage: '' },
    phone: { text: prefilledInfo.phone ?? '', alertMessage: '' },
    timezone: getMatchBrowserTimezone(timezones),
    verificationEmailSent: false,
    alreadySignedUp: false,
  });
  const { t } = useTranslation('signUp');

  const onChangeEmail = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const text = target.value.trim();
    setValue({
      ...value,
      email: {
        text: text,
        alertMessage: '',
      },
    });
  };

  const validateEmail = (): boolean => {
    const isValid =
      !validate.email.empty(value.email.text) &&
      validate.email.form(value.email.text);
    if (!isValid) {
      setValue({
        ...value,
        email: {
          ...value.email,
          alertMessage: t('alert.emailInputForm'),
        },
      });
    }
    return isValid;
  };

  const onChangePassword = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const text = target.value.trim();
    setValue({
      ...value,
      password: {
        ...value.password,
        text: text,
        lengthValidated: !validate.password.length(text.length),
        alertMessage: '',
      },
    });
  };

  const validatePassword = (): boolean => {
    const isValid = !validate.password.length(value.password.text.length);
    if (!isValid) {
      setValue({
        ...value,
        password: {
          ...value.password,
          alertMessage: t('alert.passwordMinLength'),
        },
      });
    }
    return isValid;
  };

  const onChangeName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      name: {
        text: target.value,
        alertMessage: '',
      },
    });
  };

  const validateName = (): boolean => {
    const isValid =
      validate.name.korEng(value.name.text) == true &&
      !validate.name.empty(value.name.text);
    if (!isValid) {
      setValue({
        ...value,
        name: {
          ...value.name,
          alertMessage: t('alert.nameInputCharacter'),
        },
      });
    }
    return isValid;
  };

  const onChangeTimezone = (timezone: Timezone) => {
    setValue({
      ...value,
      timezone: timezone,
    });
  };

  const onChangePhone = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const text = makePhoneNumberWithHyphen10Digits(target.value.trim());
    setValue({
      ...value,
      phone: {
        text: text,
        alertMessage: '',
      },
    });
  };

  const validatePhone = (): boolean => {
    const isValid =
      value.phone.text == '' ||
      validate.phone.must10digits(value.phone.text) == true;
    if (!isValid) {
      setValue({
        ...value,
        phone: {
          ...value.phone,
          alertMessage: t('alert.phoneNumberLength'),
        },
      });
    }
    return isValid;
  };

  const { mutate: signUp, isLoading: signUpLoading } = useMutation(
    async () => {
      if (
        !validateEmail() ||
        !validatePassword() ||
        !validateName() ||
        !validatePhone()
      ) {
        return;
      }

      const language = i18n.language;
      await signupAPI.createUser({
        email: value.email.text.toLowerCase().trim(),
        password: value.password.text,
        name: value.name.text,
        phone:
          value.phone.text.length >= 12
            ? value.phone.text.padStart(13, '0')
            : '',
        timezone: value.timezone,
        locale: language,
        tags: tags,
      });
    },
    {
      onSuccess: () => {
        setValue({
          ...value,
          verificationEmailSent: true,
        });
      },
      onError: (error: { code: number }) => {
        if (error.code === 4101) {
          setValue({
            ...value,
            alreadySignedUp: true,
          });
        }
      },
    }
  );

  return {
    value,
    setValue,
    onChangeEmail,
    validateEmail,
    onChangePassword,
    validatePassword,
    onChangeName,
    validateName,
    onChangeTimezone,
    onChangePhone,
    validatePhone,
    signUp,
    signUpLoading,
  };
};

export default useSignUp;

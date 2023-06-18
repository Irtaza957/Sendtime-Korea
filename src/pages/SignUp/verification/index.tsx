import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { signupAPI } from '@api/user/Auth';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useLoading from '@hooks/useLoading';

const SignUpVerificationPage = () => {
  const router = useRouter();
  const { loadingView } = useLoading();
  const { t } = useTranslation('signUp');
  const { showModal: showSuccessModal } = useNestedModal({
    type: 'alert',
    title: t('emailVerificationStep.successTitle'),
    description: t('emailVerificationStep.successDescription'),
  });

  const { mutate: verifyEmail } = useMutation(
    async () => {
      const { emailToken } = router.query;
      if (!emailToken) return;
      return await signupAPI.verifyEmail({ emailToken: emailToken as string });
    },
    {
      onSuccess: (response) => {
        const email = response?.data.results[0].email;
        showSuccessModal();
        router.push({
          pathname: ROUTES.USER.SIGN_IN,
          query: { email },
        });
      },
      onError: () => {
        alert(t('emailVerificationStep.failed'));
        router.push(ROUTES.USER.SIGN_IN);
      },
    }
  );

  useEffect(() => {
    verifyEmail();
  }, []);

  return <>{loadingView()}</>;
};

export default SignUpVerificationPage;

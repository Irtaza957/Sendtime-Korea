import { useRouter } from 'next/router';
import { setToken } from 'helper/TokenManager';
import i18n from 'locales';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { request } from '@api/Request';
import { loginAPI } from '@api/user/Auth';
import { coreUserState } from '@atoms/index';
import { USER_ID, USER_TOKEN } from '@constants/account';
import { ROUTES } from '@constants/routes';
import { useNestedModal } from '@contexts/NestedModalProvider';
import { setLocalStorage } from '@utils/storage';

const useGoogleSignIn = (accessToken: string) => {
  const setCoreUserInfo = useSetRecoilState(coreUserState);
  const { t } = useTranslation('signIn');
  const { showModal: showDuplicatedErrorModal } = useNestedModal({
    type: 'alert',
    title: t('alert.alreadyExistingEmail'),
    description: t('alert.signInWithEmail'),
  });
  const { showModal: showEmailNotVerifiedErrorModal } = useNestedModal({
    type: 'alert',
    title: t('alert.emailNotVerified'),
    description: t('alert.emailNotVerifiedDescription'),
  });
  const router = useRouter();

  const { mutate: loginWithGoogle, isLoading: loginWithGoogleLoading } =
    useMutation(
      async (params: GoogleOAuthRequestParams) => {
        const tags = params.state?.tags;

        const response = await loginAPI.loginWithGoogle({
          accessToken,
          locale: i18n.language,
          tags: tags ?? [],
        });

        return { response, state: params.state };
      },
      {
        onSuccess: ({ response, state }) => {
          if (!response) return;
          const {
            data: { results },
          } = response;
          const { accessToken: token, userInfo } = results[0];

          setToken(token);
          setCoreUserInfo({
            ...userInfo,
            integrationStatus: {
              zoom: false,
              meet: false,
              slack: false,
              googleGroupSheets: false,
              googleThirdPersonSheets: false,
              googlePersonalSheets: false,
            },
          });
          setLocalStorage(USER_TOKEN, token);
          setLocalStorage(USER_ID, userInfo.id);

          if (token) {
            request.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${token}`;
          }

          if (userInfo.onboardStep !== 'DONE') {
            router.push(ROUTES.ONBOARDING.INIT);
            return;
          }

          const { next, i, r } = router.query;
          if (
            typeof next === 'string' &&
            typeof i === 'string' &&
            typeof r === 'string' &&
            next &&
            i &&
            r
          ) {
            router.push(`${next}&i=${i}&r=${r}`);
            return;
          }

          if (!(next && i && r) && state?.url) {
            const { url, ...rest } = router.query;

            router.push({
              pathname: state.url,
              query: { ...state.query, ...rest },
            });

            return;
          }

          router.push(ROUTES.MY_CALENDAR);
        },
        onError: (error: { code: number }) => {
          router.push(ROUTES.USER.SIGN_IN);
          if (error.code === 4101) showDuplicatedErrorModal();
          if (error.code === 4119) showEmailNotVerifiedErrorModal();
        },
      }
    );

  return { loginWithGoogle, loginWithGoogleLoading };
};

export default useGoogleSignIn;

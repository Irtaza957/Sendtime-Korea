import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import { BetaQueryKeys, signupAPI } from '@api/user/Auth';
import { USER_TOKEN } from '@constants/account';
import { ROUTES } from '@constants/routes';
import useLoading from '@hooks/useLoading';
import useSignIn from '@hooks/useSignIn';
import { getLocalStorage } from '@utils/storage';

const Page = () => {
  const router = useRouter();
  const { loadingView } = useLoading();

  const { teamId, memberId, activationLinkUuid, login } = router.query;
  const { logout } = useSignIn();
  const userToken = getLocalStorage(USER_TOKEN);

  const { data: checkMember, isLoading: isChecking } = useQuery(
    BetaQueryKeys.proxyLogin(),
    () => signupAPI.memberCheck(`${memberId}`),
    {
      onSuccess: ({ data: { results } }) => {},
      onError: (e: { message: string }) => {
        alert(e.message);
        console.error(e);
      },
      enabled: !!memberId,
    }
  );

  const { mutate: activateUser, isLoading } = useMutation(
    BetaQueryKeys.proxyLogin(),
    ({ teamId, memberId, activationLinkUuid }: ProxyLoginRequestParams) =>
      signupAPI.proxyLogin({ teamId, memberId, activationLinkUuid }),
    {
      onSuccess: ({ data: { results } }) => {
        const [userInfo] = results;

        if (!checkMember?.data.results[0]) {
          router.push({
            pathname: ROUTES.PASSWORD.NEW,
            query: {
              teamId,
              memberId,
              activationLinkUuid,
              email: userInfo.email,
            },
          });

          return;
        }

        router.push(
          {
            pathname: ROUTES.USER.SIGN_IN,
            query: { email: userInfo.email, groupId: teamId },
          },
          ROUTES.USER.SIGN_IN
        );
      },
      onError: (e: { message: string; code: number }) => {
        if (e.code === 4103) {
          console.error('member not signed up');
          return;
        }

        alert(e.message);
      },
    }
  );

  useEffect(() => {
    if (userToken) logout();

    if (!!teamId && !!memberId && !!activationLinkUuid && !isChecking) {
      activateUser({
        teamId: `${teamId}`,
        memberId: `${memberId}`,
        activationLinkUuid: `${activationLinkUuid}`,
      });
    }
  }, [isChecking]);

  return <div>{isLoading && isChecking && loadingView()}</div>;
};

export default Page;

import i18next from 'i18next';

import useSnackbar from './useSnackbar';
import useTimeout from './useTimeout';
import useUserInfo from './useUserInfo';

const useAutosaveUserInfo = () => {
  const { saveUserInfo } = useUserInfo();

  const showSnackbar = useSnackbar();

  useTimeout(() => {
    saveUserInfo();
    showSnackbar({
      type: 'default',
      message: i18next.t('accountSettingPage:message.save'),
    });
  }, 10000);

  return {};
};

export default useAutosaveUserInfo;

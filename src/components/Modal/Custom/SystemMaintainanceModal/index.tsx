import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import NewTabLink from '@components/NewTabLink';
import useTranslate from '@hooks/useTranslate';
import { REGION } from '@utils/language';

import * as Styled from './index.styles';

interface SystemMaintainanceModalProps {
  closeModal?: () => void;
}

const SystemMaintainanceModal = ({
  closeModal,
}: SystemMaintainanceModalProps) => {
  const { t } = useTranslation('common');
  const { i18n } = useTranslate();

  const getDescription = useCallback(() => {
    if (i18n.language.includes(REGION.KO)) {
      return (
        <>
          구글 로그인 프로세스를 점검중입니다. 번거로우시더라도, 임시적으로 비밀번호 재설정을 통해 일반 로그인을 부탁드리겠습니다.&nbsp;
          <NewTabLink href="https://energetic-newt-2b5.notion.site/Google-login-user-guide-fea113b9f8e946ed9b7c5b7697e527cb?pvs=4">
            <Styled.Link>여기(클릭)</Styled.Link>
          </NewTabLink>
          에서 더 자세하게 알아보세요.
        </>
      );
    } else if (i18n.language.includes(REGION.VI)) {
      return <>
        Chúng tôi đang khắc phục sự cố với đăng nhập Google. Chúng tôi xin lỗi vì sự bất tiện này. Vui lòng đặt lại mật khẩu, sau đó sử dụng đăng nhập thông thường. Chúng tôi sẽ hướng dẫn bạn thông qua liên kết này&nbsp;
        <NewTabLink href="https://energetic-newt-2b5.notion.site/Google-login-user-guide-fea113b9f8e946ed9b7c5b7697e527cb?pvs=4">
          <Styled.Link>(nhấp vào đây).</Styled.Link>
        </NewTabLink>
      </>
    } else if (i18n.language.includes(REGION.ZH)) {
      return <>
        我們正在修復 Google 登入的問題。對於造成的不便，我們深感抱歉。請重設密碼，然後使用一般登入方式。我們將透過此連結引導您&nbsp;
        <NewTabLink href="https://energetic-newt-2b5.notion.site/Google-login-user-guide-fea113b9f8e946ed9b7c5b7697e527cb?pvs=4">
          <Styled.Link>(點擊這裡)。</Styled.Link>
        </NewTabLink>
      </>
    } else {
      return (
        <>
          We’re fixing issues with Google Login. We apologize for the inconvenience. Please reset password then use general login. We’ll guide you through this&nbsp;
          <NewTabLink href="https://energetic-newt-2b5.notion.site/Google-login-user-guide-fea113b9f8e946ed9b7c5b7697e527cb?pvs=4">
            <Styled.Link>link(click here).</Styled.Link>
          </NewTabLink>
        </>
      );
    }
  }, [i18n.language]);

  return (
    <Styled.ModalWrapper>
      <Styled.ModalContainer>
        <Styled.ModalHeader>
          <Styled.Title>Notice</Styled.Title>
          <Styled.Icon onClick={closeModal}>&#10005;</Styled.Icon>
        </Styled.ModalHeader>
        <Styled.ModalContent>
          <Styled.InfoText>
            {getDescription()}
          </Styled.InfoText>
        </Styled.ModalContent>
        <Styled.ModalFooter>
          <StyledButton
            onClickButton={closeModal}
            color="white"
            bgColor="red-500"
            padding="10px 14px"
            withBorder
            borderColor='red-500'
          >
            {t('close')}
          </StyledButton>
        </Styled.ModalFooter>
      </Styled.ModalContainer>
    </Styled.ModalWrapper>
  );
};

export default SystemMaintainanceModal;

import React from 'react';
import { useTranslation } from 'react-i18next';

import StyledButton from '@components/Button';
import Line from '@components/Line';
import { NamedInput } from '@components/MyPageSubComponents';
import LanguageDropdown from '@components/shared/LanguageDropdown';
import { useNestedModal } from '@contexts/NestedModalProvider';
import useAutosaveUserInfo from '@hooks/useAutosaveUserInfo';
import useLoading from '@hooks/useLoading';
import useUserInfo from '@hooks/useUserInfo';
import {
  AccountSectionWrapper,
  ButtonContainer,
  InputGroupWrapper,
  Section,
  SectionTitle,
} from '@pages/MyPage/index.styles';
import WithdrawalModal from '@pages/MyPage/Modal/WithdrawalModal';

import * as Styled from './index.styles';

interface AccountSectionProps {
  onClickSaveButton: () => void;
}

const AccountSection = ({ onClickSaveButton }: AccountSectionProps) => {
  useAutosaveUserInfo();
  const { t } = useTranslation('accountSettingPage');
  const { userInfo, setName, setPhone } = useUserInfo();
  const { loadingView } = useLoading();
  const { showModal, hideModal } = useNestedModal({
    type: 'alert',
    description: <WithdrawalModal />,
  });

  const onClickWithdrawalButton = async () => {
    await showModal();

    hideModal();
  };

  if (!userInfo) return loadingView();

  return (
    <>
      <Section gap={40}>
        <SectionTitle>{t('account.title')}</SectionTitle>
        <AccountSectionWrapper>
          <NamedInput
            label={t('account.name')}
            type="text"
            value={userInfo.name}
            onChange={setName}
          />
          <InputGroupWrapper>
            <NamedInput
              label={t('account.phoneNumber')}
              type="tel"
              value={userInfo.phone}
              onChange={setPhone}
            />
            <NamedInput
              label={t('account.email')}
              highlightLabel={t('account.notiGuide')}
              type="email"
              value={userInfo.email}
              onChange={() => {}}
              disabled
            />
          </InputGroupWrapper>
        </AccountSectionWrapper>
      </Section>
      <Section gap={40}>
        <SectionTitle>{t('account.language')}</SectionTitle>
        <AccountSectionWrapper>
          <LanguageDropdown />
          <div style={{ paddingBottom: '20px' }} />
        </AccountSectionWrapper>
      </Section>
      <ButtonContainer>
        <div />
        <StyledButton
          onClickButton={onClickSaveButton}
          borderRadius={50}
          padding="10px 20px"
          align="end"
          type="submit"
        >
          {t('save')}
        </StyledButton>
      </ButtonContainer>
      <Styled.LeaveButtonSection>
        <Line />
        <Styled.LeaveButton onClick={onClickWithdrawalButton}>
          {t('account.leave')}
        </Styled.LeaveButton>
      </Styled.LeaveButtonSection>
    </>
  );
};

export default AccountSection;

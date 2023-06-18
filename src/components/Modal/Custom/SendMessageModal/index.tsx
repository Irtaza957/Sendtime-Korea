import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { SpaceAPI } from '@api/space/SpaceApi';
import useLoading from '@hooks/useLoading';
import useUserInfo from '@hooks/useUserInfo';
import * as Sentry from '@sentry/nextjs';

import * as Styled from './index.styles';

import 'react-toastify/dist/ReactToastify.css';

interface SendMessageModalProps {
  close: () => void;
  title?: string;
  spaceId: string;
  targetId: string;
  senderId: string;
}

const SendMessageModal = ({
  close,
  title,
  spaceId,
  targetId,
  senderId,
}: SendMessageModalProps) => {
  const { t } = useTranslation('space');
  const [message, setMessage] = useState('');
  const { loadingView } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useUserInfo();

  const onSendMessage = async () => {
    const params = {
      spaceId: spaceId,
      senderId: senderId,
      targetId: targetId,
      message,
    };
    setIsLoading(true);
    try {
      await SpaceAPI.sendMessage(params);
      setIsLoading(false);
      toast.success(`${t('sendMessageModal.successMessage')}`);
      close();
    } catch (e: any) {
      setIsLoading(false);
      toast.error(e.message);
      Sentry.captureException(e);
      return { notFound: true };
    }
  };

  return (
    <Styled.ModalWrapper>
      {isLoading && loadingView()}
      <Styled.ModalContainer>
        <Styled.InnerContainer>
          <Styled.ModalHeader>
            <Styled.Title>{t('sendMessageModal.title')}</Styled.Title>
            <Styled.Icon onClick={close}>&#10005;</Styled.Icon>
          </Styled.ModalHeader>

          <Styled.ModalBody>
            <Styled.ModalTopSection>
              <Styled.InfoText>
                {t('sendMessageModal.description')}
              </Styled.InfoText>
              <Styled.ReceiverInfo>
                {t('sendMessageModal.to')}{' '}
                <Styled.UserTitle>{title}</Styled.UserTitle>
              </Styled.ReceiverInfo>
            </Styled.ModalTopSection>

            <Styled.ModalBottomSection>
              <Styled.LabelContainer>
                <Styled.Label>{t('sendMessageModal.message')}</Styled.Label>
                <Styled.TextLength>{message.length}/500</Styled.TextLength>
              </Styled.LabelContainer>
              <Styled.TextArea
                value={message}
                maxLength={500}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('sendMessageModal.enterMessage')}
              />

              <Styled.UserInfo>
                <Styled.Text width="350px">
                  {t('sendMessageModal.messageNote')}
                </Styled.Text>
                <Styled.UnorderedList>
                  {userInfo?.name && (
                    <Styled.UnorderedListItem>
                      <Styled.Text>{userInfo?.name}</Styled.Text>
                    </Styled.UnorderedListItem>
                  )}

                  {userInfo?.phone && (
                    <Styled.UnorderedListItem>
                      <Styled.Text>{userInfo?.phone}</Styled.Text>
                    </Styled.UnorderedListItem>
                  )}

                  {userInfo?.email && (
                    <Styled.UnorderedListItem>
                      <Styled.Text>{userInfo?.email}</Styled.Text>
                    </Styled.UnorderedListItem>
                  )}
                </Styled.UnorderedList>
              </Styled.UserInfo>
            </Styled.ModalBottomSection>
          </Styled.ModalBody>
        </Styled.InnerContainer>

        <Styled.ModalFooter>
          <Styled.Button onClick={close} width="40%" bgColor="var(--gray-500)">
            {t('sendMessageModal.cancel')}
          </Styled.Button>
          <Styled.Button width="60%" onClick={() => onSendMessage()}>
            {t('sendMessageModal.send')}
          </Styled.Button>
        </Styled.ModalFooter>
      </Styled.ModalContainer>
    </Styled.ModalWrapper>
  );
};

export default SendMessageModal;

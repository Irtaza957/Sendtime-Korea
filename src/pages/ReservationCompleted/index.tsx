import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MediaQuery from 'react-responsive';

import StyledButton from '@components/Button';
import { CopyContainer } from '@components/CopyTextBox/index.styles';
import NewTabLink from '@components/NewTabLink';
import { Box } from '@components/Reservation/index.styles';
import SideAreaContainer from '@components/SideAreaContainer';
import TextArea from '@components/TextArea';
import Title from '@components/Title';
import WithSidebarComponent from '@components/WithSidebarComponent';
import { ROUTES } from '@constants/routes';
import useCopy from '@hooks/useCopy';
import { Copy } from '@Icon/Icons';
import CustomIcon from '@Icon/index';
import { Icon } from '@iconify/react';

import {
  ButtonText,
  CompleteContainer,
  CompletedTitle,
  Container,
  Content,
  CopyButton,
} from './index.styles';

const ReservationCompleted = () => {
  const router = useRouter();
  const { copyText } = useCopy();
  const {
    query: { description, uuid, edit },
  } = router;

  useEffect(() => {
    if (!uuid) {
      router.push(ROUTES.MANAGE.INDEX);
    }
  }, [router, uuid]);

  const textboxDescription = `${description}

아래 센드타임 링크에서 예약해주세요:
www.sendtime.app/reservation?i=${uuid}`;

  const [value, setValue] = useState({
    description: typeof description === 'string' ? textboxDescription : '',
    uuid: typeof uuid === 'string' ? uuid : '',
  });

  const onChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue((prevValue) => ({
      ...prevValue,
      description: event.target.value,
    }));
  };

  const url = () => {
    if (typeof window !== undefined) {
      return `${window.location.origin}/reservation?i=${value.uuid}`;
    }
    return `https://www.sendtime.app/reservation?i=${value.uuid}`;
  };

  return (
    <Box>
      <WithSidebarComponent>
        <SideAreaContainer>
          <MediaQuery maxWidth={768}>
            <Title> </Title>
          </MediaQuery>
          <CompleteContainer>
            <Container>
              <CompletedTitle>
                예약 페이지가 {edit ? '수정되었' : '만들어졌'}습니다!
              </CompletedTitle>
              <CopyContainer>
                <NewTabLink href={url()} />
                <CopyButton onClick={() => copyText(url())}>
                  <Icon icon="ant-design:link-outlined" width="16px" />
                </CopyButton>
              </CopyContainer>
              <Content>
                예약페이지를 공유하세요. <br />
                예약이 접수되면 메일과 알림톡으로 알려드립니다.
              </Content>
              <TextArea
                value={value.description}
                onChange={onChangeTextArea}
                rows={8}
              />

              <StyledButton onClickButton={() => copyText(value.description)}>
                <CustomIcon size={18} stroke="none" fill="white">
                  <Copy />
                </CustomIcon>
                <ButtonText>복사하기</ButtonText>
              </StyledButton>
            </Container>
          </CompleteContainer>
        </SideAreaContainer>
      </WithSidebarComponent>
    </Box>
  );
};

export default ReservationCompleted;

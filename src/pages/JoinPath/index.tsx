import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { onboardingAPI } from '@api/user/UserInfo';
import StyledButton from '@components/Button';
import Container from '@components/Container';
import HackleTrack from '@components/HackleTrack';
import MultiSelectInput from '@components/MultiSelectInput';
import TextInput from '@components/TextInput';
import { HACKLE_KEYS } from '@constants/hackle';
import { ROUTES } from '@constants/routes';
import useLoading from '@hooks/useLoading';

import {
  BetaSection,
  ContentWrapper,
  FormContainer,
  SubDescription,
  SubmitSection,
  Title,
} from './index.styles';

const NEXT_ROUTE = ROUTES.ONBOARDING.INIT;
const joinPathDefaultValue = { value: '', alertMessage: <></> };

const JoinPath = () => {
  const { t } = useTranslation('onboarding');
  const paths = t('joinPath.paths', { returnObjects: true }) as string[];
  const defaultData = paths.map((path) => ({ content: path, selected: false }));

  const router = useRouter();
  const [selectedData, setSelectedData] = useState(defaultData);
  const [value, setValue] = useState(joinPathDefaultValue);
  const { loadingView } = useLoading();

  const onChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevValue) => ({
      ...prevValue,
      value: target.value,
    }));
  };

  const handleSelectInputClick = (content: string) => {
    setSelectedData((prev) => {
      const target = prev.find((value) => value.content === content);
      return prev.map((p) => {
        if (target?.content === p.content) {
          return { content: p.content, selected: !target?.selected };
        }
        return p;
      });
    });
  };

  const joinPath = () => {
    const selected = selectedData
      .filter(({ selected }) => selected)
      .map(({ content }) => content)
      .join(',');

    if (selected && value.value) {
      return `${selected},${value.value}`;
    }

    if (!selected && value.value) {
      return `${value.value}`;
    }

    return selected;
  };

  const { mutate: updateJoinPath, isLoading } = useMutation(
    onboardingAPI.updateJoinPath,
    {
      onSuccess: () => {
        router.push(NEXT_ROUTE);
      },
    }
  );

  const goSignUp = () => {
    const selected = selectedData
      .filter(({ selected }) => selected)
      .map(({ content }) => content);
    if (value.value) {
      selected.push(value.value);
    }

    updateJoinPath({ joinPaths: selected });
  };

  return (
    <BetaSection>
      {isLoading && loadingView()}
      <Container
        imageUrl="/logos/sendtime_logo.png"
        maxWidth={800}
        padding="30px 10px"
      >
        <ContentWrapper>
          <Title>{t('joinPath.title')}</Title>
          <SubDescription>{t('joinPath.description')}</SubDescription>
        </ContentWrapper>

        <FormContainer onSubmit={() => {}} hasCustomInput={!!value.value}>
          {selectedData.map(({ content, selected }, id) => {
            if (content !== 'CUSTOM') {
              return (
                <MultiSelectInput
                  key={id}
                  content={content}
                  selected={selected}
                  onClick={() => handleSelectInputClick(content)}
                />
              );
            }
          })}

          <TextInput
            value={value.value}
            onChange={onChangeInput}
            placeholder={t('joinPath.other')}
          />
        </FormContainer>
        <SubmitSection>
          <HackleTrack hackleEvent={{ key: HACKLE_KEYS.CLICK.BETA.SIGNUP }}>
            <StyledButton
              padding="16px 60px"
              borderRadius={10}
              onClickButton={() => goSignUp()}
              disabled={!joinPath() && !value.value.trim()}
            >
              {t('joinPath.next')}
            </StyledButton>
          </HackleTrack>
        </SubmitSection>
      </Container>
    </BetaSection>
  );
};

export default JoinPath;

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { SurveyAPI } from '@api/etc/Surveys';
import StyledButton from '@components/Button';
import useMainInput from '@hooks/inputs/useMainInput';
import usePagination from '@hooks/usePagination';

import { BlockBox } from '../../../styles/container/index.styles';

import {
  GoodByeMent,
  NpsDescription,
  NpsIcon,
  ThankyouTitle,
} from './NpsTitle/index.styles';
import { NpsContainer } from './index.styles';
import NpsQuestion from './NpsTitle';
import OneChoice from './OneChoice';
import Satisfaction from './Satisfaction';

const choices = [
  i18next.t('npsPage:answersForQuestion2.1'),
  i18next.t('npsPage:answersForQuestion2.2'),
  i18next.t('npsPage:answersForQuestion2.3'),
  i18next.t('npsPage:answersForQuestion2.4'),
];

const Nps = () => {
  const router = useRouter();

  const { mutate: createSurvey } = useMutation(SurveyAPI.create, {
    onSuccess: () => {},
    onError: () => {
      alert(i18next.t('common:error'));
      router.reload();
    },
  });

  const [userChoice, setUserChoice] = useState<SurveyParams>({
    surveyName: '정창경 데모데이 NPS 측정',
    surveyItems: [
      {
        questionIndex: 1,
        type: 'SCORE',
        response: '',
      },
      {
        questionIndex: 2,
        type: 'TEXT_CHOICE',
        response: choices[0],
      },
      {
        questionIndex: 3,
        type: 'TEXT_WRITE',
        response: '',
      },
    ],
  });

  const handleSatisfactionClick = (index: string) => {
    setUserChoice((prev) => {
      const copy = [...prev.surveyItems];
      copy.splice(0, 1, { ...prev.surveyItems[0], response: index });

      return {
        ...prev,
        surveyItems: copy,
      };
    });
  };

  const handleChoiceClick = (id: number, choice: string) => {
    setUserChoice((prev) => {
      const copy = [...prev.surveyItems];
      copy.splice(1, 1, { ...prev.surveyItems[1], response: choice });

      return {
        ...prev,
        surveyItems: copy,
      };
    });
  };

  const { description, DescriptionView } = useMainInput({});

  useEffect(() => {
    setUserChoice((prev) => {
      const copy = [...prev.surveyItems];
      copy.splice(2, 1, { ...prev.surveyItems[2], response: description });

      return {
        ...prev,
        surveyItems: copy,
      };
    });
  }, [description]);

  const { t } = useTranslation('npsPage');

  const data = [
    {
      question: t('question1'),
      disabled: { prev: false, next: !userChoice.surveyItems[0].response },
      handleNext: () => {
        const satisfaction = +userChoice.surveyItems[0].response;
        if (satisfaction < 4) {
          goNextPage();
          return;
        }

        goNextPage(2);
      },
      children: (
        <Satisfaction
          checkedIdx={+userChoice.surveyItems[0].response}
          handleClick={handleSatisfactionClick}
        />
      ),
    },
    {
      question: t('question2'),
      handlePrev: () => goPrevPage(),
      handleNext: () => goNextPage(),
      children: (
        <OneChoice
          choices={choices}
          handleClick={handleChoiceClick}
          checked={userChoice.surveyItems[1].response}
        />
      ),
    },
    {
      question: t('question3.title'),
      description: t('question3.description'),
      required: false,
      handlePrev: () => {
        const satisfaction = +userChoice.surveyItems[0].response;
        if (satisfaction < 4) {
          goPrevPage();
          return;
        }

        goPrevPage(2);
      },
      handleNext: () => {
        /* Submit 로직 */
        createSurvey(userChoice);
        goNextPage();
      },
      children: (
        <>
          {DescriptionView({
            placeholder: t('placeholder'),
          })}
        </>
      ),
    },
  ];

  const lastNo = data.length;
  const { page, goPrevPage, goNextPage } = usePagination(lastNo + 1);
  const transitionRef = useRef<HTMLDivElement | null>(null);

  return (
    <NpsContainer>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={page}
          timeout={300}
          nodeRef={transitionRef}
          addEndListener={(
            done: (this: HTMLDivElement, ev: TransitionEvent) => any
          ) => {
            if (!transitionRef.current) return;
            transitionRef.current.addEventListener(
              'transitionend',
              done,
              false
            );
          }}
          classNames="fade"
        >
          <div ref={transitionRef}>
            {data.map((d, idx) => (
              <>
                {page === idx + 1 && (
                  <NpsQuestion key={idx} no={idx + 1} lastNo={lastNo} {...d}>
                    {d.children}
                  </NpsQuestion>
                )}
              </>
            ))}
          </div>
        </CSSTransition>
      </SwitchTransition>

      {page === lastNo + 1 && (
        <BlockBox gap={20}>
          <BlockBox>
            <NpsIcon>🙏</NpsIcon>
            <ThankyouTitle>{t('closing.title')}</ThankyouTitle>
            <NpsDescription>{t('closing.subtitle')}</NpsDescription>
          </BlockBox>
          <GoodByeMent>{t('closing.joinGuide')}</GoodByeMent>
          <StyledButton
            padding="12px 60px"
            borderRadius={8}
            onClickButton={() => router.push(t('closing.joinLink'))}
          >
            {t('closing.joinBtn')}
          </StyledButton>
        </BlockBox>
      )}
    </NpsContainer>
  );
};

export default Nps;

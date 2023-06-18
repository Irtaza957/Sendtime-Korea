import React from 'react';

import CustomPage from '@pages/CustomPage';

const pageInfo: CustomPageInfo = {
  companyName: '스플랩 팀',
  description: `스플랩 팀은 스케줄링 자동화 툴 센드타임(SendTime)을 만들고 있습니다.
    무료 체험 신청부터 CEO 커피챗, 제휴/협업 문의 등 다양한 예약을 실시간으로 받고 있습니다.
    스플랩 팀에게 편하게 말을 걸어주세요. 😆`,
  logoUrl: '/logos/splab_logo.png',
  phone: '1600-4138',
  email: 'help@splab.dev',
  website: 'https://promotion.sendtime.app/',
  todayCount: 296,
  reservationPageCards: [
    {
      reservationPageUuid: '!@SFASFSD',
      title: 'SendTime 무료 체험 신청',
      description:
        '지금 바로 센드타임을 사용해보고 싶으신가요? 스플랩 팀에게 알려주세요!',
      tags: ['무료 체험', '바로 온보딩 진행'],
      time: '30분',
      location: ['Zoom', '전화 미팅'],
      like: 65,
      shake: 70,
      buttonText: '신청하기',
      link: 'https://sendtime.app/reservation?u=ceo&i=sv49wu',
      color: '#383CC1',
    },
    {
      reservationPageUuid: '!@123213',
      title: 'CEO랑 바로 만나기',
      description:
        'CEO 민승님은 주말에 항상 오픈이에요! 사람과 사람을 이어주는 서비스를 만들고 있는 만큼, 다양한 분들과 이야기를 나누고 싶습니다.부담갖지 말고 예약해주세요🔥',
      tags: ['얼른 만나봐요', 'funding 중...'],
      time: '45분',
      location: ['Zoom', '전화 미팅'],
      like: 35,
      shake: 22,
      buttonText: '약속잡기',
      link: 'https://sendtime.app/reservation?u=ceo&i=vkOLGC',
      color: '#383CC1',
    },
    {
      reservationPageUuid: '@zsdsfd',
      title: '제휴/협업 문의',
      description:
        '센드타임은 현재 많은 파트너사와 제휴중입니다. 스플랩 팀과 함께 성장하고 싶으신가요? 언제든지 가벼운 커피챗으로 큰 프로젝트를 시작할 수 있습니다.',
      tags: ['세일즈 팀', 'HR, 멘토링'],
      time: '60분',
      location: ['Zoom', '전화 미팅'],
      like: 23,
      shake: 42,
      buttonText: '문의하기',
      link: 'https://sendtime.app/reservation?u=ceo&i=IL3rJG',
      color: '#383CC1',
    },
    {
      reservationPageUuid: '!@dfagagafs',
      title: '센드타임이 궁금해요',
      description:
        '스플랩 팀은 여러분의 스케줄링 고민을  해결하기 위해 노력하고 있습니다. 무엇이든지 궁금한 점을 알려주세요.',
      tags: ['2년째 스케줄링만 했어요', '소통해요'],
      time: '30분',
      location: ['Zoom', '전화 미팅'],
      like: 35,
      shake: 53,
      buttonText: '문의하기',
      link: 'https://sendtime.app/reservation?u=ceo&i=ueUMlu',
      color: '#383CC1',
    },
  ],
};

const Page = () => {
  return <CustomPage pageInfo={pageInfo} customUrl="splab" />;
};

export default Page;

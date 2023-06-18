import styled from '@emotion/styled';

const Title = styled.h1`
  margin-bottom: 30px;
  color: var(--gray-800);
`;

const PreviewContainer = styled.div<{ isFourthPage?: boolean }>`
  display: flex;
  min-height: calc(100% - 60px);
  padding: 20px 0;
  width: 100%;

  & > div > div:nth-of-type(2),
  & > div > div:nth-of-type(2) > div {
    height: ${({ isFourthPage }) => (isFourthPage ? '92%' : '100%')};
    min-height: ${({ isFourthPage }) => (isFourthPage ? '92%' : '100%')};

    @media (max-width: 768px) {
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
    height: auto;
    min-height: fit-content;

    > div > div button {
      padding: 6px 10px;
      font-size: 12px;
    }
  }
`;

const Box = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => `${gap ?? 0}px`};
  height: 100%;
  min-height: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    min-height: 100vh;
  }
`;

const PreviewContent = styled.div`
  min-width: calc(100% - 562px);
  padding: 0 40px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

const RightLine = styled.div`
  border: 1px solid var(--gray-200);
  height: 100%;
  margin: 0 10px 0 50px;
`;

const ContentBase = styled.section`
  min-width: 512px;
  max-width: 520px;
  width: 100%;
  background: var(--white);
  border-radius: 10px;
  padding: 25px 20px;

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
`;

const SemiContent = styled(ContentBase)<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || '0px'};
  margin-bottom: 10px;
`;

// This styled component is used by other components as well
const Content = styled(ContentBase)`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
  // flex-shrink: 0;
  // min-height: fit-content;
  // max-height: calc(100vh - 175px);

  @media (max-width: 768px) {
    overflow: initial;
    padding: 10px 0;
  }
`;

const FormContent = styled(ContentBase)`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 25px 0;
  height: 100%;

  @media (max-width: 768px) {
    overflow: initial;
    padding: 10px 0;
  }
`;

const Container = styled(ContentBase)`
  background: var(--transparent);
  padding: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
`;

const AboutPage = styled.span`
  width: 100%;
  display: inline-block;
  background: var(--gray-200);
  font-weight: var(--regular);
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 10px;
`;

const PreviewTitle = styled.h1`
  font-size: 20px;
  color: var(--gray-600);
  margin-bottom: 30px;
`;

const PreviewAlert = styled.div`
  background: var(--white);
  border: 1px solid var(--purple-200);
  width: 100%;
  border-radius: 5px;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
  padding: 10px 5px;
  margin-bottom: 10px;
`;

const Strong = styled.span`
  color: var(--purple-500);
`;

const PreviewPageContainer = styled.div<{ isFourthPage?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & > section .fc.fc-media-screen.fc-direction-ltr.fc-theme-standard {
    min-height: fit-content;
    max-height: calc(100vh - 175px);
    height: ${({ isFourthPage }) =>
      isFourthPage ? 'calc(100% - 15px)' : '100%'};

    @media (max-width: 768px) {
      height: auto;
      max-height: 100%;
    }
  }

  .fc-timegrid-event-harness-inset .fc-timegrid-event.calendar-events {
    margin: 0px 1.75px 0.8px 0.8px !important;
  }
`;

export {
  AboutPage,
  Box,
  Container,
  Content,
  FormContent,
  PreviewAlert,
  PreviewContainer,
  PreviewContent,
  PreviewPageContainer,
  PreviewTitle,
  RightLine,
  SemiContent,
  Strong,
  Title,
};

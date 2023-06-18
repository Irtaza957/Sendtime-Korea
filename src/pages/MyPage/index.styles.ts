import styled from '@emotion/styled';

export const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const Image = styled.div`
  & > div {
    margin: 0;
  }
`;

export const MyPageContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 20px;
  align-items: flex-end;

  @media (max-width: 768px) {
    padding: 10px 20px;
    min-width: auto;
  }
`;

export const Section = styled.section<{
  gap?: number;
  padding?: string;
  minWidth?: number;
  maxWidth?: number;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || 0}px;
  width: 100%;
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '600')}px;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '1000')}px;
  background-color: var(--white);
  box-shadow: 2px 4px 20px rgba(166, 181, 198, 0.2);
  border-radius: 15px;
  padding: ${({ padding }) => (padding ? padding : '24px 32px')};
  margin: 16px auto;

  @media (max-width: 768px) {
    padding: 0;
    min-width: auto;
    box-shadow: none;
    gap: 20px;
    padding: 0 20px;
  }
`;

export const CardDescription = styled.div`
  font-weight: var(--normal);
  color: var(--gray-700);
  line-height: 1.6;
  font-size: 14px;
`;

export const TitleContainer = styled.div`
  width: 100%;
  position: relative;

  button {
    display: flex;
    gap: 5px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(8px, -4px);
  }

  h2 {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  line-height: 29.3px;
  color: var(--gray-750);
`;

export const SectionDescription = styled.p`
  font-size: 13px;
  color: var(--gray-600);
  margin-top: 10px;
`;

export const AccountSectionWrapper = styled.div`
  width: 100%;
  padding: 0 18px;
`;

export const InputGroupWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 32px;
  margin-bottom: 20px;

  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

export const ConnectedAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 8px;
`;

export const Warning = styled.div`
  font-size: 13px;
  color: var(--gray-600);
`;

export const CalendarContainer = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--gray-400);
  padding: 20px;
  margin: 20px 0;
`;

export const CalendarContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const CalendarName = styled.span`
  display: inline-flex;
  align-items: flex-start;
  font-size: 16px;
  color: var(--gray-700);
  font-weight: var(--regular);
  padding-left: 15px;
  gap: 10px;
`;

export const ModifyButton = styled.a`
  color: var(--purple-500);
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
  min-width: fit-content;
`;

export const IntegrationButtonContainer = styled.div`
  gap: 14px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export const IntegrationButton = styled.div<{ disabled?: boolean }>`
  ${({ disabled }) => disabled && `opacity: 0.6; filter: grayscale(100%);`}
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 200px;
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  flex-grow: 1;
  padding: 20px;
  gap: 8px;
  cursor: pointer;

  :hover {
    box-shadow: 0px 6px 25px rgba(85, 106, 122, 0.25);
  }

  h3 {
    text-align: left;
    font-size: 18px;
    color: var(--gray-750);
    font-weight: var(--regular);
    margin-top: 16px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: var(--gray-700);
    white-space: pre-line;
    text-align: left;
  }

  button {
    font-size: 12px;
  }
`;

// IntegrationButton.defaultProps = {
//   type: 'button',
// };

export const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

export const LocationAddContainer = styled.div`
  display: flex;
  min-width: 440px;
  width: 100%;
  gap: 10px;
  margin: 10px 0;

  div > div {
    padding: 10px 12px;

    input {
      padding: 0;
    }
  }

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

export const LocationBox = styled.div`
  display: flex;
  width: 440px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const LocationContainer = styled.div`
  display: flex;
`;

export const Location = styled.span`
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: fit-content;
  height: 100%;
  word-break: break-all;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid var(--gray-200);
  border-right: none;
  border-radius: 4px 0 0 4px;
  background: var(--gray-50);
`;

export const ImageWrapper = styled.div`
  width: 48px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const ToggleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ToggleContainer = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

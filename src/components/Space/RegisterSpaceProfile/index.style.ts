import StyledButton from '@components/Button';
import styled from '@emotion/styled';

const horizontalPadding = '32px';

export const FormContainer = styled.div<{ full?: boolean }>`
  width: ${({ full }) => (full ? '100%' : '90%')};
  max-width: ${({ full }) => (full ? 'none' : '500px')};
  height: ${({ full }) => (full ? '100%' : 'auto')};
  max-height: ${({ full }) => (full ? 'auto' : '90%')};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: ${({ full }) =>
    full
      ? '44px 0 env(safe-area-inset-bottom) 0'
      : `44px ${horizontalPadding} 20px ${horizontalPadding}`};
  gap: ${({ full }) => (full ? '16px' : '24px')};
  border-radius: ${({ full }) => (full ? '0' : '15px')};
  overscroll-behavior: contain;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  padding: 4px;
  top: 12px;
  right: 12px;

  svg {
    width: 20px;
    height: 20px;
    color: var(--gray-500);
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: var(--purple-500);
  font-size: 1.8em;
  font-weight: 700;
  line-height: 1;
  margin: 0 8px;
`;

export const SubtitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 0 8px;
`;

export const Subtitle = styled.p`
  color: var(--gray-800);
  font-size: 15px;
  text-align: center;
`;

export const LoginAlertText = styled.div`
  color: var(--gray-800);
  font-size: 14px;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;

  a {
    color: var(--blue-700);
    text-decoration: underline;
  }
`;

export const ProgressBarWrapper = styled.div`
  width: 60%;
`;

export const PreShowDescriptionContainer = styled.div`
  width: 95%;
  color: var(--gray-800);
  font-size: 15px;
  line-height: 1.2;
  padding: 16px 20px;
  border: 1px solid var(--gray-300);
  border-radius: 4px;
`;

export const EmbedBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

export const EmbedContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;

  & > iframe {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0px !important;
    border: none !important;
  }
`;

export const NextButton = styled(StyledButton)`
  width: 100%;
  height: 68px;
  transition: --gradient-color-1 0.2s ease-in-out,
    --gradient-color-2 0.2s ease-in-out, --gradient-color-3 0.2s ease-in-out,
    --gradient-color-4 0.2s ease-in-out;
  border-radius: 0;
  background: linear-gradient(
    -45deg,
    var(--gradient-color-1),
    var(--gradient-color-2),
    var(--gradient-color-3),
    var(--gradient-color-4)
  );
  background-size: 600%;
  animation: background-animation 16s linear infinite;
  font-size: 20px;
  font-weight: 700;

  &:disabled {
    --gradient-color-1: var(--gray-200);
    --gradient-color-2: var(--gray-200);
    --gradient-color-3: var(--gray-200);
    --gradient-color-4: var(--gray-200);
    cursor: default;
  }

  @property --gradient-color-1 {
    syntax: '<color>';
    initial-value: #ffa63d;
    inherits: false;
  }

  @property --gradient-color-2 {
    syntax: '<color>';
    initial-value: #ff3d77;
    inherits: false;
  }

  @property --gradient-color-3 {
    syntax: '<color>';
    initial-value: #338aff;
    inherits: false;
  }

  @property --gradient-color-4 {
    syntax: '<color>';
    initial-value: #3cf0c5;
    inherits: false;
  }

  @keyframes background-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionTitle = styled.h2`
  font-size: 12px;
  font-weight: 400;
  color: var(--gray-700);
`;

export const SectionContent = styled.div`
  width: 100%;
  gap: 16px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid var(--gray-300);
  border-radius: 4px;
`;

export const ButtonSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  max-width: 100px;
  height: 100px;
  max-height: 100px;
  border-radius: 40px;
  overflow: hidden;
  background-color: var(--gray-200);
  cursor: pointer;

  &:hover {
    background-color: var(--gray-300);
  }
`;

export const CheckboxesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AgreementText = styled.span`
  & > a {
    color: var(--purple-500);
    text-decoration: underline;

    &:visited {
      color: var(--purple-500);
    }
  }
`;

export const AgreementTextMark = styled.span`
  color: var(--red);
  margin-left: -4px;
`;

export const SubmitButton = styled(StyledButton)`
  height: 52px;
  transition: all 0.2s ease-in-out;
`;

export const AgreementAlertText = styled.p`
  color: var(--gray-600);
  font-size: 10px;
  text-align: center;

  a {
    color: var(--blue-600);
    text-decoration: underline;
  }
`;

export const ReservationPageSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SocialLinkPreview = styled.a`
  padding: 0 8px;
  font-size: 12px;
  color: var(--purple-500);
  text-decoration: underline;

  &:visited {
    color: var(--purple-500);
  }
`;

import StyledButton from '@components/Button';
import {
  EXPANDED_PROFILE_CARD_MAX_WIDTH,
  EXPANDED_PROFILE_CARD_WIDTH,
} from '@components/Space/SpaceProfileCard/index.styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Icon } from '@iconify/react';

export const SPACE_MOBILE_WIDTH = '870px';

export const spacePageStyle = css`
  :root {
    --space-content-horizontal-padding: 25px;
    --space-page-horizontal-padding: 60px;
    --space-header-height: 64px;

    @media (max-width: 1024px) {
      --space-page-horizontal-padding: 20px;
    }

    @media (max-width: ${SPACE_MOBILE_WIDTH}) {
      --space-page-horizontal-padding: 8px;
    }

    @media (max-width: 500px) {
      --space-content-horizontal-padding: 8px;
    }
  }

  #__next {
    overflow: unset;
  }
`;

export const blockScrollStyle = css`
  :root {
    overflow: hidden;
  }
`;

export const SpacePageWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 40px var(--space-page-horizontal-padding);
  padding-top: var(--space-header-height);
  background-color: white;
  align-items: flex-start;

  @media (max-width: ${SPACE_MOBILE_WIDTH}) {
    flex-direction: column;
  }
`;

export const LeftSideContainer = styled.div`
  height: calc(100vh - 40px - var(--space-header-height));
  position: sticky;
  top: var(--space-header-height);
  display: flex;
  flex-direction: column;

  @media (max-width: ${SPACE_MOBILE_WIDTH}) {
    width: 100%;
    height: fit-content;
    position: unset;
    top: unset;
    flex-shrink: 0;
    margin-bottom: 25px;
  }
`;

export const SpaceInfoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 20px var(--space-content-horizontal-padding);
  z-index: 0;
`;

export const AddCardButton = styled(StyledButton)`
  width: calc(100% - var(--space-content-horizontal-padding) * 2);
  height: 52px;
  margin: 0 var(--space-content-horizontal-padding);

  @media (max-width: ${SPACE_MOBILE_WIDTH}) {
    width: calc(
      100% -
        (
          var(--space-content-horizontal-padding) +
            var(--space-page-horizontal-padding)
        ) * 2
    );
    position: fixed;
    bottom: 20px;
    z-index: 2;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    margin-bottom: env(safe-area-inset-bottom);
  }
`;

export const PoweredByWrapper = styled.div`
  width: 100%;
  padding: 16px var(--space-content-horizontal-padding);
  padding-bottom: 0;
`;

export const RightSideContainer = styled.div`
  height: fit-content;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  padding-top: 20px;
  overflow-x: clip;

  @media (max-width: ${SPACE_MOBILE_WIDTH}) {
    width: 100%;
    padding-top: 0px;
    padding-bottom: 60px;
    flex-shrink: 0;
  }
`;

export const ContainerTitle = styled.h1`
  padding: 12px var(--space-content-horizontal-padding);
  font-size: 16px;
  color: var(--gray-800);
  font-weight: 600;
`;

export const CategoryFilterWrapper = styled.div`
  position: sticky;
  top: calc(var(--space-header-height) + 20px);
  z-index: 1;
  padding: 0 calc(var(--space-content-horizontal-padding) - 2px);
`;

export const ProfilesCardsContainer = styled.div<{ accessLimited: boolean }>`
  max-height: ${({ accessLimited }) => (accessLimited ? '150vh' : 'none')};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  padding: 20px var(--space-content-horizontal-padding);
  overflow-y: hidden;
  position: relative;

  @media (max-width: 770px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const AccessLimitOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 500px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;

export const ProfileCardModalOuterContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--very-front);
  background-color: var(--gray-800-70);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

export const ProfileCardModalInnerContainer = styled.div`
  width: 100%;
  max-height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export const CloseButtonWrapper = styled.div`
  width: ${EXPANDED_PROFILE_CARD_WIDTH};
  max-width: ${EXPANDED_PROFILE_CARD_MAX_WIDTH};
  flex-shrink: 0;
  display: flex;
  justify-content: end;
  margin-bottom: 8px;
`;
export const CloseButton = styled(Icon)`
  width: 28px;
  height: 28px;
  color: var(--gray-50);
`;

export const PasswordPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PasswordForm = styled.form`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const PasswordTitle = styled.h1`
  font-size: 20px;
  font-weight: var(--semi-bold);
  color: black;
`;

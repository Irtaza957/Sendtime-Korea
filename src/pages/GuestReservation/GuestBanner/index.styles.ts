import styled from '@emotion/styled';

export const MainBanner = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  width: calc(100%);
  height: 40px;
  background: var(--blue-500-light);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: var(--regular);
  z-index: var(--very-front);

  & > button {
    display: flex;
    gap: 5px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    flex-direction: column;
    text-align: center;
    height: 70px;
    padding: 20px;
    font-size: 12px;

    & > button {
      font-size: inherit;
      padding: 5px 8px;
    }
  }
`;

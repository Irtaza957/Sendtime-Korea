import styled from '@emotion/styled';

export const NavigationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

// export const NavigationBar = styled.div`
//   width: 100%;
//   position: absolute;
//   bottom: 0;
//   border-bottom: 1px solid var(--gray-600);
// `;

export const NavigationWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  position: relative;
  overflow: auto;
  border-bottom: 1px solid var(--gray-600);
  /* overflow: visible; */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NavigationContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

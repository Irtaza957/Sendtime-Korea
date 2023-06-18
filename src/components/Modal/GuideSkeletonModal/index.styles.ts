import styled from '@emotion/styled';

export const GuideSkeletonModalContainer = styled.div`
  max-width: 600px;
  max-height: 500px;
  width: 100%;
  border-radius: 15px;
  background: var(--white);
  margin: auto;
  padding: 20px 60px;
  /* min-width: 600px; */
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 20px 10px;
    margin: 0 10px;

    div:nth-of-type(2) > button:last-of-type {
      padding: 10px 30px;
    }
  }
`;

export const GuideTransitionDiv = styled.div`
  width: 100%;
`;

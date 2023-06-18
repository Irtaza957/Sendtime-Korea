import styled from '@emotion/styled';

export const ParticipantsGrid = styled.div`
  column-count: 2;
  padding: 15px 5px;

  & > div {
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    column-count: 1;
  }
`;

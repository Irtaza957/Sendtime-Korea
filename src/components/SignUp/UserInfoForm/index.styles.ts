import styled from '@emotion/styled';

export const ImageContainer = styled.div`
  max-width: 242px;
  max-height: 200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  gap: 40px;
`;

export const Text = styled.div`
  display: flex;
  width: 100%;
  font-size: 10px;
  color: rgba(84, 84, 84, 1);
`;

export const CountryNumberText = styled.span`
  font-size: 15px;
  color: var(--gray-500);
  margin-right: 2px;
`;

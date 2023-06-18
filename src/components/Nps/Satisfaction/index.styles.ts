import styled from '@emotion/styled';

export const SatisfactionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 22px;
`;

export const IndexNo = styled.button<{ checked?: boolean }>`
  border-radius: 10px;
  font-size: 25px !important;
  color: var(--gray-650);
  border: 1px solid var(--gray-300);
  width: 60px;
  height: 60px;
  display: block;
  position: relative;
  aspect-ratio: 1 / 1;

  &:hover {
    background: var(--gray-800);
    color: var(--white);
    border: 1px solid var(--gray-800);
    box-shadow: 0px 6px 25px 0px rgba(85, 106, 122, 0.25);
  }

  ${({ checked }) =>
    checked &&
    ` background: var(--gray-800);
      color: var(--white);
      border: 1px solid var(--gray-800);
      box-shadow: 0px 6px 25px 0px rgba(85, 106, 122, 0.25);`}

  @media (max-width: 768px) {
    width: 52px;
    height: 52px;
  }
`;

export const IndexContainer = styled.div`
  position: relative;
`;

export const IndexInfo = styled.span`
  position: absolute;
  bottom: -20px;
  font-size: 12px;
  min-width: fit-content;
  width: 100%;
  text-align: center;
  color: var(--gray-650);

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

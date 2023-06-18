import styled from '@emotion/styled';

export const ModalDataTitle = styled.div`
  font-size: 16px;
  font-weight: var(--regular);
  color: var(--gray-800);
  white-space: pre-line;
  text-align: center;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 12.5px;
  }
`;

export const ModalDataImage = styled.div`
  border: 1px solid var(--gray-50);
  border-radius: 8px;
  min-width: 100%;
  max-width: 600px;
`;

export const ModalDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 320px;
  min-height: 320px;
  max-height: 320px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ModalDataAlert = styled.span`
  padding: 2px;
  background: rgba(60, 171, 219, 0.15);
  border-radius: 4px;
  color: inherit;
  margin: 0 2px;
`;

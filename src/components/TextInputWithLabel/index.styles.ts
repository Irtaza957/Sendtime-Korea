import styled from '@emotion/styled';

const TextInputContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.h3`
  display: flex;
  justify-content: flex-end;
  min-width: 50px;
  margin-right: 8px;
  margin-top: 17px;
`;

const Required = styled.span`
  color: var(--alert);
  margin-left: 3px;
`;

export { Required, TextInputContainer, Title };

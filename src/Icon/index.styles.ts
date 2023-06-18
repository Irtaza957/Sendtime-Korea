import styled from '@emotion/styled';

const IconWithInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.svg<{
  fill: string;
  stroke: string;
  transformOrigin: 'top' | 'left' | 'bottom' | 'right' | 'center';
  margin: string;
}>`
  display: block;
  margin: ${({ margin }) => margin};
  transform-origin: ${({ transformOrigin }) => transformOrigin};
  path {
    fill: ${({ fill }) => `var(--${fill})`};
    stroke: ${({ stroke }) => `var(--${stroke})`};
  }
`;

const Info = styled.span<{ fill?: string; stroke?: string }>`
  display: inline-block;
  font-size: 10px;
  color: ${({ fill, stroke }) =>
    fill !== 'none' ? `var(--${fill})` : `var(--${stroke})`};
`;

export { IconContainer, IconWithInfo, Info };

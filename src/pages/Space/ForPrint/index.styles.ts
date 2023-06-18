import styled from '@emotion/styled';

export const A4s = styled.div<{
  columns: number;
  reverse: boolean;
  paperWidth: number;
  paperHeight: number;
}>`
  width: ${({ reverse, paperWidth, paperHeight }) =>
    reverse ? paperHeight : paperWidth}mm;
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  align-items: center;
  background-color: white;
`;

export const CardWrapper = styled.div<{
  rows: number;
  reverse: boolean;
  paperWidth: number;
  paperHeight: number;
}>`
  width: 100%;
  height: ${({ rows, reverse, paperWidth, paperHeight }) =>
    `${(reverse ? paperWidth : paperHeight) / rows}mm`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

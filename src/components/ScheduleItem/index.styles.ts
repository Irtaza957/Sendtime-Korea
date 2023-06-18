import styled from '@emotion/styled';

export const ScheduleItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: var(--gray-800);
`;

export const Date = styled.div`
  width: 100%;
  background: var(--gray-100);
  font-weight: var(--regular);
  padding: 10px 20px;
  color: inherit;
`;

export const Time = styled.div<{ borderRight?: boolean; declined?: boolean }>`
  width: 100%;
  max-width: 120px;
  border-right: ${({ borderRight }) =>
    borderRight ? `1px solid var(--gray-400)` : ''};
  font-weight: var(--regular);
  padding: 5px 10px;
  line-height: 1.5;
  color: inherit;
  ${({ declined }) =>
    declined &&
    `text-decoration: line-through;
     color: var(--gray-600);
     `}

  @media (max-width: 768px) {
    max-width: 100%;
    border-right: 0;
    display: flex;
    gap: 10px;
  }
`;

export const Contents = styled.div<{
  show?: boolean;
  cursor?: boolean;
  isDetail?: boolean;
}>`
  width: 100%;
  display: flex;
  height: ${({ show }) => (show ? 'auto' : 0)};
  padding: ${({ show }) => (show ? '12px 5px' : '0 5px')};
  color: inherit;
  overflow: hidden;
  transition: padding 100ms cubic-bezier(0.82, 1.22, 1, 1);
  border-bottom: ${({ show }) => (show ? '1px solid var(--gray-200)' : 'none')};
  background: var(--white);
  cursor: ${({ cursor }) => (cursor ? 'pointer' : 'default')};

  &:hover {
    ${({ isDetail }) => !isDetail && `background: var(--gray-100);`}
  }

  @media (max-width: 768px) {
    flex-direction: column;
    position: relative;
  }
`;

export const Priority = styled.span`
  background: var(--gray-300);
  color: var(--gray-750);
  font-weight: var(--regular);
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 2px;
  display: inline-block;
  width: fit-content;
  min-width: 42px;
  text-align: center;
`;

export const Title = styled.a<{ declined?: boolean }>`
  font-weight: var(--regular);
  color: inherit;
  display: flex;
  align-items: center;
  font-size: 15px;

  ${({ declined }) =>
    declined &&
    `text-decoration: line-through;
     color: var(--gray-600);`}
`;

export const Location = styled.div<{ declined?: boolean; isLink?: boolean }>`
  color: inherit;
  font-size: 12px;
  margin-left: 5px;

  ${({ declined }) =>
    declined &&
    `text-decoration: line-through;
   color: var(--gray-600);
 `}

  ${({ isLink }) =>
    isLink &&
    `&:hover {
      color: var(--blue-500-light);
      text-decoration: underline;
    }`}
`;

export const TimeUnit = styled.div<{ declined?: boolean }>`
  color: inherit;
  font-size: 12px;

  ${({ declined }) =>
    declined &&
    `text-decoration: line-through;
   color: var(--gray-600);
 `}
`;

export const Box = styled.div<{
  flex?: boolean;
  padding?: string;
  margin?: string;
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
}>`
  display: flex;
  flex-direction: ${({ flex }) => (flex ? 'row' : 'column')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  gap: ${({ gap }) => (gap ? gap : '0')};
  justify-content: ${({ justifyContent }) => justifyContent && justifyContent};
  align-items: ${({ alignItems }) => alignItems && alignItems};

  color: inherit;
`;

export const LeftBox = styled(Box)`
  justify-content: space-between;
  width: 100%;
  padding: 5px 10px;
`;

export const Changed = styled.span<{ type: 'cancel' | 'edited' }>`
  font-weight: var(--semi-bold);
  font-size: 12px;
  color: ${({ type }) =>
    type === 'cancel'
      ? `var(--cancel)`
      : type === 'edited'
      ? `var(--purple-500)`
      : `var(--purple-500)`};
`;

export const PriorityBox = styled(Box)`
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: inherit;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: fit-content;
  height: fit-content;
  gap: 5px;

  &:hover {
    color: var(--purple-500);

    path {
      fill: var(--purple-500) !important;
    }
  }
`;

export const ChangeButton = styled(Button)<{ color?: string }>`
  padding: 8px 6px;
  border-radius: 4px;
  border: 1px solid var(--gray-550);
  font-size: 12px;
  width: 100%;
  color: ${({ color }) => (color ? `var(--${color})` : 'inherit')};
  background: var(--white);

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`;

export const MoreButton = styled(Button)`
  @media (max-width: 768px) {
    position: absolute;
    top: 18px;
    right: 10px;

    span {
      display: none;
    }
  }
`;

export const Info = styled.div`
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;

  &:not(:last-of-type) {
    padding-bottom: 10px;
  }

  & > a {
    color: var(--purple-500);
    text-decoration: underline;
  }
`;

export const InfoTitle = styled.div`
  color: inherit;
  font-weight: var(--semi-bold);
`;

export const InfoUrl = styled.a`
  color: var(--blue-500-light);
  text-decoration: underline;
`;

export const Option = styled(TimeUnit)`
  padding: 2px 6px;
  border-radius: 2px;
  background: var(--gray-200);
  margin-right: 8px;
`;

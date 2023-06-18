import styled from '@emotion/styled';

export const MemberSidebarContainer = styled.section`
  width: 140px;
  background: var(--white);
  margin-left: 4px;
  height: 100%;
  box-shadow: 0px 3px 4px 0px #8f98a340;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: var(--middle);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const GroupSection = styled.div`
  width: 100%;
  height: 100%;
  min-width: 630px; /* padding left 150 + calendar minwidth 480 */

  @media (max-width: 768px) {
    padding-left: 150px;
  }
`;

export const SidebarTitle = styled.h2`
  font-size: 16px;
  font-weight: var(--regular);
  padding: 28px 20px 20px 20px;
  border-bottom: 0.5px solid var(--gray-200);
  display: flex;
  gap: 5px;
  color: var(--gray-800);
`;

export const PlusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  &:hover {
    background: var(--purple-100-50);
  }
`;

export const SidebarTop = styled.div`
  height: calc(100% - 94px);
`;

export const MemberContainer = styled.div`
  height: calc(100% - 104.5px);
  overflow: auto;
`;

export const SelectAll = styled.button`
  padding: 10px;
  width: 100%;
  background: var(--gray-50);

  &:hover {
    background: var(--purple-100-50);
  }
`;

export const Settings = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 10px; */
`;

export const SettingsButton = styled.button`
  font-size: 14px;
  font-weight: var(--regular);
  text-align: center;
  color: var(--gray-800);
  width: 100%;
  padding: 15px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;

  &:hover {
    background: var(--purple-100-50);
    color: var(--purple-500);

    svg {
      path {
        fill: var(--purple-500);
      }
    }
  }
`;

export const Member = styled.button<{ color?: string; active?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 50px;
  padding: 10px 20px;
  width: 100%;
  position: relative;
  background: ${({ color, active }) =>
    active ? `${color}18` : 'var(--white)'};
  
  &:hover {
    background: ${({ color }) => `${color}18` || 'var(--gray-100)'};
  }

  ${({ active, color }) =>
    active &&
    `
    &:after {
      content: '';
      width: 10px;
      height: 100%;
      background: ${color || 'var(--gray-300)'};
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
    }
    `}}

`;

export const Name = styled.div`
  font-size: 16px;
  font-weight: var(--regular);
  text-align: left;
  margin-bottom: 5px;
  color: var(--gray-800);
`;

export const Organization = styled.div`
  font-size: 12px;
  font-weight: var(--normal);
  color: var(--gray-800);
`;

import { SIDEBAR_TYPE, SidebarType } from '@contexts/SidebarProvider';
import styled from '@emotion/styled';

const ProfileContainer = styled.div<{ type?: SidebarType }>`
  display: flex;
  justify-content: ${({ type }) =>
    type === SIDEBAR_TYPE.BIG
      ? 'flex-start'
      : type === SIDEBAR_TYPE.SMALL
      ? 'center'
      : 'flex-start'};
  align-items: center;
  padding: 15px 0;

  margin-top: ${({ type }) =>
    type === SIDEBAR_TYPE.BIG
      ? '6px'
      : type === SIDEBAR_TYPE.SMALL
      ? '21.5px'
      : '0'};
  width: 100%;
  gap: 8px;
  height: 70.5px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100%;
    align-items: flex-start;
    margin-top: 20px;
  }
`;

const ProfileImage = styled.div<{ bgColor: string }>`
  width: 30px;
  height: 30px;
  min-width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    /** TODO: 백그라운드에 따라 컬러 조합을 만들어두어야 함 */
    /* background: ${({ bgColor }) => `var(--${bgColor})`}; */

    background: ${({ bgColor }) => bgColor};
    color: var(--white);
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: calc(100% - 38px);
  text-align: left;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: var(--semi-bold);
  color: var(--gray-800);
`;

const PrivateURL = styled.div`
  font-size: 12px;
  font-weight: var(--normal);
  color: var(--gray-600);
  word-break: break-all;
  max-width: 160px;
  width: 100%;
  min-width: 100px;
  min-height: fit-content;
`;

export { Name, PrivateURL, ProfileContainer, ProfileDetails, ProfileImage };

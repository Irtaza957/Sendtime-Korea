import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 768px) {
    display: block;
    flex-direction: column;
  }
`;

export const Heading = styled.div`
  color: #131416;
  font-weight: 700;
  font-size: 24px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    margin-top: 30px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: max-content;
  @media screen and (max-width: 768px) {
    margin-right: 16px;
  }
`;

export const BodyContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  height: calc(100vh - 190px);
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 5px;
  gap: 5px;
  box-shadow: 0 4px 15px 0 #292f3315;
  padding: 30px;
  overflow: auto;
  margin-top: 36px;
  @media screen and (max-width: 768px) {
    margin-top: 25px;
    padding: 15px;
  }
`;
export const Text = styled.p`
  color: #000000;
  font-weight: 500;
  margin-bottom: 38px;
  @media screen and (max-width: 768px) {
    margin-bottom: 30px;
  }
`;
export const Box = styled.div`
  border: 1px solid #d9e0e8;
  padding: 20px 12px;
  margin: auto 0px;
`;
export const InnerBox1 = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;
export const InnerBox2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Circle = styled.div`
  background: #d9d9d9;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  overflow: hidden;
`;
export const SpaceTitle = styled.p`
  color: #131416;
  font-weight: 700;
`;

export const NoResultFound = styled.p`
  color: #131416;
  font-weight: 700;
  text-align: center;
  border: 1px solid var(--gray-200);
  padding: 10px 0px;
`;

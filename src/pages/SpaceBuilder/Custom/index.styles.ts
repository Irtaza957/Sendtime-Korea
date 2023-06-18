import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  @media screen and (max-width: 768px) {
    display: block;
    margin-bottom: 20px;
  }
`;

export const Title = styled.div<{ margin?: string }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: #131416;
  margin: ${({ margin }) => (margin ? margin : '0px')};

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Heading = styled.div`
  color: #131416;
  font-weight: 700;
  font-size: 24px;
`;

export const InnerContainer = styled.div<{ padding?: string }>`
  width: 95%;
  padding: ${({ padding }) => (padding ? padding : '10px')};
  margin: 10px auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0px;
    margin: 15px auto;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  gap: 0.25em;
  align-items: center;
  flex-wrap: wrap;
  color: #131416;
`;

export const Description = styled.div`
  color: #131416;
  font-size: 14px;
`;

export const PageLink = styled.div`
  color: #3970ff;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;

export const UrlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border: 1px solid #f2f5f7;
  background-color: #f9fbfd;
  padding: 1rem;
  margin: 0.8rem 0 0 0;
  font-size: 13px;
  max-width: 420px;
  width: 100%;
`;

export const ButtonContainer = styled.div<{ padding?: string }>`
  display: flex;
  gap: 12px;
  padding: ${({ padding }) => (padding ? padding : '0px')};
  width: max-content;
  @media screen and (max-width: 768px) {
    margin: 10px 0 0 0;
  }
`;

export const BodyContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  height: calc(100vh - 190px);
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  gap: 5px;
  box-shadow: 0 4px 15px 0 #292f3315;
  padding: 30px;
  overflow: auto;
  margin-top: 0px;
  @media screen and (max-width: 768px) {
    margin-top: 0px;
    padding: 10px 15px;
    border: none;
    box-shadow: none;
  }
`;

export const IframeContainer = styled.div`
  padding: 20px 0;
  max-height: 615px;
  height: 45vw;
  @media screen and (max-width: 768px) {
    height: 70vw;
  }

  iframe {
    width: 100%;
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: none;
  }
`;

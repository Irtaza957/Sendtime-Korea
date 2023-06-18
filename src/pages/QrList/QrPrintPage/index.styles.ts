import styled from '@emotion/styled';

export const PrintArea = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 30px auto;
  width: 100%;
  height: 100vw;
  padding: 15px;
`;

export const QrPrintContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const QrHostName = styled.span`
  font-size: 35px;
  color: var(--gray-900);
  font-family: 'IBMPlexSansKR-Bold';
`;

export const QrSendTime = styled.span`
  font-family: 'IBMPlexSansKR-Regular';
  font-size: 25px;
  margin-bottom: 5px;
  margin-left: 10px;
`;

export const QrArea = styled.div`
  background: var(--white);
  padding: 10px 0px;
  /* box-shadow: 2px 3.5px 50px 0 rgba(48, 85, 129, 0.2); */
  border-radius: 20px;
  position: relative;
`;

export const QrSideArea = styled.div``;

export const QrAbsolute = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CustomImage = styled.div`
  img {
    width: 250px;
    height: auto;
  }
`;

export const ButtonArea = styled.div`
  width: 100%;
  button {
    margin: 0 auto;
  }
`;

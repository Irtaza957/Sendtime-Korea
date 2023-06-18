import styled from '@emotion/styled';

const CompanyCardSection = styled.section`
  width: 100%;
  min-width: 340px;
  max-width: 360px;
  min-height: 550px;
  max-height: 570px;
  height: 100%;
  background: var(--white);
  display: flex;
  padding: 35px 25px;
  border-radius: 10px;
  box-shadow: 0 6px 25px 0px #556a7a25;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;

  @media (max-width: 768px) {
    box-shadow: none;
    border: 1px solid var(--gray-200);
    min-width: 300px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    max-width: 340px;
  }
`;

const CompanyTitle = styled.div`
  font-size: 20px;
  font-weight: var(--semi-bold);
  color: var(--gray-800);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px solid var(--gray-300);
  width: 100%;
  padding: 20px 10px;
`;

const CompanyDescription = styled.div`
  font-size: 14px;
  font-weight: var(--normal);
  color: var(--gray-750);
  line-height: 1.7;
  white-space: pre-line;
  padding-left: 10px;
  max-height: 50%;
  overflow: auto;
`;

const ContactContainer = styled.div`
  width: 100%;
  border: 1px solid var(--gray-200);
  background: var(--gray-50);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  padding: 8px;
  font-size: 14px;
  gap: 10px;
`;

const ContactContent = styled.span`
  color: var(--gray-750);
  font-weight: var(--normal);
  word-break: break-all;
  cursor: pointer;
`;

const Today = styled.div`
  padding: 6px 10px;
  background: var(--purple-50);
  width: fit-content;
  border-radius: 6px;
  position: absolute;
  font-size: 12px;
  right: 0;
  top: 0;
`;

const ImageWrapper = styled.div`
  width: 80px;
  height: 80px;

  & > div {
    border-radius: 50%;
    overflow: hidden;
  }
`;

const Bold = styled.span`
  font-weight: var(--semi-bold);
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: hidden;
  position: relative;
`;

export {
  Bold,
  Box,
  CompanyCardSection,
  CompanyDescription,
  CompanyTitle,
  ContactContainer,
  ContactContent,
  ContactDetails,
  ImageWrapper,
  Today,
};

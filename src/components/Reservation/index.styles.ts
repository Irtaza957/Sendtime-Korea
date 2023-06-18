import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { Alert } from '../../styles/common.styles';

export const Box = styled.div<{ gap?: number; width?: number; flex?: boolean }>`
  display: flex;
  position: relative;

  ${({ flex }) => !flex && `flex-direction: column;`}
  gap: ${({ gap }) => `${gap ? gap : 0}px`};
  width: ${({ width }) => `${width ? width : 100}%`};
  justify-content: center;

  min-width: fit-content;
  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`;

export const SubTitle = styled.h2<{ isLabelFont?: boolean }>`
  color: var(--gray-750);
  font-size: ${({ isLabelFont }) => isLabelFont && '14px'};
`;

export const Required = styled.span`
  color: var(--alert);
  margin-left: 3px;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const SubHeading = styled.h3`
  margin-bottom: 6px;
`;

export const DescriptionContainer = styled.div`
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 13px;
  font-weight: var(--normal);
  color: var(--gray-600);

  line-height: 1.4;
  &:not(:first-of-type) {
    margin-top: 2px;
  }
`;

export const LocationAddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  margin: 10px 0;
  div > div {
    padding: 10px 12px;
    input {
      padding: 0;
    }
  }
`;

export const LocationAddTitle = styled.span`
  display: inline-block;
  min-width: max-content;
`;

export const CustomCheckbox = styled.div<{ width?: string }>`
  width: ${({ width }) => width || '100%'};

  display: space-between;
  div > span {
    background: var(--gray-50);
  }
`;

export const XButtonContainer = styled.button`
  padding: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-left: none;
  border-radius: 0 4px 4px 0;
`;

XButtonContainer.defaultProps = {
  type: 'button',
};

export const SpanForBorder = styled.span`
  border-left: 1px solid var(--gray-200);
  width: inherit;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
  & > div > div:nth-of-type(1) {
    & > div > div > div > div:nth-of-type(2) {
      width: 30px;
    }

    .react-datepicker__input-container {
      padding: 8px 5px 8px 20px;

      input[type='text'] {
        font-size: 15px;
        font-weight: var(--regular);
        padding: 2px 0;
        width: 100px;
      }

      @media (max-width: 768px) {
        padding: 4px 5px 4px 10px;
        input[type='text'] {
          font-size: 14px;
        }
      }
    }
  }

  & > div:nth-of-type(2) {
    & > div > div > div > div {
      padding: 8px 15px;
    }

    input[type='number'] {
      padding: 2px 0;
      width: 30px;
    }
  }
`;

export const InfoSpan = styled.span`
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: fit-content;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const RangeDateContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;

  & > div > div,
  & input {
    background: ${({ disabled }) =>
      `var(--${disabled ? 'gray-100' : 'white'})`};
    color: ${({ disabled }) => `var(--${disabled ? 'gray-300' : 'black'})`};
  }
`;

export const ContentAlert = styled(Alert)<{ marginLeft?: number }>`
  margin-left: ${({ marginLeft }) => `${marginLeft ?? 30}px`};

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Preview = styled.div`
  flex-grow: 1;
  min-width: 400px;
  height: calc(100vh - 190px);
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 5px;
  gap: 5px;
  box-shadow: 0 4px 15px 0 #292f3315;
  padding: 22px;
  overflow: auto;
  max-width: 450px;

  & > p:nth-of-type(1) {
    border-bottom: 1px solid var(--gray-200);
  }

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

export const PreviewName = styled.h1`
  font-size: 20px;
  color: var(--gray-800);
  font-weight: var(--semi-bold);
  word-break: break-all;
`;

export const Warning = styled.p`
  font-size: 14px;
  color: var(--gray-600);
  padding: 12px 0;
`;

export const PreviewDescription = styled.p`
  font-size: 14px;
  color: var(--gray-800);
  margin-top: 15px;
  padding-top: 5px;
  white-space: break-spaces;
  word-break: break-all;
`;

export const PreviewInfos = styled.div`
  margin-top: 15px;
  font-size: 14px;
`;

export const PreviewInfoContainer = styled.div<{ alignItems?: string }>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  justify-content: flex-start;
  color: var(--gray-750);
  margin-bottom: 8px;
  gap: 0.75rem;
  word-break: break-all;

  svg {
    flex-shrink: 0;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
`;

export const SubContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  input {
    padding: 5px;
  }
`;

export const ThirdPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
`;

export const NoOrganizerAlert = styled.span`
  font-size: 12px;
  color: var(--blue-600);
  font-weight: var(--regular);
  margin-top: 10px;
`;

/* FourthPage */
export const FourthPageBox = styled(Box)`
  min-width: 500px;

  > div {
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

export const MobileInfo = styled.section`
  margin: 0 auto;
  background: var(--gray-100);
  height: fit-content;
  padding: 5px 10px;
  font-size: 12px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
`;
export const Slider = styled.span<{ isMultiple?: boolean }>`
  ${({ isMultiple }) =>
    isMultiple
      ? 'background-color: #6056DB;'
      : 'background-color: var(--purple-100);'}
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  &:before {
    ${({ isMultiple }) => (isMultiple ? 'transform: translateX(20px);' : '')}
    ${({ isMultiple }) =>
      isMultiple ? ' background-color: white;' : ' background-color: grey;'}
  position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 6px;
    bottom: 5px;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
export const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;
export const SearchBox = styled.div`
  display: flex;
  overflow: hidden;
`;
export const Search = styled.input`
  display: flex;
  overflow: hidden;
  font-size: 14px;
  width: 300px;
  ::placeholder {
    font-size: 14px;
    color: #9c9c9c;
  }
  @media screen and (max-width: 480px) {
    ::placeholder {
      width: 200px;
      font-size: 12px;
    }
  }
`;
export const DurationContainer = styled.div`
  position: relative;
`;
export const SidebarDurationContainer = styled(DurationContainer)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const DurationSubContainer = styled.div<{ isEmpty?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
  min-height: 2.5rem;
  border-radius: 5px;
  padding: 0.75rem;
  cursor: pointer;
  ${({ isEmpty }) =>
    isEmpty ? 'border: 1px solid #FF0000;' : 'border: 1px solid #D8D8D8;'}
`;
export const SideBarDurationSubConatiner = styled(DurationSubContainer)`
  width: 100%;
`;
export const GuestDurationSubConatiner = styled(SideBarDurationSubConatiner)`
  align-items: flex-start;
  height: 2.5rem;
`;
export const Duration = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  gap: 6px 5px;
`;
export const DurationBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  max-height: 32px;
  background-color: #f0eeff;
  border: 2px solid var(--purple-100);
  border-radius: 25px;
  padding: 0px 5px;
  overflow: hidden;
`;
export const DurationTime = styled.p`
  padding-bottom: 2px;
  margin: 0 0.7rem 0 0.6rem;
  font-size: 14px;
  vertical-align: unset;
  color: #616161;
`;
export const DeleteDuration = styled.div`
  position: relative;
  background-color: #6357f1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  height: 20px;
  width: 20px;
`;
export const Cancel = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6357f1;
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;
export const DeleteIcon = styled.p`
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  -webkit-transform: translate(-50%, -50%) !important;
  height: 9px;
  line-height: 9px;
  flex-shrink: 0;
  font-size: 11px;
`;

const animateFromBottom = keyframes`
from {
  transform: translate3d(0, 10px, 0);
  opacity: 0
}
to {
  transform: translate3d(0, 0, 0);
  opacity: 1
}
`;
export const EmptySlotText = styled.p`
  font-size: 17px;
  color: #9c9c9c;
`;
export const Selectbox = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.6rem;
  animation: ${animateFromBottom} 0.3s;
  background-color: white;
  border-radius: 8px;
  box-shadow: 4px 1px 15px rgba(0, 0, 0, 0.2);
  padding: 1.2rem;
  z-index: 10;
`;
export const SidebarSelectbox = styled(Selectbox)`
  max-height: 190px;
  overflow-y: auto;
  padding: 1rem;
`;
export const SelectboxTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 1rem;
`;
export const Switchbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 15px;
  margin-left: -4rem;

  @media screen and (max-width: 480px) {
    gap: 5px;
    width: 80%;
  }
`;
export const MultipleText = styled.div`
  color: #9c9c9c;
  font-size: 14px;
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;
export const SelectTimeBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  height: 200px;
  overflow-y: scroll;
  margin-top: 1.2rem;
`;
export const SidebarSelectTimeBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
export const SelectTime = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;
export const TimeText = styled.p`
  color: #6f6f6f;
  font-size: 15px;
  padding-bottom: 2px;
  cursor: pointer;
`;
export const GuestTimeText = styled(TimeText)`
  cursor: default;
`;
export const GuestTimeContainer = styled.div`
  display: flex;
  margin-right: 5px;
  width: 100%;
`;
export const TimeCheckbox = styled.span<{ isChecked?: boolean }>`
  width: 22px;
  height: 22px;
  ${({ isChecked }) =>
    isChecked ? 'border: 8px solid #6357F1;' : 'border:1px solid #D8D8D8;'}
  border-radius:5px;
`;
export const MultipleCheckbox = styled.div<{ isChecked?: boolean }>`
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: cebter;
  ${({ isChecked }) =>
    isChecked ? 'border: 1px solid #6056DB;' : 'border:1px solid #D8D8D8;'}
  ${({ isChecked }) =>
    isChecked ? 'background-color: #6056DB;' : 'background-color: #fff;'}
  border-radius:5px;
`;
export const CustomIconWrapper = styled.div`
  height: 100%;
`;

export const SidebarTimeCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  background: #ffffff;
  border: 1px solid #c8c8c8;
  border-radius: 50px;
`;
export const CheckIcon = styled.img<{ margin?: string }>`
  display: block;
  margin: ${({ margin }) => `${margin ? margin : '0px'}`};
`;
export const TimeZoneSubContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: between;
  border: 1px solid #d8d8d8;
  border-radius: 5px;
  cursor: pointer;
  padding: 17px 15px 12px;
  margin: 0.6rem auto;
`;
export const SelectedTime = styled.p`
  height: 100%;
  display: flex;
  align-items: center;
  color: #6e6e6e;
`;
export const ArrowIcon = styled.span<{
  isDropdown: boolean;
  isFristPageDropDown?: boolean;
}>`
  ${({ isDropdown, isFristPageDropDown }) =>
    isDropdown
      ? `transform: rotate(180deg); ${
          !isFristPageDropDown ? 'margin-top: 5px;' : 'margin-bottom: -4px;'
        }`
      : ``};

  /* @media(min-width: 1400px){
    ${({ isDropdown }) =>
    isDropdown ? `margin-top: 9px;` : `margin-top: 6px;`}
  } */
`;

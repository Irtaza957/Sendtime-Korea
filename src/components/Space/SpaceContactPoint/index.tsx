import React from 'react';
import Link from 'next/link';

import { SpaceContactPointData } from '@api/space/SpaceApi';
import { Mail, Phone, WebSite } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import * as Styled from './index.styles';

const SpaceContactPoint = ({ type, value }: SpaceContactPointData) => {
  const makeHref = () => {
    switch (type) {
      case 'EMAIL':
        return `mailto:${value}`;
      case 'PHONE':
        return `tel:${value}`;
      case 'WEBSITE':
        return value;
    }
  };

  return (
    <Link href={makeHref()} passHref>
      <Styled.ContactContainer target="_blank">
        {type === 'PHONE' && (
          <CustomIcon size={19} fill="gray-600" stroke="none">
            <Phone />
          </CustomIcon>
        )}

        {type === 'EMAIL' && (
          <CustomIcon size={18} height={14} fill="gray-600" stroke="none">
            <Mail />
          </CustomIcon>
        )}

        {type === 'WEBSITE' && (
          <CustomIcon size={21} fill="gray-600" stroke="none">
            <WebSite />
          </CustomIcon>
        )}
        <Styled.ContactContent>{value}</Styled.ContactContent>
      </Styled.ContactContainer>
    </Link>
  );
};

export default SpaceContactPoint;

import React from 'react';
import Linkify from 'react-linkify';

import AutoHeightImage from '@components/AutoHeightImage';
import { PageLink } from '@components/CustomCard/index.styles';
import { BASE_URL } from '@constants/baseUrl';
import { contentWithEnter } from '@utils/content';

import Contact from './Contact';
import {
  Bold,
  Box,
  CompanyCardSection,
  CompanyDescription,
  CompanyTitle,
  ContactDetails,
  ImageWrapper,
  Today,
} from './index.styles';

interface CompanyCardProps {
  companyInfo: Omit<CustomPageInfo, 'reservationPageCards'>;
}

const CompanyCard = ({ companyInfo }: CompanyCardProps) => {
  const {
    companyName,
    description,
    logoUrl,
    phone,
    email,
    website,
    todayCount,
  } = companyInfo;

  const logo = () => {
    if (logoUrl.includes('https://')) {
      return logoUrl;
    }
    return `${BASE_URL.image}${logoUrl}`;
  };

  return (
    <CompanyCardSection>
      <Box>
        <Today>
          Today <Bold>{todayCount}</Bold>
        </Today>
        <CompanyTitle>
          <ImageWrapper>
            <AutoHeightImage src={logo()} alt="splab_logo" />
          </ImageWrapper>
          {companyName}
        </CompanyTitle>

        <CompanyDescription>
          {contentWithEnter(description).map((content, idx) => (
            <Linkify
              key={idx}
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <PageLink target="blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </PageLink>
              )}
            >
              <span
                key={idx}
                style={{ display: 'block', wordBreak: 'break-word' }}
              >
                {content}
              </span>
            </Linkify>
          ))}
        </CompanyDescription>
      </Box>

      <ContactDetails>
        {phone && <Contact type="phone" content={phone} />}
        {email && <Contact type="email" content={email} />}
        {website && <Contact type="website" content={website} />}
      </ContactDetails>
    </CompanyCardSection>
  );
};

export default CompanyCard;

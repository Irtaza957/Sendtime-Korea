import React from 'react';
import Link from 'next/link';

import { Mail, Phone, WebSite } from '@Icon/Icons';
import CustomIcon from '@Icon/index';

import { ContactContainer, ContactContent } from './index.styles';

interface ContactProps {
  type: string;
  content: string;
}

const Contact = ({ type, content }: ContactProps) => {
  const makeHref = () => {
    if (type === 'email') return `mailto:${content}`;
    if (type === 'phone') return `tel:${content}`;
    if (type === 'website') return content;
    return '';
  };

  return (
    <ContactContainer>
      {type === 'phone' && (
        <CustomIcon size={19} fill="gray-600" stroke="none">
          <Phone />
        </CustomIcon>
      )}

      {type === 'email' && (
        <CustomIcon size={18} height={14} fill="gray-600" stroke="none">
          <Mail />
        </CustomIcon>
      )}

      {type === 'website' && (
        <CustomIcon size={21} fill="gray-600" stroke="none">
          <WebSite />
        </CustomIcon>
      )}
      <Link href={makeHref()} passHref>
        <ContactContent>{content}</ContactContent>
      </Link>
    </ContactContainer>
  );
};

export default Contact;

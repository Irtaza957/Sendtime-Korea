import React, { ReactNode } from 'react';
import Link from 'next/link';

interface NewTabLinkProps {
  href: string;
  children?: ReactNode;
}

const NewTabLink = ({ href, children }: NewTabLinkProps) => {
  return (
    <Link href={href} passHref>
      <a target="_blank" rel="noopener noreferrer">
        {children ? children : href}
      </a>
    </Link>
  );
};

export default NewTabLink;

import React, { useEffect } from 'react';

const usePreventGoBack = () => {
  const preventGoBack = () => {
    history.pushState(null, '', location.href);
  };

  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  return <></>;
};

export default usePreventGoBack;

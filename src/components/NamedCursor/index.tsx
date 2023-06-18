import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCursor } from '@contexts/CursorProvider';

const CustomCursor = () => {
  const { cursorType, x, y } = useCursor();
  const { t } = useTranslation('calendar');

  return (
    <div
      className={`custom ${cursorType}`}
      style={{
        left: `${x + 15}px`,
        top: `${y + 15}px`,
        fontSize: '11px',
        display: 'flex',
        width: 'fit-content',
        minWidth: 'fit-content',
      }}
    >
      {t('clickInfo')}
    </div>
  );
};

export default CustomCursor;

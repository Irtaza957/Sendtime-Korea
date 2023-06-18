import React from 'react';

interface DefaultProps {
  time: string;
  is15Min: boolean;
  title: string;
}

const Default = ({ time, is15Min, title }: DefaultProps) => {
  return (
    <div
      data-blocked="false"
      className="schedule"
      style={{
        padding: is15Min ? '0px' : '1px 2px',
        height: '100%',
        width: '100%',
      }}
    >
      <div style={{ whiteSpace: 'pre', lineHeight: 1.5 }}>{title}</div>
      <div style={{ whiteSpace: 'break-spaces' }}>{time}</div>
    </div>
  );
};

export default Default;

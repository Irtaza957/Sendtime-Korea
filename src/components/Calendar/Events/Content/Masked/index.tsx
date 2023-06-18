import React from 'react';

interface MaskedProps {
  time: string;
  is15Min: boolean;
}

const Masked = ({ time, is15Min }: MaskedProps) => {
  return (
    <div
      className="masked-schedule"
      style={{
        padding: is15Min ? '0px' : '2px',
        position: 'relative',
      }}
    >
      {time}
    </div>
  );
};

export default Masked;

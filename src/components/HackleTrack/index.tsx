import React, { ReactNode } from 'react';

import { HackleEvent } from '@hackler/javascript-sdk';
import { useTrack } from '@hackler/react-sdk';

interface HackleTrackProps {
  hackleEvent: HackleEvent;
  children?: ReactNode;
}

const HackleTrack = ({ hackleEvent, children }: HackleTrackProps) => {
  const track = useTrack();
  return (
    <div onClick={() => track(hackleEvent)}>
      {children ? children : hackleEvent}
    </div>
  );
};

export default HackleTrack;

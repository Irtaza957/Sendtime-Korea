import React, { useContext, useEffect, useState } from 'react';

interface CursorProps {
  cursorType: string;
  cursorChangeHandler: (cursorType: string) => void;
  x: number;
  y: number;
}

const defaultValue = {
  cursorType: '',
  cursorChangeHandler: (cursorType: string) => {},
  x: 0,
  y: 0,
};

const CursorContext = React.createContext<CursorProps>(defaultValue);

interface CursorProviderProps {
  children: React.ReactNode;
}
const CursorProvider = ({ children }: CursorProviderProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('');

  const onMouseMove = (event: { pageX: any; pageY: any }) => {
    const { pageX: x, pageY: y } = event;

    setMousePosition({ x, y });
  };

  useEffect(() => {
    setTimeout(() => {
      document?.querySelectorAll('td').forEach((day) => {
        if (day?.attributes[0].value === 'presentation') return;
        if (day?.classList.contains('fc-timegrid-slot-label')) return;
        if (day?.classList.contains('fc-day-disabled')) return;
        if (day?.querySelectorAll('.blocked-events').length) return;
        // if (day?.attributes[0].value !== 'gridcell') {
        day?.addEventListener('mousemove', onMouseMove);
        // }
      });
    }, 500);

    // document?.querySelectorAll('.fc-day-disabled').forEach((disabled) => {
    //   disabled?.removeEventListener('mousemove', onMouseMove);
    // });

    return () => {
      document?.querySelectorAll('tr').forEach((day) => {
        day?.removeEventListener('mousemove', onMouseMove);
      });
    };
  }, []);

  const { x, y } = mousePosition;

  const cursorChangeHandler = (cursorType: string) => {
    setCursorType(cursorType);
  };

  return (
    <CursorContext.Provider value={{ cursorType, cursorChangeHandler, x, y }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = (): CursorProps => {
  return useContext<CursorProps>(CursorContext);
};

export default CursorProvider;

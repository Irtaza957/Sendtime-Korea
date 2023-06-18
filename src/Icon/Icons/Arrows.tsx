import React from 'react';

export const UpArrow = () => {
  return <path d="M1 5L5 1L9 5" strokeLinecap="round" strokeLinejoin="round" />;
};

export const EmptyUpArrow = () => {
  return (
    <path
      d="M1 6L7 1L13 6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

export const DownArrow = () => {
  return <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />;
};

export const EmptyDownArrow = () => {
  return (
    <path
      d="M13 1L7 6L1 0.999999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

export const UpDownArrow = () => {
  return (
    <path d="M5.00065 0.533203L0.333984 6.5332H9.66732L5.00065 0.533203ZM0.333984 9.46654L5.00065 15.4665L9.66732 9.46654H0.333984Z" />
  );
};

export const LeftArrow = () => {
  return (
    <path
      d="M7 13L1 7L7 1"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

export const RightArrow = () => {
  return (
    <path
      d="M1 13L7 7L1 1"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

export const CircleRightArrow = () => {
  return (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.74089 0.583984C3.19714 0.583984 0.324219 3.4569 0.324219 7.00065C0.324219 10.5444 3.19714 13.4173 6.74089 13.4173C10.2846 13.4173 13.1576 10.5444 13.1576 7.00065C13.1576 3.4569 10.2846 0.583984 6.74089 0.583984ZM5.45347 5.07973C5.34721 4.96972 5.28841 4.82237 5.28974 4.66942C5.29107 4.51647 5.35242 4.37016 5.46057 4.26201C5.56873 4.15385 5.71504 4.0925 5.86799 4.09117C6.02093 4.08985 6.16828 4.14864 6.2783 4.2549L8.61164 6.58823C8.72099 6.69763 8.78243 6.84597 8.78243 7.00065C8.78243 7.15533 8.72099 7.30368 8.61164 7.41307L6.2783 9.7464C6.16828 9.85266 6.02093 9.91146 5.86799 9.91013C5.71504 9.9088 5.56873 9.84745 5.46057 9.7393C5.35242 9.63114 5.29107 9.48483 5.28974 9.33189C5.28841 9.17894 5.34721 9.03159 5.45347 8.92157L7.37439 7.00065L5.45347 5.07973Z"
      strokeWidth="0.279018"
    />
  );
};
